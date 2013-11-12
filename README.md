# chai-leaflet

Chai assertions to test Leaflet apps.

## Usage
In the browser, just add `<script src="chai-leaflet.js"></script>` after including chai. Now you can write tests like this:

```JavaScript
chai.should();

it('example', function () {
	latlng.should.be.near([51, 4]);

	map.should.have.view([33, 2], 4);

	map.should.have.zoom(18);
});
```

Because chai-leaflet depends on a global `L` it does not work out of the box on node.js. You may use [leaflet-headless](https://github.com/jieter/leaflet-headless) to work around that.

```JavaScript

var L = require('leaflet-headless');
var chai = require('chai');
chai.use(require('chai-leaflet'));

chai = chai.should();

// your tests here
```