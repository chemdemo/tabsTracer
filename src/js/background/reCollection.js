/**
 * @Desc: reCollections
 */

;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore', 'backbone'], function(_, Backbone) {
            // Use global variables if the locals is undefined.
            return factory(_ || root._, Backbone || root.Backbone, ReModel || root.ReModel);
        });
   } else {
        // RequireJS isn't being used. Assume underscore and backbone is loaded in <script> tags
        factory(_, Backbone, ReModel);
   }
}(this, function(_, Backbone, ReModel) {
    var LOCAL_STORE_KEY = '$TRe';
    var DEFAULT_RE = [
        '^chrome.*:\/\/',
        '^http(?:s|):\/\/.*\.(?:google|baidu|yahoo|qq|163|taobao|jd|tmall)\.com',
        '^file:\/\/'
    ];

    var ReCollection = Backbone.Collection.extend({
        model: ReModel,

        localStorage: new Store(LOCAL_STORE_KEY),

        has: function(re) {
            return re && this.findWhere({re: re});
        },

        addRes: function(arr) {
            var self = this;

            _.each(arr, function(str) {
                if(!self.has(str)) self.create({re: str, id: Date.now()});
            });
        }
    });

    ReCollection.__default_res = DEFAULT_RE;

    return this.ReCollection = ReCollection;
}));
