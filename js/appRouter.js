/**
 * @Desc: AppRouter
 */

;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore', 'backbone', 'appView', 'tabsCollection'], function(_, Backbone, AppView, TabsCollection) {
            // Use global variables if the locals is undefined.
            return factory(
                _ || root._,
                Backbone || root.Backbone,
                AppView || root.AppView,
                TabsCollection || root.TabsCollection
            );
        });
   } else {
        // RequireJS isn't being used. Assume underscore and backbone is loaded in <script> tags
        factory(_, Backbone, AppView, TabsCollection);
   }
}(this, function(_, Backbone, AppView, TabsCollection) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            'index': 'home'
        },
        initialize: function() {
            this.appView = new AppView({collection: new TabsCollection()});
        },
        home: function() {
            document.querySelector('#box').classList.remove('hide');
        }
    });

    return this.AppRouter = AppRouter;
}));
