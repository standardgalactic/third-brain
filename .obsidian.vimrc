" Have j and k navigate visual lines rather than logical ones
nmap j gj
nmap k gk

" Yank to system clipboard
set clipboard=unnamed

" Yank line starting from current cursor to end of line
nmap Y y$

" Go back and forward with Ctrl+O and Ctrl+I
" (make sure to remove default Obsidian shortcuts for these to work)
exmap back obcommand app:go-back
nmap <C-o> :back
exmap forward obcommand app:go-forward
nmap <C-i> :forward

" Use jk to get out of insert mode
imap jk <Esc> 

" Surround text with [[ ]] to make a wikilink
" Define wiki as the command to do the surround
exmap wiki surround [[ ]]

" Use space bar to toggle folds
exmap togglefold obcommand editor:toggle-fold
nmap <Space> :togglefold

" Emulate Tab Switching https://vimhelp.org/tabpage.txt.html#gt
" requires Cycle Through Panes Plugins https://obsidian.md/plugins?id=cycle-through-panes
exmap tabnext obcommand cycle-through-panes:cycle-through-panes
nmap <C-l> :tabnext
imap <C-l> :tabnext
exmap tabprev obcommand cycle-through-panes:cycle-through-panes-reverse
nmap <C-h> :tabprev
imap <C-h> :tabprev

" Jump around the headers
exmap nextHeading jsfile mdHelpers.js {jumpHeading(true)}
exmap prevHeading jsfile mdHelpers.js {jumpHeading(false)}
nmap ]] :nextHeading
nmap [[ :prevHeading
