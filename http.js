var path = require("path"),
	express = require("express"),
	compression = require("compression"),
	app = express();

// Run static server
app.use(compression());
app.use(express.static(path.join(__dirname, "htdocs")));
app.listen(8080);