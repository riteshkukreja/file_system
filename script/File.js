var File = function(name, size, type, perms, url) {
	this.name 		= name;
	this.size 		= size;
	this.type 		= type;
	this.path 		= false;
	this.parent 	= false;

	var URL 		= "data/" + url;
	var permissions = perms;

	var self = this;

	this.rename = function(name, type, user) {
		if(!permissions.validate(permissions.WRITE, user)) return false;
		this.name = name;
		this.type = type;
	}

	this.setParent = function(folder, user) {
		//if(!permissions.validate(permissions.WRITE, user)) return false;
		this.parent = folder;
		this.path = this.parent.path + this.name;
		return true;
	}

	this.getSize = function(user) {
		if(!permissions.validate(permissions.READ, user)) return false;
		return this.size;
	}

	this.getName = function(user) {
		if(!permissions.validate(permissions.READ, user)) return false;
		return this.name;
	}

	this.chmod = function(perms, user) {
		if(!permissions.validate(permissions.WRITE, user)) return false;
		permissions = perms;
	}

	this.get = function() {
		return URL;
	}
}