const moment = require('moment');

function getLastMilestone(milestones) {
  if (!milestones.length) {
    return {
      lastNumber: 1,
      lastDueOn: moment().format()
    };
  }
  return {
    lastNumber: milestones[0].number,
    lastDueOn: milestones[0].due_on
  };
}

function calculateNextMilestone(lastNumber, lastDueOn, sprintDuration) {
  return {
    number: lastNumber + 1,
    due_on: moment(lastDueOn).add(+sprintDuration, 'weeks').format()
  }
}

module.exports = {
  getLastMilestone,
  calculateNextMilestone
};
