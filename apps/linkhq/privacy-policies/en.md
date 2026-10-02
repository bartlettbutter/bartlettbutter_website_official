---
layout: default
title: LinkHQ
app_icon: /assets/app-icons/icon_LinkHQ.png
app_description: "Privacy Policy"
permalink: /linkhq/privacy/
redirect_from:
  - /privacy-policies/linkhq/
---

**Effective Date:** March 3, 2026

LinkHQ ("the App") is a free, local-only link archive for iPhone and iPad. Privacy is central to how we built it. This policy explains exactly what data is involved when you use LinkHQ and, more importantly, what isn't.

## The Short Version

| Question | Answer |
|----------|--------|
| Do you collect personal data? | No |
| Is my library sent to your servers? | No |
| Are there accounts or logins? | No |
| Is there tracking or analytics? | No |
| Are there ads? | No |
| Is my data sold or shared? | No |
| Is the app safe for children? | Yes |

The links you save, their titles, notes, tags, and keywords all stay on your device. We operate no servers that receive your data. The only time LinkHQ uses the network is to look up a link's own metadata, as described below.

## What Data Is Collected

**None.** LinkHQ has no user accounts, no analytics platform, no advertising SDK, and no tracking mechanism of any kind. We do not collect, store, or transmit personal information.

## How the App Uses Data Locally

### Your Saved Links

The links you save, with their titles, notes, tags, keywords, source, favorites, and opened state, are stored only on your device, in a shared app container so the main app and its Share Extension can read one source of truth. They are never uploaded.

### Capturing from the Share Sheet

When you share a link into LinkHQ, the Share Extension reads the shared URL, or a link found inside shared text, so it can be saved. This happens on your device. Nothing about the share is sent to any server we control.

### On-Device Keyword Extraction

When a link is saved, a few keywords describing its content are extracted on your device, for search and filtering. This runs locally using Apple's on-device natural-language frameworks. No text is sent anywhere for this.

## The One Network Use: Per-Link Metadata Lookup

To show a link's real title and preview image instead of a bare URL, LinkHQ performs a per-link metadata lookup when the link is saved, and sometimes once more in the app to fill in a link saved before the lookup finished.

- The request goes to **each link's own site**, or to **that platform's oEmbed endpoint** (for example YouTube, TikTok, or X), the same destinations your browser would reach for that link.
- Only the title, description, site keywords, and the preview image URL are read. Only the image URL is stored, never the image itself; preview images are loaded from the site when shown.
- These requests are not sent to any server operated by us, and they carry no account or identifier, because there is none.
- **Your library is never uploaded.** The lookup concerns a single link's public page, not your collection.

A lookup that cannot reach the site, such as when you are offline, simply leaves the title or thumbnail to be filled in on a later launch.

## Permissions

LinkHQ does not request any sensitive device permissions.

| Permission | Status |
|------------|--------|
| **Microphone** | Not requested |
| **Camera** | Not requested |
| **Contacts** | Not requested |
| **Photos** | Not requested |
| **Health data** | Not requested |
| **Location** | Not requested |

Saving links from the share sheet and reopening them at their source do not require any of these permissions.

## Third-Party Services

LinkHQ does not integrate any third-party analytics, advertising, or tracking services. Metadata lookups contact each link's own site or that platform's public oEmbed endpoint directly, and keyword extraction uses Apple's on-device frameworks that run as part of the operating system on your device.

## Data Sharing

We do not sell, rent, license, or share your data with anyone. LinkHQ generates no network traffic that transmits your library, notes, tags, or keywords.

## Data Retention & Deletion

We store no data on our servers, so there is nothing to retain or delete on our end. Everything on your device, your saved links and all their details, is removed the moment you delete the app. Settings also includes a Delete All action for clearing your library in place.

## Your Rights

Because we collect nothing, there is no personal data to access, correct, port, or erase on our end. You have complete control over everything stored locally by managing or removing the app.

## Children's Privacy

LinkHQ does not collect information from anyone, including children under 13 (or the applicable age in your jurisdiction). Because no personal data is gathered, the app is safe for users of all ages.

## International Users

Because LinkHQ collects no personal data, no cross-border transfer of personal information occurs. The per-link metadata lookups reach whichever site hosts the link you saved.

## Changes to This Policy

If we update this policy, the revised version will be posted here with a new effective date. Continued use of the app after an update constitutes acceptance of the revised policy.

## Contact

Questions about this privacy policy? Email us at [contact@bartlettbutter.com](mailto:contact@bartlettbutter.com).
