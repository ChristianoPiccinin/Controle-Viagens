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

/*
// This responds a GET request for the /list page.
app.get('/api/list', function (req, res) {
	console.log("GET Request :: /list");
	log.info('GET Request :: /list');
	var data = {
        "error": 1,
        "products": ""
    };
	
	pool.getConnection(function (err, connection) {
		connection.query('SELECT * from products', function (err, rows, fields) {
			connection.release();

			if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["products"] = rows;
				res.json(data);
			} else if (rows.length === 0) {
				//Error code 2 = no rows in db.
				data["error"] = 2;
				data["products"] = 'No products Found..';
				res.json(data);
			} else {
				data["products"] = 'error while performing query';
				res.json(data);
				console.log('Error while performing Query: ' + err);
				log.error('Error while performing Query: ' + err);
			}
		});
	
	});
});



//UPDATE Product
app.put('/api/update', function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var description = req.body.description;
    var price = req.body.price;
    var data = {
        "error": 1,
        "product": ""
    };
	console.log('PUT Request :: /update: ' + id);
	log.info('PUT Request :: /update: ' + id);
    if (!!id && !!name && !!description && !!price) {
		pool.getConnection(function (err, connection) {
			connection.query("UPDATE products SET name = ?, description = ?, price = ? WHERE id=?",[name,  description, price, id], function (err, rows, fields) {
				if (!!err) {
					data["product"] = "Error Updating data";
					console.log(err);
					log.error(err);
				} else {
					data["error"] = 0;
					data["product"] = "Updated Book Successfully";
					console.log("Updated: " + [id, name, description, price]);
					log.info("Updated: " + [id, name, description, price]);
				}
				res.json(data);
			});
		});
    } else {
        data["product"] = "Please provide all required data (i.e : id, name, desc, price)";
        res.json(data);
    }
});

//LIST Product by ID
app.get('/api/list/:id', function (req, res) {
	var id = req.params.id;
	var data = {
        "error": 1,
        "product": ""
    };
	
	console.log("GET request :: /list/" + id);
	log.info("GET request :: /list/" + id);
	pool.getConnection(function (err, connection) {
		connection.query('SELECT * from products WHERE id = ?', id, function (err, rows, fields) {
			connection.release();
			
			if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["product"] = rows;
				res.json(data);
			} else {
				data["product"] = 'No product Found..';
				res.json(data);
				console.log('Error while performing Query: ' + err);
				log.error('Error while performing Query: ' + err);
			}
		});
	
	});
});



app.post('/api/delete', function (req, res) {
    var id = req.body.id;
    var data = {
        "error": 1,
        "product": ""
    };
	console.log('DELETE Request :: /delete: ' + id);
	log.info('DELETE Request :: /delete: ' + id);
    if (!!id) {
		pool.getConnection(function (err, connection) {
			connection.query("DELETE FROM products WHERE id=?",[id],function (err, rows, fields) {
				if (!!err) {
					data["product"] = "Error deleting data";
					console.log(err);
					log.error(err);
				} else {
					data["product"] = 0;
					data["product"] = "Delete product Successfully";
					console.log("Deleted: " + id);
					log.info("Deleted: " + id);
				}
				res.json(data);
			});
		});
    } else {
        data["product"] = "Please provide all required data (i.e : id ) & must be a integer";
        res.json(data);
    }
});
*/


//INSERT new product
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






var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("dummy app listening at: " + host + ":" + port);

})

