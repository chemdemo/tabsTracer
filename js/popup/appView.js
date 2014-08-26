/**
 * @Desc: AppView
 */

;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore', 'backbone', 'tabView'], function(_, Backbone, TabView) {
            // Use global variables if the locals is undefined.
            return factory(_ || root._, Backbone || root.Backbone, TabView || root.TabView, ReView || root.ReView);
        });
   } else {
        // RequireJS isn't being used. Assume underscore and backbone is loaded in <script> tags
        factory(_, Backbone, TabView, ReView);
   }
}(this, function(_, Backbone, TabView, ReView) {
    var map = {};

    var AppView = Backbone.View.extend({
        el: document.querySelector('#url-list'),
        events: {
            // e.stopPropagation() will not work!!
            // 'click button.show-re': 'toggleReView',
            // 'click #exclude-list': 'stopPropagation'
        },
        initialize: function(options) {
            this.urlsBox = document.querySelector('#urls');
            this.excludeBox = document.querySelector('#excludes');

            this.reCollection = options.reCollection;
            this.bgController = options.bgController;

            this.listenTo(this.collection, 'add', this.addOneTab);
            this.listenTo(this.collection, 'reset', this.addAllTabs);
            // this.listenTo(this.collection, 'remove', this.removeOne);
            this.listenTo(this.reCollection, 'add', this.addRe);

            this.addAllTabs();
            this.addAllRe();

            this.bind();
        },

        addOneTab: function(tab) {
            var view = new TabView({model: tab});

            this.urlsBox.appendChild(view.render().el);

            map[tab.id] = view;

            // this.bgController.trigger('create-tab', tab);
        },

        addAllTabs: function() {
            this.collection.each(this.addOneTab, this);
        },

        removeOne: function(tab) {
            // this.bgController.trigger('remove-tab', tab);

            if(!tab || tab.id === undefined) return;

            var view = map[tab.id];

            view.remove();
        },

        addRe: function(re) {
            var view = new ReView({model: re});

            this.excludeBox.appendChild(view.render().el);
        },

        createRe: function() {
            var rule = prompt('Enter rule(legal regular expressions):') || '';

            rule = rule.trim();

            if(rule) this.reCollection.addRes([rule]);
        },

        addAllRe: function() {
            this.reCollection.each(this.addRe, this);
        },

        toggleReView: function(e) {
            e.stopPropagation();

            var cls = document.querySelector('#exclude-list').classList;

            if(cls.contains('none')) cls.remove('none');
            else cls.add('none');
        },

        stopPropagation: function(e) {
            e.stopPropagation();
        },

        hideReView: function(e) {
            var box = document.querySelector('#exclude-list');

            if(box.classList.contains('none')) return;

            box.classList.add('none');
        },

        bind: function() {
            this.el.addEventListener('click', this.hideReView);
            document.querySelector('#show-re').addEventListener('click', this.toggleReView);
            document.querySelector('#exclude-list').addEventListener('click', this.stopPropagation);
            document.querySelector('#add-re').addEventListener('click', this.createRe.bind(this));
        }
    });

    return this.AppView = AppView;
}));
