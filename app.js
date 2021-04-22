const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

app.use(express.json({ extendet: true })); // мидлвэер для парсинга входящих запросов

app.use("/api/auth", require("./routes/auth.routes"));

const PORT = config.get("port") || 5000;

async function start() {
  try {
    //   соединение с базой монгоДБ
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    // слушатель порта приложения
    app.listen(PORT, () => console.log("app has been started on a port " + PORT));
  } catch (e) {
    console.log("server error", e.message);
    process.exit(1);
  }
}

start();
