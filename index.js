const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json(), cors());

app.post('/login', (req, res) => {
  const token = jwt.sign({user: 'user name', admin: true}, 'DEMG', {expiresIn: '5d'});
  try {
    if (!(req.body.email === 'test@gmail.com' && req.body.password === '12345')) {
      if (req.body.password !== '12345') {
        throw new Error(`Password is incorrect`);
      }
      throw new Error(`User with email ${req.body.email} not found`);
    }

    res.status(200).send({accessToken: token});
    console.log('token received');
  } catch (e) {
    res.status(400).send('User not found or your password is incorrect');
    console.log(e);
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`app listening port ${port}`);
})