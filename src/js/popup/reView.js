/**
 * @Desc: ReView
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
    var ReView = Backbone.View.extend({
        tagName: 'li',
        events: {
            'change input': 'updateRe',
            'click .icon-close': 'removeRe'
        },
        initialize: function() {
            this.reTmpl = document.querySelector('#tmpl-re').innerHTML;
            // this.listenTo(this.model, 'change', this.render);
            // this.listenTo(this.model, 'destroy', this.remove);
        },
        updateRe: function(e) {
            this.model.updateRe(e.target.value);
        },
        render: function() {
            this.el.innerHTML = _.template(this.reTmpl, this.model.toJSON());
            // util.insertHTML(this.el, 'afterEnd', _.template(this.reTmpl, this.model.toJSON()));
            return this;
        },
        removeRe: function(e) {
            this.model.destroy();
            this.stopListening();
            this.undelegateEvents();
            // this.$el.remove();
            this.el.parentNode.removeChild(this.el);
        }
    });

    return this.ReView = ReView;
}));
