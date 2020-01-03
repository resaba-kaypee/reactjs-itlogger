const express = require("express");
const connectDB = require("./config/db");
const app = express();

// connect to db
connectDB();

// init middleware
app.use(express.json({ extented: false }));

// define routes
app.use("/api/logs", require("./routes/logs"));
app.use("/api/techs", require("./routes/techs"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
