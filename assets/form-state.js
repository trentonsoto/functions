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









// Watch for events!
formElement.addEventListener('submit', (event) => {
	// PREVENT FROM REFRESHING THE PAGE ON SUBBMITTING THE FORM. STATIC HOST, NO SERVER
	// Don’t actually submit (which would refresh the page):
	// https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
	event.preventDefault()
})


