define('helpers/helpers',[
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

//    return function () {
//        that = this;
    return {
//    var handler = {
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
//        //DEPRECIATED:
//        getScaleOfToneNumber: function (toneNumber) {
//            return Math.ceil((toneNumber - 3) / 12);
//        },
        scalesLimit: function (scaleRange) {
            var scalesLimit = '';
            for (var i = scaleRange[0]; i <= scaleRange[1]; i++) {
                scalesLimit += '"' + i + '":' + '{"super":' + (scaleRange[1] - i) + ',"sub":' + (i - scaleRange[0]) + '},';

            }
            scalesLimit = scalesLimit.slice(0, scalesLimit.length - 1);
            return JSON.parse('{' + scalesLimit + '}');
        },
//        setIfFrequencyNrIsHalf: function (staffRange, positionOfHalvesInScale) { // at the moment only useful for staff
//            console.log('helpers.js setIfFrequencyNrIsHalf, this', this);
//            var frequencyNrIsHalf = {};
//            for (var i = staffRange[0]; i < staffRange[1]; i++) {
//                var scalePosition = this.getPositionInScaleOfToneNumber(i);
//                var halfPosition = $.inArray(scalePosition, positionOfHalvesInScale['major']);
//                if (halfPosition > -1) {
//                    frequencyNrIsHalf[i] = 1;
//                } else {
//                    frequencyNrIsHalf[i] = 0;
//                }
//            }
//            return frequencyNrIsHalf;
//        },
        setPositionStaffForSoundKey: function (positionOfHalvesInScale, position, mm) {
            console.log('helpers.js setPositionStaffForSoundKey');
            //    function setPositionStaffForSoundKey(position, mm, positionCorrection) {
            var positionStaff = position;
            for (var i = 0; i < positionOfHalvesInScale[mm].length; i++) {
                if (positionOfHalvesInScale[mm][i] < position) {
                    //            if (positionOfHalvesInScale[mm][i] < (position + positionCorrection)) {
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
//    return {handler: handler };
//    };
});
define('helpers/createFrequencies',[
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
        getFrequenciesInfo: function (soundKeys2a, basicTonesMajor2a, basicTonesMinorRaw2a, positionOfHalvesInScale, positionOfFullInScale1) {
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
define('solmiBasics',[
    'jquery',
    'underscore',
    'backbone',
    'helpers/helpers',
    'helpers/createFrequencies'
], function ($, _, Backbone, helpers, createFrequencies) {
//define(function(){
    console.log('solmiBasics.js 1, helpers', helpers);

    var basicTones = new Array('d', 'r', 'm', 'f', 's', 'l', 't');
    var basicTonesMajor = {'d': 1, 'r': 3, 'm': 5, 'f': 6, 's': 8, 'l': 10, 't': 12};
    var basicTonesMajor2 = helpers.flipObject(basicTonesMajor);
    var basicTonesMinorRaw = {'l': 1, 't': 3, 'd': 4, 'r': 6, 'm': 8, 'f': 9, 's': 11};
    var basicTonesMinorRaw2 = helpers.flipObject(basicTonesMinorRaw);
    var basicTonesMinor = {'l': 1 + 12, 't': 3 + 12, 'd': 4, 'r': 6, 'm': 8, 'f': 9, 's': 11};

    var scaleRange = [1, 9];
    var centralViewScaleForStart = 4;
    var centralViewScale = 0 + centralViewScaleForStart;

    var scalesCurrent = [];
    scalesCurrent = helpers.setScalesCurrent(scaleRange, centralViewScale, scalesCurrent);
    console.log('solmiBasics.js scalesCurrent', scalesCurrent);
    var scalesLimit = helpers.scalesLimit(scaleRange);
//    var notesInStaffStart = {'signature-start-left': 60, 'start-left': 120, 'start-bottom': 107, 'height-diff': 7, 'notes-diff': 4,
//        'notes-left-current': 0, 'note-width': 35, 'inter-tone-signs-width': 6, 'continue': true};
    var notesInStaffStart = {'signature-start-left': 60, 'start-left': 120, 'start-bottom': 110, 'height-diff': 6.8, 'notes-diff': 4,
        'notes-left-current': 0, 'note-width': 35, 'inter-tone-signs-width': 6, 'continue': true};

    var staffRange = [16, 64];
    var positionOfHalvesInScale = {'major': [2, 4, 7, 9, 11], 'minor': [2, 5, 7, 10, 12]};
    var positionOfFullInScale = {'major': [1, 3, 5, 6, 8, 10, 12], 'minor': [1, 3, 4, 6, 8, 9, 11]};
//    var frequencyNrIsHalf = helpers.setIfFrequencyNrIsHalf(staffRange, positionOfHalvesInScale);

    //DEPRECIATED:
    var soundKeys = {
        major: {
            'C': {'position': 1, 'half': '', 'signs': 0}, 'Des': {'position': 2, 'half': 'u', 'signs': 5},
            'D': {'position': 3, 'half': 'i', 'signs': 2}, 'Es': {'position': 4, 'half': 'u', 'signs': 3},
            'E': {'position': 5, 'half': 'i', 'signs': 4}, 'F': {'position': 6, 'half': 'u', 'signs': 1},
            'G': {'position': 8, 'half': 'i', 'signs': 1}, 'As': {'position': 9, 'half': 'u', 'signs': 4},
            'A': {'position': 10, 'half': 'i', 'signs': 3}, 'B': {'position': 11, 'half': 'u', 'signs': 2},
            'H': {'position': 12, 'half': 'i', 'signs': 5}
        }, // (Not in List: 7->fis/ges)
        minor: {
            'c': {'position': 1, 'half': 'u', 'signs': 3}, 'cis': {'position': 2, 'half': 'i', 'signs': 4},
            'd': {'position': 3, 'half': 'u', 'signs': 1}, 'e': {'position': 5, 'half': 'i', 'signs': 1},
            'f': {'position': 6, 'half': 'u', 'signs': 4}, 'fis': {'position': 7, 'half': 'i', 'signs': 3},
            'g': {'position': 8, 'half': 'u', 'signs': 2}, 'gis': {'position': 9, 'half': 'i', 'signs': 5},
            'a': {'position': 10, 'half': '', 'signs': 0}, 'b': {'position': 11, 'half': 'u', 'signs': 5},
            'h': {'position': 12, 'half': 'i', 'signs': 2}
        } // (Not in List: 4->dis/es)
    }
    ; // 2: Des + cis; 9: As + gis

    var soundKeys2 = {
        major: {
            1: {'name': 'C', 'position': 1, 'half': '', 'signs': 0}, 2: {'name': 'Des', 'position': 2, 'half': 'u', 'signs': 5},
            3: {'name': 'D', 'position': 3, 'half': 'i', 'signs': 2}, 4: {'name': 'Es', 'position': 4, 'half': 'u', 'signs': 3},
            5: {'name': 'E', 'position': 5, 'half': 'i', 'signs': 4}, 6: {'name': 'F', 'position': 6, 'half': 'u', 'signs': 1},
            7: {'name': 'Fis', 'position': 7, 'half': 'i', 'signs': 6}, 8: {'name': 'G', 'position': 8, 'half': 'i', 'signs': 1},
            9: {'name': 'As', 'position': 9, 'half': 'u', 'signs': 4}, 10: {'name': 'A', 'position': 10, 'half': 'i', 'signs': 3},
            11: {'name': 'B', 'position': 11, 'half': 'u', 'signs': 2}, 12: {'name': 'H', 'position': 12, 'half': 'i', 'signs': 5}
        }, // (Was first not in List: 7->fis/ges)
        minor: {
            1: {'name': 'c', 'position': 1, 'half': 'u', 'signs': 3}, 2: {'name': 'cis', 'position': 2, 'half': 'i', 'signs': 4},
            3: {'name': 'd', 'position': 3, 'half': 'u', 'signs': 1}, 4: {'name': 'es', 'position': 4, 'half': 'u', 'signs': 6},
            5: {'name': 'e', 'position': 5, 'half': 'i', 'signs': 1}, 6: {'name': 'f', 'position': 6, 'half': 'u', 'signs': 4},
            7: {'name': 'fis', 'position': 7, 'half': 'i', 'signs': 3}, 8: {'name': 'g', 'position': 8, 'half': 'u', 'signs': 2},
            9: {'name': 'gis', 'position': 9, 'half': 'i', 'signs': 5}, 10: {'name': 'a', 'position': 10, 'half': '', 'signs': 0},
            11: {'name': 'b', 'position': 11, 'half': 'u', 'signs': 5}, 12: {'name': 'h', 'position': 12, 'half': 'i', 'signs': 2}
        } // (Was first not in List: 4->dis/es)
    }; // 2: Des + cis; 9: As + gis

//return {
//baseToneLength: 500
//}
    return {
//    var xreturn = {
        baseToneLength: 500,
        basicTones: basicTones,
        basicTonesMajor: basicTonesMajor,
        basicTonesMajor2: basicTonesMajor2,
        basicTonesMinorRaw: basicTonesMinorRaw,
        basicTonesMinorRaw2: basicTonesMinorRaw2,
        basicTonesMinor: basicTonesMinor,
        basicTonesMajorStaff: {'d': 1, 'r': 2, 'm': 3, 'f': 4, 's': 5, 'l': 6, 't': 7},
//    var basicTonesMinorStaff = {'l': 1, 't': 2, 'd': 3, 'r': 4, 'm': 5, 'f': 6, 's': 7};
        basicTonesMinorStaff: {'l': 1 + 7, 't': 2 + 7, 'd': 3, 'r': 4, 'm': 5, 'f': 6, 's': 7},
        tonePositions: {'d': [3, 1], 'r': [3, 2], 'm': [3, 3], 'f': [2, 2], 's': [2, 3], 'l': [1, 2], 't': [1, 3]},
        currentNumberOfPlaying: 1,
        remainingNumberOfPlaying: 1,
//    scaleRange: Array(1, 9), // Value should later be created automatically;
        scaleRange: scaleRange, // Value should later be created automatically;
        centralViewScaleForStart: centralViewScaleForStart,
        //var centralViewScale = centralViewScaleForStart.slice();  // used for staff and solmi view
//    var centralViewScale = $.extend(true, {}, centralViewScaleForStart);  // used for staff and solmi view
        centralViewScale: centralViewScale, // used for staff and solmi view
//    console.log('centralViewScale: ', centralViewScale);
//    scalesCurrent: new Array(), <- before require.js
        scalesCurrent: scalesCurrent,
//    setScalesCurrent: helpers.setScalesCurrent(),
        scalesLimit: scalesLimit,
//    console.log('scalesLimit:', scalesLimit);
//    var positionOfHalvesInScale = new Array(2, 4, 7, 9, 11); // u, i
        positionOfHalvesInScale: positionOfHalvesInScale,
        positionOfFullInScale: positionOfFullInScale,
        positionInSquare: {'n': 'center', 'u': 'center bottom', 'i': 'center top'},
//    var soundKeys = new Array(soundKeysMajor, soundKeysMinor);
        soundKeys: soundKeys, // //DEPRECIATED
        soundKeys2: soundKeys2,
        startTimeOfPlay: 0, //0 since require.js
        currentTimeOfPlay: 0,
        positonsSharp: new Array(0, -3, 1, -2, -5),
        positonsFlat: new Array(0, 3, -1, 2, -2),
        soundKeyCurrent: {'key': 'C', 'position': 1, 'position_staff': 1, 'half': '', 'signs': 0, 'mm': 'major'},
        setSoundKeyCurrent: function (soundKey) {
            var soundKeyArray = soundKey.split('');
            var mm = '';
            (soundKeyArray[0] === soundKeyArray[0].toUpperCase()) ? mm = 'major' : mm = 'minor';
            this.soundKeyCurrent = this.soundKeys[mm][soundKey];
            this.soundKeyCurrent['mm'] = mm;
            this.soundKeyCurrent['key'] = soundKey;
            this.soundKeyCurrent['position_staff'] = helpers.setPositionStaffForSoundKey(this.positionOfHalvesInScale, this.soundKeyCurrent['position'], this.soundKeyCurrent['mm']);
            //        soundKeyCurrent['position_half_relative'] = setPositionHalfRelative(soundKeyCurrent['position'], soundKeyCurrent['mm'], soundKeyCurrent['position_half_relative']);
            console.log("sb setSoundKeyCurrent this.soundKeyCurrent:", this.soundKeyCurrent);
        },
        currentRandomMode: 'withSoundKeys',
        playData: {'notes': {}},
        samples: [],
//    var notesInStaffStart = {'start-left': 100, 'start-bottom': 107, 'height-diff': 7, 'notes-diff': 4,
//        'notes-left-current': 0, 'note-width': 30, 'inter-tone-signs-width': 6, 'continue': true};
        notesInStaffStart: notesInStaffStart,
//    var positonsSharp = new Array(0, -3, 1, -2, -5);
//    var positonsFlat = new Array(0, 3, -1, 2, -2);
//    var keySignatures =  {
//        'C':{'half':'', 'half-count':0},
//        '':{'half':'', 'half-count':},
//    };

        noteLengths: {
            4: {'imageNamePart': '1-1'}, 2: {'imageNamePart': '1-2'}, 1: {'imageNamePart': '1-4'},
            0.5: {'imageNamePart': '1-8'}, 0.25: {'imageNamePart': '1-16'}, 0.125: {'imageNamePart': '1-32'}
        },
        notesInStaff: $.extend(true, {}, notesInStaffStart),
//    staffRange: new Array(16, 64),
        staffRange: staffRange,
        notesNrAndName: {
            16: 'C', 17: 'Cis/Des', 18: 'D', 19: 'Dis/Es', 20: 'E', 21: 'F', 22: 'Fis/Ges', 23: 'G', 24: 'Gis/As', 25: 'A', 26: 'Ais/B', 27: 'H',
            28: 'c', 29: 'cis/des', 30: 'd', 31: 'dis/es', 32: 'e', 33: 'f', 34: 'fis/ges', 35: 'g', 36: 'gis/as', 37: 'a', 38: 'ais/b', 39: 'h',
            40: 'c<sup>1</sup>', 41: 'cis/des<sup>1</sup>', 42: 'd<sup>1</sup>', 43: 'dis/es<sup>1</sup>', 44: 'e<sup>1</sup>', 45: 'f<sup>1</sup>',
            46: 'fis/ges<sup>1</sup>', 47: 'g<sup>1</sup>', 48: 'gis/as<sup>1</sup>', 49: 'a<sup>1</sup>', 50: 'ais/b<sup>1</sup>', 51: 'h<sup>1</sup>',
            52: 'c<sup>2</sup>', 53: 'cis/des<sup>2</sup>', 54: 'd<sup>2</sup>', 55: 'dis/es<sup>2</sup>', 56: 'e<sup>2</sup>', 57: 'f<sup>2</sup>',
            58: 'fis/ges<sup>2</sup>', 59: 'g<sup>2</sup>', 60: 'gis/as<sup>2</sup>', 61: 'a<sup>2</sup>', 62: 'ais/b<sup>2</sup>', 63: 'h<sup>2</sup>',
            64: 'c<sup>3</sup>'
        },
//        frequencyNrIsHalf: frequencyNrIsHalf, // at the moment only useful for staff
//    console.log('frequencyNrIsHalf: ', frequencyNrIsHalf);
        randomRange: new Array(28, 52),
        rangeOfNumberOfNotesInStaff: new Array(4, 25),
        numberOfNotesInStaffCurrent: 4,
        samples_length: 44100, // Compare http://en.wikipedia.org/wiki/44,100_Hz
//    var samples_length = 22050;
        instruments: new Array('standard', 'clarinet'),
        currentInstrument: 'clarinet',
        toneFrequencies: helpers.createFrequencies(),
        frequencies: createFrequencies.getFrequenciesInfo(soundKeys2, basicTonesMajor2, basicTonesMinorRaw2, positionOfHalvesInScale, positionOfFullInScale),
//    console.log('toneFrequencies: ', toneFrequencies);
//    console.log('toneFrequencies[3]: ', toneFrequencies[3]);

        // Messages: later in different place
        messageNotValid: 'Not a valid string in this context: ',
        messageToneOutOfRange: 'This tone can\'t be shown here: ',
        messageToneLengthNotExist: 'This tone length does not exist: ',
        messageMaxToneNotSmallerThanMin: 'max tone can\'t be smaller than min tone!'

//    soundKeySelect: soundKeySelectField(), // now in views/additional.js
//    var listOfSolmiStrings = getListOfSolmiStrings(); // now in solmiStrings.js
    };
});
define('views/forms',[
    'jquery',
    'underscore',
    'backbone',
    'solmiBasics'
], function ($, _, Backbone, sb) {

    var soundKeySelect = soundKeySelectField();

function frequenciesForm() {
    var form = '<form class="frequencies">';
    form += '<input type="submit" class="start" value="Start">';
    form += '<input type="submit" class="stop" value="Stop">';
    form += '<input type="submit" class="reset" value="Reset">';
    form += '</form>';
    return form;
}

    /**
     * 
     * @returns {String}
     */
    function soundKeySelectField() {
        var select = '<select name="sound-keys" class="sound-keys">' + "/n";
        var mm = new Array('major', 'minor');
//        for (var i = 0; i < soundKeys.length; i++) {
//            for (var soundkey in soundKeys[i]) {
        for (var i = 0; i < mm.length; i++) {
            for (var soundkey in sb.soundKeys[mm[i]]) {
                select += '<option value="' + soundkey + '">' + soundkey + '</option>';
            }
        }
        select += '</select>';
        return select;
    }

    return {
        baseScaleSelectField: function (solmiString) {
            var select = '<select name="scales" class="scales">' + "/n";
            for (var i = sb.scaleRange[1]; i >= sb.scaleRange[0]; i--) {
                var selected = '';
                if (i === solmiString['base_scale']) {
                    selected = ' selected';
                }
                select += '<option value="' + i + '"' + selected + '>' + i + '</option>';
            }
            select += '</select>';
            return select;
        },
        frequenciesForm: frequenciesForm(),
        randomForm: function () {
            var form = '<form id="random">';
            form += 'Random: <br>';
            form += this.selectFieldForRandomMode() + '<br>';
            form += this.selectFormWithToneNames('min', 0);
            form += this.selectFormWithToneNames('max', 1);
            form += '<br>sound key:' + this.soundKeySelect + "\n";
            form += this.selectFieldForNumberOfNotesInStaff() + '<br>';
//            form += '<input type="submit" class="go" value="Go">';
            form += '<input class="go" type="button" value="Go" name="go">';
            form += '</form>';
            return form;
        },
        selectFieldForCentralViewScale: function () {
            var select = '<br>Central view scale: <select name="central-view-scale" id="central-view-scale">' + "/n";
            for (var i = sb.scaleRange[1] - 1; i >= sb.scaleRange[0] + 1; i--) {
                var selected = '';
                if (i === sb.centralViewScale) {
                    selected = ' selected';
                }
                select += '<option value="' + i + '"' + selected + '>' + i + '</option>';
            }
            select += '</select>';
            return select;
        },
        selectFieldForInstruments: function () {
            var select = '<br>Instrument: <select name="instruments" id="instruments">' + "/n";
            for (var i = 0; i < sb.instruments.length; i++) {
                var selected = '';
                if (sb.instruments[i] === sb.currentInstrument) {
                    selected = ' selected';
                }
                select += '<option value="' + sb.instruments[i] + '"' + selected + '>' + sb.instruments[i] + '</option>';
            }
            select += '</select>';
            return select;
        },
        selectFieldForNumberOfNotesInStaff: function () {
            var select = 'number of notes: <select name="number-of-notes-in-staff" class="number-of-notes-in-staff">' + "/n";
            for (var i = sb.rangeOfNumberOfNotesInStaff[0]; i <= sb.rangeOfNumberOfNotesInStaff[1]; i++) {
                var selected = '';
                if (i === sb.numberOfNotesInStaffCurrent) {
                    selected = ' selected';
                }
                select += '<option value="' + i + '"' + selected + '>' + i + '</option>';
            }
            select += '</select>';
            return select;
        },
        selectFieldForRandomMode: function () {
            var modes = {
                'withSoundKeys': 'with random sound keys',
                'withSoundKeysMajor': 'with major random sound keys',
                'withSoundKeysMinor': 'with minor random sound keys',
                'withoutSoundKeys': 'without random sound keys'
            };
            var select = 'mode: <select name="random-modes" id="random-modes">' + "/n";
            for (var mode in modes) {
                var selected = '';
                if (mode === sb.currentRandomMode) {
                    selected = ' selected';
                }
                select += '<option value="' + mode + '"' + selected + '>' + modes[mode] + '</option>';
            }
            select += '</select>';
            return select;
        },
        selectFieldForRepetition: function () {
            var select = '<br>How often play: <select name="repetition" id="repetition">' + "/n";
            var numberOfPlaying = [1, 2, 3, 5, 10];
            for (var i = 0; i < numberOfPlaying.length; i++) {
                var selected = '';
                if (numberOfPlaying[i] === sb.currentNumberOfPlaying) {
                    selected = ' selected';
                }
                select += '<option value="' + numberOfPlaying[i] + '"' + selected + '>' + numberOfPlaying[i] + '</option>';
            }
            select += '</select>';
            return select;
        },
        selectFormWithToneNames: function (name, rangePosition) {
            var select = name + ': <select name="' + name + '" class="tone-' + name + '">' + "/n";
            //for (var noteNr in notesNrAndName) {
            for (var i = sb.staffRange[1]; i > sb.staffRange[0]; i--) {
                var selected = '';
//            if (noteNr === randomRange[rangePosition]) {
                if (i === sb.randomRange[rangePosition]) {
                    selected = ' selected';
                }
//            select += '<option value="' + noteNr + '"' + selected + '>' + notesNrAndName[noteNr] + '</option>';
                select += '<option value="' + i + '"' + selected + '>' + sb.notesNrAndName[i] + '</option>';
            }
            select += '</select>';
            return select;
        },
//        solmiStringForm: function (solmiString) {
//            var form = '<form>';
//            form += '<input type="checkbox" name="solmi-string" value="standard">' + "\n";
//            form += soundKeySelect + "\n";
//            form += this.baseScaleSelectField(solmiString) + "\n";
//            form += '<input type="text" value="' + solmiString['string'] + '">' + "\n";
//            form += '<input type="submit" class="go" value="Go">';
////        form += '<input type="submit" class="random" value="Random">';
//            form += '</form>';
//            return form;
//        },
        soundKeySelect: soundKeySelect
    };
});
define('solmiStrings',['views/forms'], function (forms) {
    var solmiStrings = new Array(
            {"string": "d,-d-d'-d''-d'-d-d,", "base_scale": 4},
    {"string": "d-r-m-f-s-l-t-d'-t-l-s-f-m-r-d", "base_scale": 3},
    {"string": "d-d-r-d-d-r-m-r-d-d-r-m-f-m-r-d-d-r-m-f-s-f-m-r-d-d-r-m-f-s-l-s-f-m-r-d-d-r-m-f-s-l-t-l-s-f-m-r-d-d-r-m-f-s-l-t-d'-t-l-s-f-m-r", "base_scale": 3},
    {"string": "d-d-r-d-d-r-m-r-d-m-d-m-d-d-r-m-f-m-r-d-f-d-f-d-d-r-m-f-s-f-m-r-d-s-d-s-d-d-r-m-f-s-l-s-f-m-r-d-l-d-l-d-d-r-m-f-s-l-t-l-s-f-m-r-d-t-d-t-d-d-r-m-f-s-l-t-d'-t-l-s-f-m-r-d-d'-d-d'", "base_scale": 3},
    {"string": "s,-s,-l,-s,-s,-l,-t,-l,-s,-t,-s,-t,-s,-s,-l,-t,-d-t,-l,-s,-d-s,-d-s,-s,-l,-t,-d-r-d-t,-l,-s,-r-s,-r-s,-s,-l,-t,-d-r-m-r-d-t,-l,-s,-m-s,-m", "base_scale": 4},
    {"string": "d-d-r-d-d-r-m-r-d-m-d-m-d-d-r-m-f-m-r-d-f-d-f-d-d-r-m-f-s-f-m-r-d-s-d-s", "base_scale": 4},
    {"string": "m-m-f-m-m-f-s-f-m-s-m-s-m-m-f-s-l-s-f-m-l-m-l", "base_scale": 4},
    {"string": "s,-s,-l,-s,-s,-l,-t,-l,-s,-s,-l,-t,-d-t,-l,-s,-s,-l,-t,-d-r-d-t,-l,-s,-s,-l,-t,-d-r-m-r-d-t,-l,-s,-s,-l,-t,-d-r-m-f-m-r-d-t,-l,-s,-s,-l,-t,-d-r-m-f-s-f-m-r-d-t,-l,", "base_scale": 3},
    {"string": "r-m-f-s-l-t-d'-t-l-s-f-m-r-d-d-r-m-f-s-l-t-l-s-f-m-r-d-d-r-m-f-s-l-s-f-m-r-d-d-r-m-f-s-f-m-r-d-d-r-m-f-m-r-d-d-r-m-r-d-d-r-d-d", "base_scale": 3},
    {"string": "d-d-r-d-m-d-f-d-s-d-l-d-t-d-d'-r-r-m-r-f-r-s-r-l-r-t-r-d'-r-r'-m-m-f-m-s-m-l-m-t-m-d'-m-r'-m-m'-f-f-s-f-l-f-t-f-d'-f-r'-f-m'-f-f'-s-s-l-s-t-s-d'-s-r'-s-m'-s-f'-s-s'-l-l-t-l-d'-l-r'-l-m'-l-f'-l-s'-l-l'-t-t-d'-t-r'-t-m'-t-f'-t-s'-t-l'-t-t'-d'-d'-r'-d'-m'-d'-f'-d'-s'-d'-l'-d'-t'-d'-d''", "base_scale": 3},
    {"string": "d-d-r-d-m-d-f-d-s-d-l-d-t-d-d'-m-m-f-m-s-m-l-m-t-m-d'-m-r'-m-m'-s-s-l-s-t-s-d'-s-r'-s-m'-s-f'-s-s'-d'-d'-r'-d'-m'-d'-f'-d'-s'-d'-l'-d'-t'-d'-d''", "base_scale": 3},
    {"string": "d-r-m-f-s-l-t-d'-r'-m'-f'-s'-l'-t'-d''-d,,-r,,-m,,-f,,-s,,-l,,-t,,-d,-r,-m,-f,-s,-l,-t,-d", "base_scale": 4},
    {"string": "d,-m,-s,-d-m-s-d'-m'-s'-d''-s'-m'-d'-s-m-d-s,-m,-d,", "base_scale": 4},
    {"string": "d,-r,-m,-d-r-m-d'-r'-m'-d''-m'-r'-d'-m-r-d-m,-r,-d,", "base_scale": 4},
    {"string": "m-ru-di", "base_scale": 4},
    {"string": "m,-ru,-di,", "base_scale": 4},
    {"string": "m'-ru'-di'", "base_scale": 4},
    {"string": "d-r-m-f-s-l-t-d'", "base_scale": 4},
    {"string": "d-r-m-f-s-l-t-d'-d-di-r-ri-mi-f-fi-s-si-l-li-t-d'", "base_scale": 4},
    {"string": "d-r-m-f-s-l-t-d'", "base_scale": 5},
    {"string": "d-r|2-m|0.5-f-s-l-t-d'", "base_scale": 4},
    {"string": "d-r|2-m|0.5-f|4-s|0.25-l|0.125-t-d'", "base_scale": 4},
    {"string": "d,-r,-m,-f,-s,-l,-t,-d", "base_scale": 4},
    {"string": "d'-r'-m'-f'-s'-l'-t'-d''", "base_scale": 4},
    {"string": "d-r,,-m'''-f-s-l'''''-t,,,", "base_scale": 4},
    {"string": "d-r,-m'-f-s'-l'-d,", "base_scale": 4}
    );
    
        /*
     * 
     * @returns {String}
     */
//    function getListOfSolmiStrings() {
//        var list = '';
//        for (var i = 0; i < solmiStrings.length; i++) {
//            list += '<li>' + forms.solmiStringForm(solmiStrings[i]) + '</li>' + "\n";
//        }
//        return list;
//    }
//    return {
//        solmiStrings: solmiStrings,
//        getListOfSolmiStrings: getListOfSolmiStrings()
//    };
});
define('models/playSound',[
    'jquery',
    'underscore',
    'backbone',
    'solmiBasics',
    'helpers/helpers',
    'riffwave'
], function ($, _, Backbone, sb, helpers) {

    return {
        convert255: function (data) {
            var data_0_255 = [];
            for (var i = 0; i < data.length; i++) {
                data_0_255[i] = 128 + Math.round(127 * data[i]);
            }
            return data_0_255;
        },
        normalize_invalid_values: function (samples) {
            for (var i = 0, len = samples.length; i < len; i++) {
                if (samples[i] > 1) {
                    samples[i] = 1;
                } else if (samples[i] < -1) {
                    samples[i] = -1;
                }
            }
        },
        playSound: function () {
            var that = this;
            var sampleRate = sb.samples_length; // the name(s) might change

            that.normalize_invalid_values(sb.samples); // keep samples between [-1, +1]

            var wave = new RIFFWAVE();
            wave.header.sampleRate = sampleRate;
            wave.header.numChannels = 1;
            var audio = new Audio();
            var samples2 = that.convert255(sb.samples);
            wave.Make(samples2);
            audio.src = wave.dataURI;
//        setTimeout(function() { // When using setTimeout, in playSolmiString(...) in the first 2 rounds startTimeOfPlay is only NaN instead of a number
            console.log("playSound setTimeout / play:");
            sb.startTimeOfPlay = Date.now();
            audio.play();
//        }, 10); // page needs time to load?
        },
        prepareForPlaySound: function (toneElements, scale, half, position, toneFirstDivision) {
            console.log("prepareForPlaySound sb.soundKeyCurrent:", sb.soundKeyCurrent);
            var basicToneNr = sb.basicTonesMajor[toneElements[0]];
            if (sb.soundKeyCurrent['mm'] === 'minor') {
                basicToneNr = sb.basicTonesMinor[toneElements[0]];
//            if(toneElements[0] === 'l' || toneElements[0] === 't'){
//                basicToneNr += 12;
//            }
            }
            console.log('prepareForPlaySound sb.soundKeyCurrent', sb.soundKeyCurrent);
            console.log('prepareForPlaySound basicToneNr', basicToneNr);
            var frequencyNr = 3 + ((scale - 1) * 12) + sb.soundKeyCurrent['position'] +
                (basicToneNr - 1); // "-1" because with +soundKeyCurrent['position'] there js already the tone with the basicToneNr 1.
        
            if (half !== '') {
                if (half === 'u') {
                    frequencyNr -= 1;
                } else if (half === 'i') {
                    frequencyNr += 1;
                }
            }
            
//            var positionInScale = helpers.getPositionInScaleOfToneNumber(frequencyNr);
            
            sb.playData['notes'][position]['frequency-nr'] = frequencyNr;
            console.log('prepareForPlaySound frequencyNr: ', frequencyNr);

//            var sampleRate = sb.samples_length;
            this.selectInstrument(sb.currentInstrument, sb.toneFrequencies[frequencyNr], position);
        },
        /**
         * 
         * @param {type} instrument
         * @param {type} f (the frequency)
         * @param {type} position
         * @returns {Array}
         */
        selectInstrument: function (instrument, f, position) {
            var PI = Math.PI,
                    sin = Math.sin,
                    exp = Math.exp;
//        var lengthRatio = baseToneLength / 1000;
            var lengthRatio = sb.playData['notes'][position]['length'] * sb.baseToneLength / 1000;
//        var samples = [];
            var baseIndex = sb.samples.length - 1;
            if (instrument === 'standard') {
//            for (var i = 0; i < (samples_length / 2); i++) {
                for (var i = 0; i < (sb.samples_length * lengthRatio); i++) {
                    var t = i / sb.samples_length;
                    sb.samples[baseIndex + i] = sin(f * 2 * PI * t);
                }
            } else if (instrument === 'clarinet') {
//            for (var i = 0; i < (samples_length / 2); i++) {
                for (var i = 0; i < (sb.samples_length * lengthRatio); i++) {
//                var t = (i / samples_length)/2;
                    var t = i / sb.samples_length;
                    var w = f * 2 * PI * t;
                    // Odd harmonics
                    sb.samples[baseIndex + i] = (sin(w) + 0.75 * sin(w * 3) + 0.5 * sin(w * 5) + 0.14 * sin(w * 7) + 0.5 * sin(w * 9) + 0.12 * sin(11 * w) + 0.17 * sin(w * 13)) / (1 + .75 + .5 + .14 + .17);
                    sb.samples[baseIndex + i] *= exp(t / 1.5);
                    sb.samples[baseIndex + i] *= exp(-t * 1.5);
                }
            }
//        return samples;
        }
    };
//    function hasGetUserMedia() {
//        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
//                navigator.mozGetUserMedia || navigator.msGetUserMedia);
//    }

});
define('models/playStaff',[
    'jquery',
    'underscore',
    'backbone',
    'solmiBasics',
    'helpers/helpers'
], function ($, _, Backbone, sb, helpers) {

    return {
//        calculateFrequencyNrStaff: function (baseFrequency, addedTonesOf7) {
//            addedTonesOf7--; // later this correction shound not be needed
//            var frequencyNrStaff = baseFrequency;
//
//            if (addedTonesOf7 !== 0) {
//                var sign = 1;
//                if (addedTonesOf7 < 0) {
//                    sign = -1;
//                }
//                console.log('cFNS addedTonesOf7: ', addedTonesOf7);
////            for (var i = 0; i < addedTonesOf7 * sign; i++ * sign) {
//                for (var i = 0; i < addedTonesOf7 * sign; i++) {
//                    if (sb.frequencyNrIsHalf[frequencyNrStaff + sign] === 1) {
//                        frequencyNrStaff += 2 * sign;
////console.log('frequencyNr cFNS if frequencyNrStaff', frequencyNrStaff);
//                    } else {
//                        frequencyNrStaff += 1 * sign;
////console.log('frequencyNr cFNS else frequencyNrStaff', frequencyNrStaff);
//                        console.log('cFNS 75');
//                    }
//                }
//            }
//            return frequencyNrStaff;
//        },
        createKeySignature: function () {
            if (sb.soundKeyCurrent['half'] !== '') {
//            var positonsSharp = new Array(0, -3, 1, -2, -5);
//            var positonsFlat = new Array(0, 3, -1, 2, -2);
                var violinSteps = 10;
                var bassSteps = 4;
                var positionsSign = sb.positonsSharp;
                var halfFile = 'Sharp.svg';
                if (sb.soundKeyCurrent['half'] === 'u') {
                    violinSteps = 6;
                    bassSteps = 8;
                    positionsSign = sb.positonsFlat;
                    halfFile = 'Flat.svg';
                }
                var heightViolin = sb.notesInStaffStart['start-bottom'] + (violinSteps * sb.notesInStaffStart['height-diff']);
                var heightBass = sb.notesInStaffStart['start-bottom'] - (bassSteps * sb.notesInStaffStart['height-diff']);
//            var left = notesInStaffStart['signature-start-left'] + notesInStaffStart['signature-left-current'];
                var left = sb.notesInStaffStart['signature-start-left'];
                var staffAreas = new Array('violin', 'bass');
                var staffHeights = new Array(heightViolin, heightBass);
                console.log('createKeySignature staffHeights:', staffHeights);
                for (var i = 0; i < sb.soundKeyCurrent['signs']; i++) {
                    for (var j = 0; j < staffAreas.length; j++) {
                        console.log('createKeySignature i - j:', i + ' - ' + j);
                        $('div#staff').append('<img src="/module/solmik/images/' + halfFile + '" class="sign ' + staffAreas[j] + ' starthalf starthalf-' + i + '" alt="' + sb.soundKeyCurrent['half'] + '">');
                        var bottom = staffHeights[j] + (positionsSign[i] * sb.notesInStaff['height-diff']);
                        $('div#staff .' + staffAreas[j] + '.starthalf-' + i).css({'position': 'absolute', 'bottom': bottom + 'px', 'left': left + 'px'});
                    }
                    left += sb.notesInStaff['inter-tone-signs-width'];
                }

//        $('div#staff').append('<img src="images/' + halfFile + '" class="sign half half-' + position + '" alt="' + toneData['half'] + '">');
//                $('div#staff .half-' + position).css({'position': 'absolute', 'bottom': bottom + 'px', 'left': left + 'px'});
//                left += notesInStaff['inter-tone-signs-width'];

//            var notesInStaffStart = {'signature-start-left': 40, 'start-left': 100, 'start-bottom': 107, 'height-diff': 7, 'notes-diff': 4,
//                'notes-left-current': 0, 'note-width': 30, 'inter-tone-signs-width': 6, 'continue': true};

            }
        },
        playStaff: function (position) {
            var halfFolder = '/module/solmik/images/';
            var halfNames = ['Sharp', 'Flat', 'Natural'];

            if (position > 0) {
                var noteNamePartOfPrevious = sb.noteLengths[sb.playData['notes'][position - 1]['length']]['imageNamePart'];
                $('div#staff .note-' + (position - 1)).attr('src', '/module/solmik/images/' + noteNamePartOfPrevious + '_note.svg');

                var halfInStaffOfPrevious = $('div#staff .half-' + (position - 1));
                if (!$.isEmptyObject(halfInStaffOfPrevious)) {
                    for (var i = 0; i < halfNames.length; i++) {
                        if (halfInStaffOfPrevious.attr('src') === halfFolder + halfNames[i] + '_current.svg') {
                            halfInStaffOfPrevious.attr('src', halfFolder + halfNames[i] + '.svg');
                            break;
                        }
                    }
                }
            }

            var noteNamePart = sb.noteLengths[sb.playData['notes'][position]['length']]['imageNamePart'];
            $('div#staff .note-' + position).attr('src', '/module/solmik/images/' + noteNamePart + '_note_current.svg');

            var halfInStaff = $('div#staff .half-' + position);
            if (!$.isEmptyObject(halfInStaff)) {
                for (var i = 0; i < halfNames.length; i++) {
                    if (halfInStaff.attr('src') === halfFolder + halfNames[i] + '.svg') {
                        halfInStaff.attr('src', halfFolder + halfNames[i] + '_current.svg');
                        break;
                    }
                }
            }
        },
//        prepareForPlayStaff: function (solmiArray, position, toneData, toneElements, baseScale, toneFirstDivision) {
        prepareForPlayStaff: function (position, solmiArray) {
//            console.log('prepareForPlayStaff solmiArray: ', solmiArray);
//            console.log('prepareForPlayStaff position: ', position);
//            console.log('prepareForPlayStaff sb.playData: ', sb.playData);
            var frequencyNr = sb.playData['notes'][position]['frequency-nr'];
//            console.log('prepareForPlayStaff frequencyNr', frequencyNr);
            var imageNamePart = sb.noteLengths[sb.playData['notes'][position]['length']]['imageNamePart'];

            if (frequencyNr >= sb.staffRange[0] && frequencyNr <= sb.staffRange[1]) {
//                var basePositionOf7 = sb.frequencies[40]['positionOf7'] - 1;  // 40 => c1
                var basePositionOf7 = sb.frequencies[40]['positionOf7'];  // 40 => c1
                // in require.js: outside of this function

                var frequency = sb.frequencies[frequencyNr];
//                console.log('prepareForPlayStaff frequency:', frequency);
                var soundKeyF = frequency['soundKey'][sb.soundKeyCurrent['mm']][sb.soundKeyCurrent['position']];
//                console.log('prepareForPlayStaff soundKeyF:', soundKeyF);
//                console.log('prepareForPlayStaff soundKeyCurrent:', sb.soundKeyCurrent);
                var addedTonesOf7 = frequency['positionOf7'] - basePositionOf7;
//                console.log('prepareForPlayStaff addedTonesOf7 10: ', addedTonesOf7);

                var half = sb.playData['notes'][position]['half'];
//                console.log('prepareForPlayStaff half:', half);
//                console.log('prepareForPlayStaff addedTonesOf7 50: ', addedTonesOf7);

                var halfFile = '';
                var halfFileMarker = '';
/*                var bottomAdd = 0;*/
                if (frequency['whiteKey'] !== 1) { // so its a # or b note
//                    console.log('prepareForPlayStaff 300');
                    var ofKeyMarker = '';
                    if (!soundKeyF['activeHalf']) { // so it is a base tone of the actual sound key
                        ofKeyMarker = '_ofKey';
//                        console.log('prepareForPlayStaff 310');
                    }
                    if (half === 'i' || (!soundKeyF['activeHalf'] && sb.soundKeyCurrent['half'] === 'i')) {
//                        console.log('prepareForPlayStaff 320');
                        halfFile = 'Sharp' + ofKeyMarker + '.svg';
                        halfFileMarker = 'i';
                    } else if (half === 'u' || (!soundKeyF['activeHalf'] && sb.soundKeyCurrent['half'] === 'u')) {
//                        console.log('prepareForPlayStaff 330');
                        addedTonesOf7 += 1;
                        halfFile = 'Flat' + ofKeyMarker + '.svg';
                        halfFileMarker = 'u';
                    }

                } else {
//                    console.log('prepareForPlayStaff 400');
                    if (soundKeyF['activeHalf'] !== '') {
/*
                        // The following outcommented code would use b and # instead of natural, where it is possible,
                        // but e.g. "f" would be shown as "e#":
                        if (soundKeyF['activeHalf'] === 'i' && half === 'i' && $.inArray(frequency['scalePositionOf12'], [6, 1]) > -1) { // [6, 1] => f, c
                            bottomAdd -= sb.notesInStaff['height-diff'];
                            halfFile = 'Sharp.svg';
                            halfFileMarker = 'i';
                        } else if (soundKeyF['activeHalf'] === 'u' && half === 'u' && $.inArray(frequency['scalePositionOf12'], [5, 12]) > -1) { // [5, 12] => e, h
                            bottomAdd += sb.notesInStaff['height-diff'];
                            halfFile = 'Flat.svg';
                            halfFileMarker = 'u';
                        } else {
*/
                        halfFile = 'Natural.svg';
                        halfFileMarker = 'na';
/*                        }*/
                    }
                }

/*                var bottom = sb.notesInStaff['start-bottom'] + bottomAdd + addedTonesOf7 * sb.notesInStaff['height-diff'];*/
                var bottom = sb.notesInStaff['start-bottom'] + addedTonesOf7 * sb.notesInStaff['height-diff'];
                var left = sb.notesInStaff['start-left'] + sb.notesInStaff['notes-left-current'] + sb.notesInStaff['notes-diff'];

//                console.log('prepareForPlayStaff, left [[before half]]:', left);
                if (halfFile !== '') {
                    $('div#staff').append('<img src="/module/solmik/images/' + halfFile + '" class="sign half half-' + position + '" alt="' + halfFileMarker + '">');
                    $('div#staff .half-' + position).css({'position': 'absolute', 'bottom': bottom + 'px', 'left': left + 'px'});
                    left += sb.notesInStaff['inter-tone-signs-width'];
                }
                $('div#staff').append('<img src="/module/solmik/images/' + imageNamePart + '_note.svg" class="sign note note-' + position + '" alt="' + soundKeyF['basicTone'] + '">');
                $('div#staff .note-' + position).css({'position': 'absolute', 'bottom': bottom + 'px', 'left': left + 'px'});

                left += sb.notesInStaff['note-width'];
//                console.log('prepareForPlayStaff, before notesInStaff[notes-left-current]: ', sb.notesInStaff['notes-left-current']);
                sb.notesInStaff['notes-left-current'] = left - sb.notesInStaff['start-left'];

            } else {
//            $('#message-staff').empty().append(messageToneOutOfRange + solmiArray[position] + ' (base scale: ' + baseScale + ')');
                $('#message-staff').empty().append(sb.messageToneOutOfRange + solmiArray[position]);
                sb.notesInStaff['continue'] = false;
//            throw new Error(messageToneOutOfRange + solmiArray[position]);// I don't want to end the program totally
//            return false;// must be something else
            }
        }
    };
});
define('helpers/createSolmiArrayFromToneNumbers',[
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
//            var positionInScaleForName = positionInScale + (soundKeyCurrent['position'] - 1);
//            if (positionInScaleForName > 12) {
//                positionInScaleForName -= 12;
//                scaleForThisTone -= 1;
//            }

                var half = '';
                console.log('createSolmiArrayFromToneNumbers positionInScaleForName 1:', positionInScaleForName);
//            var halfExist = $.inArray(positionInScale, sb.positionOfHalvesInScale);
                var halfExist = $.inArray(positionInScaleForName, sb.positionOfHalvesInScale[sb.soundKeyCurrent['mm']]);
                if (halfExist > -1) {

                    var halfNr = -1;
                    //if (sb.frequencyNrIsHalf[toneNumbers[i]] === 0) { // To make sure that a note of a "full note name" is in the staff in a height accoring to this name (so not used is an alternative with # or b).
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
//                    positionInScaleForName = positionInScale + 1;
//                    positionInScaleForName = positionInScaleForName + 1;
                        positionInScaleForName = helpers.getPositionInScaleOfBasicTone(positionInScaleForName + 1);
                    } else {
                        var noHalfIndex = $.inArray(positionInScaleForName, noHalves);
                        if (noHalfIndex === -1) {
                            half = 'i';
//                        positionInScaleForName = positionInScale - 1;
//                        positionInScaleForName = positionInScaleForName - 1;
                            positionInScaleForName = helpers.getPositionInScaleOfBasicTone(positionInScaleForName - 1);
                        }
                    }
                }
                console.log('createSolmiArrayFromToneNumbers positionInScaleForName 2:', positionInScaleForName);
                console.log('createSolmiArrayFromToneNumbers positionInScaleForName: ', positionInScaleForName);
                console.log('createSolmiArrayFromToneNumbers positionOfDoReMi[positionInScaleForName]: ', positionOfDoReMi[positionInScaleForName]);
                solmiTone += positionOfDoReMi[positionInScaleForName] + half;
//                var scaleOfToneNumber = helpers.getScaleOfToneNumber(toneNumbers[i]);
                var scaleOfToneNumber = sb.frequencies[toneNumbers[i]]['scale'];
//            console.log('createSolmiArrayFromToneNumbers scaleOfToneNumber: ', scaleOfToneNumber);
//            var scalesDiff = centralViewScaleForStart - scaleOfToneNumber;
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
define('models/randomize',[
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
define('models/playCommon',[
    'jquery',
    'underscore',
    'backbone',
    'solmiBasics',
    'helpers/helpers',
    'models/playSound',
    'models/playStaff',
    'models/randomize'
], function ($, _, Backbone, sb, helpers, playSound, playStaff, randomize) {

    return {
        changeScalesCurrent: function (scale) {

            $('#all-squares .squares-3x3').removeClass('scale-pos-' + sb.scalesCurrent.join(' scale-pos-'));
            var scalesDiff = sb.scalesCurrent[0] - scale;

            if (scalesDiff > 0) {
                sb.scalesCurrent = [scale + 2, scale + 1, scale];
            } else {
                sb.scalesCurrent = [scale, scale - 1, scale - 2];
            }

            $('#all-squares .squares-3x3').each(function (index) {
                $(this).addClass('scale-pos-' + sb.scalesCurrent[index]);
            });
        },
        getToneDataThroughValidation: function (solmiArray, baseScale, position, toneElements, toneFirstDivision) {
//        console.log('getScaleThroughValidation solmiArray: ', solmiArray);
//        console.log('getScaleThroughValidation baseScale: ', baseScale);
//        console.log('getScaleThroughValidation position: ', position);
            var half = '';
            var scale = baseScale;
            var marksBottom = 0;
            var marksTop = 0;
//        if (!$.isEmptyObject(toneElements) && toneElements.length <= (scaleRange[1] + 2)) {
            if (!$.isEmptyObject(toneElements)) {
//            console.log('solmiArray[position]: ' + solmiArray[position]);
                var toneIndex1 = jQuery.inArray(toneElements[0], sb.basicTones);
                if (toneIndex1 === -1) {
                    //console.log('x solmiArray[position]: ' + solmiArray[position]);
                    alert(sb.messageNotValid + solmiArray[position] + ' (10)');
                    //                throw new Error(messageNotValid + solmiArray[position]);
                    return false;
                }
                if (toneElements.length > 1) {
                    if (toneElements[1] === ",") {
                        marksBottom += 1;
                    }
                    else if (toneElements[1] === "'") {
                        marksTop += 1;
                    }
                    else if (toneElements[1] === 'u') {
                        half = 'u';
                    }
                    else if (toneElements[1] === 'i') {
                        half = 'i';
                    } else {
                        alert(sb.messageNotValid + solmiArray[position] + ' (20)');
                        //                    throw new Error(messageNotValid + solmiArray[position]);
                        return false;
                    }
                }
//            var maxLength = 1 + scaleRange[1] + half.length;
                if (toneElements.length > 2) {
                    for (var i = 2; i < toneElements.length; i++) {
                        if (toneElements[i] === "," && marksTop === 0) {
                            marksBottom += 1;
                        }
                        else if (toneElements[i] === "'" && marksBottom === 0) {
                            marksTop += 1;
                        } else {
                            alert(sb.messageNotValid + solmiArray[position] + ' (30)');
                            //                        throw new Error(messageNotValid + solmiArray[position]);
                            return false;
                        }
                    }
                }
                if (toneFirstDivision[1] && !sb.noteLengths[parseFloat(toneFirstDivision[1])]) {
                    alert(sb.messageToneLengthNotExist + toneFirstDivision[1]);
                    return false;
                }
            } else {
                alert(sb.messageNotValid + solmiArray[position] + ' (40)');
                //            throw new Error(messageNotValid + solmiArray[position]);
                return false;
            }

            if (marksBottom > 0) {
                if (marksBottom > sb.scalesLimit[baseScale]['sub']) {
                    alert(sb.messageNotValid + solmiArray[position] + ' (50)');
                    //                throw new Error(messageNotValid + solmiArray[position]);
                    return false;
                }
                scale -= marksBottom;
            } else if (marksTop > 0) {
                if (marksTop > sb.scalesLimit[baseScale]['super']) {
                    alert(sb.messageNotValid + solmiArray[position] + ' (60)');
                    //                throw new Error(messageNotValid + solmiArray[position]);
                    return false;
                }
                scale += marksTop;
            }
            var toneData = '{"scale":' + scale + ',"half":"' + half + '"' +
                    ',"marksBottom":' + marksBottom + ',"marksTop":' + marksTop + '}';
            return JSON.parse(toneData);
        },
        play: function () {
            playSound.playSound();
            this.playSolmiString(0);
        },
        playSolmiString: function (position) {
            var that = this;
            $('#all-squares .row div').css({'background-image': "none"});
            var tone = sb.playData['notes'][position];
            if ($.inArray(tone['scale'], sb.scalesCurrent) < 0) {
                that.changeScalesCurrent(tone['scale']);
            }
            var currentSquare = $('.scale-pos-' +
                    tone['scale'] + ' .row:nth-child(' +
                    tone['position-square-in-scale'][0] + ') div:nth-child(' +
                    tone['position-square-in-scale'][1] + ')');
            currentSquare.css({'background-image': "url('/module/solmik/images/redDot2.png')",
                'background-position': sb.positionInSquare[tone['half']]});
            var tonelength = sb.playData['notes'][position]['length'] * sb.baseToneLength;
//        playStaff(position, tone);
            playStaff.playStaff(position);
            sb.currentTimeOfPlay += tonelength;
            var dateNow = Date.now();
            var waitTime = sb.startTimeOfPlay + sb.currentTimeOfPlay - dateNow;
//            if(waitTime < (sb.startTimeOfPlay + position * tonelength)){
//            if((dateNow - sb.startTimeOfPlay) < (sb.startTimeOfPlay + position * tonelength)){
//                alert('waitTime problem!');
//            }
            if(waitTime < 0){
//                alert('waitTime problem! (2)');
                console.log('playSolmiString, !: waitTime < 0');
            }
            that.waitTimeDiffSum += tonelength - waitTime;
            var timePassed = dateNow - sb.startTimeOfPlay;
            var waitTime2 =  sb.currentTimeOfPlay - timePassed;
            var timePassedDiff = timePassed - that.timePassedBefore;
            that.timePassedBefore = timePassed;
//            if(){
            console.log('playSolmiString dateNow: ', dateNow);
            console.log('playSolmiString sb.currentTimeOfPlay: ', sb.currentTimeOfPlay);
            console.log('playSolmiString timePassed: ', timePassed);
            console.log('playSolmiString timePassedDiff: ', timePassedDiff);
            console.log('playSolmiString waitTime: ', waitTime);
            console.log('playSolmiString waitTime2: ', waitTime2);
            console.log('playSolmiString that.waitTimeDiffSum: ', that.waitTimeDiffSum);
            if (position < sb.playData['notes-length'] - 1) {
                setTimeout(function () {
                    that.playSolmiString(position + 1);
//            }, baseToneLength * tone['period']);
                }, waitTime2);
            } else {
                sb.currentTimeOfPlay = 0;
                sb.remainingNumberOfPlaying -= 1;
                if (sb.remainingNumberOfPlaying > 0) {
                    setTimeout(function () {
                        that.play();
                    }, waitTime2);
                } else {
                    sb.remainingNumberOfPlaying = sb.currentNumberOfPlaying;
                }
            }
        },
        waitTimeDiffSum: 0,
        timePassedBefore: 0,
        prepareForPlay: function (currentField, mode) {
            console.log('playCommon.js prepareForPlay currentField', currentField);
            sb.samples = [];
            $('#message-staff, .used-string, .notes-string, .frequencies-string').empty();
            var baseScale = false;
            if (mode !== 'random') {
console.log('playCommon.js $(currentField)', $(currentField));
console.log('playCommon.js $(currentField).parents(form)', $(currentField).parents('form'));
//                var soundKey = $(currentField).parent('form').find('.sound-keys').val();
                var soundKey = $(currentField).parents('form').find('.sound-keys').val();
console.log('playCommon.js soundKey', soundKey);
console.log('playCommon.js x200');
                sb.setSoundKeyCurrent(soundKey);
console.log('playCommon.js x210');
                console.log('prepareForPlay, scalesCurrent : ' + sb.scalesCurrent);
//                var solmiString = $(currentField).parent('form').find('input[type="text"]').val();
                var solmiString = $(currentField).parents('form').find('input[type="text"]').val();
//                baseScale = parseInt($(currentField).parent('form').find('.scales').val());
                baseScale = parseInt($(currentField).parents('form').find('.scales').val());
                console.log('solmiString: ' + solmiString);
//        var solmiFirstDivision = solmiString.split('|');
                var solmiArray = solmiString.split('-');
            }
//        var solmiArray = solmiFirstDivision[0].split('-');
//console.log('prepareForPlay solmiArray: ' + solmiArray);
            sb.notesInStaff = $.extend(true, {}, sb.notesInStaffStart);
            $('div#staff img.sign').remove();

            if (mode === 'random') {
//                try {
                    solmiArray = randomize.randomize(currentField);
                    baseScale = sb.centralViewScaleForStart;
//                } catch (e) {
//                    console.error(e.message);
////                return false;
//                    throw new Error(e.message);
//                }
            }
//        var outputString = 'Used string: ';
            var outputString = solmiArray.join('-');
            outputString += ' (used string), ' + sb.soundKeyCurrent['key'] + ' ' + sb.soundKeyCurrent['mm'];
            $('.used-string').append(outputString);

            playStaff.createKeySignature();
            console.log('solmiArray: ' + solmiArray);
            this.prepareForPlaySolmiString(solmiArray, baseScale, 0);

            var frequenciesString = '';
            var notesString = '';
            for (var i = 0; i < solmiArray.length; i++) {
                var frequencyNr = sb.playData['notes'][i]['frequency-nr'];
                frequenciesString += Math.round(sb.toneFrequencies[frequencyNr]) + '-';
                (frequencyNr >= sb.staffRange[0] && frequencyNr <= sb.staffRange[1]) ?
                        notesString += sb.notesNrAndName[frequencyNr] : notesString += 'x';
                notesString += '-';
            }
            $('.frequencies-string').append(frequenciesString + ' (frequencies)');
            $('.notes-string').append(notesString + ' (notes)');


            console.log('prepareForPlay playData: ', sb.playData);
            console.log('prepareForPlay soundKeyCurrent: ', sb.soundKeyCurrent);
            console.log('prepareForPlay currentNumberOfPlaying: ', sb.currentNumberOfPlaying);

            this.play();

        },
        prepareForPlaySolmiString: function (solmiArray, baseScale, position) {
            sb.playData['notes'][position] = {};
            var toneFirstDivision = solmiArray[position].split('|');
            sb.playData['notes'][position]['length'] = 1;
            if (toneFirstDivision[1]) {
                sb.playData['notes'][position]['length'] = parseFloat(toneFirstDivision[1]);
            }
//        var toneElements = solmiArray[position].split('');
            var toneElements = toneFirstDivision[0].split('');
            var toneData = this.getToneDataThroughValidation(solmiArray, baseScale, position, toneElements, toneFirstDivision);
            if (toneData === false) {
                return false;
            }
            var scale = toneData['scale'];
            var half = toneData['half'];

            console.log('scalesCurrent: ', sb.scalesCurrent);
            if (position === 0 && $.inArray(scale, sb.scalesCurrent) < 0) {
                sb.scalesCurrent = helpers.setScalesCurrent(sb.scaleRange, sb.centralViewScale, sb.scalesCurrent); // Without it: The last values from the string before are taken
            }
            sb.playData['notes'][position]['scale'] = scale;
//        playData['notes'][position]['period'] = 1;
            var tone = sb.tonePositions[toneElements[0]];
            sb.playData['notes'][position]['position-square-in-scale'] = tone;
            console.log('prepareForPlaySolmiString tone: ', tone);
            if (half === '') {
                sb.playData['notes'][position]['half'] = 'n';
            } else {
                sb.playData['notes'][position]['half'] = half;
            }
            playSound.prepareForPlaySound(toneElements, scale, half, position, toneFirstDivision);
            if (sb.notesInStaff['continue'] === true) {
//                playStaff.prepareForPlayStaff(solmiArray, position, toneData, toneElements, baseScale, toneFirstDivision);
                playStaff.prepareForPlayStaff(position, solmiArray);
            }
//        prepareForPlaySound(toneElements, scale, half, position);
            console.log('prepareForPlaySolmiString solmiArray.length: ', solmiArray.length);
            console.log('prepareForPlaySolmiString position: ', position);
            if (position < solmiArray.length - 1) {
                this.prepareForPlaySolmiString(solmiArray, baseScale, position + 1);
            } else {
                sb.playData['notes-length'] = solmiArray.length;
            }
        }
    };
});
define('models/startfrequenciestuner',[
    'jquery',
    'underscore',
    'backbone',
    'tuner',
    'frequenciesextractor'
], function ($, _, Backbone) {

    return {
        frequencyBefore: 0,
        tunerActive: false,
        tunerShowData: true,
        startTuner: function () {

            window.AudioContext = window.AudioContext ||
                    window.webkitAudioContext;

            navigator.getMedia = (navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia);

            var audioContext = new AudioContext();

            var gotStreamCallback = function gotStreamCallbackFunction(mediaStream) {
                var microphoneSource = audioContext.createMediaStreamSource(mediaStream);

                var tuner = new Tuner(microphoneSource, audioContext.destination, audioContext);

                tuner.start(function (note) {
//            $('#frequencies-string2').text(note);
                    if (this.tunerShowData === true
                            && note !== 0 && note !== 64 && note !== 75
                            && note !== this.frequencyBefore) {
                        $('#frequencies-string2').append('-' + note);
                    }
                    this.frequencyBefore = note;
                });

            };

            var errorCallback = function errorCallbackFunction(error) {
                console.log(error);
            };

            navigator.getMedia({audio: true}, gotStreamCallback, errorCallback);
        }
    };
});
define('views/additional',[
    'jquery',
    'underscore',
    'backbone',
    'solmiBasics'
], function ($, _, Backbone, sb) {

    return {
//      soundKeySelect: soundKeySelectField(),
        inputBaseToneLength: function () {
            return '<br>Base tone length: <input id="base-tone-length" type="text" value="' + sb.baseToneLength + '">';
        }
    };
});
define('solmiMain',[
    'jquery',
    'underscore',
    'backbone',
    'solmiBasics',
    'solmiStrings',
    'helpers/helpers',
    'models/playCommon',
    'models/startfrequenciestuner',
    'views/forms',
    'views/additional'
], function ($, _, Backbone, sb, solmiStrings, helpers, playCommon, startfrequenciestuner, forms, viewsAdd) {
    
//        $('#div1').after(selectFieldForRandomMode());
    $('#div1').after(forms.randomForm());
    $('#div1').after(viewsAdd.inputBaseToneLength());
    $('#div1').after(forms.selectFieldForRepetition());
    $('#div1').after(forms.selectFieldForInstruments());
    $('#div1').after(forms.selectFieldForCentralViewScale());

    for (var i = 1; i <= 2; i++) {
        $('.squares-3x3 .row:nth-child(' + i + ') div:first-child').css({'visibility': 'hidden'});
    }

//    var listOfSolmiStrings = solmiStrings.getListOfSolmiStrings;
//    $('#solmi-strings').append(listOfSolmiStrings);

    $('#solmi-strings form .go').click(function () {
        console.log('scalesCurrent after click go: ', sb.scalesCurrent);
//        try {
            playCommon.prepareForPlay(this);
//        } catch (e) {
//            console.error(e.message);
//            return false;
//        }
//        return false;
    });
//        $('#solmi-strings form .random').click(function() {
//            console.log('scalesCurrent after click random: ', scalesCurrent);
//            try {
//                prepareForPlay(this, 'random');
//            } catch (e) {
//                console.error(e.message);
//                return false;
//            }
//            return false;
//        });

    $('form#random .go').click(function () {
        console.log('scalesCurrent after click form#random: ', sb.scalesCurrent);
//        try {
            playCommon.prepareForPlay(this, 'random');
//        } catch (e) {
//            console.error(e.message);
//            return false;
//        }
//        return false;
    });

    $('#central-view-scale').change(function () {
        $('#all-squares .row div').css({'background-image': "none"});
        sb.centralViewScale = parseInt($(this).val());
        sb.scalesCurrent = helpers.setScalesCurrent(sb.scaleRange, sb.centralViewScale, sb.scalesCurrent);
    });

    $('#instruments').change(function () {
        sb.currentInstrument = $(this).val();
    });

    $('#repetition').change(function () {
        sb.remainingNumberOfPlaying = sb.currentNumberOfPlaying = parseInt($(this).val());
    });

    $('#base-tone-length').change(function () {
        sb.baseToneLength = parseInt($(this).val());
    });

//        $('#random-modes').change(function() {
//            currentRandomMode = $(this).val();
//        });

    $('.sound-keys').change(function () {// later: remove this, action only if form is clicked
        var soundKey = $(this).val();
        sb.setSoundKeyCurrent(soundKey);
    });

    $('#frequencies-string2').after(forms.frequenciesForm);
    $('form.frequencies .start').click(function () {

        try {
            if (startfrequenciestuner.tunerActive === false) {
                startfrequenciestuner.tunerActive = true;
                startfrequenciestuner.startTuner();
            } else {
                startfrequenciestuner.tunerShowData = true;
            }
        } catch (e) {
            console.error(e.message);
            return false;
        }
        return false;
    });
    $('form.frequencies .stop').click(function () {
        try {
            startfrequenciestuner.tunerShowData = false;
        } catch (e) {
            console.error(e.message);
            return false;
        }
        return false;
    });
    $('form.frequencies .reset').click(function () {
        try {
            $('#frequencies-string2').empty();
        } catch (e) {
            console.error(e.message);
            return false;
        }
        return false;
    });
//    if (hasGetUserMedia()) {
//        alert('Has getUserMedia!');
//    } else {
//        alert('getUserMedia() is not supported in your browser');
//    }

    return {};
});
define('solmi',[
  'solmiBasics',
  'solmiMain'
], function(solmiBasics, solmiMain){
//], function(solmiBasics){
  console.log('solmi.js, solmiBasics', solmiBasics);
  return {};
});

// TODO:
// 
// - (sometimes) the last tone is one tone after the last staff note is shown
//     
// - Frontend output of frequences + note-names, especially in connection with random:
//   - at which stage taken for this output?
//     - Is importent for testing
//     
// - getSolmiToneOfSoundKeyFromFrequency(...)
//    Maybe other solution for the following code:
//            } else if (half === '') { // for soundKey C, a
//                solmiToneNr--;
//                half = 'i';
//            }
//    => maybe adapt it better in var soundKeys2
// 
// - $('#base-tone-length').change(function() {
//   - add handling of wrong input (not int, not within a limit)
// 
// - "DEPRECIATED": rewrite code so that code marked with "DEPRECIATED" needs not be used any more
// 
// - maybe still problem with minor
// - frequencies:
//   - ...
// - staff:
//   - a bit smaller?
// - input through microphone, output
// - include soundkey in solmi-string
// - all Dur / all Moll one after the other for one string
//   - 2014-11-09: ?
// - sound off/on
// 
//     
// later:
// - use of backbone.js?
// - when a new solmiString is played before an other has ended:
//   - Interrupt the old one before the new one is played
// - throw new Error:
//   - Where is output?
// - 'please wait' or similar (eg circuling mouse pointer)
//   - when long solmiString is selected
// - test for whitespace in solmi string
//   - string = string.trim()
// - (better picture(s) for u/i in solmi view?)
// - in chromium (not chrome) a solmiString does not lead to the correct position
// - 
// - special code to make pixels less visible?
// - createFrequencies(): Calculate 111
// - var basicToneNr
//   - put it earlier, it does not need to be in every loop?
//     - but later it might be needed there, when the keys also can change within a solmi string
// - limit Length of solmiString?
//   - might only be relevant, if somebody gets into the access restricted backend.;
require.config({
//  baseUrl: 'js/',
    paths: {
        jquery: 'libs/jquery/jquery-1.11.2.min',
        underscore: 'libs/underscore/underscore-min-1.7.0',
        backbone: 'libs/backbone/backbone-min-1.1.2',
//    helpers: 'helpers',
//    views: 'views'
//    solmiBasics: 'solmiBasics'
        riffwave: 'libs/riffwave/riffwave',
        tuner: 'models/tuner',
        frequenciesextractor: 'models/frequenciesextractor',
        notesfrequencies: 'models/notesfrequencies'
    },
    shim: {
        riffwave: {
//            exports: 'Riffwave'
        },
        tuner: {},
        frequenciesextractor: {},
        notesfrequencies: {},
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        }
    },
//    deps: ['solmi']

});

require(["infrastructure"], function () {
    require(["solmi"], function (solmi) {
//        app.init();
    });
});


//require([
//
//  // Load our app module and pass it to our definition function
////  'solmiBasics'
//  'test10'
//], function(sb){
////    console.log('solmiBasics', sb);
//  // The "app" dependency is passed in as "App"
////  App.initialize();
//});

define("config", function(){});


//# sourceMappingURL=config.js.map