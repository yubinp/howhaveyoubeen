// 메인/상세 페이지 공통: 헬퍼, 테마, 등장 애니메이션, 푸터
window.UI = (() => {
  const $ = (s, el = document) => el.querySelector(s);

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const slugify = (s) => String(s).toLowerCase().trim().replace(/[^a-z0-9가-힣]+/g, "-").replace(/^-|-$/g, "");

  // 이미지가 있으면 이미지, 없으면 그라디언트
  const fill = (item) =>
    item.image
      ? `url("${encodeURI(item.image)}") center / cover`
      : `linear-gradient(135deg, ${(item.colors || ["#2a2a2a", "#3a3a3a"])[0]}, ${(item.colors || ["#2a2a2a", "#3a3a3a"])[1]})`;

  // featured + projects 를 한 목록으로 (상세 페이지 / 이전·다음 이동용)
  const allProjects = () => {
    const d = window.PORTFOLIO;
    return [...d.featured, ...d.projects].map((p) => ({ ...p, slug: p.slug || slugify(p.title) }));
  };
  const projectUrl = (p) => `project.html?p=${encodeURIComponent(p.slug || slugify(p.title))}`;

  const observeReveal = (root = document) => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.08 }
    );
    root.querySelectorAll(".reveal:not(.is-in)").forEach((el) => io.observe(el));
  };

  const initChrome = () => {
    const root = document.documentElement;
    $(".theme-toggle")?.addEventListener("click", () => {
      const next = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
    });

    const year = $(".year");
    if (year) year.textContent = new Date().getFullYear();
    const clock = $(".clock");
    if (clock) {
      const tick = () =>
        (clock.textContent =
          "Seoul " +
          new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Seoul", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      tick();
      setInterval(tick, 1000);
    }
  };

  return { $, esc, slugify, fill, allProjects, projectUrl, observeReveal, initChrome };
})();
