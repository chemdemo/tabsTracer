/**
 * @Description: TabModel
 */

;(function(g, undefined) {
    var TabModel = Backbone.Model.extend({
        defaults: {
            url: undefined,
            tabId: undefined
        },

        initialize: function() {
            if(!this.get('url')) {
                this.set({'url': this.defaults.url});
            }
        },

        update: function(url) {
            this.save({url: url});
        },

        remove: function() {
            this.destroy();
        }
    });

    g.TabModel = TabModel;
}(this));
