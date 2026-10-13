// ─────────────────────────────────────────────
// 여기만 수정하면 사이트 내용이 바뀝니다.
// image: "assets/파일명.jpg" 를 넣으면 이미지가 표시되고,
//        비워두면 colors 그라디언트 플레이스홀더가 표시됩니다.
//
// ── 상세 페이지(detail) 블록 사용법 ──
// detail 이 없으면 기본 템플릿으로 자동 생성됩니다.
// 모든 블록은 같은 그리드(콘텐츠 9칸 + 오른쪽 인덱스 3칸)에 정렬됩니다.
//
//   { type: "section", title: "Gallery" }            섹션 제목 (오른쪽 인덱스에 자동 추가)
//   { type: "text", body: "설명 문장" }                본문 텍스트
//   { type: "panel", items: [...], ratio, caption }  회색 패널 1개 (가로 꽉 차게)
//   { type: "row", panels: [{items}, {items}] }      패널 2~4개를 한 줄에
//
//   items 안의 미디어:
//   { image: "assets/a.jpg", shape: "phone" }   폰 프레임 안에 이미지
//   { image: "assets/a.jpg" }                   패널 안에 비율 유지(contain)
//   { image: "assets/a.jpg", shape: "full" }    패널을 꽉 채움(cover)
//   { image: "...", shape: "square" | "card" }  정사각 / 4:5 카드
//   { video: "assets/a.mp4", shape: "phone" }   영상도 가능 (자동재생, 음소거)
//
//   panel 옵션: ratio "16 / 10"(기본), pad "7%"(안쪽 여백), gap "4%"(아이템 간격), bg "#fff"
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
      detail: {
        intro: "Designing AI-powered features across the Alpha OS — from system UI to the companion apps people use every day.",
        client: "Alpha Inc.",
        role: "Software Designer",
        year: "2025",
        team: "OS Design",
        blocks: [
          { type: "section", title: "Overview" },
          { type: "text", body: "Working closely with the OS team to create a calmer, more personal system experience." },
          { type: "panel", ratio: "16 / 9", items: [{ shape: "full", colors: ["#0f2a33", "#1f5a66"] }] },

          { type: "section", title: "Gallery" },
          { type: "panel", items: [{ shape: "phone", colors: ["#1b1b1b", "#555"] }, { shape: "phone", colors: ["#d9d2c5", "#6b665e"] }] },
          { type: "panel", items: [{ shape: "phone", colors: ["#2c3b3a", "#d8c9a5"] }, { shape: "phone", colors: ["#2c3b3a", "#f0e6d0"] }, { shape: "phone", colors: ["#2c3b3a", "#a9c7d6"] }] },

          { type: "section", title: "Wallpapers" },
          { type: "text", body: "A set of wallpapers created with an external studio for the new device." },
          { type: "row", panels: [
            { items: [{ shape: "phone", colors: ["#777", "#ddd"] }, { shape: "phone", colors: ["#777", "#ddd"] }, { shape: "phone", colors: ["#eee", "#ccc"] }] },
            { items: [{ shape: "phone", colors: ["#2b3340", "#8a96a8"] }, { shape: "phone", colors: ["#2b3340", "#8a96a8"] }, { shape: "phone", colors: ["#222", "#333"] }] },
          ] },
          { type: "row", panels: [
            { items: [{ shape: "phone", colors: ["#b8502a", "#efe3d3"] }, { shape: "phone", colors: ["#b8502a", "#efe3d3"] }, { shape: "phone", colors: ["#e46a1c", "#d45a12"] }] },
            { items: [{ shape: "phone", colors: ["#7f9a98", "#d6e2e0"] }, { shape: "phone", colors: ["#7f9a98", "#d6e2e0"] }, { shape: "phone", colors: ["#b9d3d2", "#9fbfbe"] }] },
          ] },

          { type: "section", title: "Components" },
          { type: "panel", ratio: "16 / 11", bg: "#d6d6d6", items: [{ colors: ["#efefef", "#cfcfcf"] }], caption: "Input states — collapsed, expanded, saved." },
        ],
      },
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
