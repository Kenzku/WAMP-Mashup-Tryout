/**
 * User: Ken
 * Date: 04/04/2013
 * Time: 16:03
 */
var TemperatureSensor = require('../sensor/TemperatureSensorAPI');
var GenericSensor = require('../sensor/GenericSensorAPI');
// temperature sensor
var aSensor;

module.exports = function api_module(cfg){
    // procedures
    var procs = {
        /**
         *  initialise a sensor
         * @param args [type, [config]]
         * @param cb
         */
        'sensor:init' : function(args,cb){
            var args = args.shift();
            var result = init(args);
            cb(null,result);
        },
        'sensor:config' : function(args,cv){
            
        }
    };

    var initAPI = function(cfg,callback){
        if (callback && isFunction(callback)){
            callback();
        }
    }

    if(cfg) {initAPI(cfg);}

    return {
        rpc : {
            call : function(procUri, args, cb){
                if (! procs[procUri]) {
                    return cb('Unknown procedure: ' + procUri);
                }
                procs[procUri](args, cb);
            }
        }
    };

}

function whichSensor(args){
    var type = args.shift();
    var config = args.length == 1 ? args.shift() : null;
    switch (type) {
        case 'temperature':
            if(config && typeof config === 'object'){
                return new TemperatureSensor(config);
            } else{
                return new TemperatureSensor();
            }
            break;
        default :
            return new GenericSensor();
            break;
    }
}

function init (args) {
    aSensor = whichSensor(args);
    if (aSensor){
        return aSensor.getData(true);
    }else{
        return null;
    }
}