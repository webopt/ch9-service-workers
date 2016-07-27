var express = require("express"), // Imports the express package
	https = require("https"), // Imports the https package
	compression = require("compression"), // Imports the compression middleware
	fs = require("fs"), // The file system module for reading files (part of Node core)
	path = require("path"), // The path module for working with files and directory paths (also part of Node core)
	app = express(), // An Express instance
	pubDir = "./htdocs"; // The web root directory

app.use(compression()); // Tell Express to use the shrink-ray compression middleware
app.use(express.static(path.join(__dirname, pubDir))); // Tell Express to serve static files from the htdocs directory

https.createServer({ // Creates an instance of an HTTPS sever
	key: fs.readFileSync("crt/localhost.key"), // Reads in the key file
	cert: fs.readFileSync("crt/localhost.crt") // Reads in the SSL certificate
}, app).listen(8443); // Passes in our Express instance and instructs the server to run on port 8443