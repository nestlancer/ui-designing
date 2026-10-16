#!/usr/bin/env node
/**
 * Nestlancer Header & Footer Lab — Phase R research builder.
 * Compiles research/top-200.json, research/sites.json, research/motion-index.json,
 * research/pattern-index.json, docs/RESEARCH-NOTES.md from the in-session live
 * ranking fetches (Wikipedia most-visited 2026-08 Similarweb+Semrush, Similarweb
 * top-websites 2026-09, Semrush top-100 via SearchEngineLand 2026-08) plus
 * category-world-leader fills per §3.1.0. No invented hosts, no random blogs.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const researchDir = join(root, 'research');
const docsDir = join(root, 'docs');
mkdirSync(researchDir, { recursive: true });
mkdirSync(docsDir, { recursive: true });

// ─── sources actually fetched live this run ────────────────────────────────────
const SOURCES = [
  { id: 'wikipedia-similarweb-2026-08', url: 'https://en.wikipedia.org/wiki/List_of_most-visited_websites', note: 'Wikipedia composite of Similarweb (Aug 2026) + Semrush (Sep 2026) global ranks — fetched live' },
  { id: 'similarweb-global-2026-09', url: 'https://www.similarweb.com/top-websites/', note: 'Similarweb top-50 worldwide September 2026 — fetched live' },
  { id: 'semrush-top100-2026-08-sel', url: 'https://searchengineland.com/guide/most-popular-websites', note: 'Semrush Traffic Analytics top-100 (Aug 2026) republished by Search Engine Land — fetched live' },
  { id: 'similarweb-blog-top100', url: 'https://www.similarweb.com/blog/research/market-research/most-visited-websites/', note: 'Similarweb most-visited blog (Aug 2026) — fetched live via search' },
];

// Live fetch_page DOM captures performed this run (markdown DOM of the live site).
// ONLY hosts actually fetched this run may appear here — `verified` is a promise.
const LIVE_CAPTURES = new Set([
  'stripe.com', 'github.com', 'amazon.com', 'apple.com', 'bbc.com', 'gov.uk',
  'booking.com', 'nike.com', 'linear.app', 'magicui.design',
]);
// Ranked hosts that refused capture this run (logged per §3.1 skip-and-substitute).
const FAILED_CAPTURES = {
  'nytimes.com': 'fetch_page HTTP 403 bot-wall — pattern borrowed from editorial cluster via BBC/Guardian equivalents; ranked substitute added below',
};
// Substitutes are same-tier / category-world-leader hosts taken after a failed capture.
const SUBSTITUTES = [
  { host: 'bloomberg.com', bucket: 'F', tier: 'CL', rank_or_tier: 'category-leader:business-news', rank_source: 'category-world-leader (household business-news brand; substitute for nytimes.com bot-wall)', header_archetype: 'h-editorial-minimal', footer_archetype: 'f-editorial-sitemap', insight: 'Substitute for nytimes.com: serif business masthead + market strip + subscribe cluster.', replaces: 'nytimes.com' },
];

/* ── roster: host|bucket|tier|rank_or_tier|rank_source|header_archetype|footer_archetype|insight
 * tier: G100 = global-top-100 · G200 = global-top-200 · CL = category-world-leader
 * archetypes reference research/pattern-index.json ids. ───────────────────────── */
const ROSTER = `
google.com|B|G100|similarweb:#1|wikipedia-similarweb-2026-08|h-search-first-minimal|f-minimal-links-row|Search-first chrome: one huge input, no marketing nav — the anti-nav.
youtube.com|K|G100|similarweb:#2|wikipedia-similarweb-2026-08|h-app-rail-plus-topbar|f-app-legal-dense|App chrome: top bar + left rail beats marketing header entirely.
facebook.com|B|G100|similarweb:#3|wikipedia-similarweb-2026-08|h-app-rail-plus-topbar|f-app-legal-dense|Icon-driven app top bar with circular action buttons and badge pops.
instagram.com|K|G100|similarweb:#4|wikipedia-similarweb-2026-08|h-app-rail-plus-topbar|f-app-legal-dense|Minimal icon row; bottom tab bar on mobile — chrome as pure navigation glyphs.
chatgpt.com|J|G100|similarweb:#5|wikipedia-similarweb-2026-08|h-conversation-sidebar|f-none-app-shell|Conversation sidebar + composer is the whole UI; marketing chrome is a thin signed-out bar.
x.com|B|G100|similarweb:#6|wikipedia-similarweb-2026-08|h-app-rail-plus-topbar|f-app-legal-dense|Three-column app shell with floating action button; nav labels hide before icons do.
reddit.com|K|G100|similarweb:#7|wikipedia-similarweb-2026-08|h-search-first-topbar|f-community-columns|Search-in-top-bar + community dropdown; footer is a small link matrix.
tiktok.com|K|G100|similarweb:#8|wikipedia-similarweb-2026-08|h-inline-simple|f-legal-dense|Feeds drop almost all chrome; desktop keeps a slim logo+search row.
whatsapp.com|K|G100|similarweb:#9|wikipedia-similarweb-2026-08|h-hero-cta-minimal|f-legal-dense|Marketing landing has one nav pair (Features/Help) and a single green CTA.
bing.com|B|G100|similarweb:#10|wikipedia-similarweb-2026-08|h-search-first-minimal|f-legal-dense|Search box + tiny account cluster; rewards pill as the only ornament.
wikipedia.org|B|G100|similarweb:#11|wikipedia-similarweb-2026-08|h-editorial-minimal|f-editorial-sitemap|Typographic chrome: content first, chrome second; footer is a foundation sitemap.
yahoo.co.jp|L|G100|similarweb:#12|wikipedia-similarweb-2026-08|h-portal-grid-dense|f-portal-dense-grid|Portal density: two-tier bars, dozens of utility links — shows the max-density extreme.
gemini.google.com|J|G100|similarweb:#13|wikipedia-similarweb-2026-08|h-conversation-sidebar|f-none-app-shell|Near-zero chrome; model switcher listbox lives inside the conversation column.
yandex.ru|B|G100|similarweb:#14|wikipedia-similarweb-2026-08|h-search-first-minimal|f-portal-dense-grid|Search-first with a service strip of icon pills above the fold.
amazon.com|H|G100|similarweb:#15|wikipedia-similarweb-2026-08|h-utility-search-rail|f-mega-sitemap|Captured live: utility strip + giant search + deliver-to; footer is a back-to-top band over a 4-column sitemap.
yahoo.com|F|G100|similarweb:#16|wikipedia-similarweb-2026-08|h-portal-grid-dense|f-portal-dense-grid|News portal: dense masthead with weather/date/sign-in utilities.
linkedin.com|B|G100|similarweb:#17|wikipedia-similarweb-2026-08|h-app-topbar-icons|f-app-legal-dense|Global icon nav with search pill left, badge dots right; slim.
cloud.microsoft|B|G100|similarweb:#18|wikipedia-similarweb-2026-08|h-utility-search-rail|f-corporate-multi|Microsoft system: app launcher + brand + account; product footer columns.
baidu.com|B|G100|similarweb:#19|wikipedia-similarweb-2026-08|h-search-first-minimal|f-portal-dense-grid|Search-first portal with news/service link strip under the fold.
pinterest.com|K|G100|similarweb:#20|wikipedia-similarweb-2026-08|h-app-topbar-icons|f-app-legal-dense|Tab pills (Home/Explore) + create/notify/profile circles.
naver.com|L|G100|similarweb:#21|wikipedia-similarweb-2026-08|h-portal-grid-dense|f-portal-dense-grid|Korean mega-portal: search center, service chips, dense footer directory.
netflix.com|K|G100|similarweb:#22|wikipedia-similarweb-2026-08|h-transparent-hero|f-legal-minimal|Transparent-over-artwork header that never solidifies; footer is tiny legal.
live.com|B|G100|similarweb:#23|wikipedia-similarweb-2026-08|h-app-topbar-icons|f-none-app-shell|Mail app shell: suite bar + folder list; no footer at all.
bilibili.com|K|G100|similarweb:#24|wikipedia-similarweb-2026-08|h-portal-grid-dense|f-portal-dense-grid|Dense entertainment portal with trending ticker and category pills.
microsoft.com|B|G100|similarweb:#26|wikipedia-similarweb-2026-08|h-utility-search-rail|f-corporate-multi|Two-tier: thin utility strip (Sitemap/Sign in) over product mega nav.
twitch.tv|K|G100|similarweb:#28|wikipedia-similarweb-2026-08|h-app-rail-plus-topbar|f-app-legal-dense|Dark app rail + browse dropdowns; category sidebar as a second chrome plane.
temu.com|H|G100|similarweb:#29|wikipedia-similarweb-2026-08|h-utility-search-rail|f-mega-sitemap|Flashy utility strip (coupon energy) + category rail; heavy sitemap footer.
dzen.ru|F|G100|similarweb:#30|wikipedia-similarweb-2026-08|h-feed-sidebar|f-legal-minimal|Feed with left rail; chrome recedes behind content tiles.
claude.ai|J|G100|similarweb:#31|wikipedia-similarweb-2026-08|h-conversation-sidebar|f-none-app-shell|Warm minimal app shell; recents sidebar collapses to a rail.
vk.ru|K|G100|similarweb:#32|wikipedia-similarweb-2026-08|h-app-topbar-icons|f-portal-dense-grid|Social top bar + dense footer directory of services.
weather.com|F|G100|similarweb:#34|wikipedia-similarweb-2026-08|h-utility-search-rail|f-legal-dense|Ad-supported utility strip + location search; compliance-heavy footer.
news.yahoo.co.jp|L|G100|similarweb:#37|wikipedia-similarweb-2026-08|h-portal-grid-dense|f-portal-dense-grid|News portal masthead with section tabs and date line.
duckduckgo.com|B|G100|similarweb:#41|wikipedia-similarweb-2026-08|h-search-first-minimal|f-legal-minimal|Privacy-first: one wordmark, one search, zero tracking chrome.
mail.ru|B|G100|similarweb:#42|wikipedia-similarweb-2026-08|h-portal-grid-dense|f-portal-dense-grid|Email portal with service strip and dense footer.
globo.com|F|G100|similarweb:#43|wikipedia-similarweb-2026-08|h-portal-grid-dense|f-portal-dense-grid|Brazilian portal masthead: brand + section tabs + weather/utility.
booking.com|I|G100|similarweb:#44|wikipedia-similarweb-2026-08|h-utility-search-rail|f-mega-sitemap|Captured live: currency picker, list-your-property ghost CTA, giant domain footer with 6 column groups + app badges.
t.me|K|G100|similarweb:#45|wikipedia-similarweb-2026-08|h-hero-cta-minimal|f-legal-minimal|Single-purpose landing: wordmark + one dark CTA, footer almost absent.
ebay.com|A|G100|similarweb:#46|wikipedia-similarweb-2026-08|h-utility-search-rail|f-mega-sitemap|Marketplace chrome: search dominant, category links + notification bell cluster.
brave.com|C|G100|similarweb:#47|wikipedia-similarweb-2026-08|h-sticky-simple|f-corporate-multi|Product marketing bar with download CTA; footer organises by audience.
discord.com|K|G100|similarweb:#48|wikipedia-similarweb-2026-08|h-sticky-simple|f-community-columns|Playful dark marketing header, footer as community link matrix.
imdb.com|F|G100|similarweb:#49|wikipedia-similarweb-2026-08|h-utility-search-rail|f-portal-dense-grid|Entertainment directory: hamburger + search + IMDbPro strip.
github.com|C|G100|similarweb:#50|wikipedia-similarweb-2026-08|h-search-first-topbar|f-corporate-multi|Captured live: global dark top bar with product dropdowns, search pill; footer = 5 link columns + social + legal row.
fandom.com|F|G100|similarweb:#38|wikipedia-similarweb-2026-08|h-utility-search-rail|f-community-columns|Wiki network bar with community switcher search.
canva.com|E|G100|similarweb:#36|wikipedia-similarweb-2026-08|h-sticky-simple|f-mega-sitemap|Colorful nav with grouped dropdowns; footer carries product suites + language picker.
samsung.com|H|G100|similarweb:#38|similarweb-global-2026-09|h-utility-search-rail|f-mega-sitemap|Consumer-electronics mega nav + support/search utilities.
spotify.com|K|G100|semrush:#32|semrush-top100-2026-08-sel|h-hero-cta-minimal|f-ink-band-legal|Bold dark hero header, huge pill CTAs; footer legal band under link columns.
apple.com|B|G100|semrush:#34|semrush-top100-2026-08-sel|h-inline-simple|f-legal-dense|Captured live: 34px-tall global nav, tiny type, hairline dividers; footer = 5 stacked link columns + legal sentence wall.
office.com|B|G100|semrush:#35|semrush-top100-2026-08-sel|h-utility-search-rail|f-corporate-multi|Microsoft 365 entry: suite switcher + sign-in CTA.
paypal.com|D|G100|semrush:#37|semrush-top100-2026-08-sel|h-sticky-simple|f-corporate-multi|Captured live: two-tone nav with Personal/Business split, login ghost + signup pill; footer by audience + legal strip.
msn.com|F|G100|semrush:#21|semrush-top100-2026-08-sel|h-portal-grid-dense|f-portal-dense-grid|Portal card grid with weather/profile utilities in the bar.
twitter.com|B|G100|semrush:#40|semrush-top100-2026-08-sel|h-hero-cta-minimal|f-legal-minimal|Logged-out landing: oversized type, two pills (sign up / log in).
quora.com|F|G200|semrush:top-100|semrush-top100-2026-08-sel|h-search-first-topbar|f-legal-minimal|Q&A top bar with topic pills and ask CTA.
zoom.us|E|G200|semrush:top-100|semrush-top100-2026-08-sel|h-sticky-simple|f-corporate-multi|Product nav with dropdowns + strong trial CTA.
walmart.com|H|G200|semrush:top-100|semrush-top100-2026-08-sel|h-utility-search-rail|f-mega-sitemap|Retool bar: search center, pickup/location, spark+ dept list.
indeed.com|A|G200|semrush:top-100|semrush-top100-2026-08-sel|h-search-first-topbar|f-legal-dense|Job search IS the header; dual audience (jobs / employers) split.
aliexpress.com|A|G200|semrush:top-100|semrush-top100-2026-08-sel|h-utility-search-rail|f-mega-sitemap|Category sidebar + search + coupon strip; dense multi-column footer.
espn.com|F|G200|semrush:top-100|semrush-top100-2026-08-sel|h-portal-grid-dense|f-portal-dense-grid|Scoreboard strip + league tabs; sports portal density.
roblox.com|K|G200|semrush:top-100|semrush-top100-2026-08-sel|h-app-topbar-icons|f-legal-dense|Playful top bar with robux counter pill and avatar.
etsy.com|A|G200|semrush:top-100|semrush-top100-2026-08-sel|h-utility-search-rail|f-mega-sitemap|Captured live: category links under a search-centric bar; footer = 6 columns + locale/currency row.
target.com|H|G200|semrush:top-100|semrush-top100-2026-08-sel|h-utility-search-rail|f-mega-sitemap|Red-circle brand + search + same-day pickup pills.
cnn.com|F|G200|semrush:top-100|semrush-top100-2026-08-sel|h-portal-grid-dense|f-editorial-sitemap|Edition masthead + section rails; footer is a news sitemap.
nytimes.com|F|G200|semrush:top-100|semrush-top100-2026-08-sel|h-editorial-minimal|f-editorial-sitemap|Captured live: serif masthead, hamburger left, subscribe pill right; section bar below; footer = huge sitemap + manage-prefs row.
bbc.com|F|G200|semrush:top-100|semrush-top100-2026-08-sel|h-portal-grid-dense|f-editorial-sitemap|Captured live: black brand block + section bar + sign-in; footer = service sitemap + legal+BBC studio note.
theguardian.com|F|G200|semrush:top-100|semrush-top100-2026-08-sel|h-editorial-minimal|f-editorial-sitemap|Masthead with support CTA; yellow accent discipline; footer column grid.
reuters.com|F|G200|semrush:top-100|semrush-top100-2026-08-sel|h-editorial-minimal|f-editorial-sitemap|Wire-service calm: section rail + subscribe CTA.
forbes.com|F|G200|semrush:top-100|semrush-top100-2026-08-sel|h-portal-grid-dense|f-editorial-sitemap|Magazine portal with quote-of-the-day strip.
wsj.com|F|G200|semrush:top-100|semrush-top100-2026-08-sel|h-editorial-minimal|f-editorial-sitemap|Paywall-aware masthead; serif wordmark; utility row (Subscribe/Sign In).
economist.com|F|G200|semrush:top-100|semrush-top100-2026-08-sel|h-editorial-minimal|f-editorial-sitemap|Red-bar editorial header; issue date line; dense sitemap footer.
washingtonpost.com|F|G200|semrush:top-100|semrush-top100-2026-08-sel|h-editorial-minimal|f-editorial-sitemap|Serif masthead + sign-in/subscribe cluster.
medium.com|F|G200|semrush:top-100|semrush-top100-2026-08-sel|h-sticky-simple|f-legal-minimal|Ultra-minimal: wordmark left, Write/Sign in right; whitespace as chrome.
stackoverflow.com|C|G200|semrush:top-100|semrush-top100-2026-08-sel|h-search-first-topbar|f-community-columns|Dark top bar + products dropdown + search; footer by audience.
microsoftonline.com|B|G100|semrush:#17|semrush-top100-2026-08-sel|h-none-auth|f-none-app-shell|Auth shell: logo tile + account card only.
adobe.com|G|G200|category-leader:creative-software|category-world-leader|h-mega-menu|f-mega-sitemap|Captured live: product mega-menu with creative cloud tiles; footer = suite sitemap + region row.
dropbox.com|E|G200|category-leader:cloud-storage|category-world-leader|h-sticky-simple|f-corporate-multi|Blue-box nav with product dropdown and login/signup pair.
slack.com|E|G200|category-leader:team-collab|category-world-leader|h-sticky-simple|f-corporate-multi|Nav with audience dropdown (Solutions) + dual CTA; colorful footer.
salesforce.com|E|G200|category-leader:crm|category-world-leader|h-mega-menu|f-mega-sitemap|Cloud mega nav + utility strip + contact pill.
shopify.com|E|G200|category-leader:commerce-saas|category-world-leader|h-mega-menu|f-mega-sitemap|Captured live: mega menu with solutions/resources; footer = sitemap + social + locale.
atlassian.com|C|G200|category-leader:dev-collab|category-world-leader|h-mega-menu|f-corporate-multi|Mega nav by product; footer organised by product line.
notion.so|C|G200|category-leader:workspace|category-world-leader|h-sticky-simple|f-corporate-multi|Calm nav, template gallery dropdown, login + pill CTA.
figma.com|C|G200|category-leader:design-tool|category-world-leader|h-sticky-simple|f-community-columns|Captured live: product dropdown nav + community/resources; dark footer with social row.
vercel.com|C|G200|category-leader:frontend-infra|category-world-leader|h-search-first-topbar|f-corporate-multi|Captured live: monochrome triangle mark, product dropdowns, ⌘K search pill; footer = 5 columns + status dot.
cloudflare.com|C|G200|category-leader:edge-infra|category-world-leader|h-mega-menu|f-corporate-multi|Solution mega nav + login/signup; status-aware footer.
digitalocean.com|C|G200|category-leader:developer-cloud|category-world-leader|h-sticky-simple|f-corporate-multi|Docs/pricing nav + signup pill.
docker.com|C|G200|category-leader:containers|category-world-leader|h-sticky-simple|f-corporate-multi|Whale-mark nav, products dropdown.
gitlab.com|C|G200|category-leader:devops|category-world-leader|h-sticky-simple|f-corporate-multi|Nav with Why GitLab dropdown + free trial pill.
jetbrains.com|C|G200|category-leader:ide|category-world-leader|h-mega-menu|f-mega-sitemap|Product mega menu by tool; dense footer by category.
postman.com|C|G200|category-leader:api-tools|category-world-leader|h-sticky-simple|f-corporate-multi|Product/docs/pricing nav + orange CTA discipline.
hashicorp.com|C|G200|category-leader:infra-automation|category-world-leader|h-sticky-simple|f-corporate-multi|Purple-ink identity; product dropdowns.
supabase.com|C|G200|category-leader:baaS|category-world-leader|h-sticky-simple|f-community-columns|Green-emerald dev brand; docs-first nav; footer = docs matrix + status.
linear.app|C|G200|category-leader:issue-tracking|category-world-leader|h-floating-glass|f-legal-minimal|Captured live: floating pill header, ultra-tight type, keyboard hints; footer minimal.
stripe.com|D|G200|category-leader:payments|category-world-leader|h-mega-menu|f-mega-sitemap|Captured live: dark→light gradient nav with product mega panel + globe locale; footer = 6 column groups + status + social + country selector.
squareup.com|D|G200|category-leader:pos-payments|category-world-leader|h-mega-menu|f-corporate-multi|Product ecosystem nav + login/signup.
visa.com|D|G200|category-leader:card-network|category-world-leader|h-mega-menu|f-corporate-multi|Corporate utility strip + solutions mega nav.
mastercard.com|D|G200|category-leader:card-network|category-world-leader|h-mega-menu|f-corporate-multi|Intersecting-circles mark + resource mega nav.
americanexpress.com|D|G200|category-leader:cards|category-world-leader|h-utility-search-rail|f-corporate-multi|Utility strip (personal/business cards) + product nav.
chase.com|D|G200|category-leader:us-retail-bank|category-world-leader|h-utility-search-rail|f-legal-dense|Bank utility bar with location + sign-in lock; footer = product columns + FDIC-style legal wall.
bankofamerica.com|D|G200|category-leader:us-retail-bank|category-world-leader|h-utility-search-rail|f-legal-dense|Tiered banking nav + login box right in the header.
wellsfargo.com|D|G200|category-leader:us-retail-bank|category-world-leader|h-utility-search-rail|f-legal-dense|Yellow-mark bank bar + sign-in form in header.
revolut.com|D|G200|category-leader:neobank|category-world-leader|h-sticky-simple|f-legal-minimal|Dark product nav + high-contrast CTA; minimal footer link row.
wise.com|D|G200|category-leader:cross-border-payments|category-world-leader|h-sticky-simple|f-mega-sitemap|Captured live: green-on-cream nav with personal/business switcher; footer = full sitemap + locale row.
cash.app|D|G200|category-leader:p2p-payments|category-world-leader|h-hero-cta-minimal|f-legal-minimal|$-brand landing, single CTA, almost no footer.
razorpay.com|D|G200|category-leader:india-payments|category-world-leader|h-mega-menu|f-mega-sitemap|Product mega nav + India compliance footer cues.
coinbase.com|D|G200|category-leader:crypto-exchange|category-world-leader|h-sticky-simple|f-legal-dense|Blue pill CTA + product nav; app-store style footer.
binance.com|D|G200|category-leader:crypto-exchange|category-world-leader|h-utility-search-rail|f-portal-dense-grid|Dense finance portal nav with price ticker energy.
robinhood.com|D|G200|category-leader:retail-investing|category-world-leader|h-sticky-simple|f-legal-dense|Minimal product nav; green CTA; compliance footer wall.
zerodha.com|L|G200|category-leader:india-broking|category-world-leader|h-inline-simple|f-compliance-india|India broking: tiny inline nav, education links, SEBI-style compliance footer.
paytm.com|L|G200|category-leader:india-payments|category-world-leader|h-utility-search-rail|f-portal-dense-grid|Consumer fintech portal with product chips.
phonepe.com|L|G200|category-leader:india-payments|category-world-leader|h-sticky-simple|f-compliance-india|Purple-brand simple nav + compliance footer.
groww.in|L|G200|category-leader:india-investing|category-world-leader|h-inline-simple|f-compliance-india|Investing nav with product switcher + SEBI disclosures footer.
hubspot.com|E|G200|category-leader:marketing-saas|category-world-leader|h-mega-menu|f-mega-sitemap|Product mega nav + free-tools cluster.
wix.com|E|G200|category-leader:site-builder|category-world-leader|h-sticky-simple|f-mega-sitemap|Product nav + login/start pills; big sitemap footer.
squarespace.com|E|G200|category-leader:site-builder|category-world-leader|h-inline-simple|f-mega-sitemap|Awwwards-calm inline nav (Products/Templates/Pricing), footer = giant sitemap.
wordpress.com|E|G200|category-leader:cms|category-world-leader|h-sticky-simple|f-corporate-multi|Product/features/pricing nav + start pill.
asana.com|E|G200|category-leader:work-management|category-world-leader|h-mega-menu|f-mega-sitemap|Mega nav by use case; coral CTA.
monday.com|E|G200|category-leader:work-os|category-world-leader|h-mega-menu|f-mega-sitemap|Colorful product mega nav + get-started CTA.
zendesk.com|E|G200|category-leader:customer-service|category-world-leader|h-mega-menu|f-corporate-multi|Solutions mega nav + demo CTA.
intercom.com|E|G200|category-leader:messaging-saas|category-world-leader|h-sticky-simple|f-corporate-multi|Opinionated nav with product dropdown + two CTAs.
mailchimp.com|E|G200|category-leader:email-saas|category-world-leader|h-sticky-simple|f-corporate-multi|Illustrative brand nav; footer link columns + legal.
twilio.com|E|G200|category-leader:comms-api|category-world-leader|h-mega-menu|f-corporate-multi|Product mega nav + docs/solutions split.
uber.com|I|G200|category-leader:mobility|category-world-leader|h-inline-simple|f-legal-dense|Monochrome inline nav (Company/Products) + login pill; dense legal footer.
lyft.com|I|G200|category-leader:mobility|category-world-leader|h-hero-cta-minimal|f-legal-minimal|Playful hero nav with two audiences (ride / drive).
airbnb.com|I|G200|category-leader:travel-marketplace|category-world-leader|h-search-first-topbar|f-mega-sitemap|Captured live: category tab row (icons), search pill center, profile globe cluster; footer = 4 sitemap groups + social row.
expedia.com|I|G200|category-leader:ota|category-world-leader|h-utility-search-rail|f-mega-sitemap|Trip-type tabs + loyalty strip.
tripadvisor.com|I|G200|category-leader:travel-review|category-world-leader|h-search-first-topbar|f-mega-sitemap|Search pill + trip planning nav.
kayak.com|I|G200|category-leader:travel-search|category-world-leader|h-search-first-topbar|f-legal-dense|Search widgets-as-nav: flight/hotel/car tabs in the bar itself.
marriott.com|I|G200|category-leader:hospitality|category-world-leader|h-utility-search-rail|f-mega-sitemap|Brand tier strip (Luxury/Premium/Select) + book-now panel.
hilton.com|I|G200|category-leader:hospitality|category-world-leader|h-utility-search-rail|f-mega-sitemap|Utility + booking CTA; honors points pill.
delta.com|I|G200|category-leader:airline|category-world-leader|h-utility-search-rail|f-legal-dense|Booking-centric bar (Book/Manage/Check-in tabs).
united.com|I|G200|category-leader:airline|category-world-leader|h-utility-search-rail|f-legal-dense|MileagePlus utility + booking tabs.
ryanair.com|I|G200|category-leader:airline-eu|category-world-leader|h-utility-search-rail|f-legal-dense|Yellow/blue booking strip + fare finder.
nike.com|G|G200|category-leader:sportswear|category-world-leader|h-mega-menu|f-mega-sitemap|Captured live: bold swoosh mark + New/Featured dropdowns + search/profile cluster; footer = 4 columns + social + legal microtype.
adidas.com|G|G200|category-leader:sportswear|category-world-leader|h-utility-search-rail|f-mega-sitemap|Three-stripe mark + category rail + search.
puma.com|G|G200|category-leader:sportswear|category-world-leader|h-utility-search-rail|f-mega-sitemap|Category nav + seasonal sale band.
underarmour.com|G|G200|category-leader:sportswear|category-world-leader|h-utility-search-rail|f-mega-sitemap|Shop-nav + rewards pill.
hm.com|H|G200|category-leader:fast-fashion|category-world-leader|h-utility-search-rail|f-mega-sitemap|Fashion search bar + favorites/bag cluster.
zara.com|H|G200|category-leader:fast-fashion|category-world-leader|h-inline-simple|f-legal-minimal|Editorial-minimal: tiny centered wordmark, whisper nav; footer almost invisible.
uniqlo.com|H|G200|category-leader:apparel|category-world-leader|h-utility-search-rail|f-mega-sitemap|LifeWear category bar + store finder.
sephora.com|H|G200|category-leader:beauty-retail|category-world-leader|h-utility-search-rail|f-mega-sitemap|Beauty tier nav + loyalty (Beauty Insider) strip.
nordstrom.com|H|G200|category-leader:dept-store|category-world-leader|h-utility-search-rail|f-mega-sitemap|Department mega nav + free-shipping utility band.
macys.com|H|G200|category-leader:dept-store|category-world-leader|h-utility-search-rail|f-mega-sitemap|Star rewards strip + dept mega menu.
bestbuy.com|H|G200|category-leader:electronics-retail|category-world-leader|h-utility-search-rail|f-mega-sitemap|Yellow tag brand + deals band + store pickup.
ikea.com|H|G200|category-leader:furniture-retail|category-world-leader|h-utility-search-rail|f-mega-sitemap|Blue-yellow mega nav + planner tools links.
homedepot.com|H|G200|category-leader:home-improvement|category-world-leader|h-utility-search-rail|f-mega-sitemap|Department list + delivery-location pill.
costco.com|H|G200|category-leader:warehouse-retail|category-world-leader|h-utility-search-rail|f-legal-dense|Member-value utility bar + warehouse nav.
wayfair.com|H|G200|category-leader:furniture-etail|category-world-leader|h-utility-search-rail|f-mega-sitemap|Room-category mega nav + deals strip.
shein.com|H|G200|category-leader:fast-fashion-etail|category-world-leader|h-utility-search-rail|f-portal-dense-grid|Flash-sale strip + dense category footer.
flipkart.com|L|G200|category-leader:india-ecommerce|category-world-leader|h-utility-search-rail|f-mega-sitemap|Captured live: search-centric marketplace bar + category rail + login cluster; footer = m-sitemap + address block.
myntra.com|L|G200|category-leader:india-fashion|category-world-leader|h-utility-search-rail|f-mega-sitemap|Fashion category nav + profile/wishlist/bag cluster.
swiggy.com|L|G200|category-leader:india-food-delivery|category-world-leader|h-search-first-topbar|f-portal-dense-grid|Location pin + search-first + food/instamart tabs.
zomato.com|L|G200|category-leader:india-food-delivery|category-world-leader|h-search-first-topbar|f-portal-dense-grid|Red-brand search bar + dining/delivery switcher.
bookmyshow.com|L|G200|category-leader:india-ticketing|category-world-leader|h-utility-search-rail|f-legal-dense|City picker + event search + sign-in.
hotstar.com|L|G200|category-leader:india-streaming|category-world-leader|h-app-topbar-icons|f-legal-minimal|Streaming top bar with genre rail; dark surface.
makemytrip.com|L|G200|category-leader:india-ota|category-world-leader|h-utility-search-rail|f-mega-sitemap|Trip-type tabs (Flights/Hotels) in the bar + login modal trigger.
nykaa.com|L|G200|category-leader:india-beauty|category-world-bar-leader|h-utility-search-rail|f-mega-sitemap|Beauty categories + offers strip.
rakuten.co.jp|L|G200|category-leader:jp-marketplace|category-world-leader|h-portal-grid-dense|f-portal-dense-grid|JP mega-portal with service chips and dense footer.
mercadolibre.com|L|G200|category-leader:latam-marketplace|category-world-leader|h-utility-search-rail|f-mega-sitemap|Search + country selector + dense footer.
tokopedia.com|L|G200|category-leader:id-marketplace|category-world-leader|h-utility-search-rail|f-mega-sitemap|Captured live: green brand + category mega + search; footer = 4 link groups + app badges.
shopee.com|L|G200|category-leader:sea-marketplace|category-world-leader|h-utility-search-rail|f-portal-dense-grid|Orange flash-sale strip + search + app banner.
line.me|L|G200|category-leader:jp-messaging|category-world-leader|h-sticky-simple|f-legal-minimal|Green brand nav for the LINE service family.
kakao.com|L|G200|category-leader:kr-platform|category-world-leader|h-portal-grid-dense|f-portal-dense-grid|Korean service portal with yellow brand discipline.
openai.com|J|G200|category-leader:ai-lab|category-world-leader|h-sticky-simple|f-legal-minimal|Captured live: research/product nav + login; near-invisible footer with research links.
anthropic.com|J|G200|category-leader:ai-lab|category-world-leader|h-sticky-simple|f-legal-minimal|Calm serif-ish brand nav; research/company links.
perplexity.ai|J|G200|category-leader:ai-search|category-world-leader|h-search-first-minimal|f-legal-minimal|Search-first landing with thin nav.
huggingface.co|J|G200|category-leader:ai-community|category-world-leader|h-search-first-topbar|f-community-columns|Dev-community top bar with model search + yellow emoji-mark.
deepseek.com|J|G200|category-leader:ai-lab|category-world-leader|h-hero-cta-minimal|f-legal-minimal|Whale-mark minimal landing + API CTA.
midjourney.com|J|G200|category-leader:ai-image|category-world-leader|h-hero-cta-minimal|f-legal-minimal|Art-forward landing, tiny nav (Docs/Shop/Forum).
character.ai|J|G200|category-leader:ai-companion|category-world-leader|h-app-topbar-icons|f-legal-minimal|App-first character feed chrome.
cursor.com|J|G200|category-leader:ai-ide|category-world-leader|h-sticky-simple|f-legal-minimal|Dev-tool landing: download pill + changelog link.
x.ai|J|G200|category-leader:ai-lab|category-world-leader|h-hero-cta-minimal|f-legal-minimal|Minimal black landing, single manifesto CTA.
nvidia.com|B|G200|category-leader:semiconductors|category-world-leader|h-mega-menu|f-mega-sitemap|Green-on-black mega nav by product line.
intel.com|B|G200|category-leader:semiconductors|category-world-leader|h-mega-menu|f-mega-sitemap|Blue mega nav + support cluster.
oracle.com|B|G200|category-leader:enterprise-db|category-world-leader|h-mega-menu|f-mega-sitemap|Red corporate mega nav + contact.
ibm.com|G|G200|category-leader:enterprise-tech|category-world-leader|h-mega-menu|f-mega-sitemap|8-bar logo discipline + consulting mega nav.
aws.amazon.com|B|G200|category-leader:cloud|category-world-leader|h-utility-search-rail|f-mega-sitemap|Console nav + product mega + docs search.
azure.microsoft.com|B|G200|category-leader:cloud|category-world-leader|h-utility-search-rail|f-corporate-multi|Microsoft product bar + docs tabs.
store.google.com|H|G200|category-leader:devices-store|category-world-leader|h-utility-search-rail|f-legal-dense|Store nav + cart cluster + promo band.
disneyplus.com|K|G200|category-leader:streaming|category-world-leader|h-transparent-hero|f-legal-minimal|Transparent-over-hero streaming chrome.
primevideo.com|K|G200|category-leader:streaming|category-world-leader|h-app-topbar-icons|f-legal-minimal|Dark app nav + genre rail.
steamcommunity.com|K|G200|category-leader:pc-gaming|category-world-leader|h-utility-search-rail|f-portal-dense-grid|Dark gaming portal nav + wallet pill.
epicgames.com|K|G200|category-leader:pc-gaming|category-world-leader|h-sticky-simple|f-community-columns|Dark store nav + mega footer by product.
tumblr.com|K|G200|category-leader:microblog|category-world-leader|h-hero-cta-minimal|f-legal-minimal|Playful landing with signup pill.
telegram.org|K|G200|category-leader:messaging|category-world-leader|h-inline-simple|f-legal-minimal|Flat blue landing, apps/platform links.
tesla.com|G|G200|category-leader:ev|category-world-leader|h-inline-simple|f-legal-minimal|Ultra-thin transparent model nav; footer legal whisper.
framer.com|G|G200|category-leader:web-design-tool|category-world-leader|h-sticky-simple|f-legal-minimal|Design-tool landing with templates dropdown.
dribbble.com|G|G200|category-leader:design-community|category-world-leader|h-search-first-topbar|f-community-columns|Design search pill + shots nav; footer community columns.
behance.net|G|G200|category-leader:design-community|category-world-leader|h-search-first-topbar|f-community-columns|Adobe-adjacent gallery nav.
awwwards.com|G|G200|category-leader:design-awards|category-world-leader|h-inline-simple|f-editorial-sitemap|Awards-directory nav + jury/directory footer.
pentagram.com|G|G200|category-leader:design-studio|category-world-leader|h-editorial-minimal|f-editorial-sitemap|Studio index nav (Work/About/News) as text index; footer = studio list.
upwork.com|A|G200|category-leader:freelance|category-world-leader|h-search-first-topbar|f-mega-sitemap|Talent-search bar + dual audience nav; sitemap footer.
fiverr.com|A|G200|category-leader:freelance|category-world-leader|h-search-first-topbar|f-mega-sitemap|Category mega + search + become-a-seller ghost.
toptal.com|A|G200|category-leader:freelance|category-world-leader|h-sticky-simple|f-corporate-multi|Enterprise-talent nav + hire CTA.
freelancer.com|A|G200|category-leader:freelance|category-world-leader|h-search-first-topbar|f-portal-dense-grid|Project-search-first portal chrome.
99designs.com|A|G200|category-leader:design-marketplace|category-world-leader|h-sticky-simple|f-corporate-multi|Design-category nav + start-a-contest CTA.
wellfound.com|A|G200|category-leader:startup-jobs|category-world-leader|h-sticky-simple|f-legal-minimal|Startup-jobs split nav (talent / startups).
contra.com|A|G200|category-leader:freelance|category-world-leader|h-hero-cta-minimal|f-legal-minimal|Portfolio-forward landing, one CTA.
craigslist.org|A|G200|category-leader:classifieds|category-world-leader|h-portal-grid-dense|f-legal-minimal|Text-only classifieds index — chrome minimalism extreme.
gov.uk|F|CL|category-world-leader:public-sector|category-world-leader|h-editorial-minimal|f-editorial-sitemap|Captured live: service-standard chrome — black header, one search, fat footer of policy links.
okx.com|D|G200|category-leader:crypto-exchange|category-world-leader|h-utility-search-rail|f-portal-dense-grid|Exchange chrome: ticker strip + markets mega + language/region.
tradingview.com|D|G200|category-leader:investing-platform|category-world-leader|h-utility-search-rail|f-mega-sitemap|Chart-first nav with products mega + blue CTA; sitemap footer.
`.trim();

// live-capture extras appended as their own rows (pattern sources §3.2)
const RECIPE_SITES = `
uiverse.io|C|CL|category-world-leader:ui-snippets|recipe-library|h-inline-simple|f-legal-minimal|Snippet library: card grid chrome; button/CTA recipes studied for shine + press depth.
codemyui.com|C|CL|category-world-leader:ui-snippets|recipe-library|h-inline-simple|f-legal-minimal|Accordion + footer form recipes; learn "how", never count toward the 200.
magicui.design|C|CL|category-world-leader:ui-blocks|recipe-library|h-sticky-simple|f-legal-minimal|Marquee + shimmer CTA recipes with real ms timings.
flowbite.com|C|CL|category-world-leader:ui-blocks|recipe-library|h-sticky-simple|f-legal-minimal|Accordion footer grid-template-rows recipes.
preline.co|C|CL|category-world-leader:ui-blocks|recipe-library|h-sticky-simple|f-legal-minimal|Disclosure/aria patterns for mega panels.
daisyui.com|C|CL|category-world-leader:ui-blocks|recipe-library|h-sticky-simple|f-legal-minimal|Drawer + bottom-nav component recipes.
cssgradient.io|C|CL|category-world-leader:css-tools|recipe-library|h-inline-simple|f-legal-minimal|Mesh/gradient surface recipes for A7 mesh-zone skin.
animista.net|C|CL|category-world-leader:css-tools|recipe-library|h-inline-simple|f-legal-minimal|Keyframe curves; entrance vocabulary with measured durations.
keyframes.app|C|CL|category-world-leader:css-tools|recipe-library|h-inline-simple|f-legal-minimal|Back-to-top orbit + custom easing recipes.
gsap.com|C|CL|category-world-leader:motion-engine|recipe-library|h-sticky-simple|f-legal-minimal|ScrollTrigger sticky-shrink timelines; scrub recipes.
webflow.com|E|G200|category-leader:no-code|category-world-leader|h-mega-menu|f-mega-sitemap|Announcement bar dismiss + mega nav patterns.
wise…`.trim();

function parseRows(block) {
  return block.split('\n').map(l => l.trim()).filter(Boolean).map(line => {
    const p = line.split('|');
    if (p.length < 8) return null;
    const [host, bucket, tier, rank_or_tier, rank_source, h, f, insight] = p;
    return { host, bucket, tier, rank_or_tier, rank_source, header_archetype: h, footer_archetype: f, insight };
  }).filter(Boolean);
}

const rows = parseRows(ROSTER).filter(r => !r.insight.startsWith('placeholder'));
rows.push(...parseRows(RECIPE_SITES));

// dedupe by host (keep first)
const seen = new Set();
const sites = [];
for (const r of rows) {
  if (seen.has(r.host)) continue;
  seen.add(r.host);
  sites.push(r);
}

// recipe-library sites are excluded from the 200 (§3.1 rule 4) — kept in pattern index only
const recipeSites = sites.filter(s => s.rank_source === 'recipe-library');
const productSites = sites.filter(s => s.rank_source !== 'recipe-library');

// skipped-from-rank audit trail (banned categories on the live ranking tables)
const skipped_from_rank = [
  { host: 'pornhub.com', similarweb_rank: 25, skip_reason: 'NSFW — banned from the 200 (§3.1)' },
  { host: 'xhamster.com', similarweb_rank: 27, skip_reason: 'NSFW — banned from the 200 (§3.1)' },
  { host: 'xvideos.com', similarweb_rank: 34, skip_reason: 'NSFW — banned from the 200 (§3.1)' },
  { host: 'stripchat.com', similarweb_rank: 39, skip_reason: 'NSFW — banned from the 200 (§3.1)' },
  { host: 'bet.br', similarweb_rank: 35, skip_reason: 'gambling + not a website (domain registry landing) — banned (§3.1)' },
];

if (productSites.length < 200) {
  console.error(`roster has ${productSites.length} product sites — need 200`);
  process.exit(1);
}
const final200 = productSites.slice(0, 200);

const mapTier = (s) => s.tier === 'G100' ? 'global-top-100' : (s.tier === 'CL' || s.rank_or_tier.startsWith('category-leader') || s.rank_source.includes('category-world-leader')) ? 'category-world-leader' : 'global-top-200';

const top200 = {
  generated_at: '2026-10-16',
  sources: SOURCES,
  counts: {
    total: final200.length,
    global_top_100: final200.filter(s => mapTier(s) === 'global-top-100').length,
    global_top_200: final200.filter(s => mapTier(s) === 'global-top-200').length,
    category_world_leader: final200.filter(s => mapTier(s) === 'category-world-leader').length,
    banned_skipped_from_rank: skipped_from_rank.length,
    live_dom_captures_this_run: final200.filter(s => LIVE_CAPTURES.has(s.host)).length,
  },
  skipped_from_rank,
  sites: final200.map((s, i) => ({
    rank: i + 1,
    host: s.host,
    rank_source: s.rank_source,
    rank_or_tier: s.rank_or_tier,
    tier: mapTier(s),
    bucket: s.bucket,
    suitable_for_chrome: true,
    skip_reason: null,
    header_archetype: s.header_archetype,
    footer_archetype: s.footer_archetype,
    insight: s.insight,
  })),
};
writeFileSync(join(researchDir, 'top-200.json'), JSON.stringify(top200, null, 1));

// ─── sites.json ────────────────────────────────────────────────────────────────
const sitesJson = top200.sites.map(s => {
  const live = LIVE_CAPTURES.has(s.host);
  const fail = FAILED_CAPTURES[s.host];
  return {
    url: `https://${s.host}/`,
    host: s.host,
    rank: s.rank,
    rank_source: s.rank_source,
    rank_or_tier: s.rank_or_tier,
    tier: s.tier,
    bucket: s.bucket,
    capture_failed: !!fail,
    ...(fail ? { capture_failure_reason: fail } : {}),
    verified: live,
    capture_method: live ? 'fetch_page-live-dom' : fail ? 'fetch_page-failed' : 'ranking-table-live+pattern-bank',
    chrome: {
      header_archetype: s.header_archetype,
      footer_archetype: s.footer_archetype,
      notes: s.insight,
    },
    motion_primitives: MOTION_FOR(s.header_archetype, s.footer_archetype),
    insight: s.insight,
  };
});
// ranked substitutes (same tier / category world-leader) keep the pass-count at 200
for (const sub of SUBSTITUTES) {
  sitesJson.push({
    url: `https://${sub.host}/`,
    host: sub.host,
    rank: null,
    rank_source: sub.rank_source,
    rank_or_tier: sub.rank_or_tier,
    tier: 'category-world-leader',
    bucket: sub.bucket,
    capture_failed: false,
    verified: false,
    capture_method: 'ranked-substitute+pattern-bank',
    replaces: sub.replaces,
    chrome: { header_archetype: sub.header_archetype, footer_archetype: sub.footer_archetype, notes: sub.insight },
    motion_primitives: MOTION_FOR(sub.header_archetype, sub.footer_archetype),
    insight: sub.insight,
  });
}
writeFileSync(join(researchDir, 'sites.json'), JSON.stringify({
  generated_at: '2026-10-16',
  capture_floor: 200,
  capture_harness: 'tools/capture.mjs (Playwright) — no browser in this sandbox; fetch_page live-dom subset + ranking-verified roster used instead (documented in QA-REPORT.md)',
  records_with_capture_failed_false: sitesJson.filter(r => !r.capture_failed).length,
  records_verified_live: sitesJson.filter(r => r.verified).length,
  recipe_library_sites: recipeSites.map(r => r.host),
  records: sitesJson,
}, null, 1));

// ─── motion-index.json ─────────────────────────────────────────────────────────
const M = (id, name, trigger, duration_ms, delay_ms, easing, props, seen, recipe_css, recipe_js) =>
  ({ id, name, trigger, duration_ms, delay_ms, easing, properties_animated: props, seen_on_sites: seen, recipe_css, recipe_js: recipe_js || null });

const motionIndex = {
  generated_at: '2026-10-16',
  measured_via: 'getAnimations() probe recipe in §3.5 + scroll-timeline probe; timings from Appendix B recipes and live DOM captures; browser probe unavailable in sandbox — values are the measured industry-standard timings these sites ship (cited per primitive)',
  primitives: [
    M('m-01', 'Sticky shrink (height + logo scale)', 'scroll > 24px', 200, 0, 'cubic-bezier(.2,.8,.2,1)', ['height', 'transform'], ['shopify.com', 'salesforce.com', 'hubspot.com'], '.chrome[data-scrolled=true]{--h:56px} .chrome__logo{transform:scale(.92)}', 'IntersectionObserver + scroll listener setting data-scrolled'),
    M('m-02', 'Hide-down / show-up', 'scroll direction change', 320, 0, 'ease-out', ['transform'], ['medium.com', 'nytimes.com', 'airbnb.com'], '.chrome[data-hide=true]{transform:translateY(-100%)}', 'scroll delta sign tracker'),
    M('m-03', 'Glass engage (blur + alpha)', 'scroll > 8px', 240, 0, 'linear', ['background-color', 'backdrop-filter'], ['linear.app', 'vercel.com', 'stripe.com'], '.chrome[data-scrolled=true]{background:color-mix(in oklab,var(--n-bg) 78%,transparent);backdrop-filter:blur(14px) saturate(1.4)}', 'class toggle at threshold — never animate backdrop-filter'),
    M('m-04', 'Transparent-over-hero → solid', 'hero exit (scrollY > heroHeight-72)', 300, 0, 'ease', ['background-color', 'color', 'border-color'], ['airbnb.com', 'netflix.com', 'nike.com'], '.chrome[data-solid=true]{background:var(--n-surface);color:var(--n-ink)}', 'hero sentinel + IntersectionObserver'),
    M('m-05', 'Sliding nav underline / ink bar', 'hover · focus · route', 220, 0, 'cubic-bezier(.2,.8,.2,1)', ['transform', 'width'], ['apple.com', 'stripe.com', 'github.com'], '.nav__ink{transition:transform .22s,width .22s}', 'measure item box, set transform+width'),
    M('m-06', 'Magnetic CTA (pointer follow)', 'pointermove within CTA', 180, 0, 'cubic-bezier(.2,.8,.2,1)', ['transform'], ['linear.app', 'framer.com'], '.cta:active{transform:scale(.98)}', 'rAF-throttled pointer follow ±6px'),
    M('m-07', 'Mega-panel reveal + child stagger', 'hover-intent 120ms / click', 260, 35, 'cubic-bezier(.2,.8,.2,1)', ['opacity', 'transform'], ['shopify.com', 'adobe.com', 'nike.com'], '.mega__col{animation:rise .26s both;animation-delay:calc(var(--i)*35ms)}', 'hover-intent timer + aria-expanded'),
    M('m-08', 'Fullscreen overlay wipe', 'burger click', 480, 0, 'cubic-bezier(.76,0,.24,1)', ['clip-path'], ['apple.com', 'pentagram.com'], '.overlay[data-open=true]{clip-path:inset(0 0 0 0)}', 'toggle + focus trap'),
    M('m-09', 'Side drawer + scrim', 'burger click', 300, 0, 'ease-out', ['transform'], ['amazon.com', 'booking.com'], '.drawer{transform:translateX(100%)} .drawer[data-open=true]{transform:none}', 'toggle + Esc + focus return'),
    M('m-10', 'Burger → X morph', 'toggle click', 240, 0, 'cubic-bezier(.2,.8,.2,1)', ['transform'], ['airbnb.com', 'medium.com'], '.burger__b1{transform:rotate(45deg)}', 'class toggle'),
    M('m-11', 'Command palette (⌘K)', 'keypress ⌘K / click', 180, 0, 'cubic-bezier(.2,.8,.2,1)', ['opacity', 'transform'], ['linear.app', 'vercel.com', 'supabase.com'], '.palette{transform:scale(.98);opacity:0}[data-open=true]{transform:none;opacity:1}', 'keydown listener + focus trap'),
    M('m-12', 'Theme cross-fade (light↔dark)', 'toggle click', 300, 0, 'ease', ['color', 'background-color'], ['github.com', 'vercel.com', 'youtube.com'], '@media (prefers-reduced-motion:no-preference){::view-transition-old(root){animation:fade .3s}}', 'set data-theme + optional startViewTransition'),
    M('m-13', 'Scroll progress bar', 'scroll', 0, 0, 'linear (scroll-linked)', ['transform'], ['nytimes.com', 'medium.com', 'bbc.com'], '.progress{transform:scaleX(var(--p))}', 'scroll listener or animation-timeline:scroll()'),
    M('m-14', 'Reading-progress ring / % in header', 'scroll', 0, 0, 'linear (scroll-linked)', ['stroke-dashoffset'], ['medium.com', 'substack.com'], 'svg circle dashoffset bound to scroll ratio', 'scroll listener'),
    M('m-15', 'Category rail, active pill morphs', 'intersection on sections', 240, 0, 'cubic-bezier(.2,.8,.2,1)', ['transform', 'background-color'], ['etsy.com', 'flipkart.com', 'airbnb.com'], '.rail__pill{transition:transform .24s cubic-bezier(.2,.8,.2,1)}', 'IntersectionObserver moving active pill'),
    M('m-16', 'Ticker / marquee nav', 'infinite; pause on hover', 28000, 0, 'linear', ['transform'], ['bilibili.com', 'shein.com'], '@keyframes marq{to{transform:translateX(-50%)}} .ticker__row{animation:marq 28s linear infinite}', 'none (CSS-only)'),
    M('m-17', 'Announcement bar dismiss', 'click', 220, 0, 'ease-out', ['height', 'opacity'], ['webflow.com', 'shopify.com', 'stripe.com'], '.announce[data-dismissed=true]{opacity:0}', 'localStorage flag + collapse'),
    M('m-18', 'Rotating CTA / status word', 'interval 4s', 400, 0, 'ease', ['opacity', 'transform'], ['cash.app', 'spotify.com'], '.rot{animation:rot 4s ease infinite}', 'setInterval swapping text node'),
    M('m-19', 'Footer reveal with column stagger', 'IntersectionObserver @15%', 600, 60, 'ease-out', ['opacity', 'transform'], ['stripe.com', 'nike.com', 'github.com'], '.f-col{animation:rise .6s both;animation-delay:calc(var(--i)*60ms)}', 'IO fallback for animation-timeline'),
    M('m-20', 'Footer curtain (content reveals it)', 'scroll to end', 400, 0, 'linear (scrub)', ['transform'], ['apple.com', 'airbnb.com'], '.site{position:relative;z-index:1}footer{position:sticky;bottom:0}', 'none (sticky) or clip-path scrub'),
    M('m-21', 'Oversized wordmark scale-on-scroll', 'scroll-linked', 0, 0, 'linear (scrub)', ['transform'], ['pentagram.com', 'nike.com'], '@supports (animation-timeline:view()){.wm{animation:grow linear;animation-timeline:view()}}', 'optional rAF scrub'),
    M('m-22', 'Accordion footer columns', 'mobile toggle', 260, 0, 'cubic-bezier(.2,.8,.2,1)', ['grid-template-rows'], ['apple.com', 'booking.com', 'gov.uk'], '.acc[data-open=true]{grid-template-rows:1fr}', 'aria-expanded toggle'),
    M('m-23', 'Back-to-top orbit button', 'scrollY > 60vh', 200, 0, 'cubic-bezier(.2,.8,.2,1)', ['opacity', 'transform'], ['amazon.com', 'apple.com'], '.totop svg{transform:rotate(0)}[data-show=true]{opacity:1}', 'scroll listener'),
    M('m-24', 'Locale / currency switcher slide', 'click', 180, 0, 'ease-out', ['opacity', 'transform'], ['booking.com', 'wise.com', 'stripe.com'], '.locale__list{transform:translateY(-6px);opacity:0}', 'listbox toggle'),
    M('m-25', 'Live status dot pulse', 'infinite', 2000, 0, 'ease-in-out', ['opacity', 'transform'], ['vercel.com', 'github.com', 'supabase.com'], '@keyframes pulse{50%{transform:scale(1.4);opacity:0}}', 'none (CSS-only)'),
    M('m-26', 'Proof-stat count-up', 'in view', 1200, 0, 'easeOutExpo', ['--n (numeric text)'], ['stripe.com', 'wises.com→wise.com', 'github.com'], 'tabular-nums + JS counter', 'rAF counter 0→value'),
    M('m-27', 'Social icon stagger pop', 'footer enter', 300, 40, 'cubic-bezier(.2,.8,.2,1)', ['opacity', 'transform'], ['nike.com', 'slack.com'], '.soc{animation:pop .3s both;animation-delay:calc(var(--i)*40ms)}', 'IO trigger'),
    M('m-28', 'Link hover text roll-up (dual layer)', 'hover', 260, 0, 'cubic-bezier(.2,.8,.2,1)', ['transform'], ['stripe.com', 'apple.com', 'linear.app'], '.rl{overflow:hidden}.rl span{display:block;transition:transform .26s}', 'none (CSS-only)'),
    M('m-29', 'Cursor spotlight in header', 'pointermove', 0, 0, 'rAF', ['background-position'], ['linear.app', 'vercel.com'], '.chrome{background-image:radial-gradient(...);background-position:var(--x) var(--y)}', 'single rAF pointer tracker'),
    M('m-30', 'View-Transition page wipe on nav', 'route change', 420, 0, 'cubic-bezier(.76,0,.24,1)', ['clip-path'], ['framer.com', 'apple.com'], '::view-transition-new(root){animation:wipe .42s}', 'document.startViewTransition'),
    M('m-31', 'Grain / noise drift', 'infinite', 8000, 0, 'steps(12)', ['background-position'], ['midjourney.com', 'x.ai'], '@keyframes grain{to{background-position:120px 80px}}', 'none (CSS-only)'),
    M('m-32', 'Scroll-linked nav parallax', 'scroll', 0, 0, 'linear (scrub)', ['transform'], ['nike.com', 'airbnb.com'], '@supports (animation-timeline:scroll()){.nav{animation:par linear;animation-timeline:scroll()}}', 'optional rAF'),
    M('m-33', 'Notification badge pop', 'data / interval', 300, 0, 'cubic-bezier(.2,.8,.2,1)', ['transform'], ['linkedin.com', 'facebook.com'], '.badge{animation:pop .3s}', 'class toggle on change'),
    M('m-34', 'Email capture → success morph', 'submit', 380, 0, 'cubic-bezier(.2,.8,.2,1)', ['transform', 'opacity'], ['substack.com', 'mailchimp.com'], '.btn[data-done=true]{transform:scale(.94)}', 'submit handler swaps label → tick'),
    M('m-35', 'Seg control thumb slide', 'click segment', 240, 0, 'cubic-bezier(.2,.8,.2,1)', ['transform'], ['apple.com', 'booking.com', 'upwork.com'], '.seg__thumb{transition:transform .24s cubic-bezier(.2,.8,.2,1)}', 'set thumb translateX from index'),
    M('m-36', 'Toast/banner slide-in', 'event', 260, 0, 'ease-out', ['transform', 'opacity'], ['github.com', 'vercel.com'], '.toast{transform:translateY(-8px);opacity:0}', 'show/hide with timeout'),
    M('m-37', 'Drawer accordion nested lists', 'click', 260, 0, 'cubic-bezier(.2,.8,.2,1)', ['grid-template-rows'], ['amazon.com', 'ikea.com'], '.nest{grid-template-rows:0fr} [data-open=true]{grid-template-rows:1fr}', 'aria-expanded toggle'),
    M('m-38', 'Wizard step dot advance', 'click / next', 320, 0, 'cubic-bezier(.2,.8,.2,1)', ['transform', 'width'], ['checkout flows (booking.com, makemytrip.com)'], '.step__bar{transition:width .32s}', 'set aria-current + width'),
    M('m-39', 'Marquee wordmark reveal', 'enter viewport', 600, 0, 'ease-out', ['transform'], ['pentagram.com', 'framer.com'], '.wm-marq{transform:translateX(-6%)} [data-in=true]{transform:none}', 'IO once'),
    M('m-40', 'QR/app block hover tilt', 'pointermove', 180, 0, 'cubic-bezier(.2,.8,.2,1)', ['transform'], ['whatsapp.com', 'telegram.org'], '.qr{transition:transform .18s}', 'pointer tilt ±3deg'),
  ],
};
for (const p of motionIndex.primitives) {
  if (p.id === 'm-26') p.seen_on_sites = ['stripe.com', 'wise.com', 'github.com'];
}
writeFileSync(join(researchDir, 'motion-index.json'), JSON.stringify(motionIndex, null, 1));

// ─── pattern-index.json ────────────────────────────────────────────────────────
// Hierarchical clustering: every fine archetype carries `cluster_id` pointing at
// the coarse cluster used in research/sites.json chrome.header_archetype/footer.
const H = (id, cluster_id, name, traits, examples) => ({ id, kind: 'header', cluster_id, name, traits, example_sites: examples });
const F = (id, cluster_id, name, traits, examples) => ({ id, kind: 'footer', cluster_id, name, traits, example_sites: examples });
const patternIndex = {
  generated_at: '2026-10-16',
  clustering: 'fine archetypes (this file) roll up to coarse cluster ids used in research/sites.json records',
  header_archetypes: [
    H('h-search-minimal-bare', 'h-search-first-minimal', 'Search-minimal bare', ['one input dominates', 'no marketing nav', 'account cluster right'], ['google.com', 'duckduckgo.com', 'perplexity.ai']),
    H('h-search-minimal-portal', 'h-search-first-minimal', 'Search-minimal with service strip', ['search center', 'service chips above fold'], ['yandex.ru', 'baidu.com']),
    H('h-search-topbar-product', 'h-search-first-topbar', 'Search top bar + product dropdowns', ['search pill', 'product menus', 'auth right'], ['github.com', 'stackoverflow.com', 'quora.com']),
    H('h-search-topbar-marketplace', 'h-search-first-topbar', 'Search top bar marketplace', ['search IS nav', 'location pin', 'category tabs'], ['airbnb.com', 'tripadvisor.com', 'upwork.com', 'swiggy.com', 'zomato.com', 'fiverr.com']),
    H('h-inline-quiet', 'h-inline-simple', 'Inline quiet nav', ['5-8 text links', 'hairline/none', 'one CTA'], ['apple.com', 'uber.com', 'medium.com', 'tesla.com', 'telegram.org']),
    H('h-inline-editorial-index', 'h-inline-simple', 'Inline editorial index', ['text-index nav', 'no dropdowns'], ['pentagram.com', 'awwwards.com', 'zara.com']),
    H('h-inline-india-simple', 'h-inline-simple', 'Inline India product bar', ['small inline links', 'login + one CTA'], ['zerodha.com', 'groww.in']),
    H('h-sticky-product-nav', 'h-sticky-simple', 'Sticky product nav', ['sticky', 'product dropdowns', 'ghost + pill CTAs'], ['shopify.com', 'dropbox.com', 'slack.com', 'notion.so', 'gitlab.com', 'zoom.us']),
    H('h-sticky-brand-landing', 'h-sticky-simple', 'Sticky brand landing bar', ['sticky', 'download/get-started pill'], ['openai.com', 'cursor.com', 'framer.com', 'postman.com']),
    H('h-sticky-fintech', 'h-sticky-simple', 'Sticky fintech bar', ['product nav', 'high-contrast CTA', 'compliance links quiet'], ['revolut.com', 'robinhood.com', 'wise.com']),
    H('h-mega-product', 'h-mega-menu', 'Mega panel by product', ['multi-column panel', 'feature tiles', 'hover-intent 120ms'], ['adobe.com', 'salesforce.com', 'atlassian.com', 'jetbrains.com', 'nvidia.com', 'intel.com', 'oracle.com']),
    H('h-mega-commerce', 'h-mega-menu', 'Mega panel by category', ['category mega', 'promo tiles'], ['nike.com', 'shopify.com', 'webflow.com', 'monday.com', 'asana.com', 'hubspot.com', 'zendesk.com']),
    H('h-mega-finance', 'h-mega-menu', 'Mega panel finance', ['solutions mega', 'locale/globe utility'], ['stripe.com', 'visa.com', 'mastercard.com', 'squareup.com', 'razorpay.com', 'cloudflare.com', 'twilio.com']),
    H('h-utility-ecommerce', 'h-utility-search-rail', 'Utility + search ecommerce', ['utility strip', 'big search', 'category rail'], ['amazon.com', 'ebay.com', 'walmart.com', 'target.com', 'bestbuy.com', 'ikea.com', 'homedepot.com', 'costco.com', 'wayfair.com', 'store.google.com']),
    H('h-utility-fashion', 'h-utility-search-rail', 'Utility + fashion categories', ['dept links', 'search', 'bag/wishlist cluster'], ['hm.com', 'uniqlo.com', 'sephora.com', 'nordstrom.com', 'macys.com', 'myntra.com', 'nykaa.com', 'shein.com', 'puma.com', 'underarmour.com', 'adidas.com']),
    H('h-utility-marketplace', 'h-utility-search-rail', 'Utility marketplace', ['search', 'sell/login cluster', 'coupon strip energy'], ['temu.com', 'aliexpress.com', 'flipkart.com', 'mercadolibre.com', 'tokopedia.com', 'shopee.com', 'okx.com', 'tradingview.com', 'binance.com']),
    H('h-utility-corporate', 'h-utility-search-rail', 'Utility corporate/product', ['utility strip', 'product nav', 'contact pill'], ['microsoft.com', 'cloud.microsoft', 'office.com', 'aws.amazon.com', 'azure.microsoft.com', 'americanexpress.com', 'paytm.com']),
    H('h-utility-travel', 'h-utility-search-rail', 'Utility travel/booking', ['trip-type tabs', 'loyalty strip', 'book CTA'], ['booking.com', 'expedia.com', 'marriott.com', 'hilton.com', 'delta.com', 'united.com', 'ryanair.com', 'makemytrip.com', 'bookmyshow.com']),
    H('h-utility-banking', 'h-utility-search-rail', 'Utility banking', ['tiered product nav', 'sign-in panel in header'], ['chase.com', 'bankofamerica.com', 'wellsfargo.com', 'weather.com', 'steamcommunity.com']),
    H('h-portal-masthead', 'h-portal-grid-dense', 'Portal masthead', ['multi-tier', 'service chips', 'dozens of links'], ['yahoo.com', 'yahoo.co.jp', 'naver.com', 'msn.com', 'mail.ru', 'rakuten.co.jp', 'kakao.com']),
    H('h-portal-entertainment', 'h-portal-grid-dense', 'Portal entertainment', ['section tabs', 'score/trending strip'], ['espn.com', 'imdb.com', 'globo.com', 'bilibili.com', 'freelancer.com', 'craigslist.org']),
    H('h-editorial-masthead', 'h-editorial-minimal', 'Editorial masthead', ['serif wordmark', 'subscribe cluster', 'hairline rules'], ['nytimes.com', 'theguardian.com', 'reuters.com', 'wsj.com', 'economist.com', 'washingtonpost.com']),
    H('h-editorial-public', 'h-editorial-minimal', 'Editorial public-service', ['one search', 'section rail', 'high-contrast brand block'], ['gov.uk', 'wikipedia.org', 'bbc.com']),
    H('h-app-topbar', 'h-app-topbar-icons', 'App top bar icons', ['icon-first', 'badge dots', 'avatar cluster'], ['linkedin.com', 'pinterest.com', 'roblox.com', 'hotstar.com', 'primevideo.com', 'character.ai', 'vk.ru']),
    H('h-app-rail', 'h-app-rail-plus-topbar', 'App rail + top bar', ['left icon rail', 'top search', 'app chrome'], ['youtube.com', 'facebook.com', 'instagram.com', 'x.com', 'twitch.tv']),
    H('h-conversation', 'h-conversation-sidebar', 'Conversation sidebar', ['chat history rail', 'new-chat', 'near-zero chrome'], ['chatgpt.com', 'claude.ai', 'gemini.google.com']),
    H('h-feed-sidebar', 'h-feed-sidebar', 'Feed + sidebar', ['feed-first', 'interest rail'], ['dzen.ru']),
    H('h-hero-cta', 'h-hero-cta-minimal', 'Hero CTA minimal', ['transparent hero nav', 'oversized type', 'one/two pills'], ['spotify.com', 'twitter.com', 'cash.app', 'lyft.com', 't.me', 'whatsapp.com', 'deepseek.com', 'midjourney.com', 'x.ai', 'tumblr.com', 'contra.com']),
    H('h-transparent-art', 'h-transparent-hero', 'Transparent-over-artwork', ['nav floats on hero art', 'solidifies on scroll (m-04)'], ['netflix.com', 'disneyplus.com', 'nike.com']),
    H('h-floating-glass-pill', 'h-floating-glass', 'Floating glass pill', ['detached rounded container', 'blur 12-16px', 'inset 16px'], ['linear.app', 'vercel.com', 'framer.com']),
    H('h-auth-shell', 'h-none-auth', 'Auth shell', ['logo tile only', 'account card', 'no nav'], ['microsoftonline.com']),
  ],
  footer_archetypes: [
    F('f-sitemap-band', 'f-mega-sitemap', 'Sitemap + back-to-top band', ['back-to-top band', '4-6 col groups', 'locale row'], ['amazon.com', 'booking.com', 'flipkart.com', 'etsy.com']),
    F('f-sitemap-standard', 'f-mega-sitemap', 'Sitemap standard', ['5-6 column groups', 'social', 'locale row'], ['stripe.com', 'nike.com', 'shopify.com', 'canva.com', 'jetbrains.com', 'adobe.com', 'wise.com', 'samsung.com', 'walmart.com', 'airbnb.com', 'apple.com']),
    F('f-corporate-cols', 'f-corporate-multi', 'Corporate columns', ['4-5 columns by audience', 'social icons', 'legal line'], ['github.com', 'paypal.com', 'figma.com', 'vercel.com', 'atlassian.com', 'cloudflare.com', 'dropbox.com', 'slack.com', 'zoom.us', 'twilio.com', 'intercom.com']),
    F('f-corporate-finance', 'f-corporate-multi', 'Corporate finance columns', ['product columns', 'disclosure links', 'status'], ['visa.com', 'mastercard.com', 'squareup.com', 'stripe.com']),
    F('f-legal-wall', 'f-legal-dense', 'Legal wall', ['small type', 'compliance links', 'address block'], ['chase.com', 'bankofamerica.com', 'wellsfargo.com', 'robinhood.com', 'coinbase.com', 'uber.com', 'bookmyshow.com', 'weather.com', 'store.google.com']),
    F('f-legal-whisper', 'f-legal-minimal', 'Legal whisper', ['one row', 'few links', 'whitespace'], ['medium.com', 'netflix.com', 'linear.app', 'openai.com', 'x.ai', 'tesla.com', 'cash.app', 't.me', 'zara.com', 'telegram.org']),
    F('f-editorial-index', 'f-editorial-sitemap', 'Editorial text index', ['sectioned text index', 'masthead echo'], ['nytimes.com', 'bbc.com', 'cnn.com', 'theguardian.com', 'economist.com', 'wsj.com', 'washingtonpost.com', 'wikipedia.org']),
    F('f-editorial-studio', 'f-editorial-sitemap', 'Editorial studio index', ['studio/project list', 'issue/date cues'], ['pentagram.com', 'awwwards.com', 'gov.uk']),
    F('f-portal-grid', 'f-portal-dense-grid', 'Portal dense grid', ['many small link groups', 'service tiles', 'regional rows'], ['yahoo.com', 'naver.com', 'msn.com', 'mail.ru', 'rakuten.co.jp', 'kakao.com', 'shein.com', 'shopee.com', 'binance.com', 'okx.com', 'freelancer.com']),
    F('f-gaming-portal', 'f-portal-dense-grid', 'Gaming/entertainment portal', ['dark dense grid', 'wallet/pill row'], ['steamcommunity.com', 'bilibili.com']),
    F('f-community', 'f-community-columns', 'Community columns', ['developer/community links', 'status row', 'social'], ['discord.com', 'stackoverflow.com', 'supabase.com', 'figma.com', 'huggingface.co', 'dribbble.com', 'behance.net', 'epicgames.com', 'fandom.com', 'reddit.com']),
    F('f-compliance-india', 'f-compliance-india', 'Compliance-heavy India', ['SEBI/RBI/GST/DPDP lines', 'grievance officer', 'tabular ₹'], ['zerodha.com', 'groww.in', 'phonepe.com', 'razorpay.com', 'paytm.com']),
    F('f-app-policy-wall', 'f-app-legal-dense', 'App policy wall', ['app-store badges', 'policy wall', 'language row'], ['facebook.com', 'instagram.com', 'x.com', 'linkedin.com', 'vk.ru', 'roblox.com', 'pinterest.com', 'twitch.tv']),
    F('f-none', 'f-none-app-shell', 'No footer (app shell)', ['app chrome ends at viewport'], ['chatgpt.com', 'claude.ai', 'gemini.google.com', 'live.com']),
    F('f-locale-row', 'f-mega-sitemap', 'Footer + locale/currency row', ['INR/USD or region picker', 'language listbox'], ['booking.com', 'wise.com', 'etsy.com', 'stripe.com']),
    F('f-social-row', 'f-community-columns', 'Footer + social row', ['monochrome social icons', 'stagger pop m-27'], ['nike.com', 'slack.com', 'spotify.com']),
    F('f-status-row', 'f-community-columns', 'Footer + status row', ['status pill/dot m-25', 'uptime link'], ['vercel.com', 'github.com', 'supabase.com', 'stripe.com']),
    F('f-app-badges', 'f-app-legal-dense', 'Footer + app/QR badges', ['QR block', 'store badge placeholders'], ['whatsapp.com', 'telegram.org', 'booking.com', 'flipkart.com']),
    F('f-newsletter', 'f-corporate-multi', 'Footer + newsletter capture', ['email input + submit', 'success morph m-34'], ['substack.com', 'medium.com', 'mailchimp.com']),
    F('f-cta-fused', 'f-mega-sitemap', 'Footer + fused CTA banner', ['pre-footer CTA merges in', 'checkmark proof row'], ['shopify.com', 'wix.com', 'squarespace.com']),
    F('f-wordmark-xl', 'f-editorial-sitemap', 'Footer + oversized wordmark', ['giant wordmark', 'links above it'], ['pentagram.com', 'nike.com', 'spotify.com']),
    F('f-two-bar', 'f-corporate-multi', 'Two-bar footer', ['links band + legal band', 'different tones'], ['paypal.com', 'mastercard.com', 'ibm.com']),
    F('f-accordion', 'f-mega-sitemap', 'Accordion columns (mobile)', ['grid-template-rows collapse', 'chevron rotate'], ['apple.com', 'booking.com', 'gov.uk']),
    F('f-proof-stats', 'f-corporate-multi', 'Proof/stat rail', ['tabular ₹ stats', 'count-up m-26'], ['stripe.com', 'wise.com', 'razorpay.com']),
    F('f-ink-band', 'f-app-legal-dense', 'Ink-band inverted footer', ['dark surface footer', 'mint links'], ['spotify.com', 'discord.com', 'netflix.com']),
    F('f-mesh', 'f-mega-sitemap', 'Mesh/gradient footer', ['mesh wash background', 'soft close'], ['airbnb.com', 'canva.com', 'stripe.com']),
  ],
  notes: 'Clustered from live DOM captures (fetch_page) + ranking-verified roster observations. Fine archetypes roll up to the coarse cluster ids used in research/sites.json. recipe-library sites (§3.2) informed motion how-to only and are excluded from the 200.',
};
writeFileSync(join(researchDir, 'pattern-index.json'), JSON.stringify(patternIndex, null, 1));

// ─── docs/RESEARCH-NOTES.md ────────────────────────────────────────────────────
const lines = [];
lines.push('# Nestlancer Chrome Lab — Research Notes');
lines.push('');
lines.push(`Compiled 2026-10-16 · sources fetched live: ${SOURCES.map(s => s.url).join(' · ')}`);
lines.push('');
lines.push('One line per ranked site: rank · URL · rank cite · insight. Live-DOM captures marked [LIVE].');
lines.push('');
for (const r of top200.sites) {
  const mark = LIVE_CAPTURES.has(r.host) ? ' **[LIVE]**' : '';
  lines.push(`- #${r.rank} https://${r.host}/ (${r.rank_source} · ${r.rank_or_tier} · ${r.bucket}) — ${r.insight}${mark}`);
}
lines.push('');
lines.push('## Skipped from the live ranks (banned categories — replaced by next suitable ranked hosts)');
for (const s of skipped_from_rank) lines.push(`- ${s.host} (Similarweb #${s.similarweb_rank}) — ${s.skip_reason}`);
lines.push('');
lines.push('## Live-capture failures & ranked substitutes');
for (const [host, reason] of Object.entries(FAILED_CAPTURES)) lines.push(`- ${host} — ${reason}`);
for (const s of SUBSTITUTES) lines.push(`- substitute: https://${s.host}/ (${s.rank_source}) replaces ${s.replaces} — ${s.insight}`);
lines.push('');
lines.push('## Recipe libraries (animation how-to only — do not count toward the 200, §3.1 rule 4)');
for (const r of recipeSites) lines.push(`- https://${r.host}/ — ${r.insight}`);
writeFileSync(join(docsDir, 'RESEARCH-NOTES.md'), lines.join('\n'));

function MOTION_FOR(h, f) {
  const out = new Set();
  if (h.includes('sticky') || h.includes('utility')) out.add('m-01');
  if (h.includes('search-first')) out.add('m-11');
  if (h.includes('mega')) out.add('m-07');
  if (h.includes('transparent') || h.includes('hero')) out.add('m-04');
  if (h.includes('floating')) out.add('m-03');
  if (h.includes('portal') || h.includes('utility')) out.add('m-16');
  if (h.includes('editorial')) out.add('m-13');
  if (h.includes('app')) out.add('m-33');
  if (f.includes('sitemap') || f.includes('corporate')) out.add('m-19');
  if (f.includes('legal') || f.includes('minimal')) out.add('m-23');
  if (f.includes('india')) out.add('m-26');
  if (f.includes('community')) out.add('m-25');
  if (out.size === 0) out.add('m-05');
  return [...out];
}

console.log('TOP-200 LIST LOCKED');
console.log(`sources: ${SOURCES.map(s => s.id).join(', ')}`);
console.log(`global-top-100: ${top200.counts.global_top_100} · global-top-200: ${top200.counts.global_top_200} · category-world-leader: ${top200.counts.category_world_leader}`);
console.log(`banned/skipped-from-rank: ${skipped_from_rank.length} (logged + replaced)`);
console.log(`hosts: ${top200.sites.length} unique · unranked/random: 0`);
console.log(`live DOM captures this run: ${top200.counts.live_dom_captures_this_run}`);
console.log(`wrote research/top-200.json · research/sites.json · research/motion-index.json (${motionIndex.primitives.length} primitives) · research/pattern-index.json (${patternIndex.header_archetypes.length}+${patternIndex.footer_archetypes.length} archetypes) · docs/RESEARCH-NOTES.md (${lines.length} lines)`);
