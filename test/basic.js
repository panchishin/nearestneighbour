var nearestNeighbourConstructor = require("../nearestneighbour")
module.exports = {

	'nearestNeighbour is a function' : function(beforeExit, assert) {
		assert.equal('function', typeof nearestNeighbourConstructor)
	},

	'nearestNeighbour constructor creates object' : function(beforeExit, assert) {
		var nearestNeighbour = nearestNeighbourConstructor( { } , [ ] );
		assert.equal('object' , typeof nearestNeighbour )
	},


	'complete successfully for no items' : function(beforeExit, assert) {
		var nearestNeighbour = nearestNeighbourConstructor( {} , [ ] );
		assert.equal( 0 , nearestNeighbour.length )
	},

	'complete successfully for 1 item' : function(beforeExit, assert) {
		var nearestNeighbour = nearestNeighbourConstructor( 
			{ a : 1 },
			[ { a : 2 } ]
		)
		assert.equal( 2 , nearestNeighbour[0].a )
	},

	'complete successfully for 2 items' : function(beforeExit, assert) {
		var nearestNeighbour = nearestNeighbourConstructor( 
			{ a : 1 },
			[ { a : 2 } , { a : -10 } ]
		)
		assert.equal( 2 , nearestNeighbour[0].a )
		assert.equal( -10 , nearestNeighbour[1].a )
	},

	'complete successfully for 2 items backwards' : function(beforeExit, assert) {
		var nearestNeighbour = nearestNeighbourConstructor( 
			{ a : 1 },
			[ { a : 10 } , { a : -2 } ]
		)
		assert.equal( -2 , nearestNeighbour[0].a )
		assert.equal( 10 , nearestNeighbour[1].a )
	},


	'complete successfully for function override' : function(beforeExit, assert) {
		var nearestNeighbour = nearestNeighbourConstructor( 
			{ a : 1 },
			[ { a : 10 } , { a : -3 } ]
		)
		assert.equal( -3 , nearestNeighbour[0].a )
		assert.equal( 10 , nearestNeighbour[1].a )

		var nearestNeighbour = nearestNeighbourConstructor( 
			{ a : 1 },
			[ { a : 10 } , { a : -3 } ] ,
			{ distanceFunction : function(o1,o2) { return Math.abs( o1.a - (o2.a % 10 ) ) }}
		)
		assert.equal( 10 , nearestNeighbour[0].a )
		assert.equal( -3 , nearestNeighbour[1].a )
	},

	'complete successfully for 2 dimentions' : function(beforeExit, assert) {
		var nearestNeighbour = nearestNeighbourConstructor( 
			{ a : 1  , b : 1},
			[ { a : 2 , b : 100} , { a : -10 , b : -10 } ]
		)
		assert.equal( -10 , nearestNeighbour[0].a )
		assert.equal( 2 , nearestNeighbour[1].a )
	}

}