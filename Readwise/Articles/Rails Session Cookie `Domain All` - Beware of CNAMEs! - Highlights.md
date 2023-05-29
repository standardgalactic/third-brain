![rw-book-cover](https://mugshotbot.com/m?mode=light&color=b91815&pattern=texture&hide_watermark=true&url=https://www.diaconou.com/blog/rails-session-store-domain-all-beware-of-cnames/)

## Metadata
- Author: [[Stephen
Ierodiaconou]]
- Full Title: Rails Session Cookie `Domain: :All` - Beware of CNAMEs!
- URL: https://www.diaconou.com/blog/rails-session-store-domain-all-beware-of-cnames/?utm_source=shortruby&utm_campaign=shortruby_0040&utm_medium=email

## Highlights
- Cookies can have certain attributes associated to them, [one of which is a `Domain`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies). ([View Highlight](https://read.readwise.io/read/01gzehd4h3pkcw4me5q6wyt7gm))
- If the `Domain` attribute is **not** specified, the cookie is *only* sent to the **exact domain** of the host from which it was created. This restricts the cookie to use with one domain.
  Otherwise, if `Domain` **is set**, it specifies which domains the cookie should be sent to. Ie it restricts the cookie’s visibility to those domains ([View Highlight](https://read.readwise.io/read/01gzehdj4bs7yhd9nc3bm28558))
- The important point is that when the `Domain` is specified, the cookie is sent to the **specified domain *and* any subdomains of that domain**. ([View Highlight](https://read.readwise.io/read/01gzehdxq07eghsp2w14atpn2v))
- As the MDN docs state: *“specifying `Domain` is less restrictive than omitting it.”* ([View Highlight](https://read.readwise.io/read/01gzehefjbmcf3vcwtkbzsva5h))
- Cookies with a `Domain` attribute which starts with a `.` are also sent to all subdomains of that domain, ie they were created with the `Domain` attribute. If there is no leading `.` then the cookie is only sent to the exact domain specified ie it was created without a `Domain` attribute. ([View Highlight](https://read.readwise.io/read/01gzehfcmy5h3yx6j5n5m3pfhf))
- In older cookie specs the leading `.` was used to indicate the cookie should be sent to all subdomains. However, [since RFC 6265 this is no longer correct](https://github.com/rails/rails/commit/8f3c6a1005a9dd3f4584c2bc30c1a63e7db15aa8), and while browsers accept it, the `Domain` attribute should not start with a `.`. However, in dev tools, Chrome still shows the leading `.` as a way to visually indicate the cookie is one with a specific `Domain` value rather that one scoped to the exact domain ([View Highlight](https://read.readwise.io/read/01gzehg6p5jewmeg9tba3b18kr))
- By default, the Rails `session_store: :cookie_store` cookie is created without a specific `Domain`. ([View Highlight](https://read.readwise.io/read/01gzehkk6qkn1e19bhaqved10h))
- You can also set the cookie’s `Domain` manually (though you are unlikely to do so).
  You use the `domain:` option,
  Rails.application.config.session_store :cookie_store, key: "_my_app_session", domain: "app.example.com"
  Thi ([View Highlight](https://read.readwise.io/read/01gzehkz34p4kpt8fcapfppa47))
- But does that scope it tightly to `app.example.com`?
  Nope! Because it actually tells the browsers to also send the cookie to all subdomains of `app.example.com`, ie `foo.app.example.com` and `bar.app.example.com` will also receive the cookie. ([View Highlight](https://read.readwise.io/read/01gzehmj1482qa3m4vwsykfsps))
- The `domain:` option can also be set to `:all`, which tells Rails to set the session cookie `Domain` to the ‘top level domain’ of the app host. ([View Highlight](https://read.readwise.io/read/01gzehn1ev3cv1j1cr0871fbfs))
- Sometimes we use so called “CNAME Cloaking” to map third party services to our own domain. ([View Highlight](https://read.readwise.io/read/01gzehpdpz4ht56gs583egvb7b))
- CNAME is an abbreviated form for Canonical Name record. It’s a type of DNS record that maps one domain name to another. ([View Highlight](https://read.readwise.io/read/01gzehqkvsrj0ksxysrjg96gwj))
- You may have noticed that the Rails `cookie_store` also has a `secure:` option.
  This option is used to set the `Secure` attribute on the cookie, which tells the browser to only send the cookie over HTTPS. ([View Highlight](https://read.readwise.io/read/01gzej01e3tcrbanysraq4p7se))
- The `same_site:` option is used to set the `SameSite` attribute on the cookie, which controls the browser’s behaviour in relation to when a cookie is sent based on the origin of the request. ([View Highlight](https://read.readwise.io/read/01gzej15bzrk3x0qvt49pvc84j))
- defaults to `:lax` but you can set it to `:strict` or `:none`. ([View Highlight](https://read.readwise.io/read/01gzej1q6mh41jp9kyhd9ek13z))
- You should only change it to `:none` if you have a specific reason to do so. For example, if your application must work embedded in an iframe inside another unrelated domain, then you must use `:none`. ([View Highlight](https://read.readwise.io/read/01gzej5gtmxa5tj6xsw2qx2a2s))
- The `http_only:` option is used to set the `HttpOnly` attribute on the cookie, which tells the browser to only use the cookie on HTTP(S) requests it makes, and to not expose it to client-side JavaScript via `document.cookie`. ([View Highlight](https://read.readwise.io/read/01gzej8m3gf24df6js853pe8re))
