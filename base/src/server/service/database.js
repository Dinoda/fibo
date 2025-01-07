import Database from "fibo-database-mariadb";

export default new Database({
  host: "localhost",
  database: "test",
  user: "test",
  password: "test"
});
