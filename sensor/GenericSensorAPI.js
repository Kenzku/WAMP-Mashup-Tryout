/**
 * User: Ken
 * Date: 29/03/2013
 * Time: 16:03
 * Reference: http://dev.webinos.org/specifications/draft/sensors.html#::PendingSensorConfigOp
 */

var Constant = require('./Constant');

/**
 *
 * @constructor
 */
function GenericSensor() {
    var self = this;

    self.sensorType = Constant.SensorSpec.type.default; // sensorType {String} e.g.
    self.sensorID = Constant.SensorSpec.default.did; // sensorId {String} sensor ID
    self.returnable = Constant.ReturnAble.true;
    self.timeout = Constant.SensorSpec.default.timeout; // in milliseconds
    self.rate = Constant.SensorSpec.default.rate; // in milliseconds
    self.eventFireMode = Constant.EventFireMode.fixedInterval;
    self.position = new Constant.GeoPosition(); // position {Object} Position of the sensor

    /**
     * hardware properties
     * @type {null}
     */
    self.maximumRange = Constant.SensorSpec.default.hardware;
    self.minDelay = Constant.SensorSpec.default.hardware;
    self.power = Constant.SensorSpec.default.hardware;
    self.resolution = Constant.SensorSpec.default.hardware;
    self.vendor = Constant.SensorSpec.default.hardware;
    self.version = Constant.SensorSpec.default.hardware;

    /**
     * configuration object
     * @param options {Object}
     */
    self.configureSensor = function (options){
        for (var option in options){
            switch (option) {
                case "sensorType":
                    self.sensorType = options[option];
                    break;
                case "sensorID":
                    self.sensorID = options[option];
                    break;
                case "returnable":
                    self.returnable = options[option];
                    break;
                case "timeout":
                    self.timeout = options[option];
                    break;
                case "rate":
                    self.rate = options[option];
                    break;
                case "eventFireMode":
                    self.eventFireMode = options[option];
                    break;
                case "position":
                    self.position = options[option];
                    break;
                case "maximumRange":
                    self.maximumRange = options[option];
                    break;
                case "minDelay":
                    self.minDelay =  options[option]
                    break;
                case "power":
                    self.power = options[option];
                    break;
                case "resolution":
                    self.resolution = options[option];
                    break;
                case "vendor":
                    self.vendor = options[option];
                    break;
                case "version":
                    self.version = options[option];
                    break;
            }
        }
    }

    self.sensorEvent = function () {
        var _self = this;

        _self.type = Constant.EventType.nothing;
        _self.eventFireMode = self.eventFireMode;
        _self.position = self.position; // position {Object} Position of the sensor
        _self.sensorValue = Constant.SensorSpec.default.data; // sensorValues {Object} sensor values
        _self.cancelable = Constant.CancelAble.false;
        /* {{_self.callback}} if actuator, no return value, but change the state; if sensor, return a JSON */
        _self.callback = null;
        /**
         * Use for actuator, denoting the change of its state
         * @type {*}
         */
        _self.state = Constant.State.original;

        _self.initSensorEvent = function(options){
            for (var option in options){
                switch (option) {
                    case "type":
                        _self.type = options[option];
                        break;
                    case "eventFireMode":
                        _self.eventFireMode = options[option];
                        break;
                    case "position":
                        _self.position = options[option];
                        break;
                    case "sensorValue":
                        _self.sensorValue = options[option];
                        break;
                    case "cancelable":
                        _self.cancelable =  options[option];
                        break;
                    case "callback":
                        _self.callback = (typeof options[option] === "function") ? options[option] : null;
                        break;
                    case "state":
                        _self.state =  options[option];
                        break;
                }
            }
        }

        _self.doAction = function () {
            switch (_self.type) {
                case "actuator":
                    _self.actuate();
                    break;
                case "sensor":
                    return _self.sense();
                    break;
                default:
                    return null;
                    break;
            }
        }
        /**
         * I am not sure this part
         * do I need callback, or do I need predefine functions?
         */
        _self.actuate = function () {
            _self.callback();
            _self.state += 1;
        }

        _self.sense = function () {
            var temp = _self.callback();
            _self.sensorValue = (typeof temp === 'object') ? temp : {};
            return _self.sensorValue;
        }
    };
};

module.exports = GenericSensor;


