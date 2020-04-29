const core = require('@actions/core');
//const github = require('@actions/github');
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

function createMilestone(lastNumber, lastDueOn) {
  return axios({
    method: 'POST',
    url: MILESTONES_ENDPOINT,
    headers: AUTH_HEADER,
    data: {
      title: `Sprint #${lastNumber + 1}`,
      due_on: moment(lastDueOn).add(1, 'week') // YYYY-MM-DDTHH:MM:SSZ
    }
  });
}

async function main() {
  try {
    console.log('Getting last milestone...');
    const { lastNumber, lastDueOn } = await getLastMilestone();
    console.log('Creating new milestone...');
    const createdMilestone = await createMilestone(lastNumber, lastDueOn);
    core.setOutput('milestonenumber', String(createdMilestone.data.number));
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();