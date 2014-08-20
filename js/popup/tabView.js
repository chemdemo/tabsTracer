/**
 * @Desc: TabView
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
    var TabView = Backbone.View.extend({
        tagName: 'li',
        events: {
            'change input': 'updateTab',
            'click .icon-hyperlink': 'openUrl',
            'click .icon-trash': 'remove'
        },
        initialize: function() {
            this.tabTmpl = $('#tmpl-tab').html();
            // this.listenTo(this.model, 'change', this.render);
            // this.listenTo(this.model, 'destroy', this.remove);
        },
        updateTab: function(url) {
            this.model.save({url: url});
        },
        render: function() {
            // backbone hard dependency on jQuery!!!
            // https://github.com/jashkenas/backbone/wiki/Using-Backbone-without-jQuery
            this.$el.html(_.template(this.tabTmpl, this.model.toJSON()));
            return this;
        },
        openUrl: function() {
            chrome.tabs.create({
                url: this.model.get('url'),
                selected: true
            });
        },
        remove: function() {
            if(confirm('Delete from local storage?')) {
                this.model.destroy();
            }
            this.stopListening();
            this.undelegateEvents();
            this.$el.remove();
        }
    });

    return this.TabView = TabView;
}));
