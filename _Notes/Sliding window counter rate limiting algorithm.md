- Combination of [[Fixed window counter rate limiting algorithm|fixed window counter]] and [[Sliding window log rate limiting algorithm|sliding window log]] algorithms

## How it works?
- Assume that 5 requests are allowed per minute
- There were 5 requests made in the previous minute
- A request arrives at 15th second (25% of the current minute) of the current minute
- Then, the number of requests in the rolling window is calculated using:
	- Requests in current window + requests in the previous window * overlap percentage of the rolling window and the previous window
	- 0 + 5 * 0.75
	- 3.75 - This can be rounded up or down, depending on the use case. Lets round up to 4
- Since 4 is less than 5, this request (at the 15th second) will be allowed to pass through

![Sliding window counter algorithm demo](Assets/Sliding_window_counter_algorithm_demo.svg)

## Pros and Cons
### Pros
- Smooths out spikes in traffic
- Memory efficient

### Cons
- It is an approximation of the actual rate because it assumes requests in the previous window are evenly distributed.
	- This problem is not as bad as it seems. [Experiments done by Cloudflare](https://blog.cloudflare.com/counting-things-a-lot-of-different-things/), only 0.003% of requests are wrongly allowed or rate limited among 400 million requests

## Related Notes
- 

## Sources
- [[(Done) Design A Rate Limiter - Highlights]]