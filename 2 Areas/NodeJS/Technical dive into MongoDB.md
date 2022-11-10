**How to start the Mongo client?**

`mongo` in terminal

----
**How to switch to a database?**

`use <db-name>`
Example: `use natours-test`
If the database doesn't exist with the given name, it will create a new one

---
**Create a document in a collection**

`db.<collection-name>.insertOne(<Javscript Object>)`

> If the collection does not exist, it will create the collection

Example:
```js
db.tours.insertOne({
	name: "Hiking route",
	price: 300,
	rating: 4.7
})
```

`insertMany` can be used if we want to insert an array of javascript objects

---
**List all databases**

`dbs`

---
**List all collections in a DB**

`db.collections`

Following up on the above example:
```js
db.collections

//=> tours
```