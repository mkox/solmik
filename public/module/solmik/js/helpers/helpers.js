define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    return {
        array_flip: function (trans) { // Not used at the moment             var key, tmp_ar = {};

            for (key in trans) {
                if (trans.hasOwnProperty(key)) {
                }
                {
                    tmp_ar[trans[key]] = key;
                }
            }
            return tmp_ar;
        },
        //DEPRECIATED:
        createFrequencies: function () {
            var frequencies = '';
            for (var i = 1; i <= 111; i++) { // Later: Calculate 111
                var frequency = (Math.pow(2, (i - 49) / 12) * 440);
                frequencies += '"' + i + '":' + frequency.toFixed(2) + ',';
            }
            frequencies = frequencies.slice(0, frequencies.length - 1);
            return JSON.parse('{' + frequencies + '}');
        },
        flipObject: function (original) {
            var flipped = {};
            $.each(original, function (i, el) {
                flipped[el] = i;
            });
            return flipped;
        },
        getPositionInScaleOfBasicTone: function (basicTone) {
            if (basicTone < 0) {
                basicTone += 12;
            }
            var position = basicTone % 12;
            if (position === 0) {
                position = 12;
            }
            return position;
        },
        getPositionInScaleOfToneNumber: function (toneNumber) {
            var position = (toneNumber - 3) % 12;
            if (position === 0) {
                position = 12;
            }
            return position;
        },
        scalesLimit: function (scaleRange) {
            var scalesLimit = '';
            for (var i = scaleRange[0]; i <= scaleRange[1]; i++) {
                scalesLimit += '"' + i + '":' + '{"super":' + (scaleRange[1] - i) + ',"sub":' + (i - scaleRange[0]) + '},';

            }
            scalesLimit = scalesLimit.slice(0, scalesLimit.length - 1);
            return JSON.parse('{' + scalesLimit + '}');
        },
        setPositionStaffForSoundKey: function (positionOfHalvesInScale, position, mm) {
            console.log('helpers.js setPositionStaffForSoundKey');
            var positionStaff = position;
            for (var i = 0; i < positionOfHalvesInScale[mm].length; i++) {
                if (positionOfHalvesInScale[mm][i] < position) {
                    positionStaff -= 1;
                }
            }
            return positionStaff;
        },
        setScalesCurrent: function (scaleRange, centralViewScale, scalesCurrent) {

            if (scalesCurrent.length > 0) {
                $('#all-squares .squares-3x3').removeClass('scale-pos-' + scalesCurrent.join(' scale-pos-'));
            }
//            console.log('setScalesCurrent, centralViewScale', centralViewScale);
//            console.log('setScalesCurrent, scalesCurrent before', scalesCurrent);
//            console.log('setScalesCurrent, scaleRange', scaleRange);
            if (centralViewScale > scaleRange[0] && centralViewScale < scaleRange[1]) {
                scalesCurrent = [centralViewScale + 1, centralViewScale, centralViewScale - 1];
            }

            console.log('setScalesCurrent, scalesCurrent after', scalesCurrent);
            $('#all-squares .squares-3x3').each(function (index) {
                $(this).addClass('scale-pos-' + scalesCurrent[index]);
            });
            return scalesCurrent;
        }
    };
});