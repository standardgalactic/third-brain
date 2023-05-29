## Simple setup
How does a web request happen in a simple single-server setup?
![Note the order of the requests made](Assets/Figure_2.webp)

## Step 1: Separating the data and web tier
Separating web traffic (web tier) and database (data tier) servers allows them to be scaled independently
![Data is now saved in a separate DB tier](Assets/Data_is_now_saved_in_a_separate_DB_tier.png)

### Which database to choose?
There are, primarily, two kinds of databases:
1. [[Relational database]]
2. [[Non-relational database]]

## Step 2: Multiple web servers - Using [[Load balancers|load balancer]]
- Users will send requests to the public IP of the [[Load balancers|load balancer]], which in turn will decide which server to forward the request to
![](Assets/Figure_4.png)
- If the traffic increases, the number of servers can be increased and the load balancer can start sending the increased requests to the new servers too.

## Step 3: Replicating data
- Replicating data is important in order to ensure that all data is safe in the event that our main DB server goes down
- A common way is to perform [[Database replication using master-slave relationship|database replication using master-slave relationship]]

## Step 4: Inserting a [[Caching in large scale applications|cache tier]]
- Used in order to improve the data fetch speed of frequently read data
- In this scenario, we will go with the [[Read-through cache]]

## Step 5: Using a CDN
- Used to deliver static content

## Step 6: Scaling horizontally - Create stateless web tier
- We need to move state (like user session data) out of the web tier
- Good practice is to store session data in the persistent storage such as relational database or NoSQL
- Each web server in the cluster can access state data from the persistent storage created above
- This gives us the [[Stateless web server]]

## Step 7: GeoDNS routing users
- Data centers are replicated across regions
- Users are [[GeoDNS routing of clients|geo-routed to the closest data center]]

![Demonstrating GeoDNS routing](Assets/Demonstrating_GeoDNS_routing.png)

## Step 8: Decoupling systems to support independent scaling of systems
- [[Message queues]] help with decoupling of systems reducing inter-service dependencies

## Step 9: Logging
- [[Monitoring logs]] is important in order to identify errors and problems in the system

## Step 10: Collecting metrics
[[Collecting application system metrics]]

## Step 11: Automating application development process
[[Automating application maintenance cycle]]

![A full blown horizontally scaled application](Assets/A_full_blown_horizontally_scaled_application.png)

## Step 12: Scaling the database
- Can be done using:
	- Can also [[Vertical scaling|vertically scale]] the database
	- [[Database sharding]]

![Horizontal scaling vs Vertical Scaling](Assets/Horizontal_scaling_vs_Vertical_Scaling.svg)

## Sources
- [[Scale From Zero To Millions Of Users by ByteByteGo]]

## Related Notes
- [[Horizontal scaling]]