'use strict';

if (typeof window === 'undefined') {
    try {
        var L = require('leaflet-headless');
    } catch (e) {
        throw 'Package leaflet-headless needs to be installed: npm install leaflet-headless';
    }
    var chai = require('chai');

    require('../chai-leaflet.js');
}

describe('chai-leaflet', function () {
    chai.should();

    describe('deepAlmostEqual', function () {
        it('array of numbers', function () {
            [1, 2].should.be.deepAlmostEqual([1, 2], 0.1);
            [1.0, 2.0].should.be.deepAlmostEqual([1, 2], 0.1);
            [1.01, 2.02].should.be.deepAlmostEqual([1, 2], 0.1);
        });

        it('negated version', function () {
            [1, 2].should.not.be.deepAlmostEqual([1, 3], 1);
        });

        it('nested arrays with numbers', function () {
            var array = [
                [1.001, 1002],
                [1, 2],
                [3, 4],
                [ [4, 5], [5, 6] ],
                3.44
            ];

            array.should.be.deepAlmostEqual(array, 0.1);
        });

        it('map with arrays and numbers', function () {
            var obj = {
                foo: [1, 3.00],
                floats: 0.3234,
                options: {
                    center: [3, 4]
                }
            };

            obj.should.be.deepAlmostEqual(obj, 0.1);
        });

        describe('error messages', function () {
            var fn;

            it('should report the right index', function () {
                fn = function () {
                    [1, 2, 3, 4].should.be.deepAlmostEqual([1, 2, 3, 5], 0.1);
                };

                fn.should.throw('expected [ 1, 2, 3, 4 ] to be almost equal to [ 1, 2, 3, 5 ] at index 3');
            });
            it('should display the second level if type is array/object', function () {
                fn = function () {
                    [
                        [1, 2],
                        [2, 3]
                    ].should.be.deepAlmostEqual([
                        [1, 2],
                        [4, 4]
                    ], 0.1);
                };
                fn.should.throw('expected [ [ 1, 2 ], [ 2, 3 ] ] to be almost equal to ' +
                    '[ [ 1, 2 ], [ 4, 4 ] ] at index 1: 2,3 should be almost equal to 4,4');
            });

            it('should report the key for objects', function () {
                fn = function () {
                    var obj = {
                        foo: [1, 2],
                        bar: [1, 2, 3]
                    };

                    obj.should.be.deepAlmostEqual({
                        foo: [1, 2],
                        bar: [1, 3, 4]
                    }, 0.1);
                };
                fn.should.throw('expected { foo: [ 1, 2 ], bar: [ 1, 2, 3 ] } to be almost equal to ' +
                    '{ foo: [ 1, 2 ], bar: [ 1, 3, 4 ] } at key bar: 1,2,3 should be almost equal to 1,3,4');
            });
        });
    });

    describe('should.be.', function () {
        describe('near', function () {
            it('works', function () {
                var latlng = L.latLng(51, 4);

                latlng.should.be.near(latlng);
                latlng.should.be.near([51, 4]);
            });

            it('negating works', function () {
                var latlng = L.latLng(51, 4);
                latlng.should.not.be.near(L.latLng([4, 51]));
            });

            it('with bigger delta', function () {
                var latlng = L.latLng(51.0001, 4.0009);

                var delta = 0.1;

                latlng.should.be.near(L.latLng(51.01, 4.01), delta);
                latlng.should.not.be.near(L.latLng(51.4, 4.4), delta);
            });
        });
    });

    describe('should.have.', function () {
        describe('zoom', function () {
            it('fails for non-map objects', function () {
                var fn = function () {
                    L.latLng([1, 2]).should.have.zoom([1, 2]);
                };

                fn.should.throw;
            });

            it('checks zoom correctly', function () {
                var map = L.map(document.createElement('div'));

                map.setView([1, 2], 3);

                map.should.have.zoom(3);
                map.should.not.have.zoom(4);
            });
        });

        describe('view', function () {
            it('fails for non-map objects', function () {
                var fn = function () {
                    L.latLng([1, 2]).should.have.view([1, 2]);
                };

                fn.should.throw;
            });

            it('checks view correctly', function () {
                var map = L.map(document.createElement('div'));

                map.setView([1, 2], 3);

                map.should.have.view([1, 2], 3);
            });
        });
    });
});
