![rw-book-cover](https://bytebytego.com/social.png)

## Metadata
- Author: [[ByteByteGo]]
- Full Title: Design A News Feed System
- URL: https://bytebytego.com/courses/system-design-interview/design-a-news-feed-system

## Highlights
- Figure 2 shows the high-level design of the feed publishing flow.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27500%27%20height=%27803%27/%3e)![Figure 2](https://bytebytego.com/_next/image?url=%2Fimages%2Fcourses%2Fsystem-design-interview%2Fdesign-a-news-feed-system%2Ffigure-11-2-DHBRUF3G.png&w=1080&q=75) ([View Highlight](https://read.readwise.io/read/01h4t9k06r4qp8gznmg7sxs4kw))
- • User: a user can view news feeds on a browser or mobile app. A user makes a post with content “Hello” through API:
  /v1/me/feed?content=Hello&auth_token={auth_token}
  • Load balancer: distribute traffic to web servers.
  • Web servers: web servers redirect traffic to different internal services.
  • Post service: persist post in the database and cache.
  • Fanout service: push new content to friends’ news feed. Newsfeed data is stored in the cache for fast retrieval.
  • Notification service: inform friends that new content is available and send out push notifications. ([View Highlight](https://read.readwise.io/read/01h4t9mejs977bnycwyrjeab0a))
- ![Figure 3](https://bytebytego.com/_next/image?url=%2Fimages%2Fcourses%2Fsystem-design-interview%2Fdesign-a-news-feed-system%2Ffigure-11-3-DJSVC462.png&w=750&q=75)
  Figure 3
  • User: a user sends a request to retrieve her news feed. The request looks like this: /v1/me/feed.
  • Load balancer: load balancer redirects traffic to web servers.
  • Web servers: web servers route requests to newsfeed service.
  • Newsfeed service: news feed service fetches news feed from the cache.
  • Newsfeed cache: store news feed IDs needed to render the news feed. ([View Highlight](https://read.readwise.io/read/01h4t9nfb5dhghrrtkvc1agdqn))
- Figure 4 outlines the detailed design for feed publishing. We have discussed most of components in high-level design, and we will focus on two components: web servers and fanout service.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27700%27%20height=%27793%27/%3e)![Figure 4](https://bytebytego.com/_next/image?url=%2Fimages%2Fcourses%2Fsystem-design-interview%2Fdesign-a-news-feed-system%2Ffigure-11-4-XQVJN6AJ.png&w=1920&q=75) ([View Highlight](https://read.readwise.io/read/01h4t9p010rbectfk6xxqpspsv))
- Fanout is the process of delivering a post to all friends. Two types of fanout models are: fanout on write (also called push model) and fanout on read (also called pull model). Both models have pros and cons. We explain their workflows and explore the best approach to support our system. ([View Highlight](https://read.readwise.io/read/01h4t9qzvkj9g3r3xyfm5ayg9r))
- **Fanout on write.** With this approach, news feed is pre-computed during write time. A new post is delivered to friends’ cache immediately after it is published.
  Pros:
  • The news feed is generated in real-time and can be pushed to friends immediately.
  • Fetching news feed is fast because the news feed is pre-computed during write time.
  Cons:
  • If a user has many friends, fetching the friend list and generating news feeds for all of them are slow and time consuming. It is called hotkey problem.
  • For inactive users or those rarely log in, pre-computing news feeds waste computing resources. ([View Highlight](https://read.readwise.io/read/01h4t9rkwfdy8wq951cfj60jgk))
- **Fanout on read**. The news feed is generated during read time. This is an on-demand model. Recent posts are pulled when a user loads her home page.
  Pros:
  • For inactive users or those who rarely log in, fanout on read works better because it will not waste computing resources on them.
  • Data is not pushed to friends so there is no hotkey problem.
  Cons:
  • Fetching the news feed is slow as the news feed is not pre-computed. ([View Highlight](https://read.readwise.io/read/01h4t9s0cp66afkf9mydf6tcy7))
- We adopt a hybrid approach to get benefits of both approaches and avoid pitfalls in them. Since fetching the news feed fast is crucial, we use a push model for the majority of users. For celebrities or users who have many friends/followers, we let followers pull news content on-demand to avoid system overload. Consistent hashing is a useful technique to mitigate the hotkey problem as it helps to distribute requests/data more evenly. ([View Highlight](https://read.readwise.io/read/01h4t9t102n9ck3ygyb165hqk7))
- ![Figure 5](https://bytebytego.com/images/courses/system-design-interview/design-a-news-feed-system/figure-11-5-RFHWCGXD.svg) ([View Highlight](https://read.readwise.io/read/01h4t9vj2w73escrzemx8yjykx))
- Get friends info from the user cache. The system then filters out friends based on user settings. For example, if you mute someone, her posts will not show up on your news feed even though you are still friends. Another reason why posts may not show is that a user could selectively share information with specific friends or hide it from other people. ([View Highlight](https://read.readwise.io/read/01h4t9wk7tdjxyt76m1gnf0ysa))
- Send friends list and new post ID to the message queue. ([View Highlight](https://read.readwise.io/read/01h4t9x0bvc7w5yg99dtvqtx5x))
- Fanout workers fetch data from the message queue and store news feed data in the news feed cache. You can think of the news feed cache as a *<post_id, user_id>* mapping table. Whenever a new post is made, it will be appended to the news feed table as shown in Figure 6. The memory consumption can become very large if we store the entire user and post objects in the cache. Thus, only IDs are stored. To keep the memory size small, we set a configurable limit. The chance of a user scrolling through thousands of posts in news feed is slim. Most users are only interested in the latest content, so the cache miss rate is low. ([View Highlight](https://read.readwise.io/read/01h4t9xzjdqn6v5rxheaw7j3wg))
- Store *<post_id, user_id >* in news feed cache. Figure 6 shows an example of what the news feed looks like in cache. ([View Highlight](https://read.readwise.io/read/01h4ta0tq2yj3a0m5myqv3hy0n))
    - Note: https://capture.dropbox.com/9Hf9fRJlLjHOS4GK
