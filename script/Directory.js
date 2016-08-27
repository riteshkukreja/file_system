/**
 *	DIRECTORY JS
 *	Description:
 *				Defines the structure and operation of a simple Directory/Folder inside the File System
 *				Contains other directories and/or files
 *				All operation permissions are based on Permission JS
 *
 *	Author: 	RITESH KUKREJA
 * 	Website: 	riteshkukreja.wordpress.com
 *
 */


/**
 *	Directory Constructor
 *	@Param name 	- name assigned to directory 
 *	@Param childs	- list of children
 *	@Param perms 	- Permission Object of directory
 */
var Directory = function(name, childs, perms) {

	/**
	 *	Global Vars
	 *	
	 *	@Param path		- Path of directory in FS tree
	 *	@Param parent 	- Parent Directory Object
	 */
	this.name 		= name;
	this.path 		= false;
	this.children 	= childs;
	this.parent 	= false;

	/**
	 *	Permission Object of the Directory
	 */
	var permissions = perms;

	var self = this;

	/**
	 *	Add a child Directory or File to the current Directory child list
	 *	Requires WRITE Permission
	 *
	 *	@Param file 	- Directory/File Object
	 *	@Param user		- Current User Object
	 */
	this.push = function(file, user) {
		if(!permissions.validate(permissions.WRITE, user)) return false;
		if(!file.setParent(self, user)) return false;
		this.children.push(file);
		return true;
	}

	/**
	 *	Set the parent directory object of the current directory
	 *	
	 *	@Param folder 	- Parent Directory Object
	 *	@Param user		- Current User Object
	 */
	this.setParent = function(folder, user) {
		//if(!permissions.validate(permissions.WRITE, user)) return false;
		this.parent = folder;
		this.path = this.parent.path + this.name + "/";
		return true;
	}

	/**
	 *	Removes a child file / directory from the current Directory
	 * 	Requires WRITE Permission
	 *
	 *	@Param file 		- Child File/Directory Object
	 *	@Param RecycleBin	- Special Directory Object to store deleted files/directories
	 *	@Param user			- Current User Object
	 */
	this.pop = function(file, RecycleBin, user) {
		if(!permissions.validate(permissions.WRITE, user)) return false;

		file = self.search(file, user);
		if(!file) return false;

		if(self != RecycleBin)
			RecycleBin.push(file, user);
		
		this.children.splice(this.children.indexOf(file), 1);
	}

	/**
	 *	Retrieve all the children of the current directory (equals to 'ls' in LINUX)
	 *	Requires READ Permission
	 *
	 *	@Param user		- Current User Object
	 */
	this.get = function(user) {
		if(!permissions.validate(permissions.READ, user)) return false;
		return this.children;
	}

	/**
	 *	Search a child file/directory by name (exact name yet!)
	 *	Possible alternation - Include Wildcards
	 *	Requires READ Permission
	 *
	 *	@Param filename 	- Name of the file/directory (case sensitive)
	 *	@Param user			- Current User Object
	 */
	this.search = function(filename, user) {
		if(!permissions.validate(permissions.READ, user)) return false;
		for(var i of this.children) {
			if(i.name == filename)
				return i;
		}
		return false;
	}

	/**
	 *	Returns Total children count of current directory
	 *	Requires READ Permission
	 *
	 *	@Param user		- Current User Object
	 */
	this.getCount = function(user) {
		if(!permissions.validate(permissions.READ, user)) return false;
		return this.children.length;
	}

	/**
	 *	Returns the size of all the children inside the Tree
	 *	Requires READ Permission
	 *
	 *	@Param user		- Current User Object
	 */
	this.getSize = function(user) {
		if(!permissions.validate(permissions.READ, user)) return false;
		var size = 0;

		for(var i of this.children)
			size += i.getSize(user);

		return size;
	}

	/**
	 *	Returns the Parent Directory Object
	 *	Requires READ Permission
	 *
	 *	@Param user		- Current User Object
	 */
	this.getParent = function(user) {
		if(!permissions.validate(permissions.READ, user)) return false;
		return this.parent;
	}

	/**
	 *	Rename the Directory Object
	 *	Requires WRITE Permission
	 *
	 *	@Param filename 	- The new file name for the Directory Object
	 *	@Param user 		- Current User Object
	 */
	this.rename = function(filename, user) {
		if(!permissions.validate(permissions.WRITE, user)) return false;
		return this.name = filename;
	}

	/**
	 *	Returns the name of Directory Object
	 *	Requires READ Permission
	 *
	 *	@Param user		- Current User Object
	 */
	this.getName = function(user) {
		if(!permissions.validate(permissions.READ, user)) return false;
		return name;
	}

	/**
	 *	Change the Permission Object assigned to the Directory Object
	 *	Requires WRITE Permission
	 *
	 *	@Param perms 		- New Permission Object
	 *	@Param user 		- Current User Object
	 */
	this.chmod = function(perms, user) {
		if(!permissions.validate(permissions.WRITE, user)) return false;
		permissions = perms;
	}
}