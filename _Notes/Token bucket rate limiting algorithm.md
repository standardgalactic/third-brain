- A token bucket is a container that has pre-defined capacity.
- Tokens are put in the bucket at preset rates periodically.
- Once the bucket is full, no more tokens are added.
- Each request consumes one token. When a request arrives, we check if there are enough tokens in the bucket.
- If there are enough tokens, we take one token out for each request, and the request goes through.
- If there are not enough tokens, the request is dropped.

## Example
![4 tokens filled every minute](Assets/4_tokens_filled_every_minute.svg)

## Tuning the algorithm
- The number of buckets can be decided on the requirements. One bucket means one rate limiting rule. For example, if you want to throttle based on IP addresses, we require one bucket per IP address

## Pros and Cons
### Pros
- Easy to implement
- Memory efficient
- Allows a burst of traffic for short periods

### Cons
- Challenging to tune the bucket size and token refill rate

## Related Notes
- 

## Sources
- [[(Done) Design A Rate Limiter - Highlights]]