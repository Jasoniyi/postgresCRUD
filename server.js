import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

import Main from "./server/controllers/main";

dotenv.config();

const app = express();

app.use(morgan("combined"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// db connection with heroku
// const db = require("knex")({
//   client: "pg",
//   connection: {
//     connectString: process.env.DATABASE_URL,
//     ssl: true
//   }
// });

// db connection with localhost
const db = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: 12345,
    database: "postgres",
    port: 5432
  }
});

// App Middleware
const whitelist = ["http://localhost:3001"];

const corOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(helmet());
app.use(cors(corOptions));

// App routes -Auth
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/crud", (req, res) => {
  Main.getTableData(req, res, db);
});

app.post("/crud", (req, res) => {
  Main.postTableData(req, res, db);
});

app.put("/crud/:id", (req, res) => {
  Main.putTableData(req, res, db);
});

app.delete("/crud:id", (req, res) => {
  Main.deleteTableData(req, res, db);
});

// listen for connection
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running port ${port}`);
});
