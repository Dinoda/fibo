import { MariaDBDatabase, MariaDBTransaction } from "fibo-database-mariadb";

const mariadb = new MariaDBDatabase({
  host: "localhost",
  user: "vibo",
  password: "-Vzi|xV[[?`c]+d5Lem`",
  database: "vibo"
});

console.log(mariadb);

mariadb.query("SHOW TABLES").then(result => {
  console.log(result);
});
