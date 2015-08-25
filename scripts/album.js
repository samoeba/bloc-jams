
//Creates a row of data for each song
var createSongRow = function(songNumber, songName, songLength) {

    //HTML for song row
    var template =
            '<tr class="album-view-song-item">'
            + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
            + '  <td class="song-item-title">' + songName + '</td>'
            + '  <td class="song-item-duration">' + songLength + '</td>'
            + '</tr>'
        ;

    //Variable for the HTML
    var $row = $(template);

    //Determines status of clicked song row and changes accordingly
    var clickHandler = function() {

        //Reads data attribute of clicked row and assigns that number to the variable "songNumber"
        var songNumber = parseInt($(this).attr('data-song-number'));

        //If a song is currently playing it won't be equal to null therefore we get the cell of the currently playing
        //song and assign it the variable "currentlyPlayingCell". We then give it the HTML of the currentlyPlayingSongNumber
        //because it is no longer playing
        if (currentlyPlayingSongNumber !== null) {
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }

        //Here we determine if the currentlyPlayingSongNumber is not equal to the song row we just clicked. If so, we
        //give that clicked row the HTML of a pause button to show that it is now playing. Then we change the value of
        //the "currentlyPlayingSongNumber" and the "currentSongFromAlbum" variables with the setSong function to "songNumber"
        if (currentlyPlayingSongNumber !== songNumber) {
            $(this).html(pauseButtonTemplate);
            setSong(songNumber);
            currentSoundFile.play();

            updateSeekBarWhileSongPlays();

            //We update the data in the player bar to show our new currently playing song
            updatePlayerBarSong();
        }

        //If the currentlyPlayingSongNumber is equal to the song row we just clicked then it will either pause or play it
        else if (currentlyPlayingSongNumber === songNumber) {
            if (currentSoundFile.isPaused()) {
                $(this).html(pauseButtonTemplate);
                $('.left-controls.play-pause').html(playerBarPauseButton);
                currentSoundFile.play();

                updateSeekBarWhileSongPlays();
            } else {
                $(this).html(playButtonTemplate);
                $('.left-controls.play-pause').html(playerBarPlayButton);
                currentSoundFile.pause();
            }
        }

    };

    var onHover = function() {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function() {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
    };

    $row.find('.song-item-number').click(clickHandler);

    $row.hover(onHover, offHover);

    return $row

};

var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.artist);

    $('.left-controls .play-pause').html(playerBarPauseButton);

};

var setCurrentAlbum = function(album) {

    currentAlbum = album;

    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    $albumTitle.text(album.name);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    $albumSongList.empty();

    for (i = 0; i < album.songs.length; i++) {
        //var sound = new buzz.sound(album.songs[i].audioUrl, {  formats: [ 'mp3' ],   preload: 'metadata'  });
        var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
        $albumSongList.append($newRow);
    }

};

var updateSeekBarWhileSongPlays = function() {

    if (currentSoundFile) {
        // #1
        currentSoundFile.bind('timeupdate', function(event) {
            // #2
            var seekBarFillRatio = this.getTime() / this.getDuration();
            var $seekBar = $('.seek-control .seek-bar');

            updateSeekPercentage($seekBar, seekBarFillRatio);
        });
    }

};

//Assigns the percentage to the fill of the seek bars and to the left css property of the thumb class
//Also makes sure that the value is never less than 0 or more than 100
//Is assigned arguments in setupSeekBars func. that determine which seek bar action is being taken upon and what the percentage is
var updateSeekPercentage = function($seekBar, seekBarFillRatio) {

    var offsetXPercent = seekBarFillRatio * 100;
    // #1
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);

    // #2
    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});

};

var setupSeekBars = function() {

    var $seekBars = $('.player-bar .seek-bar');

    $seekBars.click(function(event) {
        // #1
        var offsetX = event.pageX - $(this).offset().left;
        var barWidth = $(this).width();
        // #2
        var seekBarFillRatio = offsetX / barWidth;

        // #3
        updateSeekPercentage($(this), seekBarFillRatio);
    });

    $seekBars.find('.thumb').mousedown(function(event) {

        // #2
        var $seekBar = $(this).parent();

        // #3
        $(document).bind('mousemove.thumb', function(event){
            var offsetX = event.pageX - $seekBar.offset().left;
            var barWidth = $seekBar.width();
            var seekBarFillRatio = offsetX / barWidth;

            updateSeekPercentage($seekBar, seekBarFillRatio);
        });

        // #4
        $(document).bind('mouseup.thumb', function() {
            $(document).unbind('mousemove.thumb');
            $(document).unbind('mouseup.thumb');
        });

    });

};


var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};


var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
};

var togglePlayFromPlayerBar = function() {
    if (currentlyPlayingSongNumber === null) {
        return nextSong();
    }

    var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);

    if (currentSoundFile.isPaused()) {
        currentlyPlayingCell.html(pauseButtonTemplate);
        $playPauseButton.html(playerBarPauseButton);
        currentSoundFile.play();
    } else if (currentSoundFile) {
        currentlyPlayingCell.html(playButtonTemplate);
        $playPauseButton.html(playerBarPlayButton);
        currentSoundFile.pause();
    }
};



var setSong = function(songNumber) {

    if (currentSoundFile) {
        currentSoundFile.stop();
    }

    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    // #1
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        formats: [ 'mp3' ],
        preload: true
    });

    setVolume(currentVolume);

};

var setVolume = function(volume) {
    if (currentSoundFile) {
        currentSoundFile.setVolume(volume)
    }
};

var nextSong = function() {

    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };

    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();
    updatePlayerBarSong();

    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);

};

var previousSong = function() {

    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };

    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();
    updatePlayerBarSong();

    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);

};

var $playPauseButton = $('.left-controls .play-pause');
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

var $previousButton = $('.left-controls .previous');
var $nextButton = $('.left-controls .next');

$(window).ready(function() {

    setCurrentAlbum(albumPicasso);
    setupSeekBars();
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    $playPauseButton.click(togglePlayFromPlayerBar);

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

