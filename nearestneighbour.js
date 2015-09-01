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

module.exports = function( options ) {
  options = options || {}
  options.filter = options.filter || function() { return true }
  options.distanceFunction = options.distanceFunction || defaultDistanceFunction
  options.objects = options.objects || []

  return {
    setObjects : function setObjects( newObjects ) {
      options.objects = newObjects
    },
    addObject : function addObject( object ) {
      options.objects.push(object)
    },
    config : function config( config ) {
      config = config || {}
      options.filter = config.filter || options.filter
      options.distanceFunction = config.distanceFunction || options.distanceFunction
      options.objects = config.objects || options.objects
    },
    nearest : function nearest( subject ) {
      var sortMap = distances( subject , options.objects.filter( options.filter ) , options )
        .sort( function( a , b ) { return a.dist - b.dist } )
        .map( function( item ) { return item.object } )

      if ( options.number ) {
        return sortMap.slice(0, options.number )
      } else {
        return sortMap
      }
    }
  }
}
