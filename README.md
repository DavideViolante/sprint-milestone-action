# Sprint Milestone Action
Automatically generate Milestones to manage sprints

## Inputs

### sprint-duration

The duration of the sprint expressed in weeks. Default is `1`.

## Example usage

```yaml
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
        sprint-duration: 1 # Default
    - name: Sprint Milestone Step 2
      run: echo "${{ steps.sm1.outputs.milestone-title }} - ${{ steps.sm1.outputs.milestone-number }} - ${{ steps.sm1.outputs.milestone-dueon }}"
```
