// Example Album
var albumPicasso = {
    name: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { name: 'Blue', length: '4:26' },
        { name: 'Green', length: '3:14' },
        { name: 'Red', length: '5:01' },
        { name: 'Pink', length: '3:21'},
        { name: 'Magenta', length: '2:15'}
    ]
};

// Another Example Album
var albumMarconi = {
    name: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { name: 'Hello, Operator?', length: '1:01' },
        { name: 'Ring, ring, ring', length: '5:01' },
        { name: 'Fits in your pocket', length: '3:21'},
        { name: 'Can you hear me now?', length: '3:14' },
        { name: 'Wrong phone number', length: '2:15'}
    ]
};

var albumDylan = {
    name: "Highway 61 Revisited",
    artist: "Bob Dylan",
    label: 'Sony Music',
    year: '1965',
    albumArtUrl: 'assets/images/album_covers/dylan.jpg',
    songs: [
        { name: "Like a Rolling Stone", length: "5:32"},
        { name: "Tombstone Blues", length: '6:53'},
        { name: "It Takes A Lot To Laugh, It Takes A Train To Cry", length: "4:51"},
        { name: "From A Buick 6", length: "3:45"},
        { name: "Ballad Of A Thin Man", length: "6:06"},
        { name: "Queen Jane Approximately", length: "5:31"},
        { name: "Highway 61 Revisited", length: "3:30"},
        { name: "Just Like Tom Thumb's Blues", length: "5:31"},
        { name: "Desolation Row", length: "11:19"}
    ]
};

var createSongRow = function(songNumber, songName, songLength) {

    var template =
            '<tr class="album-view-song-item">'
            + '  <td class="song-item-number">' + songNumber + '</td>'
            + '  <td class="song-item-title">' + songName + '</td>'
            + '  <td class="song-item-duration">' + songLength + '</td>'
            + '</tr>'
        ;

    return template;

};

var setCurrentAlbum = function(album) {

    // #1
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

    // #2
    albumTitle.firstChild.nodeValue = album.name;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);

    // #3
    albumSongList.innerHTML = '';

    // #4
    for (i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
    }

};

window.onload = function() {

    setCurrentAlbum(albumPicasso);

    var toggleAlbums = function(album) {
        document.getElementsByClassName('album-cover-art')[0].addEventListener('click', function () {
            setCurrentAlbum(album);
        });
    };

    var artistName = document.getElementsByClassName("album-view-artist")[0];

    if (document.getElementsByClassName("album-view-artist")[0] = "Pablo Picasso") {
        toggleAlbums(albumDylan);
    }

    // When this "if" statement is enabled nothing works

    //if (document.getElementsByClassName("album-view-artist")[0] = "Bob Dylan") {
    //    toggleAlbums(albumPicasso);
    //}

    //Also tried this switch but don't think that is the way to go or at least I'm not sure how to enable it with an event listener

    //switch (artistName) {
    //    case "Pablo Picasso":
    //        toggleAlbums(albumDylan);
    //        break;
    //    case "Bob Dylan":
    //        toggleAlbums(albumMarconi);
    //        break;
    //    case "Guglielmo Marconi":
    //        toggleAlbums(albumPicasso);
    //        break;
    //    default:
    //        console.log("WTF!");
    //}

};


