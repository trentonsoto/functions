// Target your form.
let formElement = document.querySelector('#some-form')
let stateCallback = undefined
// I added this because of an error code in my devtools. I will come back to this later, but I needed to get this out the way to make sure my sessions are saved locally.













// Watch for events!
formElement.addEventListener('submit', (event) => {
	// PREVENT FROM REFRESHING THE PAGE ON SUBBMITTING THE FORM. STATIC HOST, NO SERVER
	// Don’t actually submit (which would refresh the page):
	// https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
	event.preventDefault()
})

// EVERY SINGLE TIME ITS CHANGED, ITS FIRING AN EVENT
// Run any time the form is modified:
// https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event
formElement.addEventListener('input', () => {
	updateUrlParams()
})
