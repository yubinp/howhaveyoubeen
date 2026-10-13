// 프로젝트 상세 페이지: data.js 의 detail.blocks 를 정해진 그리드에 맞춰 렌더링
(() => {
  const { $, esc, fill, slugify, allProjects, projectUrl, observeReveal, initChrome } = window.UI;
  initChrome();

  const list = allProjects();
  const slug = new URLSearchParams(location.search).get("p");
  const i = list.findIndex((p) => p.slug === slug);
  const main = $("#project");

  if (i < 0) {
    main.innerHTML = `<p class="p-missing">Project not found. <a href="index.html#work">← Back to work</a></p>`;
    return;
  }

  const p = list[i];
  const next = list[(i + 1) % list.length];
  const d = p.detail || {};
  const blocks = d.blocks || defaultBlocks();
  document.title = `${p.title} — Your Name`;

  /* ───────── 블록 렌더러 ───────── */
  let slot = 0; // 플레이스홀더 번호 매기기용

  // 패널 안의 미디어 하나: { image | video, shape: "phone" | "auto" | "square" | "card" | "full", colors }
  const item = (m) => {
    const shape = m.shape || "auto";
    slot += 1;
    let inner;
    if (m.video) {
      inner = `<video src="${encodeURI(m.video)}" autoplay muted loop playsinline></video>`;
    } else if (m.image) {
      inner = `<img src="${encodeURI(m.image)}" alt="${esc(m.alt || "")}" loading="lazy" />`;
    } else {
      inner = `<div class="m-ph" style="background:${fill(m)}">${shape === "phone" ? "" : `IMG ${String(slot).padStart(2, "0")}`}</div>`;
    }
    return `<div class="m m--${shape}">${inner}</div>`;
  };

  // 회색 패널 하나: { ratio, items, caption, pad, align }
  const panel = (b) => {
    const style = [b.ratio && `--ratio:${b.ratio}`, b.pad && `--pad:${b.pad}`, b.gap && `--item-gap:${b.gap}`, b.bg && `background:${b.bg}`]
      .filter(Boolean)
      .join(";");
    const box = `<div class="panel ${b.align === "top" ? "panel--top" : ""}" style="${style}">${(b.items || []).map(item).join("")}</div>`;
    return b.caption
      ? `<figure class="figure reveal">${box}<figcaption>${esc(b.caption)}</figcaption></figure>`
      : `<div class="reveal">${box}</div>`;
  };

  // 같은 줄에 패널 여러 개 (2~4개)
  const defaultRatio = { 2: "3 / 2", 3: "4 / 5", 4: "3 / 4" };
  const row = (b) => {
    const n = b.panels.length;
    return `<div class="b-row" data-n="${n}" style="--n:${n}">${b.panels
      .map((x) => panel({ ratio: defaultRatio[n], ...x }))
      .join("")}</div>`;
  };

  const sections = [];
  const render = (b) => {
    switch (b.type) {
      case "section": {
        const id = slugify(b.title) || `s${sections.length + 1}`;
        sections.push({ id, title: b.title });
        return `<h2 class="b-section" id="${id}">${esc(b.title)}</h2>`;
      }
      case "text":
        return `<p class="b-text reveal">${esc(b.body)}</p>`;
      case "panel":
        return panel(b);
      case "row":
        return row(b);
      default:
        return "";
    }
  };
  const content = blocks.map(render).join("");

  /* ───────── 페이지 조립 ───────── */
  const meta = [
    ["Client", d.client],
    ["Role", d.role],
    ["Year", d.year],
    ["Team", d.team],
    ["Scope", p.tags.join(" / ")],
  ].filter(([, v]) => v);

  main.innerHTML = `
    <section class="layout p-head">
      <h1 class="p-title reveal">${esc(p.title)}<small>${esc(p.tags.join(" / "))}</small></h1>
      <p class="p-intro reveal">${esc(d.intro || p.desc || "")}</p>
      <dl class="p-meta reveal">
        ${meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}
      </dl>
    </section>

    <section class="layout p-body">
      <div class="p-content">${content}</div>
      <aside class="p-aside" aria-label="Sections">
        <p class="label">Index</p>
        <nav class="p-index">
          ${sections.map((s, n) => `<a href="#${s.id}" data-n="${String(n + 1).padStart(2, "0")}">${esc(s.title)}</a>`).join("")}
        </nav>
      </aside>
    </section>

    <section class="layout p-next">
      <a href="${projectUrl(next)}">
        <span>Next project</span>
        <strong>${esc(next.title)} →</strong>
      </a>
    </section>`;

  observeReveal();

  /* ───────── 인덱스 하이라이트 ───────── */
  const links = [...document.querySelectorAll(".p-index a")];
  const heads = sections.map((s) => document.getElementById(s.id));
  const onScroll = () => {
    let cur = 0;
    heads.forEach((h, n) => h.getBoundingClientRect().top < innerHeight * 0.45 && (cur = n));
    links.forEach((a, n) => a.classList.toggle("is-active", n === cur));
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ───────── 기본 템플릿 (detail.blocks 가 없을 때) ───────── */
  function defaultBlocks() {
    const c = p.colors;
    const phone = { shape: "phone", colors: c };
    return [
      { type: "section", title: "Overview" },
      { type: "text", body: p.desc || "Write a short summary of the problem, your role and the outcome." },
      { type: "panel", ratio: "16 / 9", items: [{ shape: "full", colors: c }] },
      { type: "section", title: "Gallery" },
      { type: "panel", items: [phone, phone] },
      { type: "panel", items: [phone, phone, phone] },
      { type: "row", panels: [{ items: [phone, phone, phone] }, { items: [phone, phone, phone] }] },
      { type: "section", title: "Details" },
      { type: "row", panels: [{ items: [{ shape: "card", colors: c }] }, { items: [{ shape: "card", colors: c }] }, { items: [{ shape: "card", colors: c }] }] },
      { type: "panel", ratio: "16 / 10", items: [{ colors: c }], caption: "Component specs and states." },
    ];
  }
})();
