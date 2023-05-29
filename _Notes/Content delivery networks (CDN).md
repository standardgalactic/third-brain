- Network of geographically dispersed servers used to deliver static content
- Cache static content like images, videos, CSS, Javascript, files, etc

## How it works?
- The image below describes the working of a CDN
- The image returned by the 'server' may include a [[HTTP Header - Time to Live (TTL)]] which describes how long the image should be cached by the CDN
	- The images remains cached until the TTL expires

![Server can be a web server or an online storage like S3](Assets/How_CDN_caches_static_content.png)

## Sources
- [[Scale From Zero To Millions Of Users by ByteByteGo]]

## Related Notes
- 