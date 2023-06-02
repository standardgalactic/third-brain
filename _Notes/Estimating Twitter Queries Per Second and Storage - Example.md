> [!info] The following numbers are just for demonstration. They are not related to the real numbers

## Assumptions
- 300 million monthly active users (MAUs)
- 50% of users use Twitter daily.
- Users post 2 tweets per day on average.
- 10% of tweets contain media.
- Data is stored for 5 years.

## Estimations / Calculations
### Queries Per Second (QPS)
- Daily active users (DAU) = 300 million * 50% = 150 million
- Tweets QPS = 150 million * 2 tweets / 24 hour / 3600 seconds = ~3500

> [!summary] Peak QPS = 2 * QPS = ~7000 _(Multiplying by two to have a buffer)_

### Media storage calculations
- Assumptions about the average tweet size
	- `tweet_id` - 64 bytes
	- `text` - 140 bytes
	- media - 1 MB
- **Media storage** - 150 million * 2 tweets * 10% * 1 MB = 30 TB per day

> [!summary] **5-year media storage** = 30 TB * 365 * 5 = ~55 PB

## Related Notes
- 

## Sources
- [[(Done) Back of the envelop estimation by ByteByteGo - Highlights]]