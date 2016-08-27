var Stack = function() {
	var data = [];

	this.push = function(file) {
		data.push(file);
	}

	this.pop = function() {
		if(this.length() == 0) return false;

		return data.pop();
	}

	this.peek = function() {
		if(this.length() == 0) return false;

		return data[this.length()-1];
	}

	this.length = function() {
		return data.length;
	}

	this.empty = function() {
		return this.length() == 0;
	}
}