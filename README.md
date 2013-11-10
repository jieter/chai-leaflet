# chai-leaflet

Chai assertions to test Leaflet apps. Most stuff is currently only for the browser, because `L` is expected to be defined and Leaflet needs a `window` object to function.

## examples
```JavaScript

latlng.should.be.near([51, 4]);

map.should.have.view([33, 2], 4);

map.should.have.zoom(18);

```



