

function MusicPlayer() {


    if (this instanceof MusicPlayer) {

    }
    else {
        console.log('Cannot be constructed without new Keyword'); return;
    }
    this.currentSongIndex = 0; // Used to point out the current song;
    this.songsList = []; // Songs list is stored in this property;

    //Capitalized so as to always call with new keyword.
    this.player = createPlayer();

    this.player.addEventListener('click', clickHandlers.bind(this));
    this.player.addEventListener('play', (event) => {
        event.target.dataset.value = 'Pause';
        event.target.textContent = 'Pause';
    });
    this.player.addEventListener('pause', (event) => {
        event.target.dataset.value = 'play';
        event.target.textContent = 'play';
    });


}


const sharedFunctions = {
    loadSongsList: loadSongsList,
    playNext: playNext,
    playPrev: playPrev,
};
MusicPlayer.prototype = sharedFunctions// To add functions to this element

function createPlayer() {
    let element = document.createElement('section');
    element.classList.add('music_player')
    element.innerHTML = `
    <section class="img">
            <img src=""
                alt="">
    </section>
    <section class="info">
    <section class="title">
        <span>  </span>
    </section>
    <section class="description"> <span></span></section>
    <section class="player">
        <audio src="" ></audio>
        <section class="controls">
            <ul>
                <li>
                    <span id="currentTime"></span>
                    <progress id="progress" value="0" max="100"> 0% </progress>
                    <span id="Duration"></span>
                </li>
                <li><a data-value="Previous"> Previous</a></li>
                <li><a data-value="Play"> <i class="fa-solid fa-play"></i></a></li>
                <li><a data-value="Next"> Next</a></li>
                <li><a data-value="remove"> Remove</a></li>
                <li><a data-value="volumetoggler" data-state="closed"> &#8752;
                        <input type="range" min="0" max="10" step="1" value="10" id="volumeControl">
                    </a>

                </li>
            </ul>
        </section>
    </section>
</section>
    `;
    return element;
}

let songsList =
    [{
        source: 'https://friendstamilmp3.net/Filesystem/A-Z%20Movie%20Songs/Viruman%20(2022)/Kanja%20Poovu%20Kannala.mp3',
        image: 'https://friendstamilmp3.net/Filesystem/A-Z%20Movie%20Songs/Viruman%20(2022)/Folder.jpg',
        title: 'Kanja Poovu Kannala', description: 'Viruman'
    },
    {
        source: 'https://friendstamilmp3.net/Filesystem/A-Z%20Movie%20Songs/Vikram%20(2022)/Pathala%20Pathala%20Kuttyum%20Pathala.mp3',
        image: 'https://friendstamilmp3.net/Filesystem/A-Z%20Movie%20Songs/Vikram%20(2022)/Folder.jpg',
        title: 'Pathala Pathala Kuttyum Pathala', description: 'Vikram - 2022'
    },
    {
        source: 'https://friendstamilmp3.net/Filesystem/A-Z%20Movie%20Songs/Vikram%20(2022)/Vikram%20(Title%20Track)%20-%20Nayagan%20Meendum%20Varaan.mp3',
        image: 'https://friendstamilmp3.net/Filesystem/A-Z%20Movie%20Songs/Vikram%20(2022)/Folder.jpg',
        title: 'Vikram (Title Track) - Nayagan Meendum Varaan', description: 'Vikram - 2022'
    },
    ]

function loadSongsList() {
    this.songsList = songsList;
    loadSong.call(this, songsList[this.currentSongIndex]);
}

function loadSong(song) {
    console.log(this);
    this.player.querySelector('img').src = song.image;
    this.player.querySelector('audio').src = song.source;
    this.player.querySelector('.title').textContent = song.title;
    this.player.querySelector('.description span').textContent = song.description;
}

function playNext() {
    this.currentSongIndex = this.currentSongIndex + 1 % this.songsList.length;
    loadSong.call(this, songsList[this.currentSongIndex]);
    this.player.querySelector('audio').play();
}

function playPrev() {
    this.currentSongIndex = this.currentSongIndex - 1;
    if (this.currentSongIndex < 0) this.currentSongIndex = this.songsList.length - 1;
    loadSong.call(this, songsList[this.currentSongIndex]);
    this.player.querySelector('audio').play();
}

function clickHandlers(event) {

    if (!event.target.dataset) {
        event.stopPropogation();
        return
    }
    switch (event.target.dataset.value) {
        case "Play":
            this.player.querySelector('audio').play();
            event.target.dataset.value = 'Pause';
            event.target.textContent = 'Pause';
            break;
        case "Pause":
            this.player.querySelector('audio').pause();
            event.target.dataset.value = 'Play';
            event.target.textContent = 'Play';
            break;
        case "Next":
            this.playNext();
            break;
        case "Previous":
            this.playPrev();
            break;
        case "remove":
            this.player.remove();
            break;
        case "volumetoggler":
            if (event.target.dataset.state = 'closed') {
                event.target.dataset.state = 'open';
                event.target.querySelector('#volumeControl').value = this.player.querySelector('audio').volume * 10;
                event.target.querySelector('#volumeControl').addEventListener('change', changeVolumeControl.bind(this, event));
            }
            else {
                event.target.querySelector('#volumeControl').removeEventListener('change', changeVolumeControl.bind(this, event))
                event.target.dataset.state = 'closed';
            }
        default:
            break;
    }
}

function changeVolumeControl(event) {

    this.player.querySelector('audio').volume = event.target.querySelector('#volumeControl').value / 10;
}

export function createNewMusicPlayer() {
    // Creates a new music player and returns the object.
    return new musicPlaer();
    //return new MusicPlayer();   // This is used for the function based prototype implementation.
}



export class musicPlaer {

    player = null;
    songsList = [];
    currentSongIndex  = 0;
    constructor() {
        this.player = this.createPlayer();
        this.player.onclick = this.handleEvents.bind(this);
    }


    createPlayer() {
        let element = document.createElement('section');
        element.classList.add('music_player')
        element.innerHTML = `
    <section class="img">
            <img src=""
                alt="">
    </section>
    <section class="info">
    <section class="title">
        <span>  </span>
    </section>
    <section class="description"> <span></span></section>
    <section class="player">
        <audio src="" ></audio>
        <section class="controls">
            <ul>
                <li>
                    <span id="currentTime"></span>
                    <progress id="progress" value="0" max="100"> 0% </progress>
                    <span id="Duration"></span>
                </li>
                <li><a data-value="Previous" class="fa-solid fa-circle-chevron-left" data-tooltip="Previous"> </a></li>
                <li><a data-value="Play" class="fa-solid fa-play">
                <!--   <span class="fa-solid fa-play"></span> 
                <span class="fa-solid fa-pause"></span> -->
                </a></li>
                <li><a data-value="Next" class="fa-solid fa-circle-chevron-right" data-tooltip="Next"> </a></li> 
                <li><a data-value="remove" class="fa-solid fa-trash-can"></a></li>
                <li><a data-value="volumetoggler" data-state="closed" class="fa-solid fa-volume-high">
                        <input type="range" min="0" max="10" step="1" value="10" id="volumeControl">
                    </a>

                </li>
            </ul>
        </section>
    </section>
</section>
    `;
        return element;
    }

    handleEvents(event) {

        if (!event.target.dataset.value) {
            //event.stopPropogation();
            return true; 
        }
        switch (event.target.dataset.value) {
            case "Play":
                this.playSong();
                break;
            case "Pause":
               this.pause();
                break;
            case "Next":
                this.playNext();
                break;
            case "Previous":
                this.playPrev();
                break;
            case "remove":
                this.player.remove();
                break;
            case "volumetoggler":
                if (event.target.dataset.state == 'closed') {
                    event.target.dataset.state = 'open';
                    event.target.querySelector('#volumeControl').value = this.player.querySelector('audio').volume * 10;
                    event.target.querySelector('#volumeControl').addEventListener('change', this.adjustVolume.bind(this));
                }
                else {
                    event.target.querySelector('#volumeControl').remove();
                    event.target.dataset.state = 'closed';
                }
            default:
                break;
        }
    }


    loadSongsList() {
        this.songsList = songsList;
        loadSong.call(this, songsList[this.currentSongIndex]);
    }

    loadSong(song) {
        this.player.querySelector('img').src = song.image;
        this.player.querySelector('audio').src = song.source;
        this.player.querySelector('.title').textContent = song.title;
        this.player.querySelector('.description span').textContent = song.description;
    }

    playNext() {
        this.currentSongIndex = this.currentSongIndex + 1 % this.songsList.length;
        this.loadSong(songsList[this.currentSongIndex]);
        this.playSong();
    }

    playPrev() {
        this.currentSongIndex = this.currentSongIndex - 1;
        if (this.currentSongIndex < 0) this.currentSongIndex = this.songsList.length - 1;
        this.loadSong(songsList[this.currentSongIndex]);
        this.playSong();
    }

    playSong(){
        this.player.querySelector('audio').play();
        this.player.querySelector('[data-value = "Play"]').classList.toggle('fa-play');
        this.player.querySelector('[data-value = "Play"]').classList.toggle('fa-pause');
      //  this.player.querySelector('[data-value = "Play"]').textContent = 'Pause';
        this.player.querySelector('[data-value = "Play"]').dataset.value = 'Pause';
        
    }

    pause(){
        this.player.querySelector('audio').pause();
        this.player.querySelector('[data-value = "Pause"]').classList.toggle('fa-play');
        this.player.querySelector('[data-value = "Pause"]').classList.toggle('fa-pause');
      //  this.player.querySelector('[data-value = "Pause"]').textContent = 'Play';
        this.player.querySelector('[data-value = "Pause"]').dataset.value = 'Play';
        
    }

    adjustVolume(event){
        this.player.querySelector('audio').volume = event.target.value / 10;
    }

}