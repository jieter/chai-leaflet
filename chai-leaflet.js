/**
 * chai-leafet
 *
 * Jan Pieter Waagmeester <jieter@jieter.nl>
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['chai'], factory);
    } else if (typeof module !== 'undefined') {
        // Node/CommonJS
        module.exports = factory(require('chai'));
    } else if (typeof window !== 'undefined') {
        chai.use(factory);
    }
})(function (chai) {
    var Assertion = chai.Assertion;

    function almostEqual (a, b, delta) {
        return Math.abs(a - b) < delta;
    }

    function deepAlmostEqual (actual, expected, delta, error) {
        if (delta === undefined) {
            throw new Error('No delta provided');
        }
        error = error || {};
        error.message = '';

        var i;
        if (Array.isArray(actual)) {
            for (i = 0; i < actual.length; i++) {
                if (!deepAlmostEqual(actual[i], expected[i], delta)) {
                    error.message = ' at index ' + i;
                    if (Array.isArray(actual[i]) || typeof actual[i] === 'object') {
                        error.message += ': ' + actual[i] + ' should be almost equal to ' + expected[i];
                    }

                    return false;
                }
            }
        } else if (typeof actual === 'object') {
            for (i in actual) {
                if (typeof actual[i] === 'function') {
                    continue;
                }
                if (!deepAlmostEqual(actual[i], expected[i], delta)) {
                    error.message = ' at key ' + i;
                    if (Array.isArray(actual[i]) || typeof actual[i] === 'object') {
                        error.message += ': ' + actual[i] + ' should be almost equal to ' + expected[i];
                    }

                    return false;
                }
            }
        } else {
            return almostEqual(actual, expected, delta);
        }
        return true;
    }

    Assertion.addMethod('deepAlmostEqual', function (expected, delta) {
        var error = {};
        this.assert(
            deepAlmostEqual(this._obj, expected, delta, error),
            'expected #{act} to be almost equal to #{exp}' + error.message,
            'expected #{act} to be not almost equal to #{exp}' + error.message,
            expected,
            this._obj
        );
    });

    function nearLatLng (expected, delta) {
        delta = delta || 1e-4;

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

    return chai;

});
