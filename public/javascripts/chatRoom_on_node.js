/**
 * User: Ken
 * Date: 12/03/2013
 * Time: 13:42
 */
$(document).ready(onDOMReady);
var sess;
var PORT = "3000"
function onDOMReady(){

    // connect to WAMP server
    // 8080 is running on php wamp server
    // 3000 is running on node.js wamp server
    ab.connect("ws://localhost:" + PORT,

        // WAMP session was established
        function (session) {

            // things to do once the session has been established
            sess = session;
            console.log("Connected!");

            sess.prefix("event", "http://localhost:" + PORT + "/events/myevents");
            sess.subscribe("event:firstevent", onEvent);
            sess.subscribe("event:firstevent", onEvent1); // the same topic would not sent twice by Autobohn.js,
            sess.subscribe("event:firstevent", onEvent2); // but it will regiter different callback
//            sess.subscribe("http://localhost:" + PORT + "/events/myevents/firstevent", onEvent);
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
function onEvent1(topicUri, event) {
    console.log('This is a callback from onEvent1');
}
function onEvent2(topicUri, event) {
    console.log('This is a callback from onEvent2');
}
function publishEvent(){
    var excludeMe = true;
    sess.publish("event:firstevent", getMessage() || "", excludeMe);
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