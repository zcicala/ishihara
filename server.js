var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
app.configure(function(){
    app.use(express.static(__dirname+'/public'))
})

app.get('/', function(req, res){
  res.sendfile('public/ishihara.html');
});

app.listen(port);