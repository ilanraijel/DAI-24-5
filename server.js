import express from "express";
import cors from "cors";
import passport from 'passport';
import PersonajeRouter from "./src/controllers/PersonajeController.js";
import PeliculaRouter from "./src/controllers/PeliculaController.js";
import AuthRouter from "./src/controllers/AuthController.js";
import JwtStrategy from "passport-jwt/lib/strategy.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
passport.use(JwtStrategy);
app.use(passport.initialize());

app.use("/characters", PersonajeRouter);
app.use("/movies", PeliculaRouter);
app.use("/auth", AuthRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});