# mitsubishi

Mixin utilities for extending prototypes


[![Build Status](https://secure.travis-ci.org/techjacker/mitsubishi.png)](http://travis-ci.org/techjacker/mitsubishi)

[![Sauce Labs Browser Test Status](https://saucelabs.com/buildstatus/mitsubishi)](https://saucelabs.com/u/mitsubishi)
[![Sauce Labs Browser Test Status](https://saucelabs.com/browser-matrix/mitsubishi.svg)](https://saucelabs.com/u/mitsubishi)


### Install

#### Node

```Shell
npm install mitsubishi
```

#### Browser

```Shell
component install mitsubishi
```


## Usage

#### mitsubishi.mixinInstanceProps(class, [classes])

```JavaScript
var myStaticClass = {};

/* .mixinInstanceProps() */
mitsubishi.mixinInstanceProps(myStaticClass, [{hello:true}, {world:true}]);

console.log('myStaticClass', myStaticClass);
// outputs: {{hello:true, world:true}
```

#### mitsubishi.mixinProtoProps(class, [classes])

```JavaScript
var myDynamicClass = function () {};
var parentDynamicClass = function () {};

parentDynamicClass.prototype.awesome = blah;

mitsubishi.mixinProtoProps(myDynamicClass, [(new parentDynamicClass), {world:true}]);

console.log('myDynamicClass', myDynamicClass);
// outputs: {{awesome:"blah", world:true}
```


### Docs
[Yuidocs documentation here](docs/index.html)
- fire up the connect server ```$ grunt docs```
- navigate your browser to the [docs](http://localhost:9001)

### API
   - [mitsubishi](#mitsubishi)
<a name=""></a>
 
<a name="mitsubishi"></a>
### mitsubishi
should export all needed API methods.

```js
expect(mitsubishi).to.only.have.keys('instancePropsFromInstantiated', 'protoPropsFromInstantiated', 'protoPropsFromUninstantiated');
done();
```

##### mitsubishi.instancePropsFromInstantiated() - copy instance properties from instantiated dynamic classes as well as object literals.

```js
expect(mitsubishi.instancePropsFromInstantiated({}, [fixtures.A, fixtures.C])).to.only.have.keys('foo', 'bar', 'marbel');
expect(mitsubishi.instancePropsFromInstantiated({}, [fixtures.A, fixtures.B])).to.only.have.keys('foo', 'bar');
expect(mitsubishi.instancePropsFromInstantiated({}, fixtures.A)).to.only.have.keys('foo', 'bar');
expect(mitsubishi.instancePropsFromInstantiated({}, [fixtures.A, (new fixtures.B)])).to.only.have.keys('foo', 'bar', 'blah');
expect(mitsubishi.instancePropsFromInstantiated({}, [(new fixtures.B), fixtures.C])).to.only.have.keys('blah', 'marbel');
done();
```

##### mitsubishi.protoPropsFromInstantiated() - copy poto properties from dynamic classes (if instantiated) as well as object literals.

```js
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
```

##### mitsubishi.protoPropsFromUninstantiated() - copy poto properties from dynamic classes (if UNinstantiated) as well as object literals.

```js
var res = function () {};
##### mitsubishi.protoPropsFromUninstantiated(res.prototype, fixtures.B);
expect(res.prototype).to.have.key('protoproperty');
// expect(mitsubishi.protoPropsFromUninstantiated({}, fixtures.B)).prototype.to.have.key('protoproperty');
done();
```

## License
Copyright (c) 2013 Andrew Griffiths <mail@andrewgriffithsonline.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.