var FSDisplay = function() {

	var self = this;

	var buildFolder = function(name, childCount) {
		var div = document.createElement("p");
		div.innerHTML = name;
		div.className = "directory";
		div.setAttribute("data-type", 2);
		div.setAttribute("data-content", name);

		var span = document.createElement("span");
		span.innerHTML = " - " + childCount + " entries"

		div.appendChild(span);

		document.body.appendChild(div);

		div.onclick = function(e) {
			fs.navigate(div.getAttribute("data-content"));
			self.build(new Tree(fs));
		}
	}

	var buildFile = function(name, size) {
		var div = document.createElement("p");
		div.innerHTML = name;
		div.className = "file";
		div.setAttribute("data-type", 1);

		var span = document.createElement("span");
		span.innerHTML = " - " + size + " bytes"

		div.appendChild(span);

		document.body.appendChild(div);

		div.onclick = function(e) {
		}
	}

	var buildLink = function(name, target) {
		var div = document.createElement("p");
		div.innerHTML = name;
		div.className = "directory";
		div.setAttribute("data-type", 2);
		div.setAttribute("data-content", target);


		document.body.appendChild(div);

		div.onclick = function(e) {
			fs.navigate(div.getAttribute("data-content"));
			self.build(new Tree(fs));
		}
	}

	this.build = function(tree) {
		var holder = document.body;
		holder.innerHTML = "";

		buildLink("...", "..");

		for(var stub of tree.child) {
			if(typeof stub.child == "undefined") {
				// file
				buildFile(stub.name, stub.size);
			} else {
				// folder
				buildFolder(stub.name, stub.child.length);
			}
		}
	}
}