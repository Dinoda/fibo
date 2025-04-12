export const SELECT_ALL = `
SELECT
  id,
  name,
  description,
  filename,
  episode
FROM \`sound\`
`;


export const SELECT = SELECT_ALL + `
WHERE id = ?
`;

export const INSERT = `
INSERT INTO \`sound\` (
  name,
  description,
  filename,
  episode
) VALUES (?, ?, ?, ?)
`;

export const UPDATE = `
UPDATE \`sound\`
SET
  name = ?,
  description = ?,
  filename = ?,
  episode = ?
WHERE id = ?
`;

export const UPDATE_NO_FILE = `
UPDATE \`sound\`
SET
  name = ?,
  description = ?,
  episode = ?
WHERE id = ?
`;

export const DELETE = `
DELETE FROM \`sound\` WHERE id = ?
`;


