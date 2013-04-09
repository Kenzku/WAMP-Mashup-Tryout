WAMP-Tryout
===========

This tryout demonstrates a WAMP client-server example , running Ratchet WAMP Sever and Node.js Webserver, using Autobohn.js on Client Side

**The application is still under development** and it does not work yet.

## Build the app

To sreve the application you need a server running Node.js with NPM installed. Step to get the web server running:

    cd WAMP-Tryout
    npm install
    node wamp.js

```wamp.js``` itself acts as a webserver and WAMP server.

Or, you can also use Ratchet WAMP server:
    
    cd WAMP-server/
    composer install
    cd WAMP-Server/bin
    php pubsub-server.php

##License

The end user license agreement for any file posted on Watke/WebSocket-Tryout conforms to the Code Project Open License Agreement. You may obtain a copy of the License at

    http://www.codeproject.com/info/EULA.aspx
