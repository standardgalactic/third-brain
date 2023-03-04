```ruby
ObjectSpace.each_object(Puma::Cluster::Worker) { |x| p x.index }
```

This command will print the index of the puma worker being used.

## Sources
 
```embed
title: 'How do I get the Puma worker index within a Rails request?'
image: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded'
description: 'When a Rails server starts, it lists the Puma workers by their index and PID. [17042] - Worker 0 (PID: 17069) booted in 0.01s, phase: 0 [17042] - Worker 1 (PID: 17070) booted in 0.01s, phase: 0 I ...'
url: 'https://stackoverflow.com/q/73504190'
```
## Keywords
