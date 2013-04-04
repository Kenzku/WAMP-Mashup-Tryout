/**
 * User: Ken
 * Date: 14/03/2013
 * Time: 15:17
 */
// WAMP session object
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
            session.prefix("calc", "http://localhost" + PORT + "/simple/calc#");
        },

        // WAMP session is gone: failure, closing, or brake-off
        function (code, reason) {

            // things to do once the session fails
            sess = null;
            console.log(reason);
        }
    );
}

function run()
{
    // Note: arg will become an array like Object (JSON)
    // call a function and log result on success
//    sess.call("calc:square", 23).then(ab.log); // [23]
    sess.call("calc:square", 23).then(
        // RPC success callback
        function(result){
            square = result;
        }
    );
    // call a function with multiple arguments
    sess.call("calc:add", 23, 7).then(ab.log); // [23, 7]

    // call a function with list of numbers as arg
    sess.call("calc:sum", [1, 2, 3, 4, 5]).then(ab.log); // [ [1,2,3,4,5] ]

    // call a function with a JSON as arg
    sess.call("calc:string",{'name':'Lauri','age':'17'}).then(ab.log); // [ {'name':'Lauri','age':'17'} ]
}