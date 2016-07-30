var path = require("path"),
	express = require("express"),
	compression = require("compression"),
	mime = require("mime"),
	app = express(),
	pubDir = "htdocs";

// Run static server
app.use(compression());
app.use(express.static(path.join(__dirname, pubDir), {
	setHeaders: function(res, path){
		var fileType = mime.lookup(path);

		switch(fileType){
			case "text/html":
				res.setHeader("Cache-Control", "private, no-cache, max-age=" + (60*60));
			break;

			case "text/javascript":
			case "application/javascript":
			case "text/css":
				if(path.indexOf("/sw.js") !== -1){
					res.setHeader("Cache-Control", "no-cache");
				}
				else{
					res.setHeader("Cache-Control", "no-cache, public, max-age=" + (60*60*24*30));
				}
			break;

			case "image/png":
			case "image/jpeg":
			case "image/svg+xml":
				res.setHeader("Cache-Control", "public, max-age=" + (60*60*24*365));
			break;
		}
	}
}));

app.listen(8080);