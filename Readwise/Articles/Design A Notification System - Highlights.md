![rw-book-cover](https://bytebytego.com/social.png)

## Metadata
- Author: [[ByteByteGo]]
- Full Title: Design A Notification System
- URL: https://bytebytego.com/courses/system-design-interview/design-a-notification-system

## Highlights
- ![Figure 9](https://bytebytego.com/_next/image?url=%2Fimages%2Fcourses%2Fsystem-design-interview%2Fdesign-a-notification-system%2Ffigure-10-9-62C2GFUU.png&w=1920&q=75) ([View Highlight](https://read.readwise.io/read/01h4t7k2dw4fv9v88enzatx909))
- Third party services are responsible for delivering notifications to users. While integrating with third-party services, we need to pay extra attention to extensibility. Good extensibility means a flexible system that can easily plugging or unplugging of a third-party service. Another important consideration is that a third-party service might be unavailable in new markets or in the future. For instance, FCM is unavailable in China. Thus, alternative third-party services such as Jpush, PushY, etc are used there. ([View Highlight](https://read.readwise.io/read/01h4t7k8mrc9wnj58epxk1awfg))
- Figure 10 shows the improved high-level design.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27700%27%20height=%27430%27/%3e)![Figure 10](https://bytebytego.com/_next/image?url=%2Fimages%2Fcourses%2Fsystem-design-interview%2Fdesign-a-notification-system%2Ffigure-10-10-VPOYUWTG.png&w=1920&q=75) ([View Highlight](https://read.readwise.io/read/01h4t7mes9jhekmxa798yfm222))
- **Cache**: User info, device info, notification templates are cached. ([View Highlight](https://read.readwise.io/read/01h4t7nryz9hpkstgx9h09ddbf))
- **Message queues**: They remove dependencies between components. Message queues serve as buffers when high volumes of notifications are to be sent out. Each notification type is assigned with a distinct message queue so an outage in one third-party service will not affect other notification types. ([View Highlight](https://read.readwise.io/read/01h4t7p9gj8p371m8cd7r3gw0t))
- how every component works together to send a notification:
  1. A service calls APIs provided by notification servers to send notifications.
  2. Notification servers fetch metadata such as user info, device token, and notification setting from the cache or database.
  3. A notification event is sent to the corresponding queue for processing. For instance, an iOS push notification event is sent to the iOS PN queue.
  4. Workers pull notification events from message queues.
  5. Workers send notifications to third party services.
  6. Third-party services send notifications to user devices. ([View Highlight](https://read.readwise.io/read/01h4t7pred7rps8z4xdk0tkjs5))
