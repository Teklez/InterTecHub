const express = require("express");
require("dotenv").config();
const api = require("./routes/api");

app = express();
app.use("/api", api);

app.get("/", (req, res) =>{
  res.send("Welcome to my API\n /api/name\n /api/hobby\n /api/dream");
})
port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
