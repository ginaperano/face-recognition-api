
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require("./config/keys").mongoURI;


mongoose
    .connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log('DB Connection Error');
    });

app.get("/", (req, res) => res.send("Hello"));




const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server is running on port ${port}`));
