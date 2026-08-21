/* =====================================================================
   4AM MEDIA KNOWLEDGE BASE — DATA LAYER (Phase 1 placeholders)
   --------------------------------------------------------------------
   All UI is generated from this data. Replace the placeholder values
   with real content later (or swap this file for a fetch() of a JSON
   file) without touching any page/component code.

   CASCADE & HANDLING SOURCE
   The future authoritative source for cascades is a PRIVATE 4AM Media
   Google Sheet. That sheet must be consumed through a secure server-side
   integration (the .github/workflows/sync-cascades.yml workflow), which
   writes an approved, public data file (assets/js/cascades-data.js) to
   this repo. The real sheet URL, API keys, and credentials live ONLY in
   GitHub repo secrets — never in this file or the browser bundle.
   When the pipeline is ready it will populate window.KB_RAW_CASCADES
   (see bottom of this file); until then the demo cascades below are used.
   ===================================================================== */

window.KB = (function () {
  "use strict";

  /* ------------------- FOUR OFFICIAL CASCADE STATUSES ------------------- */
  // These four are the ONLY status labels shown to CSRs. Every record and
  // every status chip/badge/legend uses one of these.
  const CASCADE_STATUSES = [
    { key: "new",         label: "NEW / CURRENT",    emoji: "🟢", desc: "Latest cascade or recently updated handling." },
    { key: "active",      label: "ACTIVE / EXISTING", emoji: "🔵", desc: "Older cascade, but the handling is still currently implemented." },
    { key: "superseded",  label: "SUPERSEDED",        emoji: "🟡", desc: "An older cascade that has been replaced by a newer handling." },
    { key: "retired",     label: "RETIRED",           emoji: "🔴", desc: "Cascade/handling that is no longer implemented and should not be followed." }
  ];

  /* Domain icons (emoji) — fine for internal UI, not exposed secrets. */
  const I = {
    dash: "▦", cas: "⚠", prod: "◈", res: "❏", hand: "▤", team: "◉"
  };

  /* ----------------------------- PRODUCTS ----------------------------- */
  // group drives the placeholder art color. Set `image` to a URL later.
  const products = [
    { slug: "splash-foaming-cleaner", name: "Splash Foaming Cleaner", category: "Cleaning",      group: "cleaning", image: null },
    { slug: "splash-foam-spray",      name: "Splash Foam Spray",       category: "Cleaning",      group: "cleaning", image: null },
    { slug: "splash-spotless",        name: "Splash Spotless",         category: "Cleaning",      group: "cleaning", image: null },
    { slug: "splash-rinse",           name: "Splash Rinse",            category: "Cleaning",      group: "cleaning", image: null },
    { slug: "glabrous-skin",          name: "Glabrous Skin",           category: "Personal Care", group: "care",     image: null },
    { slug: "best-breath",            name: "Best Breath",             category: "Personal Care", group: "care",     image: null },
    { slug: "oricle-hearing-aids",    name: "Oricle Hearing Aids",     category: "Hearing",        group: "hearing",  image: null },
    { slug: "klean-ears",             name: "Klean Ears",              category: "Dental",         group: "dental",   image: null },
    { slug: "denta-blast",            name: "Denta Blast",             category: "Dental",         group: "dental",   image: null },
    { slug: "pee-buster",             name: "Pee Buster",              category: "Pet",            group: "pet",      image: null },
    { slug: "barks-no-more",          name: "Barks No More",           category: "Pet",            group: "pet",      image: null },
    { slug: "x-all",                  name: "X-All",                   category: "Other",          group: "other",    image: null }
  ];

  /* ---------------------- CASCADE CATEGORY LIST ---------------------- */
  // Placeholder categories (can be changed once real files are provided).
  const cascadeCategories = [
    "Latest Updates",        // behaves as the newest-first "All" view
    "Handling Updates",
    "Orders & Shipping",
    "Refunds & Payments",
    "Returns",
    "OHA / Hearing Aids",
    "Splash Products",
    "Dental Products",
    "Pet Products",
    "Sales & Offers",
    "Escalations",
    "General CSR Handling"
  ];

  /* ----------------------------- CASCADES ----------------------------- */
  // DEMO records for Phase 1 UI evaluation. Each record carries:
  //   id, title, category, product, productSlug, date (effective/update),
  //   status (new|active|superseded|retired), desc, tags[],
  //   relatedResources[], relatedProducts[], versions[]
  // `versions` demonstrates handling history: newest first, old ones kept.
  // NOTE: content below is representative placeholder text — not real policy.
  const DEMO_CASCADES = [
    {
      id: "refund-request-2026-08",
      title: "Refund Request",
      category: "Refunds & Payments",
      product: "", productSlug: "",
      date: "August 18, 2026",
      status: "new",
      desc: "Updated refund approval thresholds and the steps to process a standard refund through the current workflow.",
      tags: ["refund", "payments", "Updated"],
      relatedResources: ["Refund Policy"],
      relatedProducts: [],
      versions: [
        { status: "new", label: "NEW / CURRENT", date: "August 18, 2026", by: "CS Operations",
          title: "Refund Request — Current Handling",
          body: "Process standard refunds through the current workflow. Verify the order is within the return window, confirm the item condition, and issue the refund to the original payment method. Manager approval is required above the standard threshold. Communicate the timeline to the customer before closing the ticket." },
        { status: "superseded", label: "SUPERSEDED", date: "May 12, 2026", by: "CS Operations",
          title: "Refund Request — Previous Handling",
          body: "Previous handling required a manual approval form for every refund. This step was removed for standard refunds to reduce handling time. Keep this version only as reference; do not apply it." }
      ]
    },
    {
      id: "subscription-refund-2026-08",
      title: "Subscription Refund",
      category: "Refunds & Payments",
      product: "", productSlug: "",
      date: "August 16, 2026",
      status: "new",
      desc: "How to handle refund requests for active and cancelled subscription orders.",
      tags: ["refund", "subscription", "Updated"],
      relatedResources: ["Refund Policy"],
      relatedProducts: [],
      versions: [
        { status: "new", label: "NEW / CURRENT", date: "August 16, 2026", by: "CS Operations",
          title: "Subscription Refund — Current Handling",
          body: "For active subscriptions, pause billing before issuing any refund. For cancelled subscriptions, refund the most recent charge only when the cancellation falls within the grace period. Always note the subscription ID in the ticket." }
      ]
    },
    {
      id: "new-product-handling-x-all-2026-08",
      title: "New Product Handling — X-All",
      category: "General CSR Handling",
      product: "X-All", productSlug: "x-all",
      date: "August 15, 2026",
      status: "new",
      desc: "Initial handling guidance for the new X-All product while full documentation is prepared.",
      tags: ["new product", "X-All"],
      relatedResources: [],
      relatedProducts: ["x-all"],
      versions: [
        { status: "new", label: "NEW / CURRENT", date: "August 15, 2026", by: "Product Support",
          title: "New Product Handling — X-All",
          body: "X-All is now live. Treat general inquiries with the standard CSR flow. Escalate product-specific questions to Product Support until the dedicated cascade is published. Do not promise features that are not yet documented." }
      ]
    },
    {
      id: "address-hold-process-2026-08",
      title: "Address Hold Process",
      category: "Orders & Shipping",
      product: "", productSlug: "",
      date: "August 11, 2026",
      status: "new",
      desc: "When and how to place an address hold on an order pending customer confirmation.",
      tags: ["shipping", "address", "Updated"],
      relatedResources: ["ShipHero"],
      relatedProducts: [],
      versions: [
        { status: "new", label: "NEW / CURRENT", date: "August 11, 2026", by: "Fulfillment",
          title: "Address Hold Process — Current Handling",
          body: "Place an address hold whenever a customer reports a wrong or incomplete address before fulfillment. Release the hold only after the customer confirms the corrected address in writing. Notify fulfillment once cleared." }
      ]
    },
    {
      id: "oricle-battery-draining-2026-07",
      title: "Oricle Battery Draining Quickly",
      category: "OHA / Hearing Aids",
      product: "Oricle Hearing Aids", productSlug: "oricle-hearing-aids",
      date: "July 28, 2026",
      status: "active",
      desc: "Troubleshooting steps for customers reporting short battery life on Oricle devices.",
      tags: ["OHA", "battery", "troubleshooting"],
      relatedResources: ["Gorgias"],
      relatedProducts: ["oricle-hearing-aids"],
      versions: [
        { status: "active", label: "ACTIVE / EXISTING", date: "July 28, 2026", by: "Product Support",
          title: "Oricle Battery Draining — Handling",
          body: "Confirm the customer is using the recommended battery type and has removed the protective tab. Walk through a full charge cycle. If the issue persists after a replacement battery, escalate to Product Support with the device serial number." }
      ]
    },
    {
      id: "promo-code-handling-2026-07",
      title: "Promo Code Handling",
      category: "Sales & Offers",
      product: "", productSlug: "",
      date: "July 20, 2026",
      status: "active",
      desc: "Applying valid promo codes and handling expired or non-working codes.",
      tags: ["promo", "sales", "offers"],
      relatedResources: ["Shopify"],
      relatedProducts: [],
      versions: [
        { status: "active", label: "ACTIVE / EXISTING", date: "July 20, 2026", by: "CS Operations",
          title: "Promo Code Handling",
          body: "Apply valid promo codes at checkout when the customer meets the terms. For expired codes, explain the offer has ended and offer the currently active equivalent if one exists. Do not manually override expired discounts." }
      ]
    },
    {
      id: "return-label-generation-2026-04",
      title: "Return Label Generation",
      category: "Returns",
      product: "", productSlug: "",
      date: "April 9, 2026",
      status: "active",
      desc: "Generating and sending a return label for eligible returns.",
      tags: ["returns", "label"],
      relatedResources: ["Return Policy"],
      relatedProducts: [],
      versions: [
        { status: "active", label: "ACTIVE / EXISTING", date: "April 9, 2026", by: "CS Operations",
          title: "Return Label Generation",
          body: "Generate a return label through the returns tool for orders within the return window. Email the label to the customer and set the ticket to awaiting-return. Mark resolved only after the return is scanned by the carrier." }
      ]
    },
    {
      id: "marketplace-escalation-2026-05",
      title: "Marketplace Escalation",
      category: "Escalations",
      product: "", productSlug: "",
      date: "May 3, 2026",
      status: "active",
      desc: "Escalating marketplace (Amazon/Walmart) customer issues to the dedicated channel.",
      tags: ["escalation", "marketplace"],
      relatedResources: ["Gorgias"],
      relatedProducts: [],
      versions: [
        { status: "active", label: "ACTIVE / EXISTING", date: "May 3, 2026", by: "Escalations",
          title: "Marketplace Escalation",
          body: "Route marketplace complaints to the Escalations channel with the order ID and a summary. Do not issue refunds or replacements for marketplace orders directly; the marketplace team owns resolution per platform policy." }
      ]
    },
    {
      id: "splash-redo-process-2026-06",
      title: "Splash Redo Process",
      category: "Splash Products",
      product: "Splash", productSlug: "",
      date: "June 12, 2026",
      status: "active",
      desc: "Creating a 50% Green Return via Redo for Splash product returns.",
      tags: ["splash", "redo", "returns"],
      relatedResources: ["ShipHero"],
      relatedProducts: [],
      versions: [
        { status: "active", label: "ACTIVE / EXISTING", date: "June 12, 2026", by: "Fulfillment",
          title: "Splash Redo Process",
          body: "When manually creating a 50% Green Return via Redo, manually adjust the fee to 50% before processing. Double-check the final refund amount before completing the request." }
      ]
    },
    {
      id: "dental-product-sensitivity-2026-08",
      title: "Dental Product Sensitivity",
      category: "Dental Products",
      product: "", productSlug: "",
      date: "August 6, 2026",
      status: "new",
      desc: "Handling reports of sensitivity or discomfort with dental products (Klean Ears, Denta Blast).",
      tags: ["dental", "sensitivity"],
      relatedResources: [],
      relatedProducts: ["klean-ears", "denta-blast"],
      versions: [
        { status: "new", label: "NEW / CURRENT", date: "August 6, 2026", by: "Product Support",
          title: "Dental Product Sensitivity",
          body: "For sensitivity reports, confirm usage followed the guidance. Recommend a break and a gentler routine. If symptoms continue, advise discontinuing and open a product concern for follow-up." }
      ]
    },
    {
      id: "pet-product-replacement-2026-06",
      title: "Pet Product Replacement",
      category: "Pet Products",
      product: "", productSlug: "",
      date: "June 22, 2026",
      status: "active",
      desc: "Replacement handling for defective Pee Buster and Barks No More units.",
      tags: ["pet", "replacement"],
      relatedResources: [],
      relatedProducts: ["pee-buster", "barks-no-more"],
      versions: [
        { status: "active", label: "ACTIVE / EXISTING", date: "June 22, 2026", by: "CS Operations",
          title: "Pet Product Replacement",
          body: "For confirmed defects, offer a replacement after collecting the order ID and a brief description of the fault. Do not request the unit back for low-value items; close once the replacement is ordered." }
      ]
    },
    {
      id: "tagging-marketing-tickets-2026-06",
      title: "Tagging Marketing Tickets",
      category: "Handling Updates",
      product: "", productSlug: "",
      date: "June 1, 2026",
      status: "active",
      desc: "Adding the marketing_ticket tag and follower for marketing-related tickets.",
      tags: ["tagging", "marketing", "ticket"],
      relatedResources: ["Gorgias"],
      relatedProducts: [],
      versions: [
        { status: "active", label: "ACTIVE / EXISTING", date: "June 1, 2026", by: "CS Operations",
          title: "Tagging Marketing Tickets",
          body: "For every marketing ticket you handle, add Admin Support as a follower, type 'marketing' and apply the marketing_ticket tag, then submit as SOLVED. This tag is required for accurate tracking and reporting." }
      ]
    },
    {
      id: "internal-notes-shiphero-2026-06",
      title: "Internal Notes in ShipHero",
      category: "Handling Updates",
      product: "", productSlug: "",
      date: "June 6, 2026",
      status: "superseded",
      desc: "Where to log internal notes in ShipHero (superseded by the updated notes guidance).",
      tags: ["shiphero", "notes", "superseded"],
      relatedResources: ["ShipHero"],
      relatedProducts: [],
      versions: [
        { status: "superseded", label: "SUPERSEDED", date: "June 6, 2026", by: "Fulfillment",
          title: "Internal Notes in ShipHero — Superseded",
          body: "This handling has been replaced by a newer note-logging standard. Previously, notes were added under Order History. The updated guidance also requires lifting the hold after resolution. Follow the current handling, not this one." }
      ]
    },
    {
      id: "oha-return-process-2026-03",
      title: "OHA Return Process",
      category: "OHA / Hearing Aids",
      product: "Oricle Hearing Aids", productSlug: "oricle-hearing-aids",
      date: "March 18, 2026",
      status: "superseded",
      desc: "Older Oricle return handling (superseded by the updated OHA handling).",
      tags: ["OHA", "returns", "superseded"],
      relatedResources: ["Return Policy"],
      relatedProducts: ["oricle-hearing-aids"],
      versions: [
        { status: "superseded", label: "SUPERSEDED", date: "March 18, 2026", by: "Product Support",
          title: "OHA Return Process — Superseded",
          body: "This older return process has been replaced. It previously required a 30-day wait before any Oricle return could be opened. The current handling uses the standard return window. Do not apply this version." }
      ]
    },
    {
      id: "sticky-page-error-2026-06",
      title: "Sticky Page Error — Temporary Workaround",
      category: "General CSR Handling",
      product: "", productSlug: "",
      date: "June 13, 2026",
      status: "superseded",
      desc: "Temporary workaround for the Sticky page error (replaced by the permanent fix).",
      tags: ["sticky", "workaround", "superseded"],
      relatedResources: ["Sticky"],
      relatedProducts: [],
      versions: [
        { status: "superseded", label: "SUPERSEDED", date: "June 13, 2026", by: "CS Operations",
          title: "Sticky Page Error — Workaround (Superseded)",
          body: "This was a temporary workaround for the Sticky page error. A permanent fix has since shipped. The workaround is kept for reference only and should no longer be needed." }
      ]
    },
    {
      id: "shipping-delay-communication-2026-01",
      title: "Shipping Delay Communication",
      category: "Orders & Shipping",
      product: "", productSlug: "",
      date: "January 22, 2026",
      status: "retired",
      desc: "Old shipping-delay script that is no longer used (retired).",
      tags: ["shipping", "retired"],
      relatedResources: [],
      relatedProducts: [],
      versions: [
        { status: "retired", label: "RETIRED", date: "January 22, 2026", by: "CS Operations",
          title: "Shipping Delay Communication — Retired",
          body: "This handling is retired and must not be followed. It referenced a discontinued carrier notification template. Use the current Orders & Shipping handling for delay communication." }
      ]
    }
  ];

  /* ----------------------------- RESOURCES ----------------------------- */
  const resourceCategories = [
    {
      name: "Team Tools", icon: "🛠",
      items: [
        { name: "Dashboards",          desc: "Team performance and operations dashboards.", url: null },
        { name: "Performance Tracker",  desc: "Track individual and team KPIs.",            url: null },
        { name: "Call Dashboard",       desc: "Live call volume and outcome metrics.",      url: null },
        { name: "Schedule",             desc: "Shift schedule and coverage view.",          url: null },
        { name: "Leave Request",        desc: "Submit and track time-off requests.",         url: null },
        { name: "OT Resources",         desc: "Overtime guidelines and request forms.",     url: null }
      ]
    },
    {
      name: "Customer Service Tools", icon: "💬",
      items: [
        { name: "Aircall",  desc: "Softphone / call handling platform.", url: null },
        { name: "Sticky",   desc: "Order management system.",            url: null },
        { name: "Gorgias",  desc: "Helpdesk and ticketing.",             url: null },
        { name: "Shopify",  desc: "Storefront and order backend.",       url: null },
        { name: "ShipHero", desc: "Warehouse and fulfillment.",          url: null }
      ]
    },
    {
      name: "Forms & Documents", icon: "📄",
      items: [
        { name: "Forms",            desc: "Internal request and intake forms.",  url: null },
        { name: "Google Sheets",    desc: "Shared trackers and logs.",           url: null },
        { name: "Google Documents", desc: "Policy and process documents.",        url: null },
        { name: "Request Forms",    desc: "Approval and escalation requests.",   url: null }
      ]
    },
    {
      name: "External Resources", icon: "🔗",
      items: [
        { name: "Important Links",      desc: "Key external portals and references.", url: null },
        { name: "Training Resources",   desc: "Onboarding and training material.",     url: null },
        { name: "Reference Websites",   desc: "Vendor and product reference sites.",   url: null }
      ]
    }
  ];

  /* ----------------------------- HANDBOOK ----------------------------- */
  const handbookCategories = [
    { name: "Attendance",                  icon: "🕒", count: 3 },
    { name: "Scheduling",                  icon: "📅", count: 2 },
    { name: "Overtime",                    icon: "⏱",  count: 2 },
    { name: "Leave / LWOP",                icon: "🌴", count: 4 },
    { name: "Performance",                 icon: "📈", count: 3 },
    { name: "Productivity",                icon: "⚡", count: 2 },
    { name: "Quality Assurance",           icon: "✅", count: 5 },
    { name: "Call Handling",               icon: "📞", count: 4 },
    { name: "Customer Service Standards",  icon: "⭐", count: 6 },
    { name: "Escalation Procedures",       icon: "🚩", count: 3 },
    { name: "Team Expectations",           icon: "🤝", count: 3 }
  ];

  /* ------------------------------- TEAM ------------------------------- */
  // Placeholder teammates — no real personal data.
  const team = [
    { name: "Team Lead — CS",        initials: "TL", role: "Customer Service Lead",   team: "Customer Service", resp: "Owns escalation approvals and daily coverage." },
    { name: "CS Representative",      initials: "CS", role: "CSR",                     team: "Customer Service", resp: "Handles tickets, calls, and refunds." },
    { name: "CS Representative",      initials: "CS", role: "CSR",                     team: "Customer Service", resp: "Handles tickets, calls, and refunds." },
    { name: "Quality Specialist",     initials: "QA", role: "QA Analyst",              team: "Quality",           resp: "Reviews tickets and coaching." },
    { name: "Training Coordinator",  initials: "TR", role: "Training & Onboarding",    team: "Operations",        resp: "Runs onboarding and refresher training." },
    { name: "Operations Manager",     initials: "OM", role: "Operations Manager",      team: "Operations",        resp: "Owns process and tooling." },
    { name: "Product Specialist",     initials: "PS", role: "Product Support",         team: "Product",           resp: "Oricle and product-specific handling." },
    { name: "Escalations Lead",       initials: "EL", role: "Escalations Lead",        team: "Customer Service", resp: "Owns high-risk and marketplace escalations." }
  ];

  /* --------------------------- DASHBOARD QUICK --------------------------- */
  const latestUpdates = [
    { title: "Refund Handling Updated",      date: "Aug 18, 2026", category: "Refunds & Payments", href: "#/cascades/refund-request-2026-08" },
    { title: "New Product Handling — X-All", date: "Aug 15, 2026", category: "General CSR Handling", href: "#/cascades/new-product-handling-x-all-2026-08" },
    { title: "Address Hold Process Updated", date: "Aug 11, 2026", category: "Orders & Shipping",  href: "#/cascades/address-hold-process-2026-08" }
  ];

  const frequentlyUsed = [
    { title: "Return Policy",        target: "#/search?q=Return%20Policy" },
    { title: "OHA Troubleshooting",  target: "#/products/oricle-hearing-aids" },
    { title: "Refund Handling",      target: "#/cascades?cat=Refunds%20%26%20Payments" },
    { title: "Shipping Handling",    target: "#/cascades?cat=Orders%20%26%20Shipping" },
    { title: "Aircall",              target: "#/resources" },
    { title: "Sticky",               target: "#/resources" }
  ];

  /* -------------------- MERGE REAL CASCADES WHEN AVAILABLE ------------------- */
  // Future: a secure pipeline writes window.KB_RAW_CASCADES (approved, public
  // data derived from the private Google Sheet). If present, it takes priority;
  // otherwise the demo cascades above are used for this Phase 1 build.
  const cascades = (typeof window.KB_RAW_CASCADES !== "undefined" && window.KB_RAW_CASCADES.length)
    ? window.KB_RAW_CASCADES
    : DEMO_CASCADES;

  return {
    I, CASCADE_STATUSES, cascadeCategories,
    products, cascades, resourceCategories, handbookCategories, team,
    latestUpdates, frequentlyUsed
  };
})();
