## Client-side implementation
- Client is an unreliable place to enforce rate limiting because client requests can be forged by malicious actors.

![Client side rate limiter](Server%20side%20rate%20limiter%20demonstration.webp)

## Using rate limiter middleware
- As an alternative, we can also create a rate limiter middleware.

![Rate limiter middleware demo](Assets/Rate_limiter_middleware_demo.webp)

## Using API gateways
- Due to the popularity of cloud microservices, rate limiting is usually implemented within a component called API gateway
- If your system already uses microservice architecture and includes an API gateway to perform authentication, IP whitelisting, etc, it is better to add the rate limiter to the API gateway instead of implementing it in the server

## Related Notes
- 

## Sources
- [[(Done) Design A Rate Limiter - Highlights]]