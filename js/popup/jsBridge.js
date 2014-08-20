/**
 * @Desc: get variables for popup.html page from background scripts
 */

;(function(g) {
    var bgContext = chrome.extension.getBackgroundPage();

    g.bgContext = bgContext;
    // g.$ = g.jQuery = bgContext.$;
    g._ = g.underscore = bgContext._;
    g.Backbone = bgContext.Backbone;
}(this));
