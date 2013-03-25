/**
 * User: Ken
 * Date: 18/03/2013
 * Time: 10:00
 */
// what you export when a file is required.
module.exports = function api_module(cfg){
    // procedures
    var procs = {

        'calc:square': function(args, cb) {
            var result = squre(args);
            cb(null, result);
        },
        'calc:add' : function(args, cb) {
            var result = add(args);
            cb(null, result);
        },
        'calc:sum' : function(args, cb) {
            var result = sum(args);
            cb(null, result);
        },
        'calc:string' : function(args, cb){
            var result = string(args);
            cb(null, result);
        }


    };
    var init = function(cfg,callback){
        if (callback && isFunction(callback)){
            callback();
        }
    }
    if(cfg) {init(cfg);}

    function squre(args){
        return args*args;
    }

    function add(args){
        var sum = 0;
        for (var i = 0; i<args.length; i++){
            sum += args[i];
        }
        return sum;
    }

    function sum(args){
        // args is an array like Object (JSON)
        var sum = 0;
        var args = args[0];
        for (var i = 0; i<args.length; i++){
            sum += args[i];
        }
        return sum;
    }

    function string(args){
        var args = args.shift();
        var string = 'I am ' + args.name + ' and I am ' + args.age + ' years old';
        return {'name':'Salla','age':16, 'you':string};
    }

    return {
        rpc : {
            call : function(procUri, args, cb){
                if (! procs[procUri]) {
                    return cb('Unknown procedure: ' + procUri);
                }
                console.log('The the procedure URI is: ');
                console.log(procUri);
                procs[procUri](args, cb);
            }
        }
    };
}