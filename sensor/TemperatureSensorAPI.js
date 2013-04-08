/**
 * User: Ken
 * Date: 04/04/2013
 * Time: 12:02
 */
var GenericSensor = require('../sensor/GenericSensorAPI');
var Constant = require('../sensor/Constant');

function TemperatureSensor(configuration) {
    var self = this;

    self.aGenericSensor = new GenericSensor();
    self.aSensorEvent = new self.aGenericSensor.sensorEvent();
    /**
     * temperature return by sensor
     * @type {number}
     */
    self.temperature = Constant.SensorSpec.default.data;

    /**
     * Tell the sensor what to do.
     * This might be an asynchronous callback function
     * when configure the sensor,
     * this function will be automatically inject into
     * Generic Sensor API
     * @return {{}}
     */
    self.updateTemperatureOnSensor = function (successfulCallback) {
        /* Need To Do */
        var data = {c0 :5};
        if (successfulCallback && typeof successfulCallback === 'function'){
            self.aSensorEvent.sensorValue = data;
            self.temperature = self.aSensorEvent.sensorValue;
            successfulCallback(data);
        }
    };
    /**
     * Ask the sensor to do an Action
     * This might be an asynchronous function
     * @return {number}
     */
    self.currentTemperature = function (successfulCallback) {
        self.aSensorEvent.doAction(successfulCallback);
    };
    /**
     * reset current sensor state
     * you might need to re-config the sensor after reset
     * by calling 'config'
     */
    self.resetSensorState = function () {
        self.aGenericSensor = new GenericSensor();
        self.aSensorEvent = new self.aGenericSensor.sensorEvent();
        self.temperature = Constant.SensorSpec.default.data;
        self.configuration = Constant.SensorSpec.default.config;
        self.config();
    };
    /**
     * the sensor configuration
     * @type {{}}
     */
    self.configuration = Constant.SensorSpec.default.config;
    /**
     * should referece GenericSensorAPI
     * @type {{}}
     * @param configuration
     */
    self.config = function (configuration) {
        var options = {};
        if (configuration && typeof configuration === 'object'){
            // initialise Generic Sensor
            options = {
                sensorType: Constant.SensorSpec.type.temperature,
                sensorID: configuration.sensorID || Constant.SensorSpec.default.did,
                returnable:configuration.returnable || Constant.ReturnAble.false,
                timeout:configuration.timeout || Constant.SensorSpec.default.timeout,
                rate:configuration.rate || Constant.SensorSpec.default.rate,
                eventFireMode: configuration.eventFireMode || Constant.EventFireMode.valueChange,
                position:configuration.position || new Constant.GeoPosition(),
                maximumRange : configuration.maximumRange || Constant.SensorSpec.default.hardware,
                minDelay : configuration.minDelay || Constant.SensorSpec.default.hardware,
                power : configuration.power || Constant.SensorSpec.default.hardware,
                resolution : configuration.resolution || Constant.SensorSpec.default.hardware,
                vendor : configuration.vendor || Constant.SensorSpec.default.hardware,
                version : configuration.version || Constant.SensorSpec.default.hardware
            };
            self.aGenericSensor.configureSensor(options);

            // initialise Sensor Event
            options = {
                type : configuration.type || Constant.EventType.sensor,
                sensorValue : self.temperature,
                cancelable: configuration.cancelable || Constant.CancelAble.false,
                // validation will be check in GenericSensorAPI
                callback : self.updateTemperatureOnSensor
            };
            self.aSensorEvent.initSensorEvent(options);
        }else{
            options = {
                sensorType: Constant.SensorSpec.type.temperature,
                type : Constant.EventType.sensor,
                callback : self.updateTemperatureOnSensor
            };
            self.aGenericSensor.configureSensor(options);
            self.aSensorEvent.initSensorEvent(options);
        }
        // set configuration
        self.configuration = {
            sensorType: self.aGenericSensor.sensorType,
            sensorID: self.aGenericSensor.sensorID,
            returnable: self.aGenericSensor.returnable,
            timeout: self.aGenericSensor.timeout,
            rate: self.aGenericSensor.rate,
            eventFireMode: self.aGenericSensor.eventFireMode,
            position: self.aGenericSensor.position,
            maximumRange : self.aGenericSensor.maximumRange,
            minDelay : self.aGenericSensor.minDelay,
            power : self.aGenericSensor.power,
            resolution : self.aGenericSensor.resolution,
            vendor : self.aGenericSensor.vendor,
            version : self.aGenericSensor.version,

            type : self.aSensorEvent.type,
            cancelable: self.aSensorEvent.cancelable
        }
    };
    /**
     * return temperature data
     * but if 'isInit' true, returns default configuration when initialise an object
     * @param isInit {boolean}
     * @returns {{}} if isInit is true, otherwise return true.
     */
    self.getData = function (isInit,successfulCallback){
        if(isInit){
            return self.configuration;
        }else{
            if (successfulCallback && typeof successfulCallback === 'function'){
                successfulCallback({data:self.temperature});
            }
            return true;
        }
    };

    (self.init = function () {
        self.config(configuration);
    })();
}

module.exports = TemperatureSensor;