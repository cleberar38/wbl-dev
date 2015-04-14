wbl.core.Init = L.Class.extend({

	initialize: function() {
		this.defineProjs();

		// Instantiate core classes
		wbl.core.divInst = new wbl.core.Div();
		this.init();
	},

	defineProjs: function() {
		if (window.proj4) {
			proj4 = window.proj4;
			proj4.defs([
	            ["EPSG:4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"],
	            ["EPSG:3857", "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"],
	            ["EPSG:3008", "+proj=tmerc +lat_0=0 +lon_0=13.5 +k=1 +x_0=150000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"],
	            ["EPSG:3006", "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"],
	            ["EPSG:3021", "+proj=tmerc +lat_0=0 +lon_0=15.8062845294444 +k=1.00000561024+x_0=1500064.274 +y_0=-667.711 +ellps=GRS80 +units=m"]
	            ]);			
		}
	},

	init: function(options) {
		console.log("THIS is the INIT function");
	},

	CLASS_NAME: "wbl.core.Init"
});
	
	
