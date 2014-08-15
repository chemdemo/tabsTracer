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
    var AppView = Backbone.View.extend({
        el: document.querySelectorAll('section')[0],
        events: {},
        initialize: function() {
            this.urlsBox = document.querySelector('#urls');

            chrome.tabs.onCreated.addListener(this.createATab);
            chrome.tabs.onRemoved.addListener(this.removeATab);

            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'remove', this.removeOne);

            this.collection.fetch();
        },
        addOne: function(tab) {
            var view = new TabView({model: tab});

            this.urlsBox.appendChild(view.render().el);
        },
        addAll: function() {
            this.collections.each(addOne);
        },
        removeOne: function(tab) {
            console.log('tab: ', tab);
        },
        createATab: function(tab) {
            if(tab && tab.url && !this.collection.has(tab)) this.collection.create({url: tab.url, tabId: tab.id});
        },
        removeATab: function(tabId, info) {
            if(info.sWindowClosing) this.collection.remove({tabId: tabId});
        }
    });

    return this.AppView = AppView;
}));
