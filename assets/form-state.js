// Disclosure: Look at the watch for events section at the bottom. 



// Target your form.
let formElement = document.querySelector('#some-form')
// let stateCallback = undefined
// I added this because of an error code in my devtools. I will come back to this later, but I needed to get this out the way to make sure my sessions are saved locally.






// CHECK LOCAL STORAGE
// This will check local storage for songs that are saved already for me, and present them so I can add to the list instead of replacing it
function getSongs () {
	let stored = localStorage.getItem('songs')
	// IN LOCAL STORAGE, FIND 'songs" AND SAVE IT TO SOMETHING CALLED "stored"
	// Before saving my new song, I need to grab the old songs that are already in local storage, so I can add to them instead of replacing them / overwriting them like they currently were doing
	// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
	if (stored) {
		return JSON.parse(stored)
		// https://youtu.be/E2rvDpubmnA?si=BOzBTqaqrALChYu0
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
		// I needed this to behave like an array (like you guys have mentioned in my feedback). I understand that .parse converts a JSON string to an object or an array so it can be read better
	}
	else {
		return []
		// If there is nothing in local storage, I want to return an empty array so that I can add songs to it without getting an error or undefined.
	}
	// This function helps me get the songs that are already in local storage so I can add them instead of replacing them when I save something new. And at the end, if nothing exists, then it can return an empty array without an error
}



// SAVE TO LOCAL STORAGE 
// this will take my inputs that I want to save from my forms, and put it into text that can be saved in my local storage under my defined word "songs"
function saveSongs(songs) {
	localStorage.setItem('songs', JSON.stringify(songs))
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
	// https://www.youtube.com/watch?v=E2rvDpubmnA
	// Stringify converts an object or an array to a JSON string
	// this new function has an input "songs". I added an input because it needs to know what songs I want to save.
	// this built in chat confirmed I don't need an input for getSongs because it can read and grab it from the local storage, but saveSongs needs it to know what to save to local storage.
}


// SHOW SONGS ON THE PAGE
function showSongs () {
	// this function will go and get the songs
	let songs = getSongs()
	let songList=document.querySelector('#saved-songs')
	// this will show where to put the songs on the page
	if (!songList) return;
	// this will prevent an error if no elements on are on the page
	songList.innerHTML = ''
	// this will prevent a duplicate, so it won't display twice (I believe so)
	songs.forEach((song) => {
		// this will look through my songs and display them one by one
		songList.innerHTML += `
		<div class="song-entry">
		<h3>${song.title}</h3> <p>${song.genre}</p> <p>${song.beat}</p> <p>${song.lyrics}</p>
		</div>
		`
	})
	// WILL COME BACK TO THIS WHEN THE TIME IS RIGHT. STILL NOT SURE ABOUT THIS ONE. MIGHT NEED TO REWRITE IT TO BE MORE SPECIFIC ABOUT WHAT IT IS SHOWING.
}





// Watch for events!
formElement.addEventListener('submit', (event) => {
	// PREVENT FROM REFRESHING THE PAGE ON SUBBMITTING THE FORM. STATIC HOST, NO SERVER
	// Don’t actually submit (which would refresh the page):
	// https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
	event.preventDefault()


	// *********************************************************************
	// For this part, I used the built in chat to help me understand how to get my three functions to behave together. I understand that I need to get the data, save it, and then display it. It helped me understand the concept and how to connect my functions together. I used it as a learning aid to understand the structure. I added comments to show my understanding. 
	const formData= new FormData(formElement)
	// this takes the inputs and saves it to formData
	const song = {
		// this is a new object that I will call song because I am saving songs to local storage
		title:formData.get('some-text') || '',
		// this targets what I put into the title text field
        genre:formData.get('some-option') || '',
		// this targets what I put into the genre input field
        beat:formData.get('beat-link') || '',
		// this targets what I put into the beat text field
        lyrics:formData.get('lyric-notes') || ''
		// this targets what I put into the lyric text field
	}
	const songs = getSongs()
	// this will get the songs that are already in local storage so I can add to them instead of replacing them. I tested it out and it adds to it instead of replacing it!
    songs.push(song)
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
	// the push adds new entries to the end of the array, so it will add my new song entries at the end of the list and not replace them 
    saveSongs(songs)
	// this will save the songs to the local storage for me and update the list
    showSongs()
	// this will show all the songs on the page for me
    formElement.reset()
	// this will clear the form inputs for a new session
})
showSongs()



