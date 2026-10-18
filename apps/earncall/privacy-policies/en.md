---
layout: default
title: EarnCall
app_icon: /assets/app-icons/icon_EarnCall.png
app_description: "Privacy Policy"
permalink: /earncall/privacy/
redirect_from:
  - /privacy-policies/earncall/
---

**Effective Date:** October 18, 2026

EarnCall is published by Bartlett Butter LLC ("we"). EarnCall helps you follow corporate earnings, financial snapshots, quarterly trends, earnings-call highlights, and an upcoming-earnings calendar. We built it privacy-first: we don't collect your data because we don't need it.

## The Short Version

| Question | Answer |
|----------|--------|
| Do you collect personal data? | No |
| Are there accounts or logins? | No |
| Is there tracking or analytics? | No |
| Are there ads? | No |
| Is my data sold or shared? | No |
| Is the app safe for children? | Yes |

EarnCall has no accounts and no sign-up. It does not collect, sell, or share any personal data, and it contains no analytics or advertising. The only network traffic is outbound requests for public market data.

## What We Collect

Nothing personal. EarnCall has no account system, no sign-up, and no analytics or advertising SDKs. We do not build a profile of you, and we have no servers that receive information about you.

## How Data Flows

EarnCall fetches **public market data** so the numbers in the app are real. These are outbound requests for public financial information, not uploads of anything about you:

- **Yahoo Finance** for company financials, daily prices, earnings dates, and EPS actuals versus consensus.
- **SEC EDGAR** for older earnings release dates from public filings.
- **Finnhub** for analyst sentiment and the earnings calendar.
- **The app's own transcript proxy** (a Cloudflare Worker that holds the data-provider key server-side) for earnings-call transcripts from Alpha Vantage.

These requests send tickers and dates, not personal information. No account, no user identifier, and nothing about you is included, and none of these services receives anything that identifies you.

## On-Device Summarization

Earnings-call takeaways, the highlights, guidance, growth drivers, and risks, are generated **on your device** using Apple's Foundation Models (Apple Intelligence) when your device supports it. On devices without it, the most relevant transcript sentences are selected on-device instead. Nothing about this summarization leaves your device.

## What's Stored Locally

To show you something right away on the next launch, EarnCall caches the last successfully fetched company data and earnings schedule as files on your device. This cache lives only on your device, is never sent anywhere, and is removed when you uninstall the app.

## Permissions

EarnCall requests **no system permissions at all**, no camera, location, contacts, microphone, or photos. The app makes ordinary outbound requests for public market data over the network, and iOS does not prompt for ordinary outbound connections.

| Permission | Requested? |
|------------|-----------|
| Camera | No |
| Location | No |
| Contacts | No |
| Microphone | No |
| Photo Library | No |
| App Tracking Transparency (ATT) | No |

## What We Don't Do

- No account or sign-up.
- No analytics, advertising, or tracking SDKs.
- No tracking across apps or websites.
- No sale or sharing of data with third parties.

## Not Investment Advice

EarnCall is for informational purposes only and is not investment advice. Data may be delayed or incomplete; always do your own research before making investment decisions.

## Your Rights

Since we hold no personal data on any server, there is nothing for us to provide, correct, port, or delete. You have full ownership and control of everything cached locally on your device.

## Children's Privacy

EarnCall is not directed to children under 13 and does not knowingly collect information from anyone, including children. The app is safe for children and complies with applicable child privacy regulations in your jurisdiction.

## International Users

EarnCall collects no personal data and sends no personal information anywhere. Its only network traffic is outbound requests for public market data, so no cross-border transfer of your personal data occurs. The app operates the same way regardless of your location.

## Changes to This Policy

If we update this policy, the revised version will be posted here with a new effective date.

## Contact

Questions about this policy? Email us at [contact@bartlettbutter.com](mailto:contact@bartlettbutter.com).
