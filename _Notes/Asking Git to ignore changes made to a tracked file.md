#shorts 

## Command
`git update-index --assume-unchanged <file>`

## What does it do?
- Asks git to ignore any changes made to the file.
- Useful when you want to modify a file without committing to the repository.
- By using the flag, `--assume-unchanged`, Git will assume that the file has not been modified since the last commit (even if the file has actually changed)
- This means that any local changes to the file will not be staged when running `git add .`

## How to undo this action
`git update-index --no-assume-unchanged <file>`

## Sources

## Related Notes
- [[Ignore files in Git without changing gitignore]]