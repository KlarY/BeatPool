// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const ipcRenderer = require('electron').ipcRenderer;
const $ = jquery = require('jquery');
require('./js/Base64binary.js');
require('./js/MIDI.js');
console.log($('#info'));
MIDI.loadPlugin({
  soundfontUrl: "./soundfont/",
  instrument: "acoustic_grand_piano",
  onprogress: function(state, progress) {
    console.log(state, progress);
  },
  onsuccess: function() {
    console.log('MIDI-JS loaded');
  }
});
ipcRenderer.on('global-shortcut', function(event, arg) {
  var $current = $('.current');
  var $next;
  $current.text(arg);
  if(!($next = $current.next()).length){
    $next = $current.parent().next().children().first();
  }
  $current.removeClass('current');
  $next.addClass('current');
  var delay = 0; // play one note every quarter second
  var note = 49+arg; // the MIDI note
  var velocity = 127; // how hard the note hits
  // play the note
  MIDI.setVolume(0, 127);
  MIDI.noteOn(0, note, velocity, delay);
  MIDI.noteOff(0, note, delay + 0.75);
});
$(document).ready(function(){
  $('.note').click(function(){
    $('.current').removeClass('current');
    $(this).addClass('current');
  })
})
