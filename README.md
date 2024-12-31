1. Clone this repository.
2. Execute `npm install`.
3. Execute `docker compose build`.  
4. Execute `docker compose up -d`.
5. Execute `docker exec -it mongodb mongosh -u root -p example --authenticationDatabase admin`.
6. In the MongoDB shell (`mongosh`), select the `doremongo` database by executing the command: `use doremongo`.
7. Update the `MONGO_URI` to use the appropriate MongoDB connection string for visualizing data in MongoDB Compass, or keep the default connection string: `mongodb://root:example@mongodb:27017/doremongo?authSource=admin`.
   - You’ll need this connection string for connecting from your app or MongoDB Compass.
8. In the terminal at the root of the project, run the command: `ts-node src/index.ts`.
9. Display the current collections by running `show collections`.
10. List the records in a collection by running `db.{collection_name_here}.find()`.
    - Replace `{collection_name_here}` with the name of the collection you want to query. This lists the records in that collection.
