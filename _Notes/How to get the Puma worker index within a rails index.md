```ruby
ObjectSpace.each_object(Puma::Cluster::Worker) { |x| p x.index }
```

This command will print the index of the puma worker being used.

## Sources
- https://stackoverflow.com/q/73504190