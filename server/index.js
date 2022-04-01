const express = require('express');
const axios = require('axios');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/campaign', (req, res) => {
  axios.get('https://storage.googleapis.com/southern-waters-642.appspot.com/fe_code_challenge/campaign.json')
    .then(({ data }) => {
      return res.json(data)
    }).catch(err => {
      return res.json({ error: err });
    })
});

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));