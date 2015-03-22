// ADAPTED VERSION OF EXTERNAL SOURCE: https://github.com/FerCa/tuner/
define([
    'jquery',
    'underscore',
    'backbone'
//    'tuner'
], function ($, _, Backbone) {

    var frequencyBefore = 0;
    var tunerActive = false;
    var tunerShowData = true;

    function FrequenciesExtractor() {

        this.extractHigherValueFrequency = function (frequencyByteData, fourierFastTransformSize, sampleRate) {
//console.log('frequencyByteData: ', frequencyByteData);
            var higherValue = 0;
            var higherValueFrequency = 0;
            var length = frequencyByteData.length;
            // Search for the frequency with the higher value
            for (var x = 0; x < length; x++) {

                var frequency = __calculateFrequency(x, sampleRate, fourierFastTransformSize);

                if (frequencyByteData[x] > higherValue) {
                    higherValue = frequencyByteData[x];
                    higherValueFrequency = frequency;
                }
            }

            return higherValueFrequency;
        };

        function __calculateFrequency(position, sampleRate, fourierFastTransformSize) {
            return position * (sampleRate / (fourierFastTransformSize * 2));
        }

    }

    function startTuner() {
        that = this;
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
                if (that.tunerShowData === true
                        && note !== 0 && note !== 64 && note !== 75
                        && note !== frequencyBefore) {
                    
                    $('#frequencies-string2').append('-' + note);
                }

                frequencyBefore = note;
            });

        };

        var errorCallback = function errorCallbackFunction(error) {
            console.log(error);
        };

        navigator.getMedia({audio: true}, gotStreamCallback, errorCallback);
    }

    function Tuner(sourceNode, destinationNode, audioContext, frequenciesExtractor, InjectedNotesFrequencies) {

        this.sourceNode = sourceNode;
        this.destinationNode = destinationNode;
        this.audioContext = audioContext;
        this.frequenciesExtractor = frequenciesExtractor || new FrequenciesExtractor();
//        this.NotesFrequencies = InjectedNotesFrequencies || NotesFrequencies;
        this.count = 0;

        this.start = function (callback) {

            var analyserNode = this.audioContext.createAnalyser();
            analyserNode.fftSize = 2048;
            this.sourceNode.connect(analyserNode);

//        var javascriptNode = this.audioContext.createScriptProcessor(8192, 1, 1);
            var javascriptNode = this.audioContext.createScriptProcessor(false, 1, 1);
            analyserNode.connect(javascriptNode);

            var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);

            var self = this;
            // binding the callback to window to avoid the GC to clean it
            // https://bugzilla.mozilla.org/show_bug.cgi?id=916387
            javascriptNode.onaudioprocess = window.audioProcess = function () {

                analyserNode.getByteFrequencyData(freqByteData);

                var higherValueFrequency = self.frequenciesExtractor.extractHigherValueFrequency(freqByteData, analyserNode.fftSize, self.audioContext.sampleRate);

//            var note = self.NotesFrequencies.findNoteByFrequency(higherValueFrequency);
                var note = Math.floor(higherValueFrequency);

                callback(note);

            };

            javascriptNode.connect(this.destinationNode);
        };

    }

    return {
        frequencyBefore: frequencyBefore,
        tunerActive: tunerActive,
        tunerShowData: tunerShowData,
        startTuner: startTuner
    };

//    NotesFrequencies = {
//        findNoteByFrequency: function (frequency) {
//
//            var roundedFrequency = Math.floor(frequency);
//
//            var foundNoteUp = null;
//            var upFrequencyIndex = roundedFrequency;
//            var done = false;
//            while (!done) {
//                if (this.absNotesFrequencies[upFrequencyIndex] !== undefined) {
//                    foundNoteUp = this.absNotesFrequencies[upFrequencyIndex];
//                    done = true;
//                } else {
//                    upFrequencyIndex++;
//                }
//                if (upFrequencyIndex >= 7902) {
//                    done = true;
//                }
//            }
//
//            var foundNoteDown = null;
//            var downFrequencyIndex = roundedFrequency;
//            done = false;
//            while (!done) {
//                if (this.absNotesFrequencies[downFrequencyIndex] !== undefined) {
//                    foundNoteDown = this.absNotesFrequencies[downFrequencyIndex];
//                    done = true;
//                } else {
//                    downFrequencyIndex--;
//                }
//                if (downFrequencyIndex <= 0) {
//                    done = true;
//                }
//            }
//
//            return foundNoteDown + " / " + foundNoteUp;
//        },
//        absNotesFrequencies: {
//            16: "C0",
//            17: "C#0/Db0",
//            18: "D0",
//            19: "D#0/Eb0",
//            20: "E0",
//            21: "F0",
//            23: "F#0/Gb0",
//            24: "G0",
//            25: "G#0/Ab0",
//            27: "A0",
//            29: "A#0/Bb0",
//            30: "B0",
//            32: "C1",
//            34: "C#1/Db1",
//            36: "D1",
//            38: "D#1/Eb1",
//            41: "E1",
//            43: "F1",
//            46: "F#1/Gb1",
//            49: "G1",
//            51: "G#1/Ab1",
//            55: "A1",
//            58: "A#1/Bb1",
//            61: "B1",
//            65: "C2",
//            69: "C#2/Db2",
//            73: "D2",
//            77: "D#2/Eb2",
//            82: "E2",
//            87: "F2",
//            92: "F#2/Gb2",
//            98: "G2",
//            103: "G#2/Ab2",
//            110: "A2",
//            116: "A#2/Bb2",
//            123: "B2",
//            130: "C3",
//            138: "C#3/Db3",
//            146: "D3",
//            155: "D#3/Eb3",
//            164: "E3",
//            174: "F3",
//            185: "F#3/Gb3",
//            196: "G3",
//            207: "G#3/Ab3",
//            220: "A3",
//            233: "A#3/Bb3",
//            246: "B3",
//            261: "C4",
//            277: "C#4/Db4",
//            293: "D4",
//            311: "D#4/Eb4",
//            329: "E4",
//            349: "F4",
//            369: "F#4/Gb4",
//            392: "G4",
//            415: "G#4/Ab4",
//            440: "A4",
//            466: "A#4/Bb4",
//            493: "B4",
//            523: "C5",
//            554: "C#5/Db5",
//            587: "D5",
//            622: "D#5/Eb5",
//            659: "E5",
//            698: "F5",
//            739: "F#5/Gb5",
//            783: "G5",
//            830: "G#5/Ab5",
//            880: "A5",
//            932: "A#5/Bb5",
//            987: "B5",
//            1046: "C6",
//            1108: "C#6/Db6",
//            1174: "D6",
//            1244: "D#6/Eb6",
//            1318: "E6",
//            1396: "F6",
//            1479: "F#6/Gb6",
//            1567: "G6",
//            1661: "G#6/Ab6",
//            1760: "A6",
//            1864: "A#6/Bb6",
//            1975: "B6",
//            2093: "C7",
//            2217: "C#7/Db7",
//            2349: "D7",
//            2489: "D#7/Eb7",
//            2637: "E7",
//            2793: "F7",
//            2959: "F#7/Gb7",
//            3135: "G7",
//            3322: "G#7/Ab7",
//            3520: "A7",
//            3729: "A#7/Bb7",
//            3951: "B7",
//            4186: "C8",
//            4434: "C#8/Db8",
//            4698: "D8",
//            4978: "D#8/Eb8",
//            5274: "E8",
//            5587: "F8",
//            5919: "F#8/Gb8",
//            6271: "G8",
//            6644: "G#8/Ab8",
//            7040: "A8",
//            7458: "A#8/Bb8",
//            7902: "B8"
//        }
//
//    };
});