import jwt from "jsonwebtoken";

export const generarJWT = (id: { uid: number }) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      id,
      process.env.SECRET || "SECRET",
      {
        expiresIn: 60 * 60 * 24,
      },
      (err, token) => {
        err ? reject(err) : resolve(token);
      }
    );
  });
};
