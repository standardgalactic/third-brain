![rw-book-cover](https://res.cloudinary.com/practicaldev/image/fetch/s--Lu5HTK7X--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/im5skegh0t1qydqwwbbv.jpg)

## Metadata
- Author: [[DEV Community 👩‍💻👨‍💻]]
- Full Title: Regex for Lazy Developers
- Category: #articles
- URL: https://dev.to/sineni/regex-for-lazy-developers-cg1

## Highlights
- **`^`** - start of string (means that the input string must start with the next character after that. Not suitable if you don't know the first character of the input string). ([View Highlight](https://read.readwise.io/read/01gqs22ftezezm5r981gwq5ev3))
^rwID-464312982
- **`$`** - end of string (means that all conditions before this character will be the final result of the input string and after them there is nothing further. Not suitable if you want to return several results from the input string). ([View Highlight](https://read.readwise.io/read/01gqs22y2v82hw5nn14ntqtn94))
^rwID-464312994
- **`*`** - means that the previous condition before the given symbol may occur one or more times or not at all (respectively, it may be repeated). ([View Highlight](https://read.readwise.io/read/01gqs50n7k3qm6be9xbtegb52q))
^rwID-464325258
- **`+`** - means that the previous condition before this symbol must occur one or more times (respectively, it can be repeated). ([View Highlight](https://read.readwise.io/read/01gqs50wqx941hp4cmb1zzxr5c))
^rwID-464325263
- **`[a-z]`** - enumeration of a valid character in the input string, that is, it can be any lowercase Latin letter (a or b or c ... or x or y or z). ([View Highlight](https://read.readwise.io/read/01gqs59qms6q3b7teh1crmkrsa))
^rwID-464326662
- **`[0-9]`** - enumeration of a valid character in the input string, that is, it can be any lowercase Latin letter (1 or 2 or 3 ... or 7 or 8 or 9). ([View Highlight](https://read.readwise.io/read/01gqs59y9zgfp1q6nx2jaz2x8x))
^rwID-464326695
- **`.`** - any single character. ([View Highlight](https://read.readwise.io/read/01gqs5a31gky0zhbh6cgzh87yx))
^rwID-464326738
- **`\`** - selection of any special character. ([View Highlight](https://read.readwise.io/read/01gqs5a6r73c7ht5xdzh1tnp3q))
^rwID-464326745
- **`|`** – OR logical operation (condition to the left or the condition to the right of this operand must be fulfilled) ([View Highlight](https://read.readwise.io/read/01gqs5acckh90ekjkq2pbwg46f))
^rwID-464326755
- **`\d`** ≡ **`[0-9]`** - any character from 0 to 9 ([View Highlight](https://read.readwise.io/read/01gqs5arcntr3v5eychfxfej2e))
^rwID-464326771
- **`\D`** ≡ **`[^0-9]`** - any character except numbers ([View Highlight](https://read.readwise.io/read/01gqs5az052hp2afgab6gebe8k))
^rwID-464326785
- **`\w`** ≡ **`[a-zA-Z0-9_]`** - any Latin character, all numbers and “_” ([View Highlight](https://read.readwise.io/read/01gqs5b6j5r57eenj883ywn2bb))
^rwID-464326791
- **`\W`** ≡ **`[^a-zA-Z0-9_]`** – any character except Latin characters, numbers and “_” ([View Highlight](https://read.readwise.io/read/01gqs5bbbztx55a3s243fm30td))
^rwID-464326834
- **`\s`** ≡ **`[ ]`** - space only ([View Highlight](https://read.readwise.io/read/01gqs5benfdy8qcgqyzgn7cezf))
^rwID-464326837
- **`\S`** ≡ **`[^ ]`** - any character except space ([View Highlight](https://read.readwise.io/read/01gqs5bhhbrvbc95wjy3vq3bxc))
^rwID-464326838
- **`{3}`** – required number of characters for the condition ([View Highlight](https://read.readwise.io/read/01gqs5eshs5crbgpcv972ssznx))
^rwID-464327039
- **`{3.5}`** - min. and max. number of characters for the condition ([View Highlight](https://read.readwise.io/read/01gqs5eyzb3dad9g7vfk5a5eem))
    - Note: Should be {3,5}
^rwID-464327041
- **`{3,}`** – mandatory min. number and unlimited max. quantity ([View Highlight](https://read.readwise.io/read/01gqs5fbe3x8xgmyf36hjtjftq))
^rwID-464327051
- ![Regex condition length](https://res.cloudinary.com/practicaldev/image/fetch/s--0mjlM-mB--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r608qt04mnzmi95fhbgx.png) ([View Highlight](https://read.readwise.io/read/01gqs5g01dswksbfpxawn6q7s4))
^rwID-464327075
