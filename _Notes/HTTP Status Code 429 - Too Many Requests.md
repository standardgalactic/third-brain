1. APIs return a HTTP response code - 429 (too many requests) when requests are rejected due to [[How to design a Rate Limiter|rate limiting]]
2. We may choose to enqueue rate-limited requests to be processed later

## Headers in a 429 response
- `X-Ratelimit-Remaining`: The remaining number of allowed requests within the window. 
- `X-Ratelimit-Limit`: It indicates how many calls the client can make per time window. 
- `X-Ratelimit-Retry-After`: The number of seconds to wait until you can make a request again without being throttled.

## Related Notes
- [[Message queues]]

## Sources
- [[(Done) Design A Rate Limiter - Highlights]]