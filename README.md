[![Issues][issues-image]][issues-url] [![Downloads][downloads-image]][downloads-url] [![Auto Test Status][travis-image]][travis-url] [![license][license-image]][license-url] [![Gitter chat][gitter-image]][gitter-url]

NearestNeighbour is a method of looking up best matches.  Best matches of what?  Of your data of course, using your distance function.  If you have a list of robotic motions , previous limb location and speed along with current limb speed and the torque that was applied then you can use NearestNeighbour to look up the best guess torque needed to make the current state transition into a target state.  If you have a list of books and their ranking in several dimensions such as romance level, word count, and popularity.  You can use NearestNeighbour to find the best matches for a person based on their preferences of romance level, word count, etc.

You can improve the accuracy of NearestNeighbour by providing it with more data.  The data can be anything you want so long as it works with your distance function.  Don't have a distance function?  No problem, I made a cartisian distance checker for you that works with objects that have one or more key:number entries.  If you don't specify a distance function then the cartisian distance checker is used.

When would you use NearestNeighbour vs a NeuralNet?  First.  That's right, NearestNeighbour "learns" faster, calculates quickly, and is (in my humble opinion) more flexible.  Amazon (used to) suggest related books and items to customers using NearestNeighbour and built a huge online empire on the upsales from doing so.  Play with NearestNeighbour a bit and you'll quickly see how you could get really accurate upsales lists based on someones previous shopping history and what other people shop for.

Section Links : [Construction](#construction) , [Execution](#execution) , [Examples](#example) , [FAQ](#faq) , [Related](#related-ai-projects) , and [References](#references)

# Construction

### Create a NearestNeighbour
Create a default NearestNeighbour calculator from the constructor like so:
```js
var nearestNeighbour = require('nearestneighbour')()
```
Set the configuration options like so:
```js
var config = {
	objects : [ object1 , object2 , object3 ],
	number : 2  // the number of results
}
# in two steps
var nearestNeighbour = require('nearestneighbour')()
nearestNeighbour.config(config)

# or as a one liner
var nearestNeighbour = require('nearestneighbour')(config)
```

### Update Objects
You can change or add to the list of objects like so
```js
var nearestNeighbour = require('nearestneighbour')(config)
nearestNeighbour.setObjects( [ object1 , object2 , object3 ] )
nearestNeighbour.add( object4 )
```

# Execution
Execution is a one liner and returns a list of nearest neighbours
```js
var resultList = nearestNeighbour.nearest( searchObject )
```

# Configuration
The full configuration is as follows
```js
var config = {
	objects 			: [ /* list of objects */ ],
	number				: theNumberOfResultsYouWant,
	distanceFunction	: yourDistanceFunction
}
```
You can set the configuration wholely or just change one aspect using the *.config* function like so:
```js
# change the number of results to 5
nearestNeighbour.config({number:5})
```

# Example
This is a very simple example that finds the object with the closest match.
```js
var neighbour = require('nearestneighbour')({ 
	objects : [ { a : -10 } , { a : 3 } ],
	number : 1
})
console.log( neighbour.nearest({ a : 1 })[0] )
# returns { a : 3 }
neighbour.add( { a : 2 } )
console.log( neighbour.nearest({ a : 1 })[0] )
# returns { a : 2 }
```
# FAQ
Each object in *objects* can be any object you want.  If you are using the default distance function the object must have at a minimum the same keys as the keys in the searchObject.  Additionally, the values of the keys in the searchObject and the objects must be *Numbers*.


# Related AI Projects
This is part of a set of related projects.

* [AlphaBeta](https://www.npmjs.com/package/alphabeta)
* [Boosting](https://www.npmjs.com/package/boosting)
* [GeneticAlgorithm](https://www.npmjs.com/package/geneticalgorithm)
* [NearestNeighbour](https://www.npmjs.com/package/nearestneighbour)
* [NeuralNet](https://www.npmjs.com/package/neuralnet)

# References

* [Instructor: Patrick Winston from MIT](http://www.youtube.com/v/09mb78oiPkA)
* [Wikipedia](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm)* [Boosting](https://www.npmjs.com/package/boosting)

[issues-url]: https://github.com/panchishin/nearestneighbour/issues
[issues-image]: https://img.shields.io/github/issues/panchishin/nearestneighbour.svg

[gitter-url]: https://gitter.im/panchishin/nearestneighbour
[gitter-image]: https://badges.gitter.im/panchishin/nearestneighbour.png

[downloads-image]: http://img.shields.io/npm/dm/nearestneighbour.svg
[downloads-url]: https://www.npmjs.com/~panchishin

[travis-url]: https://travis-ci.org/panchishin/nearestneighbour
[travis-image]: http://img.shields.io/travis/panchishin/nearestneighbour.svg

[license-image]: https://img.shields.io/badge/license-Unlicense-green.svg
[license-url]: https://tldrlegal.com/license/unlicense

