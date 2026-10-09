let landing = {
    ready: function () {
        document.addEventListener('click', function (e) {
            if (e.target.closest('#nav_toggle')) {
                landing.toggle_nav(e);
            }
            if (e.target.closest('#site_nav a')) {
                landing.set_nav(false);
            }
        });
    },

    toggle_nav: function (e) {
        landing.set_nav(!document.getElementById('site_nav').classList.contains('open'));
    },

    set_nav: function (open) {
        document.getElementById('site_nav').classList.toggle('open', open);
        document.getElementById('nav_toggle').setAttribute('aria-expanded', open);
    }
};

document.addEventListener('DOMContentLoaded', landing.ready);
