## General syntax
```ruby
begin
  ...
rescue TooHotError => too_hot
  # This code is run if a TooHotError occurs 
rescue TooColdError => too_cold
  # This code is run if a TooColdError occurs 
else
  # This code is run if no exception occurred at all
ensure
  # This code is always run, regardless of whether an exception occurred
end
```

## Multiple rescues
### Second rescue's exception class also covers first rescue's exception class
```ruby
class TimeoutError < StandardError; end;

begin
	...
rescue TimeoutError
	puts "Inside the first rescue"
rescue StandardError
	puts "Inside the second rescue"
end
```