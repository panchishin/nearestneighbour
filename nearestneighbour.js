"use strict";

var defaultDistanceFunction = require("./src/weightedDistanceCalculator.js")

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
      return this
    },
    add : function addObject( object ) {
      options.objects.push(object)
      return this
    },
    config : function config( config ) {
      config = config || {}
      options.filter = config.filter || options.filter
      options.distanceFunction = config.distanceFunction || options.distanceFunction
      options.objects = config.objects || options.objects
      return config
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
