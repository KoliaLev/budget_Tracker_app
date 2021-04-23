// модель для работы с юзерами

const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  spendings: [{ type: Types.ObjectId, ref: "Spend" }], // Types.ObjectId - особенный тип ID который определен
  //   в монгоДБ (получается связка модели пользователя с определенными записями в базе данных)
  // ref: - у казываем к какой колекции мы привязываемся
});

//  експортируем результат работы функции model , где название нашей модели "User"
//  схема по которой он работает schema
module.exports = model("User", schema);
