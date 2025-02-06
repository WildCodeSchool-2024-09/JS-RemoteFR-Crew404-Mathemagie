import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  name: string;
  grade: string;
  birthday: string;
  photo: string;
};

class userRepository {
  // CRUD - Create du  Read, Update, Delete

  async create(user: Omit<User, "id">) {
    const [result] = await DatabaseClient.query<Result>(
      "INSERT INTO user (name, grade, birthday, photo) values (?, ?, ?, ?)",

      [user.name, user.grade, user.birthday, user.photo],
    );

    return result.insertId;
  }

  // CRUD - Read du Create, Read, Update, Delete
  async read(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT * FROM user WHERE id = ?",
      [id],
    );
    return rows[0] as User[];
  }
  async getAllUsers() {
    const [rows] = await DatabaseClient.query<Rows>("SELECT * FROM user");
    return rows as User[];
  }
}

export default new userRepository();
