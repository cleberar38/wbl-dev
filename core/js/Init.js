wbl.core.Init = L.Class.extend({

	options: {

	},

	initialize: function() {
		this.defineProjs();

		// Instantiate core classes
		wbl.core.divInstance = new wbl.core.Div();
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
		options = options || {};
		var self = this;
		this.drawMap();

		console.log("wbl.core.Init - init function");

		// //Create the instances for all the Classes in the core
		wbl.core.layerInstance = new wbl.core.Layer(this.map);
		wbl.core.pluginHandlerInstance = new wbl.core.PluginsHandler(this.map);

		// var params = options.params || wbl.core.paramInst.getParams(); //Parameters from URL / config
		// this.loadConfig(params.CONFIG).done(function() {
		// 		function applyConfig() {
		// 			wbl.config.configName = params.CONFIG; // Store for creating params
		// 			wbl.config.langCode = wbl.cmd.getLang();
		// 			self.applyConfig(wbl.config);
		// 			// params = wbl.core.paramInst.getParams();
		// 			params = $.extend({}, utils.objectToUpperCase(wbl.config.params || {}), params);
		// 			wbl.core.paramInst.applyParams(params);
		// 			wbl.cmd.loading(false);
		// 		}

		// 		wbl.config = config || window.config;
		// 		if (wbl.config.onLoad) {
		// 			var deferred = wbl.config.onLoad(wbl.config);
		// 			deferred.done(applyConfig);
		// 		}
		// 		else {
		// 			applyConfig(wbl.config);
		// 		}
		// }).fail(function(a, text, c) {
		// 	utils.log("Config not loaded because: "+text);
		// 	wbl.cmd.loading(false);
		// });
		
		wbl.config = window.config ? window.config : config || {};

		wbl.core.pluginHandlerInstance.addPlugins( window.config.plugins );
		
	},

	drawMap: function(options) {
		options = options || {};
		

		// if (L.Browser.touch && L.Browser.ie) {
		// 	options.tapTolerance = 30;
		// }
		// var defaultOptions = wbl.core.mainConfig.mapConfig || {};
		// var mapOptions = $.extend(defaultOptions, options);

		var mapOptions = $.extend({}, options);

		this.map = L.map("mapdiv", mapOptions);
		wbl.map = this.map;

		console.log("wbl.core.Init - drawMap function");
		
		// // Add attribution for wbl responsive
		// var a = this.map.attributionControl;
		// a.addAttribution('<a href="//github.com/getwbl/wbl-responsive" target="_blank">wbl responsive</a>&nbsp;|');

		// if (mapOptions.disabledRightClick) {
		// 	this.map.on("contextmenu", function(e) {
		// 		e.originalEvent.preventDefault();
		// 		e.originalEvent.stopPropagation();
		// 	});
		// }

		// if (utils.getBrowser().ie9) {
		// 	$(".leaflet-bottom.leaflet-right").addClass(".leaflet-bottom-right-ie9");
		// }
	},


	CLASS_NAME: "wbl.core.Init"
});
	
	
