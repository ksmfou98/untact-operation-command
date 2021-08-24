import express, { Request, Response, NextFunction } from "express";

const app = express();

app.listen(4000, () => {
  console.log("start : http://localhost:4000");
});
