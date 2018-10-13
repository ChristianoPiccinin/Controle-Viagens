var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");


//STATIC FILES
app.use(express.static('public'));
app.use(bodyParser.json()); // Body parser use JSON data

/*MY SQL Connection Info*/
var pool = mysql.createPool({
	connectionLimit : 25,
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'db',
	port :'3306'
});


//TEST CONNECTION
pool.getConnection(function (err, connection) {
	if (!err) {
		console.log("Database is connected ... ");
		connection.release();
	} else {
		console.log("Error connecting database ... ");
		
	}
	console.log("releasing connection ... ");
});


// ROOT - Loads Angular App
app.get('/', function (req, res) {
	res.sendFile( __dirname + "/" + "index.html" );
});



app.get('/api/report', function (req, res) {
	console.log("GET Request :: /report");

	/*var dataInicio = req.body.datainicio;
	var dataFim    = req.body.datafim;
	console.log(dataInicio);
	console.log(dataFim);
	*/
	var data = {
        "error": 1,
        "products": ""
    };
	
	pool.getConnection(function (err, connection) {
		//connection.query("SELECT * FROM viagem WHERE data BETWEEN date(?) AND date(?)",[dataInicio,  dataFim], function (err, rows, fields) {
		connection.query("SELECT * FROM viagem ", function (err, rows, fields) {
			connection.release();
			console.log(rows);
			if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["despesas"] = rows;
				res.json(data);
			} else if (rows.length === 0) {
				//Error code 2 = no rows in db.
				data["error"] = 2;
				data["despesas"] = 'No products Found..';
				res.json(data);
			} else {
				data["despesas"] = 'error while performing query';
				res.json(data);
				console.log('Error while performing Query: ' + err);
				
			}
		});
	
	});
});


app.post('/api/insertviagem', function (req, res) {

	var dataViagem    =	req.body.data;
	var notaViagem 	  = req.body.nota;
	var origemViagem  = req.body.origem;
	var destinoViagem = req.body.destino;
	var valorViagem   =	req.body.valor;
	var data = {
        "error": 1,
        "product": ""
    };


    if (!!dataViagem && !!notaViagem && !!origemViagem && !!destinoViagem && !! valorViagem) {
		pool.getConnection(function (err, connection) {
			connection.query("INSERT INTO viagem SET dt = ?, nota = ?, origem = ?, destino = ?, valor = ?",[dataViagem,  notaViagem, origemViagem, destinoViagem, valorViagem], function (err, rows, fields) {
				if (!!err) {
					data["viagem"] = "Erro ao adicionar dados";
					console.log(err);
					log.error(err);
				} else {
					data["error"] = 0;
					data["viagem"] = "Viagem adicionada com sucesso.";
					console.log("Adicionado: " + [dataViagem,  notaViagem, origemViagem, destinoViagem, valorViagem]);
					
				}
				res.json(data);
			});
        });
    } else {
        data["viagem"] = "Verificar dados";
        res.json(data);
	}
	
});



app.post('/api/inserirdespesa', function (req, res) {

	var dataDespesa   =	req.body.data;
	var descDespesa   = req.body.descricao;
	var valorDespesa  =	req.body.valor;
	var data = {
        "error": 1,
        "product": ""
    };


    if (!!dataDespesa && !!descDespesa && !!valorDespesa) {
		pool.getConnection(function (err, connection) {
			connection.query("INSERT INTO despesa SET dt = ?, descricao = ?,valor = ?",[dataDespesa,  descDespesa, valorDespesa], function (err, rows, fields) {
				if (!!err) {
					data["despesa"] = "Erro ao adicionar dados em despesa";
					console.log(err);
					log.error(err);
				} else {
					data["error"] = 0;
					data["despesa"] = "Despesa adicionada com sucesso.";
					console.log("Adicionado: " + [dataDespesa,  descDespesa, valorDespesa]);
					
				}
				res.json(data);
			});
        });
    } else {
        data["despesa"] = "Verificar dados de despesa";
        res.json(data);
	}
	
});








var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("dummy app listening at: " + host + ":" + port);

})

