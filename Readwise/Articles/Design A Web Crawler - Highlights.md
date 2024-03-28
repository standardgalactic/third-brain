![rw-book-cover](https://readwise-assets.s3.amazonaws.com/media/uploaded_book_covers/profile_462572/social1.png)

## Metadata
- Author: [[ByteByteGo]]
- Full Title: Design A Web Crawler
- Document Note: Assumptions:
   - Indexing for search engine
   - 1 billion pages per month
   - HTML only
   - Consider newly added and edited web pages
   - Store HTML for 5 years
   - Ignore duplicate pages
   
- URL: https://bytebytego.com/courses/system-design-interview/design-a-web-crawler

## Highlights
- Back of the envelope estimation
  The following estimations are based on many assumptions, and it is important to communicate with the interviewer to be on the same page.
  • Assume 1 billion web pages are downloaded every month.
  • QPS: 1,000,000,000 / 30 days / 24 hours / 3600 seconds = ~400 pages per second.
  • Peak QPS = 2 * QPS = 800
  • Assume the average web page size is 500k.
  • 1-billion-page x 500k = 500 TB storage per month. If you are unclear about digital storage units, go through “Power of 2” section in the "Back-of-the-envelope Estimation" chapter again.
  • Assuming data are stored for five years, 500 TB * 12 months * 5 years = 30 PB. A 30 PB storage is needed to store five-year content. ([View Highlight](https://read.readwise.io/read/01h2mt246xsrf377rdr82e3y0b))
- A web crawler uses seed URLs as a starting point for the crawl process ([View Highlight](https://read.readwise.io/read/01h2mt42zr3wnaq3f2hg6cf708))
- A good seed URL serves as a good starting point that a crawler can utilize to traverse as many links as possible. ([View Highlight](https://read.readwise.io/read/01h2mt4bee59dc3xqkb21x5bzs))
- The first proposed approach is based on locality as different countries may have different popular websites. Another way is to choose seed URLs based on topics; for example, we can divide URL space into shopping, sports, healthcare, etc. Seed URL selection is an open-ended question. ([View Highlight](https://read.readwise.io/read/01h2mt4m95k6t467a276kg652t))
- Most modern web crawlers split the crawl state into two: to be downloaded and already downloaded. The component that stores URLs to be downloaded is called the URL Frontier. You can refer to this as a First-in-First-out (FIFO) queue. ([View Highlight](https://read.readwise.io/read/01h2mt70zfykehx7emcpw6bvym))
- The HTML downloader downloads web pages from the internet. Those URLs are provided by the URL Frontier. ([View Highlight](https://read.readwise.io/read/01h2mt7a5sctce767bmaqp85aq))
- To download a web page, a URL must be translated into an IP address. The HTML Downloader calls the DNS Resolver to get the corresponding IP address for the URL. ([View Highlight](https://read.readwise.io/read/01h2mt7sfhg44kr5mnj4965y1a))
- After a web page is downloaded, it must be parsed and validated because malformed web pages could provoke problems and waste storage space. Implementing a content parser in a crawl server will slow down the crawling process. Thus, the content parser is a separate component. ([View Highlight](https://read.readwise.io/read/01h2mt9927n0jdqwedm7tgqrz8))
- We introduce the “Content Seen?” data structure to eliminate data redundancy and shorten processing time. It helps to detect new content previously stored in the system ([View Highlight](https://read.readwise.io/read/01h2mtafcy55yxzpv2v3mh9d57))
- To compare two HTML documents, we can compare them character by character. However, this method is slow and time-consuming, especially when billions of web pages are involved. An efficient way to accomplish this task is to compare the hash values of the two web pages ([View Highlight](https://read.readwise.io/read/01h2mtaptkdzaz1ve28jdk6yp3))
- It is a storage system for storing HTML content. The choice of storage system depends on factors such as data type, data size, access frequency, life span, etc. Both disk and memory are used. ([View Highlight](https://read.readwise.io/read/01h2mtb9cwvsj1rsjkv7bjhec2))
- • Most of the content is stored on disk because the data set is too big to fit in memory. ([View Highlight](https://read.readwise.io/read/01h2mtbc70261fq2ahkha811cv))
- • Popular content is kept in memory to reduce latency. ([View Highlight](https://read.readwise.io/read/01h2mtbe1cykqkm3etx170d2f8))
- URL Extractor parses and extracts links from HTML pages. Figure 3 shows an example of a link extraction process. ([View Highlight](https://read.readwise.io/read/01h2mtc5ms4c71ceawwr96z89q))
- The URL filter excludes certain content types, file extensions, error links and URLs in “blacklisted” sites. ([View Highlight](https://read.readwise.io/read/01h2mtcd0y21magbq4waejt9e7))
- “URL Seen?” is a data structure that keeps track of URLs that are visited before or already in the Frontier. “URL Seen?” helps to avoid adding the same URL multiple times ([View Highlight](https://read.readwise.io/read/01h2mtd8qdfyektk8p87trwsxp))
- Bloom filter and hash table are common techniques to implement the “URL Seen?” component. ([View Highlight](https://read.readwise.io/read/01h2mtdkgyhqmwsb9f07b39v9y))
- URL Storage stores already visited URLs. ([View Highlight](https://read.readwise.io/read/01h2mte1ya2z0qt80dadwcz93d))
- ![Figure 4](https://bytebytego.com/images/courses/system-design-interview/design-a-web-crawler/figure-9-4-OKNDJITV.svg) ([View Highlight](https://read.readwise.io/read/01h2mtegz67wzjd73mpq2tach8))
- Step 3 - Design deep dive ([View Highlight](https://read.readwise.io/read/01h2mtgtsc274p2pph9pc201pq))
- You can think of the web as a directed graph where web pages serve as nodes and hyperlinks (URLs) as edges. The crawl process can be seen as traversing a directed graph from one web page to others. Two common graph traversal algorithms are DFS and BFS ([View Highlight](https://read.readwise.io/read/01h2mtjdzk187pb67wyjvmc6w4))
- DFS is usually not a good choice because the depth of DFS can be very deep. ([View Highlight](https://read.readwise.io/read/01h2mtjg151nbffy3jtnjtse5w))
- BFS is commonly used by web crawlers and is implemented by a first-in-first-out (FIFO) queue. ([View Highlight](https://read.readwise.io/read/01h2mtm8g7xsr2zpx7q7510fff))
- this implementation has two problems ([View Highlight](https://read.readwise.io/read/01h2mtmcvysjj5dh3g6xxhfx1k))
- • Most links from the same web page are linked back to the same host. In Figure 5, all the links in wikipedia.com are internal links, making the crawler busy processing URLs from the same host (wikipedia.com). When the crawler tries to download web pages in parallel, Wikipedia servers will be flooded with requests. This is considered as “impolite”.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27600%27%20height=%27480%27/%3e)![Figure 5](https://bytebytego.com/images/courses/system-design-interview/design-a-web-crawler/figure-9-5-65ZDPY5L.svg) ([View Highlight](https://read.readwise.io/read/01h2mtptd72t0dzksa3zrb2rtn))
- Standard BFS does not take the priority of a URL into consideration. The web is large and not every page has the same level of quality and importance. Therefore, we may want to prioritize URLs according to their page ranks, web traffic, update frequency, etc. ([View Highlight](https://read.readwise.io/read/01h2mtrby41p750ex985mctssc))
- URL frontier helps to address these problems. A URL frontier is a data structure that stores URLs to be downloaded. The URL frontier is an important component to ensure politeness, URL prioritization, and freshness ([View Highlight](https://read.readwise.io/read/01h2mtt6decrhqm7kcjj8e5kzm))
- Generally, a web crawler should avoid sending too many requests to the same hosting server within a short period. Sending too many requests is considered as “impolite” or even treated as denial-of-service (DOS) attack. ([View Highlight](https://read.readwise.io/read/01h2mtw95g8mw77daxce9f2swz))
- The general idea of enforcing politeness is to download one page at a time from the same host. A delay can be added between two download tasks. The politeness constraint is implemented by maintain a mapping from website hostnames to download (worker) threads. Each downloader thread has a separate FIFO queue and only downloads URLs obtained from that queue. Figure 6 shows the design that manages politeness.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27500%27%20height=%27478%27/%3e) ([View Highlight](https://read.readwise.io/read/01h2mtxs9ec89zfcm10x0nghne))
    - Note: https://capture.dropbox.com/e79dXf9U7t8MwSRK
- Queue router: It ensures that each queue (b1, b2, … bn) only contains URLs from the same host. ([View Highlight](https://read.readwise.io/read/01h2mtzy3mzh0y0rncvx3c3q6w))
- Mapping table: It maps each host to a queue. ([View Highlight](https://read.readwise.io/read/01h2mv082mc81kdagrg38teesa))
    - Note: https://capture.dropbox.com/7kto8TuDvOplA5FL
- • FIFO queues b1, b2 to bn: Each queue contains URLs from the same host. ([View Highlight](https://read.readwise.io/read/01h2mv5dcs2n2dgvzns08xc3nz))
- Queue selector: Each worker thread is mapped to a FIFO queue, and it only downloads URLs from that queue. The queue selection logic is done by the Queue selector. ([View Highlight](https://read.readwise.io/read/01h2mv86gtekyk2mb564bgy9rx))
- • Worker thread 1 to N. A worker thread downloads web pages one by one from the same host. A delay can be added between two download tasks. ([View Highlight](https://read.readwise.io/read/01h2mv95jtahrcwwpx24641p1w))
- We prioritize URLs based on usefulness, which can be measured by PageRank [10], website traffic, update frequency, etc. “Prioritizer” is the component that handles URL prioritization. ([View Highlight](https://read.readwise.io/read/01h2mvxry63mbsf90cgxb3z8f6))
- ![Figure 7](https://bytebytego.com/images/courses/system-design-interview/design-a-web-crawler/figure-9-7-H7KUNVWF.svg) ([View Highlight](https://read.readwise.io/read/01h2mvxymg51md80dw1sg1k6fc))
- Prioritizer: It takes URLs as input and computes the priorities. ([View Highlight](https://read.readwise.io/read/01h2mvy6aq3hgayxs21gegsw37))
- Queue f1 to fn: Each queue has an assigned priority. Queues with high priority are selected with higher probability. ([View Highlight](https://read.readwise.io/read/01h2mvycd99qgapqbjf7k5n7j9))
- Queue selector: Randomly choose a queue with a bias towards queues with higher priority. ([View Highlight](https://read.readwise.io/read/01h2mvyhzd9xrwmevb9hn5xxas))
- Figure 8 presents the URL frontier design, and it contains two modules:
  • Front queues: manage prioritization
  • Back queues: manage politeness
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27500%27%20height=%27899%27/%3e) ([View Highlight](https://read.readwise.io/read/01h2mvz4s0gwmdvy8xr0gc6346))
    - Note: https://capture.dropbox.com/KPErst98uQqZYPCa
- frontier ([View Highlight](https://read.readwise.io/read/01h2mw0gky0f239k321p7j90dw))
- Web pages are constantly being added, deleted, and edited. A web crawler must periodically recrawl downloaded pages to keep our data set fresh ([View Highlight](https://read.readwise.io/read/01h2mw1gfgtqx722h4gc8tnsh6))
- Recrawl all the URLs is time-consuming and resource intensive. Few strategies to optimize freshness are listed as follows:
  • Recrawl based on web pages’ update history.
  • Prioritize URLs and recrawl important pages first and more frequently. ([View Highlight](https://read.readwise.io/read/01h2mw1kajwv4jwgczqnj9gqmh))
- In real-world crawl for search engines, the number of URLs in the frontier could be hundreds of millions [4]. Putting everything in memory is neither durable nor scalable. Keeping everything in the disk is undesirable neither because the disk is slow; and it can easily become a bottleneck for the crawl. ([View Highlight](https://read.readwise.io/read/01h2mw2rpfz6wpcycj6epw822v))
- We adopted a hybrid approach. The majority of URLs are stored on disk, so the storage space is not a problem. To reduce the cost of reading from the disk and writing to the disk, we maintain buffers in memory for enqueue/dequeue operations. Data in the buffer is periodically written to the disk. ([View Highlight](https://read.readwise.io/read/01h2mw31x8g8g99515rzfej3ny))
- The HTML Downloader downloads web pages from the internet using the HTTP protocol. ([View Highlight](https://read.readwise.io/read/01h2mw3e6nq0dtfz2k3mnfqyfn))
- Robots.txt, called Robots Exclusion Protocol, is a standard used by websites to communicate with crawlers. It specifies what pages crawlers are allowed to download. Before attempting to crawl a web site, a crawler should check its corresponding robots.txt first and follow its rules. ([View Highlight](https://read.readwise.io/read/01h2mw3pb2hc38nxbf21qh16ma))
- To avoid repeat downloads of robots.txt file, we cache the results of the file. The file is downloaded and saved to cache periodically ([View Highlight](https://read.readwise.io/read/01h2mw49r298dh6g23rc7xa04b))
- Performance optimization ([View Highlight](https://read.readwise.io/read/01h3pb0a3gy8e4xgpk4msrtq35))
- To achieve high performance, crawl jobs are distributed into multiple servers, and each server runs multiple threads ([View Highlight](https://read.readwise.io/read/01h3part9aywfdvjc3kmsg7eg5))
- ![Figure 9](https://bytebytego.com/images/courses/system-design-interview/design-a-web-crawler/figure-9-9-TCZ34KRE.svg) ([View Highlight](https://read.readwise.io/read/01h3paryy4nwmmg2ws4rd2ky5g))
- DNS Resolver is a bottleneck for crawlers because DNS requests might take time due to the synchronous nature of many DNS interfaces. ([View Highlight](https://read.readwise.io/read/01h3patzs64qzw8svccfrbffwv))
- Maintaining our DNS cache to avoid calling DNS frequently is an effective technique for speed optimization. Our DNS cache keeps the domain name to IP address mapping and is updated periodically by cron jobs. ([View Highlight](https://read.readwise.io/read/01h3pav6g78stxach97fgmgh0m))
- Distribute crawl servers geographically. When crawl servers are closer to website hosts, crawlers experience faster download time ([View Highlight](https://read.readwise.io/read/01h3pay33ngvmqfxqnnrvr9fem))
- Some web servers respond slowly or may not respond at all. To avoid long wait time, a maximal wait time is specified. ([View Highlight](https://read.readwise.io/read/01h3pazaf7vqaf94e2xh2afqj8))
- Robustness ([View Highlight](https://read.readwise.io/read/01h3pb04nhyf90xzg5ahq36686))
- To guard against failures, crawl states and data are written to a storage system. A disrupted crawl can be restarted easily by loading saved states and data. ([View Highlight](https://read.readwise.io/read/01h3pb0hs5yeb72pbh1a904zsx))
- Detect and avoid problematic content ([View Highlight](https://read.readwise.io/read/01h3pb4aasbj8knzg3j92aayns))
- 2. Spider traps
  A spider trap is a web page that causes a crawler in an infinite loop. For instance, an infinite deep directory structure is listed as follows: `http://www.spidertrapexample.com/foo/bar/foo/bar/foo/bar/...`
  Such spider traps can be avoided by setting a maximal length for URLs. However, no one-size-fits-all solution exists to detect spider traps. Websites containing spider traps are easy to identify due to an unusually large number of web pages discovered on such websites. It is hard to develop automatic algorithms to avoid spider traps; however, a user can manually verify and identify a spider trap, and either exclude those websites from the crawler or apply some customized URL filters. ([View Highlight](https://read.readwise.io/read/01h3pb5fgwje8w0ac2mnw9641d))
- Even though we have covered many topics, we still miss many relevant talking points: ([View Highlight](https://read.readwise.io/read/01h3pb6vms437f261jypgrsrcv))
- Server-side rendering: Numerous websites use scripts like JavaScript, AJAX, etc to generate links on the fly. If we download and parse web pages directly, we will not be able to retrieve dynamically generated links. To solve this problem, we perform server-side rendering (also called dynamic rendering) first before parsing a page [12]. ([View Highlight](https://read.readwise.io/read/01h3pb76gepg4f0k5y5pgvx9tc))
- Filter out unwanted pages: With finite storage capacity and crawl resources, an anti-spam component is beneficial in filtering out low quality and spam pages [13] [14]. ([View Highlight](https://read.readwise.io/read/01h3pb7dzp6gm6eaa9jregcc20))
