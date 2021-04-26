const { Router, json, response } = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); // для шифрования пароля
const jwt = require("jsonwebtoken"); // для создания токена
const config = require("config");
const Spend = require("../models/Spend"); // модель юзера
const auth = require("../middleware/auth.middleware");

const router = Router();

// api/create

// для записи трат
router.post("/add", auth, async (req, res) => {
  // console.log(req.body);
  // console.log(typeof req.body.date);
  try {
    // const baseUrl = config.get(baseUrl);
    // console.log(req.body.date.toString());
    const { category, amount, userId } = req.body;

    const date = new Date(req.body.date);
    console.log(date);
    const existing = await Spend.findOne({ category, owner: req.user.userId, date: date }); // ищем в базе нет ли уже записи с таким именем и в указаной дате

    if (existing) {
      // console.log("найдено совпадение категории", existing);
      // console.log("category", category, "amount", amount, "userId", userId);
      // return res.json({ spend: existing });
      const upd = await Spend.findOneAndUpdate(
        { category: category, owner: req.user.userId, date: date },
        { category: category, owner: req.user.userId, amount: +amount + +existing.amount },
        { new: true },
        function (err, result) {
          // mongoose.disconnect();
          if (err) return console.log(err);
          // console.log("обновлено:", result);
        }
      );
      // console.log("изменено ", existing);
      return res.json({ spend: upd, message: "успешно обновлен", statusCode: 1 });
    }

    const spend = new Spend({
      category: req.body.category,
      amount: req.body.amount,
      date: date,
      owner: req.user.userId,
    });
    // console.log(spend);
    await spend.save();
    res.status(201).json({ spend, message: "трата записана в базу", statusCode: 1 });
  } catch (e) {
    res.status(500).json({ e, message: "Упс, что то полшо не так", e, statusCode: 0 });
  }
});

// для редактирования трат
router.put("/edit", auth, async (req, res) => {
  console.log("получаем данные для изменения: ", req.body);
  console.log("получаем данные юзер: ", req.user.userId);

  const date = new Date(req.body.date);
  console.log(date);
  try {
    const updateSpend = await Spend.findOneAndUpdate(
      { category: req.body.category, owner: req.user.userId, date: date },
      { amount: req.body.amount },
      { new: true },
      function (err, result) {
        // mongoose.disconnect();
        if (err) return console.log(err);
        // console.log("обновлено:", result);
      }
    );
    res.json({ spend: updateSpend, message: "успешно отредактирован", statusCode: 1 });
  } catch (e) {
    res.status(500).json({ e, message: "Упс, что то полшо не так при попытке апдейта" });
  }
});

// для получения всех трат за день
router.get(`/get`, auth, async (req, res) => {
  console.log(req.body);
  console.log(req.query);
  console.log(req.query.date);

  let date = new Date(req.query.date);

  try {
    const spendsPerDay = await Spend.find({
      owner: req.user.userId,
      date: date,
    });
    res.json(spendsPerDay);
  } catch (e) {
    res.status(500).json({ message: "Упс, что то полшо не так" });
  }
  0;
});

//для удаления трат
router.delete("/delete", async (req, res) => {
  console.log("body: ", req.body);
  console.log("query: ", req.query);

  try {
    const deleteSpend = await Spend.deleteOne({ _id: req.query.id });
    res.json({ message: "сервер: успешно удалено" });
  } catch (e) {
    res.status(500).json({ message: "Упс, что то полшо не так  при попытке удаления" });
  }
});

module.exports = router;
