"use strict";

function defaultDistanceFunction( subject , object , objects , options) {

  function allStd(subject, objects) {
    var all = objects.slice(0)
    all.push(subject)

    function std(array, key) {
      array = array.map( function( item ) { return item[key] })
      var average = array.reduce( function( x , y ) { return x + y } ) / array.length

      var ssqdiff = 0;
      array.forEach( function( x ) { ssqdiff += Math.pow(x - average, 2) })
      return Math.sqrt(ssqdiff / array.length);
    }

    var result = {}
    Object.keys(subject).forEach( function(attr) { result[attr] = std(all,attr) })
    return result
  }

  options.weights = options.weights || {}

  if (options && options.standardize && ! options.stdv) {
    options.stdv = allStd(subject, objects)
  }

  var result = 0
  for (var attr in subject) {
    var x = subject[attr]
    var y = object[attr]
    if (options && options.stdv && options.stdv[attr] ) {
      x /= options.stdv[attr];
      y /= options.stdv[attr];
    }
    if (options && options.weights && options.weights[attr] ) {
      x *= options.weights[attr];
      y *= options.weights[attr];
    }
    result += Math.pow(x - y, 2);
  }
  return result;
}

function distances( subject , objects , options ) {
  var results = [];
  objects.forEach( function( object ) { 
    results.push({
      object: object,
      dist: options.distanceFunction(subject, object, objects, options)
    });
  })
  return results;
}

module.exports = function(subject, objects, options) {
  options = options || {}
  options.filter = options.filter || function() { return true }
  options.distanceFunction = options.distanceFunction || defaultDistanceFunction

  var sortMap = distances( subject , objects.filter( options.filter ) , options )
    .sort( function( a , b ) { return a.dist - b.dist } )
    .map( function( item ) { return item.object } )

  return options.number && options.number <= sortMap.length ? sortMap.slice(0, options.number ) : sortMap
}
