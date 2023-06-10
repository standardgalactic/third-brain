## How it works?

Assuming a limit of **5 requests per minute**
- Every time we receive a request, we check if we have received 5 or more requests in the last 1 minute
- When a request is received, its timestamp is logged. This logging of timestamp helps us count the number of requests received in the last minute

![[Pasted image 20230609085817.png|Sliding window log algorithm]]

## Pros and Cons
### Pros
- Accurate rate limiting due to the rolling window

### Cons
- Memory intensive

## Related Notes
- 

## Sources
- [[(Done) Design A Rate Limiter - Highlights]]