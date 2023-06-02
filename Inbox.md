- Typical latency times (as of 2020)
![[Pasted image 20230602122340.png]]

- Service Level Agreement (SLA)
	- Agreement between the service provider and its customer formally defining the level of uptime the service will deliver
	- Uptimes are generally measured in nines. The more the nines, the better.
	- For example, a service guaranteeing 99.999% of uptime has 3 nines.
- If you are feeling that one nine uptime is good enough, look at the following table:
- ![[Pasted image 20230602122728.png]]
- Example Estimation: Twitter Queries Per Second (QPS) and Storage requirements *(The numbers are completely made up)*
	- Assumptions
		- 300 million monthly active users (MAUs)
		- 50% of users use Twitter daily.
		- Users post 2 tweets per day on average.
		- 10% of tweets contain media.
		- Data is stored for 5 years.
	- 