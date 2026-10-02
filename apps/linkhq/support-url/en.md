---
layout: default
title: LinkHQ
app_icon: /assets/app-icons/icon_LinkHQ.png
app_description: "Support"
permalink: /linkhq/support/
redirect_from:
  - /support-url/linkhq/
---

# How can we help?

We want you to get the most out of LinkHQ. If something isn't working as expected or you have a question, you'll likely find the answer below. If not, reach out and we'll help.

## Getting Started

### How do I set up the app?

Just open LinkHQ. There's no account and no sign-up. A one-time welcome screen explains the idea with a short three-step guide, and once you enter your library you're ready to start saving links.

### How do I save a link?

Find something you want to keep in another app, tap Share, and choose LinkHQ in the share sheet, the same way you would send it to a friend. The editor opens right away with a provisional title. Adjust the title, source, note, tags, and keywords if you like, then tap Save. A link can also be added by hand from the app's Add Link screen.

### What happens to the title, thumbnail, and keywords?

When you save a link, LinkHQ fetches its real title and preview image over the network and extracts a few keywords on your device. The title replaces the provisional one unless you have already edited it, and the thumbnail appears once it is known. A link saved before this finishes gets its title, keywords, and thumbnail filled in later in the app.

### How do I find a link again?

Search across the title, URL, note, tags, and keywords, with matching keywords suggested as you type. You can also filter the library by source, keyword, favorites, or unopened links, and mark the ones you care about as favorites.

### How do I reopen a link at its source?

Open a link and tap Open Original. LinkHQ hands the saved URL to iOS, which reopens the originating app when it is installed and claims that URL, for example a YouTube link opening in the YouTube app. Open Original also marks the link as opened.

## Frequently Asked Questions

### Is LinkHQ free?

Yes. LinkHQ is free to download and use, with no ads and no account.

### Does LinkHQ collect my data?

No. There are no user accounts, no analytics, no tracking, and no advertising. Your library is stored only on your device and is never uploaded. The only network use is a per-link metadata lookup that fetches a title, thumbnail, and keywords. See our full [Privacy Policy](https://www.bartlettbutter.com/linkhq/privacy/) for details.

### Which sources does LinkHQ recognize?

Links are classified automatically by their host into YouTube, RedNote, Bilibili, TikTok, Instagram, X, or Web. The source sets the icon shown in the library and informs how the title is looked up. You can change the source by hand in the editor.

### What are unopened links?

A link you have never reopened through LinkHQ carries a small dot, and the Unopened filter gathers them in one place. Open Original marks a link opened, and you can also mark a link opened or unopened by hand.

### What does a duplicate warning mean?

If you share or add a link that is already saved, LinkHQ shows when and under what title it was saved first. Saving it again is still allowed, the warning is just there so you can decide.

### Why does a link show the source icon instead of a thumbnail?

Some platforms sign image URLs that expire, and some block anonymous lookups, so a thumbnail is not always available. When there is no preview image, the source icon stands in for it. Some sites also require sign-in to view content, so their title comes only from the text shared with the link.

### Does LinkHQ work on iPad?

Yes. On iPad at regular width the library becomes a split view, with the list in a sidebar and the selected link's details beside it, and the layout reflows as you resize the window. Every iPhone keeps the single-column layout.

### Does LinkHQ support Dynamic Type?

Yes. All text follows the system text-size setting, up to the largest accessibility sizes. At the default size the layout is unchanged.

## Permissions

### Does LinkHQ need any special permissions?

No. LinkHQ does not request the microphone, camera, contacts, photos, health data, or location. Saving links from the share sheet and reopening them at their source do not need those permissions.

### Why does LinkHQ use the network?

Only to look up a saved link's metadata. When a link is saved, its URL is sent to its own site, or that platform's oEmbed endpoint, to fetch a title and thumbnail. Keyword extraction then runs on your device. Your library itself is never uploaded.

## Troubleshooting

### A link didn't get a real title

Some sites require sign-in to view their content, so their title comes only from the text shared with the link, and a link pasted in by hand keeps its host as the title until you edit it. Each link is looked up at most once per launch, and a lookup that couldn't reach the site is retried on the next launch, so opening the app again often fills in a missing title.

### A saved link doesn't appear right away

The app and the Share Extension run as separate processes over the same library. A link saved while the app is already running in the background may not appear until you relaunch the app.

### Open Original opened the browser instead of the app

Open Original hands the saved URL to iOS. It reopens the originating app only when that app is installed and claims the URL. Otherwise the link opens in your browser.

### A thumbnail isn't showing

Thumbnails load from the site when they aren't already cached. Some platforms expire their image URLs or block anonymous lookups, so those links show the source icon instead. This does not affect saving or reopening the link.

### A duplicate wasn't caught across a short link

A match across short links is recognized only once the short link has been resolved, which happens in the share sheet or through the app's background backfill. Opening the app again gives it a chance to resolve.

### The app is crashing

Make sure you're running the latest version from the App Store and restart your device. If crashes persist, please email us with your device model and iOS version so we can investigate.

## Contact Us

Can't find your answer? We're happy to help.

**Email:** [contact@bartlettbutter.com](mailto:contact@bartlettbutter.com)

Please include a brief description of your issue and your device model / iOS version. We typically respond within 48 hours.
