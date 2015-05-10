var Class = function Class(obj, parent) {
	var result;
	if(obj.hasOwnProperty('initialize')) {
		result = obj.initialize;
	} else {
		result = function() {};
	}

	if(parent != null) {
		result.prototype = new parent();
		result.prototype.constructor = result;
		result.__super__ = parent;
		var cur_class = result;
		result.prototype['super'] = function() {
			cur_class = cur_class.__super__;
			var temp = cur_class.prototype[arguments[0]].apply(this, [].slice.call(arguments, 1));
			cur_class = result;
			return temp;
		};

		if(parent.hasOwnProperty('_super')) {
			result.prototype._super = (function() {
				return function() {
					var tmp = this._super;
					this._super = this.prototype._super;
					var ret = this._super.apply(this, arguments);
					this._super = tmp;
					return ret;
				}
			})();
		} else {
			result.prototype._super = function() {
				return result.prototype[arguments[0]].apply(this, [].slice.call(arguments, 1));
			}
		}
	} else {
		result.__super__ = Object;
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