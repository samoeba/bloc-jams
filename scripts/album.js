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
            + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
            + '  <td class="song-item-title">' + songName + '</td>'
            + '  <td class="song-item-duration">' + songLength + '</td>'
            + '</tr>'
        ;

    var $row = $(template);

    var clickHandler = function() {

        var songNumber = $(this).attr('data-song-number');

        if (currentlyPlayingSong !== null) {
            var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingCell.html(currentlyPlayingSong);
        }

        if (currentlyPlayingSong !== songNumber) {
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songNumber;
        }

        else if (currentlyPlayingSong === songNumber) {
            $(this).html(playButtonTemplate);
            currentlyPlayingSong = null;
        }

    };

    var onHover = function() {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function() {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
    };

    $row.find('.song-item-number').click(clickHandler);

    $row.hover(onHover, offHover);

    return $row

};

var setCurrentAlbum = function(album) {

    // #1
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    // #2
    $albumTitle.text(album.name);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    // #3
    $albumSongList.empty();

    // #4
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
        $albumSongList.append($newRow);
    }

};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

$(window).ready(function() {

    setCurrentAlbum(albumPicasso);

    document.getElementsByClassName('album-cover-art')[0].addEventListener('click', function () {

        if (document.getElementsByClassName("album-view-artist")[0].textContent == "Pablo Picasso") {
            setCurrentAlbum(albumDylan);
        } else if (document.getElementsByClassName("album-view-artist")[0].textContent == "Bob Dylan") {
            setCurrentAlbum(albumMarconi);
        } else {
            setCurrentAlbum(albumPicasso);
        }

    });

});

