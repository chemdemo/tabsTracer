/**
 * @Desc: tab controller
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
    var TabController = function(collection) {
        this.collection = collection;

        this.bind();

        return this;
    };

    _.extend(TabController.prototype, Backbone.Events);

    _.extend(TabController.prototype, {
        createATab: function(tab) {
            console.log('create', tab)
            if(!this.collection.has(tab) && !this.isIgnore(tab.url)) this.collection.create({url: tab.url, id: tab.id});
        },

        updateATab: function(tabId, info, tab) {
            if(!info || !info.url) return;

            var _tab = this.collection.get(tabId);

            if(_tab) {
                if(_tab.get('url') !== info.url) _tab.updateUrl(info.url);
            } else {
                this.createATab(tab);
            }
        },

        closeATab: function(tabId) {
            console.log('delete', tabId)
            this.collection.removeById(tabId);
        },

        updateTabsId: function(tabs) {
            var coll = this.collection;
            var models = coll.toJSON();

            _.each(tabs, function(tab) {
                var _tgt = _.findWhere(models, {url: tab.url});

                if(_tgt && _tgt.id != tab.id) coll.get(_tgt.id).updateId(tab.id);
            });
        },

        isIgnore: function(u) {
            var ignores = [];

            if( !u ||
                (u &&
                u.match(/^chrome(?:\.+)?:\/\//) ||
                u.match(/^http(?:|s):\/\/www\.(google|baidu|yahoo)\.com/) ||
                u.match(/^file:\/\//)
                )
            ) return 'ignored';

            return;
        },

        bind: function() {
            this.on('create-tab', this.createATab);
            this.on('remove-tab', this.closeATab);
        }
    });

    return this.TabController = TabController;
}));

