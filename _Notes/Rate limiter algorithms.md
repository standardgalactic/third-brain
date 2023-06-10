1. [[Token bucket rate limiting algorithm]]
2. [[Leaking bucket rate limiting algorithm]]
3. [[Fixed window counter rate limiting algorithm]]
4. [[Sliding window log rate limiting algorithm]]
5. [[Sliding window counter rate limiting algorithm]]

## Storing the counters of all the algorithms
- Using database is not a good idea due to slowness of disk access.
- In-memory cache makes sense because it is fast and supports time-based expiration strategy. Eg: Redis

![High level rate limiter architecture](Assets/High_level_rate_limiter_architecture.webp)

## Related Notes
- 

## Sources
- [[(Done) Design A Rate Limiter - Highlights]]