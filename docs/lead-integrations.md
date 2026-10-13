# Lead integrations

Set the three server-only webhook variables from `.env.example` in the hosting
environment. The supplied URLs are configured locally in the ignored `.env.local`;
they are not committed or included in browser bundles. Restart the app after
changing environment variables.

| Submission | Privyr | Gallabox |
| --- | --- | --- |
| Commercial package enquiry | `PRIVYR_WEBHOOK_URL` | `GALLABOX_COMMERCIAL_WEBHOOK_URL` |
| Resort project enquiry | `PRIVYR_WEBHOOK_URL` | `GALLABOX_RESORT_WEBHOOK_URL` |
| Resort Schedule a Meet | `PRIVYR_WEBHOOK_URL` | `GALLABOX_RESORT_WEBHOOK_URL` |

Validated below-budget enquiries also reach both systems with
`status: "below_minimum"`. They still show the rejection page and do not send a
team email. Other project enquiries use `status: "eligible"`; meetings use
`status: "meeting_requested"`. Invalid submissions are not forwarded.

## Gallabox mapping

Each webhook receives a flat JSON object. Configure the recipient name as
`body.name`, recipient number as `body.phone`, and email as `body.email` in each
commercial/resort Generic Webhook integration. Gallabox's variable picker may
display these as `{{body.name}}`, `{{body.phone}}`, and `{{body.email}}`.

| Field | Value |
| --- | --- |
| `name` | Full name |
| `phone` | Digits including country code; Indian 10-digit numbers receive `91` |
| `email` | Email address |
| `source` | `Decofice Commercial Website` or `Decofice Resort Website` |
| `site` | `commercial` or `resort` |
| `form` | `package-enquiry`, `contact-us`, or `schedule-visit` |
| `status` | `eligible`, `below_minimum`, or `meeting_requested` |

Commercial submissions also include `builtUpArea`, `location`, `scope`,
`startTimeline`, `property`, `packageName`, `packagePrice`, and `budget`.

Resort project submissions also include `company`, `location`, `projectType`,
`serviceNeeded`, `landAcquired`, `plotArea`, `builtUpArea`, `budget`,
`startTimeline`, `hearAboutUs`, and `requirements`.

Meetings also include `visitType`, `date`, `time`, and `message`.

Use **Capture Webhook Response** in Gallabox, submit a controlled lead, map the
recipient fields, choose the appropriate WhatsApp template, and enable the
workflow. Add a condition on `status` if below-budget leads need a different
WhatsApp message. Webhook acceptance alone does not confirm that a WhatsApp
workflow is mapped or enabled.

The residential webhook is not used: this repository contains no residential
lead form or existing Gallabox integration. Its current configuration needs
to be reviewed in the residential site/Gallabox account separately.

## Privyr payload

The supplied Generic Webhook V2 URL receives JSON with `name`, `email`, `phone`
(international format with `+`), `source`, and `details` containing the project
fields plus `site`, `form`, and `status`. Whitespace and URL fragments such as
`#generic-webhook` are removed from configured webhook URLs before sending.

The endpoint's GET response does not confirm the accepted POST field schema.
Confirm the payload against the account's Generic Webhook V2 sample JSON and
check a controlled submission in Privyr, including its additional project details.

## Delivery and verification

Next.js `after()` schedules webhook delivery after the form response, independently
of email success. Privyr and Gallabox are attempted independently. HTTP 429 and
5xx responses get up to three attempts, each with an eight-second timeout.
Permanent 4xx responses are not retried. Network errors/timeouts are not retried
because the receiver may already have saved the lead.

Failures log the provider and status without contact details or webhook URLs.
There is no durable delivery queue: exhausted attempts, network errors, or process
termination require investigation and manual replay from another saved lead source.
Repeated form submissions are separate requests; receiver-side deduplication is
not assumed.

Local automated checks use mocked webhooks and email transports and never contact
the supplied live integrations:

```sh
node --experimental-strip-types --test tests/lead-webhooks.test.mjs
npx tsc --noEmit --incremental false
```

References: [Privyr webhook setup](https://help.privyr.com/knowledge-base/webhooks-integration/)
and [Gallabox webhook capture and workflow mapping](https://guides.gallabox.com/how-to-connect-your-contact-form-7-using-generic-webhook).
