/**
 * @Desc: AppView
 */

;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore', 'backbone', 'tabView'], function(_, Backbone, TabView) {
            // Use global variables if the locals is undefined.
            return factory(_ || root._, Backbone || root.Backbone, TabView || root.TabView);
        });
   } else {
        // RequireJS isn't being used. Assume underscore and backbone is loaded in <script> tags
        factory(_, Backbone, TabView);
   }
}(this, function(_, Backbone, TabView) {
    var map = {};

    var AppView = Backbone.View.extend({
        events: {},
        initialize: function() {
            this.urlsBox = document.querySelector('#urls');

            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'reset', this.addAll);
            this.listenTo(this.collection, 'remove', this.removeOne);

            var self = this;
            this.collection.each(function(tab) {
                self.addOne(tab);
            });
        },

        addOne: function(tab) {
            var view = new TabView({model: tab});

            this.urlsBox.appendChild(view.render().el);

            map[tab.id] = view;

            // this.bgController.trigger('create-tab', tab);
        },

        addAll: function() {
            this.collection.each(this.addOne);
        },

        removeOne: function(tab) {
            // this.bgController.trigger('remove-tab', tab);

            if(!tab || tab.id === undefined) return;

            var view = map[tab.id];

            view.remove();
        }
    });

    return this.AppView = AppView;
}));
