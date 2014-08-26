/**
 * @Desc: TabView
 */

;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore', 'backbone', 'util'], function(_, Backbone, util) {
            // Use global variables if the locals is undefined.
            return factory(_ || root._, Backbone || root.Backbone, util || root.util);
        });
   } else {
        // RequireJS isn't being used. Assume underscore and backbone is loaded in <script> tags
        factory(_, Backbone, util);
   }
}(this, function(_, Backbone, util) {
    var TabView = Backbone.View.extend({
        tagName: 'li',
        events: {
            'change input': 'updateTab',
            'click .icon-hyperlink': 'openUrl',
            'click .icon-close': 'remove'
        },
        initialize: function() {
            this.tabTmpl = document.querySelector('#tmpl-tab').innerHTML;
            // this.listenTo(this.model, 'change', this.render);
            // this.listenTo(this.model, 'destroy', this.remove);
        },
        updateTab: function(e) {
            this.model.updateUrl(e.target.value);
        },
        render: function() {
            // backbone hard dependency on jQuery!!!
            // https://github.com/jashkenas/backbone/wiki/Using-Backbone-without-jQuery
            // this.$el.html(_.template(this.tabTmpl, this.model.toJSON()));
            this.el.innerHTML = _.template(this.tabTmpl, this.model.toJSON());
            // util.insertHTML(this.el, 'afterEnd', _.template(this.tabTmpl, this.model.toJSON()));
            return this;
        },
        openUrl: function(e) {
            chrome.tabs.create({
                url: this.model.get('url'),
                selected: true
            });
        },
        remove: function(e) {
            if(confirm('Delete from local storage?')) this.model.destroy();
            this.stopListening();
            this.undelegateEvents();
            // this.$el.remove();
            this.el.parentNode.removeChild(this.el);
        }
    });

    return this.TabView = TabView;
}));
