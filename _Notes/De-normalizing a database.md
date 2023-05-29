## What is it? (using an example)
Let's say we have two tables: "Products" and "Orders". In the "Products" table, we store information about each product, such as its name, price, and description. In the "Orders" table, we store information about each order, such as the order number, the date it was placed, and the products that were ordered.

To link the two tables together, we create a "Product ID" column in the "Orders" table, which references the product that was ordered.

In a normalized database, we would stop there, because it's more efficient to have each piece of data appear in only one place. But in a denormalized database, we might also duplicate some of the product information in the "Orders" table, to make certain queries simpler and faster.

For example, we could add columns to the "Orders" table to store the name and price of each product that was ordered. This would enable us to answer certain types of queries using only the "Orders" table without needing to join the "Products" table.

## Downside
The downside of denormalization is that it can lead to data inconsistencies if we don't properly maintain the duplicated information. But if done correctly, it can simplify queries and improve performance, especially for read-heavy workloads.

## Sources
- [[ChatGPT]]

## Related Notes
- 