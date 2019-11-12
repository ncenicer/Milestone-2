// Bringing in the http and filesystem libraries
const http = require('http')
const filesys = require('fs')
// Setting our local port as 8080
const port = 8080

// Creating the request handler for handling requests made to the server
const requestHandler = function (request, response)
{
	console.log(request.url);
	var filename = "";
	
	if(request.url.length > 1)					// used when a certain file is specified
	{
		filename = "."+request.url;
	}
	else
	{
		filename = "./index.html";		// the default page of our website
	}

	filesys.readFile(filename,
		function(error, file)					// file read error handler
		{
			if(error)
			{
				if(error.code === 'ENOENT')		// File not found error
				{
					response.writeHead(404);
					response.end(error.message);
				}
			
				console.log("Error reading " + filename)
				response.writeHead(500, error.message)		// Some other non-404 error
				return;
			}
		
			response.end(file)
		}
	)
}

// Creating our server using our request handler
const server = http.createServer(requestHandler)	
server.listen(port, function (err)
	{
		if(err)
		{
			return console.log('ERROR: Something bad happened.', err)
		}		
		console.log('Server is listening on {'+port+'}')
	}
)
