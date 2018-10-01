const config = require("config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbDebuger = require("debug")("app:db");

// Database Configuration

if (app.get("env") === "development") {
  app.set(
    "dbCon",
    `${config.get("dbProvider")}://${config.get("server")}/${config.get("db")}`
  );
} else if (app.get("env") === "remote") {
  app.set(
    "dbCon",
    `${config.get("dbProvider")}://${config.get("server")}/${config.get("db")}`
  );
} else if (app.get("env") === "production") {
  app.set(
    "dbCon",
    `${config.get("dbProvider")}://${config.get("server")}/${config.get("db")}`
  );
}
global.db = global.db
  ? global.db
  : mongoose
      .connect(
        app.get("dbCon"),
        { useNewUrlParser: true, useCreateIndex: true }
      )
      .then(() => dbDebuger("Connected to MongoDB..."))
      .catch(err => dbDebuger("Could not connect to MongoDB...", err));
