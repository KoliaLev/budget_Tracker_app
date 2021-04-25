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
    date.setHours(12);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const existing = await Spend.findOne({ category, owner: req.user.userId, date: date }); // ищем в базе нет ли уже записи с таким именем и в указаной дате

    if (existing) {
      // console.log("найдено совпадение категории", existing);
      // console.log("category", category, "amount", amount, "userId", userId);
      // return res.json({ spend: existing });
      const upd = await Spend.findOneAndUpdate(
        { category: category, owner: req.user.userId },
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
router.post("/edit", async (req, res) => {});

// для получения всех трат за день
router.get(`/get`, auth, async (req, res) => {
  console.log(req.body);
  console.log(req.query);
  console.log(req.query.date);

  let date = new Date(req.query.date);
  date.setHours(12);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  try {
    const spendsPerDay = await Spend.find({
      owner: req.user.userId,
      date: date,
    }); //??? добавить в поиск парам по дате
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
