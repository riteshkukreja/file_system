var FS = function(user) {
	var root = new Directory("Root", [], new Permission("rw-rw-rw-"));
	root.path = "/";

	var pwd = root;
	var RecycleBin = false;

	var USER = user;

	var throwEvent = function() {
		var event = new CustomEvent("reload", {
			detail: {
				time: new Date(),
			},
			bubbles: true,
			cancelable: true
		});
		document.dispatchEvent(event);
	}

	/**
	 *	Parsing the URL with respect to present working directory URL
	 *	@Param path 	- Destination URL
	 *	@Param cpath	- Source URL
	 */
	 this.parseURL = function(path, cpath) {
	 	var stack = new Stack();

	 	var array = cpath.split("/");
	 	for(var i of array) {
	 		if(i != "")
	 			stack.push(i);
	 	}

	 	array = path.split("/");
	 	for(var i of array) {
	 		switch(i) {
	 			case "..": 	var flag = stack.pop();
	 			if(!flag) return false;
	 			break;
	 			case ".": 	
	 			case "" :
	 			case " ": 	break;

	 			default: 	stack.push(i);
	 		}
	 	}

	 	return stack;
	 }

	 this.navigate = function(path) {
	 	if(path == "/") {
	 		pwd = root;
	 		return pwd;
	 	}

	 	var stack = this.parseURL(path, pwd.path);

	 	if(stack == false) return false;

		// convert stack data to array
		path = [];
		while(!stack.empty()) path.push(stack.pop());
		
		// Traverse the tree
		pwd = root;

		for(var i = path.length-1; i >= 0; i--) {
			var child = pwd.search(path[i], USER);
			if(child) pwd = child;
			else return false;
		}
		throwEvent();

		return pwd;
	}

	this.get = function() {
		return pwd.get(USER);
	}

	this.push = function(file) {
		b = pwd.push(file, USER);
		throwEvent();
		return b;
	}

	this.pop = function(file) {
		b = pwd.pop(file, RecycleBin, USER);
		throwEvent();
		return b;
	}

	this.getCount = function() {
		return pwd.getCount(USER);
	}

	this.getSize = function() {
		return pwd.getSize(USER);
	}

	this.parent = function() {
		return pwd.getParent(USER);
	}

	this.search = function(filename) {
		return pwd.search(filename, USER);
	}

	this.getName = function() {
		return pwd.getName(USER);
	}

	this.rename = function(filename) {
		return pwd.rename(filename, USER);
	}

	this.elevate = function(pass) {
		return USER.elevate(pass);
	}

	this.logoff = function() {
		return USER.logoff();
	}

	this.chmod = function(perms) {
		return pwd.chmod(perms, USER);
	}

	this.pwd = function() {
		return pwd.path;
	}

	var self = this;
	var init = function() {
		var DriveC 		= new Directory("C", [], new Permission("rw-rw-rw-"));
		
		RecycleBin 		= new Directory("Recycle Bin", [], new Permission("rw-rw-rw-"));

		self.push(DriveC);
		self.push(RecycleBin);
	}

	init();
}