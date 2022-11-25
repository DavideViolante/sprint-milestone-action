const core = require('@actions/core');
const axios = require('axios');

const { calculateNextMilestone, getLastMilestone } = require('./functions');

const GITHUB_API_URL = 'https://api.github.com';
const { GITHUB_TOKEN, GITHUB_REPOSITORY } = process.env;
const AUTH_HEADER = {
  Authorization: `token ${GITHUB_TOKEN}`,
};
const MILESTONES_ENDPOINT = `${GITHUB_API_URL}/repos/${GITHUB_REPOSITORY}/milestones`;

/**
 * Get milestones from GitHub repo
 * @return {Array} Array of milestones
 */
async function getMilestones() {
  return axios({
    method: 'GET',
    url: MILESTONES_ENDPOINT,
    headers: AUTH_HEADER,
    params: {
      state: 'all',
      sort: 'due_on',
      direction: 'desc',
    },
  });
}

/**
 * Create new milestone
 * @param {number} number Sprint number
 * @param {date} due_on Sprint due on date
 * @return {object} New milestone
 */
function createMilestone(number, due_on) {
  return axios({
    method: 'POST',
    url: MILESTONES_ENDPOINT,
    headers: AUTH_HEADER,
    data: {
      title: `Sprint #${number}`,
      due_on, // YYYY-MM-DDTHH:MM:SSZ
    },
  });
}

/**
 * Run the action main function
 */
async function main() {
  try {
    const sprintDuration = core.getInput('sprint-duration'); // Default is 1
    core.info('Getting last milestone...');
    const milestones = await getMilestones();
    const { lastNumber, lastDueOn } = getLastMilestone(milestones.data);
    core.info(`Last milestone number is ${lastNumber} due on ${lastDueOn}`);
    const { number, due_on } = calculateNextMilestone(lastNumber, lastDueOn, sprintDuration);
    core.info(`Creating new milestone with number ${number} and due on ${due_on} (sprint duration: ${sprintDuration})`);
    const createdMilestone = await createMilestone(number, due_on);
    core.setOutput('milestone-number', String(createdMilestone.data.number));
    core.setOutput('milestone-title', createdMilestone.data.title);
    core.setOutput('milestone-due_on', createdMilestone.data.due_on);
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
