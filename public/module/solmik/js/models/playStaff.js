define([
    'jquery',
    'underscore',
    'backbone',
    'solmiBasics',
    'helpers/helpers'
], function ($, _, Backbone, sb, helpers) {

    return {
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

        prepareForPlayStaff: function (position, solmiArray) {
            console.log('prepareForPlayStaff solmiArray: ', solmiArray);
            console.log('prepareForPlayStaff position: ', position);
            console.log('prepareForPlayStaff sb.playData: ', sb.playData);
            var frequencyNr = sb.playData['notes'][position]['frequency-nr'];
            console.log('prepareForPlayStaff frequencyNr', frequencyNr);
            var imageNamePart = sb.noteLengths[sb.playData['notes'][position]['length']]['imageNamePart'];

            if (frequencyNr >= sb.staffRange[0] && frequencyNr <= sb.staffRange[1]) {
                var basePositionOf7 = sb.frequencies[40]['positionOf7'];  // 40 => c1
                // in require.js: outside of this function

                var frequency = sb.frequencies[frequencyNr];
                console.log('prepareForPlayStaff frequency:', frequency);
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
                    console.log('prepareForPlayStaff 300');
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
                    console.log('prepareForPlayStaff 400');
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

                console.log('prepareForPlayStaff, left [[before half]]:', left);
                if (halfFile !== '') {
                    $('div#staff').append('<img src="/module/solmik/images/' + halfFile + '" class="sign half half-' + position + '" alt="' + halfFileMarker + '">');
                    $('div#staff .half-' + position).css({'position': 'absolute', 'bottom': bottom + 'px', 'left': left + 'px'});
                    left += sb.notesInStaff['inter-tone-signs-width'];
                }
                $('div#staff').append('<img src="/module/solmik/images/' + imageNamePart + '_note.svg" class="sign note note-' + position + '" alt="' + soundKeyF['basicTone'] + '">');
                $('div#staff .note-' + position).css({'position': 'absolute', 'bottom': bottom + 'px', 'left': left + 'px'});

                left += sb.notesInStaff['note-width'];
                console.log('prepareForPlayStaff, before notesInStaff[notes-left-current]: ', sb.notesInStaff['notes-left-current']);
                sb.notesInStaff['notes-left-current'] = left - sb.notesInStaff['start-left'];

            } else {
                $('#message-staff').empty().append(sb.messageToneOutOfRange + solmiArray[position]);
                sb.notesInStaff['continue'] = false;
//            throw new Error(messageToneOutOfRange + solmiArray[position]);// I don't want to end the program totally
//            return false;// must be something else
            }
        }
    };
});