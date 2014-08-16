/**
 * @Description: TabModel
 */

;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore', 'backbone'], function(_, Backbone) {
            // Use global variables if the locals is undefined.
            return factory(_ || root._, Backbone || root.Backbone);
        });
   } else {
        // RequireJS isn't being used. Assume underscore and backbone is loaded in <script> tags
        factory(_, Backbone);
   }
}(this, function(_, Backbone) {
    var TabModel = Backbone.Model.extend({
        defaults: {
            url: '',
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

    return this.TabModel = TabModel;
}));
