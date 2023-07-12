## Example command to understand the protocol
```python
import redis
client = redis.Redis()
client.set('a', 'hello') # SET 'a' 'hello'
```

### Conversion of the above command by redis client
```
*3\r\n
$3\r\n
SET\r\n
$1\r\n
A\r\n
$5\r\n
hello\r\n
```

Things to note here are:
- Every line ends with `\r\n`
- Explanation of the above command sequence line-by-line (not showing `\r\n`)
	- `*3` - Indicates that there are three arguments in the command (`SET 'a' 'hello'`). Note that this line starts with `*`
	- `$3` - Number of bytes in the upcoming argument (`SET` is 3 bytes long). Note that this line begins with `$`
	- `SET` - The argument itself
	- `$1` - The next argument is 1 byte long
	- `A` - The argument
	- `$5` - The next argument is 5 bytes long
	- `hello` - The argument

### Response from server
```
+OK\r\n
```

The command was successful

## Another example
```python
client.get('a') # GET 'a'
```

The above python code gets converted to the following by the client:
```
*2\r\n
$3\r\n
GET\r\n
$1\r\n
a\r\n
```

The server responds with:
```
$5\r\n      -> The response is 5 bytes long
hello\r\n
```

## Sources
- [[The Redis Protocol is pretty good]]