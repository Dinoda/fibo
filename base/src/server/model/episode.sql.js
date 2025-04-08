export const SELECT_ALL = `
SELECT
  id,
  name,
  description,
  work AS work_id
from \`episode\`
`;

export const SELECT = SELECT_ALL + `
WHERE id = ?`;

export const INSERT = `
INSERT INTO \`episode\` (
  name,
  description,
  work
) VALUES (?, ?, ?)
`;

export const UPDATE = `
UPDATE \`episode\`
SET
  name = ?,
  description = ?,
  work = ?
WHERE id = ?
`;

export const DELETE = `
DELETE FROM \`episode\` WHERE id = ?
`;

