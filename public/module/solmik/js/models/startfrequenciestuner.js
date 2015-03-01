define([
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