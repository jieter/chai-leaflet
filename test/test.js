'use strict';

describe('chai-leaflet', function () {
	chai.should();

	describe('nearLatLng', function () {
		it('works', function () {
			var latlng = L.latLng(51, 4);

			latlng.should.be.nearLatLng(latlng);
			latlng.should.not.be.nearLatLng(L.latLng([4, 51]));
		});

		it('with bigger delta', function () {
			var latlng = L.latLng(51.0001, 4.0009);

			var delta = 0.1;

			latlng.should.be.nearLatLng(L.latLng(51.01, 4.01), delta);
			latlng.should.not.be.nearLatLng(L.latLng(51.4, 4.4), delta);
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