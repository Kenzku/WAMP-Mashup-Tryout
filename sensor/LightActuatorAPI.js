/**
 * User: Ken
 * Date: 09/04/2013
 * Time: 12:46
 */
var GenericSensor = require('GenericComponentAPI');
var Constant = require('../sensor/Constant');

function LightActuator (configuration) {
    var self = this;

    self.aGenericComponent = new GenericSensor();
    self.aComponentEvent = new self.aGenericComponent.componentEvent();

    /**
     * a on/off switch, or a dial
     * @type {String}
     */
    self.switchMode = Constant.ComponentSpec.default.switchMode.onoff;
    /**
     * if it is a Boolean, it refers to on/off mode: true - on, false-off
     * if it is a Number, it refers to dial mode: 0-100,
     * where 0 is the minimal power
     * @type {Boolean} or {Number}
     */
    self.strength = Constant.ComponentSpec.default.switch.off;

    self.actuate = function (successfulCallback,errorCallback){
        if (successfulCallback && typeof successfulCallback === 'function'){
            successfulCallback();
        }
        if (errorCallback && typeof errorCallback === 'function'){
            errorCallback();
        }
    }

    /**
     * reset current sensor state
     * you might need to re-config the sensor after reset
     * by calling 'config'
     */
    self.resetActuatorState = function () {
        self.aGenericComponent = new GenericSensor();
        self.aComponentEvent = new self.aGenericComponent.componentEvent();
        self.configuration = Constant.ComponentSpec.default.config;
        self.config();
    };
    /**
     * the sensor configuration
     * @type {{}}
     */
    self.configuration = Constant.ComponentSpec.default.config;
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
                componentType: Constant.ComponentSpec.type.actuator.switch,
                deviceID: configuration.deviceID || Constant.ComponentSpec.default.did,
                returnable:configuration.returnable || Constant.ReturnAble.false,
                timeout:configuration.timeout || Constant.ComponentSpec.default.timeout,
                rate:configuration.rate || Constant.ComponentSpec.default.rate,
                eventFireMode: configuration.eventFireMode || Constant.EventFireMode.valueChange,
                position:configuration.position || new Constant.GeoPosition(),
                maximumRange : configuration.maximumRange || Constant.ComponentSpec.default.hardware,
                minDelay : configuration.minDelay || Constant.ComponentSpec.default.hardware,
                power : configuration.power || Constant.ComponentSpec.default.hardware,
                resolution : configuration.resolution || Constant.ComponentSpec.default.hardware,
                vendor : configuration.vendor || Constant.ComponentSpec.default.hardware,
                version : configuration.version || Constant.ComponentSpec.default.hardware
            };
            self.aGenericComponent.configureComponent(options);

            // initialise Sensor Event
            options = {
                type : configuration.type || Constant.EventType.actuator,
                returnValue : Constant.ComponentSpec.default.data,
                cancelable: configuration.cancelable || Constant.CancelAble.false,
                // validation will be check in GenericSensorAPI
                callback : self.actuate
            };
            self.aComponentEvent.initComponentEvent(options);

            // configure Light Actuator
            self.switchMode = configuration.switchMode || Constant.ComponentSpec.default.switchMode.onoff;
            self.strength = (self.switchMode == Constant.ComponentSpec.default.switchMode.onoff ) ?
                // on off mode
                ( (configuration.strength == Constant.ComponentSpec.default.switch.on || configuration.strength == Constant.ComponentSpec.default.switch.off) ?
                    configuration.strength : Constant.ComponentSpec.default.switch.off )
                // dial mode
                : ( (configuration.strength >= 0 && configuration.strength<=100) ?
                    configuration.strength / 100 : (configuration.strength % 100) / 100 );
        }else{
            options = {
                componentType: Constant.ComponentSpec.type.actuator.switch,
                type : Constant.EventType.actuator,
                callback : self.updateTemperatureOnSensor
            };
            self.aGenericComponent.configureComponent(options);
            self.aComponentEvent.initComponentEvent(options);
        }
        // set configuration
        self.configuration = {
            switchMode : self.switchMode,
            strength : self.strength,
            strength : Constant.ComponentSpec.default.data.strength,
            componentType: self.aGenericComponent.componentType,
            deviceID: self.aGenericComponent.deviceID,
            returnable: self.aGenericComponent.returnable,
            timeout: self.aGenericComponent.timeout,
            rate: self.aGenericComponent.rate,
            eventFireMode: self.aGenericComponent.eventFireMode,
            position: self.aGenericComponent.position,
            maximumRange : self.aGenericComponent.maximumRange,
            minDelay : self.aGenericComponent.minDelay,
            power : self.aGenericComponent.power,
            resolution : self.aGenericComponent.resolution,
            vendor : self.aGenericComponent.vendor,
            version : self.aGenericComponent.version,

            type : self.aComponentEvent.type,
            cancelable: self.aComponentEvent.cancelable
        }
    };

    (self.init = function () {
        self.config(configuration);
    })();
}
module.exports = LightActuator;