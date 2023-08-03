#shorts

```git
git rebase --onto <newbase> <oldbase>
```

- Enables a more powerful form or rebase that allows passing specific refs to be the tips of a rebase

## Explanation
Consider this example repo 👇🏽

![[Pasted image 20221208155445.png]]

We don't want `featureB` to be based off `featureA`. We want it to be branched off `main`.

This is what we want 👇

![[Pasted image 20221208155601.png]]

Command that will help us get it 👇
```git
git rebase --onto main featureA featureB
```

## Sources
- https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase