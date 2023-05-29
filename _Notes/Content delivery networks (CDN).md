- Network of geographically dispersed servers used to deliver static content
- Cache static content like images, videos, CSS, Javascript, files, etc

## How it works?
- The image below describes the working of a CDN
- The image returned by the 'server' may include a [[HTTP Header - Time to Live (TTL)]] which describes how long the image should be cached by the CDN
	- The images remains cached until the TTL expires

![Server can be a web server or an online storage like S3](Assets/How_CDN_caches_static_content.png)

## Caveats
- Do not cache content that are infrequently used
- Set a expiry time ([[HTTP Header - Time to Live (TTL)|TTL]]) for time-sensitive content
- Consider how your application copes with CDN failure. In case of failure, clients should be able to fetch content from the origin server

## Invalidating files in CDN
- Invalidate the CDN object using APIs provided by the CDN vendor
- Use object versioning to serve a different version of the object. For example, you can add a query parameter to the URL to version an object

## Sources
- [[Scale From Zero To Millions Of Users by ByteByteGo]]

## Related Notes
- 