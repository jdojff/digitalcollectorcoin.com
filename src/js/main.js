/*
	The pattern for dynamic module loading is as follows:
	{module}: (...args) => import('{module}').then(module => module.default(...args))

	This import returns promise and runs default exported function.

	Unfortunately it cannot be extracted into a common function, as webpack doesn't allow dynamic
	import statements. Every import has to be explicit (use a string as a parameter).
 */
// import 'babel-polyfill'; // Needs to be at the top
import 'jquery';
import 'bootstrap';

// GLOBALS
import Landing from './Landing/landing';
import Market from './Market/market';
import Collection from './Collection/collection';



export default {
	// GLOBALS
	Landing,
	Market,
	Collection

	// PUBLIC PAGES
	// index: (...args) =>
	// 	import('index').then(module =>
	// 		module.default(...args)
	// 	)
};
