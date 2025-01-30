import type { FieldPacket, ResultSetHeader } from "mysql2";
import db from "../../../../database/client";

const findByParentId = async (parentId: number) => {
  const [children] = await db.query(
    "SELECT * FROM children WHERE parent_id = ?",
    [parentId],
  );
  return children;
};

const create = async (name: string, parentId: number) => {
  const [result]: [ResultSetHeader, FieldPacket[]] = await db.query(
    "INSERT INTO children (name, parent_id) VALUES (?, ?)",
    [name, parentId],
  );
  return { id: result.insertId, name, parentId };
};

export default { findByParentId, create };
