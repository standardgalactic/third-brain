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

### Syntactic sugar - Ruby always provides better ways to do things 😉
```ruby
def exceptions_matching(&block)
  Class.new do
    def self.===(other)
      @block.call(other)
    end
  end.tap do |c|
    c.instance_variable_set(:@block, block)
  end
end

begin
  raise "FOOBAR: We're all doomed!"
rescue exceptions_matching { |e| e.message =~ /^FOOBAR/ }
  puts "rescued!"
end
```

## Related information
- [[Ruby triple equal operator]]

## Sources
- https://www.exceptionalcreatures.com/guides/advanced-rescue-and-raise