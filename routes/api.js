/**
 * User: Ken
 * Date: 04/04/2013
 * Time: 16:03
 */
var TemperatureSensor = require('../sensor/TemperatureSensorAPI');
var GenericSensor = require('../sensor/GenericSensorAPI');
var Constant = require('../sensor/Constant');

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
            // cb (err, successResult);
            cb(null,result);
        },
        'sensor:reset' : function(args,cb){
            var result = reset();
            reset() ? cb(null,result) : cb(Constant.Error.reset.NO_INIT);
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
                console.log(config);
                if(config.callback){
                    // for safety reason, even though functions will be eliminated
                    delete config.callback;
                }
                console.log(config);
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

function reset(){
    if(!aSensor){
        return false;
    }
    aSensor.resetSensorState();
    return aSensor.getData(true);
}

function getCallBackOnSensor(){
    return aSensor.aSensorEvent.callback;
}