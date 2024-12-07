1. Clone this repository.
2. Execute `npm install`.
3. Execute `docker compose build`.
4. Execute `docker compose up -d`.
5. Execute `docker exec -it mongodb mongosh -u root -p example --authenticationDatabase admin`.
6. In the MongoDB shell (mongosh), switch to the `doremongo` database by running `use doremongo`.
7. Display the current collections by running `show collections`.
8. List the records in a collection by running `db.{collection_name_here}.find()`. 

For example, the current setup adds two employees to the `nhanviens` collection. Running `db.nhanviens.find()` should display two employee records.