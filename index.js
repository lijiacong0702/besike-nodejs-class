var Class = function Class(obj) {
	var result;
	if(obj.hasOwnProperty('initialize')) {
		result = obj.initialize;
	} else {
		result = function() {};
	}
	for(var attr in obj) {
		if(attr === 'initialize') {
			continue;
		}
		result.prototype[attr] = obj[attr];
	}
	return result;
};

module.exports = Class;