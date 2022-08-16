

function init() { 
let createMusicbutton = createElement('button','');
createMusicbutton.classList.add('fa-solid');
createMusicbutton.classList.add('fa-music');
createMusicbutton.classList.add('addMusic');
const url = "/music.css";

import ('https://kit.fontawesome.com/5729b6e56d.js');
document.head.innerHTML += `<link type="text/css" rel="stylesheet" href=${url}>`;


createMusicbutton.onclick = async function(){    
    let module = await import('./musicplayer.js');
    let playerObj = module.createNewMusicPlayer();
    if( playerObj && playerObj.player)
     { playerObj.loadSongsList();
        document.body.append(playerObj.player); // Insert Player HTML 
     }
}

document.body.append(createMusicbutton);

}

function createElement(type,text){
    let elemnt = document.createElement(type);
    elemnt.innerHTML = text;
    return elemnt;
}

new init();
