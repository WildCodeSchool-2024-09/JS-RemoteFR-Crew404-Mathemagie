import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type User = {
  id_user: number;
  id: number;
  name: string;
  grade: string;
  birthday: string;
  picture: string;
  id_parent: number;
};

class userRepository {
  // CRUD - Create du  Read, Update, Delete

  async create(user: Omit<User, "id">, id_parent: number) {
    const [result] = await DatabaseClient.query<Result>(
      "INSERT INTO user (name, grade, birthday, picture,  id_parent) values (?, ?, ?, ?, ?)",
      [user.name, user.grade, user.birthday, user.picture, id_parent],
    );

    return result.insertId;
  }

  // CRUD - Read du Create, Read, Update, Delete
  async read(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT * FROM user WHERE id_user = ?",
      [id],
    );
    return rows[0] as User;
  }

  async findMyChildren(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT * FROM user WHERE id_parent = ?",
      [id],
    );
    return rows as User[];
  }
  async getAllUsers(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT * FROM user WHERE id_parent = ?",
      [id],
    );
    return rows as User[];
  }
}

export default new userRepository();
