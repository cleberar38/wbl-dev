wbl.core.Layer = L.Class.extend({
	
	options: {

	},

	_layers: {},

	initialize: function (map) {
        this.map = map;

        this.createLayer();
        // class constructor
    },

    createLayer: function(){
		console.log("Layer Created!");    	
    },

    CLASS_NAME: "wbl.core.Layer"

});