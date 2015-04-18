wbl.core.PluginsHandler = L.Class.extend({
	
	
	initialize: function(map) {
		this.map = map;
		
		var self = this;
		wbl.event.on("wbl.core.pluginsadded", function() {
			self._processQueue();
		});
	},
	
	getPlugin: function(pluginName) {
		// e.g. "Attribution" or "Scale"
		var inst,
			ctrls = wbl.core.controls || [];
		for (var i=0,len=ctrls.length; i<len; i++) {
			inst = ctrls[i];
			if (inst instanceof L.Control[controlName]) {
				return inst;
			}
		}
		return null;
	},
	
	addPlugins: function(arr) {
		var t, init,
			autoActivates = [];
		wbl.core.controls = wbl.core.controls || []; // Keep track of controls added to the map
		for (var i=0,len=arr.length; i<len; i++) {
			t = arr[i];
			init = eval(t.init);
			if (init) {
				init = new init(t.options || {});
				this.map.addControl(init);
				wbl.core.controls.push(init);
				if (init.options.autoActivate) {
					autoActivates.push(init);
				}
			}
		}
		wbl.event.trigger("wbl.core.pluginsadded");
		wbl.event.pluginsadded = true;
		for (var i=0,len=autoActivates.length; i<len; i++) {
			autoActivates[i].activate();
		}
	},
	
	_callQueue: [],
	
	/**
	 * 
	 * @param pluginName {String} The plugin's class name excluding "L.Control.". E.g. "Scale"
	 * @param methodName {String} The method name.
	 * @param params {Array} An array of params to call the method with.
	 * @param callback {Function} Called after the method has been called (if the method was found).
	 * @returns {void}
	 */
	callPlugin: function(pluginName, methodName, params, callback) {
		params = params || [];

		var plugin = L.Control[pluginName];
		
		if (wbl.event.pluginsadded) {
			this._callPlugin(plugin, methodName, params, callback);
		}
		else {
			this._callQueue.push([plugin, methodName, params, callback]);
		}
	},
	
	_callPlugin: function(plugin, methodName, params, callback) {
		if (!plugin)
			return null;
		var ctrls = wbl.core.controls || [],
			ctrl,
			resp = null;
		for (var i=0,len=ctrls.length; i<len; i++) {
			ctrl = ctrls[i];
			if (ctrl instanceof plugin) {
				resp = ctrl[methodName].apply(ctrl, params || []);
				break;
			}
		}
		if (callback) {
			return callback(resp);
		}
		return resp;
	},
	
	/**
	 */
	_processQueue: function() {
		var arrQueue = this._callQueue || [],
			item, i, params, resp;
		for (i=0,len=arrQueue.length; i<len; i++) {
			item = arrQueue[i];
			resp = this._callPlugin.apply(this, item);
		}
		this._callQueue = [];
		return resp;
	},

	CLASS_NAME: "wbl.core.PluginsHandler"
});