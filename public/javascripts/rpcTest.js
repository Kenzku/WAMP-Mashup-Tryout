/**
 * User: Ken
 * Date: 03/04/2013
 * Time: 14:24
 */
module( "Setup" );
asyncTest("RPC - onload", function() {
    setTimeout(function(){
        equal(sess instanceof ab.Session,true);
        equal(sess._websocket.protocol,"wamp");
        start();
    }, 2000);
});
//test("RPC - run", function() {
//    $('button').triggerHandler('click');
//});
