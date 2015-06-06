define([
    'jquery',
    'underscore',
    'backbone',
    'solmiBasics',
    'helpers/createSolmiArrayFromToneNumbers'
], function ($, _, Backbone, sb, createSolmiArrayFromToneNumbers) {

    function createToneNumberForSelectedSyllable(syllable) {

        var toneNumbers = [];
        for (var i = sb.randomRange[0]; i <= sb.randomRange[1]; i++) {
            if (syllable === sb.frequencies[i]['soundKey'][sb.soundKeyCurrent['mm']][sb.soundKeyCurrent['position']]['basicTone']
                    && sb.frequencies[i]['soundKey'][sb.soundKeyCurrent['mm']][sb.soundKeyCurrent['position']]['activeHalf'] === '') {
                toneNumbers.push(i);
            }
        }

        if (toneNumbers.length > 0) {
            var arrayPosition = Math.floor((Math.random() * toneNumbers.length));

            return toneNumbers[arrayPosition];
        } else {
            return 0;
        }
    }

    return {
        randomize: function (currentField) {
            var that = this;
            console.log('randomize currentField: ', currentField);
            var toneMin = parseInt($(currentField).parent('form').find('.tone-min').val());
            var toneMax = parseInt($(currentField).parent('form').find('.tone-max').val());
            if (toneMax < toneMin) {
                alert(sb.messageMaxToneNotSmallerThanMin);
                throw new Error(sb.messageMaxToneNotSmallerThanMin);
            }
            sb.randomRange = Array(toneMin, toneMax);
            sb.currentRandomMode = $(currentField).parent('form').find('#random-modes').val();
            if (sb.currentRandomMode === 'withoutSoundKeys') {
                var soundKey = $(currentField).parent('form').find('.sound-keys').val();
                sb.setSoundKeyCurrent(soundKey);
            } else {
                that.randomizeSoundKeys();
            }
            sb.numberOfNotesInStaffCurrent = parseInt($(currentField).parent('form').find('.number-of-notes-in-staff').val());
            sb.maxDeviationFromFirstSound = parseInt($(currentField).parent('form').find('.max-deviation-from-first-sound').val());
            var randomToneNumbers = that.randomizeToneNumbers(toneMin, toneMax);
            var solmiArray = createSolmiArrayFromToneNumbers.create(randomToneNumbers);
            return solmiArray;

        },
        randomizeToneNumbers: function (toneMin, toneMax) {
            var toneSequence = new Array();
            var numberOfValidTones = sb.randomRange[1] - sb.randomRange[0] + 1;
            var syllableOfFirstTone = $('#random #syllableOfFirstTone').val();
            for (var i = 0; i < sb.numberOfNotesInStaffCurrent; i++) {
                var randomToneNumber = 0;
                if (i === 0 && syllableOfFirstTone !== '-') {
                    randomToneNumber = createToneNumberForSelectedSyllable(syllableOfFirstTone);
                }
                while (randomToneNumber === 0) {
                    var randomToneNumberTemp = Math.floor((Math.random() * numberOfValidTones) + sb.randomRange[0]);
                    if (sb.noIU === false) {
                        randomToneNumber = randomToneNumberTemp;
                    } else {
                        if (sb.frequencies[randomToneNumberTemp]['soundKey'][sb.soundKeyCurrent['mm']][sb.soundKeyCurrent['position']]['activeHalf'] === '') {
                            randomToneNumber = randomToneNumberTemp;
                        }
                    }
                }
                if (i === 0 && sb.maxDeviationFromFirstSound > 0) {
                    sb.randomRange = [Math.max(sb.randomRange[0], randomToneNumber - sb.maxDeviationFromFirstSound),
                        Math.min(sb.randomRange[1], randomToneNumber + sb.maxDeviationFromFirstSound)];
                    numberOfValidTones = sb.randomRange[1] - sb.randomRange[0] + 1;
                }
                toneSequence.push(randomToneNumber);
            }
            return toneSequence;
        },
        randomizeSoundKeys: function () {

            var soundKeysArray = new Array();
            if (sb.currentRandomMode === 'withSoundKeysMajor') {
                for (var key in sb.soundKeys['major']) {
                    soundKeysArray.push(key);
                }
            } else if (sb.currentRandomMode === 'withSoundKeysMinor') {
                for (var key in sb.soundKeys['minor']) {
                    soundKeysArray.push(key);
                }
            }
            var randomKey = soundKeysArray[Math.floor((Math.random() * soundKeysArray.length))];
            sb.setSoundKeyCurrent(randomKey);
        }

    };
});