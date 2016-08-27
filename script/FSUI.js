var FSUI = function(fs, user) {

	var self = this;

	var buildFolder = function(name) {
		var div = document.createElement("div");
		div.className = "directory";
		div.setAttribute("data-type", 2);
		div.setAttribute("data-content", name);

		var img = document.createElement("img");
		img.src = "assets/folder.png";

		var span = document.createElement("span");
		span.innerHTML = name;

		div.appendChild(img);
		div.appendChild(span);

		document.body.appendChild(div);

		div.onclick = function(e) {
			fs.navigate(div.getAttribute("data-content"));
			self.build(new Tree(fs, user));
		}
	}

	var buildFile = function(name) {
		var div = document.createElement("div");
		div.className = "file";
		div.setAttribute("data-type", 1);

		var img = document.createElement("img");
		img.src = "assets/text-file.png";

		var span = document.createElement("span");
		span.innerHTML = name;

		div.appendChild(img);
		div.appendChild(span);

		document.body.appendChild(div);

		div.onclick = function(e) {
		}
	}

	var buildLink = function(name, target) {
		var div = document.createElement("div");
		div.className = "link";
		div.setAttribute("data-type", 2);
		div.setAttribute("data-content", target);

		var img = document.createElement("img");
		img.src = "assets/folder.png";

		var span = document.createElement("span");
		span.innerHTML = name;

		div.appendChild(img);
		div.appendChild(span);

		document.body.appendChild(div);

		div.onclick = function(e) {
			fs.navigate(div.getAttribute("data-content"));
			self.build(new Tree(fs, user));
		}
	}

	var buildPath = function() {
		var p = document.createElement("p");
		p.innerHTML = "path: " + fs.pwd();

		document.body.appendChild(p);
	}

	var buildControls = function() {
		var holder = document.createElement("div");
		document.body.appendChild(holder);

		// new file control
		var c = document.createElement("i");
		c.innerHTML = "file";
		c.className = "new";
		holder.appendChild(c);
		c.onclick = function() {
			var name = prompt("Enter File Name : ");
			fs.push(new File(name, 1024, "TXT", new Permission("r--r--r--"), name));
		}

		// new folder control
		var c = document.createElement("i");
		c.innerHTML = "directory";
		c.className = "new";
		holder.appendChild(c);
		c.onclick = function() {
			var name = prompt("Enter Directory Name : ");
			fs.push(new Directory(name, [], new Permission("rw-rw-rw-")));
		}

		// delete control
		var c = document.createElement("i");
		c.innerHTML = "delete";
		c.className = "del";
		holder.appendChild(c);
		c.onclick = function() {
			var name = prompt("Enter Name : ");
			fs.pop(name);
		}
	}

	this.build = function(tree) {
		var holder = document.body;
		holder.innerHTML = "";

		buildPath();
		buildControls();	

		if(fs.pwd() != "/")
			buildLink("back", "..");

		for(var stub of tree.child) {
			if(typeof stub.child == "undefined") {
				// file
				buildFile(stub.name);
			} else {
				// folder
				buildFolder(stub.name);
			}
		}
	}
}