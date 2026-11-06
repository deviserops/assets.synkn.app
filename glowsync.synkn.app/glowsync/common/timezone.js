let portal_tz = {
    cookie_name: 'portal_tz',

    ready: function () {
        let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (!tz || portal_tz.get() === tz) {
            return;
        }
        document.cookie = portal_tz.cookie_name + '=' + encodeURIComponent(tz) +
            '; path=/; max-age=31536000; SameSite=Lax';
        // Reload only if the cookie was actually saved, so blocked cookies never cause a loop.
        if (portal_tz.get() === tz) {
            window.location.reload();
        }
    },

    get: function () {
        let match = document.cookie.match(new RegExp('(?:^|; )' + portal_tz.cookie_name + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : '';
    }
};

document.addEventListener('DOMContentLoaded', portal_tz.ready);