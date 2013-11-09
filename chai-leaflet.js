/**
 * chai-leafet
 *
 * Jan Pieter Waagmeester <jieter@jieter.nl>
 */
(function (chaiLeaflet) {
	'use strict';

	// Module systems magic dance.
	if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
		// NodeJS
		module.exports = chaiLeaflet;
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define(function () {
			return chaiLeaflet;
		});
	} else {
		// Other environment (usually <script> tag): plug in to global chai instance directly.
		chai.use(chaiLeaflet);
	}
}(function chaiLeaflet(chai) {
	'use strict';

	var Assertion = chai.Assertion;

	function almostEqual(a, b, delta) {
		return Math.abs(a - b) < delta;
	}

	function deepAlmostEqual(actual, expected, delta) {
		if (Object(actual) === actual && Object(expected) === expected) {
			for (var i in actual) {
				if (!deepAlmostEqual(actual[i], expected[i])) {
					return false;
				}
			}
			return true;
		} else {
			return almostEqual(actual, expected, delta);
		}
	}

	Assertion.addMethod('nearLatLng', function (expected, delta) {
		delta = delta || 1e-4;

		var latlng = this._obj;

		return new Assertion(
			deepAlmostEqual(latlng, expected, delta),
			'expected #{this} to be near #{exp}',
			'expected #{this} not to be near #{exp}'
		);
	});

	Assertion.addMethod('zoom', function (zoom) {
		var map = this._obj;

		return new chai.Assertion(
			map.getZoom() === zoom,
			'expected zoom #{this} to be #{exp}',
			'expected zoom #{this} not to be #{exp}'
		);
	});

	Assertion.addMethod('view', function (center, zoom, delta) {
		var map = this._obj;

		L.latLng(center)
			.should.be.nearLatLng(map.getCenter(), delta);

		if (zoom !== undefined) {
			map.should.have.zoom(zoom);
		}
	});
}));