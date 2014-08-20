/**
 * @Desc: popup.html start
 */

;(function(root) {
    function startApp() {
        var router = new AppRouter();

        router.navigate('index', {trigger: true});
    };

    // $(startApp);
    window.addEventListener('load', startApp);
}(this));
