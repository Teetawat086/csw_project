var express = require('express'); 
var app = express(); 
var router = express.Router(); 
var bodyParser = require('body-parser')
// var urlencodedParser = bodyParser.urlencoded({ extended: false }); 

var items = [{'id':0,'price': 150,'name': 'White suit','size':'M'}, 
	       {'id':1, 'price': 200,'name': 'Black suit','size':'M'}]
var Index=2;

app.use(express.static('public'))

router.route('/items') 
     // get all the items (accessed at GET http://localhost:8000/api/items)
    .get(function(req, res) {    	
    	res.json(items);
    })

    // insert a new item
	.post(function(req, res) { 
		var item = {}; 		 
		item.id = Index++;
		item.price = req.body.price
		item.name = req.body.name	
		item.size = req.body.size
		items.push(item); 
		res.json( {message: 'item created!'} )
	}) 

// get a single item
router.route('/items/:item_id')
	.get (function(req,res) {
    	res.json(items[req.params.item_id])
    })

	.put (function(req,res) {
		var id = req.params.item_id		
		items[id].name = req.body.name;  // update 
       	items[id].price = req.body.price;
		item[id].size = req.body.size
        res.json({ message: 'item updated!' });        
     })

       .delete (function(req,res) {
	var id = req.params.item_id
	delete 	items[id]
      	  res.json({ message: 'item deleted!' });        
    })

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' }) 
});

// all of our routes will be prefixed with /api 
app.use('/api', bodyParser.json(), router);   //[use json]
//app.use('/api', bodyParser.urlencoded({ extended: false }), router); 

app.use("*",function(req,res){
  res.status(404).send('404 Not found');
 // res.sendFile(__dirname + "/public/404.html");
});

app.listen(80, function() {
	console.log("Server is running")
});
