![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article4.6bc1851654a0.png)

## Metadata
- Author: [[Elt]]
- Full Title: Logging Practices I Follow
- URL: https://www.16elt.com/2023/01/06/logging-practices-I-follow/?utm_source=tldrnewsletter

## Highlights
- As a first, and surprisingly not-so-obvious, rule of thumb I’d say you should keep your logs consistent across the system. 
  Consistency leads to predictability which leads to you looking for logs without always having to look how they are defined. 
  For example, If you always start your log with a prefix `"[serviceName](functionName)..."`, when you are looking for a function log, you don’t have to open up the source code and check out the log message, but maybe I am portraying a bit of utopian world. In any case, consistency is awesome, so keep it. ([View Highlight](https://read.readwise.io/read/01gzzya03e9wbe9078nq0qzxe0))
- ERROR: Parts of the flow failed, we want to send alerts to our on-call for this failures. ([View Highlight](https://read.readwise.io/read/01gzzyaerkbq4avb6peh3m3qdt))
- WARNING: Doesn’t necessarily point to a failure, but an unexpected behavior that should be investigated. ([View Highlight](https://read.readwise.io/read/01gzzyajcckw984by5mhs2k84q))
- INFO: Record major events in the flow to help the developer reading it understand what was being executed. ([View Highlight](https://read.readwise.io/read/01gzzyaprcfrwbkyrjgd38cbnb))
- DEBUG: Like INFO but more detailed, including inspection into objects, data structures, etc. ([View Highlight](https://read.readwise.io/read/01gzzyasaqg0wf1f6wpfvxbn43))
- Whatever service you are using for logging, it costs money, and a fast way to burn money is to log the entire json object that was relatively small on your dev env, but blew up on production. ([View Highlight](https://read.readwise.io/read/01gzzybwx4ngqabrwrp8ad4et9))
- Pick the attributes that are the most important and useful to log, the attributes that will actually help you debug the continuation of the flow. ([View Highlight](https://read.readwise.io/read/01gzzyc38ejjya5sqcqyzh4bx6))
- One way to keep the logs unique is to denote the service name and function name as a prefix for the log, if you do that - you are guarenteed uniqueness or at the very least, you narrowed the scope of log duplication from the entire service to just a function. ([View Highlight](https://read.readwise.io/read/01gzzyd0744cgzs580pfky96b3))
