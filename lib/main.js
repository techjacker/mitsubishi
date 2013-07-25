if (typeof require !== 'undefined') {
	var mixinInstance = require('./instance.js');
	var mixinProto = require('./proto.js');
}

var checkIsArray = function (arr) {
	return (arr instanceof Array);
};

/**
 * Mix in PROTOTYPE properties from parent class(es) to child class.
 *
 * @method mixinProtoProps
 *
 * @param  {Class} child class that will be decorated
 * @param  {Class|Array} parent class(es) (can be static or dynamic) that will be giving their properties to the new static class
 *
 * @return {Object}             decorated child static class
 */
var mixinProtoProps = function(childClass, parents) {
	return (checkIsArray(parents)) ? mixinProto.propsMulti(childClass, parents) : mixinProto.propsSingle(childClass, parents);
};


/**
 * Mix in INSTANCE properties from parent class(es) to child class.
 *
 * @method mixinInstanceProps
 *
 * @param  {Class} child class that will be decorated
 * @param  {Class|Array} parent class(es) (can be static or dynamic) that will be giving their properties to the new static class
 *
 * @return {Object}             decorated child static class
 */
var mixinInstanceProps = function(childClass, parents) {
	return (checkIsArray(parents)) ? mixinInstance.instanceMulti(childClass, parents) : mixinInstance.instanceSingle(childClass, parents);
};


/**
 * mix in instance or prototype methods from classes
 *
 * @class mitsubishi
 * @static
 */
var mitsubishi = {
	"mixinInstanceProps": mixinInstanceProps,
	"mixinProtoProps": mixinProtoProps,
};

// console.error('mitsubishi', mitsubishi);

if (typeof module !== 'undefined' && module.exports) {
	module.exports = mitsubishi;
}