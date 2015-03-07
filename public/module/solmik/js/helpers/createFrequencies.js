define([
    'jquery',
    'underscore',
    'backbone',
    'helpers/helpers'
], function ($, _, Backbone, helpers) {

    var positionOfFullInScale;
    var soundKeys2;
    var basicTonesMajor2;
    var basicTonesMinorRaw2;

    return {
        getFrequenciesInfo: function (soundKeys2a, basicTonesMajor2a, basicTonesMinorRaw2a,
                positionOfHalvesInScale, positionOfFullInScale1, noteNamesEnglish) {
//            this.positionOfFullInScale = positionOfFullInScale;
            positionOfFullInScale = positionOfFullInScale1;
            basicTonesMajor2 = basicTonesMajor2a;
            basicTonesMinorRaw2 = basicTonesMinorRaw2a;
            soundKeys2 = soundKeys2a;
            var frequencies = {};
            frequencies = {};
            var positionOf7 = 0;
            var mmArray = ['major', 'minor'];
            for (var f = 4; f <= 111; f++) { // maybe later 99 instead of 111
//        for (var f = 4; f <= 4; f++) {
                frequencies[f] = {};
                var frequency = (Math.pow(2, (f - 49) / 12) * 440);
                frequencies[f]['hertz'] = frequency.toFixed(2);
                frequencies[f]['scale'] = Math.ceil((f - 3) / 12);
                var scalePositionOf12 = helpers.getPositionInScaleOfToneNumber(f);
                frequencies[f]['scalePositionOf12'] = scalePositionOf12;
                frequencies[f]['noteNameEnglish'] = noteNamesEnglish[scalePositionOf12][0];
                var likeWhiteKey = 1;
                var halfPosition = $.inArray(scalePositionOf12, positionOfHalvesInScale['major']);
                if (halfPosition > -1) {
                    likeWhiteKey = 0;
                }
                frequencies[f]['whiteKey'] = likeWhiteKey;
                positionOf7 += likeWhiteKey;
                frequencies[f]['positionOf7'] = positionOf7;
                frequencies[f]['soundKey'] = {};
                for (var m = 0; m < mmArray.length; m++) {
                    frequencies[f]['soundKey'][mmArray[m]] = {};
                    for (var sKey = 1; sKey <= 12; sKey++) {
//                for (var sKey = 1; sKey <= 4; sKey++) {
//                var soundKeyBaseFrequency = i - 3
                        if (soundKeys2[mmArray[m]][sKey]) {
                            var solmiToneInfo = this.getSolmiToneOfSoundKeyFromFrequency(f, sKey, mmArray[m], scalePositionOf12);
                            frequencies[f]['soundKey'][mmArray[m]][sKey] = solmiToneInfo;
                            frequencies[f]['soundKey'][mmArray[m]][sKey]['name'] = soundKeys2[mmArray[m]][sKey]['name'];
//                        console.log('getFrequenciesInfo frequencies: ', frequencies);
//                        dgsrdfgdg
                        }
                    }
                }
            }
            console.log('getFrequenciesInfo frequencies: ', frequencies);
//            var frequenciesString = JSON.stringify(frequencies);
//            $('#solmi-strings').after('<pre>' + frequenciesString + '</pre>');
            return frequencies;
        },
        getSolmiToneOfSoundKeyFromFrequency: function (frequencyNr, soundKeyNr, mm, scalePosition) {
            //        var scalePosition = getPositionInScaleOfToneNumber(frequencyNr);
            var scaleBaseFrequencyNr = frequencyNr - (scalePosition - 1);
            var soundKeyBaseFrequencyNr = scaleBaseFrequencyNr + (soundKeyNr - 1);
            var solmiToneNr = helpers.getPositionInScaleOfBasicTone(frequencyNr - soundKeyBaseFrequencyNr + 1);

            var solmiToneNr2 = $.inArray(solmiToneNr, positionOfFullInScale[mm]);

            var solmiToneInfo = {};
            solmiToneInfo['TEST10-frequencyNr'] = frequencyNr;
            solmiToneInfo['TEST20-soundKeyNr'] = soundKeyNr;
            solmiToneInfo['TEST30-scalePosition'] = scalePosition;
            solmiToneInfo['TEST40-scaleBaseFrequencyNr'] = scaleBaseFrequencyNr;
            solmiToneInfo['TEST50-soundKeyBaseFrequencyNr'] = soundKeyBaseFrequencyNr;
            solmiToneInfo['TEST60-solmiToneNr-1'] = solmiToneNr;
            solmiToneInfo['TEST70-solmiToneNr2'] = solmiToneNr2;

            solmiToneInfo['basicToneNrOf12orig'] = solmiToneNr;
            var half = '';
            if (solmiToneNr2 === -1) {
                var half = soundKeys2[mm][soundKeyNr]['half'];
                solmiToneInfo['TEST80-half'] = half;
                if (half === 'u') {
                    solmiToneNr++;
                } else if (half === 'i') {
                    solmiToneNr--;
                } else if (half === '') { // for soundKey C, a
                    solmiToneNr--;
                    half = 'i';
                }
                solmiToneInfo['TEST90-half'] = half;
            }
            if (mm === 'major') {
                solmiToneInfo['basicTone'] = basicTonesMajor2[solmiToneNr];
                solmiToneInfo['TEST110-basicTone-major'] = basicTonesMajor2[solmiToneNr];
            } else {
                solmiToneInfo['basicTone'] = basicTonesMinorRaw2[solmiToneNr];
                solmiToneInfo['TEST120-basicTone-minor'] = basicTonesMinorRaw2[solmiToneNr];
            }
            solmiToneInfo['basicToneNrOf12'] = solmiToneNr;
            solmiToneInfo['activeHalf'] = half;
            return solmiToneInfo;
        }
    };
});