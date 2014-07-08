
var http = require('http'),
	request = require('request');

var keys = require('./keys'),
	utils = require('./utils');

var Yo = function(options){

	if(!(this instanceof Yo)){
		return new Yo(options);
	}

	if(!('api_token' in options)){
		throw new Error('Error: No API token specified.');
	}

	this.options = utils.merge(options, keys.urls);

};

Yo.VERSION = JSON.parse(require('fs').readFileSync('./package.json')).version;
module.exports = Yo;

Yo.prototype.post = function(url, params, callback){
	
	if(params instanceof Function){
		callback = params;
		params = {};
	}

	if(!(callback instanceof Function)){
		throw new Error('Fail: Invalid callback.');
		return this;
	}

	if(url.charAt(0) === '/'){
		url = this.options.rest_base + url;
	}

	request({
		'method': 'POST',
		'url': url,
		'json': true,
		'form': utils.merge(params, {
			'api_token': this.options.api_token
		})
	}, function(error, response, data){
		if(error && error.statusCode){
			var err = new Error('HTTP Error '
				+ error.statusCode + ': '
				+ http.STATUS_CODES[error.statusCode]);
			err.statusCode = error.statusCode;
			err.data = error.data;
			callback(err);
		}else if(error){
			callback(error);
		}else{
			callback(null, data);
		}
		return this;
	});

};

Yo.prototype.yoAll = function(callback){
	var url = '/yoall/';
	this.post(url, callback);
	return this;
};

Yo.prototype.yo = function(username, callback){
  var url = '/yo/';
  this.post(url, {username:username}, callback);
  return this;
};
