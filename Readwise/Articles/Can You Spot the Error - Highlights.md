![rw-book-cover](https://www.akshaykhot.com/content/images/2023/04/error-4.png)

## Metadata
- Author: [[Akshay Khot]]
- Full Title: Can You Spot the Error?
- URL: https://www.akshaykhot.com/ruby-quiz/

## Highlights
- ![](https://www.akshaykhot.com/content/images/size/w2000/2023/04/error-4.png) ([View Highlight](https://read.readwise.io/read/01gzp27nq1a73t3bjxwdbkeprm))
- How’s that possible? Didn’t we just assign the value to `name`? **Why did the `name` variable not retain its value?** ([View Highlight](https://read.readwise.io/read/01gzp27yndy8kj6dvjgnbw2mdv))
- In the above code, `name` is a local variable, instead of the setter method created by `attr_accessor`. Hence, its scope is limited to the `publish` method and no one outside it can access it. The value we assign to this local variable is lost as soon as the control exits the method. ([View Highlight](https://read.readwise.io/read/01gzp28128hfg26sy5k6mst8rm))
- Using `self` ensures that Ruby calls `Blog#name` method, instead of creating a local variable. Typically, `self` is not needed if you're simply calling a method in the class, Ruby will implicitly call that method on the current object. However, in this example, `self` is required. ([View Highlight](https://read.readwise.io/read/01gzp28yfqrdtqq5s3eqykf9ss))
