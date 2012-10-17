/**
 * @usage: record the tabs opened from chrome, and open them on chrome open again.
 * @author: yangdemo@gmail.com
 */
 
//see http://developer.chrome.com/extensions/
;(function() {

function toType(o) {
	var s = Object.prototype.toString.call(o),
		l = s.length;
		
	return s.substring(8, l-1).toLowerCase();
}

function saveTabs(value) {
	var store = window.localStorage,
		stringify = window.JSON.stringify;
	
	if(/array/.test(toType(value))) {
		store.setItem('__LAST_OPEND_TABS__', stringify(value));
	}
}

function getTabs() {
	var store = window.localStorage,
		value = store.getItem('__LAST_OPEND_TABS__');
	
	return value ? JSON.parse(value) : [];
}

function clearTabs() {
	window.localStorage.removeItem('__LAST_OPEND_TABS__');
}

function recordTabs() {
	chrome.windows.getCurrent({populate: true}, function(win) {
		var tabs = win.tabs,
			relt = [];
		
		tabs.forEach(function(tab, i) {
			if(tab.url) {
				relt.push({
					'url': tab.url,
					'active': tab.active ? 1 : 0
				});
			}
		});
		
		saveTabs(relt);
		setBadgeText();
	});
}

function openTabs(tabs) {
	var args = {};
	
	tabs.forEach(function(tab, i) {
		args.url = tab.url;
		args.selected = tab.active ? true : false;
		
		chrome.tabs.create(args);
	});
	
	clearTabs();
	setBadgeText();
}

function setBadgeText() {
	var tabs = getTabs(),
		len = tabs.length,
		text = '';
	
	if(len) {
		text += len;
	}
	
	chrome.browserAction.setBadgeText({text: text});
}

function init() {
	setBadgeText();
	
	chrome.browserAction.onClicked.addListener(function() {
		var tabs = getTabs();
		
		if(tabs.length) {
			openTabs(tabs);
		} else {
			recordTabs();
		}
	});
}

document.addEventListener('DOMContentLoaded', init);

}());