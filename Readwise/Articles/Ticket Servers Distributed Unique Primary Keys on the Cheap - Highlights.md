![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article4.6bc1851654a0.png)

## Metadata
- Author: [[Kay Kremerskothen]]
- Full Title: Ticket Servers: Distributed Unique Primary Keys on the Cheap
- URL: https://code.flickr.net/2010/02/08/ticket-servers-distributed-unique-primary-keys-on-the-cheap/

## Highlights
- Given the need for globally unique ids the obvious question is, why not use GUIDs? Mostly because GUIDs are big, and they index badly in MySQL. ([View Highlight](https://read.readwise.io/read/01h202jm56ppg6j89hrx828pz0))
- If we can’t make MySQL auto-increments work across multiple databases, what if we just used one database? If we inserted a new row into this one database every time someone uploaded a photo we could then just use the auto-incrementing ID from that table as the primary key for all of our databases. ([View Highlight](https://read.readwise.io/read/01h202nczdwgf36y2agvkr9e37))
- Of course at 60+ photos a second that table is going to get pretty big. We can get rid of all the extra data about the photo, and just have the ID in the centralized database. Even then the table gets unmanageably big quickly. And there are comments, and favorites, and group postings, and tags, and so on, and those all need IDs too. ([View Highlight](https://read.readwise.io/read/01h202nej56qbwf1c35xsxc9vj))
- A little over a decade ago MySQL shipped with a non-standard extension to the ANSI SQL spec, [“REPLACE INTO”](http://dev.mysql.com/doc/refman/5.0/en/replace.html). Later [“INSERT ON DUPLICATE KEY UPDATE”](http://dev.mysql.com/doc/refman/5.0/en/insert-on-duplicate.html) came along and solved the original problem much better. However REPLACE INTO is still supported.
  > REPLACE works exactly like INSERT, except that if an old row in the table has the same value as a new row for a PRIMARY KEY or a UNIQUE index, the old row is deleted before the new row is inserted.
  This allows us to atomically update in a place a single row in a database, and get a new auto-incremented primary ID. ([View Highlight](https://read.readwise.io/read/01h202twg8w6b8dk6am6a3qjdk))
- When I need a new globally unique 64-bit ID I issue the following SQL:
  REPLACE INTO Tickets64 (stub) VALUES ('a');
  SELECT LAST_INSERT_ID(); ([View Highlight](https://read.readwise.io/read/01h202v3a3cs0ba0zr8bzb8k53))
- You really really don’t know want provisioning your IDs to be a single point of failure. We achieve “high availability” by running two ticket servers. At this write/update volume replicating between the boxes would be problematic, and locking would kill the performance of the site. We divide responsibility between the two boxes by dividing the ID space down the middle, evens and odds, using:
  TicketServer1:
  auto-increment-increment = 2
  auto-increment-offset = 1
  TicketServer2:
  auto-increment-increment = 2
  auto-increment-offset = 2
  We round robin between the two servers to load balance and deal with down time. ([View Highlight](https://read.readwise.io/read/01h202z3wfyjgc6vbhe1y0tbyv))
