/**
 * @Desc: tabsCollections
 */

;(function(g, undefined) {
    var LOCAL_STORE_KEY = '__CHROME_OPENED_TABS__';

    var TabsCollection = Backbone.Collection.extend({
        model: TabModel,

        localStorage: new Store(LOCAL_STORE_KEY),

        has: function(tab) {
            return !!this.findWhere({url: tab.url});
        }
    });
}(this));
