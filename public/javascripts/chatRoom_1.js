/**
 * User: Ken
 * Date: 12/03/2013
 * Time: 13:42
 */
/**
 * User: Ken
 * Date: 12/03/2013
 * Time: 10:04
 */
$(document).ready(onDOMReady);
var sess;
function onDOMReady(){

    // connect to WAMP server
    ab.connect("ws://localhost:8080",

        // WAMP session was established
        function (session) {

            // things to do once the session has been established
            sess = session;
            console.log("Connected!");

//            sess.prefix("event", "http://localhost:8080/events/myevents");
            sess.subscribe("http://localhost:8080/events/myevents/firstevent", onEvent);
        },

        // WAMP session is gone
        function (code, reason) {

            // things to do once the session fails
        }
    );

    // send function
    $(document).on('click','#send',function(){
        publishEvent();
    });

}
// Event Message sent by the server
function onEvent(topicUri, event) {
    console.log(topicUri);
    console.log(event);
    appendMessage(event);
}

function publishEvent(){
    var excludeMe = false;
    sess.publish("http://localhost:8080/events/myevents/firstevent", getMessage() || "", excludeMe);
}

function appendMessage(event){
    // event: ["message", "513f0546aaac6", "1234568", "Anonymous 43", "2013-03-12T11:36:56+01:00"]
    if (isMessage(event)){
        var name = event[3] || 'anonymous XX';
        var msg = event[2] || '';
        var o = {};
        o.name = name;
        o.msg = msg;
    }else{
        var name = event[2] || 'anonymous XX';
        var o = {};
        o.name = name;
        if (isJoined(event)){
            o.msg = 'join the room!';
        }else{
            o.msg = 'left the room!';
        }
    }
    var msgHtml = new EJS({url: '/templates/message.ejs'}).render({data:o});
    $('#messageWrap').append(msgHtml);
}

function isMessage(event){
    return event[0] == "message";
}

function isJoined(event){
    return event[0] == "joinRoom";
}

function getMessage(){
    return $('#message').val();
}