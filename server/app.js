var express = require('express');
var logger = require('morgan');
var fs = require("fs");
var path = require('path');

var app = express();

app.set('trust proxy', true)
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '..', 'client', 'build', 'web'), {
  cacheControl: true,
  maxAge: 604800
}));

if (!fs.existsSync(`${__dirname}/storage`)) {
  fs.mkdirSync(`${__dirname}/storage`);
}

app.post('/rest/storage/:key', function (req, res) {
    var file = fs.createWriteStream(`${__dirname}/storage/${req.params.key}`);
    req.pipe(file);
    res.end();
  });
app.get('/rest/storage/:key', function (req, res) {
    var file = fs.createReadStream(`${__dirname}/storage/${req.params.key}`);
    file.on('open', function () {
      file.pipe(res);
    });
    file.on('error', function(err) {
      res.end();
    });
  });
app.delete('/rest/storage/:key', function (req, res) {
    fs.unlink(`${__dirname}/storage/${req.params.key}`, (err) => {});
    res.end();
});

module.exports = app;
