define([
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
            sb.startTimeOfPlay = Date.now();
            playSound.playSound(0); // play first tone a bit earlier
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
            if(position > 0){
                playSound.playSound(position);
            }
            sb.currentTimeOfPlay += tonelength;
            var dateNow = Date.now();
            var waitTime = sb.startTimeOfPlay + sb.currentTimeOfPlay - dateNow;
            if(waitTime < 0){
                console.log('playSolmiString, !: waitTime < 0');
            }
            that.waitTimeDiffSum += tonelength - waitTime;
            var timePassed = dateNow - sb.startTimeOfPlay;
            var waitTime2 =  sb.currentTimeOfPlay - timePassed;
//            var timePassedDiff = timePassed - that.timePassedBefore;
            that.timePassedBefore = timePassed;
//            console.log('playSolmiString dateNow: ', dateNow);
//            console.log('playSolmiString sb.currentTimeOfPlay: ', sb.currentTimeOfPlay);
//            console.log('playSolmiString timePassed: ', timePassed);
//            console.log('playSolmiString timePassedDiff: ', timePassedDiff);
//            console.log('playSolmiString waitTime: ', waitTime);
//            console.log('playSolmiString waitTime2: ', waitTime2);
//            console.log('playSolmiString that.waitTimeDiffSum: ', that.waitTimeDiffSum);
            if (position < sb.playData['notes-length'] - 1) {
                setTimeout(function () {
                    that.playSolmiString(position + 1);
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
            $('#message-staff, .notes-string, .frequencies-string').empty();
            var baseScale = false;
            if (mode === 'standard') {
console.log('playCommon.js $(currentField)', $(currentField));
console.log('playCommon.js $(currentField).parents(form)', $(currentField).parents('form'));
//                var soundKey = $(currentField).parent('form').find('.sound-keys').val();
                var soundKey = $(currentField).parents('form').find('.sound-keys').val();
console.log('playCommon.js soundKey', soundKey);
console.log('playCommon.js x200');
console.log('playCommon.js x210');
                console.log('prepareForPlay, scalesCurrent : ' + sb.scalesCurrent);
//                var solmiString = $(currentField).parent('form').find('input[type="text"]').val();
                var solmiString = $(currentField).parents('form').find('input[type="text"]').val();
//                baseScale = parseInt($(currentField).parent('form').find('.scales').val());
                baseScale = parseInt($(currentField).parents('form').find('.scales').val());
                console.log('solmiString: ' + solmiString);
            } else if (mode === 'repeat') {
                var soundKey = $('.used-string .sound-key').text();
                var solmiString = $('.used-string .solmistring').text();
                baseScale = parseInt($('.used-string .scale').text());
            }
            if(mode === 'standard' || mode === 'repeat'){
                sb.setSoundKeyCurrent(soundKey);
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

            $('.used-string').empty();
            var outputString = '<input class="repeat" type="button" value="Repeat" name="repeat">';
            outputString += '<span class="solmistring">' + solmiArray.join('-') + '</span>';
            outputString += ' (used string), <span class="sound-key">' + sb.soundKeyCurrent['key'] + '</span> ' + sb.soundKeyCurrent['mm']
            + ', scale <span class="scale">' + baseScale + '</span>';
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