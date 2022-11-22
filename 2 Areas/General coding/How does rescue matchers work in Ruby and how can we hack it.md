- Ruby uses the `===` operator to match exceptions
- So, when we write `rescue FooError`, ruby tests the exception object like this:
```ruby
FooError === exception
```

## How to create custom exception matchers
```ruby
class FoobarMatcher
  def self.===(exception)
    # rescue all exceptions with messages starting with FOOBAR 
    exception.message =~ /^FOOBAR/
  end
end

begin
  raise EOFError, "FOOBAR: there was an eof!"
rescue FoobarMatcher
  puts "rescued!"
end
```
## Related information
- [[Ruby triple equal operator]]

## Sources
- https://www.exceptionalcreatures.com/guides/advanced-rescue-and-raise
## Keywords
