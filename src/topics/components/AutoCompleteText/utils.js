export function scroll(element) {
	// scroll UL to make element visible
	// element can be the element element or its id
	if (typeof element !== 'object') {
		return;
	}

	const ul = element.parentNode;
	// fudge adjustment for borders effect on offsetHeight
	const fudge = 0;
	// bottom most position needed for viewing
	const bottom = ul.scrollTop + (ul.offsetHeight - fudge) - element.offsetHeight;
	// top most position needed for viewing
	const top = ul.scrollTop + fudge;
	if (element.offsetTop <= top) {
		// move to top position if element above it
		// use algebra to subtract fudge from both sides to solve for ul.scrollTop
		ul.scrollTop = element.offsetTop - fudge;
	} else if (element.offsetTop >= bottom) {
		// move to bottom position if element below it
		// use algebra to subtract ((ul.offsetHeight - fudge) - element.offsetHeight) from both sides to solve for ul.scrollTop
		ul.scrollTop =
			element.offsetTop - (ul.offsetHeight - fudge - element.offsetHeight);
	}
}
