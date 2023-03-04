- Generally, we use the `/c` flag to confirm each substitution. 
- However, if the number of search instances are high, confirming each substitution can be a pain
- So, we can use the Vim's global command `:g`, which invokes Ex commands across a range
	- The following command lets you review all the changes at a glance

## Command

`:g/MATCH/#|s/MATCH/REPLACE/g|#`

In the above command, we print out the line number and the actual line that matches the text. And then we print out the same but after the substitution is made

![[vim-substitution.gif]]

## Sources

```embed
title: 'Review Replacements in Vim'
image: 'https://s3.amazonaws.com/revue/issue_images/images/000/662/459/original/issue_image_1490608.jpg?1670257079'
description: 'Substitutions, Vim’s find-and-replace, are a heavily used Vim feature with many variations and options. We’ve written often of substitutions already, including using the /c flag to confirm substitutions before they happen.There’s another useful approach when performing a number of substitutions with…'
url: 'https://www.getrevue.co/profile/vim_tricks/issues/review-replacements-in-vim-1490608'
```
## Keywords
