/**
 * @Desc: tabsCollections
 */

;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore', 'backbone'], function(_, Backbone) {
            // Use global variables if the locals is undefined.
            return factory(_ || root._, Backbone || root.Backbone, TabModel || root.TabModel);
        });
   } else {
        // RequireJS isn't being used. Assume underscore and backbone is loaded in <script> tags
        factory(_, Backbone, TabModel);
   }
}(this, function(_, Backbone, TabModel) {
    var LOCAL_STORE_KEY = '__CHROME_OPENED_TABS__';

    var TabsCollection = Backbone.Collection.extend({
        model: TabModel,

        localStorage: new Store(LOCAL_STORE_KEY),

        has: function(tab) {
            return !!this.findWhere({url: tab.url});
        }
    });

    return this.TabsCollection = TabsCollection;
}));
