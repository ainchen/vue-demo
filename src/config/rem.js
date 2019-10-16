(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			var w = docEl.clientWidth;
			var h = docEl.clientHeight;
			if (!w || !h) return;
			var f = (9 * parseInt(w) + 16 * parseInt(h)) / (1920 * 9) * 10;
			docEl.style.fontSize = f + 'px';
		};
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

export default {}