import express from "express";
export const botRouter = express.Router();

// Gets a pose reference depending on given attributes from https://quickposes.com
botRouter.get("/reference/pose/:gender/:clothing", function (req, res) {
  console.log("pose: ", req.params);
});

// Gets a animal reference from https://quickposes.com
botRouter.get("/reference/animals", function (req, res) {
    console.log("animals");
});

// Gets a face reference from https://quickposes.com
botRouter.get("/reference/face/:gender", function (req, res) {
  console.log("face", req.params);
});

// Gets a hands reference from https://quickposes.com
botRouter.get("/reference/hands/:gender", function (req, res) {
  console.log("hands", req.params)
});

// Gets a landscape reference from https://quickposes.com
botRouter.get("/reference/landscape", function (req, res) {
  res.send("About this wiki");
});

// Gets a urban reference from https://quickposes.com
botRouter.get("/reference/urban", function (req, res) {
  res.send("About this wiki");
});

console.log('')