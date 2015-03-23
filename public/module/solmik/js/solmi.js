define([
  'solmiBasics',
  'solmiMain'
], function(solmiBasics, solmiMain){
//], function(solmiBasics){
  console.log('solmi.js, solmiBasics', solmiBasics);
  return {};
});

// TODO:
//     
// - Categories with solmistrings: browse while still seeing the upper part of the page
// - Find sounds with more correct frequencies
// - minor sound keys: random min/max values are not correct
//   - correction is nessessary in createSolmiArrayFromToneNumbers.js -> create
// - $('#base-tone-length').change(function() {
//   - add handling of wrong input (not int, not within a limit)
// - "DEPRECIATED": rewrite code so that code marked with "DEPRECIATED" needs not be used any more
// - maybe still problem with minor
// - make additional test output for getFrequenciesInfo()
// - random
//   - make repeat button beside the go button
//     
// later:
// - use of backbone.js?
// - choose between English and German
// - when a new solmiString is played before an other has ended:
//   - Interrupt the old one before the new one is played
// - throw new Error:
//   - Where is output?
// - 'please wait' or similar (eg circuling mouse pointer)
//   - when long solmiString is selected
// - test for whitespace in solmi string
//   - string = string.trim()
// - (better picture(s) for u/i in solmi view?)
// - 
// - special code to make pixels less visible?
// - createFrequencies(): Calculate 111
// - limit Length of solmiString?
//   - might only be relevant, if somebody gets into the access restricted backend.
// - sound off/on
// - better implementation of input through microphone, output
//   - ...
//   - don't show further small frequencies
// - include soundkey in solmi-string
// - solmistring-form-for-list: class instead of id
// - Login
//   - better page for wrong login, maybe backbutton
// - /** -> more comments
// - after click on "add string"
//   - show pre-selected category
// - message "Value is required and can't be empty": more precisely
// - getSolmiToneOfSoundKeyFromFrequency(...)
//    Maybe other solution for the following code:
//            } else if (half === '') { // for soundKey C, a
//                solmiToneNr--;
//                half = 'i';
//            }
//    => maybe adapt it better in var soundKeys2