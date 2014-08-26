/**
 * @Description: ExcludeModel
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
    var ReModel = Backbone.Model.extend({
        defaults: {
            re: ''
        },

        updateRe: function(re) {
            this.save({re: re});
        }
    });

    return this.ReModel = ReModel;
}));
