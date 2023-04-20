![rw-book-cover](http://farm5.static.flickr.com/4127/5188198566_3fe006d562_m.jpg)

## Metadata
- Author: [[highscalability.com]]
- Full Title: What the Heck Are You Actually Using NoSQL For?
- URL: http://highscalability.com/blog/2010/12/6/what-the-heck-are-you-actually-using-nosql-for.html

## Highlights
- When something becomes so massive that it must become massively distributed, NoSQL is there, though not all NoSQL systems are targeting big. Bigness can be across many different dimensions, not just using a lot of disk space ([View Highlight](https://read.readwise.io/read/01gyemq9vaxqt890xtp4132qbb))
- **Massive write performance**. This is probably the canonical usage based on Google's influence. High volume. Facebook needs to store [135 billion messages a month](http://highscalability.com/blog/2010/11/16/facebooks-new-real-time-messaging-system-hbase-to-store-135.html). Twitter, for example, has the problem of storing [7 TB/data per day](http://www.slideshare.net/kevinweil/nosql-at-twitter-nosql-eu-2010) with the prospect of this requirement doubling multiple times per year. This is the data is too big to fit on one node problem. At 80 MB/s it takes a day to store 7TB so writes need to be distributed over a cluster, which implies key-value access, MapReduce, replication, fault tolerance, consistency issues, and all the rest. For faster writes in-memory systems can be used. ([View Highlight](https://read.readwise.io/read/01gyemrz7kejvn68ffdsj0rpp8))
