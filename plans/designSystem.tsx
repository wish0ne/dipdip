import { useState } from "react";

// ============ DESIGN TOKENS ============
const token = {
  color: {
    primary: { 50: "#FFF3ED", 100: "#FFE0CC", 200: "#FFC19A", 300: "#FF9D66", 400: "#FF8A5C", 500: "#FF6B35", 600: "#E55A2B", 700: "#BF4420", 800: "#993617", 900: "#73280F" },
    neutral: { 0: "#FFFFFF", 50: "#FAFAFA", 100: "#F5F5F5", 150: "#EFEFEF", 200: "#E8E8E8", 300: "#D4D4D4", 400: "#A3A3A3", 500: "#737373", 600: "#525252", 700: "#404040", 800: "#262626", 900: "#171717" },
    semantic: {
      spicy: "#EF4444", nutty: "#F59E0B", fresh: "#22C55E", umami: "#8B5CF6", salty: "#3B82F6",
      success: "#22C55E", warning: "#F59E0B", error: "#EF4444", info: "#3B82F6",
    },
    social: { kakao: "#FEE500", kakaoText: "#3A1D1D", naver: "#03C75A", google: "#FFFFFF" },
  },
  radius: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, full: 9999 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 12px rgba(0,0,0,0.08)",
    lg: "0 8px 24px rgba(0,0,0,0.12)",
    accent: "0 4px 14px rgba(255,107,53,0.25)",
  },
  typo: {
    h1: { size: 24, weight: 800, height: 1.3 },
    h2: { size: 20, weight: 700, height: 1.35 },
    h3: { size: 17, weight: 700, height: 1.4 },
    h4: { size: 15, weight: 600, height: 1.4 },
    body1: { size: 15, weight: 400, height: 1.6 },
    body2: { size: 14, weight: 400, height: 1.5 },
    caption1: { size: 13, weight: 500, height: 1.4 },
    caption2: { size: 12, weight: 400, height: 1.4 },
    label: { size: 11, weight: 600, height: 1.3 },
  },
};

const C = token.color;
const tabs = ["컬러", "타이포", "컴포넌트", "아이콘/맛"];

// ============ HELPER ============
function Section({ title, desc, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: C.neutral[900], marginBottom: 2 }}>{title}</div>
      {desc && <div style={{ fontSize: 12, color: C.neutral[500], marginBottom: 12, lineHeight: 1.5 }}>{desc}</div>}
      {!desc && <div style={{ height: 10 }} />}
      {children}
    </div>
  );
}

function Swatch({ color, name, textColor = "#fff", border }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
      <div style={{ width: 40, height: 28, borderRadius: 6, background: color, border: border || "none", flexShrink: 0 }} />
      <div style={{ fontSize: 12, color: C.neutral[700], fontWeight: 500, flex: 1 }}>{name}</div>
      <div style={{ fontSize: 11, color: C.neutral[400], fontFamily: "monospace" }}>{color}</div>
    </div>
  );
}

// ============ TABS ============

function ColorTab() {
  return (
    <div>
      <Section title="Primary — Orange" desc="브랜드 컬러. CTA, 강조, 선택 상태에 사용">
        {Object.entries(C.primary).map(([k, v]) => (
          <Swatch key={k} color={v} name={`primary/${k}`} />
        ))}
      </Section>

      <Section title="Neutral — Gray" desc="텍스트, 배경, 보더 등 범용">
        {Object.entries(C.neutral).map(([k, v]) => (
          <Swatch key={k} color={v} name={`neutral/${k}`} border={k === "0" ? `1px solid ${C.neutral[200]}` : undefined} />
        ))}
      </Section>

      <Section title="Semantic — 맛 프로필" desc="소스의 맛을 시각적으로 표현하는 전용 컬러">
        {[
          ["spicy", "매운맛 🌶️"],
          ["nutty", "고소함 🥜"],
          ["fresh", "상큼함 🍋"],
          ["umami", "감칠맛 🍖"],
          ["salty", "짠맛 🧂"],
        ].map(([k, label]) => (
          <Swatch key={k} color={C.semantic[k]} name={label} />
        ))}
      </Section>

      <Section title="Semantic — 상태" desc="성공, 경고, 에러, 정보">
        {[
          ["success", "성공"],
          ["warning", "경고"],
          ["error", "에러"],
          ["info", "정보"],
        ].map(([k, label]) => (
          <Swatch key={k} color={C.semantic[k]} name={label} />
        ))}
      </Section>

      <Section title="Social Login" desc="소셜 로그인 버튼 전용">
        <Swatch color={C.social.kakao} name="카카오" border={`1px solid ${C.neutral[200]}`} />
        <Swatch color={C.social.naver} name="네이버" />
        <Swatch color={C.social.google} name="구글" border={`1px solid ${C.neutral[200]}`} />
      </Section>

      <Section title="사용 가이드">
        <div style={{ background: C.neutral[50], borderRadius: 12, padding: 16, fontSize: 13, color: C.neutral[600], lineHeight: 1.8 }}>
          <div><b>배경:</b> neutral/100 (기본), neutral/0 (카드)</div>
          <div><b>텍스트:</b> neutral/900 (제목), neutral/600 (본문), neutral/400 (보조)</div>
          <div><b>CTA 버튼:</b> primary/500 배경 + white 텍스트</div>
          <div><b>보더:</b> neutral/200 (기본), primary/500 (선택됨)</div>
          <div><b>태그/뱃지:</b> primary/50 배경 + primary/500 텍스트</div>
          <div><b>맛 프로필 차트:</b> semantic 컬러 전용</div>
        </div>
      </Section>
    </div>
  );
}

function TypoTab() {
  return (
    <div>
      <Section title="타이포그래피 스케일" desc="Apple SF Pro / Pretendard 폰트 기준. 모바일 퍼스트 사이즈.">
        {Object.entries(token.typo).map(([k, v]) => (
          <div key={k} style={{ marginBottom: 16, padding: "14px 16px", background: C.neutral[0], borderRadius: 10, border: `1px solid ${C.neutral[200]}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.primary[500], fontFamily: "monospace" }}>{k}</span>
              <span style={{ fontSize: 11, color: C.neutral[400], fontFamily: "monospace" }}>
                {v.size}px / {v.weight} / {v.height}
              </span>
            </div>
            <div style={{ fontSize: v.size, fontWeight: v.weight, lineHeight: v.height, color: C.neutral[900] }}>
              {k === "h1" && "나만의 소스를 만들어보세요"}
              {k === "h2" && "이번 주 인기 소스 TOP 10"}
              {k === "h3" && "건희소스 (오리지널)"}
              {k === "h4" && "재료 & 비율"}
              {k === "body1" && "마장소스 2T + 고추기름 1T + 다진마늘 1T를 잘 섞어주세요."}
              {k === "body2" && "단짠단짠의 진수.. 매번 이 소스만 만들어요."}
              {k === "caption1" && "하이디라오 · 소스마스터 · ❤️ 2.4k"}
              {k === "caption2" && "2025.02.14 · 조회 1,234"}
              {k === "label" && "#매콤 #고소 #입문추천"}
            </div>
          </div>
        ))}
      </Section>

      <Section title="간격 시스템 (Spacing)" desc="일관된 여백을 위한 스페이싱 토큰">
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {Object.entries(token.spacing).map(([k, v]) => (
            <div key={k} style={{ textAlign: "center" }}>
              <div style={{ width: v, height: 32, background: C.primary[100], borderRadius: 4, margin: "0 auto", border: `1px solid ${C.primary[200]}` }} />
              <div style={{ fontSize: 10, color: C.neutral[500], marginTop: 4, fontFamily: "monospace" }}>{k}<br />{v}px</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="라운드 시스템 (Radius)" desc="컴포넌트 크기에 따른 라운드 값">
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {Object.entries(token.radius).filter(([k]) => k !== "full").map(([k, v]) => (
            <div key={k} style={{ textAlign: "center" }}>
              <div style={{ width: 48, height: 48, background: C.neutral[0], border: `2px solid ${C.primary[300]}`, borderRadius: v }} />
              <div style={{ fontSize: 10, color: C.neutral[500], marginTop: 4, fontFamily: "monospace" }}>{k}/{v}px</div>
            </div>
          ))}
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 48, height: 48, background: C.neutral[0], border: `2px solid ${C.primary[300]}`, borderRadius: 9999 }} />
            <div style={{ fontSize: 10, color: C.neutral[500], marginTop: 4, fontFamily: "monospace" }}>full</div>
          </div>
        </div>
      </Section>

      <Section title="그림자 (Shadow)">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {Object.entries(token.shadow).map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 56, height: 36, background: C.neutral[0], borderRadius: 10, boxShadow: v }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.neutral[700], fontFamily: "monospace" }}>{k}</div>
                <div style={{ fontSize: 10, color: C.neutral[400] }}>{v}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function ComponentTab() {
  return (
    <div>
      {/* Buttons */}
      <Section title="버튼 (Button)" desc="Primary, Secondary, Ghost, Disabled 4단계">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: C.primary[500], color: "#fff", borderRadius: 12, padding: "14px 24px", fontSize: 15, fontWeight: 700, textAlign: "center", boxShadow: token.shadow.accent }}>
            Primary — 조합 완성하기
          </div>
          <div style={{ background: C.neutral[0], color: C.primary[500], borderRadius: 12, padding: "14px 24px", fontSize: 15, fontWeight: 700, textAlign: "center", border: `2px solid ${C.primary[500]}` }}>
            Secondary — 다시 만들기
          </div>
          <div style={{ background: "transparent", color: C.primary[500], borderRadius: 12, padding: "14px 24px", fontSize: 15, fontWeight: 600, textAlign: "center" }}>
            Ghost — 나중에 할게요
          </div>
          <div style={{ background: C.neutral[200], color: C.neutral[400], borderRadius: 12, padding: "14px 24px", fontSize: 15, fontWeight: 700, textAlign: "center" }}>
            Disabled — 재료를 선택해주세요
          </div>
        </div>
      </Section>

      {/* Small Buttons */}
      <Section title="소형 버튼 & 칩" desc="필터, 태그, 카테고리 탭에 사용">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: C.neutral[500], marginBottom: 6 }}>필터 칩 (선택/미선택)</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span style={{ padding: "7px 16px", borderRadius: 20, background: C.primary[500], color: "#fff", fontSize: 13, fontWeight: 600 }}>하이디라오</span>
              <span style={{ padding: "7px 16px", borderRadius: 20, background: C.neutral[0], color: C.neutral[600], fontSize: 13, fontWeight: 500, border: `1px solid ${C.neutral[200]}` }}>두끼훠궈</span>
              <span style={{ padding: "7px 16px", borderRadius: 20, background: C.neutral[0], color: C.neutral[600], fontSize: 13, fontWeight: 500, border: `1px solid ${C.neutral[200]}` }}>해저낙원</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: C.neutral[500], marginBottom: 6 }}>맛 태그</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[
                ["매콤 🌶️", C.semantic.spicy],
                ["고소 🥜", C.semantic.nutty],
                ["상큼 🍋", C.semantic.fresh],
                ["감칠맛 🍖", C.semantic.umami],
              ].map(([label, color]) => (
                <span key={label} style={{ padding: "5px 12px", borderRadius: 12, background: `${color}12`, color, fontSize: 12, fontWeight: 600 }}>#{label}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: C.neutral[500], marginBottom: 6 }}>세그먼트 탭</div>
            <div style={{ display: "flex", background: C.neutral[150], borderRadius: 10, padding: 3, gap: 2 }}>
              {["인기순", "최신순", "후기순"].map((t, i) => (
                <div key={t} style={{ flex: 1, textAlign: "center", padding: "8px 0", borderRadius: 8, background: i === 0 ? C.neutral[0] : "transparent", fontSize: 13, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? C.neutral[900] : C.neutral[400], boxShadow: i === 0 ? token.shadow.sm : "none" }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Cards */}
      <Section title="카드 (Card)" desc="레시피 피드의 기본 단위">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Feed card */}
          <div style={{ background: C.neutral[0], borderRadius: 16, padding: 16, border: `1px solid ${C.neutral[200]}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.neutral[900] }}>건희소스 (오리지널)</div>
                <div style={{ fontSize: 12, color: C.neutral[400], marginTop: 4 }}>원어스 건희 · <span style={{ color: C.primary[500] }}>하이디라오</span></div>
              </div>
              <div style={{ width: 44, height: 44, background: C.primary[50], borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🍲</div>
            </div>
            <div style={{ fontSize: 13, color: C.neutral[600], marginTop: 10, lineHeight: 1.5 }}>마장소스 2T + 고추기름 1T + 다진마늘 1T + 굴소스 0.5T...</div>
            <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
              <span style={{ fontSize: 11, color: C.semantic.spicy, background: `${C.semantic.spicy}12`, padding: "3px 10px", borderRadius: 10 }}>#매콤</span>
              <span style={{ fontSize: 11, color: C.semantic.nutty, background: `${C.semantic.nutty}12`, padding: "3px 10px", borderRadius: 10 }}>#고소</span>
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 12, paddingTop: 10, borderTop: `1px solid ${C.neutral[150]}` }}>
              <span style={{ fontSize: 12, color: C.neutral[400] }}>❤️ 2.4k</span>
              <span style={{ fontSize: 12, color: C.neutral[400] }}>💬 342</span>
              <span style={{ fontSize: 12, color: C.neutral[400], marginLeft: "auto" }}>📤</span>
            </div>
          </div>

          {/* Compact card */}
          <div style={{ display: "flex", gap: 12, background: C.neutral[0], borderRadius: 12, padding: 14, border: `1px solid ${C.neutral[200]}`, alignItems: "center" }}>
            <div style={{ width: 52, height: 52, background: C.neutral[100], borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🥣</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.neutral[900] }}>매콤새콤 다이어트 소스</div>
              <div style={{ fontSize: 12, color: C.neutral[400], marginTop: 3 }}>두끼훠궈 · ❤️ 1.2k</div>
            </div>
            <div style={{ fontSize: 14, color: C.neutral[300] }}>›</div>
          </div>
        </div>
      </Section>

      {/* Input */}
      <Section title="입력 (Input)" desc="검색바, 폼 필드">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: C.neutral[0], borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, border: `1px solid ${C.neutral[200]}` }}>
            <span style={{ fontSize: 16, color: C.neutral[400] }}>🔍</span>
            <span style={{ fontSize: 14, color: C.neutral[300] }}>소스 조합, 레시피 검색...</span>
          </div>
          <div style={{ background: C.neutral[0], borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, border: `2px solid ${C.primary[500]}` }}>
            <span style={{ fontSize: 16 }}>🔍</span>
            <span style={{ fontSize: 14, color: C.neutral[900] }}>매콤 고소한</span>
            <span style={{ marginLeft: "auto", fontSize: 14, color: C.neutral[400] }}>✕</span>
          </div>
        </div>
      </Section>

      {/* Taste Profile Bar */}
      <Section title="맛 프로필 바" desc="소스의 맛을 시각화하는 핵심 컴포넌트">
        <div style={{ background: C.neutral[0], borderRadius: 14, padding: 16, border: `1px solid ${C.neutral[200]}` }}>
          {[
            { label: "매운맛", value: 70, color: C.semantic.spicy },
            { label: "고소함", value: 90, color: C.semantic.nutty },
            { label: "상큼함", value: 30, color: C.semantic.fresh },
            { label: "감칠맛", value: 85, color: C.semantic.umami },
            { label: "짠맛", value: 50, color: C.semantic.salty },
          ].map((p) => (
            <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: C.neutral[600], width: 44, textAlign: "right", fontWeight: 500 }}>{p.label}</span>
              <div style={{ flex: 1, height: 10, background: C.neutral[150], borderRadius: 5, overflow: "hidden" }}>
                <div style={{ width: `${p.value}%`, height: "100%", background: p.color, borderRadius: 5 }} />
              </div>
              <span style={{ fontSize: 12, color: p.color, fontWeight: 700, width: 28, textAlign: "right" }}>{p.value}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Ingredient Selector */}
      <Section title="재료 선택 그리드" desc="소스 빌더의 재료 선택 UI">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {[
            { name: "마장소스", icon: "🥜", on: true },
            { name: "고추기름", icon: "🌶️", on: true },
            { name: "참깨소스", icon: "🫘", on: false },
            { name: "간장", icon: "🍶", on: false },
            { name: "굴소스", icon: "🦪", on: true },
            { name: "흑식초", icon: "🫗", on: false },
          ].map((i) => (
            <div key={i.name} style={{
              background: i.on ? C.primary[50] : C.neutral[0],
              border: `2px solid ${i.on ? C.primary[500] : C.neutral[200]}`,
              borderRadius: 12, padding: "14px 8px", textAlign: "center",
              position: "relative",
            }}>
              {i.on && <div style={{ position: "absolute", top: 6, right: 6, width: 18, height: 18, background: C.primary[500], borderRadius: 9, color: "#fff", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>✓</div>}
              <div style={{ fontSize: 26 }}>{i.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: i.on ? C.primary[600] : C.neutral[600], marginTop: 6 }}>{i.name}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Bottom Navigation */}
      <Section title="하단 네비게이션" desc="5탭 구조. 빌더(중앙)를 강조 처리">
        <div style={{ background: C.neutral[0], borderRadius: 16, padding: "10px 0 6px", border: `1px solid ${C.neutral[200]}`, display: "flex", justifyContent: "space-around", alignItems: "flex-end" }}>
          {[
            { icon: "🏠", label: "홈", active: true },
            { icon: "📖", label: "피드", active: false },
            { icon: "🧪", label: "빌더", center: true },
            { icon: "📓", label: "노트", active: false },
            { icon: "👤", label: "MY", active: false },
          ].map((t) => (
            <div key={t.label} style={{ textAlign: "center", width: 56 }}>
              {t.center ? (
                <div style={{ width: 48, height: 48, background: C.primary[500], borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, margin: "-16px auto 0", boxShadow: token.shadow.accent }}>{t.icon}</div>
              ) : (
                <div style={{ fontSize: 22, opacity: t.active ? 1 : 0.35 }}>{t.icon}</div>
              )}
              <div style={{ fontSize: 10, marginTop: 4, color: t.active || t.center ? C.primary[500] : C.neutral[400], fontWeight: t.active || t.center ? 700 : 400 }}>{t.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Social Buttons */}
      <Section title="소셜 로그인 버튼">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: C.social.kakao, color: C.social.kakaoText, borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, textAlign: "center" }}>💬 카카오로 시작하기</div>
          <div style={{ background: C.social.naver, color: "#fff", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, textAlign: "center" }}><b>N</b> 네이버로 시작하기</div>
          <div style={{ background: C.social.google, color: C.neutral[700], borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, textAlign: "center", border: `1px solid ${C.neutral[200]}` }}>G Google로 시작하기</div>
        </div>
      </Section>
    </div>
  );
}

function IconTasteTab() {
  return (
    <div>
      <Section title="맛 프로필 아이콘 시스템" desc="5가지 맛을 이모지 + 전용 컬러로 표현. 소스 빌더와 레시피 상세에서 통일되게 사용.">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { icon: "🌶️", label: "매운맛 (Spicy)", color: C.semantic.spicy, desc: "고추기름, 라유, 청양고추, 두반장 등" },
            { icon: "🥜", label: "고소함 (Nutty)", color: C.semantic.nutty, desc: "마장소스, 참깨, 땅콩, 연유 등" },
            { icon: "🍋", label: "상큼함 (Fresh)", color: C.semantic.fresh, desc: "흑식초, 라임, 고수, 민트 등" },
            { icon: "🍖", label: "감칠맛 (Umami)", color: C.semantic.umami, desc: "굴소스, 간장, 소고기장 등" },
            { icon: "🧂", label: "짠맛 (Salty)", color: C.semantic.salty, desc: "간장, 소금, 피쉬소스 등" },
          ].map((t) => (
            <div key={t.label} style={{ background: C.neutral[0], borderRadius: 12, padding: 14, border: `1px solid ${C.neutral[200]}`, display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 48, height: 48, background: `${t.color}12`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{t.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: t.color }}>{t.label}</div>
                <div style={{ fontSize: 12, color: C.neutral[500], marginTop: 2 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="재료 카테고리 아이콘" desc="소스 빌더에서 재료를 분류하는 카테고리">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { icon: "🥜", name: "베이스 소스", examples: "마장, 참깨, 두반장" },
            { icon: "🫗", name: "오일 & 식초", examples: "고추기름, 참기름, 흑식초" },
            { icon: "🧄", name: "양념", examples: "마늘, 간장, 굴소스, 설탕" },
            { icon: "🧅", name: "토핑", examples: "쪽파, 고수, 땅콩가루" },
            { icon: "🌿", name: "허브 & 향신료", examples: "고수, 민트, 청양고추" },
            { icon: "✨", name: "시크릿", examples: "연유, 소고기장, 칠리소스" },
          ].map((c) => (
            <div key={c.name} style={{ background: C.neutral[0], borderRadius: 12, padding: "14px 12px", border: `1px solid ${C.neutral[200]}`, textAlign: "center" }}>
              <div style={{ fontSize: 28 }}>{c.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.neutral[800], marginTop: 6 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: C.neutral[400], marginTop: 4 }}>{c.examples}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="매장 아이콘/로고 처리" desc="매장별 구분을 위한 표시 방식">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { name: "하이디라오", emoji: "🔴", color: "#D32F2F" },
            { name: "두끼훠궈", emoji: "🟡", color: "#F9A825" },
            { name: "해저낙원", emoji: "🔵", color: "#1565C0" },
            { name: "소림마라", emoji: "🟤", color: "#795548" },
            { name: "기타 매장", emoji: "⚪", color: C.neutral[500] },
          ].map((s) => (
            <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 10, background: C.neutral[0], borderRadius: 10, padding: "10px 14px", border: `1px solid ${C.neutral[200]}` }}>
              <div style={{ width: 32, height: 32, background: `${s.color}18`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{s.emoji}</div>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.neutral[800] }}>{s.name}</span>
              <span style={{ fontSize: 11, color: s.color, marginLeft: "auto", fontFamily: "monospace" }}>{s.color}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="기타 UI 아이콘" desc="앱 전반에서 사용하는 아이콘 (이모지 기반 MVP → 추후 커스텀 아이콘으로 교체)">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, textAlign: "center" }}>
          {[
            ["❤️", "좋아요"],
            ["💬", "댓글"],
            ["📤", "공유"],
            ["🔖", "저장"],
            ["🔍", "검색"],
            ["⚙️", "필터"],
            ["🔔", "알림"],
            ["🏪", "매장"],
            ["🏆", "챌린지"],
            ["📊", "통계"],
          ].map(([icon, label]) => (
            <div key={label} style={{ background: C.neutral[0], borderRadius: 10, padding: "10px 4px", border: `1px solid ${C.neutral[200]}` }}>
              <div style={{ fontSize: 20 }}>{icon}</div>
              <div style={{ fontSize: 10, color: C.neutral[500], marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ============ MAIN ============
export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const content = [ColorTab, TypoTab, ComponentTab, IconTasteTab];
  const ActiveContent = content[activeTab];

  return (
    <div style={{ background: C.neutral[100], minHeight: "100vh", maxWidth: 420, margin: "0 auto", fontFamily: '-apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", sans-serif', color: C.neutral[900] }}>
      {/* Header */}
      <div style={{ padding: "20px 20px 0", textAlign: "center" }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -1 }}>
          <span style={{ color: C.primary[500] }}>Dip</span>
          <span style={{ color: C.neutral[900] }}>Dip</span>
        </div>
        <div style={{ fontSize: 13, color: C.neutral[500], marginTop: 4 }}>Design System v1.0</div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, padding: "16px 16px 12px", position: "sticky", top: 0, background: C.neutral[100], zIndex: 10 }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setActiveTab(i)} style={{
            flex: 1, padding: "10px 6px", borderRadius: 10, border: "none", fontSize: 13, fontWeight: activeTab === i ? 700 : 500,
            background: activeTab === i ? C.primary[500] : C.neutral[0], color: activeTab === i ? "#fff" : C.neutral[500], cursor: "pointer",
            boxShadow: activeTab === i ? token.shadow.accent : "none",
          }}>{t}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "0 16px 40px" }}>
        <ActiveContent />
      </div>
    </div>
  );
}