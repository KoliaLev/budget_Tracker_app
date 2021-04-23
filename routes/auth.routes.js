const { Router, json, response } = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); // для шифрования пароля
const jwt = require("jsonwebtoken"); // для создания токена
const config = require("config");
const User = require("../models/User"); // модель юзера

const router = Router();
// api/auth/register
router.post(
  "/register",
  [
    check("email", "некоректный email").isEmail(),
    check("password", "минимальная длинна пароля  6 символов").isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log(req.body);
    try {
      const errors = validationResult(req); // вызываем и валидируем указанные поля
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "некоректные данные регистрации",
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email: email });
      if (candidate) {
        return res.status(400).json({ message: "Такой пользователь уже существует" });
      }

      const hashedPassword = await bcrypt.hash(password, 12); // получаем за шифрованый(захешированый) пароль -
      //   второй параметр в hash - это некоторый солт для допольнительного шифрования
      console.log(email, password, hashedPassword);
      const user = await new User({ email, password: hashedPassword });
      console.log(user);
      await user.save(); // сохраняем юзера

      res.status(201).json({ message: "пользователь создан" });
    } catch (e) {
      res.status(500).json({ message: "Упс, что то полшо не так" });
    }
  }
);

// api/auth/login
router.post(
  "/login",
  [
    check("email", "введите коректный email").normalizeEmail().isEmail(),
    check("password", "ведите пароль").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req); // вызываем и валидируем указанные поля
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "некоректные данные при авторизации",
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "пользователь ненайден" });
      }
      const isMatch = await bcrypt.compare(password, user.password); // сравнение пароля который пришел с паролем в базе
      if (!isMatch) {
        return res.status(400).json({ message: "неверный пароль" });
      }
      // создание токена авторизации
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), { expiresIn: "1h" }); // { expiresIn: "1h" } - не реализован на фронте
      //
      res.json({ token, userId: user.id, email: email, message: "успешно залогинен" }); // ответ
    } catch (e) {
      res.status(500).json({ message: "Упс, что то полшо не так" });
    }
  }
);

module.exports = router;
