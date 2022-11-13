const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');

const cashout = async function (req, res) {
  var fullUrl = req.protocol + '://' + req.hostname + req.originalUrl;
  const { URLSearchParams } = require('url');
  const url = new URL(fullUrl);
  const urlParams = new URLSearchParams(url.search);
  const type = urlParams.get('type');
  const gamertag = urlParams.get('gamertag');
  const satoshis = urlParams.get('sats');
  
  const gmtverify = await fetch(`https://api.zebedee.io/v0/user-id/gamertag/${gamertag}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': "ajt0HTbRo1VOcodOuss3caNEku3yv6vt"
      }
  });
  
  const gmtverify1 = await gmtverify.json();
  if (gmtverify1.success === false) {
    return;
  } else {
    if (gmtverify1.data.id === "34f43956-8f61-47bb-a6a4-83f717948bc9") return;
  
  const body = JSON.stringify({ gamertag: gamertag, amount: satoshis, description: "Thank you for using my website! Share it with all your friends!" });
  
  const res2 = await fetch('https://api.zebedee.io/v0/gamertag/send-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': "ajt0HTbRo1VOcodOuss3caNEku3yv6vt"
      },
      body: body
  });
    
    const res2json = await res2.json();
    console.log(res2json);
  res.send("Cashed out successfully.");
  }
}

app.get('/', (req, res) => {
  cashout(req, res);
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Example app listening on port 8080`)
})
