// Shared behaviour for every portal page. Events are attached inside ready().
let portal = {
    ready: function () {
        document.addEventListener('click', function (e) {
            if (e.target.closest('#menu_btn')) {
                portal.toggle_menu(e);
            }
            if (e.target.closest('#menu_close') || e.target.closest('#overlay')) {
                portal.close_menu(e);
            }
            if (e.target.closest('.nav a')) {
                portal.close_menu(e);
            }
            if (e.target.closest('#copy_link')) {
                portal.copy_link(e);
            }
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                portal.close_menu(e);
            }
        });
        document.addEventListener('input', function (e) {
            if (e.target.closest('[data-filter]')) {
                portal.filter_rows(e);
            }
        });
    },

    toggle_menu: function (e) {
        portal.set_menu(!document.getElementById('sidebar').classList.contains('open'));
    },

    close_menu: function (e) {
        portal.set_menu(false);
    },

    set_menu: function (open) {
        document.getElementById('sidebar').classList.toggle('open', open);
        document.getElementById('overlay').classList.toggle('show', open);
        document.body.classList.toggle('no-scroll', open);
        document.getElementById('menu_btn').setAttribute('aria-expanded', open);
    },

    copy_link: function (e) {
        let btn = e.target.closest('#copy_link');
        if (navigator.clipboard) {
            navigator.clipboard.writeText(btn.dataset.link);
        }
        btn.textContent = 'Copied';
        setTimeout(function () {
            btn.textContent = 'Copy link';
        }, 1500);
    },

    // <input data-filter="#table_id"> hides table rows that do not match the typed text
    filter_rows: function (e) {
        let input = e.target.closest('[data-filter]');
        let q = input.value.toLowerCase();
        document.querySelectorAll(input.dataset.filter + ' tbody tr').forEach(function (row) {
            row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
    }
};

document.addEventListener('DOMContentLoaded', portal.ready);
