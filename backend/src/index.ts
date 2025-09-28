console.log("Hello");
const express = require("express");

const app = express();


// route la mount 



 const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log("Db is connected succesfully ")
})