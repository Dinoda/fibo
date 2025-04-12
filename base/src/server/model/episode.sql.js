export const SELECT_ALL = `
SELECT
  id,
  name,
  description,
  \`order\`,
  work AS work_id
from \`episode\`
`;

export const SELECT = SELECT_ALL + `
WHERE id = ?`;

export const INSERT = `
INSERT INTO \`episode\` (
  name,
  description,
  work,
  \`order\`
) VALUES (?, ?, ?, ?)
`;

export const UPDATE = `
UPDATE \`episode\`
SET
  name = ?,
  description = ?,
  work = ?,
  \`order\` = ?
WHERE id = ?
`;

export const DELETE = `
DELETE FROM \`episode\` WHERE id = ?
`;

