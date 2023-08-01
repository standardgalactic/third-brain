#shorts

## Command
`git rebase`

## About
- Changes the snapshot. New commits will replace the old
- In standard mode, it allows you to literally rewrite history — automatically applying commits in your current working branch to the passed branch head
- Process of moving or combining a sequence of commits to a new base commit. 
![[git_rebase.svg]]

*In the above image, the green commits are formed after a rebase*

- Rebasing is changing the base of your branch from one commit to another making it appear as if you'd created your branch from a different commit

> [!tip] Rebase the current branch on master
> `git rebase master`
> This will change the commits in such a way that it would appear that your current branch was created off the latest `master` commit

## Two modes of `git rebase`
### Manual / Standard
```git
git rebase <baseBranch>
```
- The above command will rebase your current branch onto the `baseBranch`
- `baseBranch` can be any type of commit reference:
	- Branch name, a tag, commit ID, relative reference to `HEAD`
- Rebasing means the current branch's commits will be put on top of the `baseBranch`

### Interactive mode
```git
git rebase -i <baseBranch>
```
- `-i` flag stands for interactive mode
- Instead of blindly moving all of the commits to the new base, interactive rebasing gives you the opportunity to alter individual commits in the process.
- It rebases the current branch onto `baseBranch` , but opens an editor where you can enter commands for each commit
	- These commands determine how individual commits will be transferred to the new base
	
## Rebase commands
- `drop (d)` - Discard the commit from the final combined commit block
- `pick (p)` - Leaves the commit untouched. Will still be an individual commit in the branch's history
- `exec (x)` - executes a command line script on each marked commit
- `reword (r)` - use commit, but edit the commit message
- `e, edit` - use commit, but stop for amending 
- `s, squash` - use commit, but meld into previous commit
- `f, fixup` - like "squash", but discard this commit's log message


> [!info] Things to keep in mind
> - Commits modified with a rebase command have a different ID than either of the original commits.
> - Commits marked with pick will have a new ID if the previous commits have been rewritten.


## Configuration options
The following rebase properties can be set using `git config`
- `rebase.stat` - False by default. The option toggles display of visual diffstat content that shows what changed since the last rebase.
- `rebase.autoSquash` - Boolean. Toggles the `--autosquash` behaviour
- `rebase.missingCommitsCheck` - Change behaviour around missing commits. Multiple possible values:
	- `warn` - Prints warning output in interactive mode which warns of removed commits
	- `error` - Stops the rebase and prints removed commit warning messages
	- `ignore` - Set by default this ignores any missing commit warnings
- `rebase.instructionFormat` - A `git log` format string that will be used for formatting interactive rebase display

## Additional rebase flags
- `--continue` - Advance the rebase after all conflicts are resolved
- `--abort` - Reset the rebase. Cancel the rebase
- `--onto` - [[Using git rebase onto]]

## Are my commits gone when dropped in interactive mode?
No. Using `git reflog` can help restore those "lost" commits

## Sources
- https://www.atlassian.com/git/tutorials/rewriting-history
- https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase