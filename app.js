var express = require('express')
 ,app = express()
 ,r = require('rethinkdb')
 ,connection = null
 ,bodyParser = require('body-parser')
 ,path = require('path')
 ,db = require('./db');

var router = express.Router();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function(req,res,next){
	res.setHeader("Access-Control-Allow-Origin","*");
	res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, PATCH, DELETE");
	res.setHeader("Access-Control-Allow-Headers","*");
	res.setHeader("Access-Control-Allow-Credentials",false);
	next();
});
app.use(db.connect);

router.route("/")
	.get(function(req,res){
		res.sendFile(path.join(__dirname+"/index.html"));
	});

router.route("/user")
	.get(function(req,res){
		r.db("api").table("user").run(req._rdb).then(c=> c.toArray()).then(r => {
			res.send(r);
		});
	})
	.post(function(req,res){
		r.db("api").table("user").insert(req.body).run(req._rdb).then(r => {
			res.send(r);
		});
	});
router.route("/user/:id")
	.get(function(req,res){
		r.db("api").table("user").filter({"id":req.params.id}).run(req._rdb).then(c=> c.toArray()).then(r => {
			res.send(r);
		});
	})
	.delete(function(req,res){
		r.db("api").table("user").get(req.params.id).delete().run(req._rdb).then(r => {
			res.send(r);
		});
	})
	.put(function(req,res){
		r.db("api").table("user").filter({"id":req.params.id}).update(req.body).run(req._rdb).then(r =>{
			res.send(r);
		});
	})
	.patch(function(req,res){
		console.log(req.params.id);
		console.log(req.body);
		r.db("api").table("user").filter({"id":req.params.id}).update(req.body).run(req._rdb).then(r =>{
			res.send(r);
		});
	});

app.use(router);
app.use(db.connect);

/*app.get("/",function(req,res){
	res.sendFile(path.join(__dirname+"/index.html"));
});*/

app.listen(1000,function(){
	console.log("Server Started.");
});