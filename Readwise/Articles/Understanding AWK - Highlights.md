![rw-book-cover](https://earthly.dev/blog/generated/assets/images/awk-examples/header-800-983518271.jpg)

## Metadata
- Author: [[Adam Gordon Bell]]
- Full Title: Understanding AWK
- URL: https://earthly.dev/blog/awk-examples/

## Highlights
- awk was designed to let you do calculations on lines. ([View Highlight](https://read.readwise.io/read/01h2xfb88zfeymcq0y6hfn0zfb))
- If you are doing something more involved with Awk, take the time to install GNU Awk (`gawk`). I did this using Homebrew (`brew install gawk`) ([View Highlight](https://read.readwise.io/read/01h2xfdkn200axfa6fryphk2ry))
- By default, Awk expects to receive its input on standard in and output its results to standard out ([View Highlight](https://read.readwise.io/read/01h2xffsb546m6g94bnsvgjc44))
- the simplest thing you can do in Awk is print a line of input.
  >_`$ echo "one two three" | awk '{ print }' one two three` ([View Highlight](https://read.readwise.io/read/01h2xfg2tdtpnw557mfxajfcfx))
- You can selectively choose columns (which Awk calls fields): ([View Highlight](https://read.readwise.io/read/01h2xfh0apj2nqd37gs5ebcj3k))
- echo "one two three" | awk '{ print $1 }' one ([View Highlight](https://read.readwise.io/read/01h2xfh7t94kmnvndh3fw37wre))
- echo "one two three" | awk '{ print $2 }' two ([View Highlight](https://read.readwise.io/read/01h2xfhc8eg1x44dvn9bhrdqk9))
- echo "one two three" | awk '{ print $3 }' three ([View Highlight](https://read.readwise.io/read/01h2xfhgn5202f76qd2tbd1512))
- echo "one two three" | awk '{ print $0 }' ([View Highlight](https://read.readwise.io/read/01h2xfjak46z48cpv7hfkg26w2))
    - Note: Prints the entire line
- Awk refers to each line as a record and each column as a field. ([View Highlight](https://read.readwise.io/read/01h2xfjwxvb65p28m15ybrcbtk))
- can do this across multiple lines:
  >_`$ echo " one two three four five six" \ | awk '{ print $1 }` ([View Highlight](https://read.readwise.io/read/01h2xfky7q7svg9fxxs9v15h3m))
- I can print more than one column:
  >_`$ echo " one two three four five six" \ | awk '{ print $1, $2 }'`
  one two
  four five ([View Highlight](https://read.readwise.io/read/01h2xfm30z5xc1qzgj5vcvdx7g))
- Awk also includes `$NF` for accessing the last column:
  >_`$ echo " one two three four five six" \ | awk '{ print $NF }'` ([View Highlight](https://read.readwise.io/read/01h2xfmddf1apqyswg4zkhrqx5))
- I will use the book portion of the [amazon product reviews dataset](https://s3.amazonaws.com/amazon-reviews-pds/tsv/index.txt) for the rest of this tutorial. ([View Highlight](https://read.readwise.io/read/01h2yd94rgx4tzvtsw75nyse4x))
- curl https://s3.amazonaws.com/amazon-reviews-pds/tsv/amazon_reviews_us_Books_v1_00.tsv.gz | / gunzip -c >> / bookreviews.tsv ([View Highlight](https://read.readwise.io/read/01h2yd9aepw2vnf4tmn24vgfcx))
- Once you’ve grabbed that data, you should have Amazon book review data that looks like this:
  marketplace customer_id review_id product_id product_parent product_title product_category star_rating helpful_votes total_votes vine verified_purchase review_headline review_body review_date
  US 22480053 R28HBXXO1UEVJT 0843952016 34858117 The Rising Books 5 0 0 N N Great Twist on Zombie Mythos I've known about this one for a long time, but just finally got around to reading it for the first time. I enjoyed it a lot! What I liked the most was how it took a tired premise and breathed new life into it by creating an entirely new twist on the zombie mythos. A definite must read! 2012-05-03 ([View Highlight](https://read.readwise.io/read/01h2yda3g2x33r0b1p9tvvvw8n))
- the customer_id:
  >_`$ awk '{ print $2 }' bookreviews.tsv | head` 
  customer_id
  22480053
  44244451
  20357422
  13235208
  26301786
  27780192
  13041546
  51692331
  23108524 ([View Highlight](https://read.readwise.io/read/01h2ydd566m19j839g4aqvndnw))
- when I try to print out the title, things do not go well:
  >_`$ awk '{ print $6 }' bookreviews.tsv | head` 
  product_title
  The
  Sticky
  Black
  Direction
  Until
  Unfinished
  The
  Good
  Patterns ([View Highlight](https://read.readwise.io/read/01h2yddakbex6xwv2ebfzvvyfc))
- By default, Awk assumes that the fields in a record are whitespace delimited[1](https://earthly.dev/blog/awk-examples/#fn1). I can change the field separator to use tabs using the `awk -F` option:
  >_`$ awk -F '\t' '{ print $6 }' bookreviews.tsv | head` ([View Highlight](https://read.readwise.io/read/01h2yde9w53xxkmpa2m96dw3yj))
- I can also work backward from the last position forward by subtracting from `NF` ([View Highlight](https://read.readwise.io/read/01h2ydew0bz07h8abm3t0e74p2))
- awk -F '\t' '{ print $NF "\t" $(NF-2)}' bookreviews.tsv | head ([View Highlight](https://read.readwise.io/read/01h2ydf85qesmhgf07srzh9myg))
- `NF` is a variable holding the *Number of Fields* in a record. So I’m just using its value as an index to refer to the last field. ([View Highlight](https://read.readwise.io/read/01h2ydgckrzqb73y2s1f1dw8jp))
- awk -F '\t' '{ print NF }' bookreviews.tsv | head ([View Highlight](https://read.readwise.io/read/01h2ydgp4mt0de8n1z095axpq3))
- Another variable Awk offers up for use is `NR`, the *number of records* so far. `NR` is handy when I need to print line numbers:
  >_`$ awk -F '\t' '{ print NR " " $(NF-2) }' bookreviews.tsv | head` ([View Highlight](https://read.readwise.io/read/01h2ydjr5srgzd9713r7x8y96w))
- real power of Awk comes from pattern matching. And you can give Awk a pattern to match each line on like this:
  >_`$ echo "aa bb cc" | awk '/bb/' bb` ([View Highlight](https://read.readwise.io/read/01h2ydkt4h4k6q6b2epvcp1557))
- You can also combine this with the field access and printing we’ve done so far:
  >_`$ echo "aa 10 bb 20 cc 30" | awk '/bb/ { print $2 }' 20` ([View Highlight](https://read.readwise.io/read/01h2ydmhhpq50newmsabm9mh7e))
- awk -F '\t' '/Hunger Games/ { print $6, $8 }' bookreviews.tsv | head
  The Hunger Games (Book 1) 5
  The Hunger Games Trilogy Boxed Set 5
  The Hunger Games Trilogy: The Hunger Games / Catching Fire / Mockingjay 5
  Catching Fire |Hunger Games|2 4
  The Hunger Games (Book 1) 5
  Catching Fire |Hunger Games|2 5
  The Hunger Games Trilogy: The Hunger Games / Catching Fire / Mockingjay 5
  Blackout 3
  The Hunger Games Trilogy: The Hunger Games / Catching Fire / Mockingjay 4 ([View Highlight](https://read.readwise.io/read/01h2ydpa5hhrwrc0wr2h776qws))
- first there is a problem. I’m getting reviews from more than one book here. `/Hunger Games/` matches anywhere in the line and I’m getting all kinds of ‘Hunger Games’ books returned. I’m even getting books that mention “Hunger Games” in the review text: ([View Highlight](https://read.readwise.io/read/01h2ydqw95bs5f6jm010v83919))
- awk -F '\t' '/Hunger Games/ { print $6 }' bookreviews.tsv | sort | uniq 
  Birthmarked
  Blood Red Road
  Catching Fire (The Hunger Games)
  Divergent
  Enclave
  Fire (Graceling Realm Books)
  Futuretrack 5
  Girl in the Arena
  ... ([View Highlight](https://read.readwise.io/read/01h2yds1bsy796qndf6z2tdk9m))
- fix this by using the `product_id` field to pattern match on:
  >_`$ awk -F '\t' '$4 == "0439023483" { print $6 }' bookreviews.tsv | sort | uniq` 
  The Hunger Games (The Hunger Games, Book 1) ([View Highlight](https://read.readwise.io/read/01h2ydsgmdt2bmrvb2v2cs8c0j))
- `printf` works like it does in the C and uses a format string and a list of values. You can use `%s` to print the next string value.
  So my `print $15 "\t" $13 "\t" $8` becomes `printf "%s \t %s \t %s", $15, $13, $8`. ([View Highlight](https://read.readwise.io/read/01h2yp83067py1njabm1f7w6d7))
- From there I can add right padding and fix my layout by changing `%s` to `%-Ns` where `N` is my desired column width: ([View Highlight](https://read.readwise.io/read/01h2yp9qzf5jx0jap4jg9pvyn7))
- awk -F '\t' \ '$4 == "0439023483" { printf "%s \t %-20s \t %s \n", $15, $13, $8}' \ bookreviews.tsv | head ([View Highlight](https://read.readwise.io/read/01h2ypa1hyf3csz9hrdcj56398))
- some of the titles are just too long. I can shorten them to 20 characters with `substr($13,1,20)`. ([View Highlight](https://read.readwise.io/read/01h2ypajtarqynp11162hyq52j))
- awk -F '\t' \ '$4 == "0439023483" { printf "%s \t %-20s \t %s \n",$15,substr($13,1,20),$8 }' \ bookreviews.tsv | head ([View Highlight](https://read.readwise.io/read/01h2ypb5dr0y13mewkfnkp5dhf))
- I want to calculate the average rating for book reviews in this data set. To do that, I need to use a variable. However, I don’t need to declare the variable or its type. I can just use it: ([View Highlight](https://read.readwise.io/read/01h32k1scznh10gw1b9c8pg7cc))
- can add up and print out a running total of review_stars (`$8`) like this:
  >_`$ awk -F '\t' '{ total = total + $8; print total }' bookreviews.tsv | head` ([View Highlight](https://read.readwise.io/read/01h32k3182nphe73paj9z62339))
- And to turn this into an average, I can use `NR` to get the total amount of records and `END` to run an action at the end of the processing. ([View Highlight](https://read.readwise.io/read/01h32k3db2b46zykezacn0xv32))
- awk -F '\t' ' { total = total + $8 } END { print "Average book review:", total/NR, "stars" } ' bookreviews.tsv | head ([View Highlight](https://read.readwise.io/read/01h32k3sc2bfre3759cnrctb5w))
- can also use `BEGIN` to run an action before Awk starts processing records.
  >_ `$ awk -F '\t' ' BEGIN { print "Calculating Average ..." } { total = total + $8 } END { print "Average book review:", total/NR, "stars" } ' bookreviews.tsv` ([View Highlight](https://read.readwise.io/read/01h32k46y2743gkgx7thnnqfcm))
- Awk provides two special patterns, `BEGIN` and `END`. You can use them to run actions before and after processing the records ([View Highlight](https://read.readwise.io/read/01h32k5b8j3akc1yd0gx77p482))
- this is how you would initialize data, print headers and footer, or do any start-up or tear-down stuff in Awk.
  It ends up looking like this:
  >_`$ awk ' BEGIN { print "start up" } { print "line match" } END { print "tear down" }'` ([View Highlight](https://read.readwise.io/read/01h32k604rxxe28b81mfy7c0nn))
- Printing files with a human readable size:
  >_`$ ls -lh | awk '{ print $5,"\t", $9 }'` 
  7.8M The_AWK_Programming_Language.pdf
  6.2G bookreviews.tsv ([View Highlight](https://read.readwise.io/read/01h32k733q4bvkjkn1kt6846np))
- Getting the containerID of running docker containers:
  >_`$ docker ps -a | awk '{ print $1 }'`
  CONTAINER
  08488f220f76
  3b7fc673649f ([View Highlight](https://read.readwise.io/read/01h32k7xq5jtj0mkn744034r9s))
- You can combine that last one with a regex to focus on a line you care about. Here I stop `postgres`, regardless of its tag name:
  >_`$ docker stop "$(docker ps -a | awk '/postgres/{ print $1 }')"` ([View Highlight](https://read.readwise.io/read/01h32k8dc8xcmhvm4k8xe1cbxs))
- In my mind, once an Awk program spans multiple lines, it’s time to consider putting it into a file. ([View Highlight](https://read.readwise.io/read/01h32k9x0matjpd32wqr4y4bw7))
- Once we move beyond one-liners, a natural question is *why*. As in ‘Why not use Python? Isn’t it good at this type of thing?’ ([View Highlight](https://read.readwise.io/read/01h32ka1dqmfejax4xcz69rad6))
- First, Awk is great for writing programs that are, at their core, a glorified for loop over some input. If that is what you are doing, and the control flow is limited, using Awk will be more concise than Python. ([View Highlight](https://read.readwise.io/read/01h32kaggasd6hstz3vr50grkq))
- Second, if you need to rewrite your Awk program into Python at some point, so be it. It’s not going to be more than 100 lines of code, and the translation process will be straightforward. ([View Highlight](https://read.readwise.io/read/01h32kaqe75v7ree0scaddg1da))
- Third, why not? Learning a new tool can be fun. ([View Highlight](https://read.readwise.io/read/01h32kask0ntvfbhrya5gn0614))
- embed Awk into a bash script:
  exec awk -F '\t' '
  { total = total + $8 }
  END { print "Average book review is", total/NR, "stars" } 
  ' $1 ([View Highlight](https://read.readwise.io/read/01h32kc10ef6smwg8hm7h4r245))
- can use a shebang (`#!`):
  average.awk`#!/usr/bin/env -S gawk -f BEGIN { FS = "\t" } { total = total + $8 } END { print "Average book $6 review is", total/NR, "stars" }` ([View Highlight](https://read.readwise.io/read/01h32kc8389fdpywvxhzwedb2z))
- And run it like this
  >_`$ ./average.awk bookreviews.tsv`
  Or you can also pass it to awk directly using `-f`:
  >_`$ awk -f average.awk bookreviews.tsv` ([View Highlight](https://read.readwise.io/read/01h32kczmxf7bcdjbbvbm1cw7s))
- I’d like to know if the series stays strong or if it’s a single great book that the author stretched out into a trilogy. If the reviews decline quickly, then that is not a good sign. I should be able to see which book was rated the best and which was the worst. Let’s find out. ([View Highlight](https://read.readwise.io/read/01h35883ve7vgmgrd6ab7qaxg5))
- If I were going to calculate the averages in Python, I would loop over the list of reviews and use a dictionary to track the total stars and total reviews for each. ([View Highlight](https://read.readwise.io/read/01h3588a0px4tv9kgvqrmctjh7))
- hungergames.awk`BEGIN { FS = "\t" } $6~/\(The Hunger Games(, Book 1)?\)$/ { title[$6]=$6 count[$6]= count[$6] + 1 total[$6]= total[$6] + $8 } END { for (i in count) { printf "---------------------------------------\n" printf "%s\n", title[i] printf "---------------------------------------\n" printf "Ave: %.2f\t Count: %s \n\n", total[i]/count[i], count[i] } }` ([View Highlight](https://read.readwise.io/read/01h3588nzbph738m7ax69zqb8n))
- awk -f hungergames.awk bookreviews.tsv ([View Highlight](https://read.readwise.io/read/01h3588w2n1hxr1ykz0f6wc1pq))
- First, I need to calculate the global average but adding up the total and average for every row: ([View Highlight](https://read.readwise.io/read/01h358chdekjdr7wa24eq8ptqp))
- hungergames.awk`{ # Global Average g_count = g_count + 1 g_total = g_total + $8 }` ([View Highlight](https://read.readwise.io/read/01h358cpfx8e6fe13aqvqy3y3h))
- hungergames.aw`END { g_score = g_total/g_count ... }` ([View Highlight](https://read.readwise.io/read/01h358cy5abbftybzbngqp6me9))
- hungergames.awk`END { g_score = g_total/g_count for (i in count) { score = total[i]/count[i] printf "%-30s\t", substr(title[i],1,30) if (score - g_score > .5) printf "👍👍👍" else if (score - g_score > .25) printf "👍👍" else if (score - g_score > 0) printf "👍" else if (g_score - score > 1) printf "👎👎👎" else if (g_score - score > .5) printf "👎👎" else if (g_score - score > 0) printf "👎" printf "\n" } }` ([View Highlight](https://read.readwise.io/read/01h358e2dtmfmxerc0c4vtv34a))
- The values for partitioning are just a guess, but it makes it easier for me to understand the rankings: ([View Highlight](https://read.readwise.io/read/01h358e6kpf7scsgtfdpkkp5nv))
- The Hunger Games (The Hunger G 👍 Catching Fire: The Official Il 👍👍👍 Mockingjay (The Hunger Games) 👎👎 The Two Towers (The Lord of th 👍👍 The Fellowship of the Ring (Th 👍👍 The Return of the King (The Lo 👍👍👍 ([View Highlight](https://read.readwise.io/read/01h358eat2yegebw9ctx5x3g23))
- Awk (specifically gawk) allows you easily configure your iteration order using a magic variable called `PROCINFO["sorted_in"]`. This means that if I change our program to sort by value and drop the filtering, then I will be able to see the top reviewed books: ([View Highlight](https://read.readwise.io/read/01h358g362r5sryn2tth79hpe4))
- top_books`exec gawk -F '\t' ' { # Global Average g_count = g_count + 1 g_total = g_total + $8 title[$6]=$6 count[$6]= count[$6] + 1 total[$6]= total[$6] + $8 } END { PROCINFO["sorted_in"] = "@val_num_desc" # <-- Print in value order g_score = g_total/g_count for (i in count) { score = total[i]/count[i] printf "%-50s\t", substr(title[i],1,50) if (score - g_score > .4) printf "👍👍👍" else if (score - g_score > .25) printf "👍👍" else if (score - g_score > 0) printf "👍" else if (g_score - score > 1) printf "👎👎👎" else if (g_score - score > .5) printf "👎👎" else if (g_score - score > 0) printf "👎" printf "\n" } } ' bookreviews.tsv` ([View Highlight](https://read.readwise.io/read/01h358gqfk0j752fz7crsqhf70))
- A good programmer uses the most powerful tool to do a job. A great programmer uses the least powerful tool that does the job. ([View Highlight](https://read.readwise.io/read/01h358hg7g0exg2z8ej7qn6bwa))
