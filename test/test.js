'use strict';

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

	});

	describe('nearLatLng', function () {
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

	describe('should.have.zoom', function () {
		it('checks zoom correctly', function () {
			var map = L.map(document.createElement('div'));

			map.setView([1, 2], 3);

			map.should.have.zoom(3);
			map.should.not.have.zoom(4);
		});
	});

	describe('should.have.view', function () {
		it('checks view correctly', function () {
			var map = L.map(document.createElement('div'));

			map.setView([1, 2], 3);

			map.should.have.view([1, 2], 3);
		});
	});
});