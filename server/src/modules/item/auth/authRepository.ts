import databaseClient from "../../../../database/client";

import type { Result, Rows } from "../../../../database/client";

type User = {
  id_user: number;
  id_parent: number | null;
  id: number;
  email: string;
  firstname: string;
  password: string;
  lastname: string;
};

class AuthRepository {
  // The C of CRUD - Create operation
  // (pour l'authentification, c'est le register)

  async create(parent: Omit<User, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into parent (email, firstname, lastname, password) values (?, ?, ?, ?)",
      [parent.email, parent.firstname, parent.lastname, parent.password],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(email: string) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from parent where email = ?",
      [email],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as User;
  }
}

export default new AuthRepository();
