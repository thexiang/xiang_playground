'use strict';

const express = require('express');
const cors = require("cors")

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/dogs', (req, res) => {
    const dogs = [
      {
        'name': 'Miya',
        'nickName': 'miyaya',
        'age': 7
      },
      {
        'name': 'Ollie',
        'nickName': 'Ollie',
        'age': 7
      },
      {
        'name': 'Ice Cream',
        'nickName': 'Ice Cream',
        'age': 4
      },
    ]
    res.status(200).json(dogs)

  });


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);