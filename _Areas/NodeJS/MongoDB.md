- NoSQL database
- Uses data format called BSON
	- Similar to JSON, but the values are typed (data type of values will be pre-defined)
- Most used database with NodeJS
- Maximum size for each document is 16 MB (can increase in future)
- Each document has an auto-generated `id`

## Mapping between relational database and Mongo

| Relational database | MongoDB     |
| ------------------- | ----------- |
| Tables              | Collections |
| Rows                | Documents   |
| Columns             | Fields            |

## Features

- **Document based**: Stores data in documents (field-value pair data structures)
- **Built-in scalability**: Easy to distribute data across multiple machines
- **Flexible**: No data schema required; each document can have different type of fields and number of fields
- **Performant**: Embedded data models, indexing, sharding, flexible documents, native duplications
- Free and open source; SSPL license
- **Embedded/Denormalizing documents**: Any document can hold a list of documents in a field. Allows quicker access and easier data models. *In relational databases, data is always normalized* 

## Technical dive into Mongo
[[Technical dive into MongoDB]]
