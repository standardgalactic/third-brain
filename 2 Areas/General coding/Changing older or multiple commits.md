## Command
`git rebase`

## About
- Changes the snapshot. New commits will replace the old
- In standard mode, it allows you to literally rewrite history — automatically applying commits in your current working branch to the passed branch head
- Process of moving or combining a sequence of commits to a new base commit. 
![[git_rebase.svg]]

*In the above image, the green commits are formed after a rebase*

- Rebasing is changing the base of your branch from one commit to another making it appear as if you'd created your branch from a different commit

> [!NOTE] Rebase the current branch on master
> `git rebase master`
> This will change the commits in such a way that it would appear that your current branch was created off the latest `master` commit

## Two modes of `git rebase`
### Manual / Standard
```git
git rebase <baseBranch>
```
The above command will rebase your current branch onto the `baseBranch`

## Flags (Options)
| Flag | About |
| ---- | ----- |
| `-i` | Interactive mode. Alter individual commits      |
## Sources
- https://www.atlassian.com/git/tutorials/rewriting-history
## Keywords
