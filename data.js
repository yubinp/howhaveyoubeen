// ─────────────────────────────────────────────
// 여기만 수정하면 사이트 내용이 바뀝니다.
// image: "assets/파일명.jpg" 를 넣으면 이미지가 표시되고,
//        비워두면 colors 그라디언트 플레이스홀더가 표시됩니다.
// ─────────────────────────────────────────────

window.PORTFOLIO = {
  // 상단 큰 피처 프로젝트 (텍스트 + 큰 이미지, 좌우 번갈아 배치)
  featured: [
    {
      title: "Project Alpha",
      desc: "Software designer across the Alpha OS and companion apps.",
      tags: ["AI", "OS", "App"],
      colors: ["#0f2a33", "#1f5a66"],
      image: "",
    },
    {
      title: "Project Beta",
      desc: "Brand and product design for an AI music creation tool.",
      tags: ["AI", "Web Design", "Brand"],
      colors: ["#f3b33d", "#efe4c8"],
      image: "",
    },
  ],

  // 하단 그리드 프로젝트
  projects: [
    { title: "Dreamstudio", tags: ["AI", "Web Design", "Brand"], colors: ["#f2efe8", "#c9d6c0"], image: "", desc: "Generative image studio — brand system and web product." },
    { title: "Samsung", tags: ["OS", "App"], colors: ["#e9e9e9", "#f0a23b"], image: "", desc: "Wallpaper and theme explorations for a mobile OS." },
    { title: "Minoori", tags: ["Web Design"], colors: ["#bdbdbd", "#2c6b55"], image: "", desc: "Editorial e-commerce for a fashion label rebrand." },
    { title: "Poolsuite", tags: ["Web Design", "Brand"], colors: ["#2f4a40", "#c9a74a"], image: "", desc: "Membership card and web experience for an internet leisure brand." },
    { title: "Mobile Pay", tags: ["Finance", "App"], colors: ["#f4c9a8", "#e8e2d6"], image: "", desc: "Payments app with a playful onboarding flow." },
    { title: "Nude", tags: ["Finance", "Web Design"], colors: ["#3a5aa8", "#f2c6c0"], image: "", desc: "Time-to-buy calculator for first-time home buyers." },
    { title: "Loader Monteith", tags: ["Web Design"], colors: ["#c06a4a", "#2f4f8a"], image: "", desc: "Architecture studio website and identity." },
    { title: "Leather Goods", tags: ["Fashion", "Brand"], colors: ["#111111", "#d9d9d9"], image: "", desc: "Art direction and product imagery." },
  ],

  // Research 섹션 (실험/글/사이드 프로젝트)
  research: [
    { title: "Dot-matrix type system", year: "2025", link: "#" },
    { title: "Generative wallpapers", year: "2024", link: "#" },
    { title: "Notes on interface motion", year: "2024", link: "#" },
  ],

  // Experience 섹션 카드에 순서대로 나오는 이미지 (비우면 그라디언트)
  experienceCards: [
    { colors: ["#f2e6d3", "#e9a06b"], image: "" },
    { colors: ["#1f5a66", "#0b1418"], image: "" },
    { colors: ["#c9d6c0", "#f2efe8"], image: "" },
    { colors: ["#3a5aa8", "#f2c6c0"], image: "" },
  ],
};
