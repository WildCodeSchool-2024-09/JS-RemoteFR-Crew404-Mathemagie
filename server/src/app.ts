import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
//import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
//app.use("/api/auth", authRoutes);

// Démarrer le serveur
//app.listen(PORT, () => {
// console.log(`Server running on http://localhost:${PORT}`);
//});
export default app;
