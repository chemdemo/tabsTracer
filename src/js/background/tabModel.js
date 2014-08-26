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
            id: undefined
        },

        // validate: function(attrs) {
        //     var ignores = [];
        //     var u = attrs.url || '';

        //     u = u.trim();

        //     if( !u ||
        //         (u &&
        //         u.match(/^chrome(?:\.+)?:\/\//) ||
        //         u.match(/^http(?:|s):\/\/www\.(google|baidu|yahoo)\.com/) ||
        //         u.match(/^file:\/\//)
        //         )
        //     ) return 'ignored';

        //     return;
        // },

        initialize: function() {
            if(!this.get('url')) {
                this.set({'url': this.defaults.url});
            }
        },

        updateUrl: function(url) {
            // By default validate is called before save,
            // but can also be called before set if {validate:true} is passed.
            this.save({url: url});
        },

        updateId: function(id) {
            this.save({id: id});
        }
    });

    return this.TabModel = TabModel;
}));
