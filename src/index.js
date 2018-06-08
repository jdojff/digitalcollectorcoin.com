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

export default {

    // PUBLIC PAGES
    Landing: (...args) =>
    	import('./js/Landing/landing').then(module =>
    		module.default(...args)
    	),
    Market: (...args) =>
        import('./js/Market/market').then(module =>
            module.default(...args)
        ),
    Collection: (...args) =>
        import('./js/Collection/collection').then(module =>
            module.default(...args)
        ),
    CollectionMap: (...args) =>
        import('./js/CollectionMap/collectionMap').then(module =>
            module.default(...args)
        )
};
