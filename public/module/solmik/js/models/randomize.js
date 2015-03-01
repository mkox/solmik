define([
    'jquery',
    'underscore',
    'backbone',
    'solmiBasics',
    'helpers/createSolmiArrayFromToneNumbers'
], function ($, _, Backbone, sb, createSolmiArrayFromToneNumbers) {

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
            var randomToneNumbers = that.randomizeToneNumbers();
            var solmiArray = createSolmiArrayFromToneNumbers.create(randomToneNumbers);
            return solmiArray;

        },
        randomizeToneNumbers: function () {
            var toneSequence = new Array();
            var numberOfValidTones = sb.randomRange[1] - sb.randomRange[0] + 1;
            for (var i = 0; i < sb.numberOfNotesInStaffCurrent; i++) {
                var randomToneNumber = Math.floor((Math.random() * numberOfValidTones) + sb.randomRange[0]);
                toneSequence.push(randomToneNumber);
            }
            return toneSequence;
        },
        randomizeSoundKeys: function () {
//        var numberOfSoundKeys = Object.keys(soundKeys['major']).length + Object.keys(soundKeys['minor']).length;
            var soundKeysArray = new Array();
            if (sb.currentRandomMode === 'withSoundKeys' || sb.currentRandomMode === 'withSoundKeysMajor') {
                for (var key in sb.soundKeys['major']) {
                    soundKeysArray.push(key);
                }
            }
            if (sb.currentRandomMode === 'withSoundKeys' || sb.currentRandomMode === 'withSoundKeysMinor') {
                for (var key in sb.soundKeys['minor']) {
                    soundKeysArray.push(key);
                }
            }
            var randomKey = soundKeysArray[Math.floor((Math.random() * soundKeysArray.length))];
            sb.setSoundKeyCurrent(randomKey);
        }

    };
});