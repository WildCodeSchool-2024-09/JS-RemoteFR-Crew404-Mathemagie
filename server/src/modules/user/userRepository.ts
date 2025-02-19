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
  current_level: number;
};

class UserRepository {
  // 🔹 Créer un nouvel utilisateur
  async create(user: Omit<User, "id">, id_parent: number) {
    const [result] = await DatabaseClient.query<Result>(
      "INSERT INTO user (name, grade, birthday, picture, id_parent, current_level) VALUES (?, ?, ?, ?, ?, 1)",
      [user.name, user.grade, user.birthday, user.picture, id_parent],
    );
    return result.insertId;
  }

  // 🔹 Lire un utilisateur par ID
  async read(id_user: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT * FROM user WHERE id_user = ?",
      [id_user],
    );
    return rows.length ? (rows[0] as User) : null;
  }

  // 🔹 Récupérer les enfants liés à un parent
  async findMyChildren(id_parent: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT * FROM user WHERE id_parent = ?",
      [id_parent],
    );
    return rows as User[];
  }

  // 🔹 Obtenir tous les utilisateurs liés à un parent
  async getAllUsers(id_parent: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT * FROM user WHERE id_parent = ?",
      [id_parent],
    );
    return rows as User[];
  }

  // 🔹 Récupérer le niveau actuel d'un utilisateur
  async getCurrentLevel(id_user: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT current_level FROM user WHERE id_user = ?",
      [id_user],
    );
    return rows.length ? rows[0] : null;
  }

  // 🏆 Mise à jour du niveau d'un utilisateur
  async updateLevel(id_user: number, newLevel: number) {
    const existingUser = await this.read(id_user); // Lecture de l'utilisateur pour éviter les erreurs
    if (!existingUser) {
      throw new Error(`Utilisateur avec l'ID ${id_user} non trouvé.`);
    }

    // Mise à jour du niveau
    await DatabaseClient.query(
      "UPDATE user SET current_level = ? WHERE id_user = ?",
      [newLevel, id_user],
    );

    return { message: "Niveau mis à jour avec succès", newLevel };
  }
}

export default new UserRepository();
