/**
 * User: Ken
 * Date: 28/02/2013
 * Time: 11:50
 * Creator: Nico Kaiser <nico@kaiser.me>
 */

// for testing subscription
// i.e. when a client on http://localhost:3000/chatroom_on_node
// subscribe event:firstevent
// you can use postman send a post to localhost:3000/hub
// the clien should receive a message.
var qs = require('querystring');

exports.show = function(req, res){
    console.log("This is WAMP:");
    console.log(req.wamp);
    console.log("-------------------------------------------");
    var wamp = req.wamp;
    var buffer = '';

    req.on('data', function(data) {
        buffer += data;
    });
    req.on('end', function() {
        var topicUri, event;

        try {
            var parsed = qs.parse(buffer);
            console.log(parsed);
            topicUri = parsed.topicuri;
            event = JSON.parse(parsed.body);
        } catch (e) {
            console.log(e);
            res.writeHead(400);
            res.end('invalid JSON in request body. ' +
                'Accpet: topicuri=http://example.com/simple&body={"event":"helleo"}' +
                'Or the event to be published must be URI encoded in the POST body, ' +
                'like "topicUri=...&body=Hello+World"');
            return;
        }
        wamp.publish(topicUri, event);
        res.writeHead(202);
        res.end();
    });

    req.on('close', function() {
        buffer = '';
        res.send("closed");
    });
};