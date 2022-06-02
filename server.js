import express from "express";
import cors from "cors";
import PersonajeRouter from "./src/controllers/PersonajeController.js";
import JwtStrategy from "passport-jwt/lib/strategy";

const app = express();
const port = 5000;

console.log(getSignedToken());

app.use(cors());
app.use(express.json());

app.use("/personaje", PersonajeRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);

  passport.use(JwtStrategy);
  app.use(passport.initialize());
});
