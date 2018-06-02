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
import './../scss/app.scss';

// GLOBALS
import Landing from './landing';
import Market from './market'



export default {
	// GLOBALS
	Landing,
	Market

	// PUBLIC PAGES
	// index: (...args) =>
	// 	import('index').then(module =>
	// 		module.default(...args)
	// 	)
};
