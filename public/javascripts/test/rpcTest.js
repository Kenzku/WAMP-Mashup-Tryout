/**
 * User: Ken
 * Date: 03/04/2013
 * Time: 14:24
 */
module( "Setup" );
asyncTest("RPC - onload", 2,function() {
    setTimeout(function(){
        equal(sess instanceof ab.Session,true);
        equal(sess._websocket.protocol,"wamp");
        start();
    }, 2000);
});
asyncTest("RPC - trigger 'run' UI click event", 4, function() {
    setTimeout(function(){
        $('button').triggerHandler('click');

//        // RPC success callback for then in When.js
//        function thenSuccessCB(result, expect, type){
//
//            switch (type){
//                case 'deepEqual':
//                    deepEqual(result, expect);
//                    break;
//                default :
//                    equal(result, expect);
//                    break;
//            }
//        }
//
//        sess.call("calc:square", 23).then(
//            // RPC success callback
//            function (res){
//                thenSuccessCB(res, 529);
//            }
//        );
//
//        sess.call("http://lovcalhost" + PORT + "/simple/calc#add", 23, 7).then(
//            // RPC success callback
//            function (res){
//                thenSuccessCB(res, 30);
//            }
//        );
//
//        sess.call("calc:sum", [1, 2, 3, 4, 5]).then(
//            // RPC success callback
//            function (res){
//                thenSuccessCB(res, 15);
//            }
//        );
//
//        sess.call("calc:string",{'name':'Lauri','age':'17'}).then(
//            function (res){
//                thenSuccessCB(res, {"name":"Salla","age":16,"you":"I am Lauri and I am 17 years old"},'deepEqual');
//                start();
//            }
//        );
    }, 2000);
});
