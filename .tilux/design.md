# LoveCount Landing Page - Design Blueprint

Source of truth: the shipped LoveCount app design system (src/appHtml.js tailwind theme + src/styles.js EXTRA_CSS). The landing page reuses those exact tokens. No new colours, no new radii, no new type steps are invented here.

## 1. Colour tokens (extracted verbatim)

### Surfaces and canvas
| Token | Hex | Use on landing |
|---|---|---|
| canvas-peach | #FFF9F7 | gradient stop A (page top) |
| canvas-lavender | #FAF7FF | gradient mid, page body |
| background / surface | #FAF8FF | base body |
| surface-container-low | #F3F2FF | inset panels, chip rest state |
| surface-container | #EBEDFF | section band |
| surface-container-high | #E4E7FE | raised panel |
| surface-container-highest | #DEE1F9 | dividers, track |
| surface-dim | #D6D9F0 | muted device bezel |
| card-surface | #FFFFFF | cards, glass bar core |
| inverse-surface | #2C3041 | footer band |
| on-surface | #171B2B | headings, primary text |
| on-surface-variant | #404754 | body copy |
| text-muted | #6B7280 | meta copy |
| text-subtle | #9CA3AF | eyebrow / caption |
| hairline-border | #F1ECF9 | 1px card borders |
| outline-variant | #C0C6D6 | hairlines on tinted bands |

### Brand accents
| Token | Hex | Use on landing |
|---|---|---|
| primary | #005BB0 | primary button, focus ring, active tab |
| primary-container | #0074DC | primary gradient end |
| primary-fixed | #D5E3FF | active pill wash rgba(213,227,255,.4) |
| bubble-pink | #EC4899 | brand gradient start, eyebrow |
| bubble-rose | #F43F5E | brand gradient end, heart glyph, highlights |
| brand deep stop | #B4144C | logo gradient terminal stop |
| bubble-purple | #8B5CF6 | feature icon 3 |
| secondary | #712AE2 | feature icon 4 |
| bubble-blue | #0088FF | feature icon 2 |
| bubble-emerald | #10B981 | positive / private badge |
| bubble-amber | #FBBF24 | warm accent, star |
| subtle-lavender | #EDE9FE | soft chip fill |
| error-container | #FFDAD6 | (unused, reserved) |

### Logo gradient (master svg, exact)
- body: linear x1 .08 y1 0 -> x2 .92 y2 1, stops #FF9BC0 at 0 / #F43F7A at .46 / #B4144C at 1
- heart: linear x1 .2 y1 0 -> x2 .85 y2 1, stops #FFFFFF at 0 / #FFF6F9 at .7 / #FFE1EB at 1
- corner radius on the 512 tile: rx 116 (22.66 percent)
- stroke ring: #FFFFFF at 0.20 alpha, width 13; progress arc #FFFFFF at 0.62 alpha, round cap; dot r 14 #FFFFFF at 0.95

## 2. Page background
body background: linear-gradient(to bottom, #FFFBF8 0%, #FAF7FF 55%, #FDF2F4 100%).
This is the exact shipped app gradient. Fixed attachment so tinted bands can sit on top without seam.

## 3. Radius scale (exact)
| Role | Value |
|---|---|
| base card / input / DEFAULT | 1rem (16px) |
| large card / sheet | 2rem (32px) |
| pill / full | 9999px |
| feature card | 2rem (32px) |
| screenshot device | 2.25rem outer, 1.85rem screen |
| badge pill | 9999px |

## 4. Spacing scale (exact)
space-2xs .25rem, space-xs .375rem, space-sm .5rem, space-md .75rem, space-lg 1rem, space-xl 1.25rem, space-2xl 1.5rem, space-3xl 2rem, gutter-mobile .75rem, margin-mobile 1rem, margin 1.25rem.
Landing section rhythm: 4.5rem vertical on mobile, 7rem on desktop. Container max-width 72rem (1152px), side padding 1rem mobile / 1.5rem tablet / 2rem desktop.

## 5. Typography
Family: Plus Jakarta Sans everywhere (700 and 800 weights for headings, 400 to 600 for body). Fallback ui-sans-serif, system-ui.

| Step | Size / line / tracking / weight | Landing use |
|---|---|---|
| display-hero | 36px / 44px / -0.03em / 800 | hero H1 (mobile) |
| hero-desktop | 62px / 1.03 / -0.035em / 800 | hero H1 (>=64rem) derived by scaling display-hero, same family and weight |
| headline-lg | 28px / 34px / -0.02em / 700 | section H2 |
| headline-lg-mobile | 24px / 30px / -0.02em / 700 | section H2 (mobile) |
| headline-md | 20px / 26px / -0.01em / 700 | card H3 |
| headline-sm | 17px / 22px / 600 | card H3 small, nav wordmark |
| body-lg | 16px / 22px / 500 | hero subcopy |
| body-md | 14px / 20px / 400 | card body |
| body-sm | 12px / 16px / 400 | fine print |
| label-lg | 13px / 18px / 600 | buttons, nav links |
| label-md | 11px / 14px / 0.02em / 600 | nav links small |
| label-sm | 10px / 12px / 0.04em / 700 | eyebrow caps, tab labels |
| countdown-numeral | 30px / 32px / -0.02em / 800 | stat numerals |

## 6. Shadow layers (exact strings from the shipped app)
- card: 0 8px 24px -4px rgba(30,34,51,.05)
- glass bar: 0 16px 36px -8px rgba(30,34,51,.12), 0 4px 12px rgba(30,34,51,.04)
- sheet: 0 -12px 40px -8px rgba(30,34,51,.22)
- toast: 0 12px 28px -6px rgba(30,34,51,.4)
- logo glow: 0 18px 40px -12px rgba(244,63,122,.5)
- brand button: 0 12px 28px -8px rgba(236,72,153,.45)

## 7. Component specs

### Glass nav bar (mirrors #lt-footer)
position sticky, top 0, z 60. Inner bar width 100 percent max-width 40rem (dock) growing to 72rem at desktop, height 3.75rem, background rgba(255,255,255,.9), backdrop-filter blur(24px), radius 9999px, box-shadow glass bar, 1px border rgba(255,255,255,.6) top. Logo tile 2rem square rx .6rem.

### Buttons
- primary: background linear-gradient(135deg,#005BB0,#0074DC), colour #fff, radius 9999px, padding .875rem 1.5rem, font 13px/600, shadow 0 10px 24px -8px rgba(0,91,176,.5). Active transform scale(.98).
- brand (download CTA): background linear-gradient(to right,#EC4899,#F43F5E), colour #fff, radius 9999px, padding .875rem 1.5rem, shadow 0 12px 28px -8px rgba(236,72,153,.45).
- ghost: background #F3F2FF, colour #171B2B, radius 9999px.
- All buttons: transition transform .15s ease, box-shadow .2s ease.

### Cards
background #FFFFFF, radius 2rem, padding 1.5rem, border 1px solid #F1ECF9, shadow card. Hover: translateY(-4px), shadow 0 20px 40px -12px rgba(30,34,51,.14).

### Feature icon tile
2.75rem square, radius 1rem, background soft tint of the accent at 14 percent, glyph in accent colour, font-size 20px.

### Device frame
width 300px (mobile) / 340px (desktop), radius 2.25rem, padding .55rem, background #171B2B, inner screen radius 1.85rem, overflow hidden, aspect 390/844, shadow 0 40px 80px -24px rgba(23,27,43,.45), plus a 1px rgba(255,255,255,.12) inner ring.

### Badge pill
inline-flex, gap .375rem, padding .375rem .75rem, radius 9999px, background rgba(255,255,255,.75), backdrop blur 12px, border 1px solid #F1ECF9, font label-sm, colour #404754, dot 6px in #F43F5E.

## 8. Layout structure
1. Nav (glass, sticky) - logo, links, Get the app.
2. Hero - two column grid (1.05fr / .95fr) at desktop, stacked on mobile. Left: badge, H1, subcopy, CTA row (Download APK + View features), micro trust row. Right: device frame with real home screenshot, floating glass chips offset around it.
3. Stats band - 3 to 4 countdown-numeral stats on a surface-container band, radius 2rem.
4. Features - H2 plus 6 card grid (1 col mobile, 2 col tablet, 3 col desktop).
5. Care spotlight - two column: copy left, screenshot right. Explains the role aware rules (Esther logs, Israel views and writes notes).
6. Screens carousel - horizontal snap scroll of real screenshots, peek next item, no scrollbar.
7. Realtime band - inverse-surface #2C3041 band, radius 2rem, chat plus calling screenshots and copy.
8. Private by design - 3 small cards.
9. Download CTA - brand gradient panel, radius 2rem, big CTA plus file facts.
10. Footer - inverse surface, logo, columns, hairline top.

## 9. Motion
- scroll reveal: opacity 0 to 1, translateY(18px) to 0, 520ms cubic-bezier(.2,.8,.2,1), stagger 70ms per item.
- respect prefers-reduced-motion: all transforms disabled, content visible.
- ambient: hero blobs slow drift 18s ease-in-out infinite alternate at 30 percent opacity max.
- nav shrinks its shadow after 24px scroll.

## 10. Accessibility and behaviour contract
- every anchor has a real target id on the page
- mobile menu is a real toggle, closes on link click and on Escape
- lightbox opens real screenshots, closes on scrim click and Escape, traps focus on the close button
- download button resolves to the real APK, with a resilient fallback chain
- contrast: #171B2B on #FAF7FF is 15.4:1, #6B7280 on #FFFFFF is 4.8:1, white on #005BB0 is 5.6:1, white on #EC4899 to #F43F5E gradient averages 4.6:1
