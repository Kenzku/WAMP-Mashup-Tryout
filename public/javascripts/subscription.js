/**
 * User: Ken
 * Date: 04/03/2013
 * Time: 13:37
 */
// WAMP session object
var sess;
var wsuri = "ws://localhost:3000"; // on test server: wstest -d -m wampserver -w ws://localhost:9000

window.onload = function() {

    // connect to WAMP server
    ab.connect(wsuri,

        // WAMP session was established
        function (session) {

            sess = session;
            console.log("Connected to " + wsuri);

// subscribe to topic, providing an event handler
//            sess.subscribe("http://example.com/simple", onEvent);
},

// WAMP session is gone
function (code, reason) {

    sess = null;
    console.log("Connection lost (" + reason + ")");
}
);
};

function onEvent(topic, event) {
    console.log(topic);
    console.log(event);
}

function publishEvent()
{
//    sess.publish("http://localhost:8080/simple", {a: "foo", b: "bar", c: 23}); // there is a bit problem to handle JSON in php current on the server side
    sess.publish("http://localhost:8080/simple", "hello event");
}

function subscibeEvent(){
    sess.subscribe("http://localhost:8080/simple",onEvent);
}