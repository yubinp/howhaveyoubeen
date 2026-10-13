(() => {
  const data = window.PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  // 이미지가 있으면 이미지, 없으면 그라디언트 플레이스홀더
  const fill = (item) =>
    item.image
      ? `url("${encodeURI(item.image)}") center / cover`
      : `linear-gradient(135deg, ${item.colors[0]}, ${item.colors[1]})`;

  const media = (item, extra = "") => `
    <div class="media ${extra}">
      <div class="media-inner ${item.image ? "" : "media-inner--placeholder"}"
           data-title="${esc(item.title || "")}" style="background:${fill(item)}"></div>
    </div>`;

  /* ───────── Featured ───────── */
  $(".featured").innerHTML = data.featured
    .map(
      (p, i) => `
      <article class="feature reveal" data-kind="featured" data-index="${i}" tabindex="0">
        ${media(p)}
        <div class="feature-text">
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.desc)}</p>
          <p class="tags">${p.tags.map(esc).join(" / ")}</p>
        </div>
      </article>`
    )
    .join("");

  /* ───────── Grid + filters ───────── */
  $(".grid").innerHTML = data.projects
    .map(
      (p, i) => `
      <article class="card reveal" data-kind="projects" data-index="${i}" data-tags="${esc(p.tags.join("|"))}" tabindex="0">
        ${media(p)}
        <div class="card-meta">
          <h3>${esc(p.title)}</h3>
          <p class="tags">${p.tags.map(esc).join(" / ")}</p>
        </div>
      </article>`
    )
    .join("");

  const counts = {};
  data.projects.forEach((p) => p.tags.forEach((t) => (counts[t] = (counts[t] || 0) + 1)));
  const filterNames = ["All", ...Object.keys(counts)];
  const filters = $(".filters");
  filters.innerHTML = filterNames
    .map(
      (t, i) =>
        `<button role="tab" aria-selected="${i === 0}" data-filter="${esc(t)}">${esc(t)}<sup>(${
          t === "All" ? data.projects.length : counts[t]
        })</sup></button>`
    )
    .join("");
  filters.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    filters.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", b === btn));
    const f = btn.dataset.filter;
    document.querySelectorAll(".card").forEach((card) => {
      const show = f === "All" || card.dataset.tags.split("|").includes(f);
      card.classList.toggle("is-hidden", !show);
    });
  });

  /* ───────── Research ───────── */
  $(".research-list").innerHTML = data.research
    .map((r) => `<li class="reveal"><a href="${esc(r.link)}"><span>${esc(r.title)}</span><span>${esc(r.year)}</span></a></li>`)
    .join("");

  /* ───────── Modal ───────── */
  const modal = $(".modal");
  const openProject = (el) => {
    const p = data[el.dataset.kind][+el.dataset.index];
    $(".modal-media").outerHTML = media(p, "modal-media");
    $(".modal-title").textContent = p.title;
    $(".modal-tags").textContent = p.tags.join(" / ");
    $(".modal-desc").textContent = p.desc || "";
    modal.showModal();
  };
  document.addEventListener("click", (e) => {
    const el = e.target.closest(".card, .feature");
    if (el) openProject(el);
  });
  document.addEventListener("keydown", (e) => {
    const el = e.target.closest?.(".card, .feature");
    if (el && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      openProject(el);
    }
  });
  $(".modal-close").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => e.target === modal && modal.close());

  /* ───────── Theme ───────── */
  const root = document.documentElement;
  $(".theme-toggle").addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* ───────── Reveal on scroll ───────── */
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ───────── Active nav ───────── */
  const navLinks = document.querySelectorAll(".nav a");
  const sections = ["work", "info", "research"].map((id) => document.getElementById(id));
  const setActive = () => {
    const y = innerHeight * 0.4;
    let current = null;
    sections.forEach((s) => s.getBoundingClientRect().top < y && (current = s.id));
    navLinks.forEach((a) => a.classList.toggle("is-active", a.dataset.section === current));
  };

  /* ───────── Scroll-driven effects ───────── */
  const showcase = $(".showcase");
  const bg = $(".showcase-bg");
  const device = $(".device");
  const exp = $(".experience");
  const card = $(".exp-card");
  const cards = data.experienceCards;
  let lastCard = -1;

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  const onScroll = () => {
    setActive();
    if (reduceMotion) return;

    // Showcase: 배경 패럴랙스 + 디바이스 살짝 떠오르기
    const r = showcase.getBoundingClientRect();
    const p = clamp(1 - (r.top + r.height) / (innerHeight + r.height));
    bg.style.transform = `translateY(${(p - 0.5) * 12}%)`;
    device.style.transform = `translateY(${(0.5 - p) * 120}px)`;

    // Experience: 카드가 커지면서 이미지가 바뀜
    const er = exp.getBoundingClientRect();
    const ep = clamp(-er.top / (er.height - innerHeight));
    card.style.setProperty("--s", (0.3 + clamp(ep * 2.2) * 0.7).toFixed(3));
    const idx = Math.min(cards.length - 1, Math.floor(ep * cards.length));
    if (idx !== lastCard) {
      card.style.background = fill(cards[idx]);
      lastCard = idx;
    }
  };

  let ticking = false;
  addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
  }, { passive: true });
  addEventListener("resize", onScroll);
  if (reduceMotion) card.style.setProperty("--s", 1);
  card.style.background = fill(cards[0]);
  onScroll();

  /* ───────── Footer ───────── */
  $(".year").textContent = new Date().getFullYear();
  const clock = $(".clock");
  const tick = () => {
    clock.textContent =
      "Seoul " +
      new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Seoul", hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };
  tick();
  setInterval(tick, 1000);
})();
