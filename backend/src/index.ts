const express = require("express");
const { dbConnect } = require("./Config/Database");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// route mount
const userRoutes = require("./routes/userRoute");

// mount
app.use("/api/v1/auth", userRoutes);

dbConnect(); // db connection here

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`SERVER is Running  on port ${PORT}`);
});
