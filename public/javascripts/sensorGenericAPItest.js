/**
 * User: Ken
 * Date: 31/03/2013
 * Time: 19:34
 */
module( "Generic sensor" );
test("GenericSensor - properties", function() {
    var aGenericSensor = new GenericSensor();
    equal(aGenericSensor.sensorType, "");
    equal(aGenericSensor.sensorID,"");
    equal(aGenericSensor.returnable,true);
    equal(aGenericSensor.timeout,100.0);
    equal(aGenericSensor.rate, 50.0);
    equal(aGenericSensor.eventFireMode,"fixedinterval");
    deepEqual(aGenericSensor.position,{latitude:0.0,longitude:0.0});
});
test("GenericSensor - hardware properties", function() {
    var aGenericSensor = new GenericSensor();

    deepEqual(aGenericSensor.maximumRange, null);
    deepEqual(aGenericSensor.minDelay, null);
    deepEqual(aGenericSensor.power, null);
    deepEqual(aGenericSensor.resolution, null);
    deepEqual(aGenericSensor.vendor, null);
    deepEqual(aGenericSensor.version,null);
});

test("GenericSensor - read only properties initialisation", function() {
    var aGenericSensor = new GenericSensor();

    var options = {
        maximumRange:10,
        minDelay:40.0
    }
    aGenericSensor.configureSensor(options);

    deepEqual(aGenericSensor.maximumRange, 10);
    deepEqual(aGenericSensor.minDelay, 40);
    deepEqual(aGenericSensor.power, null);
    deepEqual(aGenericSensor.resolution, null);
    deepEqual(aGenericSensor.vendor, null);
    deepEqual(aGenericSensor.version,null);

    var options = {
        power:30.1,
        resolution:55.00
    }
    aGenericSensor.configureSensor(options);

    deepEqual(aGenericSensor.maximumRange, 10);
    deepEqual(aGenericSensor.minDelay, 40);
    deepEqual(aGenericSensor.power, 30.1);
    deepEqual(aGenericSensor.resolution, 55.00);
    deepEqual(aGenericSensor.vendor, null);
    deepEqual(aGenericSensor.version,null);

    var options = {
        maximumRange : null,
        power:null,
        vendor:"Huawei",
        version:1.0
    }
    aGenericSensor.configureSensor(options);

    deepEqual(aGenericSensor.maximumRange, null);
    deepEqual(aGenericSensor.minDelay, 40);
    deepEqual(aGenericSensor.power, null);
    deepEqual(aGenericSensor.resolution, 55.00);
    deepEqual(aGenericSensor.vendor, "Huawei");
    deepEqual(aGenericSensor.version, 1.0);
});

test("GenericSensor - property initialisation", function() {
    var aGenericSensor = new GenericSensor();
    var options = {
        sensorType:"Temperature",
        sensorID:"12314213432432423154235",
        returnable:ReturnAble.false,
        timeout:200.0,
        rate:20.0,
        eventFireMode:EventFireMode.valueChange,
        position:{latitude:20.123412,longitude: 81.9023213}
    }
    aGenericSensor.configureSensor(options);

    equal(aGenericSensor.sensorType, "Temperature");
    equal(aGenericSensor.sensorID,"12314213432432423154235");
    equal(aGenericSensor.returnable,false);
    equal(aGenericSensor.timeout,200.0);
    equal(aGenericSensor.rate, 20.0);
    equal(aGenericSensor.eventFireMode,"valuechange");
    deepEqual(aGenericSensor.position,{latitude:20.123412,longitude: 81.9023213});
});

test("GenericSensor - property mixture", function() {
    var aGenericSensor = new GenericSensor();
    var options = {
        sensorType:"Temperature",
        sensorID:"12314213432432423154235",
        returnable:ReturnAble.false,
        timeout:200.0,
        rate:20.0,
        eventFireMode:EventFireMode.valueChange,
        position:{latitude:20.123412,longitude: 81.9023213}
    }
    aGenericSensor.configureSensor(options);

    equal(aGenericSensor.sensorType, "Temperature");
    equal(aGenericSensor.sensorID,"12314213432432423154235");
    equal(aGenericSensor.returnable,false);
    equal(aGenericSensor.timeout,200.0);
    equal(aGenericSensor.rate, 20.0);
    equal(aGenericSensor.eventFireMode,"valuechange");
    deepEqual(aGenericSensor.position,{latitude:20.123412,longitude: 81.9023213});

    deepEqual(aGenericSensor.maximumRange, null);
    deepEqual(aGenericSensor.minDelay, null);
    deepEqual(aGenericSensor.power, null);
    deepEqual(aGenericSensor.resolution, null);
    deepEqual(aGenericSensor.vendor, null);
    deepEqual(aGenericSensor.version,null);

    var aGenericSensor = new GenericSensor();

    var options = {
        maximumRange:10,
        minDelay:40.0
    }
    aGenericSensor.configureSensor(options);

    deepEqual(aGenericSensor.maximumRange, 10);
    deepEqual(aGenericSensor.minDelay, 40);
    deepEqual(aGenericSensor.power, null);
    deepEqual(aGenericSensor.resolution, null);
    deepEqual(aGenericSensor.vendor, null);
    deepEqual(aGenericSensor.version,null);

    var options = {
        power:30.1,
        resolution:55.00
    }
    aGenericSensor.configureSensor(options);

    deepEqual(aGenericSensor.maximumRange, 10);
    deepEqual(aGenericSensor.minDelay, 40);
    deepEqual(aGenericSensor.power, 30.1);
    deepEqual(aGenericSensor.resolution, 55.00);
    deepEqual(aGenericSensor.vendor, null);
    deepEqual(aGenericSensor.version,null);

    var options = {
        maximumRange : null,
        power:null,
        vendor:"Huawei",
        version:1.0
    }
    aGenericSensor.configureSensor(options);

    deepEqual(aGenericSensor.maximumRange, null);
    deepEqual(aGenericSensor.minDelay, 40);
    deepEqual(aGenericSensor.power, null);
    deepEqual(aGenericSensor.resolution, 55.00);
    deepEqual(aGenericSensor.vendor, "Huawei");
    deepEqual(aGenericSensor.version, 1.0);
});

