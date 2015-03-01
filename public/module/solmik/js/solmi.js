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
// - (sometimes) the last tone is one tone after the last staff note is shown
//     
// - Frontend output of frequences + note-names, especially in connection with random:
//   - at which stage taken for this output?
//     - Is importent for testing
//     
// - getSolmiToneOfSoundKeyFromFrequency(...)
//    Maybe other solution for the following code:
//            } else if (half === '') { // for soundKey C, a
//                solmiToneNr--;
//                half = 'i';
//            }
//    => maybe adapt it better in var soundKeys2
// 
// - $('#base-tone-length').change(function() {
//   - add handling of wrong input (not int, not within a limit)
// 
// - "DEPRECIATED": rewrite code so that code marked with "DEPRECIATED" needs not be used any more
// 
// - maybe still problem with minor
// - frequencies:
//   - ...
// - staff:
//   - a bit smaller?
// - input through microphone, output
// - include soundkey in solmi-string
// - all Dur / all Moll one after the other for one string
//   - 2014-11-09: ?
// - sound off/on
// 
//     
// later:
// - use of backbone.js?
// - when a new solmiString is played before an other has ended:
//   - Interrupt the old one before the new one is played
// - throw new Error:
//   - Where is output?
// - 'please wait' or similar (eg circuling mouse pointer)
//   - when long solmiString is selected
// - test for whitespace in solmi string
//   - string = string.trim()
// - (better picture(s) for u/i in solmi view?)
// - in chromium (not chrome) a solmiString does not lead to the correct position
// - 
// - special code to make pixels less visible?
// - createFrequencies(): Calculate 111
// - var basicToneNr
//   - put it earlier, it does not need to be in every loop?
//     - but later it might be needed there, when the keys also can change within a solmi string
// - limit Length of solmiString?
//   - might only be relevant, if somebody gets into the access restricted backend.