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

## Sources
- [[Scale From Zero To Millions Of Users by ByteByteGo]]

## Related Notes
- [[Horizontal scaling]]