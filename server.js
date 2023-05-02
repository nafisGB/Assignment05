const http = require('http');
const fs = require('fs');
const path = require('path');

// Set the directory for serving static files
const publicDirectoryPath = path.join(__dirname, 'public');

// Create the server
const server = http.createServer((req, res) => {
  // Get the file path based on the requested URL
  const filePath = path.join(publicDirectoryPath, req.url === '/' ? 'index.html' : req.url);

  // Get the file extension of the requested file
  const fileExtension = path.extname(filePath);

  // Define the allowed file types
  const allowedFileTypes = ['.html', '.css', '.js'];

  // Check if the file extension is allowed
  if (!allowedFileTypes.includes(fileExtension)) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad Request');
  }

  // Read the file and return its content
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // If the file is not found, return a 404 error
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        // If there's any other error, return a 500 error
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
      }
    } else {
      // If the file is found, return its content and set the content type header
      res.writeHead(200, { 'Content-Type': getContentType(fileExtension) });
      res.end(content);
    }
  });
});

// Define a function to get the content type based on the file extension
function getContentType(fileExtension) {
  switch (fileExtension) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    default:
      return 'text/plain';
  }
}

// Start the server and listen on port 3000
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
