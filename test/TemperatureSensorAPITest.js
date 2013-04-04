/**
 * User: Ken
 * Date: 04/04/2013
 * Time: 13:40
 */
var assert = require("assert");
var expect = require('chai').expect;
var TemperatureSensor = require('../sensor/TemperatureSensorAPI');
var GenericSensor = require('../sensor/GenericSensorAPI');
var Constant = require('../sensor/Constant');

function ok(expr, msg) {
    if (!expr) throw new Error(msg);
}

suite("Temperature Sensor");

test("properties - without configuration", function() {
    var aTemperatureSensor = new TemperatureSensor();
    var aGenericSensor = new GenericSensor();

    /* property */
    assert.ok(aTemperatureSensor.aGenericSensor instanceof GenericSensor);
    assert.ok(aTemperatureSensor.aSensorEvent instanceof aTemperatureSensor.aGenericSensor.sensorEvent);
    assert.equal(aTemperatureSensor.temperature, Constant.SensorSpec.default.data);
    assert.equal(aTemperatureSensor.temperature, Constant.SensorSpec.default.null);

    /* configuration */
    assert.equal(aTemperatureSensor.aGenericSensor.sensorType, Constant.SensorSpec.type.temperature);
    assert.equal(aTemperatureSensor.aGenericSensor.sensorType, "temperature");
    assert.equal(aTemperatureSensor.aGenericSensor.sensorID,"");
    assert.equal(aTemperatureSensor.aGenericSensor.returnable,true);
    assert.equal(aTemperatureSensor.aGenericSensor.timeout,100.0);
    assert.equal(aTemperatureSensor.aGenericSensor.rate, 50.0);
    assert.equal(aTemperatureSensor.aGenericSensor.eventFireMode,"fixedinterval");
    assert.deepEqual(aTemperatureSensor.aGenericSensor.position,{latitude:0.0,longitude:0.0});

    assert.deepEqual(aTemperatureSensor.aGenericSensor.maximumRange, null);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.minDelay, null);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.power, null);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.resolution, null);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.vendor, null);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.version,null);

    assert.equal(aTemperatureSensor.aSensorEvent.type, Constant.EventType.sensor);
    assert.equal(aTemperatureSensor.aSensorEvent.type, "sensor");
    assert.equal(aTemperatureSensor.aSensorEvent.eventFireMode, aGenericSensor.eventFireMode);
    assert.deepEqual(aTemperatureSensor.aSensorEvent.position,aGenericSensor.position);
    assert.deepEqual(aTemperatureSensor.aSensorEvent.sensorValue, Constant.SensorSpec.default.data);
    assert.deepEqual(aTemperatureSensor.aSensorEvent.sensorValue, null);
    assert.equal(aTemperatureSensor.aSensorEvent.cancelable,Constant.CancelAble.false);

    /* callback function */
//    assert.deepEqual(aTemperatureSensor.aSensorEvent.callback,null);
    expect(aTemperatureSensor.aSensorEvent.callback).to.be.a('function');

});

test("properties - with configuration",function(){
    var configuration = {
        sensorType:"Temperature",
        sensorID:"12314213432432423154235",
        returnable: Constant.ReturnAble.false,
        timeout:200.0,
        rate:20.0,
        eventFireMode:Constant.EventFireMode.valueChange,
        position:{latitude:20.123412,longitude: 81.9023213},

        maximumRange:10,
        minDelay:40.0,
        power:30.1,
        resolution:55.00,
        vendor:"Huawei",
        version:1.0
    }

    var aTemperatureSensor = new TemperatureSensor(configuration);

    assert.equal(aTemperatureSensor.aGenericSensor.sensorType, Constant.SensorSpec.type.temperature);
    assert.equal(aTemperatureSensor.aGenericSensor.sensorType, "temperature");
    assert.equal(aTemperatureSensor.aGenericSensor.sensorID,"12314213432432423154235");
    assert.equal(aTemperatureSensor.aGenericSensor.returnable,false);
    assert.equal(aTemperatureSensor.aGenericSensor.timeout,200.0);
    assert.equal(aTemperatureSensor.aGenericSensor.rate, 20.0);
    assert.equal(aTemperatureSensor.aGenericSensor.eventFireMode,"valuechange");
    assert.deepEqual(aTemperatureSensor.aGenericSensor.position,{latitude:20.123412,longitude: 81.9023213});

    assert.deepEqual(aTemperatureSensor.aGenericSensor.maximumRange, 10);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.minDelay, 40.0);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.power, 30.1);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.resolution, 55.00);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.vendor, "Huawei");
    assert.deepEqual(aTemperatureSensor.aGenericSensor.version,1.0);

    // reset everything
    aTemperatureSensor.resetSensorState(true);

    var aGenericSensor = new GenericSensor();

    /* property */
    assert.ok(aTemperatureSensor.aGenericSensor instanceof GenericSensor);
    assert.ok(aTemperatureSensor.aSensorEvent instanceof aTemperatureSensor.aGenericSensor.sensorEvent);
    assert.equal(aTemperatureSensor.temperature, Constant.SensorSpec.default.data);
    assert.equal(aTemperatureSensor.temperature, Constant.SensorSpec.default.null);

    /* configuration */
    assert.equal(aTemperatureSensor.aGenericSensor.sensorType, Constant.SensorSpec.type.temperature);
    assert.equal(aTemperatureSensor.aGenericSensor.sensorType, "temperature");
    assert.equal(aTemperatureSensor.aGenericSensor.sensorID,"");
    assert.equal(aTemperatureSensor.aGenericSensor.returnable,true);
    assert.equal(aTemperatureSensor.aGenericSensor.timeout,100.0);
    assert.equal(aTemperatureSensor.aGenericSensor.rate, 50.0);
    assert.equal(aTemperatureSensor.aGenericSensor.eventFireMode,"fixedinterval");
    assert.deepEqual(aTemperatureSensor.aGenericSensor.position,{latitude:0.0,longitude:0.0});

    assert.deepEqual(aTemperatureSensor.aGenericSensor.maximumRange, null);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.minDelay, null);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.power, null);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.resolution, null);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.vendor, null);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.version,null);

    assert.equal(aTemperatureSensor.aSensorEvent.type, Constant.EventType.sensor);
    assert.equal(aTemperatureSensor.aSensorEvent.type, "sensor");
    assert.equal(aTemperatureSensor.aSensorEvent.eventFireMode, aGenericSensor.eventFireMode);
    assert.deepEqual(aTemperatureSensor.aSensorEvent.position,aGenericSensor.position);
    assert.deepEqual(aTemperatureSensor.aSensorEvent.sensorValue, Constant.SensorSpec.default.data);
    assert.deepEqual(aTemperatureSensor.aSensorEvent.sensorValue, null);
    assert.equal(aTemperatureSensor.aSensorEvent.cancelable,Constant.CancelAble.false);

    /* callback function's behaviour */
    expect(aTemperatureSensor.aSensorEvent.callback).to.be.a('function');
    /* callback function on Generic Sensor API - on the sensor */
    var result = aTemperatureSensor.aSensorEvent.callback();
    assert.deepEqual(result,{c0 :5});
    /* doAction on Generic Sensor API - on the sensor */
    var result = aTemperatureSensor.currentTemperature();
    assert.deepEqual(result,{c0 :5});
    assert.deepEqual(result,aTemperatureSensor.temperature);
    assert.deepEqual(aTemperatureSensor.aSensorEvent.sensorValue,{c0:5});
});

test("properties - with configuration",function(){
    var configuration = {
        sensorType:"Temperature",
        sensorID:"12314213432432423154235",
        returnable: Constant.ReturnAble.false,
        timeout:200.0,
        rate:20.0,
        eventFireMode:Constant.EventFireMode.valueChange,
        position:{latitude:20.123412,longitude: 81.9023213},

        maximumRange:10,
        minDelay:40.0,
        power:30.1,
        resolution:55.00,
        vendor:"Huawei",
        version:1.0
    }

    var aTemperatureSensor = new TemperatureSensor(configuration);

    assert.equal(aTemperatureSensor.aGenericSensor.sensorType, Constant.SensorSpec.type.temperature);
    assert.equal(aTemperatureSensor.aGenericSensor.sensorType, "temperature");
    assert.equal(aTemperatureSensor.aGenericSensor.sensorID,"12314213432432423154235");
    assert.equal(aTemperatureSensor.aGenericSensor.returnable,false);
    assert.equal(aTemperatureSensor.aGenericSensor.timeout,200.0);
    assert.equal(aTemperatureSensor.aGenericSensor.rate, 20.0);
    assert.equal(aTemperatureSensor.aGenericSensor.eventFireMode,"valuechange");
    assert.deepEqual(aTemperatureSensor.aGenericSensor.position,{latitude:20.123412,longitude: 81.9023213});

    assert.deepEqual(aTemperatureSensor.aGenericSensor.maximumRange, 10);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.minDelay, 40.0);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.power, 30.1);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.resolution, 55.00);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.vendor, "Huawei");
    assert.deepEqual(aTemperatureSensor.aGenericSensor.version,1.0);

    // reset everything
    aTemperatureSensor.resetSensorState();

    var aGenericSensor = new GenericSensor();

    /* property */
    assert.ok(aTemperatureSensor.aGenericSensor instanceof GenericSensor);
    assert.ok(aTemperatureSensor.aSensorEvent instanceof aTemperatureSensor.aGenericSensor.sensorEvent);
    assert.equal(aTemperatureSensor.temperature, Constant.SensorSpec.default.data);
    assert.equal(aTemperatureSensor.temperature, Constant.SensorSpec.default.null);

    /* configuration */
    assert.equal(aTemperatureSensor.aGenericSensor.sensorType, Constant.SensorSpec.type.temperature);
    assert.equal(aTemperatureSensor.aGenericSensor.sensorType, "temperature");
    assert.equal(aTemperatureSensor.aGenericSensor.sensorID,"");
    assert.equal(aTemperatureSensor.aGenericSensor.returnable,true);
    assert.equal(aTemperatureSensor.aGenericSensor.timeout,100.0);
    assert.equal(aTemperatureSensor.aGenericSensor.rate, 50.0);
    assert.equal(aTemperatureSensor.aGenericSensor.eventFireMode,"fixedinterval");
    assert.deepEqual(aTemperatureSensor.aGenericSensor.position,{latitude:0.0,longitude:0.0});

    assert.deepEqual(aTemperatureSensor.aGenericSensor.maximumRange, null);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.minDelay, null);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.power, null);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.resolution, null);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.vendor, null);
    assert.deepEqual(aTemperatureSensor.aGenericSensor.version,null);

    assert.equal(aTemperatureSensor.aSensorEvent.type, Constant.EventType.sensor);
    assert.equal(aTemperatureSensor.aSensorEvent.type, "sensor");
    assert.equal(aTemperatureSensor.aSensorEvent.eventFireMode, aGenericSensor.eventFireMode);
    assert.deepEqual(aTemperatureSensor.aSensorEvent.position,aGenericSensor.position);
    assert.deepEqual(aTemperatureSensor.aSensorEvent.sensorValue, Constant.SensorSpec.default.data);
    assert.deepEqual(aTemperatureSensor.aSensorEvent.sensorValue, null);
    assert.equal(aTemperatureSensor.aSensorEvent.cancelable,Constant.CancelAble.false);

    /* callback function's behaviour */
    expect(aTemperatureSensor.aSensorEvent.callback).to.be.a('function');
    /* callback function on Generic Sensor API - on the sensor */
    var result = aTemperatureSensor.aSensorEvent.callback();
    assert.deepEqual(result,{c0 :5});
    /* doAction on Generic Sensor API - on the sensor */
    var result = aTemperatureSensor.currentTemperature();
    assert.deepEqual(result,{c0 :5});
    assert.deepEqual(result,aTemperatureSensor.temperature);
    assert.deepEqual(aTemperatureSensor.aSensorEvent.sensorValue,{c0:5});
});