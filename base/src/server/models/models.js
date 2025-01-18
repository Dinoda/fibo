import db from "../service/database.js";

const INSERT =
  "INSERT INTO work (name, description, initialURL) VALUES (?, ?, ?)";

const UPDATE =
  "UPDATE work SET name = ?, description = ?, initialURL = ? WHERE id = ?";

const DELETE = "DELETE FROM work WHERE id = ?";

export const workModel = {
  id: {
    validator: "integer",
    type: "none"
  },
  name: {
    validator: "!string",
    type: "text"
  },
  description: {
    validator: "string",
    type: "textarea"
  },
  initialURL: {
    validator: "string",
    type: "text"
  }
};

export const workInsert = async data => {
  const result = await db.query(INSERT, [
    data.name,
    data.description,
    data.initialURL
  ]);

  return result.insertId;
};

export const workUpdate = async data => {
  const result = await db.query(UPDATE, [
    data.name,
    data.description,
    data.initialURL,
    data.id
  ]);

  return data;
};

export const workDelete = async id => {
  const result = await db.query(DELETE, [id]);

  if (result.affectedRows == 0) {
    throw new Error("No row has been removed");
  }

  return result.affectedRows > 0;
};
