/**
 * User: Ken
 * Date: 08/03/2013
 * Time: 16:01
 */
var sess;

window.onload = function() {

    // connect to WAMP server
    ab.connect("ws://localhost:8080",

        // WAMP session was established
        function (session) {

            // things to do once the session has been established
            sess = session;
            console.log("Connected!");
            sess.subscribe("http://localhost:8080/simple", onEvent);

            sess.prefix("event", "http://localhost:8080/events/myevents");
            sess.subscribe("event:firstevent", onEvent);
            sess.subscribe("event:secondevent", onEvent);
        },

        // WAMP session is gone
        function (code, reason) {

            // things to do once the session fails
        }
    );
};

function onEvent(topicUri, event) {
    console.log(topicUri);
    console.log(event);
}

function publishEvent()
{
    evt = {};

    evt.name = document.getElementById('form_message').value;
    evt.flag = document.getElementById('form_flag').checked;

    evt.num = 23;
    evt.created = new Date();
    evt.rand = Math.random();

    var excludeMe = false;

    if (document.getElementById('event1').checked) {
//        sess.publish("event:firstevent", evt, excludeMe);
        sess.publish("event:firstevent", "1234568", excludeMe);
    } else {
        sess.publish("event:secondevent", evt, excludeMe);
    }
}