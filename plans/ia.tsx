import { useState } from "react";

const colors = {
  bg: "#0F0F0F",
  card: "#1A1A1A",
  cardHover: "#222",
  accent: "#FF6B35",
  accentLight: "#FF8A5C",
  text: "#F5F5F5",
  textSec: "#999",
  textTer: "#666",
  border: "#2A2A2A",
  tag: "#2A1A10",
  green: "#22C55E",
  blue: "#3B82F6",
  purple: "#A855F7",
  pink: "#EC4899",
};

const tabs = ["IA 구조", "화면 플로우", "화면 목록"];

// IA Tree Data
const iaData = {
  name: "DipDip",
  desc: "훠궈 소스 & 레시피 플랫폼",
  children: [
    {
      name: "🏠 홈",
      desc: "메인 진입점",
      color: colors.accent,
      children: [
        { name: "인기 레시피 캐러셀", desc: "주간 TOP 10" },
        { name: "매장별 퀵필터", desc: "하이디라오/두끼 등" },
        { name: "최근 본 레시피", desc: "개인화 영역" },
        { name: "챌린지 배너", desc: "이달의 소스 챌린지" },
      ],
    },
    {
      name: "📖 레시피 피드",
      desc: "MVP 핵심 기능 #1",
      color: colors.green,
      children: [
        { name: "무한스크롤 피드", desc: "카드형 레시피 목록" },
        { name: "검색 & 필터", desc: "매장/맛/태그/난이도" },
        { name: "레시피 상세", desc: "재료/비율/후기/좋아요" },
        { name: "레시피 공유", desc: "카카오톡/인스타/링크" },
      ],
    },
    {
      name: "🧪 소스 빌더",
      desc: "MVP 핵심 기능 #2",
      color: colors.blue,
      children: [
        { name: "매장 선택", desc: "소스바 재료 목록 로드" },
        { name: "재료 선택 UI", desc: "카테고리별 재료 그리드" },
        { name: "비율 조절", desc: "슬라이더로 양 조절" },
        { name: "맛 프로필 차트", desc: "매운맛/고소/상큼/감칠맛" },
        { name: "레시피로 저장", desc: "내 노트에 저장 or 피드에 공유" },
      ],
    },
    {
      name: "📓 마이 노트",
      desc: "MVP 핵심 기능 #3",
      color: colors.purple,
      children: [
        { name: "저장한 레시피", desc: "북마크 목록" },
        { name: "내가 만든 레시피", desc: "빌더로 만든 조합" },
        { name: "방문 기록", desc: "매장 + 날짜 + 메모" },
        { name: "맛 취향 프로필", desc: "누적 데이터 기반" },
      ],
    },
    {
      name: "👤 프로필/설정",
      desc: "계정 관리 (로그인 시에만)",
      color: colors.pink,
      children: [
        { name: "로그인 유도 화면", desc: "비로그인 시 → 로그인 혜택 안내" },
        { name: "로그인/회원가입", desc: "카카오/네이버/구글 (P3)" },
        { name: "닉네임/프로필", desc: "기본 정보" },
        { name: "알림 설정", desc: "신규 레시피/챌린지" },
        { name: "앱 설정", desc: "다크모드/언어" },
      ],
    },
  ],
};

// Flow Data
const flowSteps = [
  {
    id: "entry",
    title: "앱 진입",
    screens: ["스플래시", "온보딩 (첫 방문 시)"],
    next: ["home"],
    color: colors.textSec,
  },
  {
    id: "home",
    title: "🏠 홈",
    screens: ["인기 레시피", "매장 퀵필터", "챌린지 배너"],
    next: ["feed", "builder"],
    color: colors.accent,
  },
  {
    id: "feed",
    title: "📖 레시피 피드",
    screens: ["피드 목록", "검색/필터", "레시피 상세"],
    next: ["detail", "mynote"],
    color: colors.green,
  },
  {
    id: "detail",
    title: "📋 레시피 상세",
    screens: ["재료 & 비율", "맛 프로필", "후기", "공유"],
    next: ["mynote", "builder"],
    color: colors.green,
  },
  {
    id: "builder",
    title: "🧪 소스 빌더",
    screens: ["매장 선택", "재료 선택", "비율 조절", "맛 프로필 차트"],
    next: ["preview"],
    color: colors.blue,
  },
  {
    id: "preview",
    title: "✅ 완성 미리보기",
    screens: ["조합 결과", "저장 or 공유"],
    next: ["mynote", "feed"],
    color: colors.blue,
  },
  {
    id: "mynote",
    title: "📓 마이 노트",
    screens: ["저장 레시피", "내 조합", "방문 기록"],
    next: ["detail", "profile"],
    color: colors.purple,
  },
  {
    id: "profile",
    title: "👤 프로필",
    screens: ["계정 정보", "맛 취향", "설정"],
    next: [],
    color: colors.pink,
  },
];

// Screen List
const screenList = [
  {
    group: "공통",
    color: colors.textSec,
    screens: [
      { name: "스플래시", priority: "P1", desc: "로고 + 로딩" },
      { name: "온보딩", priority: "P2", desc: "맛 취향 설문 (3단계)" },
      { name: "로그인", priority: "P3", desc: "소셜 로그인 (카카오/네이버) — 마이노트 접근 시에만" },
      { name: "하단 탭바", priority: "P1", desc: "홈/피드/빌더/노트/프로필" },
    ],
  },
  {
    group: "홈",
    color: colors.accent,
    screens: [
      { name: "홈 메인", priority: "P1", desc: "인기 레시피 + 퀵필터 + 배너" },
    ],
  },
  {
    group: "레시피 피드",
    color: colors.green,
    screens: [
      { name: "피드 목록", priority: "P1", desc: "카드형 무한스크롤" },
      { name: "검색 & 필터", priority: "P1", desc: "매장/맛/태그 멀티필터" },
      { name: "레시피 상세", priority: "P1", desc: "재료/비율/맛차트/후기" },
      { name: "레시피 작성", priority: "P2", desc: "UGC 레시피 등록 폼" },
    ],
  },
  {
    group: "소스 빌더",
    color: colors.blue,
    screens: [
      { name: "매장 선택", priority: "P1", desc: "매장별 소스바 재료 로드" },
      { name: "재료 선택", priority: "P1", desc: "카테고리 그리드 + 수량" },
      { name: "맛 프로필 차트", priority: "P1", desc: "레이더 차트 실시간 반영" },
      { name: "조합 완성", priority: "P1", desc: "결과 요약 + 저장/공유" },
    ],
  },
  {
    group: "마이 노트",
    color: colors.purple,
    screens: [
      { name: "저장 레시피 목록", priority: "P1", desc: "북마크한 레시피" },
      { name: "내 조합 목록", priority: "P1", desc: "빌더로 만든 레시피" },
      { name: "방문 기록", priority: "P2", desc: "매장+날짜+별점+메모" },
      { name: "맛 취향 리포트", priority: "P3", desc: "누적 선호도 분석" },
    ],
  },
  {
    group: "프로필/설정",
    color: colors.pink,
    screens: [
      { name: "프로필 메인", priority: "P2", desc: "닉네임/프로필/통계" },
      { name: "설정", priority: "P2", desc: "알림/다크모드/언어" },
    ],
  },
];

function IATree({ data }) {
  const [expanded, setExpanded] = useState({});
  const toggle = (name) => setExpanded((p) => ({ ...p, [name]: !p[name] }));

  return (
    <div style={{ padding: "0 4px" }}>
      <div
        style={{
          background: colors.accent,
          borderRadius: 12,
          padding: "16px 20px",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{data.name}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 4 }}>{data.desc}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.children.map((section) => {
          const isOpen = expanded[section.name] !== false;
          return (
            <div key={section.name}>
              <div
                onClick={() => toggle(section.name)}
                style={{
                  background: colors.card,
                  border: `1px solid ${section.color || colors.border}`,
                  borderRadius: 10,
                  padding: "12px 16px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: colors.text }}>{section.name}</div>
                  <div style={{ fontSize: 12, color: colors.textSec, marginTop: 2 }}>{section.desc}</div>
                </div>
                <div
                  style={{
                    color: colors.textSec,
                    fontSize: 18,
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                >
                  ›
                </div>
              </div>
              {isOpen && section.children && (
                <div style={{ marginLeft: 20, borderLeft: `2px solid ${section.color || colors.border}`, paddingLeft: 16, marginTop: 4 }}>
                  {section.children.map((item) => (
                    <div
                      key={item.name}
                      style={{
                        background: colors.card,
                        borderRadius: 8,
                        padding: "10px 14px",
                        marginTop: 6,
                      }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 500, color: colors.text }}>{item.name}</div>
                      <div style={{ fontSize: 11, color: colors.textSec, marginTop: 2 }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FlowDiagram() {
  return (
    <div style={{ padding: "0 4px" }}>
      <div style={{ fontSize: 13, color: colors.textSec, marginBottom: 16, lineHeight: 1.6 }}>
        유저가 앱을 사용하는 주요 경로를 나타냅니다.<br />
        화살표(→)는 화면 간 이동 방향이에요.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {flowSteps.map((step, i) => (
          <div key={step.id}>
            <div
              style={{
                background: colors.card,
                border: `1px solid ${step.color}40`,
                borderRadius: 12,
                padding: "14px 16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div
                  style={{
                    background: step.color,
                    color: "#fff",
                    borderRadius: 6,
                    padding: "2px 8px",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: colors.text }}>{step.title}</div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: step.next.length > 0 ? 10 : 0 }}>
                {step.screens.map((s) => (
                  <span
                    key={s}
                    style={{
                      background: `${step.color}15`,
                      color: step.color,
                      border: `1px solid ${step.color}30`,
                      borderRadius: 6,
                      padding: "3px 10px",
                      fontSize: 12,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              {step.next.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, color: colors.textTer }}>이동 →</span>
                  {step.next.map((n) => {
                    const target = flowSteps.find((f) => f.id === n);
                    return (
                      <span
                        key={n}
                        style={{
                          background: `${target?.color || colors.textSec}20`,
                          color: target?.color || colors.textSec,
                          borderRadius: 4,
                          padding: "2px 8px",
                          fontSize: 11,
                          fontWeight: 500,
                        }}
                      >
                        {target?.title}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
            {i < flowSteps.length - 1 && (
              <div style={{ textAlign: "center", color: colors.textTer, fontSize: 16, padding: "4px 0" }}>↓</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenListView() {
  return (
    <div style={{ padding: "0 4px" }}>
      <div style={{ fontSize: 13, color: colors.textSec, marginBottom: 16, lineHeight: 1.6 }}>
        MVP에서 구현할 전체 화면 목록이에요.<br />
        <span style={{ color: colors.accent, fontWeight: 600 }}>P1</span> = MVP 필수 &nbsp;
        <span style={{ color: colors.blue, fontWeight: 600 }}>P2</span> = 빠른 후속 &nbsp;
        <span style={{ color: colors.textSec, fontWeight: 600 }}>P3</span> = 나중에
      </div>
      {screenList.map((group) => (
        <div key={group.group} style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: group.color,
              marginBottom: 8,
              paddingBottom: 6,
              borderBottom: `1px solid ${group.color}30`,
            }}
          >
            {group.group}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {group.screens.map((s) => (
              <div
                key={s.name}
                style={{
                  background: colors.card,
                  borderRadius: 8,
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    background:
                      s.priority === "P1"
                        ? `${colors.accent}25`
                        : s.priority === "P2"
                        ? `${colors.blue}25`
                        : `${colors.textSec}20`,
                    color:
                      s.priority === "P1" ? colors.accent : s.priority === "P2" ? colors.blue : colors.textSec,
                    borderRadius: 4,
                    padding: "2px 8px",
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {s.priority}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: colors.text }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: colors.textSec, marginTop: 1 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div
        style={{
          background: `${colors.accent}10`,
          border: `1px solid ${colors.accent}30`,
          borderRadius: 10,
          padding: "14px 16px",
          marginTop: 8,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, color: colors.accent, marginBottom: 4 }}>📊 MVP 화면 요약</div>
        <div style={{ fontSize: 12, color: colors.textSec, lineHeight: 1.7 }}>
          P1 (MVP 필수): <span style={{ color: colors.text, fontWeight: 600 }}>12개 화면</span><br />
          P2 (빠른 후속): <span style={{ color: colors.text, fontWeight: 600 }}>5개 화면</span><br />
          P3 (나중에): <span style={{ color: colors.text, fontWeight: 600 }}>2개 화면</span><br />
          <span style={{ color: colors.accent }}>총 19개 화면</span>으로 서비스 전체 커버<br />
          <span style={{ color: colors.textSec, fontSize: 11 }}>💡 비로그인으로 홈/피드/빌더 모두 이용 가능, 저장·공유 시 로그인 유도</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      style={{
        background: colors.bg,
        minHeight: "100vh",
        maxWidth: 420,
        margin: "0 auto",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: colors.text,
      }}
    >
      {/* Header */}
      <div style={{ padding: "20px 20px 0", textAlign: "center" }}>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -1 }}>
          <span style={{ color: colors.accent }}>Dip</span>
          <span style={{ color: colors.text }}>Dip</span>
          <span style={{ fontSize: 14, marginLeft: 6 }}>🍲</span>
        </div>
        <div style={{ fontSize: 13, color: colors.textSec, marginTop: 4 }}>정보구조 & 화면 플로우</div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 6,
          padding: "16px 20px",
          position: "sticky",
          top: 0,
          background: colors.bg,
          zIndex: 10,
        }}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            style={{
              flex: 1,
              padding: "10px 8px",
              borderRadius: 8,
              border: "none",
              fontSize: 13,
              fontWeight: activeTab === i ? 700 : 500,
              background: activeTab === i ? colors.accent : colors.card,
              color: activeTab === i ? "#fff" : colors.textSec,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "0 16px 40px" }}>
        {activeTab === 0 && <IATree data={iaData} />}
        {activeTab === 1 && <FlowDiagram />}
        {activeTab === 2 && <ScreenListView />}
      </div>
    </div>
  );
}