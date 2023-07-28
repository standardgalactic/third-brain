#shorts 

## Command
`git commit --amend`

## About
- Modify the most recent commit
- Combine staged changes with the most recent commit, instead of creating a new commit
- Amending does not just alter the most recent commit, it replaces it entirely
	- Meaning the amended commit will be a new entity with its own ref
	- Amended commits are actually entirely new commits and the previous commit will no longer be on your current branch.
- Running this command when there is nothing staged lets you edit the previous commit’s message without altering its snapshot
- Adding the `-m` option allows you to pass in a new message from the command line without being prompted to open an editor.
```git
git commit --amend -m "an updated commit message"
```
- The `--no-edit` flag will allow you to make the amendment to your commit without changing its commit message

## Sources
- https://www.atlassian.com/git/tutorials/rewriting-history