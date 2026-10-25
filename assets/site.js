// Footer: local time in Cameroon ("4:32pm in Yaoundé, Cameroon") and the light/dark toggle.
(function () {
    var timeEl = document.getElementById('time');
    function render() {
        if (!timeEl) return;
        var t = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'Africa/Douala' })
            .format(new Date())
            .replace(/\s?(AM|PM)/, function (_, p) { return p.toLowerCase(); });
        timeEl.textContent = t;
        timeEl.style.visibility = 'visible';
    }
    render();
    setInterval(render, 15000);

    var MOON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path></svg>';
    var SUN = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>';
    var toggle = document.getElementById('theme-toggle');
    function paint() {
        if (!toggle) return;
        var dark = document.documentElement.getAttribute('data-theme') === 'dark';
        toggle.innerHTML = dark ? SUN : MOON;
        toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    }
    paint();
    if (toggle) toggle.addEventListener('click', function () {
        var html = document.documentElement;
        var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
        paint();
    });
})();
