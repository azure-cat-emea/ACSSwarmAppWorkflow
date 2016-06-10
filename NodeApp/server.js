var http = require("http")
var fs = require('fs');
var path = require('path');

http.createServer(function (req, res) {
   
    var filePath = '.' + req.url;
    
    if (filePath == './')
    {
        var response = "<H1>Simple NodeJS App on Docker and Azure Container Service - v1.0</H1>\r\r\r";    

        response = response + "<H2>Node IP Address: " + getServerIp() + "</H2>\r\r"; 
        
        response = response + "<H2>Host Name      : " + getHostName() + "</H2>\r\r";    

        response = response +  "<img src='/img/image.png' />\r\r"; 
        
        res.end(response)
    }
    else
    {

        var extname = path.extname(filePath);
        var contentType = 'text/html';
        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;      
            case '.jpg':
                contentType = 'image/jpg';
                break;
            case '.wav':
                contentType = 'audio/wav';
                break;
        }

        fs.readFile(filePath, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT'){
                    fs.readFile('./404.html', function(error, content) {
                        res.writeHead(200, { 'Content-Type': contentType });
                        res.end(content, 'utf-8');
                    });
                }
                else {
                    res.writeHead(500);
                    res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    res.end(); 
                }
            }
            else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }

}).listen(8000)



function getServerIp() {
var
    // Local ip address that we're trying to calculate
    address
    // Provides a few basic operating-system related utility functions (built-in)
    ,os = require('os')
    // Network interfaces
    ,ifaces = os.networkInterfaces();


// Iterate over interfaces ...
for (var dev in ifaces) {

    // ... and find the one that matches the criteria
    var iface = ifaces[dev].filter(function(details) {
        return details.family === 'IPv4' && details.internal === false;
    });

    if(iface.length > 0) address = iface[0].address;
}

 return address;
}

function getHostName()
{
    var os = require('os');
    var hostName = os.hostname();
    
    return hostName;
}
