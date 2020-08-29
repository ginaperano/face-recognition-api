
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');

app.get("/", (req, res) => res.send("Hello"));






app.listen(port, () => console.log(`Server is running on port ${port}`));
