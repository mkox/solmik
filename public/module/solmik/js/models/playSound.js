define([
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