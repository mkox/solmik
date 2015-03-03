define([
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