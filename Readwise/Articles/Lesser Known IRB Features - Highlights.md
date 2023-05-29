![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article1.be68295a7e40.png)

## Metadata
- Author: [[Dante Catalfamo]]
- Full Title: Lesser Known IRB Features
- URL: https://blog.lambda.cx/posts/lesser-known-irb-features/?utm_source=shortruby&utm_campaign=shortruby_0040&utm_medium=email

## Highlights
- `pushb <obj>`, `pushws`, `irb_push_workspace`, `irb_push_binding` change the current context (binding) to whatever object you pass as arg. It pushes your binding onto the `workspaces` stack. ([View Highlight](https://read.readwise.io/read/01gzee0gwc0wtmmhjr9r16rgw2))
- `popb`, `popws`, `irb_pop_workspace`, `irb_push_binding` pop your current workspace off the stack and take you out and bring you to your previous binding environment. ([View Highlight](https://read.readwise.io/read/01gzee60560zzhbwzdcfbv05zr))
- • • `cb [obj]`, `cws`, `chwd`, `irb_cb`, `irb_cws`, `irb_chws`, `irb_change_binding` change the current context without pushing the current context onto the stack, and change to the default context when called without an argument. ([View Highlight](https://read.readwise.io/read/01gzee7h1mprvx255rw2bn1dyn))
- • • `ls [obj]` lists the contents of an object (methods, inherited methods, instance variables, etc.) ([View Highlight](https://read.readwise.io/read/01gzee7wdhcf8frkdvkhb7a2b8))
- Running `irb` creates a sub-IRB. ([View Highlight](https://read.readwise.io/read/01gzee8f67qhxyg5te4hmjnrs7))
- `jobs` lists existing sub-IRBs ([View Highlight](https://read.readwise.io/read/01gzee8jxfj0h0p0p820nyjcp9))
- `fg <num>` lets you change sub-IRB ([View Highlight](https://read.readwise.io/read/01gzee8whs87sj40f64d36c5ka))
- `kill <num>` kills the given sub-IRB ([View Highlight](https://read.readwise.io/read/01gzee8zjntw9287nctt6kpe4c))
- `show_source <obj/method>` Displays the file path a method or object was defined in, and prints its contents ([View Highlight](https://read.readwise.io/read/01gzee98janv3wv01ne9pvz1yk))
- `show_doc [method]` Either opens the documentation for the constant or method provided as an argument, or opens an RI documentation prompt of no argument is given. ([View Highlight](https://read.readwise.io/read/01gzee9q9g1j2c5whd9cnt4c0v))
- • • `whereami` lists the current line of execution of the binding. This is useful if you open IRB from `binding.irb` or `binding.b` ([View Highlight](https://read.readwise.io/read/01gzeegtngbsrcb4yhrkx10p8j))
- `show_cmds` lists most of these commands inside of IRB :) ([View Highlight](https://read.readwise.io/read/01gzeegy6xy2x2fajm4jyzsj0e))
