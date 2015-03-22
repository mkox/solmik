define([
    'jquery',
    'underscore',
    'backbone',
    'solmiBasics'
], function ($, _, Backbone, sb) {

    return {
        inputBaseToneLength: function () {
            return '<br>Base tone length: <input id="base-tone-length" type="text" value="' + sb.baseToneLength + '">';
        }
    };
});