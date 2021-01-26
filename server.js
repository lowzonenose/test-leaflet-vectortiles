/* eslint-disable no-undef */

var express = require('express');
var path = require('path');
var app = express();

app.use(express.static('.'));

// accueil -> index.html
app.get('/', function(req, res){
    res.sendFile('./', { root: path.join(__dirname, '.') });
});

// accueil -> index.html
app.get('/samples', function(req, res){
    res.sendFile('./samples.html', { root: path.join(__dirname, '.') });
});

// route : http://localhost:9001/1
// -> http://localhost:9001/1/index-mapbox-gl1.html
app.get('/1', function(req, res){
    res.sendFile('./public/index-mapbox-gl1.html', { root: path.join(__dirname, '.') });
});
// route : http://localhost:9001/2
// -> http://localhost:9001/2/index-mapbox-gl2.html
app.get('/2', function(req, res){
    res.sendFile('./public/index-mapbox-gl2.html', { root: path.join(__dirname, '.') });
});
// route : http://localhost:9001/3
// -> http://localhost:9001/3/index-mapbox-gl3.html
app.get('/3', function(req, res){
    res.sendFile('./public/index-mapbox-gl3.html', { root: path.join(__dirname, '.') });
});
// route : http://localhost:9001/4
// -> http://localhost:9001/4/index-mapbox-gl4.html
app.get('/4', function(req, res){
    res.sendFile('./public/index-mapbox-gl4.html', { root: path.join(__dirname, '.') });
});
// route : http://localhost:9001/5
// -> http://localhost:9001/5/index-mapbox-gl5.html
app.get('/5', function(req, res){
    res.sendFile('./public/index-mapbox-gl5.html', { root: path.join(__dirname, '.') });
});
// route : http://localhost:9001/6
// -> http://localhost:9001/6/index-mapbox-gl6.html
app.get('/6', function(req, res){
    res.sendFile('./public/index-mapbox-gl6.html', { root: path.join(__dirname, '.') });
});
// route : http://localhost:9001/7
// -> http://localhost:9001/7/index-mapbox-js.html
app.get('/7', function(req, res){
    res.sendFile('./public/index-mapbox-js.html', { root: path.join(__dirname, '.') });
});
// route : http://localhost:9001/8
// -> http://localhost:9001/8/index-vectorgrid.html
app.get('/8', function(req, res){
    res.sendFile('./public/index-vectorgrid.html', { root: path.join(__dirname, '.') });
});
var server = app.listen(9001, function() {
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});
