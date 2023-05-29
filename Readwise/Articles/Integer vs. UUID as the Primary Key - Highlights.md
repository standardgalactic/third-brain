![rw-book-cover](https://hashnode.com/utility/r?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1682420290407%2Fff40daac-119b-4cbc-86da-468aa4b214ee.jpeg%3Fw%3D1200%26auto%3Dcompress%2Cformat%26format%3Dwebp%26fm%3Dpng)

## Metadata
- Author: [[Become a Ruby hero]]
- Full Title: Integer vs. UUID as the Primary Key
- Document Note: Optimistic locking is named so because it assumes that there will be no conflicts when reading or updating a record, and therefore there is no need to lock the record exclusively. It allows multiple processes to read the same record, but if two processes try to update the same record at the same time an error will be raised. This is in contrast to pessimistic locking which locks the record exclusively and disallow other processes from dealing with the record until the transaction has been committed.
- URL: https://blog.rubyhero.dev/advanced-active-record?utm_source=shortruby&utm_campaign=shortruby_0040&utm_medium=email

## Highlights
- In optimistic locking, you assume another person won’t update the same record simultaneously. If this is going to happen, the application should raise an error. ([View Highlight](https://read.readwise.io/read/01gzejb2m5qd0wdtf84hznawnx))
- This behaviour is controlled with a column called `lock_version`. Add this column to your model, and Rails will automatically apply optimistic locking. This is what it looks like in practice when you have the `lock_version` column in your table:
  company1 = Company.find(1)
  company2 = Company.find(1)
  company1.title = "Great company"
  company1.save # => true
  company2.title = "Awesome company"
  company2.save # Attempted to update a stale object: Job. (ActiveRecord::StaleObjectError)
  The ([View Highlight](https://read.readwise.io/read/01gzejbagg2vk2amvtk3k0sk5g))
