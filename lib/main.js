if (typeof require !== 'undefined') {
	var mixinInstance = require('./instance.js');
	var mixinProto = require('./proto.js');
}

var checkIsArray = function (arr) {
	return (arr instanceof Array);
};

/**
 * Mix in PROTOTYPE properties from parent INSTANTIATED class(es) to child class.
 *
 * @method protoPropsFromInstantiated
 *
 * @param  {Class} child class that will be decorated
 * @param  {Class|Array} parent class(es) (can be static or dynamic) that will be giving their properties to the new static class
 *
 * @return {Object}             decorated child static class
 */
var protoPropsFromInstantiated = function(childClass, parents) {
	return (checkIsArray(parents)) ? mixinProto.propsMulti(childClass, parents) : mixinProto.propsSingle(childClass, parents);
};


/**
 * Mix in PROTOTYPE properties from parent UNinstantiated class(es) to child class.
 *
 * @method protoPropsFromInstantiated
 *
 * @param  {Class} child class that will be decorated
 * @param  {Class|Array} parent class(es) (can be static or dynamic) that will be giving their properties to the new static class
 *
 * @return {Object}             decorated child static class
 */
var protoPropsFromUninstantiated = function(childClass, parents) {
	return (checkIsArray(parents)) ? mixinProto.propsUninstantiatedMulti(childClass, parents) : mixinProto.propsUninstantiatedSingle(childClass, parents);
};



/**
 * Mix in INSTANCE properties from parent class(es) to child class.
 *
 * @method instancePropsFromInstantiated
 *
 * @param  {Class} child class that will be decorated
 * @param  {Class|Array} parent class(es) (can be static or dynamic) that will be giving their properties to the new static class
 *
 * @return {Object}             decorated child static class
 */
var instancePropsFromInstantiated = function(childClass, parents) {
	return (checkIsArray(parents)) ? mixinInstance.instanceMulti(childClass, parents) : mixinInstance.instanceSingle(childClass, parents);
};


/**
 * mix in instance or prototype methods from classes
 *
 * @class mitsubishi
 * @static
 */
var mitsubishi = {

	"proto": protoPropsFromUninstantiated, // Obj literals + Class defs
	"protoPropsFromUninstantiated": protoPropsFromUninstantiated, // Obj literals + Class defs

	"protoInstantiated": protoPropsFromInstantiated, // Obj literals + Class instances
	"protoPropsFromInstantiated": protoPropsFromInstantiated, // Obj literals + Class instances

	"props": protoPropsFromInstantiated, // Obj literals + Class instances
	"instancePropsFromInstantiated": instancePropsFromInstantiated // Obj literal

};

// console.error('mitsubishi', mitsubishi);

if (typeof module !== 'undefined' && module.exports) {
	module.exports = mitsubishi;
}