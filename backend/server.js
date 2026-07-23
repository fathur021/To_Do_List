const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;

connectDB();
app.use(cors());

app.use(express.json());


app.use("/api/auth", require("./router/authRouter"));
app.use("/api/matakuliah", require("./router/matkulRoute"));
// Route sederhana untuk mengecek apakah server berjalan
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});