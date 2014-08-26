/**
 * @Desc: background enter script
 */

;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(
            ['underscore', 'backbone', 'tabsCollection', 'reCollection', 'tabController'],
            function(_, Backbone, TabsCollection, ReCollection, TabController) {
                // Use global variables if the locals is undefined.
                return factory(
                    _ || root._,
                    Backbone || root.Backbone,
                    TabsCollection || root.TabsCollection,
                    ReCollection || root.ReCollection,
                    TabController || root.TabController
                );
            }
        );
   } else {
        // RequireJS isn't being used. Assume underscore and backbone is loaded in <script> tags
        factory(_, Backbone, TabsCollection, ReCollection, TabController);
   }
}(this, function(_, Backbone, TabsCollection, ReCollection, TabController) {
    function init() {
        var coll = new TabsCollection();
        var reColl = new ReCollection();
        var ctrl = new TabController(coll, reColl);

        chrome.tabs.onCreated.addListener(ctrl.createATab.bind(ctrl));
        chrome.tabs.onUpdated.addListener(ctrl.updateATab.bind(ctrl));
        chrome.tabs.onRemoved.addListener(ctrl.closeATab.bind(ctrl));

        coll.fetch();
        reColl.fetch();
        reColl.addRes(ReCollection.__default_res);

        chrome.windows.getCurrent({populate: true}, filterCurrTabs);

        this.tabCollection = coll;
        this.reCollection = reColl;
        this.tabController = ctrl;

        function filterCurrTabs(win) {
            console.log(_.map(win.tabs, function(tab) {return tab.url}))
            ctrl.updateTabsId(win.tabs);
            _.each(win.tabs, ctrl.createATab.bind(ctrl));
        };
    };

    // document.addEventListener('DOMContentLoaded', init);
    this.addEventListener('load', init);
}));

