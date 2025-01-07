import db from "../service/database.js";

export const workInsert = async data => {
  const result = await db.query(
    "INSERT INTO work (name, description, initialURL) VALUES (?, ?, ?)",
    [data.name, data.description, data.initialURL]
  );

  return result.insertId;
};
