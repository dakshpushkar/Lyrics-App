const form = document.getElementById("form");
const inputValue = document.getElementById("input_value");
const result = document.getElementById("result");

const urlApi = "https://api.lyrics.ovh";
//function for tacking value from input

form.addEventListener('submit' ,event =>{
    event.preventDefault();
    const searchValue = inputValue.value.trim();
    console.log(searchValue);
    if(!searchValue){
        alert("Enter song name")
    }
    else {
        startSearching(searchValue);
    }
})

//fetching data
async function startSearching(searchValue){
    const searchResponse = await fetch(`${urlApi}/suggest/${searchValue}`);
    const data = await searchResponse.json();
   display(data);
}

// display function for data
function display(data){
  result.innerHTML = `
        <ul class = "songs">
           ${data.data.
            map(song =>`<li>
                           <div>
                              <strong >${song.artist.name}</strong>- ${song.title}
                           </div>
                           <di>
                            <span data-artist= "${song.artist.name}" data-songTitle = "${song.title}">Get Lyrics</span>
                            </di>
                            
                        </li>`
                )
                .join('')
        }
        <button>Next</button>
        </ul>`;
}

// functio for getlyrics
result.addEventListener('click', e =>{
    const clickedElement = e.target;

    if(clickedElement.tagName ==='SPAN'){
        const artist = clickedElement.getAttribute("data-artist")
        const songTitle  = clickedElement.getAttribute("data-songTitle")

        getLyrics(artist,songTitle);
    }
})


 async function getLyrics(artist,songTitle){
    const response = await fetch(`${urlApi}/v1/${artist}/${songTitle}`)
    const songLyrics =  await response.json();
    console.log(songLyrics);
   const lyrics = songLyrics.lyrics.replace(/(\r\n|\r|\n)/g,'<br>');

    result.innerHTML = `<h2><strong>${artist}</strong>-${songTitle}</h2><p>${lyrics}</p>`
}