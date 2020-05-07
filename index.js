const core = require('@actions/core');
const axios = require('axios');
const moment = require('moment');

const GITHUB_API_URL = 'https://api.github.com';
const { GITHUB_TOKEN, GITHUB_REPOSITORY } = process.env;
const AUTH_HEADER = {
  Authorization: `token ${GITHUB_TOKEN}`
};
const MILESTONES_ENDPOINT = `${GITHUB_API_URL}/repos/${GITHUB_REPOSITORY}/milestones`;

async function getLastMilestone() {
  const allMilestones = await axios({
    method: 'GET',
    url: MILESTONES_ENDPOINT,
    headers: AUTH_HEADER,
    params: {
      state: 'all',
      sort: 'due_on',
      direction: 'desc'
    }
  });
  if (!allMilestones.data.length) {
    return {
      lastNumber: 1,
      lastDueOn: moment().format()
    };
  }
  return {
    lastNumber: allMilestones.data[0].number,
    lastDueOn: allMilestones.data[0].due_on
  };
}

function createMilestone(lastNumber, lastDueOn, sprintDuration) {
  return axios({
    method: 'POST',
    url: MILESTONES_ENDPOINT,
    headers: AUTH_HEADER,
    data: {
      title: `Sprint #${lastNumber + 1}`,
      due_on: moment(lastDueOn).add(+sprintDuration, 'week') // YYYY-MM-DDTHH:MM:SSZ
    }
  });
}

async function main() {
  try {
    const sprintDuration = core.getInput('sprint-duration'); // Default is 1
    core.info('Getting last milestone...');
    const { lastNumber, lastDueOn } = await getLastMilestone();
    core.info(`Last milestone number is ${lastNumber} due on ${lastDueOn}`);
    core.info(`Creating new milestone with number ${lastNumber} + 1 and due on ${lastDueOn} + ${sprintDuration} weeks`);
    const createdMilestone = await createMilestone(lastNumber, lastDueOn, sprintDuration);
    const { title, number, due_on } = createdMilestone.data;
    core.setOutput('milestone-title', title);
    core.setOutput('milestone-number', String(number));
    core.setOutput('milestone-dueon', due_on);
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();