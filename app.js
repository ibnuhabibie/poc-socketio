const express = require('express');
require('dotenv').config();

const app = express();
const { PORT } = process.env;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(
    `Example app listening on port http://localhost:${PORT}`
  );
});
