var express = require('express'); 
var app = express(); 
var router = express.Router(); 
var bodyParser = require('body-parser')
// var urlencodedParser = bodyParser.urlencoded({ extended: false }); 
var sumcost=0;
var items = [{'id':0,'price': 550,'name': 'CPS Basic Round Neck Tee','size':['M','L','XL'],'pic':'CPS/แขนสั้น/ผช/cpsm1.jpg',sex:'M',type:'CPS',color:['white','peru','grey','red','navy','pink','black']}, 
	       		{'id':1,'price': 490,'name': 'CPS Basic Round Neck Tee','size':['S','M','L'],'pic':'CPS/แขนสั้น/ผญ/cpsw1.jpg',sex:'F',type:'CPS',color:['white','black','grey','red']},
	       		{'id':2,'price': 690,'name': 'CPS Basic Symbolic','size':['M','L','XL'],'pic':'CPS/แขนยาว/cpssm1.jpg',sex:'M',type:'CPS',color:['darkgreen','black','white','peru']},
	       		{'id':3,'price': 100,'name': 'T-shirt สีพื้นแขนสั้น','size':['S','M','L','XL'],'pic':'Tshirt/แขนสั้น/t1.jpg',sex:'U',type:'Tshirt',color:['darkviolet','grey','red','lime','yellow','pink','black','white']},
	       		{'id':4,'price': 150,'name': 'T-shirt สีพื้นแขนยาว','size':['S','M','L','XL'],'pic':'Tshirt/แขนยาว/ttm1.jpg',sex:'U',type:'Tshirt',color:['darkviolet','grey','red','lime','yellow','pink','black','white']},
	       		{'id':5,'price': 560,'name': 'Basic Navy Dress','size':['M','L','XL'],'pic':'Senyes/dress/dr1.jpg',sex:'F',type:'Senyes',color:['blackandwhite']},
	       		{'id':6,'price': 490,'name': 'เสื้อ Polo Black','size':['M','L','XL','XXL'],'pic':'Senyes/polo/polom1.jpg',sex:'U',type:'Senyes',color:['black']},
	       		{'id':7,'price': 180,'name': 'เสื้อ Bohemian','size':['M'],'pic':'Bohemian/b1.jpg',sex:'F',type:'Bohemian',color:['grey','red','lightpink','lightskyblue']},
	       		{'id':8,'price': 190,'name': 'เสื้อมัดย้อม ( tie dye shirt )','size':['S','M','L'],'pic':'TieDyeShirt/td1.jpg',sex:'U',type:'TieDyeShirt',color:['magenta','orangered','lightseagreen','darkviolet']}];
var Index=2;
var buyingitems=[];
var bIndex=0;
var costs = [{'id':0,'c':0}];
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
		item.pic = req.body.pic
		item.sex = req.body.sex
		item.color = req.body.color
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
		items[id].size = req.body.size
		items[id].pic = req.body.pic
		items[id].sex = req.body.sex
		items[id].color = req.body.color
        res.json({ message: 'item updated!' });        
     })

       .delete (function(req,res) {
	var id = req.params.item_id
	delete 	items[id]
      	  res.json({ message: 'item deleted!' });        
    })


router.route('/costs') 
     // get all the items (accessed at GET http://localhost:8000/api/items)
    .get(function(req, res) {    	
    	res.json(costs);
    })

// get a single cost
router.route('/costs/:cost_id')
	.get (function(req,res) {
    	res.json(costs[req.params.cost_id])
    })

	.put (function(req,res) {
		var id = req.params.cost_id		
		costs[id].c = req.body.c;
        res.json({ message: 'cost updated!' });        
     })
router.route('/buyingitems') 
     // get all the items (accessed at GET http://localhost:8000/api/items)
    .get(function(req, res) {    	
    	res.json(buyingitems);
    })

    // insert a new item
	.post(function(req, res) { 
		var buyingitem = {}; 		 
		buyingitem.id = bIndex++;
		buyingitem.price = req.body.price
		buyingitem.name = req.body.name	
		buyingitem.size = req.body.size
		buyingitem.pic = req.body.pic
		buyingitem.sex = req.body.sex
		buyingitem.type = req.body.type
		buyingitem.color = req.body.color
		buyingitems.push(buyingitem); 
		res.json( {message: 'buyingitem created!'} )
	}) 

// get a single item
router.route('/buyingitems/:buyingitem_id')
	.get (function(req,res) {
    	res.json(items[req.params.buyingitem_id])
    })
       .delete (function(req,res) {
	var id = req.params.buyingitem_id
	delete 	buyingitems[id]
      	  res.json({ message: 'buyingitems deleted!' });        
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
