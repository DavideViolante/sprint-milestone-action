const moment = require('moment');
const assert = require('assert');

const { calculateNextMilestone, getLastMilestone } = require('../functions');

// Mock milestones are ordered by due_on desc by GitHub APIs (no need to test it)
const mockMilestones = [
  {
    number: 3,
    title: 'Sprint #195',
    due_on: '2019-11-04T07:00:00Z',
  },
  {
    number: 1,
    title: 'Sprint #193',
    due_on: '2019-10-21T07:00:00Z',
  },
  {
    number: 2,
    title: 'Sprint #191',
    due_on: '2019-10-07T07:00:00Z',
  }
];
const mockMilestonesNoData = [];

describe('Sprint Milestone Action tests', () => {
  
  it('Should get the milestone with highest due on', () => {
    const { lastNumber, lastDueOn } = getLastMilestone(mockMilestones);
    assert.equal(lastNumber, 3);
    assert.equal(lastDueOn, '2019-11-04T07:00:00Z');
  });
  
  it('Should create a new milestone if none are found', () => {
    const { lastNumber, lastDueOn } = getLastMilestone(mockMilestonesNoData);
    assert.equal(lastNumber, 1);
    assert.equal(moment(lastDueOn).format(), moment().format());
  });

  it('Should calculate the next milestone number and due on (sprint duration 1)', () => {
    const lastNumber = 1;
    const lastDueOn = new Date();
    const sprintDuration = 1;
    const { number, due_on } = calculateNextMilestone(lastNumber, lastDueOn, sprintDuration);
    assert.equal(number, 2);
    assert.equal(moment(due_on).format(), moment().add(sprintDuration, 'weeks').format());
  });

  it('Should calculate the next milestone number and due on (sprint duration 2)', () => {
    const lastNumber = 1;
    const lastDueOn = new Date();
    const sprintDuration = 2;
    const { number, due_on } = calculateNextMilestone(lastNumber, lastDueOn, sprintDuration);
    assert.equal(number, 2);
    assert.equal(moment(due_on).format(), moment().add(sprintDuration, 'weeks').format());
  });
  
});
