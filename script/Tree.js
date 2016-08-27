var Tree = function(directory, user) {
	this.name = directory.getName(user);
	this.child = [];
	this.size = directory.getSize(user) || undefined;

	if(typeof directory.size == "undefined") {
		for(var i of directory.get(user))
			this.child.push(new Tree(i, user));
	} else this.child = undefined;
}