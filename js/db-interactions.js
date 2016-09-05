"use strict"

function getSongs(){
  return new Promise(function(resolve, reject){
    $.ajax({
      url: 'https://music-history-7288d.firebaseio.com/songs.json'
    }).done(function(content){
      var data = content
      resolve(data)
    }).fail(function(error){
        reject(error)
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
    }).done(function(songId){
        resolve(songId)
    }).fail(function(error){
        reject(error)
    })
  })
}

function deleteSong(songKey){
  return new Promise(function(resolve, reject){
    $.ajax({
      url: `https://music-history-7288d.firebaseio.com/songs/${songKey}.json`,
      type: 'DELETE'
    }).done(function(data){
        resolve(data)
    }).fail(function(error){
        reject(error)
    })
  })
}


module.exports = {getSongs, addSong, deleteSong}
