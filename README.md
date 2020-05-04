# Sprint Milestone Action [![Donate](https://img.shields.io/badge/paypal-donate-179BD7.svg)](https://www.paypal.me/dviolante)
Automatically generate milestones to manage sprints.

## How it works
1. Get the current milestones
2. Get the milestone with the highest due date
3. Generate a new milestone using that `due date` + `sprint-duration` weeks (see inputs below)

## Inputs

### sprint-duration

The duration of the sprint expressed in weeks. Default is `1`.

## Example usage

```yaml
name: Sprint Milestone

on:
  schedule:
    # Every monday at 12UTC, create the new milestone
    - cron: "0 12 * * 1"

jobs:
  sprint_milestone_job:
    runs-on: ubuntu-latest
    name: Sprint Milestone
    steps:
    - name: Sprint Milestone Step 1
      id: sm1
      uses: davideviolante/sprint-milestone-action@v1
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        sprint-duration: 2 # Default is 1
    - name: Sprint Milestone Step 2
      run: echo -e "Milestone created!\nName=${{ steps.sm1.outputs.milestone-title }}\nNumber=${{ steps.sm1.outputs.milestone-number }}\nDueOn=${{ steps.sm1.outputs.milestone-dueon }}"
```

## Bug or feedback?
Please open an issue.

## Author
- [Davide Violante](https://github.com/DavideViolante)