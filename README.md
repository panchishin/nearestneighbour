NearestNeighbour is a method of looking up best matches.

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
	number : 2
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
Each object in *objects* can be any object you want but is must have at a minimum the same keys as the keys in the searchObject.  Additionally, the values of the keys in the searchObject and the objects must be *Numbers*.


# Related AI Projects
This is part of a set of related projects.

* [AlphaBeta](https://www.npmjs.com/package/alphabeta)
* [GeneticAlgorithm](https://www.npmjs.com/package/geneticalgorithm)
* [NearestNeighbour](https://www.npmjs.com/package/nearestneighbour)
* [NeuralNet](https://www.npmjs.com/package/neuralnet)

# References

* [Instructor: Patrick Winston from MIT](http://www.youtube.com/v/09mb78oiPkA)
* [Wikipedia](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm)