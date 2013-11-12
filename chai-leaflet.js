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
		if (delta === undefined) {
			throw new Error('No delta provided');
		}

		var i;
		if (Array.isArray(actual)) {
			for (i = 0; i < actual.length; i++) {
				if (!deepAlmostEqual(actual[i], expected[i], delta)) {
					return false;
				}
			}
		} else if (typeof actual === 'object') {
			for (i in actual) {
				if (typeof actual[i] === 'function') {
					continue;
				}
				if (!deepAlmostEqual(actual[i], expected[i], delta)) {
					return false;
				}
			}
		} else {
			return almostEqual(actual, expected, delta);
		}
		return true;
	}

	Assertion.addMethod('deepAlmostEqual', function (expected, delta) {
		this.assert(
			deepAlmostEqual(this._obj, expected, delta),
			'expected #{act} to be almost equal to #{exp}',
			'expected #{act} to be not almost equal to #{exp}',
			expected,
			this._obj
		);
	});

	function nearLatLng(expected, delta) {
		delta = delta || 1e-4;

		/* jshint validthis:true */
		new Assertion(
			this._obj,
			'expected #{act} to be a L.LatLng object'
		).to.be.an.instanceof(L.LatLng);

		var actual = this._obj;
		expected = L.latLng(expected);

		this.assert(
			deepAlmostEqual(actual, expected, delta),
			'expected #{act} to be near #{exp}',
			'expected #{act} not to be near #{exp}',
			expected.toString(),
			actual.toString()
		);
	}
	Assertion.addMethod('nearLatLng', nearLatLng);
	Assertion.addMethod('near', nearLatLng);

	Assertion.addMethod('zoom', function (zoom) {
		new Assertion(
			this._obj,
			'expected #{act} to be a L.Map'
		).to.be.an.instanceof(L.Map);

		new Assertion(
			zoom,
			'expect zoom to be a number'
		).to.be.a('number');

		var actual = this._obj.getZoom();

		this.assert(
			actual === zoom,
			'expected zoom #{act} to be #{exp}',
			'expected zoom #{act} not to be #{exp}',
			zoom,
			actual
		);
	});

	Assertion.addMethod('view', function (center, zoom, delta) {
		new Assertion(
			this._obj,
			'expected #{act} to be a L.Map'
		).to.be.an.instanceof(L.Map);

		var map = this._obj;

		L.latLng(center)
			.should.be.nearLatLng(map.getCenter(), delta);

		if (zoom !== undefined) {
			map.should.have.zoom(zoom);
		}
	});
}));