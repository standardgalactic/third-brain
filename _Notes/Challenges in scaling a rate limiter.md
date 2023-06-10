We face numerous challenges when scaling the rate limiter to support multiple servers and concurrent threads.

## Race Conditions
![Rate limiter race condition](Assets/Rate_limiter_race_condition.svg)

## Synchronisation issue
- We need multiple rate limiters to handle millions of users

To demonstrate, in the image below, both the rate limiters must share the counters for both clients, otherwise the rate limiters would fail their purpose
![Rate limiter synchronisation issue](Assets/rate_limiter_synchronisation_issue.png)

- In such cases, we need synchronization between rate limiters to keep the counters in sync
- One possible solution is to use centralized data stores like Redis. 

![Centralized redis rate limiters](Assets/centralized_redis_rate_limiters.png)

## Related Notes
- [[How to design a Rate Limiter]]

## Sources
- [[(Done) Design A Rate Limiter - Highlights]]