var Permission = function(perms) {

	var permissions = {
		user: perms.substr(0, 3),
		group: perms.substr(3, 3),
		others: perms.substr(6, 3)
	};


	this.READ 		= 'r';
	this.WRITE 		= 'w';
	this.EXECUTE 	= 'x';

	var self = this;
	this.validate = function(op, user) {
		if(typeof user == "undefined" || typeof user.permClass == "undefined" || typeof permissions[user.permClass] == "undefined") return false;
		if(user.isAdmin() || permissions[user.permClass].indexOf(op) != -1) return true;
		return false;
	}
}