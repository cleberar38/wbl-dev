L.Control.Footer = L.Control.extend({
	options: {
		position: "topleft"
	},

	_lang: {
		"sv": {


		},
		"en": {

			
		}
	},

	initialize: function(options) {
         L.setOptions(this, options);
         this._setLang(options.lang);
    },

    _setLang: function(langCode) {
        langCode = langCode || wbl.config.langCode;
        if (this._lang) {
            this.lang = this._lang ? this._lang[langCode] : null;
        }
    },

    onAdd: function (map) {
        this._map = map;

        // create a DOM element and put it into one of the map panes
        this._container = L.DomUtil.create('div', 'leaflet-control-footer');
        L.DomEvent.disableClickPropagation(this._container);

        //Here is the jQuery access to this container
        this.$container = $(this._container);
	        
    	return this._container;    
    },

    onRemove: function (map) {
        
    }

});

L.control.footer = function (options) {
    return new L.Control.Footer(options);
};