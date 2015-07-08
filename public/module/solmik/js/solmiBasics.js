define([
    'jquery',
    'underscore',
    'backbone',
    'helpers/helpers',
    'helpers/createFrequencies'
], function ($, _, Backbone, helpers, createFrequencies) {
    console.log('solmiBasics.js 1, helpers', helpers);

    var basicTones = new Array('d', 'r', 'm', 'f', 's', 'l', 't');
    var basicTonesMajor = {'d': 1, 'r': 3, 'm': 5, 'f': 6, 's': 8, 'l': 10, 't': 12};
    var basicTonesMajor2 = helpers.flipObject(basicTonesMajor);
    var basicTonesMinorRaw = {'l': 1, 't': 3, 'd': 4, 'r': 6, 'm': 8, 'f': 9, 's': 11};
    var basicTonesMinorRaw2 = helpers.flipObject(basicTonesMinorRaw);
    var basicTonesMinor = {'l': 1 + 12, 't': 3 + 12, 'd': 4, 'r': 6, 'm': 8, 'f': 9, 's': 11};

    var noteNamesEnglish = {1: ['C'], 2: ['C#', 'Db'], 3: ['D'], 4: ['D#', 'Es'], 5: ['E'], 6: ['F'],
        7: ['F#', 'Gb'], 8: ['G'], 9: ['G#', 'Ab'], 10: ['A'], 11: ['A#', 'Bb'], 12: 'B'};

    var scaleRange = [1, 9];
    var centralViewScaleForStart = 4;
    var centralViewScale = 0 + centralViewScaleForStart;
    
    var noIU = false;

    var scalesCurrent = [];
    scalesCurrent = helpers.setScalesCurrent(scaleRange, centralViewScale, scalesCurrent);
    console.log('solmiBasics.js scalesCurrent', scalesCurrent);
    var scalesLimit = helpers.scalesLimit(scaleRange);
    var notesInStaffStart = {'signature-start-left': 60, 'start-left': 120, 'start-bottom': 110, 'height-diff': 6.8, 'notes-diff': 4,
        'notes-left-current': 0, 'note-width': 35, 'inter-tone-signs-width': 6, 'continue': true};

    var staffRange = [16, 64];
    var positionOfHalvesInScale = {'major': [2, 4, 7, 9, 11], 'minor': [2, 5, 7, 10, 12]};
    var positionOfFullInScale = {'major': [1, 3, 5, 6, 8, 10, 12], 'minor': [1, 3, 4, 6, 8, 9, 11]};

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

    return {
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
        noIU: noIU,
        currentNumberOfPlaying: 1,
        remainingNumberOfPlaying: 1,
        scaleRange: scaleRange, 
        centralViewScaleForStart: centralViewScaleForStart,
        centralViewScale: centralViewScale,
        scalesCurrent: scalesCurrent,
        scalesLimit: scalesLimit,
        positionOfHalvesInScale: positionOfHalvesInScale,
        positionOfFullInScale: positionOfFullInScale,
        positionInSquare: {'n': 'center', 'u': 'center bottom', 'i': 'center top'},
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
            console.log("sb setSoundKeyCurrent this.soundKeyCurrent:", this.soundKeyCurrent);
        },
        currentRandomMode: 'withSoundKeysMajor',
        playData: {'notes': {}},
        notesInStaffStart: notesInStaffStart,

        noteLengths: {
            4: {'imageNamePart': '1-1'}, 2: {'imageNamePart': '1-2'}, 1: {'imageNamePart': '1-4'},
            0.5: {'imageNamePart': '1-8'}, 0.25: {'imageNamePart': '1-16'}, 0.125: {'imageNamePart': '1-32'}
        },
        notesInStaff: $.extend(true, {}, notesInStaffStart),
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
        randomRange: new Array(28, 52),
        rangeOfNumberOfNotesInStaff: new Array(1, 25),
        numberOfNotesInStaffCurrent: 4,
        maxDeviationFromFirstSound: 0,
//        samples_length: 44100, // Compare http://en.wikipedia.org/wiki/44,100_Hz
        instruments: new Array('piano', 'organ', 'acoustic', 'edm'),
        currentInstrument: 'acoustic',
        toneFrequencies: helpers.createFrequencies(),
        frequencies: createFrequencies.getFrequenciesInfo(soundKeys2, basicTonesMajor2, basicTonesMinorRaw2,
                positionOfHalvesInScale, positionOfFullInScale, noteNamesEnglish),

        // Messages: later in different place
        messageNotValid: 'Not a valid string in this context: ',
        messageToneOutOfRange: 'This tone can\'t be shown here: ',
        messageToneLengthNotExist: 'This tone length does not exist: ',
        messageMaxToneNotSmallerThanMin: 'max tone can\'t be smaller than min tone!'
    };
});