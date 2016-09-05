"use strict"

// CONVERTS TO TIME FUNCTION
function convertTime(time){
  if(time.includes(':')){
    return time
  }
  else{
    var mins = Math.floor(time/60)
    var secs = time % 60
    var converted = `${mins}:${(secs < 10 ? "0" : "")}${secs}`
    return converted
  }
}

function printStuff(thing){
  var songlist = $('#songlist')
  var song = $("<div></div>")
  song.addClass('element')
  song.html(`<h2 class='song_name'>${thing.title}
    <button class='delete glyphicon glyphicon-remove'></button></h2>
    <p class='artist'>${thing.artist}</p><span> &nbsp;|&nbsp;</span>
    <p class='album'>${thing.album}</p><span> &nbsp;|&nbsp; </span>
    <p class="genre">${thing.genre}</p><span> &nbsp;|&nbsp; </span>
    <p class="length">${convertTime(thing.length)}</p>`)
  songlist.append(song)
}

module.exports = {printStuff, convertTime}
