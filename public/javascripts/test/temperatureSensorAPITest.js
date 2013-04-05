/**
 * User: Ken
 * Date: 05/04/2013
 * Time: 10:19
 */
module('Temperature Sensor on Client-side',{
    setup : function (){

    }
});
//asyncTest('init a sensor - without configuration',function(){
//    var OriginalConfiguration = {
//        sensorType: "temperature",
//        sensorID: "",
//        returnable: true,
//        timeout: 100.0,
//        rate: 50.0,
//        eventFireMode: "fixedinterval",
//        position: {latitude:0.0,longitude:0.0},
//        maximumRange : null,
//        minDelay : null,
//        power : null,
//        resolution : null,
//        vendor : null,
//        version : null,
//
//        type : 'sensor',
//        cancelable: false
//    };
//
//    function successCB(result){
//        deepEqual(result,OriginalConfiguration);
//        start();
//    }
//
//    setTimeout(function(){
//        initSensor('temperature',null,successCB);
//    },2000);
//
//});
//
//asyncTest('init a sensor - with configuration',function(){
//    var configuration = {
//        sensorType: 'temperature',
//        sensorID:"12314213432432423154235",
//        returnable: false,
//        timeout:200.0,
//        rate:20.0,
//        eventFireMode:'valuechange',
//        position:{latitude:20.123412,longitude: 81.9023213},
//
//        maximumRange:10,
//        minDelay:40.0,
//        power:30.1,
//        resolution:55.00,
//        vendor:'Huawei',
//        version:1.0,
//
//        type : 'sensor',
//        cancelable: true
//    };
//
//    function successCB(result){
//        deepEqual(result,configuration);
//        start();
//    }
//
//    setTimeout(function(){
//        initSensor('temperature',configuration, successCB);
//    },2000);
//});

asyncTest('init a sensor - with configuration - reset sensor',function(){
    var configuration = {
        sensorType: 'temperature',
        sensorID:"12314213432432423154235",
        returnable: false,
        timeout:200.0,
        rate:20.0,
        eventFireMode:'valuechange',
        position:{latitude:20.123412,longitude: 81.9023213},

        maximumRange:10,
        minDelay:40.0,
        power:30.1,
        resolution:55.00,
        vendor:'Huawei',
        version:1.0,

        type : 'sensor',
        cancelable: true
    };

    var OriginalConfiguration = {
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

    function callbackOnConfiguration() { return 553; }

    function successCB(result){
        deepEqual(result, OriginalConfiguration);
        start();
    }

    setTimeout(function(){
        /* init a sensor with configuration */
        initSensor('temperature',configuration);
        /* reset the configuration */
        resetSensor(successCB);
    },2000);

});