- Divide the timeline into fix-sized time windows.
- Assign a counter for each window. Counter is reset at the start of each window
- Each requests increments the counter by one
- After the counter reaches the threshold, new requests are dropped

## Pros and Cons
### Pros
- Memory efficient
- Simple and easy

### Cons
- Spike in traffic at the edges of a window can cause more requests than the allowed quota to go through

#### Demonstrating traffic leak at the edges
![Demonstrating bursts of traffic breaking the fixed window counter rate limiter](Assets/Demonstrating_bursts_of_traffic_breaking_the_fixed_window_counter_rate_limiter.svg)
- The system allows a maximum of 5 requests per minutes, and the counter resets at the human-friendly round minute
- There are 5 requests just before 2:01, and 5 requests just after 2:01.
- This leads to 10 requests going through around the 2:01 mark

## Related Notes
- 

## Sources
- [[(Done) Design A Rate Limiter - Highlights]]