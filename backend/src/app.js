const { Note } = require("./model");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const methodOverride = require("method-override"); // get, post외의 put, delete 등도 받을 수 있도록 해주는 미들웨어

const api = require("./api");

const app = express();

app.use(cors());

app.use(methodOverride());

app.use(express.json());

app.use(morgan("dev"));

app.use("/api", api);

app.use((req, res, next) => {
  const error = new Error("존재하지 않는 API 경로입니다.");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status).json({
      msg: error.message,
    });
    return;
  }
  res.status(500).json({
    msg: "서버 내부에서 문제가 발생하였습니다.",
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API 서버가 ${PORT}에서 요청을 기다리고 있습니다.`);
});

