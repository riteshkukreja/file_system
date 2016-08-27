var User = function(name, permClass) {
	this.name = name;
	this.permClass = permClass;

	var ADMIN = false;
	var PASS = "";

	this.elevate = function(pass) {
		if(pass === PASS) ADMIN = true;
		else return false;
	}

	this.logoff = function() {
		ADMIN = false;
	}

	this.isAdmin = function() {
		return ADMIN == true;
	}
}