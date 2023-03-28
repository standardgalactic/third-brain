![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article3.5c705a01b476.png)

## Metadata
- Author: [[ruby-lang.org]]
- Full Title: Object Shapes Implementation
- Category: #articles
- URL: https://bugs.ruby-lang.org/issues/18776

## Highlights
- Object shapes are a technique for representing properties of an object ([View Highlight](https://read.readwise.io/read/01gwbq3aw2yjsnyr88wcs1kf8c))
- The original idea of object shapes [originates from the Self language](https://bibliography.selflanguage.org/_static/implementation.pdf), which is considered a direct descendant of Smalltalk. ([View Highlight](https://read.readwise.io/read/01gwbq3hwwwwr656azxra8e5c4))
- Each shape represents a specific set of attributes (instance variables and other properties) and their values. In our implementation, all objects have a shape. The shapes are nodes in a tree data structure. Every edge in the tree represents an attribute transition.
  More specifically, setting an instance variable on an instance of an object creates an outgoing edge from the instance's current shape. This is a transition from one shape to another. The edge represents the instance variable that is set. ([View Highlight](https://read.readwise.io/read/01gwbq3v8d2sype9z7et9t4kcs))
- There is one global shape tree and objects which undergo the same shape transitions in the same order will end up with the same final shape ([View Highlight](https://read.readwise.io/read/01gwbqd4yhqbm8f96jeg05wge2))
- In the diagram below, purple represents shared transitions, blue represents transitions for only `foo`, and red represents transitions for only `bar`.
  ![](https://user-images.githubusercontent.com/1988560/167918899-f1a6f344-ae5e-4dc0-b17a-fb156d1d550f.svg) ([View Highlight](https://read.readwise.io/read/01gwbqdndw46p25cpw1jsdw0fm))
    - Note: class Foo
      def initialize
      # Currently this instance is the root shape (ID 0)
      @a = 1 # Transitions to a new shape via edge @a (ID 1)
      @b = 2 # Transitions to a new shape via edge @b (ID 2)
      end
      end
      class Bar
      def initialize
      # Currently this instance is the root shape (ID 0)
      @a = 1 # Transitions to shape defined earlier via edge @a (ID 1)
      @c = 1 # Transitions to a new shape via edge @c (ID 3)
      @b = 1 # Transitions to a new shape via edge @b (ID 4)
      end
      end
      foo = Foo.new # blue in the diagram
      bar = Bar.new # red in the diagram
- For instance variable writers, the current shape ID, the shape ID that ivar write would transition to and instance variable index are all stored in the inline cache. The shape ID is the key to the cache.
  For instance variable readers, the shape ID and instance variable index are stored in the inline cache. Again, the shape ID is the cache key. ([View Highlight](https://read.readwise.io/read/01gwbx1863b9jmj96m0048jjax))
- When `Foo` is intialized, its shape is the root shape with ID 0. The root shape represents an empty object with no instance variables. Each time an instance variable is set on `foo`, the shape of the instance changes. It first transitions with `@a` to a shape with ID 1, and then transitions with `@b` to a shape with ID 2. If `@a` is then set to a different value, its shape will remain the shape with ID 2, since this shape already includes the instance variable `@a`.
  ![](https://user-images.githubusercontent.com/1988560/167918360-0a6c91aa-2587-48cb-8ff2-7f3a9583288e.svg) ([View Highlight](https://read.readwise.io/read/01gwbqbfe9hc8cr6qxp2rdrz0f))
    - Note: class Foo
      def initialize
      # Currently this instance is the root shape (ID 0)
      @a = 1 # Transitions to a new shape via edge @a (ID 1)
      @b = 2 # Transitions to a new shape via edge @b (ID 2)
      end
      end
      foo = Foo.new
