"use strict";

var dom = require('./domBuilder'),
    db = require('./db-interactions'),
    _songs = []

// ON SUBMIT CLICK, CALLS ADD USER INPUT SONG FUNCTION
$('#add').on("click", addUserInputSong)

//CLEAR INPUT FIELDS ON ADD MUSIC PAGE
$('#clear').on("click", function(){
  $("#add_song, #add_album, #add_artist, #add_genre, #add_length").val("");
});

// SHOWS TIME BASED ON RANGE INPUT
$('#length').on('input', function(){
  $('#length_val').html(dom.convertTime($('#length').val()))
})

//EXECUTES FILTER ON SONGS ARRAY WHEN FILTER BUTTON IS CLICKED
$('#filter').on('click', function(){
  timeFilter(_songs)
  filterStuff(_songs)
})

  // REMOVES ELEMENT WHEN RED X IS CLICKED
$(document).on('click', '.delete', function(){
  $(this).closest('.element').remove()
})

//////SPA EVENTS//////
$('#add_button').on("click", function(){
  $("#add_music").removeClass('hidden');
  $("#music").addClass("hidden");
})

$("#view_music").on("click", function(){
  $("#music").removeClass('hidden');
  $("#add_music").addClass('hidden');
})
/////END SPA EVENTS/////

function addArtistsIntoFilter(arr){
  var artists_select = document.getElementById('artist').childNodes
  var artist_values = []
  artists_select.forEach(function(item){
    artist_values.push(item.value)
  })
    if(!artist_values.includes(arr.artist)){
      let x = `<option value=${arr.artist}>${arr.artist}</option>`
      $('#artist').append(x)
    }
  }

function addAlbumsIntoFilter(arr){
  var album_select = document.getElementById('album').childNodes
  var album_values = []
  album_select.forEach(function(item){
    album_values.push(item.value)
  })

  if(!album_values.includes(arr.album)){
    let x = `<option value="${arr.album}">${arr.album}</option>`
    $('#album').append(x)
  }
}

function filterStuff(obj){
  var artist = $('#artist').val()
  var album = $('#album').val()
  var genre = $('#genre').val()
  $('#songlist').html("")

  for(var item in obj){
    console.log(obj[item])
    if(artist === obj[item].artist && artist !== 'all'){
      dom.printStuff(obj[item])
    }
    else if(album === obj[item].album && album !== 'all'){
      dom.printStuff(obj[item])
    }
    else if(genre === obj[item].genre && genre !== 'all'){
      dom.printStuff(obj[item])
    }
    else if(artist === 'all' && album === 'all' && genre === 'all'){
      dom.printStuff(obj[item])
    }
  }
}

function timeFilter(arr){
  var length = $('#length').val()
  $('#songlist').html(" ")
  arr.forEach(function(item){
    if(length > item.length){
      dom.printStuff(item)
    }
  })
}

function addUserInputSong(){
  var $add_song = $("#add_song").val();
  var $add_album = $("#add_album").val();
  var $add_artist = $("#add_artist").val();
  var $add_genre = $("#add_genre").val();
  var $add_length = $("#add_length").val();

  // VALIDATE SONG INPUT
  if($add_song === "" || $add_album === "" || $add_artist === "" || $add_genre === "" || $add_length === ""){
    return alert("All 5 field must have a value!");
  }
  else if(!$add_length.includes(':')){
    $('#add_length').val("")
    return alert("Song length must be in the correct format!");
  }
  else{
    var userSong = [{
      title: $add_song,
      artist: $add_artist,
      album: $add_album,
      genre: $add_genre,
      length: $add_length
    }]
      Materialize.toast(`You added ${$add_song}`, 40000, 't_style')
      $('#add_length, #add_genre, #add_artist, #add_album, #add_song').html("")
      addToDom(userSong)
  }
}

function addToDom(song_info){
  for(var key in song_info){
    dom.printStuff(song_info[key])
    _songs.push(song_info[key])
    addArtistsIntoFilter(song_info[key])
    addAlbumsIntoFilter(song_info[key])
  }
}

db.getSongs()
  .then(
    function(songData){
      addToDom(songData)
    })
