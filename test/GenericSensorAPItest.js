/**
 * User: Ken
 * Date: 02/04/2013
 * Time: 14:16
 */
var assert = require("assert");
var expect = require('chai').expect;
var GenericSensor = require('../sensor/GenericSensorAPI');
var Constant = require('../sensor/Constant');

suite("Generic Sensor");

test("GenericSensor - properties", function() {
    var aGenericSensor = new GenericSensor();

    assert.equal(aGenericSensor.sensorType, "");
    assert.equal(aGenericSensor.sensorID,"");
    assert.equal(aGenericSensor.returnable,true);
    assert.equal(aGenericSensor.timeout,100.0);
    assert.equal(aGenericSensor.rate, 50.0);
    assert.equal(aGenericSensor.eventFireMode,"fixedinterval");
    assert.deepEqual(aGenericSensor.position,{latitude:0.0,longitude:0.0});
});
test("GenericSensor - hardware properties", function() {
    var aGenericSensor = new GenericSensor();

    assert.deepEqual(aGenericSensor.maximumRange, null);
    assert.deepEqual(aGenericSensor.minDelay, null);
    assert.deepEqual(aGenericSensor.power, null);
    assert.deepEqual(aGenericSensor.resolution, null);
    assert.deepEqual(aGenericSensor.vendor, null);
    assert.deepEqual(aGenericSensor.version,null);
});

test("GenericSensor - hardware properties initialisation", function() {
    var aGenericSensor = new GenericSensor();

    initialiseHWProperty(aGenericSensor);
});

function initialiseHWProperty(aGenericSensor){
    var options = {
        maximumRange:10,
        minDelay:40.0
    }
    aGenericSensor.configureSensor(options);

    assert.deepEqual(aGenericSensor.maximumRange, 10);
    assert.deepEqual(aGenericSensor.minDelay, 40);
    assert.deepEqual(aGenericSensor.power, null);
    assert.deepEqual(aGenericSensor.resolution, null);
    assert.deepEqual(aGenericSensor.vendor, null);
    assert.deepEqual(aGenericSensor.version,null);

    var options = {
        power:30.1,
        resolution:55.00
    }
    aGenericSensor.configureSensor(options);

    assert.deepEqual(aGenericSensor.maximumRange, 10);
    assert.deepEqual(aGenericSensor.minDelay, 40);
    assert.deepEqual(aGenericSensor.power, 30.1);
    assert.deepEqual(aGenericSensor.resolution, 55.00);
    assert.deepEqual(aGenericSensor.vendor, null);
    assert.deepEqual(aGenericSensor.version,null);

    var options = {
        maximumRange : null,
        power:null,
        vendor:"Huawei",
        version:1.0
    }
    aGenericSensor.configureSensor(options);

    assert.deepEqual(aGenericSensor.maximumRange, null);
    assert.deepEqual(aGenericSensor.minDelay, 40);
    assert.deepEqual(aGenericSensor.power, null);
    assert.deepEqual(aGenericSensor.resolution, 55.00);
    assert.deepEqual(aGenericSensor.vendor, "Huawei");
    assert.deepEqual(aGenericSensor.version, 1.0);
}

test("GenericSensor - property initialisation", function() {
    var aGenericSensor = new GenericSensor();
    var options = {
        sensorType:"Temperature",
        sensorID:"12314213432432423154235",
        returnable: Constant.ReturnAble.false,
        timeout:200.0,
        rate:20.0,
        eventFireMode:Constant.EventFireMode.valueChange,
        position:{latitude:20.123412,longitude: 81.9023213}
    }
    aGenericSensor.configureSensor(options);

    assert.equal(aGenericSensor.sensorType, "Temperature");
    assert.equal(aGenericSensor.sensorID,"12314213432432423154235");
    assert.equal(aGenericSensor.returnable,false);
    assert.equal(aGenericSensor.timeout,200.0);
    assert.equal(aGenericSensor.rate, 20.0);
    assert.equal(aGenericSensor.eventFireMode,"valuechange");
    assert.deepEqual(aGenericSensor.position,{latitude:20.123412,longitude: 81.9023213});
});

test("GenericSensor - property mixture", function() {
    var aGenericSensor = new GenericSensor();
    var options = {
        sensorType:"Temperature",
        sensorID:"12314213432432423154235",
        returnable:Constant.ReturnAble.false,
        timeout:200.0,
        rate:20.0,
        eventFireMode:Constant.EventFireMode.valueChange,
        position:{latitude:20.123412,longitude: 81.9023213}
    }
    aGenericSensor.configureSensor(options);

    assert.equal(aGenericSensor.sensorType, "Temperature");
    assert.equal(aGenericSensor.sensorID,"12314213432432423154235");
    assert.equal(aGenericSensor.returnable,false);
    assert.equal(aGenericSensor.timeout,200.0);
    assert.equal(aGenericSensor.rate, 20.0);
    assert.equal(aGenericSensor.eventFireMode,"valuechange");
    assert.deepEqual(aGenericSensor.position,{latitude:20.123412,longitude: 81.9023213});

    assert.deepEqual(aGenericSensor.maximumRange, null);
    assert.deepEqual(aGenericSensor.minDelay, null);
    assert.deepEqual(aGenericSensor.power, null);
    assert.deepEqual(aGenericSensor.resolution, null);
    assert.deepEqual(aGenericSensor.vendor, null);
    assert.deepEqual(aGenericSensor.version,null);

    initialiseHWProperty(aGenericSensor);
});

suite( "Generic Sensor Event" );
test("GenericSensor.sensorEvent - property", function() {
    var aGenericSensor = new GenericSensor();

    var aSensorEvent = new aGenericSensor.sensorEvent();

    assert.equal(aSensorEvent.type, Constant.EventType.nothing);
    assert.equal(aSensorEvent.type, "nothing");
    assert.equal(aSensorEvent.eventFireMode,aGenericSensor.eventFireMode);
    assert.deepEqual(aSensorEvent.position,aGenericSensor.position);
    assert.deepEqual(aSensorEvent.sensorValue, {});
    assert.equal(aSensorEvent.cancelable,Constant.CancelAble.false);
    assert.deepEqual(aSensorEvent.callback,null);
});

test("GenericSensor.sensorEvent - property initialise", function() {
    var aGenericSensor = new GenericSensor();

    var aSensorEvent = new aGenericSensor.sensorEvent();
    var options = {
        type : Constant.EventType.actuator,
        eventFireMode : Constant.EventFireMode.valueChange,
        sensorValue : {temperature: 10.11}
    }

    aSensorEvent.initSensorEvent(options);
    assert.equal(aSensorEvent.type, Constant.EventType.actuator);
    assert.equal(aSensorEvent.type, "actuator");
    assert.equal(aSensorEvent.eventFireMode,Constant.EventFireMode.valueChange);
    assert.equal(aSensorEvent.eventFireMode,"valuechange");
    assert.deepEqual(aSensorEvent.position,aGenericSensor.position);
    assert.deepEqual(aSensorEvent.sensorValue, {temperature: 10.11});
    assert.equal(aSensorEvent.cancelable,Constant.CancelAble.false);
    assert.deepEqual(aSensorEvent.callback,null);

    var options = {
        eventFireMode : Constant.EventFireMode.fixedInterval,
        position : {latitude:82.34324,longitude: 70.23413}
    }
    aSensorEvent.initSensorEvent(options);
    assert.equal(aSensorEvent.type, Constant.EventType.actuator);
    assert.equal(aSensorEvent.type, "actuator");
    assert.equal(aSensorEvent.eventFireMode,Constant.EventFireMode.fixedInterval);
    assert.equal(aSensorEvent.eventFireMode,"fixedinterval");
    assert.deepEqual(aSensorEvent.position,{latitude:82.34324,longitude: 70.23413});
    assert.deepEqual(aSensorEvent.sensorValue, {temperature: 10.11});
    assert.equal(aSensorEvent.cancelable,Constant.CancelAble.false);
    assert.deepEqual(aSensorEvent.callback,null);

    var options = {
        type : Constant.EventType.sensor,
        cancelable : Constant.CancelAble.true
    }
    aSensorEvent.initSensorEvent(options);
    assert.equal(aSensorEvent.type, Constant.EventType.sensor);
    assert.equal(aSensorEvent.type, "sensor");
    assert.equal(aSensorEvent.eventFireMode,Constant.EventFireMode.fixedInterval);
    assert.equal(aSensorEvent.eventFireMode,"fixedinterval");
    assert.deepEqual(aSensorEvent.position,{latitude:82.34324,longitude: 70.23413});
    assert.deepEqual(aSensorEvent.sensorValue, {temperature: 10.11});
    assert.equal(aSensorEvent.cancelable,Constant.CancelAble.true);
    assert.deepEqual(aSensorEvent.callback,null);

    var options = {
        type : Constant.EventType.sensor,
        cancelable : Constant.CancelAble.true,
        callback : "this will not work"
    }
    aSensorEvent.initSensorEvent(options);
    assert.equal(aSensorEvent.type, Constant.EventType.sensor);
    assert.equal(aSensorEvent.type, "sensor");
    assert.equal(aSensorEvent.eventFireMode,Constant.EventFireMode.fixedInterval);
    assert.equal(aSensorEvent.eventFireMode,"fixedinterval");
    assert.deepEqual(aSensorEvent.position,{latitude:82.34324,longitude: 70.23413});
    assert.deepEqual(aSensorEvent.sensorValue, {temperature: 10.11});
    assert.equal(aSensorEvent.cancelable,Constant.CancelAble.true);
    assert.deepEqual(aSensorEvent.callback,null);
});

test("GenericSensor.sensorEvent - event action - nothing", function() {
    var aGenericSensor = new GenericSensor();
    var aSensorEvent = new aGenericSensor.sensorEvent();
    assert.deepEqual(aSensorEvent.callback,null);
    assert.deepEqual(aSensorEvent.doAction(),null);

    var options = {
        callback : "this will not work"
    }

    aSensorEvent.initSensorEvent(options);
    assert.deepEqual(aSensorEvent.callback,null);
    assert.deepEqual(aSensorEvent.doAction(),null);

    options = {
        type : Constant.EventType.actuator,
        callback : function() { aSensorEvent.state += 1; }
    }

    aSensorEvent.initSensorEvent(options);
    assert.equal(aSensorEvent.type, Constant.EventType.actuator);
    assert.deepEqual(typeof aSensorEvent.callback,'function');
    var previousState = aSensorEvent.state;
    aSensorEvent.doAction(); // this function will add one state
    assert.equal(aSensorEvent.state,previousState + 2);
});

test("GenericSensor.sensorEvent - event action - actuator state changed", function() {
    var aGenericSensor = new GenericSensor();
    var aSensorEvent = new aGenericSensor.sensorEvent();
    assert.deepEqual(aSensorEvent.callback,null);
    assert.deepEqual(aSensorEvent.doAction(),null);

    var options = {
        type : Constant.EventType.actuator,
        callback : function() { aSensorEvent.state += 1; }
    }

    aSensorEvent.initSensorEvent(options);
    assert.equal(aSensorEvent.type, Constant.EventType.actuator);
    assert.deepEqual(typeof aSensorEvent.callback,'function');

    var previousState = aSensorEvent.state;
    aSensorEvent.doAction(); // this function will add one state
    assert.equal(aSensorEvent.state,previousState + 2);

    options = {
        type : Constant.EventType.actuator,
        callback : function() { aSensorEvent.state = Constant.State.original; }
    }

    aSensorEvent.initSensorEvent(options);
    aSensorEvent.doAction(); // this function will add one state
    assert.equal(aSensorEvent.state,1);

    options = {
        type : Constant.EventType.nothing,
        callback : function() { return null },
        state : 0
    }

    aSensorEvent.initSensorEvent(options);
    assert.deepEqual(typeof aSensorEvent.callback,'function');
    assert.equal(aSensorEvent.state,0);
});

test("GenericSensor.sensorEvent - event action - sensor value", function() {
    var aGenericSensor = new GenericSensor();
    var aSensorEvent = new aGenericSensor.sensorEvent();
    assert.deepEqual(aSensorEvent.callback,null);
    assert.deepEqual(aSensorEvent.doAction(),null);

    var options = {
        type : Constant.EventType.sensor,
        callback : function() { return {c0:13,c1:false,c2:"6"}; }
    }

    aSensorEvent.initSensorEvent(options);
    assert.deepEqual(aSensorEvent.doAction(),{c0:13,c1:false,c2:"6"});
    assert.deepEqual(aSensorEvent.sensorValue,{c0:13,c1:false,c2:"6"});

    var options = {
        type : Constant.EventType.sensor,
        callback : function() { return {}; }
    }

    aSensorEvent.initSensorEvent(options);
    assert.deepEqual(aSensorEvent.doAction(),{});
    assert.deepEqual(aSensorEvent.sensorValue,{});

    var options = {
        type : Constant.EventType.sensor,
        callback : function() { return "I am not a object"; }

    }

    aSensorEvent.initSensorEvent(options);
    assert.deepEqual(aSensorEvent.doAction(),{});
    assert.deepEqual(aSensorEvent.sensorValue,{});
});