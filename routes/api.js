const express = require("express");
const router = express.Router();

router.get("/name", (req, res) => {
  res.send("Zemenu Mekuria");
});

router.get("/hobby", (req, res) => {
  res.json({
    hobby: "Reading",
  });
});

router.get("/dream", (req, res) => {
  res.send("Death smiles at us all, all man can do is smile back");
});

module.exports = router;
