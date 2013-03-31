/**
 * User: Ken
 * Date: 29/03/2013
 * Time: 16:03
 * Reference: http://dev.webinos.org/specifications/draft/sensors.html#::PendingSensorConfigOp
 */

var EventFireMode = {
    fixedInterval : "fixedinterval",
    valueChange : "valuechange"
}

var ReturnAble = {
    true : true,
    false : false
}

function GeoPosition() {
    var latitude = 0.0;
    var longitude = 0.0;
    return {latitude:latitude,longitude:longitude};
}
/**
 *
 * @constructor
 */
function GenericSensor() {
    var self = this;

    self.sensorType = ""; // sensorType {String}
    self.sensorID = ""; // sensorId {String} sensor ID
    self.returnable = ReturnAble.true;
    self.timeout = 100.0; // in milliseconds
    self.rate = 50.0; // in milliseconds
    self.eventFireMode = EventFireMode.fixedInterval;
    self.position = new GeoPosition(); // position {Object} Position of the sensor

    /**
     * hardware properties
     * @type {null}
     */
    self.maximumRange = null;
    self.minDelay = null;
    self.power = null;
    self.resolution = null;
    self.vendor = null;
    self.version = null;

    /**
     * configuration object
     * @param options {Object}
     */
    self.configureSensor = function (options){
        for (option in options){
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
};




GenericSensor.prototype.configureSensor = function (options, successCallBack, errorCallBack){
 return null;
}

/**
 * I am not sure this part
 * @type {{}}
 */
GenericSensor.prototype.senserEvent = function () {
    var self = this;
    self.eventFireMode = GenericSensor.eventFireMode;
    self.sensorValues = {}; // sensorValues {Object} sensor values
    self.position = GenericSensor.position; // position {Object} Position of the sensor
    self.cancelable = false;
}

/**
 *
 * @param type {String} Event type, i.e. sensor event
 * @param cancelable {Boolean} True if event cancelable
 * @param rate {Number} Rate of sensor data event
 * @param eventFireMode {String} Mode of firing events
 */
GenericSensor.prototype.senserEvent.initSensorEvent = function(type,
                                                               cancelable,
                                                               rate,
                                                               eventFireMode){

}

