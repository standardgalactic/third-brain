If you want to view (monitor) all TCP data packets being transmitted to a port (*here 6379*) in your local machine:
```
sudo ngrep -d lo0 -t '' 'tcp and port 6379'
```

## Sources
- [[The Redis Protocol is pretty good]]