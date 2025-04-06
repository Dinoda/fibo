export const SELECT_ALL = `
SELECT
  id,
  name,
  description
FROM \`work\`
`;

export const SELECT = SELECT_ALL + `
WHERE id = ?`;

export const INSERT = `
INSERT INTO \`work\` (
  \`name\`,
  \`description\`
) VALUES (?, ?)
`;

export const UPDATE = `
UPDATE \`work\`
SET
  \`name\` = ?,
  \`description\` = ?
WHERE \`id\` = ?
`;

export const DELETE = `
DELETE FROM \`work\` WHERE \`id\` = ?
`;
