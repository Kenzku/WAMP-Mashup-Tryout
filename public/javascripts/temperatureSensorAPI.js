/**
 * User: Ken
 * Date: 05/04/2013
 * Time: 10:14
 */
var sess;
var PORT = "3000";
window.onload = init;

function init (){
    // connect to WAMP server
    ab.connect("ws://localhost:" + PORT,

        // WAMP session was established
        function (session) {
            // {{ab.Session}} things to do once the session has been established
            sess = session;
            console.log("Connected!");
            // establish a prefix, so we can abbreviate procedure URIs ..
            session.prefix("sensor", "http://localhost" + PORT + "/sensor#");
        },

        // WAMP session is gone: failure, closing, or brake-off
        function (code, reason) {

            // things to do once the session fails
            sess = null;
            console.log(reason);
        }
    );
}

function initSensor(type,config,callback) {
    var args = config && typeof config == 'object' ?
        [type,config] :
        [type];

    if (callback && typeof callback === 'function'){
        successCB.callback = callback;
    }
    sess.call('sensor:init',args).then(successCB);

    // RPC success callback
    function successCB (res){
        successCB.callback(res);
    }
}

function resetSensor(callback) {
    if (callback && typeof callback === 'function'){
        successCB.callback = callback;
    }
    sess.call('sensor:reset').then(successCB);

    // RPC success callback
    function successCB (res){
        successCB.callback(res);
    }
}

