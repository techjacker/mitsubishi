if (typeof require !== 'undefined') {
	var mitsubishi = require('../lib/main.js');
	var expect = require('expect.js');
}


describe('mitsubishi', function () {

	it('should export all needed API methods', function (done) {
		expect(mitsubishi).to.only.have.keys('instancePropsFromInstantiated', 'protoPropsFromInstantiated', 'protoPropsFromUninstantiated');
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

	it('mitsubishi.instancePropsFromInstantiated() - copy instance properties from instantiated dynamic classes as well as object literals', function (done) {
		expect(mitsubishi.instancePropsFromInstantiated({}, [fixtures.A, fixtures.C])).to.only.have.keys('foo', 'bar', 'marbel');
		expect(mitsubishi.instancePropsFromInstantiated({}, [fixtures.A, fixtures.B])).to.only.have.keys('foo', 'bar');
		expect(mitsubishi.instancePropsFromInstantiated({}, fixtures.A)).to.only.have.keys('foo', 'bar');
		expect(mitsubishi.instancePropsFromInstantiated({}, [fixtures.A, (new fixtures.B)])).to.only.have.keys('foo', 'bar', 'blah');
		expect(mitsubishi.instancePropsFromInstantiated({}, [(new fixtures.B), fixtures.C])).to.only.have.keys('blah', 'marbel');
		done();
	});

	it('mitsubishi.protoPropsFromInstantiated() - copy poto properties from dynamic classes (if instantiated) as well as object literals', function (done) {
		expect(mitsubishi.protoPropsFromInstantiated({}, [fixtures.A, fixtures.C])).to.have.key('foo', 'bar', 'marbel');
		expect(mitsubishi.protoPropsFromInstantiated({}, [(new fixtures.B()), fixtures.C])).to.have.key('marbel');
		expect(mitsubishi.protoPropsFromInstantiated({}, (new fixtures.B()))).to.have.key('protoproperty');

		/////////////////////////////////////////////////////////////////////////////////////////////
		// MUST BE AN INSTANCE OF A DYNAMIC CLASS
		// to add a prototype of an uninstantiated dynamic class then use instancePropsFromInstantiated and   //
		// directly reference its prototype
		/////////////////////////////////////////////////////////////////////////////////////////////
		expect(mitsubishi.protoPropsFromInstantiated({}, fixtures.B)).to.not.have.key('protoproperty');
		expect(mitsubishi.instancePropsFromInstantiated({}, fixtures.B.prototype)).to.have.key('protoproperty');
		done();
	});


	it('mitsubishi.protoPropsFromUninstantiated() - copy poto properties from dynamic classes (if UNinstantiated) as well as object literals', function (done) {

		// dynamic classes
		var res = function () {};
		 mitsubishi.protoPropsFromUninstantiated(res.prototype, fixtures.B);
		expect(res.prototype).to.have.key('protoproperty');

		// works with object literals too
		expect(mitsubishi.protoPropsFromUninstantiated({}, fixtures.B)).to.have.key('protoproperty');
		done();
	});

});