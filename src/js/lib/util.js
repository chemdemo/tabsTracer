/**
 * @Desc: util.js
 */

;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore'], function(_) {
            // Use global variables if the locals is undefined.
            return factory(_ || root._);
        });
   } else {
        // RequireJS isn't being used. Assume underscore and backbone is loaded in <script> tags
        factory(_);
   }
}(this, function(_) {
    /**
     * @param {HTMLElement} el
     * @param {String} where beforeBegin、afterBegin、beforeEnd、afterEnd
     * @param {String} html
     */
    function insertHTML(el, where, html) {
        if (!el) return false;

        where = where.toLowerCase();
        console.log(el, where, html)

        if (el.insertAdjacentHTML && el.parentNode) {//IE
            el.insertAdjacentHTML(where, html);
        } else {
            var range = el.ownerDocument.createRange(),
                frag = null;

            switch (where) {
                case 'beforebegin':
                    range.setStartBefore(el);
                    frag = range.createContextualFragment(html);
                    el.parentNode.insertBefore(frag, el);
                    return el.previousSibling;
                case 'afterbegin':
                    if (el.firstChild) {
                        range.setStartBefore(el.firstChild);
                        frag = range.createContextualFragment(html);
                        el.insertBefore(frag, el.firstChild);
                    } else {
                        el.innerHTML = html;
                    }
                    return el.firstChild;
                case 'beforeend':
                    if (el.lastChild) {
                        range.setStartAfter(el.lastChild);
                        frag = range.createContextualFragment(html);
                        el.appendChild(frag);
                    } else {
                        el.innerHTML = html;
                    }
                    return el.lastChild;
                case 'afterend':
                    range.setStartAfter(el);
                    frag = range.createContextualFragment(html);
                    el.parentNode.insertBefore(frag, el.nextSibling);
                    return el.nextSibling;
            }
        }
    };

    return this.util = _.extend({
        insertHTML: insertHTML
    });
}));
