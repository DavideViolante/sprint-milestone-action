const moment = require('moment');

function getLastMilestone(milestones) {
  if (!milestones.length) {
    return {
      lastNumber: 0,
      lastDueOn: moment().format()
    };
  }
  const sortedMilestones = milestones
        .filter((v) => v != null ? v.title.match(/Sprint #\d+/) : false)
        .sort((a, b) => {
        const s1 = a.title.substr(7, a.title.length - 1);
        const s2 = b.title.substr(7, b.title.length - 1);
        if (s1 < s2) {
            return -1;
        }
        else if (s1 > s2) {
            return 1;
        }
        return 0;
    }).reverse();
  return {
    lastNumber: sortedMilestones[0] != null ? parseInt(sortedMilestones[0].title.substring(8)) : 0,
    lastDueOn: sortedMilestones[0] ? sortedMilestones[0].due_on : moment().format()
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
