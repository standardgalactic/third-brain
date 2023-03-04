Each of these lines will raise a `RuntimeError` 👇🏽
```ruby
raise
raise "hello"
raise RuntimeError, "hello"
raise RuntimeError.new("hello")
```

## How does the `raise` method work?
- If the first argument is a string, it raises the `RuntimeError` with the string as an argument
- If the first argument is the name of an Exception class, it raises the exception
- Else, the first argument should be an object returns an Exception object when the `exception` method is called on the object. The object should look like this 👇
	![[exception method on an object#^edcdc4]]
- All exception objects have a method `exception` which returns `self`

## Sources
- https://www.exceptionalcreatures.com/guides/advanced-rescue-and-raise