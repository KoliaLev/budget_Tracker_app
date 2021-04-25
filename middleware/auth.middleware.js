// перехватываем входящие данные и расшифровваем с токена пользователя который авторизирован и отправил запрос

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // 'mykola TOKEN'
    if (!token) {
      res.status(401).json({ message: "нет авторизации" });
    }

    const decodet = jwt.verify(token, config.get("jwtSecret")); // получаем раскодированый токен
    req.user = decodet; // ставим его в реквест
    next(); // продолжаем обработку запроса
  } catch (e) {
    res.status(401).json({ message: "нет авторизации" });
  }
};
