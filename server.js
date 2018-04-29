const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/assets/'));
const port = process.env.PORT || 5000;
app.post('/api/login', (req, res) => {
  const credentials = fs.readFileSync('credentials.txt', 'utf8');
  const [username, password] = credentials.split(':');
  if (req.body.username == username && req.body.password == password) {
    res.send(username);
  } else {
    res.sendStatus(401);
  }
});
app.listen(port, () => console.log(`Listening on port ${port}`));
