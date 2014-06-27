
var Yo = require('../');

var y = new Yo({
	'api_token': '****************************'
});

y.yoAll(function(err, data){
	if(err){
		console.error(err);
	}else{
		console.info(data);
	}
});