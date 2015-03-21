define([
    'jquery',
    'underscore',
    'backbone',
    'solmiBasics',
    'helpers/helpers'
], function ($, _, Backbone, sb, helpers) {

    return {
        create: function (toneNumbers) {
            var positionOfDoReMiMajor = {1: 'd', 3: 'r', 5: 'm', 6: 'f', 8: 's', 10: 'l', 12: 't'};
            // later: create positionOfDoReMiMajor automatically out of something like basicTonesMajor
            var positionOfDoReMiMinor = {1: 'l', 3: 't', 4: 'd', 6: 'r', 8: 'm', 9: 'f', 11: 's'};
            var positionOfDoReMi = positionOfDoReMiMajor;
            var noHalves = new Array(5, 12); // m, t
//        if (soundKeyCurrent['mm' === 'minor']) {
            if (sb.soundKeyCurrent['mm'] === 'minor') {
                positionOfDoReMi = positionOfDoReMiMinor;
                noHalves = new Array(3, 8); // t, m
            }
            console.log('toneNumbers:', toneNumbers);

            var solmiArray = new Array();
            for (var i = 0; i < toneNumbers.length; i++) {
                var scaleForThisTone = sb.centralViewScaleForStart;
                var solmiTone = '';
//            var positionInScale = (toneNumbers[i] - 3) / 12;
                var positionInScale = helpers.getPositionInScaleOfToneNumber(toneNumbers[i]);
                console.log('createSolmiArrayFromToneNumbers toneNumbers[i]: ', toneNumbers[i]);
                console.log('createSolmiArrayFromToneNumbers positionInScale: ', positionInScale);
//            var positionInScaleForName = positionInScale.slice();
//            var positionInScaleForName = 0 + positionInScale;
//            var positionInScaleForName = adjustTonePositionAccordingToSoundKey(positionInScale);


                var positionInScaleForName = positionInScale - (sb.soundKeyCurrent['position'] - 1);
                if (positionInScaleForName < 1) {
                    positionInScaleForName += 12;
                    scaleForThisTone += 1;
                }

                var half = '';
                console.log('createSolmiArrayFromToneNumbers positionInScaleForName 1:', positionInScaleForName);
//            var halfExist = $.inArray(positionInScale, sb.positionOfHalvesInScale);
                var halfExist = $.inArray(positionInScaleForName, sb.positionOfHalvesInScale[sb.soundKeyCurrent['mm']]);
                if (halfExist > -1) {

                    var halfNr = -1;
                    if (sb.frequencies[toneNumbers[i]]['whiteKey'] !== 1) { // To make sure that a note of a "full note name" is in the staff in a height accoring to this name (so not used is an alternative with # or b).
                        if (sb.soundKeyCurrent['half'] === 'i') {
                            halfNr = 0;
                        } else if (sb.soundKeyCurrent['half'] === 'u') {
                            halfNr = 1;
                        }
                    }
                    if (halfNr === -1) {
                        halfNr = Math.floor((Math.random() * 2));
                    }
                    if (halfNr === 0) {
                        half = 'u';
                        positionInScaleForName = helpers.getPositionInScaleOfBasicTone(positionInScaleForName + 1);
                    } else {
                        var noHalfIndex = $.inArray(positionInScaleForName, noHalves);
                        if (noHalfIndex === -1) {
                            half = 'i';
                            positionInScaleForName = helpers.getPositionInScaleOfBasicTone(positionInScaleForName - 1);
                        }
                    }
                }
                console.log('createSolmiArrayFromToneNumbers positionInScaleForName 2:', positionInScaleForName);
                console.log('createSolmiArrayFromToneNumbers positionInScaleForName: ', positionInScaleForName);
                console.log('createSolmiArrayFromToneNumbers positionOfDoReMi[positionInScaleForName]: ', positionOfDoReMi[positionInScaleForName]);
                solmiTone += positionOfDoReMi[positionInScaleForName] + half;
                var scaleOfToneNumber = sb.frequencies[toneNumbers[i]]['scale'];
                var scalesDiff = scaleForThisTone - scaleOfToneNumber;
//            console.log('createSolmiArrayFromToneNumbers scalesDiff: ', scalesDiff);
                if (scalesDiff !== 0) {
                    if (scalesDiff > 0) {
                        for (var sc = 0; sc < scalesDiff; sc++) {
                            solmiTone += ",";
                        }
                    }
                    if (scalesDiff < 0) {
                        for (var sc = 0; sc > scalesDiff; sc--) {
                            solmiTone += "'";
                        }
                    }
                }

                solmiArray.push(solmiTone);
            }
            console.log('createSolmiArrayFromToneNumbers solmiArray: ', solmiArray);
            return solmiArray;

        }
    };
});