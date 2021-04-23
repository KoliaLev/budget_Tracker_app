// модель для работы с тратами

const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }, // Types.ObjectId - особенный тип ID который определен
  owner: { type: Types.ObjectId, ref: "User" }, // Types.ObjectId - особенный тип ID который определен
  //   в монгоДБ (получается связка модели пользователя с определенными записями в базе данных)
  // ref: - у казываем к какой колекции мы привязываемся
});

//  експортируем результат работы функции model , где название нашей модели "Spend"
//  схема по которой он работает schema
module.exports = model("Spend", schema);
