- Similar to the [[Token bucket rate limiting algorithm|token bucket algorithm]], except that the requests are processed at a fixed rate.
- Implemented with a first-in-first-out (FIFO) queue

## How it works?
![Leaking bucket algorithm working](Assets/Leaking_bucket_algorithm_working.svg)

## Pros and Cons
### Pros
- Memory efficient due to the limited queue size
- Suitable for cases where stable processing rate is desired

### Cons
- Not suitable for a burst of traffic
- Difficult to tune the two parameters: Bucket size, Outflow rate

## Related Notes
- [[Message queues]]

## Sources
- [[(Done) Design A Rate Limiter - Highlights]]