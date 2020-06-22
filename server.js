const express = require('express');
const app = express();
const path = require('path');
const PORT = "FILL_ME_IN";


app.use(express.static(path.join(__dirname, '../frontEnd')));
app.use(express.json())



app.listen(PORT, () => {
  console.log(`server is CONNECTED on PORT:${PORT}`);
});
