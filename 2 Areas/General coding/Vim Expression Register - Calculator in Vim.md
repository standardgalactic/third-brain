- Temporary register that can be used to run snippets of Vim script
	- Can be used to evaluate Vim scripts without leaving the current editor context
	- Can also perform mathematical calculations


> [!info] How to enter "expression register" mode?
> `<ctrl-r>=` from insert mode

- Result of the expression is printed at the cursor position

> [!example] Example
> Typing `2 + 3` in the expression register and pressing `<Enter>` will print the output (`5`) at the cursor position

![[math-enter.mp4]]
## How to evaluate an expression already present in the file?
1. In visual mode, select the expression
2. `yank` the expression into Vim's default register, using `y`
3. Enter into expression register
4. `<ctrl-r>"` will help you paste the `yanked` expression into the register
5. `<enter>` will perform the calculation and print the result at the cursor position

![[math-yank.mp4]]

## Sources
- https://vimtricks.com/p/vim-calculator/
## Keywords
