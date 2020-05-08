# Sprint Milestone Action
[![](https://github.com/davideviolante/sprint-milestone-action/workflows/Tests/badge.svg)](https://github.com/DavideViolante/sprint-milestone-action/actions?query=workflow%3ATests) [![Maintainability](https://api.codeclimate.com/v1/badges/60f9b3a6b4177a0bfe77/maintainability)](https://codeclimate.com/github/DavideViolante/sprint-milestone-action/maintainability) [![Donate](https://img.shields.io/badge/paypal-donate-179BD7.svg)](https://www.paypal.me/dviolante)

Automatically generate milestones to manage sprints.

## How it works
1. Get the current milestones
2. Get the milestone with the highest due date
3. Generate a new milestone using that `due date` + `sprint-duration` weeks (see inputs below)

## Inputs

### sprint-duration

The duration of the sprint expressed in weeks. Default is `1`.

## Outputs

### milestone-number

The new milestone number.

### milestone-title

The new milestone title.

### milestone-due_on

The new milestone due on.

## Example usage

```yaml
name: Sprint Milestone

on:
  schedule:
    # Every monday at 12UTC, create the new milestone
    - cron: "0 12 * * 1"

jobs:
  sprint_milestone:
    runs-on: ubuntu-latest
    steps:
    - uses: davideviolante/sprint-milestone-action@v2.0.0
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        sprint-duration: 2 # Default is 1
```

## Bug or feedback?
Please open an issue.

## Author
- [Davide Violante](https://github.com/DavideViolante)
