window.onload = function() {
	var user = new User("Ritesh", "user");
	var fs = new FS(user);
	var fsd = new FSUI(fs, user);
	fsd.build(new Tree(fs, user));

	document.addEventListener("reload", function() {
		fsd.build(new Tree(fs, user));
	}, false);
}