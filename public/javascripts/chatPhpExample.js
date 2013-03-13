/**
 * User: Ken
 * Date: 06/03/2013
 * Time: 11:22
 * To change this template use File | Settings | File Templates.
 */
var conn = new WebSocket('ws://localhost:8080');
conn.onopen = function(e) {
    console.log("Connection established!");
};

conn.onmessage = function(e) {
    console.log(e.data);
};
conn.send('Hello World!');