
const express = require('express');
// const morgan = require('morgan');
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static('client/dist'));


// app.get()


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})