var Songs = (function(){
  var _songs = [];

  function addToSongsArray(item){
    _songs[_songs.length] = item;
  }

  function showSongs(){
    return new Promise(function(resovle, reject){
      $.ajax({
        url: 'https://music-history-7288d.firebaseio.com/songs.json'
      }).done(function(content){
        var data = content
        resovle(data)
      })
    })
  }

  function addSong(song){
    return new Promise(function(resolve, reject){
      $.ajax({
        url: 'https://music-history-7288d.firebaseio.com/songs.json',
        type: 'POST',
        data: JSON.stringify(song),
        dataType: 'json'
      }).done(function(data){
        resolve(data)
      })
    })
  }

  return {
    addToSongsArray: addToSongsArray,
    addSong: addSong,
    getSongs: _songs,
    loadFiles: showSongs
  }
})()

function spa(){
  $('#add_button').on("click", function(){
    $("#add_music").removeClass('hidden');
    $("#music").addClass("hidden");
  })
  $("#view_music").on("click", function(){
    $("#music").removeClass('hidden');
    $("#add_music").addClass('hidden');
  })
}

function clearPage(){
  $("#add_song").val("");
  $("#add_album").val("");
  $("#add_artist").val("");
  $("#add_genre").val("");
  $("#add_length").val("");
}

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
  buttonListeners()
}

function filterStuff(obj){
  var artist = $('#artist').val()
  var album = $('#album').val()
  var genre = $('#genre').val()
  $('#songlist').html("")

  for(var item in obj){
    console.log(obj[item])
    if(artist === obj[item].artist && artist !== 'all'){
      printStuff(obj[item])
    }
    else if(album === obj[item].album && album !== 'all'){
      printStuff(obj[item])
    }
    else if(genre === obj[item].genre && genre !== 'all'){
      printStuff(obj[item])
    }
    else if(artist === 'all' && album === 'all' && genre === 'all'){
      printStuff(obj[item])
    }
  }
}

function timeFilter(arr){
  var length = $('#length').val()
  $('#songlist').html(" ")
  arr.forEach(function(item){
    if(length > item.length){
      printStuff(item)
    }
  })
}

Songs.loadFiles()
  .then(
    function(songData){
      addToDom(songData)
    })
  .then(
    function(){
      spa()
    })
  .then(
    function(){
      eventListeners()
    })
