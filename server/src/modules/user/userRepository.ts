import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type User = {
  id_user: number;
  id: number;
  name: string;
  classe: string;
  birthday: string;
  photo: string;
  id_parent: number;
};

class userRepository {
  // CRUD - Create du  Read, Update, Delete

  async create(user: Omit<User, "id">, id_parent: number) {
    const [result] = await DatabaseClient.query<Result>(
      "INSERT INTO user (prenom, classe, birthday, photo, id_parent) values (?, ?, ?, ?, ?)",

      [user.name, user.classe, user.birthday, user.photo, id_parent],
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
}

export default new userRepository();
