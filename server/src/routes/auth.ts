//import { Router } from "express";
//import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";
//import { db } from "../config/db";

//const router = Router();

// Sign-Up
//router.post("/signup", async (req, res) => {
// const { email, password } = req.body;

//if (!email || !password) {
//  return res.status(400).json({ message: "Email and password are required" });
//}

//try {
// Vérifier si l'utilisateur existe déjà
// const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [
//  email,
//]);
//if (rows.length > 0) {
//  return res.status(400).json({ message: "User already exists" });
//}

// Hasher le mot de passe
//const hashedPassword = await bcrypt.hash(password, 10);

// Insérer l'utilisateur
//await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [
// email,
// hashedPassword,
//]);

//res.status(201).json({ message: "User created successfully" });
//} catch (err) {
//  res.status(500).json({ message: "Error creating user", error: err });
//}
//});

// Login
//router.post("/login", async (req, res) => {
//const { email, password } = req.body;

//if (!email || !password) {
//return res.status(400).json({ message: "Email and password are required" });
//}

//try {
// Vérifier si l'utilisateur existe
//const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [
//email,
//]);
//if (rows.length === 0) {
//  return res.status(400).json({ message: "Invalid email or password" });
//}

//const user = rows[0];

// Vérifier le mot de passe
//const isMatch = await bcrypt.compare(password, user.password);
//if (!isMatch) {
//  return res.status(400).json({ message: "Invalid email or password" });
// }

// Générer un token JWT
//const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
// expiresIn: "1h",
//});

//res.json({ message: "Login successful", token });
//} catch (err) {
//  res.status(500).json({ message: "Error logging in", error: err });
//}
//});

//export default router;
