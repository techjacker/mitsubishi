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

##### Component.js

```Shell
component install mitsubishi
```


## Examples

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
expect(mitsubishi).to.only.have.keys('mixinInstanceProps', 'mixinProtoProps');
done();
```

##### mitsubishi.mixinInstanceProps() - copy instance properties from instantiated dynamic classes as well as object literals.

```js
expect(mitsubishi.mixinInstanceProps({}, [fixtures.A, fixtures.C])).to.only.have.keys('foo', 'bar', 'marbel');
expect(mitsubishi.mixinInstanceProps({}, [fixtures.A, fixtures.B])).to.only.have.keys('foo', 'bar');
expect(mitsubishi.mixinInstanceProps({}, fixtures.A)).to.only.have.keys('foo', 'bar');
expect(mitsubishi.mixinInstanceProps({}, [fixtures.A, (new fixtures.B)])).to.only.have.keys('foo', 'bar', 'blah');
expect(mitsubishi.mixinInstanceProps({}, [(new fixtures.B), fixtures.C])).to.only.have.keys('blah', 'marbel');
done();
```

##### mitsubishi.mixinProtoPropsMulti() - copy poto properties from dynamic classes (if instantiated) as well as object literals.

```js
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