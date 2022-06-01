import express from "express";
import cors from "cors";
import PersonajeRouter from "./src/controllers/PersonajeController.js";
import JwtStrategy from "passport-jwt/lib/strategy";

const app = express();
const port = 5000;

import jwt from "jsonwebtoken";
import "dotenv/config";

const getRandomString = () => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 18; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const getSignedToken = () => {
  const userId = getRandomString();
  const userMail = `${userId}@example.com`;
  const token = jwt.sign(
    {
      payload: "custom payload",
      userEmail: userMail,
    },
    process.env.AUTH0_HS256_KEY,
    {
      issuer: "http://pizza.ort/",
      subject: userId,
      audience: ["http://localhost/"],
      expiresIn: 60 * 24 * 24,
    }
  );

  return token;
};

console.log(getSignedToken());

app.use(cors());
app.use(express.json());

app.use("/personaje", PersonajeRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);

  passport.use(JwtStrategy);
  app.use(passport.initialize());
});
