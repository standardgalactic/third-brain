![rw-book-cover](https://bytebytego.com/social.png)

## Metadata
- Author: [[ByteByteGo]]
- Full Title: Design A URL Shortener
- URL: https://bytebytego.com/courses/system-design-interview/design-a-url-shortener

## Highlights
- **301 redirect**. A 301 redirect shows that the requested URL is “permanently” moved to the long URL. Since it is permanently redirected, the browser caches the response, and subsequent requests for the same URL will not be sent to the URL shortening service. Instead, requests are redirected to the long URL server directly.
  **302 redirect**. A 302 redirect means that the URL is “temporarily” moved to the long URL, meaning that subsequent requests for the same URL will be sent to the URL shortening service first. Then, they are redirected to the long URL server. ([View Highlight](https://read.readwise.io/read/01h20529a3mnbpbtpzvs9q6d1v))
- Each redirection method has its pros and cons. If the priority is to reduce the server load, using 301 redirect makes sense as only the first request of the same URL is sent to URL shortening servers. However, if analytics is important, 302 redirect is a better choice as it can track click rate and source of the click more easily. ([View Highlight](https://read.readwise.io/read/01h2053v62hz86x6316myerjc4))
- In the high-level design, everything is stored in a hash table. This is a good starting point; however, this approach is not feasible for real-world systems as memory resources are limited and expensive. A better option is to store *<shortURL, longURL>* mapping in a relational database. Figure 4 shows a simple database table design. The simplified version of the table contains 3 columns: *id*, *shortURL, longURL*.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27161%27%20height=%27141%27/%3e) ([View Highlight](https://read.readwise.io/read/01h2059jkcfe9462ckxkwjwvdp))
- The *hashValue* consists of characters from [0-9, a-z, A-Z], containing 10 + 26 + 26 = 62 possible characters. To figure out the length of *hashValue*, find the smallest *n* such that *62^n ≥ 365 billion*. ([View Highlight](https://read.readwise.io/read/01h205atqqns40egprrs3yg94j))
- When *n = 7, 62 ^ n = ~3.5 trillion*, 3.5 trillion is more than enough to hold 365 billion URLs, so the length of *hashValue* is 7. ([View Highlight](https://read.readwise.io/read/01h205az428kqnmmj2cdd1nm8e))
- We will explore two types of hash functions for a URL shortener. The first one is “hash + collision resolution”, and the second one is “base 62 conversion.” ([View Highlight](https://read.readwise.io/read/01h205c1rmdxv649yrqs9qhw2d))
- Hash + collision resolution ([View Highlight](https://read.readwise.io/read/01h205c4tc7d7516pb2vh4ss7d))
- To shorten a long URL, we should implement a hash function that hashes a long URL to a 7-character string ([View Highlight](https://read.readwise.io/read/01h205bsb49tzkv5k10akt7j9p))
- The first approach is to collect the first 7 characters of a hash value; however, this method can lead to hash collisions. To resolve hash collisions, we can recursively append a new predefined string until no more collision is discovered. This process is explained in Figure 5.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27750%27%20height=%27420%27/%3e)![Figure 5](https://bytebytego.com/images/courses/system-design-interview/design-a-url-shortener/figure-8-5-KWG6EFZC.svg) ([View Highlight](https://read.readwise.io/read/01h205e7rafn40ts02a9ha0axc))
- This method can eliminate collision; however, it is expensive to query the database to check if a shortURL exists for every request. ([View Highlight](https://read.readwise.io/read/01h205ejyrqj57phh5mjm2jq3g))
- A technique called bloom filters [2] can improve performance. A bloom filter is a space-efficient probabilistic technique to test if an element is a member of a set. ([View Highlight](https://read.readwise.io/read/01h205gjq9ntwp81vdxsxg6h12))
- Base 62 conversion ([View Highlight](https://read.readwise.io/read/01h205gt8ewfgzabj74h490dkn))
- Table 3 shows the differences of the two approaches. ([View Highlight](https://read.readwise.io/read/01h205tsz9jmsdjhw0h85j2qnz))
    - Note: look at the website for this
- As one of the core pieces of the system, we want the URL shortening flow to be logically simple and functional. Base 62 conversion is used in our design. We build the following diagram (Figure 7) to demonstrate the flow.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27500%27%20height=%27382%27/%3e) ([View Highlight](https://read.readwise.io/read/01h205z53543p5fxmwxwptnnmr))
- let us look at a concrete example.
  • Assuming the input longURL is: `https://en.wikipedia.org/wiki/Systems_design`
  • Unique ID generator returns ID: 2009215674938.
  • Convert the ID to shortURL using the base 62 conversion. ID (2009215674938) is converted to “zn9edcu”.
  • Save ID, shortURL, and longURL to the database as shown in Table 4. ([View Highlight](https://read.readwise.io/read/01h2060ajbxq8ajptty4yrfnpg))
    - Note: look at the table in the database
