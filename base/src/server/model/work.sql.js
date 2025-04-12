export const SELECT_ALL = `
SELECT
  id,
  name,
  description
FROM \`work\`
`;

export const SELECT = SELECT_ALL + `
WHERE id = ?`;

const SELECT_FULL_PRE = `
SELECT
  w.id AS work_id,
  w.name AS work_name,
  w.description AS work_description,
  e.id AS episode_id,
  e.name AS episode_name,
  e.order AS episode_order,
  e.description AS episode_description,
  s.id AS sound_id,
  s.name AS sound_name,
  s.description AS sound_description,
  s.filename AS sound_filename
FROM \`work\` w
LEFT JOIN \`episode\` e ON e.work = w.id
LEFT JOIN \`sound\` s ON s.episode = e.id
`;

export const SELECT_ALL_FULL = SELECT_FULL_PRE + 'ORDER BY e.`order`';

export const SELECT_FULL = SELECT_FULL_PRE + `
WHERE w.id = ?
ORDER BY \`e\`.\`order\`
`;

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
