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

- The first rescue block will run
```ruby
class TimeoutError < StandardError; end;

begin
	raise TimeoutError
rescue TimeoutError
	puts "Inside the first rescue"
rescue StandardError
	puts "Inside the second rescue"
end

#=> Inside the first rescue
```

## The `retry` keyword
- Ruby provides the `retry` keyword to retry the code inside the `begin..end` block
```ruby
counter = 0
begin
  counter += 1
  make_api_request
rescue
  retry if counter <= 3  
end
```

## Reraising exceptions
- Calling `raise` with no arguments inside the `rescue` block will re-raise the original rescued exception
- The re-raised exception cannot be distinguished from the original exception
```ruby
begin
  ...
rescue => e
  raise if e.message == "Fubar"
end

# Will re-raise the exception that was rescued if the message of the exception is "Fubar"
```

## Advanced topics
- [[How does rescue matchers work in Ruby and how can we hack it]]
- [[Ruby - Multiple ways to raise exceptions]]