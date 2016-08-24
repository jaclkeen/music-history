function addToDom(song_info){
  for(var key in song_info){
    printStuff(song_info[key])
    Songs.addToSongsArray(song_info[key])
    addArtistsIntoFilter(song_info[key])
    addAlbumsIntoFilter(song_info[key])
  }
}

function addUserInputSong(){
  var $add_song = $("#add_song").val();
  var $add_album = $("#add_album").val();
  var $add_artist = $("#add_artist").val();
  var $add_genre = $("#add_genre").val();
  var $add_length = $("#add_length").val();
  var s_banner = $('#success_banner')

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
    Songs.addSong(userSong[0])
      .then(function(){
        clearPage();
        s_banner.fadeIn(500).removeClass('hidden').fadeOut(3000)
        addToDom(userSong)
      })
    // SHOWS WINNING BANNER
  }
}

function eventListeners(){
  // ON SUBMIT CLICK, CALLS ADD USER INPUT SONG FUNCTION
  var $add_song = $("#add");
  $add_song.on("click", addUserInputSong)
//CLEAR INPUT FIELDS ON ADD MUSIC PAGE
  var clear_add_music_fields = $("#clear");
  clear_add_music_fields.on("click", clearPage);
// ADDS SECOND JSON FILE TO DOM ON 'MORE' CLICK
  // var $more = $('#add_more');
  // $more.on("click", function(){
  //   Songs.loadFiles('lib/moreSongs.json')
  //     .then(
  //       function(data){
  //         addToDom(data)
  //     })
  //     $(this).css("display", "none");
  // })
// TAKES RANGE INPUT AND CONVERTS TO TIME
  var length = $('#length')
  var l_val = $('#length_val')
  length.on('input', function(){
    var x = length.val()
    l_val.html(convertTime(x))
  })
  //EXECUTES FILTER ON SONGS ARRAY WHEN FILTER BUTTON IS CLICKED
  var filter = $('#filter')
  filter.on('click', function(){
    timeFilter(Songs.getSongs)
    filterStuff(Songs.getSongs)
  })
}

function buttonListeners(){
  // REMOVES ELEMENT WHEN RED X IS CLICKED
  var $song_element = $('.element')
    $song_element.on("click", function(e){
    if(e.target && e.target.nodeName === "BUTTON"){
      $(this).remove('.element')
    }
  })

    $song_element.on('mouseover', function(e){
      if(e.target && e.target.nodeName === "BUTTON"){
        $(e.target).animate('slow').removeClass('glyphicon glyphicon-remove delete').addClass('remove').html('Delete')
      }
    })

    $song_element.on('mouseout', function(e){
      if(e.target && e.target.nodeName === "BUTTON"){
        $(e.target).addClass('glyphicon glyphicon-remove delete').removeClass('remove').html('')
      }
    })
}
// CONVERTS TO TIME FUNCTION
function convertTime(time){
  if(time.includes(':')){
    return time
  }
  else{
    var mins = Math.floor(time/60)
    var secs = time % 60
    var time = `${mins}:${(secs < 10 ? "0" : "")}${secs}`
    return time
  }
}
