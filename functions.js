const moment = require('moment');

/**
 * Get number and due on of last created milestone
 * @param {Array} milestones Milestones
 * @return {object} number and due on of last created milestone
 */
function getLastMilestone(milestones) {
  if (!milestones.length) {
    return {
      lastNumber: 1,
      lastDueOn: moment().format(),
    };
  }
  return {
    lastNumber: milestones[0].number,
    lastDueOn: milestones[0].due_on,
  };
}

/**
 * Get number and due on date of next milestone to create
 * @param {number} lastNumber Last milestone number
 * @param {date} lastDueOn Last milestone due on date
 * @param {number} sprintDuration Sprint duration in weeks
 * @return {object} Number and due on of next milestone
 */
function calculateNextMilestone(lastNumber, lastDueOn, sprintDuration) {
  return {
    number: lastNumber + 1,
    due_on: moment(lastDueOn).add(+sprintDuration, 'weeks').format(),
  };
}

module.exports = {
  getLastMilestone,
  calculateNextMilestone,
};
