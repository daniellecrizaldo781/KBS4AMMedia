/* =====================================================================
   4AM MEDIA KNOWLEDGE BASE — PAGE VIEWS
   Each function returns an HTML string for #app-content.
   ===================================================================== */

window.KBPages = (function () {
  "use strict";

  const D = window.KB;
  const C = window.KBComponents;
  const esc = C.esc;

  /* Sort cascades newest -> oldest by effective/update date. */
  function byNewest(a, b) {
    const da = new Date(a.date).getTime() || 0;
    const db = new Date(b.date).getTime() || 0;
    if (db !== da) return db - da;
    return (b._order || 0) - (a._order || 0); // stable secondary sort
  }

  /* =========================== DASHBOARD =========================== */
  function dashboard() {
    // Recent Cascades: newest first, top 6.
    const recent = D.cascades.slice().sort(byNewest).slice(0, 6);
    const recentHtml = recent.map(c => C.cascadeItem(c)).join("");

    const navCards = [
      C.navCard("⚠", "Cascade & Handling Updates", "Find the latest customer concern handling, cascades, and process updates.", "#/cascades"),
      C.navCard("◈", "Products", "Browse products, product information, troubleshooting, and related handling.", "#/products"),
      C.navCard("❏", "Resources", "Access internal tools, links, forms, trackers, and useful resources.", "#/resources"),
      C.navCard("▤", "Handbook & Policies", "Find team policies, procedures, expectations, and guidelines.", "#/handbook"),
      C.navCard("◉", "Our Team", "View the internal team directory and team information.", "#/team")
    ].join("");

    const latest = D.latestUpdates.map(u =>
      `<a class="card card--link cascade-item" href="${esc(u.href)}" style="padding:14px 18px;">
        <div class="cascade-item__top">
          <span class="cascade-item__title" style="font-size:15px;">${esc(u.title)}</span>
        </div>
        <div class="cascade-item__meta"><span>${esc(u.category)}</span><span>${esc(u.date)}</span></div>
      </a>`).join("");

    const freq = D.frequentlyUsed.map(f =>
      `<a class="chip" href="${esc(f.target)}" style="text-decoration:none;">${esc(f.title)}</a>`).join(" ");

    return `
      <section class="welcome">
        <div class="welcome__logo">
          <img src="assets/img/4am-logo-transparent.png" alt="4AM Media logo" />
        </div>
        <div class="welcome__body">
          <div class="welcome__eyebrow">Knowledge Base</div>
          <h1 class="welcome__title">Welcome to the 4AM Media Knowledge Base</h1>
          <p class="welcome__sub">Everything you need to quickly find the latest handling, product information, resources, and team policies.</p>
          <div class="welcome__cta">
            <div class="welcome__cta-label">What are you looking for today?</div>
            <div class="search">
              <span class="search__icon" aria-hidden="true">&#9906;</span>
              <input type="search" id="welcome-search" class="search__input"
                placeholder="Search cascades, products, policies, resources..."
                aria-label="Search the knowledge base" autocomplete="off" />
            </div>
          </div>
        </div>
      </section>

      <section class="section" style="margin-top:0;">
        <div class="section__head">
          <h2 class="section__title">Browse by Area</h2>
        </div>
        <div class="grid grid--nav">${navCards}</div>
      </section>

      <section class="section">
        <div class="section__head">
          <h2 class="section__title">Recent Cascades</h2>
          <a class="section__link" href="#/cascades">View all &rarr;</a>
        </div>
        <div class="grid" style="grid-template-columns:1fr; gap:14px;">${recentHtml}</div>
        ${C.notice("Recent Cascades shows the newest handling records first. Once the live Google Sheet source is connected, this list will update automatically from the approved data.")}
      </section>

      <section class="section">
        <div class="section__head">
          <h2 class="section__title">Latest Updates</h2>
        </div>
        <div class="grid" style="grid-template-columns:1fr; gap:12px;">${latest}</div>
      </section>

      <section class="section">
        <div class="section__head">
          <h2 class="section__title">Frequently Used</h2>
        </div>
        <div class="chips-wrap">${freq}</div>
      </section>
    `;
  }

  /* ====================== CASCADE & HANDLING ====================== */
  function cascades(params) {
    params = params || {};
    const q = params.q ? decodeURIComponent(params.q) : "";
    const cat = params.cat ? decodeURIComponent(params.cat) : "";
    const status = params.status || "all";

    // Base set filtered by search + category.
    let base = D.cascades.slice();
    if (q) {
      const t = q.toLowerCase();
      base = base.filter(c =>
        c.title.toLowerCase().includes(t) ||
        c.desc.toLowerCase().includes(t) ||
        c.category.toLowerCase().includes(t) ||
        (c.product || "").toLowerCase().includes(t) ||
        (c.tags || []).some(tag => tag.toLowerCase().includes(t))
      );
    }
    if (cat) base = base.filter(c => c.category === cat);

    // Status counts (within the current search+category scope).
    const counts = { _all: base.length };
    D.CASCADE_STATUSES.forEach(st => { counts[st.key] = base.filter(c => c.status === st.key).length; });

    // Apply status filter for the visible list.
    const list = status === "all" ? base : base.filter(c => c.status === status);
    list.sort(byNewest);

    const catChips = ['<button class="chip ' + (!cat ? 'is-active' : '') + '" data-cat="">All Categories</button>']
      .concat(D.cascadeCategories.filter(c => c !== "Latest Updates").map(c =>
        `<button class="chip ${cat === c ? 'is-active' : ''}" data-cat="${esc(c)}">${esc(c)}</button>`
      )).join("");

    const items = list.length
      ? list.map(C.cascadeItem).join("")
      : C.emptyState("🔍", "No cascades match", "Try a different search term, category, or status filter.");

    return `
      ${C.pageHead("Cascade & Handling Updates", "Quickly find the latest customer concern handling, cascades, and process updates.")}

      <div class="filterbar">
        <div class="search">
          <span class="search__icon" aria-hidden="true">&#9906;</span>
          <input type="search" id="cascade-search" class="search__input"
            placeholder="Search a customer concern, product, handling, or keyword..."
            value="${esc(q)}" aria-label="Search cascades" autocomplete="off" />
        </div>
      </div>

      <div class="section__head">
        <h2 class="section__title">Filter by Status</h2>
      </div>
      ${C.statusChips(status, counts)}
      ${C.statusLegend()}

      <div class="section__head" style="margin-top:24px;">
        <h2 class="section__title">Filter by Category</h2>
      </div>
      <div class="chips-wrap" id="category-chips">${catChips}</div>

      <div class="section__head" style="margin-top:24px;">
        <h2 class="section__title">Handling Updates</h2>
        <span class="section__link">${list.length} shown · newest first</span>
      </div>
      <div class="grid" style="grid-template-columns:1fr; gap:14px;" id="cascade-list">${items}</div>

      ${C.notice("Cascades are shown newest to oldest by default. The future source is the private 4AM Media Google Sheet — connected through a secure sync so nothing private is exposed in the browser. The four statuses (NEW / CURRENT, ACTIVE / EXISTING, SUPERSEDED, RETIRED) tell you which handling to follow.")}
    `;
  }

  /* ====================== CASCADE DETAIL ====================== */
  function cascadeDetail(id) {
    const c = D.cascades.find(x => x.id === id);
    if (!c) return notFound("Cascade not found", "We couldn't find that cascade.", "#/cascades");

    const related = D.cascades.filter(x => x.id !== c.id && x.category === c.category).sort(byNewest).slice(0, 4)
      .map(x => C.relatedItem(x.title, `${x.category} · ${x.date}`, `#/cascades/${esc(x.id)}`)).join("") ||
      `<p class="muted" style="font-size:13px;">No related cascades yet.</p>`;

    const relRes = (c.relatedResources || []).map(r =>
      C.relatedItem(r, "Resource", "#/resources")).join("");
    const relProd = (c.relatedProducts || []).map(slug => {
      const p = D.products.find(x => x.slug === slug);
      return p ? C.relatedItem(p.name, p.category, `#/products/${esc(p.slug)}`) : "";
    }).join("");

    return `
      <nav class="breadcrumbs" style="margin-bottom:18px;">
        <a href="#/dashboard">Home</a><span class="sep">/</span>
        <a href="#/cascades">Cascade &amp; Handling</a><span class="sep">/</span>
        <span class="current">${esc(c.title)}</span>
      </nav>

      ${C.pageHead(c.title, c.desc)}
      <div class="row" style="margin-top:-8px;">
        ${C.statusBadge(c.status)}
        <span class="pill pill--brand">${esc(c.category)}</span>
        ${c.product ? `<span class="pill pill--brand">${esc(c.product)}</span>` : ""}
        <span class="muted" style="font-size:13px;">Updated ${esc(c.date)}</span>
      </div>

      <section class="section">
        <h2 class="section__title">Handling History</h2>
        <p class="muted" style="font-size:13.5px;margin-top:-6px;">The newest handling is shown first and is always the one to follow. Older versions are kept for reference and must not be applied.</p>
        ${C.versionBlock(c.versions)}
      </section>

      ${(c.relatedResources && c.relatedResources.length) || (c.relatedProducts && c.relatedProducts.length) ? `
      <section class="section">
        <div class="detail-layout">
          <div></div>
          <div>
            ${relRes ? `<div class="card aside-block"><div class="aside-block__title">Related Resources</div>${relRes}</div>` : ""}
            ${relProd ? `<div class="card aside-block"><div class="aside-block__title">Related Products</div>${relProd}</div>` : ""}
          </div>
        </div>
      </section>` : ""}

      <section class="section">
        <div class="section__head">
          <h2 class="section__title">Related Cascades in ${esc(c.category)}</h2>
          <a class="section__link" href="#/cascades?cat=${encodeURIComponent(c.category)}">${D.cascades.filter(x => x.category === c.category).length} in this area &rarr;</a>
        </div>
        ${related}
      </section>
    `;
  }

  /* =========================== PRODUCTS =========================== */
  function products() {
    const cards = D.products.map(C.productCard).join("");
    return `
      ${C.pageHead("Products", "Browse products, product information, troubleshooting, and related handling.")}
      <div class="grid grid--product">${cards}</div>
      ${C.notice("Product images are placeholders. Drop real product image URLs into the data layer (assets/js/data.js → products[].image) and they appear automatically.")}
    `;
  }

  /* ====================== PRODUCT DETAIL ====================== */
  function productDetail(slug) {
    const p = D.products.find(x => x.slug === slug);
    if (!p) return notFound("Product not found", "We couldn't find that product.", "#/products");

    const hero = p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)}">` : C.productPlaceholder(p.group, p.name);

    const relCascades = D.cascades.filter(c =>
      (c.relatedProducts || []).includes(p.slug) || c.product === p.name
    ).sort(byNewest);
    const cascadeLinks = relCascades.length
      ? relCascades.map(c => C.relatedItem(c.title, `${c.category} · ${c.date}`, `#/cascades/${esc(c.id)}`)).join("")
      : `<p class="muted" style="font-size:13px;">No cascades linked to this product yet.</p>`;

    return `
      <nav class="breadcrumbs" style="margin-bottom:18px;">
        <a href="#/dashboard">Home</a><span class="sep">/</span>
        <a href="#/products">Products</a><span class="sep">/</span>
        <span class="current">${esc(p.name)}</span>
      </nav>

      <div class="detail-head">
        <div class="detail-hero">${hero}</div>
        <div class="detail-intro">
          <div class="detail-intro__cat">${esc(p.category)}</div>
          <h1 class="detail-intro__name">${esc(p.name)}</h1>
          <p class="detail-intro__desc">${esc(p.name)} — product overview, information, troubleshooting, and approved customer handling. (Placeholder content for Phase 1.)</p>
        </div>
      </div>

      <div class="detail-layout">
        <div>
          <div class="card panel">
            <div class="panel__title">Product Information</div>
            <div class="deflist">
              <div class="deflist__row"><div class="deflist__key">What is it?</div><div class="deflist__val">Placeholder description — to be replaced with the real product brief.</div></div>
              <div class="deflist__row"><div class="deflist__key">Key features</div><div class="deflist__val"><ul><li>Feature placeholder</li><li>Feature placeholder</li></ul></div></div>
              <div class="deflist__row"><div class="deflist__key">What's included</div><div class="deflist__val">To be added.</div></div>
              <div class="deflist__row"><div class="deflist__key">Variants</div><div class="deflist__val">To be added.</div></div>
              <div class="deflist__row"><div class="deflist__key">Pricing</div><div class="deflist__val">To be added.</div></div>
            </div>
          </div>

          <div class="card panel">
            <div class="panel__title">Troubleshooting</div>
            <div class="deflist">
              <div class="deflist__row"><div class="deflist__key">Common issues</div><div class="deflist__val">Placeholder — common customer-reported issues will be listed here.</div></div>
              <div class="deflist__row"><div class="deflist__key">Troubleshooting steps</div><div class="deflist__val">Placeholder — step-by-step guidance.</div></div>
              <div class="deflist__row"><div class="deflist__key">Escalation guidance</div><div class="deflist__val">Placeholder — when and how to escalate.</div></div>
            </div>
          </div>

          <div class="card panel">
            <div class="panel__title">Customer Handling</div>
            <div class="deflist">
              <div class="deflist__row"><div class="deflist__key">Common concerns</div><div class="deflist__val">Placeholder.</div></div>
              <div class="deflist__row"><div class="deflist__key">Approved handling</div><div class="deflist__val">Placeholder.</div></div>
              <div class="deflist__row"><div class="deflist__key">Return / refund</div><div class="deflist__val">Placeholder — see related cascades.</div></div>
              <div class="deflist__row"><div class="deflist__key">Warranty</div><div class="deflist__val">Placeholder.</div></div>
            </div>
          </div>
        </div>

        <div>
          <div class="card aside-block">
            <div class="aside-block__title">Related Cascades</div>
            ${cascadeLinks}
          </div>
          <div class="card aside-block">
            <div class="aside-block__title">Related Content</div>
            ${C.relatedItem("Return Policy", "Resource", "#/resources")}
            ${C.relatedItem("Refund Handling", "Cascade", "#/cascades?cat=Refunds%20%26%20Payments")}
          </div>
        </div>
      </div>

      ${C.notice("All sections above are placeholder templates. Real product documentation will populate these fields in the next phase.")}
    `;
  }

  /* =========================== RESOURCES =========================== */
  function resources() {
    const cats = D.resourceCategories.map(cat => {
      const items = cat.items.map(C.resourceCard).join("");
      return `<section class="section">
        <div class="section__head">
          <h2 class="section__title">${cat.icon} ${esc(cat.name)}</h2>
        </div>
        <div class="grid grid--res">${items}</div>
      </section>`;
    }).join("");

    return `
      ${C.pageHead("Resources", "Internal tools, links, forms, trackers, and useful resources.")}
      ${cats}
      ${C.notice("Resource links are placeholders. Add a URL in the data layer (assets/js/data.js → resourceCategories) and the “Open Resource” button becomes live.")}
    `;
  }

  /* =========================== HANDBOOK =========================== */
  function handbook() {
    const cards = D.handbookCategories.map(C.handbookCard).join("");
    return `
      ${C.pageHead("Handbook & Policies", "Team policies, procedures, expectations, and guidelines.")}
      <div class="grid grid--cat">${cards}</div>
      ${C.notice("Policy categories are placeholders. Each will later open structured policy pages, articles, or linked documents.")}
    `;
  }

  /* ============================= TEAM ============================= */
  function team() {
    const cards = D.team.map(C.teamCard).join("");
    return `
      ${C.pageHead("Our Team", "Internal team directory and team information.")}
      <div class="grid grid--team">${cards}</div>
      ${C.notice("Placeholder team members — no real personal data is shown. Real directory entries will display photos, roles, and approved contact info.")}
    `;
  }

  /* =========================== SEARCH =========================== */
  function search(params) {
    const q = (params && params.q ? decodeURIComponent(params.q) : "").trim();
    if (!q) {
      return `${C.pageHead("Search", "Search across cascades, products, policies, and resources.")}
        <div class="filterbar"><div class="search" style="flex:1 1 420px;">
          <span class="search__icon" aria-hidden="true">&#9906;</span>
          <input type="search" id="search-page-input" class="search__input" placeholder="Search cascades, products, policies, resources..." autocomplete="off" />
        </div></div>
        ${C.emptyState("🔎", "Start typing to search", "Try a product name, a handling concern, or a policy.")}`;
    }

    const t = q.toLowerCase();
    const matches = [];
    D.cascades.forEach(c => {
      if ([c.title, c.desc, c.category, c.product, (c.tags || []).join(" ")].join(" ").toLowerCase().includes(t))
        matches.push({ type: "Cascade", title: c.title, meta: `${c.category} · ${c.product || "—"} · Updated ${c.date}`, href: `#/cascades/${esc(c.id)}` });
    });
    D.products.forEach(p => {
      if ([p.name, p.category].join(" ").toLowerCase().includes(t))
        matches.push({ type: "Product", title: p.name, meta: `${p.category}`, href: `#/products/${esc(p.slug)}` });
    });
    D.resourceCategories.forEach(cat => cat.items.forEach(r => {
      if ([r.name, r.desc, cat.name].join(" ").toLowerCase().includes(t))
        matches.push({ type: "Resource", title: r.name, meta: `${cat.name}`, href: "#/resources" });
    }));
    D.handbookCategories.forEach(cat => {
      if (cat.name.toLowerCase().includes(t))
        matches.push({ type: "Handbook", title: cat.name, meta: "Policy category", href: "#/handbook" });
    });

    const results = matches.length
      ? matches.map(m => `<a class="card card--link cascade-item" href="${m.href}">
          <div class="cascade-item__top">
            <span class="cascade-item__title">${esc(m.title)}</span>
            <span class="badge badge--neutral">${esc(m.type)}</span>
          </div>
          <div class="cascade-item__meta"><span>${esc(m.meta)}</span></div>
        </a>`).join("")
      : C.emptyState("🔍", "No results", `No matches for “${esc(q)}”.`);

    return `
      ${C.pageHead("Search results", `For “${esc(q)}”`)}
      <div class="section__head"><span class="section__link">${matches.length} result${matches.length === 1 ? "" : "s"}</span></div>
      <div class="grid" style="grid-template-columns:1fr; gap:14px;">${results}</div>
      ${C.notice("Phase 1 search runs over the placeholder data set. It is wired to scale to the full knowledge base once real content is added.")}
    `;
  }

  /* =========================== NOT FOUND =========================== */
  function notFound(title, desc, back) {
    return `${C.pageHead(title, desc)}
      <div class="empty">
        <div class="empty__icon">🧭</div>
        <div class="empty__title">${esc(title)}</div>
        <p class="empty__desc">${esc(desc)}</p>
        <p style="margin-top:16px;"><a class="btn btn--brand" href="${esc(back || "#/dashboard")}">Back to safety</a></p>
      </div>`;
  }

  return { dashboard, cascades, cascadeDetail, products, productDetail, resources, handbook, team, search, notFound };
})();
