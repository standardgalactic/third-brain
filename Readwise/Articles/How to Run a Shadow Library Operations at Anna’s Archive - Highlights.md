![rw-book-cover](http://annas-blog.org/copyright-bell-curve.png)

## Metadata
- Author: [[annas-blog.org]]
- Full Title: How to Run a Shadow Library: Operations at Anna’s Archive
- URL: https://annas-blog.org/how-to-run-a-shadow-library.html?utm_source=tldrnewsletter

## Highlights
- This exclusive monopoly on certain works means that it is illegal for anyone outside of this monopoly to directly distribute those works — including us. But Anna’s Archive is a search engine that doesn’t directly distribute those works (at least not on our clearnet website), so we should be okay, right? Not exactly. In many jurisdictions it is not only illegal to distribute copyrighted works, but also to link to places that do. A classic example of this is the United States’ DMCA law. ([View Highlight](https://read.readwise.io/read/01gzjkh6ck345ny9eby31z5kpv))
- So let’s say that you found some companies that are willing to host your website without shutting you down — let’s call these “freedom-loving providers” 😄. You’ll quickly find that hosting everything with them is rather expensive, so you might want to find some “cheap providers” and do the actual hosting there, proxying through the freedom-loving providers. If you do it right, the cheap providers will never know what you are hosting, and never receive any complaints. ([View Highlight](https://read.readwise.io/read/01gzjkkb089jxxk6t04hfsbkq8))
- ![](https://annas-blog.org/diagram1.svg) ([View Highlight](https://read.readwise.io/read/01gzjkkcvvd3kth0kzhcqmbsvt))
- With all of these providers there is a risk of them shutting you down anyway, so you also need redundancy. We need this on all levels of our stack. ([View Highlight](https://read.readwise.io/read/01gzjkm161dnekrr46mr083zzg))
- ![](https://annas-blog.org/diagram2.svg) ([View Highlight](https://read.readwise.io/read/01gzjkm5e1ftzyw2adtm0k1kgs))
- One somewhat freedom-loving company that has put itself in an interesting position is Cloudflare. They have [argued](https://blog.cloudflare.com/cloudflares-abuse-policies-and-approach/) that they are not a hosting provider, but a utility, like an ISP. They are therefore not subject to DMCA or other takedown requests, and forward any requests to your actual hosting provider. They have gone as far as going to court to protect this structure. We can therefore use them as another layer of caching and protection. ([View Highlight](https://read.readwise.io/read/01gzjkn65v0bjr0gty9nc144dq))
- ![](https://annas-blog.org/diagram3.svg) ([View Highlight](https://read.readwise.io/read/01gzjkn7q6j2debyn44fq5g6fn))
- We still also have normal operational concerns to deal with, such as monitoring server health, logging backend and frontend errors, and so on. Our failover architecture allows for more robustness on this front as well, for example by running a completely different set of servers on one of the domains. We can even run older versions of the code and datasets on this separate domain, in case a critical bug in the main version goes unnoticed. ([View Highlight](https://read.readwise.io/read/01gzjkqddepqhfa5p5gbxpf642))
- ![](https://annas-blog.org/diagram4.svg) ([View Highlight](https://read.readwise.io/read/01gzjkqews1aehn3kceajfktf9))
