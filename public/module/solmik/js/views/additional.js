define([
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