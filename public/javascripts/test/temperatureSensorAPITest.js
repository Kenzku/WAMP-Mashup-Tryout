/**
 * User: Ken
 * Date: 05/04/2013
 * Time: 10:19
 */
module('Temperature Sensor on Client-side',{
    setup : function (){

    }
});
asyncTest('init a sensor - without configuration',function(){
    var configInSensor = {
        sensorType: "temperature",
        sensorID: "",
        returnable: true,
        timeout: 100.0,
        rate: 50.0,
        eventFireMode: "fixedinterval",
        position: {latitude:0.0,longitude:0.0},
        maximumRange : null,
        minDelay : null,
        power : null,
        resolution : null,
        vendor : null,
        version : null,

        type : 'sensor',
        cancelable: false
    };

    function successCB(result){
        deepEqual(result,configInSensor);
        start();
    }

    setTimeout(function(){
        initSensor('temperature',null,successCB);
    },2000);

});