![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article3.5c705a01b476.png)

## Metadata
- Author: [[rderik.com]]
- Full Title: Basics of stderr and stdout on Ruby scripts Oct 23 2018
- URL: https://rderik.com/blog/basics-of-stderr-and-stdout-on-ruby-scripts/

## Highlights
- In Ruby, we can access the standard output and standard error streams by the constants STDOUT and STDERR. Normally when we want to print to the screen we only use `puts`, in reality, this is syntactic sugar for `STDOUT.puts`. As with any other IO stream, we can send content to the stream using puts, print, printf and the other commands provided by the IO class. For example: ([View Highlight](https://read.readwise.io/read/01h6bpcrea3cvm4t7c1mym1hp8))
- STDOUT.puts('Hello, from STDOUT') #this will go to standard output STDERR.puts('Hello, from STDERR') # this will go to standard error ([View Highlight](https://read.readwise.io/read/01h6bpva7mk2mqr2jj8mz44n0s))
- It starts to get interesting when we redirect the output of one of the streams, in BASH the file identifier 1 is assigned to standard output and the file identifier 2 is assigned to standard error, so we could run something like this: ([View Highlight](https://read.readwise.io/read/01h6bpxjfnhny2cbmcqh8atj8w))
- ./streams_script 2> std_error.log Hello, from STDOUT ([View Highlight](https://read.readwise.io/read/01h6bpxnsyg8gavfq8d7ma0mw3))
- And the message from STDERR won’t show up, it has been redirected to the file `std_err.log`. We can do the same with standard output. ([View Highlight](https://read.readwise.io/read/01h6bpxw86jg54r7kjjsvmbtt4))
- ./streams_script 1> std_out.log
  Hello, from STDERR
  Now the message from STDOUT won’t show up on the screen because it was redirected to the file `std_out.log`. We could redirect standard output to one file and standard error to another file. ([View Highlight](https://read.readwise.io/read/01h6bpy063ps86kaq75cszd2sz))
- redirect both standard output and standard error to the same file:
  Copy ([View Highlight](https://read.readwise.io/read/01h6bpyhnrhj02vfxeh2efyg4y))
- When we send everything to standard output, even messages we want the user to take note of, we prevent our user from taking advantage of stream redirection. But when we allow the user to have access to those two streams the user can make decisions on where to look for data and has the ability to redirect to wherever he likes. ([View Highlight](https://read.readwise.io/read/01h6bpzy0kq3p5ep3ab2205a32))
- Scripts can be run on an interactive, when the user is logged in to a shell and runs the script directly on the shell, that shell session is interactive, our script can interact “interactively” with the user. If our script is being run on a background process or by other script or the output is being redirected it is said to be running a non-interactive TTY. ([View Highlight](https://read.readwise.io/read/01h6bq1ffwpghmp2w72zfzw9dt))
