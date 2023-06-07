![rw-book-cover](https://bytebytego.com/social1.png)

## Metadata
- Author: [[ByteByteGo]]
- Full Title: Design a Unique ID Generator in Distributed Systems
- URL: https://bytebytego.com/courses/system-design-interview/design-a-unique-id-generator-in-distributed-systems

## Highlights
- Multi-master replication ([View Highlight](https://read.readwise.io/read/01h200d0pz545k8ftd6cn4fspy))
- ![Figure 2](https://bytebytego.com/images/courses/system-design-interview/design-a-unique-id-generator-in-distributed-systems/figure-7-2-4ZOIVNTR.svg)
  Figure 2
  This approach uses the databases’ *auto_increment* feature. Instead of increasing the next ID by 1, we increase it by *k,* where *k* is the number of database servers in use. As illustrated in Figure 2, next ID to be generated is equal to the previous ID in the same server plus 2. ([View Highlight](https://read.readwise.io/read/01h200xpqjbq516twtg39hcvc3))
- this strategy has some major drawbacks:
  • Hard to scale with multiple data centers
  • IDs do not go up with time across multiple servers.
  • It does not scale well when a server is added or removed. ([View Highlight](https://read.readwise.io/read/01h200y79r4yycearngv0rkgct))
- A UUID is another easy way to obtain unique IDs. UUID is a 128-bit number used to identify information in computer systems. UUID has a very low probability of getting collusion. ([View Highlight](https://read.readwise.io/read/01h20124esn0txpt073w829myp))
- UUIDs can be generated independently without coordination between servers. Figure 3 presents the UUIDs design.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27600%27%20height=%27181%27/%3e)![Figure 3](https://bytebytego.com/images/courses/system-design-interview/design-a-unique-id-generator-in-distributed-systems/figure-7-3-Y3ZNPIH3.svg) ([View Highlight](https://read.readwise.io/read/01h20137svqdxksh81tja81fmy))
- each web server contains an ID generator, and a web server is responsible for generating IDs independently. ([View Highlight](https://read.readwise.io/read/01h201413980a2xsg0pqy4xb08))
- Pros:
  • Generating UUID is simple. No coordination between servers is needed so there will not be any synchronization issues.
  • The system is easy to scale because each web server is responsible for generating IDs they consume. ID generator can easily scale with web servers.
  Cons:
  • IDs are 128 bits long, but our requirement is 64 bits.
  • IDs do not go up with time.
  • IDs could be non-numeric. ([View Highlight](https://read.readwise.io/read/01h2013tg0ssyv3txdqed2fs8m))
- ![Figure 4](https://bytebytego.com/images/courses/system-design-interview/design-a-unique-id-generator-in-distributed-systems/figure-7-4-TJJLCKSS.svg)
  Figure 4
  The idea is to use a centralized *auto_increment* feature in a single database server (Ticket Server). ([View Highlight](https://read.readwise.io/read/01h2015hpbcxhqjs6byqxp2ac1))
- Pros:
  • Numeric IDs.
  • It is easy to implement, and it works for small to medium-scale applications.
  Cons:
  • Single point of failure. Single ticket server means if the ticket server goes down, all systems that depend on it will face issues. To avoid a single point of failure, we can set up multiple ticket servers. However, this will introduce new challenges such as data synchronization. ([View Highlight](https://read.readwise.io/read/01h2015tx0pyxkdk0hcj3vygdz))
- Twitter snowflake approach ([View Highlight](https://read.readwise.io/read/01h201ab9rafxan2tqj9jcjg82))
- Twitter’s unique ID generation system called “snowflake” [3] is inspiring and can satisfy our requirements. ([View Highlight](https://read.readwise.io/read/01h201aq28jkfvh3a7ap96hjrv))
- Divide and conquer is our friend. Instead of generating an ID directly, we divide an ID into different sections. Figure 5 shows the layout of a 64-bit ID.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27600%27%20height=%2781%27/%3e) ([View Highlight](https://read.readwise.io/read/01h201ax0aqq6te8zbd4j3cwcq))
- ![Figure 5](https://bytebytego.com/images/courses/system-design-interview/design-a-unique-id-generator-in-distributed-systems/figure-7-5-R4B5RGNK.svg)
  Figure 5
  Each section is explained below.
  • Sign bit: 1 bit. It will always be 0. This is reserved for future uses. It can potentially be used to distinguish between signed and unsigned numbers.
  • Timestamp: 41 bits. Milliseconds since the epoch or custom epoch. We use Twitter snowflake default epoch 1288834974657, equivalent to Nov 04, 2010, 01:42:54 UTC.
  • Datacenter ID: 5 bits, which gives us *2 ^ 5 = 32* datacenters.
  • Machine ID: 5 bits, which gives us *2 ^ 5 = 32* machines per datacenter.
  • Sequence number: 12 bits. For every ID generated on that machine/process, the sequence number is incremented by 1. The number is reset to 0 every millisecond. ([View Highlight](https://read.readwise.io/read/01h201va7r2hp3dd6xyvkhd5x5))
- Any changes in datacenter IDs and machine IDs require careful review since an accidental change in those values can lead to ID conflicts. ([View Highlight](https://read.readwise.io/read/01h201wcsbfzntfwzzw3axs7yd))
- *2 ^ 41 - 1 = 2199023255551* milliseconds (ms), which gives us: ~ 69 years = *2199023255551 ms / 1000 / 365 days / 24 hours/ 3600 seconds*. This means the ID generator will work for 69 years and having a custom epoch time close to today’s date delays the overflow time. After 69 years, we will need a new epoch time or adopt other techniques to migrate IDs. ([View Highlight](https://read.readwise.io/read/01h202bzmgfmwmnyg5sf1m4j6b))
- Sequence number is 12 bits, which give us 2 ^ 12 = 4096 combinations. This field is 0 unless more than one ID is generated in a millisecond on the same server. In theory, a machine can support a maximum of 4096 new IDs per millisecond. ([View Highlight](https://read.readwise.io/read/01h202ejs9qgy0fjjm92vzaazp))
- • Clock synchronization. In our design, we assume ID generation servers have the same clock. This assumption might not be true when a server is running on multiple cores. The same challenge exists in multi-machine scenarios. Solutions to clock synchronization are out of the scope of this course; however, it is important to understand the problem exists. Network Time Protocol is the most popular solution to this problem. For interested readers, refer to the reference material [4]. ([View Highlight](https://read.readwise.io/read/01h202f65wgmtp9r1qs7tkwdbz))
