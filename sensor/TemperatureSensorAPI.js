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
     * This might be an asynchronous function
     * @return {JSON}
     */
    self.updateTemperatureOnSensor = function () {
        /* Need To Do */
         return {c0 :5};
    };
    /**
     * Ask the sensor to do an Action
     * This might be an asynchronous function
     * @return {number}
     */
    self.currentTemperature = function () {
        self.temperature = self.aSensorEvent.doAction();
        return self.temperature;
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
        self.config();
    };
    /**
     * should referece GenericSensorAPI
     * @type {JSON}
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
                callback : configuration.callback || self.updateTemperatureOnSensor
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
    };

    (self.init = function () {
        self.config(configuration);
    })();
}

module.exports = TemperatureSensor;