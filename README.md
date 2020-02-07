# MyReads Project

Welcome to MyReads Project of Udacity Course from Gabriel Bezerra!

## To install the project and launch it, you'll need to:
	1. npm install
    	2. npm start

## How the code works:
	1.The main component fetches the books from the API.
    	2.When the main component is rendered, it generates shelves based on a predefined list of them.
   	3.The shelves receive props with their name and with books. Then, they filter each book.
    	4.After each book is filtered, it passes a book object to the book component.
    	5.The Book Component receives the object passed by the shelf and renders an UI with the properties that are extracted from the object.
    	6.The Book Component also has an update method that was passed as a prop from the Shelf (which had the method as a prop passed from the main component), the update method receives a book and the shelf where it should be.

At the Main Component, if you press Add:
	1.The search page is rendered by the router
    	2.The search page receives a list of all books and it passes to the Book Component
	3.When a user types, the input has the onChange method, which calls updateQuery
    	4.Update Query updates the variable bookQuery at the state of the component, and also calls the search method
    	5.The search method receives a query, and it fetches that from the API. (Note the search method uses debounce, which delays it, making the SearchPage component more responsible)
    	6.After the API promise, we update the queriedBooks array at the state of the component, and if there's an arror this array is set to be empty.
    	7.The updated array is sent to the book component, which contains a method responsible for setting up a shelf for books that aren't in one by using the shelf selector which has a listener (onChange) associated to a method that updates shelves (bookStateHandler).

## References :
	MyReads (wleandrooliveira), {https://github.com/wleandrooliveira/MyReads}
    	MyReads (fernandobrito), {https://github.com/fernandobrito/reactnd-project-myreads}
    	NPM, {https://www.npmjs.com/package/debounce}
    	React, {https://reactjs.org/docs/state-and-lifecycle.html}
