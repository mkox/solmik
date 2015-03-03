define([
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