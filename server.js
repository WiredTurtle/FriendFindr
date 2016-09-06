var express = require('express');
var mysql = require('mysql');
var fs = require('fs');
var favicon = require('serve-favicon');


var app = express();


//Logining into MySQL Server
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password goes here',
	database: 'database name'
});
connection.connect();


//Routes
app.get('/',function (req, res){
	var ip = req.ip;
	console.log('User accessed the home page from ip: '+ ip.substring(7));
	//console.log(req.ip); //Make a global address?
	res.writeHead(200,{"Context-Type": "plain/text"})
	fs.createReadStream("./index.html").pipe(res);
});

app.get('/index.html',function (req, res){
	console.log('User accessed the home page')
	res.writeHead(200,{"Context-Type": "plain/text"})
	fs.createReadStream("./index.html").pipe(res);
});

app.get('/faq.html', function(req, res){
	console.log('user accessed faw.html');
	res.writeHead(200,{"Context-Type": "plain/text"} );
	fs.createReadStream("./faq.html").pipe(res);
})

app.get('/about.html',function (req, res){
        console.log('User accessed the about.html page')
        res.writeHead(200,{"Context-Type": "plain/text"})
        fs.createReadStream("./about.html").pipe(res);
});


//API Access

app.get('/api/upload/:mac/:loc', function (req, res){

				var mac = req.params.mac;
        var location = req.params.loc;
        var time = (new Date).getTime()/1000;

        console.log(time);
        var upload = {time: time, macaddress: mac, location: location}


        var result = connection.query('INSERT INTO test1 SET ?', upload, function(err,res){
                if(err) throw err;

        });
        res.end();

        console.log('Node uploaded new data')
});


app.get('/api/:mac', function (req, res){
	var input = req.params.mac;

	var result = connection.query('SELECT * FROM test1 WHERE macaddress=' + "'" + input + "'" + 'ORDER BY time DESC LIMIT 1;', function (err, result){  //Got two results check SQL statement
	if (err) {
		console.error(err);
		//return;
	}
	else{
	res.json(result);
	//return result;
	console.error(result);
	console.log(result);
	}

	console.log('User requested the website')
});
});


//Creation of Server
var server = app.listen(3000, function(){
	app.enable('trust proxy'); //safe??
	console.log('Server is running on http://127.0.0.1:3000/');
});
