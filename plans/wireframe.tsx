import { useState } from "react";

const C = {
  bg: "#F5F5F5",
  white: "#FFFFFF",
  black: "#111",
  gray1: "#333",
  gray2: "#666",
  gray3: "#999",
  gray4: "#CCC",
  gray5: "#E8E8E8",
  gray6: "#F0F0F0",
  accent: "#FF6B35",
  accentBg: "#FFF3ED",
  green: "#22C55E",
  blue: "#3B82F6",
  purple: "#A855F7",
  pink: "#EC4899",
};

const screens = [
  "홈",
  "피드 목록",
  "레시피 상세",
  "검색/필터",
  "소스 빌더",
  "빌더 결과",
  "마이 노트",
  "로그인 유도",
];

// Phone frame
function Phone({ children, title }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          width: 360,
          height: 720,
          background: C.bg,
          borderRadius: 32,
          border: `3px solid ${C.gray4}`,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        }}
      >
        {/* Status bar */}
        <div style={{ height: 44, background: C.white, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ width: 80, height: 4, background: C.gray5, borderRadius: 2 }} />
        </div>
        {/* Content */}
        <div style={{ flex: 1, overflow: "auto" }}>{children}</div>
      </div>
      <div style={{ marginTop: 12, fontSize: 13, fontWeight: 600, color: C.gray2 }}>{title}</div>
    </div>
  );
}

// Bottom Tab Bar
function TabBar({ active = 0 }) {
  const tabs = [
    { icon: "🏠", label: "홈" },
    { icon: "📖", label: "피드" },
    { icon: "🧪", label: "빌더" },
    { icon: "📓", label: "노트" },
    { icon: "👤", label: "MY" },
  ];
  return (
    <div
      style={{
        height: 56,
        background: C.white,
        borderTop: `1px solid ${C.gray5}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexShrink: 0,
        position: "sticky",
        bottom: 0,
      }}
    >
      {tabs.map((t, i) => (
        <div key={t.label} style={{ textAlign: "center", opacity: i === active ? 1 : 0.4 }}>
          <div style={{ fontSize: 18 }}>{i === 2 ? "" : t.icon}</div>
          {i === 2 ? (
            <div
              style={{
                width: 44,
                height: 44,
                background: C.accent,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                marginTop: -14,
                boxShadow: "0 4px 12px rgba(255,107,53,0.3)",
              }}
            >
              🧪
            </div>
          ) : null}
          <div style={{ fontSize: 10, marginTop: i === 2 ? 2 : 2, color: i === active ? C.accent : C.gray3, fontWeight: i === active ? 700 : 400 }}>
            {t.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// Placeholder box
function Placeholder({ h = 80, label, color = C.gray5, radius = 12, style = {} }) {
  return (
    <div
      style={{
        height: h,
        background: color,
        borderRadius: radius,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        color: C.gray3,
        ...style,
      }}
    >
      {label}
    </div>
  );
}

// ===== SCREENS =====

function HomeScreen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <div style={{ flex: 1, padding: "0 16px 16px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
          <div>
            <span style={{ fontSize: 22, fontWeight: 800, color: C.accent }}>Dip</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: C.black }}>Dip</span>
          </div>
          <div style={{ width: 36, height: 36, background: C.gray5, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🔔</div>
        </div>

        {/* Search bar */}
        <div style={{ background: C.white, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 8, border: `1px solid ${C.gray5}` }}>
          <span style={{ fontSize: 14 }}>🔍</span>
          <span style={{ fontSize: 13, color: C.gray4 }}>소스 조합, 레시피 검색...</span>
        </div>

        {/* Quick filters */}
        <div style={{ display: "flex", gap: 8, marginTop: 16, overflowX: "auto" }}>
          {["전체", "하이디라오", "두끼훠궈", "해저낙원", "마라탕"].map((t, i) => (
            <div
              key={t}
              style={{
                padding: "8px 16px",
                borderRadius: 20,
                background: i === 0 ? C.accent : C.white,
                color: i === 0 ? "#fff" : C.gray2,
                fontSize: 13,
                fontWeight: 600,
                whiteSpace: "nowrap",
                border: i === 0 ? "none" : `1px solid ${C.gray5}`,
              }}
            >
              {t}
            </div>
          ))}
        </div>

        {/* Popular section */}
        <div style={{ marginTop: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.black }}>🔥 이번 주 인기 소스</div>
            <div style={{ fontSize: 12, color: C.accent }}>더보기 →</div>
          </div>
          <div style={{ display: "flex", gap: 10, overflowX: "auto" }}>
            {[
              { name: "건희소스 변형", likes: "2.4k", tag: "하이디라오" },
              { name: "마장 크리미 소스", likes: "1.8k", tag: "두끼훠궈" },
              { name: "매콤새콤 초보용", likes: "1.2k", tag: "하이디라오" },
            ].map((r) => (
              <div key={r.name} style={{ minWidth: 150, background: C.white, borderRadius: 14, overflow: "hidden", border: `1px solid ${C.gray5}` }}>
                <div style={{ height: 90, background: `linear-gradient(135deg, ${C.accentBg}, ${C.gray6})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>🍲</div>
                <div style={{ padding: "10px 12px" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.black }}>{r.name}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    <span style={{ fontSize: 11, color: C.accent, background: C.accentBg, padding: "2px 8px", borderRadius: 4 }}>{r.tag}</span>
                    <span style={{ fontSize: 11, color: C.gray3 }}>❤️ {r.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Challenge banner */}
        <div style={{ marginTop: 20, background: `linear-gradient(135deg, ${C.accent}, #FF8A5C)`, borderRadius: 16, padding: "18px 20px", color: "#fff" }}>
          <div style={{ fontSize: 12, opacity: 0.8 }}>🏆 이달의 챌린지</div>
          <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>고수 없이 만드는 최강 소스</div>
          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>참여 342명 · 3일 남음</div>
        </div>

        {/* Recent */}
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.black, marginBottom: 12 }}>📖 최신 레시피</div>
          {[
            { name: "달콤 땅콩크림 소스", author: "소스마스터", likes: 89, store: "하이디라오" },
            { name: "식초간장 감칠맛 소스", author: "훠궈러버", likes: 67, store: "두끼훠궈" },
          ].map((r) => (
            <div key={r.name} style={{ background: C.white, borderRadius: 12, padding: "14px 16px", marginBottom: 8, display: "flex", gap: 12, alignItems: "center", border: `1px solid ${C.gray5}` }}>
              <div style={{ width: 56, height: 56, background: C.gray6, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>🥣</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.black }}>{r.name}</div>
                <div style={{ fontSize: 12, color: C.gray3, marginTop: 4 }}>
                  {r.author} · <span style={{ color: C.accent }}>{r.store}</span> · ❤️ {r.likes}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active={0} />
    </div>
  );
}

function FeedScreen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <div style={{ flex: 1, padding: "0 16px 16px" }}>
        <div style={{ padding: "12px 0", fontSize: 18, fontWeight: 700, color: C.black }}>📖 레시피 피드</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1, background: C.white, borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, border: `1px solid ${C.gray5}` }}>
            <span style={{ fontSize: 14 }}>🔍</span>
            <span style={{ fontSize: 13, color: C.gray4 }}>검색...</span>
          </div>
          <div style={{ background: C.white, borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", border: `1px solid ${C.gray5}`, fontSize: 14 }}>⚙️</div>
        </div>
        {/* Sort tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
          {["인기순", "최신순", "후기많은순"].map((t, i) => (
            <div key={t} style={{ padding: "6px 14px", borderRadius: 16, background: i === 0 ? C.black : C.white, color: i === 0 ? "#fff" : C.gray3, fontSize: 12, fontWeight: 600, border: i === 0 ? "none" : `1px solid ${C.gray5}` }}>{t}</div>
          ))}
        </div>
        {/* Recipe Cards */}
        {[
          { name: "건희소스 (오리지널)", author: "원어스 건희", likes: "2.4k", comments: 342, store: "하이디라오", tags: ["매콤", "고소", "입문추천"], desc: "마장소스 2T + 고추기름 1T + 다진마늘 1T + 굴소스 0.5T..." },
          { name: "마장 크리미 소스", author: "소스마스터", likes: "1.8k", comments: 186, store: "하이디라오", tags: ["순한맛", "어린이"], desc: "땅콩소스 3T + 연유 1T + 참깨소스 1T..." },
          { name: "매콤새콤 다이어트 소스", author: "헬시훠궈", likes: "1.2k", comments: 94, store: "두끼훠궈", tags: ["매콤", "상큼", "저칼로리"], desc: "흑식초 2T + 간장 1T + 고추기름 0.5T..." },
          { name: "고소한 들깨 한식 소스", author: "한식러버", likes: 890, comments: 63, store: "하이디라오", tags: ["고소", "한식풍"], desc: "참깨소스 2T + 들깨가루 1T + 다진마늘 1T..." },
        ].map((r) => (
          <div key={r.name} style={{ background: C.white, borderRadius: 16, padding: "16px", marginBottom: 10, border: `1px solid ${C.gray5}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.black }}>{r.name}</div>
                <div style={{ fontSize: 12, color: C.gray3, marginTop: 4 }}>{r.author} · <span style={{ color: C.accent }}>{r.store}</span></div>
              </div>
              <div style={{ fontSize: 20 }}>🍲</div>
            </div>
            <div style={{ fontSize: 12, color: C.gray2, marginTop: 8, lineHeight: 1.5 }}>{r.desc}</div>
            <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
              {r.tags.map((tag) => (
                <span key={tag} style={{ fontSize: 11, color: C.accent, background: C.accentBg, padding: "3px 10px", borderRadius: 12 }}>#{tag}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 12, paddingTop: 10, borderTop: `1px solid ${C.gray5}` }}>
              <span style={{ fontSize: 12, color: C.gray3 }}>❤️ {r.likes}</span>
              <span style={{ fontSize: 12, color: C.gray3 }}>💬 {r.comments}</span>
              <span style={{ fontSize: 12, color: C.gray3, marginLeft: "auto" }}>📤 공유</span>
            </div>
          </div>
        ))}
      </div>
      <TabBar active={1} />
    </div>
  );
}

function RecipeDetailScreen() {
  const profile = [
    { label: "매운맛", value: 70, color: "#EF4444" },
    { label: "고소함", value: 90, color: "#F59E0B" },
    { label: "상큼함", value: 30, color: "#22C55E" },
    { label: "감칠맛", value: 85, color: "#8B5CF6" },
    { label: "짠맛", value: 50, color: "#3B82F6" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <div style={{ flex: 1 }}>
        {/* Hero */}
        <div style={{ height: 180, background: `linear-gradient(135deg, ${C.accentBg}, #FFE4D6)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64, position: "relative" }}>
          🍲
          <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(255,255,255,0.9)", borderRadius: 8, padding: "6px 10px", fontSize: 13 }}>← 뒤로</div>
          <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 8 }}>
            <div style={{ background: "rgba(255,255,255,0.9)", borderRadius: 8, padding: "6px 10px", fontSize: 13 }}>🔖</div>
            <div style={{ background: "rgba(255,255,255,0.9)", borderRadius: 8, padding: "6px 10px", fontSize: 13 }}>📤</div>
          </div>
        </div>
        <div style={{ padding: "16px" }}>
          <span style={{ fontSize: 11, color: C.accent, background: C.accentBg, padding: "3px 10px", borderRadius: 10 }}>하이디라오</span>
          <div style={{ fontSize: 20, fontWeight: 800, color: C.black, marginTop: 8 }}>건희소스 (오리지널)</div>
          <div style={{ fontSize: 13, color: C.gray3, marginTop: 4 }}>원어스 건희 · ❤️ 2.4k · 💬 342</div>

          {/* Ingredients */}
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.black, marginBottom: 10 }}>📝 재료 & 비율</div>
            {[
              { name: "마장소스 (땅콩소스)", amount: "2T", icon: "🥜" },
              { name: "고추기름 (라유)", amount: "1T", icon: "🌶️" },
              { name: "다진 마늘", amount: "1T", icon: "🧄" },
              { name: "굴소스", amount: "0.5T", icon: "🦪" },
              { name: "설탕", amount: "약간", icon: "🍚" },
              { name: "다진 쪽파", amount: "취향껏", icon: "🧅" },
            ].map((ing) => (
              <div key={ing.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${C.gray6}` }}>
                <span style={{ fontSize: 20 }}>{ing.icon}</span>
                <span style={{ flex: 1, fontSize: 14, color: C.gray1 }}>{ing.name}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.accent }}>{ing.amount}</span>
              </div>
            ))}
          </div>

          {/* Taste Profile */}
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.black, marginBottom: 12 }}>🎯 맛 프로필</div>
            <div style={{ background: C.white, borderRadius: 14, padding: "16px", border: `1px solid ${C.gray5}` }}>
              {profile.map((p) => (
                <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 12, color: C.gray2, width: 48, textAlign: "right" }}>{p.label}</span>
                  <div style={{ flex: 1, height: 8, background: C.gray6, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${p.value}%`, height: "100%", background: p.color, borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 12, color: p.color, fontWeight: 700, width: 28 }}>{p.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Best with */}
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.black, marginBottom: 10 }}>🤝 이 소스와 잘 어울리는 재료</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["소고기 🥩", "양고기 🐑", "두부 🧈", "팽이버섯 🍄"].map((t) => (
                <span key={t} style={{ padding: "8px 14px", background: C.gray6, borderRadius: 10, fontSize: 13, color: C.gray1 }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Reviews preview */}
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.black }}>💬 후기 342개</div>
              <span style={{ fontSize: 12, color: C.accent }}>전체보기</span>
            </div>
            <div style={{ background: C.white, borderRadius: 12, padding: "14px", border: `1px solid ${C.gray5}` }}>
              <div style={{ fontSize: 13, color: C.gray2, lineHeight: 1.6 }}>"단짠단짠의 진수.. 매번 이 소스만 만들어요. 양고기랑 먹으면 미침 🤤"</div>
              <div style={{ fontSize: 12, color: C.gray3, marginTop: 6 }}>— 훠궈매니아 · ⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <div style={{ height: 80 }} />
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ position: "sticky", bottom: 0, background: C.white, padding: "12px 16px", borderTop: `1px solid ${C.gray5}`, display: "flex", gap: 10 }}>
        <div style={{ flex: 1, background: C.accent, color: "#fff", borderRadius: 12, padding: "14px", textAlign: "center", fontSize: 15, fontWeight: 700 }}>🔖 저장하기</div>
        <div style={{ background: C.gray6, borderRadius: 12, padding: "14px 18px", fontSize: 15 }}>📤</div>
      </div>
    </div>
  );
}

function SearchFilterScreen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <div style={{ flex: 1, padding: "0 16px 16px" }}>
        <div style={{ padding: "12px 0", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 14, color: C.gray3 }}>←</span>
          <div style={{ flex: 1, background: C.white, borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, border: `1px solid ${C.gray5}` }}>
            <span style={{ fontSize: 14 }}>🔍</span>
            <span style={{ fontSize: 13, color: C.black }}>매콤 고소한</span>
            <span style={{ marginLeft: "auto", fontSize: 12, color: C.gray4 }}>✕</span>
          </div>
        </div>

        {/* Filter chips */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.gray2, marginBottom: 8 }}>매장</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["전체", "하이디라오", "두끼훠궈", "해저낙원", "소림마라"].map((t, i) => (
              <div key={t} style={{ padding: "7px 14px", borderRadius: 16, background: i === 1 ? C.accent : C.white, color: i === 1 ? "#fff" : C.gray2, fontSize: 12, fontWeight: 600, border: i === 1 ? "none" : `1px solid ${C.gray5}` }}>{t}</div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.gray2, marginBottom: 8 }}>맛 프로필</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["매콤 🌶️", "고소 🥜", "상큼 🍋", "달콤 🍯", "감칠맛 🍖", "순한맛 🍼"].map((t, i) => (
              <div key={t} style={{ padding: "7px 14px", borderRadius: 16, background: [0, 1].includes(i) ? C.accent : C.white, color: [0, 1].includes(i) ? "#fff" : C.gray2, fontSize: 12, fontWeight: 600, border: [0, 1].includes(i) ? "none" : `1px solid ${C.gray5}` }}>{t}</div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.gray2, marginBottom: 8 }}>난이도</div>
          <div style={{ display: "flex", gap: 6 }}>
            {["입문", "중급", "고수"].map((t, i) => (
              <div key={t} style={{ padding: "7px 14px", borderRadius: 16, background: i === 0 ? C.accent : C.white, color: i === 0 ? "#fff" : C.gray2, fontSize: 12, fontWeight: 600, border: i === 0 ? "none" : `1px solid ${C.gray5}` }}>{t}</div>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: C.gray5, margin: "8px 0 16px" }} />
        <div style={{ fontSize: 13, color: C.gray3, marginBottom: 12 }}>검색 결과 <span style={{ color: C.accent, fontWeight: 700 }}>24</span>개</div>

        {[
          { name: "건희소스 (오리지널)", likes: "2.4k", store: "하이디라오", tags: ["매콤", "고소"] },
          { name: "마장 크리미 매콤 소스", likes: "1.1k", store: "하이디라오", tags: ["매콤", "고소", "크리미"] },
          { name: "고소 마늘 간장 소스", likes: 890, store: "두끼훠궈", tags: ["고소", "감칠맛"] },
        ].map((r) => (
          <div key={r.name} style={{ background: C.white, borderRadius: 12, padding: "14px 16px", marginBottom: 8, display: "flex", gap: 12, alignItems: "center", border: `1px solid ${C.gray5}` }}>
            <div style={{ width: 48, height: 48, background: C.gray6, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🥣</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.black }}>{r.name}</div>
              <div style={{ fontSize: 11, color: C.gray3, marginTop: 3 }}>{r.store} · ❤️ {r.likes}</div>
              <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                {r.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: 10, color: C.accent, background: C.accentBg, padding: "2px 8px", borderRadius: 8 }}>#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <TabBar active={1} />
    </div>
  );
}

function BuilderScreen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <div style={{ flex: 1, padding: "0 16px 16px" }}>
        <div style={{ padding: "12px 0", textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.black }}>🧪 소스 빌더</div>
          <div style={{ fontSize: 12, color: C.gray3, marginTop: 4 }}>나만의 소스 조합을 만들어보세요</div>
        </div>

        {/* Store select */}
        <div style={{ background: C.white, borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${C.gray5}`, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: C.gray3 }}>매장 선택</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.black, marginTop: 2 }}>🏪 하이디라오</div>
          </div>
          <span style={{ fontSize: 14, color: C.gray4 }}>변경 ›</span>
        </div>

        {/* Ingredient categories */}
        <div style={{ fontSize: 14, fontWeight: 700, color: C.black, marginBottom: 10 }}>재료 선택</div>
        <div style={{ display: "flex", gap: 6, marginBottom: 12, overflowX: "auto" }}>
          {["베이스", "오일", "양념", "토핑", "허브"].map((t, i) => (
            <div key={t} style={{ padding: "6px 14px", borderRadius: 14, background: i === 0 ? C.black : C.white, color: i === 0 ? "#fff" : C.gray3, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", border: i === 0 ? "none" : `1px solid ${C.gray5}` }}>{t}</div>
          ))}
        </div>

        {/* Ingredient grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
          {[
            { name: "마장소스", icon: "🥜", selected: true },
            { name: "참깨소스", icon: "🫘", selected: false },
            { name: "두반장", icon: "🫙", selected: true },
            { name: "간장", icon: "🍶", selected: false },
            { name: "굴소스", icon: "🦪", selected: true },
            { name: "연유", icon: "🥛", selected: false },
          ].map((ing) => (
            <div
              key={ing.name}
              style={{
                background: ing.selected ? C.accentBg : C.white,
                border: `2px solid ${ing.selected ? C.accent : C.gray5}`,
                borderRadius: 12,
                padding: "14px 8px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 24 }}>{ing.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: ing.selected ? C.accent : C.gray2, marginTop: 6 }}>{ing.name}</div>
              {ing.selected && <div style={{ fontSize: 10, color: C.accent, marginTop: 4 }}>✓ 선택됨</div>}
            </div>
          ))}
        </div>

        {/* Amount sliders */}
        <div style={{ fontSize: 14, fontWeight: 700, color: C.black, marginBottom: 10 }}>비율 조절</div>
        {[
          { name: "🥜 마장소스", value: 70 },
          { name: "🫙 두반장", value: 40 },
          { name: "🦪 굴소스", value: 25 },
        ].map((s) => (
          <div key={s.name} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: C.gray2 }}>{s.name}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.accent }}>{s.value}%</span>
            </div>
            <div style={{ height: 8, background: C.gray5, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: `${s.value}%`, height: "100%", background: C.accent, borderRadius: 4 }} />
            </div>
          </div>
        ))}

        {/* Live taste preview */}
        <div style={{ background: C.white, borderRadius: 14, padding: "16px", border: `1px solid ${C.gray5}`, marginTop: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.black, marginBottom: 12, textAlign: "center" }}>🎯 실시간 맛 프로필</div>
          {[
            { label: "매운맛", value: 45, color: "#EF4444" },
            { label: "고소함", value: 80, color: "#F59E0B" },
            { label: "감칠맛", value: 60, color: "#8B5CF6" },
          ].map((p) => (
            <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: C.gray2, width: 44, textAlign: "right" }}>{p.label}</span>
              <div style={{ flex: 1, height: 8, background: C.gray6, borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${p.value}%`, height: "100%", background: p.color, borderRadius: 4, transition: "width 0.3s" }} />
              </div>
              <span style={{ fontSize: 11, color: p.color, fontWeight: 700, width: 24 }}>{p.value}</span>
            </div>
          ))}
        </div>
        <div style={{ height: 20 }} />
      </div>

      {/* Bottom CTA */}
      <div style={{ position: "sticky", bottom: 0, background: C.white, padding: "12px 16px", borderTop: `1px solid ${C.gray5}` }}>
        <div style={{ background: C.accent, color: "#fff", borderRadius: 12, padding: "14px", textAlign: "center", fontSize: 15, fontWeight: 700 }}>조합 완성하기 →</div>
      </div>
    </div>
  );
}

function BuilderResultScreen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <div style={{ flex: 1, padding: "16px" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>✨</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: C.black }}>나만의 소스 완성!</div>
          <div style={{ fontSize: 13, color: C.gray3, marginTop: 4 }}>하이디라오 소스바에서 만들 수 있어요</div>
        </div>

        <div style={{ background: C.white, borderRadius: 16, padding: "20px", border: `1px solid ${C.gray5}`, marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.black, marginBottom: 14 }}>📝 레시피</div>
          {[
            { icon: "🥜", name: "마장소스", amount: "2T (큰 스푼)" },
            { icon: "🫙", name: "두반장", amount: "1T" },
            { icon: "🦪", name: "굴소스", amount: "0.5T" },
            { icon: "🧄", name: "다진 마늘", amount: "1T" },
          ].map((ing) => (
            <div key={ing.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${C.gray6}` }}>
              <span style={{ fontSize: 18 }}>{ing.icon}</span>
              <span style={{ flex: 1, fontSize: 14, color: C.gray1 }}>{ing.name}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.accent }}>{ing.amount}</span>
            </div>
          ))}
        </div>

        {/* Taste chart */}
        <div style={{ background: C.white, borderRadius: 16, padding: "20px", border: `1px solid ${C.gray5}`, marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.black, marginBottom: 12 }}>🎯 맛 프로필</div>
          {[
            { label: "매운맛", value: 45, color: "#EF4444" },
            { label: "고소함", value: 80, color: "#F59E0B" },
            { label: "상큼함", value: 15, color: "#22C55E" },
            { label: "감칠맛", value: 60, color: "#8B5CF6" },
            { label: "짠맛", value: 35, color: "#3B82F6" },
          ].map((p) => (
            <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: C.gray2, width: 44, textAlign: "right" }}>{p.label}</span>
              <div style={{ flex: 1, height: 8, background: C.gray6, borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${p.value}%`, height: "100%", background: p.color, borderRadius: 4 }} />
              </div>
              <span style={{ fontSize: 11, color: p.color, fontWeight: 700, width: 24 }}>{p.value}</span>
            </div>
          ))}
        </div>

        {/* Similar recipes */}
        <div style={{ background: C.white, borderRadius: 16, padding: "16px", border: `1px solid ${C.gray5}`, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.black, marginBottom: 10 }}>🔗 비슷한 인기 레시피</div>
          {["건희소스 (유사도 87%)", "마장 크리미 소스 (유사도 72%)"].map((r) => (
            <div key={r} style={{ padding: "10px 0", borderBottom: `1px solid ${C.gray6}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: C.gray2 }}>{r}</span>
              <span style={{ fontSize: 12, color: C.accent }}>보기 →</span>
            </div>
          ))}
        </div>

        {/* Name input */}
        <div style={{ background: C.white, borderRadius: 12, padding: "14px 16px", border: `1px solid ${C.gray5}`, marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: C.gray3, marginBottom: 6 }}>소스 이름 (선택)</div>
          <div style={{ fontSize: 15, color: C.gray4 }}>나만의 소스 이름을 지어주세요...</div>
        </div>
      </div>

      <div style={{ position: "sticky", bottom: 0, background: C.white, padding: "12px 16px", borderTop: `1px solid ${C.gray5}`, display: "flex", gap: 10 }}>
        <div style={{ flex: 1, background: C.accent, color: "#fff", borderRadius: 12, padding: "14px", textAlign: "center", fontSize: 15, fontWeight: 700 }}>🔖 내 노트에 저장</div>
        <div style={{ background: C.gray6, borderRadius: 12, padding: "14px 18px", fontSize: 15 }}>📤</div>
      </div>
    </div>
  );
}

function MyNoteScreen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <div style={{ flex: 1, padding: "0 16px 16px" }}>
        <div style={{ padding: "12px 0", fontSize: 18, fontWeight: 700, color: C.black }}>📓 마이 노트</div>

        {/* Tab */}
        <div style={{ display: "flex", gap: 0, marginBottom: 16, background: C.gray6, borderRadius: 10, padding: 3 }}>
          {["저장한 레시피", "내 조합", "방문 기록"].map((t, i) => (
            <div key={t} style={{ flex: 1, textAlign: "center", padding: "8px 0", borderRadius: 8, background: i === 0 ? C.white : "transparent", fontSize: 12, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? C.black : C.gray3 }}>{t}</div>
          ))}
        </div>

        {/* Saved recipes */}
        {[
          { name: "건희소스 (오리지널)", date: "2025.02.14", store: "하이디라오", rating: 5 },
          { name: "매콤새콤 다이어트 소스", date: "2025.02.10", store: "두끼훠궈", rating: 4 },
          { name: "달콤 땅콩크림 소스", date: "2025.01.28", store: "하이디라오", rating: 5 },
        ].map((r) => (
          <div key={r.name} style={{ background: C.white, borderRadius: 12, padding: "14px 16px", marginBottom: 8, border: `1px solid ${C.gray5}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.black }}>{r.name}</div>
                <div style={{ fontSize: 12, color: C.gray3, marginTop: 4 }}>{r.store} · {r.date}</div>
              </div>
              <div style={{ fontSize: 12, color: "#F59E0B" }}>{"⭐".repeat(r.rating)}</div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <span style={{ fontSize: 12, color: C.accent, padding: "4px 12px", background: C.accentBg, borderRadius: 8 }}>다시 만들기</span>
              <span style={{ fontSize: 12, color: C.gray3, padding: "4px 12px", background: C.gray6, borderRadius: 8 }}>메모 보기</span>
            </div>
          </div>
        ))}

        {/* Stats */}
        <div style={{ background: C.white, borderRadius: 16, padding: "16px", border: `1px solid ${C.gray5}`, marginTop: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.black, marginBottom: 12 }}>📊 나의 훠궈 통계</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, textAlign: "center" }}>
            {[
              { label: "저장 레시피", value: "12" },
              { label: "내 조합", value: "5" },
              { label: "방문 횟수", value: "8" },
            ].map((s) => (
              <div key={s.label} style={{ background: C.gray6, borderRadius: 10, padding: "12px 8px" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: C.accent }}>{s.value}</div>
                <div style={{ fontSize: 11, color: C.gray3, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <TabBar active={3} />
    </div>
  );
}

function LoginPromptScreen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>🔒</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: C.black }}>로그인하고 더 많은 기능을 즐기세요</div>
        <div style={{ fontSize: 14, color: C.gray3, marginTop: 12, lineHeight: 1.7 }}>
          소스 조합 저장, 나만의 레시피 관리,<br />방문 기록까지 한곳에서!
        </div>

        <div style={{ width: "100%", marginTop: 32, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: "#FEE500", color: "#3A1D1D", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            💬 카카오로 시작하기
          </div>
          <div style={{ background: "#03C75A", color: "#fff", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span style={{ fontWeight: 800 }}>N</span> 네이버로 시작하기
          </div>
          <div style={{ background: C.white, color: C.gray2, borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, border: `1px solid ${C.gray5}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            🔤 Google로 시작하기
          </div>
        </div>

        <div style={{ marginTop: 32, color: C.gray3, fontSize: 13 }}>
          비로그인으로도 레시피 탐색과 소스 빌더를<br />자유롭게 이용할 수 있어요!
        </div>
        <div style={{ marginTop: 16, color: C.accent, fontSize: 14, fontWeight: 600 }}>
          나중에 할게요 →
        </div>
      </div>
      <TabBar active={4} />
    </div>
  );
}

const screenComponents = [HomeScreen, FeedScreen, RecipeDetailScreen, SearchFilterScreen, BuilderScreen, BuilderResultScreen, MyNoteScreen, LoginPromptScreen];

export default function App() {
  const [activeScreen, setActiveScreen] = useState(0);
  const ActiveComponent = screenComponents[activeScreen];

  return (
    <div style={{ background: "#E8E8E8", minHeight: "100vh", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Screen selector */}
      <div style={{ padding: "16px 16px 12px", maxWidth: 420, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: C.accent }}>Dip</span>
          <span style={{ fontSize: 20, fontWeight: 800, color: C.black }}>Dip</span>
          <span style={{ fontSize: 13, color: C.gray3, marginLeft: 8 }}>와이어프레임</span>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
          {screens.map((s, i) => (
            <button
              key={s}
              onClick={() => setActiveScreen(i)}
              style={{
                padding: "6px 12px",
                borderRadius: 8,
                border: "none",
                fontSize: 12,
                fontWeight: activeScreen === i ? 700 : 500,
                background: activeScreen === i ? C.accent : C.white,
                color: activeScreen === i ? "#fff" : C.gray2,
                cursor: "pointer",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Phone */}
      <div style={{ display: "flex", justifyContent: "center", padding: "0 16px 32px" }}>
        <Phone title={screens[activeScreen]}>
          <ActiveComponent />
        </Phone>
      </div>
    </div>
  );
}