if (typeof require !== 'undefined') {
	var mitsubishi = require('../lib/main.js');
	var expect = require('expect.js');
}


describe('mitsubishi', function () {

	it('should export all needed API methods', function (done) {
		expect(mitsubishi).to.only.have.keys('mixinInstanceProps', 'mixinProtoProps');
		done();
	});

	/*--------------------------------------
	fixtures
	---------------------------------------*/
	// need outer scope
	var fixtures;
	beforeEach(function (done) {
		fixtures = {
			A: {
				foo: true,
				bar: true
			},
			B: function () {
				this.blah = true;
			},
			C: {
				marbel: true
			}
		};
		fixtures.B.prototype.protoproperty = true;
		done();
	});

	it('mitsubishi.mixinInstanceProps() - copy instance properties from instantiated dynamic classes as well as object literals', function (done) {
		expect(mitsubishi.mixinInstanceProps({}, [fixtures.A, fixtures.C])).to.only.have.keys('foo', 'bar', 'marbel');
		expect(mitsubishi.mixinInstanceProps({}, [fixtures.A, fixtures.B])).to.only.have.keys('foo', 'bar');
		expect(mitsubishi.mixinInstanceProps({}, fixtures.A)).to.only.have.keys('foo', 'bar');
		expect(mitsubishi.mixinInstanceProps({}, [fixtures.A, (new fixtures.B)])).to.only.have.keys('foo', 'bar', 'blah');
		expect(mitsubishi.mixinInstanceProps({}, [(new fixtures.B), fixtures.C])).to.only.have.keys('blah', 'marbel');
		done();
	});

	it('mitsubishi.mixinProtoPropsMulti() - copy poto properties from dynamic classes (if instantiated) as well as object literals', function (done) {
		expect(mitsubishi.mixinProtoProps({}, [fixtures.A, fixtures.C])).to.have.key('foo', 'bar', 'marbel');
		expect(mitsubishi.mixinProtoProps({}, [(new fixtures.B()), fixtures.C])).to.have.key('marbel');
		expect(mitsubishi.mixinProtoProps({}, (new fixtures.B()))).to.have.key('protoproperty');

		/////////////////////////////////////////////////////////////////////////////////////////////
		// MUST BE AN INSTANCE OF A DYNAMIC CLASS
		// to add a prototype of an uninstantiated dynamic class then use mixinInstanceProps and   //
		// directly reference its prototype
		/////////////////////////////////////////////////////////////////////////////////////////////
		expect(mitsubishi.mixinProtoProps({}, fixtures.B)).to.not.have.key('protoproperty');
		expect(mitsubishi.mixinInstanceProps({}, fixtures.B.prototype)).to.have.key('protoproperty');
		done();
	});
});