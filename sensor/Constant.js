/**
 * User: Ken
 * Date: 02/04/2013
 * Time: 16:26
 */

exports.EventFireMode = {
    fixedInterval : "fixedinterval",
    valueChange : "valuechange"
}

exports.ReturnAble = {
    true : true,
    false : false
}

exports.CancelAble = {
    true : true,
    false : false
}

exports.EventType = {
    nothing : "nothing",
    sensor : "sensor",
    actuator : "actuator"
}

exports.State = {
    original : 0
}

exports.GeoPosition = function () {
    var latitude = 0.0;
    var longitude = 0.0;
    return {latitude:latitude,longitude:longitude};
}