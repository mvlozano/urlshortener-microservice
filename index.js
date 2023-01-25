require('dotenv').config();
const dns = require('dns');
const URL = require('url').URL;
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Basic Configuration
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const urlSchema = new mongoose.Schema({
  original_url: String,
  short_url: { type: Number, unique: true }
});
const urlModel = mongoose.model('UrlShortener', urlSchema);

//Middlewares
//Enable requests from any domain
app.use(cors());
//Serving static files
app.use(express.static('public'));
//Parsing requests body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routing
//Returns index page
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//Returns all urls in the database
app.get('/api/db', (req, res) => {
  urlModel.find({}, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

/*Redirects the user to the original url which has been shortened to the 
value of the url parameter*/
app.get('/api/shorturl/:url', (req, res) => {
  if (!isNaN(req.params.url)) {
    const shortUrl = Number(req.params.url);
    urlModel.find({ short_url: shortUrl }, (err, data) => {
      if (!err) {
        const url = data[0].original_url;
        console.log(url);
        res.redirect(url);
      } else {
        console.log(err);
        res.sendStatus(404);
      }
    });
  } else {
    res.sendStatus(400);
  }
});

/*Given a posted url via request body, creates a short representation of it
and returns a json with both values*/
app.post('/api/shorturl', (req, res) => {
  const urlStr = req.body.url.trim();
  try {
    const urlObj = new URL(urlStr);
    dns.lookup(urlObj.hostname, async (err, add, fam) => {
      if (err) {
        console.log(err);
        res.json({ error: 'invalid url' });
      } else {
        try {
          let docCount = await urlModel.countDocuments({});
          let shortUrl = 1;
          if (docCount > 0) {
            let data = await urlModel.find({})
              .sort({ short_url: 'desc' })
              .limit(1)
              .select('short_url -_id')
              .exec();
            shortUrl += data[0].short_url;
          }
          let urlDoc = urlModel({ original_url: urlStr, short_url: shortUrl });
          console.log(await urlDoc.save());
          res.json({ original_url: urlStr, short_url: shortUrl })
        } catch (err) {
          res.sendStatus(500);
        }
      }
    });
  } catch (error) {
    res.json({ error: 'invalid url' });
  }
});


//starts listening for requests
app.listen(PORT, function () {
  console.log('Server running on port:', PORT);
});
