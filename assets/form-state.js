// https://vscode.dev/github/trentonsoto/functions/blob/mainwZWY2ZDNiMjhm
// docs link: https://docs.google.com/document/d/1wftl5TVUsG03gS0FWFUqJVDPDQ1xkglMw95gM7fPLIk/edit?usp=sharing



// Target your form.
let formElement = document.querySelector('#some-form')
// let stateCallback = undefined
// I added this because of an error code in my devtools. I will come back to this later, but I needed to get this out the way to make sure my sessions are saved locally.


// comments for me to remember 
// getSongs fetches from local storage
// saveSongs saves to local storage
// showSongs shows the songs on the page
// deleteSongs will delete (when I create this function)
// editSongs will edit (when I create this function)
// other things to do 
// (1: get rid of the navigation at the top) DONE ***************
// (2: use the now added space to explain what my product is) 
// (3: i don't need all the input fields to show up right away, maybe they show up one by one as the user types into the field) 
// (4: make the user not be able to press "submit" until they have filled out all the fields) 
// (5: maybe keep the input form sticky in the viewport so it is always there and the list of songs scroll behind it) 
// check M. D. E. comments!

let songList=document.querySelector('#saved-songs')
let enterState=document.querySelector('#enter-state')
let editedSong=''


// let entranceView="createSong"
let createButton = document.querySelector('#create-song')
let viewButton = document.querySelector('#view-songs')

viewButton.addEventListener('click', () => {
	// HIDE FORM
	// HIDE ENTRANCE STATE 
	// SHOW SONGS
	// this is from your tips in how to handle a big task
	// formElement.style.display = 'none'
	// enterState.style.display = 'none'
	// songList.style.display = 'block'
	formElement.classList.add('hidden')
	// enterState.classList.add('hidden')
	songList.classList.remove('hidden')
	viewButton.classList.add('active')
	createButton.classList.remove('active')
})
createButton.addEventListener('click', () => {
	// SHOW FORM
	// SHOW ENTRANCE STATE 
	// HIDE SONGS
	// this is from your tips in how to handle a big task
	// formElement.style.display = 'block'
	// enterState.style.display = 'block'
	// songList.style.display = 'none'
	formElement.classList.remove('hidden')
	// enterState.classList.remove('hidden')
	songList.classList.add('hidden')
	createButton.classList.add('active')
	viewButton.classList.remove('active')
})



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
	// let songList=document.querySelector('#saved-songs')
	// this will show where to put the songs on the page
		if (songs.length === 0) {
 		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length
    	// using a length property to have this information display only when there aren't any songs in the local storage, so like an entrance state for a user
		enterState.classList.remove('hidden')
		formElement.classList.remove('hidden')
	}
	else {
		enterState.classList.add('hidden')
 		// https://www.youtube.com/watch?v=jXlWW6ppq1g
	}
	if (!songList) return;
	// this will prevent an error if no elements on are on the page
	songList.innerHTML = ''
	// this will prevent a duplicate, so it won't display twice (I believe so)
	songs.forEach((song) => {
		// this will look through my songs and display them one by one
		songList.innerHTML += `
		<div class="song-entry" onClick="expandedSong(this)">
			<div class="song-header">
			<h3>${song.title}</h3>
			<i class="arrow">▾</i>
			</div>
			<p>${song.date}</p>
			<div class="song-information">
				<p>${song.genre}</p> <p>${song.beat}</p> <p>${song.lyrics}</p>
			</div>
			<button class="edit-button" onClick="editSong(${song.id})">Edit Song</button>
			<button class="delete-button" onClick="openModal(${song.id})">Delete Song</button>
		</div>
		`
		// the arrow is from Lucy
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
		// these two links helped me define a timestamp for my song entries, so that I can show when they were added / created 
		// I added the timestamp here, and was able to get it to work and show up on the page. I followed mdn's use of the toLocaleString method to get the date and time to show up for me. And defined it with just date, and then used that here, and moved the genre, beat, and lyrics outside of the template literals
		// for each song and its entry and information, this button is added so when its clicked, the function deleteSong will know which song to delete based on the id created and used here "song.id"
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
	})
	// songList.style.display = 'none'
	// songList.classList.add('hidden')
	// WILL COME BACK TO THIS WHEN THE TIME IS RIGHT. STILL NOT SURE ABOUT THIS ONE. MIGHT NEED TO REWRITE IT TO BE MORE SPECIFIC ABOUT WHAT IT IS SHOWING.
}

function expandedSong (card) {
	card.classList.toggle('expanded')
}


function editSong (songID) {
	// this function is going to edit songs that have been submitted
	let mySongs=getSongs ()
	// I need to fetch the list, which is what I've been doing already 
	let song=mySongs.find((entries) => entries.id ===songID)
	// this will find the song that HAS the same id as the one I click to edit for the song entry 
	document.querySelector('#some-text').value=song.title
	document.querySelector('#some-option').value=song.genre
	document.querySelector('#beat-link').value=song.beat
	document.querySelector('#lyric-notes').value=song.lyrics
	// this will put the information back into the input fields. instead of reading from the input fields, it will put the information back (writing into the field)

	formElement.classList.remove('hidden')
	enterState.classList.remove('hidden')
	songList.classList.add('hidden')
	editedSong=songID
	// I need this so when the event listener is clicked, it will know which song to edit 
}

// I commented this out because I don't think I need it right now, but I will revisit it later if I need to come back to it. I currently have the enterState in the first few lines of this file, so I am using that to track the listening event
// function entrance () {
// 	let songs = getSongs()
// 	// let enterState=document.querySelector('#enter-state')
// 	if (songs.length === 0) {
// 		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length
// 		// using a length property to have this information display only when there aren't any songs in the local storage, so like an entrance state for a user
// 		// enterState.style.display='block'
// 		enterState.classList.remove('hidden')
// 	}
// 	else {
// 		// enterState.style.display='none'
// 		enterState.classList.add('hidden')
// 		// https://www.youtube.com/watch?v=jXlWW6ppq1g
// 		// this video helped explain the concept of block and none for display, when hiding and showing elements on the screen. 
// 		// the way I wrote this is when there are no songs, the entrance state will show, but when a song is added, the state will disappear because the songs show now
// 	}
// }





function deleteSong(songID) {
	// this function will delete songs based on the unique id I created 
	// this function needs an input to know which song to delete, similar to my function saveSongs
	let mySongs=getSongs ()
	let newList=mySongs.filter((entries) => entries.id !==songID)
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
	// this will go through my entries and filter out the one that has the same id. I was going to use splice that I found on MDN, but filter seemed less complex
	// this will create a new list of songs that doesn't include the one I want to get rid of, so it will filter through them and keep the ones that don't have the same id (!==songID) 

	saveSongs (newList)
	// ADD COMMENT

	showSongs()
}



// MODAL FOR DELETE CONFIRMATION 
let modalDelete=document.querySelector('#delete-modal')
//this targets the delete modal I created in the HTML (inside the dialog tag)
let confirmButton=document.querySelector('#confirm-delete')
// this targets the YES delete button in the modal
let closeButton=document.querySelector('#close-delete-modal')
//this targets the NO keep button in the modal

function openModal(songID) {
	songDeleted=songID
	// this can save the ID of the song so it knows which song is being deleted and this is similar to the delete function
	modalDelete.showModal() 
	// this will open the modal
}
// this function will open the modal for me

confirmButton.addEventListener('click', () => {
deleteSong(songDeleted)
modalDelete.close()
})
// this will run the delete function and then can close the modal once it is deleted 

closeButton.addEventListener('click', () => {
modalDelete.close()
})
// this will close the modal if NO keep is clicked from the modal



// Watch for events!
formElement.addEventListener('submit', (event) => {
	// PREVENT FROM REFRESHING THE PAGE ON SUBBMITTING THE FORM. STATIC HOST, NO SERVER
	// Don’t actually submit (which would refresh the page):
	// https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
	event.preventDefault()


	let song = {
		// this is a new object that I will call song because I am saving songs to local storage
		id: Date.now(),
		// this will give my song entries a unique id based on when they were created, so to my understanding, two songs will not have the same id because they will be created at different times.
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
		// I used this to hopefully get a unique id for each entry so that I can delete them or edit them later on
		// I swtiched these from formData.get('title') to document.querySelector because this is what I learned through class. I had kept the formData.get in there to show that I understand how to use it, but I switched it to document.querySelector because this is what I learned through class and I understand how to use it better.
		title:document.querySelector('#some-text').value,
		// this targets what I put into the title text field
        genre:document.querySelector('#some-option').value,
		// this targets what I put into the genre input field
        beat:document.querySelector('#beat-link').value,
		// this targets what I put into the beat text field
        lyrics:document.querySelector('#lyric-notes').value,
		// this targets what I put into the lyric text field
		date: new Date ().toLocaleString(),
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
		// these two links helped me define a timestamp for my song entries, so that I can show when they were added / created
	}

	let mySongs = getSongs()
	// this will get the songs that are already in local storage so I can add to them instead of replacing them. I tested it out and it adds to it instead of replacing it! 



	if (editedSong) {
		let newListSongs=mySongs.filter((entries) => entries.id !== editedSong)
		// this will go through my list of songs and filter through to find the one that has the same id as the one I clicked edit for. it will keep the ones that don't have the same id
		newListSongs.push(song)
		saveSongs(newListSongs)
		showSongs()
		editedSong=''
	}

	else{
		mySongs.push(song)
		saveSongs(mySongs)
		showSongs()
	}
	// if I am editing the song, this needs to remove the old version, add the updated / new version, save it and show it. if nothing new is added, it can be added normally 
	// mySongs.push(song)
	// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
	// // the push adds new entries to the end of the array, so it will add my new song entries at the end of the list and not replace them 
	// // mySongs is my array / list of songs, and song is the new one created with the form inputs (HTML)
	// saveSongs(mySongs)
	// // with new entries, this will update the list for me and place it back into local storage 
	// showSongs()
	// formElement.style.display = 'none'
	// enterState.style.display = 'none'
	// songList.style.display = 'block'
	formElement.classList.add('hidden')
	enterState.classList.add('hidden')
	songList.classList.remove('hidden')
	// this will show all the songs on the page for me
	// shows whenever I submit a new song
	// I added these three lines of code from up above because when a user clicks submit, I want the view to switch to the "view songs" page to see the entry instead of clearing the form and leaving it like that
	formElement.reset()
	// this will clear the form inputs for a new session
	// https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset
})

showSongs()
// this runs when the page first loads to show saved songs


