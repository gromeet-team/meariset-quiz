'use client'
import { useEffect } from 'react'

const BODY_HTML = `<div class="app">

  <!-- ============ LANDING ============ -->
  <section class="scene active" id="landing">
    <div>
      <div class="landing-hero">
        <span class="landing-eyebrow">MEARISET · 90초 진단</span>
        <h1 class="landing-title">
          내가 목표를<br>이룰 수 <span class="accent">있을까?</span>
        </h1>
        <p class="landing-sub">
          다이어리를 5번 샀다가 5번 실패한 당신.<br>
          잘못된 건 의지가 아니라, <strong>패턴</strong>일지도 몰라요.
        </p>
      </div>

      <div class="landing-illust" aria-hidden="true">
        <img src="동물별 사진/고양이.png" alt="" class="paint-hero-cat" loading="eager">
      </div>

      <div class="landing-meta">
        <span>⏱ 75초</span>
        <span>📋 12문항</span>
        <span>🎯 7가지 패턴</span>
      </div>
    </div>

    <div>
      <button class="btn btn-primary" onclick="startQuiz()">
        나의 90일 패턴 진단하기
      </button>
      <p class="landing-disclaimer">
        결과는 메아리셋이 만든 <em>회복형 성장 프레임</em>에 기반합니다.
      </p>
    </div>
  </section>

  <!-- ============ QUIZ ============ -->
  <section class="scene" id="quiz">
    <button class="quiz-back" id="quizBack" onclick="goBack()" aria-label="이전 문항으로">← 이전</button>
    <div class="quiz-header">
      <div class="progress-row">
        <span id="progressLabel">QUESTION 1 / 12</span>
        <span id="progressPercent">8%</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" id="progressFill"></div></div>
    </div>
    <h2 class="quiz-question" id="questionText"></h2>
    <div class="options" id="optionsList"></div>
  </section>

  <!-- ============ LOADING ============ -->
  <section class="scene" id="loading">
    <div style="position:relative; display:flex; align-items:center; justify-content:center; width:220px; height:220px; margin:0 auto 8px;">
      <div class="loader-ring"></div>
      <div class="loader-ring" style="animation-delay: 0.7s;"></div>
      <div class="loader-orb"></div>
    </div>
    <p class="loader-title" id="loaderTitle">당신의 90일을 듣고 있습니다…</p>
    <p class="loader-sub" id="loaderSub">메아리가 돌아오는 중</p>
  </section>

  <!-- ============ RESULT ============ -->
  <section class="scene" id="result">
    <div class="result-eyebrow">YOUR 90-DAY PATTERN</div>

    <div class="result-card" id="resultCard">
      <div class="result-animal-svg" id="resultAnimal"></div>
      <div class="result-tag" id="resultTag"></div>
      <h2 class="result-name" id="resultName"></h2>
      <p class="result-oneline" id="resultOneline"></p>
    </div>

    <!-- v2.1: DIAGNOSIS CARD (진단서 짤 카드) -->
    <div class="diagnosis-card">
      <div class="diagnosis-header">진단서 · DIAGNOSIS</div>
      <div class="diagnosis-row">
        <div class="diagnosis-label">진단명</div>
        <div class="diagnosis-value diag-name">
          <span id="resultDiagName"></span>
          <span class="code" id="resultDiagCode"></span>
        </div>
      </div>
      <div class="diagnosis-row">
        <div class="diagnosis-label">주요 증상</div>
        <div class="diagnosis-value">
          <ol id="resultDiagSymptoms"></ol>
        </div>
      </div>
      <div class="diagnosis-row">
        <div class="diagnosis-label">5년 누적</div>
        <div class="diagnosis-value damage" id="resultDiagDamage"></div>
      </div>
      <hr class="diagnosis-divider">
      <div class="diagnosis-row">
        <div class="diagnosis-label">처방</div>
        <div class="diagnosis-value rx" id="resultDiagRx"></div>
      </div>
    </div>

    <div class="result-section">
      <h3>당신의 이야기</h3>
      <div class="result-empathy" id="resultEmpathy"></div>
    </div>

    <!-- v2.1: CATCHPHRASE CARD (입버릇 짤 카드) -->
    <div class="catchphrase-card">
      <div class="catchphrase-title">💬 당신이 자주 하는 말 TOP 3</div>
      <ol class="catchphrase-list" id="resultCatchphrases"></ol>
    </div>

    <div class="result-section">
      <div class="traits-grid">
        <div class="trait-box">
          <div class="label">강점</div>
          <ul id="resultStrengths"></ul>
        </div>
        <div class="trait-box">
          <div class="label">약점 (페인)</div>
          <ul id="resultWeaknesses"></ul>
        </div>
      </div>
    </div>

    <!-- NEW: EVIDENCE (권위) -->
    <div class="evidence-card">
      <span class="evidence-label">🧠 EVIDENCE — 같은 패턴을 가진 사람들이 발견한 것</span>
      <p class="evidence-quote" id="resultEvidenceQuote"></p>
      <div class="evidence-framework" id="resultEvidenceFramework"></div>
    </div>

    <!-- v2.1: PARTNERS CARD (궁합 짤 카드) — STORIES 위로 이동 -->
    <div class="partners-card">
      <div class="partners-title">🤝 같이 있으면 어떻게 되나요?</div>
      <div class="partner-row match">
        <div class="partner-emoji" id="resultMatchEmoji"></div>
        <div class="partner-body">
          <span class="partner-label">💕 잘 맞는 파트너</span>
          <div class="partner-name" id="resultMatchName"></div>
          <div class="partner-line" id="resultMatchLine"></div>
        </div>
      </div>
      <div class="partner-row clash">
        <div class="partner-emoji" id="resultClashEmoji"></div>
        <div class="partner-body">
          <span class="partner-label">💢 안 맞는 파트너</span>
          <div class="partner-name" id="resultClashName"></div>
          <div class="partner-line" id="resultClashLine"></div>
        </div>
      </div>
    </div>

    <!-- NEW: STORIES (사회적 증거 + 호감) -->
    <div class="result-section">
      <p class="stories-headline" id="resultStoriesHeadline">📖 다른 [동물]형의 90일 이야기</p>
      <p class="stories-sub">먼저 무료로 읽어보세요 — 카페에서 이어집니다</p>
      <div class="stories-list" id="resultStoriesList"></div>
    </div>

    <div class="cta-stack">
      <a class="story-card cta-link cta-primary" id="ctaShop" href="#" target="_blank" rel="noopener" onclick="trackCta('shop')">
        <div class="story-icon">📓</div>
        <div class="story-body">
          <div class="story-tag">자사몰 보러가기</div>
          <div class="story-title">다이어리 완주 인증하면 평생 무료</div>
        </div>
        <div class="story-arrow">→</div>
      </a>
      <a class="story-card cta-link cta-secondary" id="ctaCafe" href="#" target="_blank" rel="noopener" onclick="trackCta('cafe')">
        <div class="story-icon">☕</div>
        <div class="story-body">
          <div class="story-tag">카페 보러가기</div>
          <div class="story-title">혼자보다 함께할 때,<br>목표 실천이 약 35% 더 높아질 수 있어요.</div>
        </div>
        <div class="story-arrow">→</div>
      </a>
    </div>

    <button class="share-single" onclick="shareLink()">
      🔗 공유하기
    </button>

    <button class="restart" onclick="restartQuiz()">처음부터 다시 하기</button>

    <div class="footer-mini">© 메아리셋 — 적어라, 메아리되어 돌아온다</div>
  </section>

  <!-- ============ SCENE: STORY (회원 인사이트 v0.2) ============ -->
  <section class="scene" id="story">
    <button class="story-back" type="button" onclick="closeStory()">← 내 결과로 돌아가기</button>

    <div class="story-label">메아리셋 회원 페르소나 기반 시뮬레이션 사례입니다.</div>

    <h1 class="story-headline" id="storyHeadline"></h1>
    <div class="story-subtitle" id="storySubtitle"></div>

    <div class="story-hook" id="storyHook"></div>

    <div class="story-body" id="storyBody"></div>

    <div class="story-closing" id="storyClosing"></div>

    <a class="story-card cta-link cta-primary" id="storyGuideLink" href="#" target="_blank" rel="noopener">
      <div class="story-icon">📖</div>
      <div class="story-body-cta">
        <div class="story-tag">90일 가이드</div>
        <div class="story-title" id="storyGuideTitle"></div>
      </div>
      <div class="story-arrow">→</div>
    </a>

    <button class="restart" onclick="closeStory()">← 내 결과로 돌아가기</button>
    <button class="restart" onclick="restartQuiz()">처음부터 다시 하기</button>

    <div class="footer-mini">© 메아리셋 — 적어라, 메아리되어 돌아온다</div>
  </section>

</div>

<div class="toast" id="toast">링크가 복사되었어요</div>`

export default function Page() {
  useEffect(() => {
    const script = document.createElement('script')
    script.textContent = QUIZ_SCRIPT
    document.body.appendChild(script)
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div
      dangerouslySetInnerHTML={{ __html: BODY_HTML }}
    />
  )
}

const QUIZ_SCRIPT = `/* =====================================================================
   메아리셋 심리테스트 v1.2 — 설득의 심리학 적용
   - Cialdini 7원칙: 사회적 증거 + 호감 + 권위 + 희소성 + 일관성 + 상호성
   - 12문항 × 6지선다, Cluster C 1.5x 가중
   ===================================================================== */

const SHOP_URL = "https://meariset.kr/product/500%EA%B0%9C-%ED%95%9C%EC%A0%95-%EB%A9%94%EC%95%84%EB%A6%AC%EC%85%8B-90%EC%9D%BC-%EB%AA%A9%ED%91%9C%EB%8B%AC%EC%84%B1-%EB%8B%A4%EC%9D%B4%EC%96%B4%EB%A6%AC-%EB%87%8C%EA%B3%BC%ED%95%99-%EA%B8%B0%EB%B0%98-9%EB%8B%A8%EA%B3%84-%EC%8A%B5%EA%B4%80-%EC%8B%9C%EC%8A%A4%ED%85%9C/27/category/1/display/2/?icid=MAIN.product_listmain_1";
const CAFE_URL = "https://m.cafe.naver.com/yangfams";
// 90일 가이드 단일 글 — "매일 1cm 전진하기 위한 5가지 약속"
const GUIDE_URL = "https://m.cafe.naver.com/f-e/cafes/23719567/articles/1963?menuid=101&referrerAllArticles=false";

function appendUtm(url, animal, content) {
  const parts = [
    \`utm_source=quiz\`,
    \`utm_medium=\${animal}\`,
    \`utm_campaign=launch_quiz_v1\`
  ];
  if (content) parts.push(\`utm_content=\${content}\`);
  return url + (url.includes("?") ? "&" : "?") + parts.join("&");
}

// ---------- QUESTIONS (12 × 4, v1.8 — 4지선다 + 중립답) ----------
// 매 문항당 6동물 중 3동물 답(1점) + 1중립답(점수 0 = 패스)
// 6동물 균형: 각 동물 12문항 중 6번, Cluster C에서 2번씩 → 가중치 균형 그대로
// 중립답: a: null 로 표시. computeAndShowResult에서 무시.
// 톤 원칙: 페인 유지 + 자기인정 가능 + 강제 매칭 안 함 (출구 제공)
const QUESTIONS = [
  {
    // Q1: 토끼 / 양 / 거북이 + 중립
    q: "새해나 분기에 목표를 세울 때 나는…",
    options: [
      { t: "10개 넘게, 일단 다 적어둔다", a: "rabbit" },
      { t: "2~3개만 신중하게 정한다", a: "sheep" },
      { t: "관련 자료부터 차근차근 모은다", a: "turtle" },
      { t: "안 정한다 — 흐름에 맡긴다", a: null }
    ]
  },
  {
    // Q2: 다람쥐 / 곰 / 고슴도치 + 중립
    q: "이루고 싶은 게 떠올랐을 때 첫 행동은?",
    options: [
      { t: "당장 한 시간이라도 몰입해본다", a: "squirrel" },
      { t: "노트에 적어두고 며칠 두고 본다", a: "bear" },
      { t: "\"나한테 진짜 맞을까\" 한 번 더 본다", a: "hedgehog" },
      { t: "딱히 첫 행동이랄 게 없다", a: null }
    ]
  },
  {
    // Q3: 토끼 / 곰 / 고슴도치 + 중립
    q: "다이어리·플래너를 살 때의 나는…",
    options: [
      { t: "예쁘면 일단 산다 — 매년 새 만남이 좋다", a: "rabbit" },
      { t: "작년 거 못 다 썼는데 또 살까 망설인다", a: "bear" },
      { t: "잘 쓰는 사람들 보고 비슷하게 고른다", a: "hedgehog" },
      { t: "잘 안 산다 — 지금 거로 충분", a: null }
    ]
  },
  {
    // Q4: 양 / 다람쥐 / 거북이 + 중립
    q: "\"올해는 진짜다\" 다짐할 때의 나는…",
    options: [
      { t: "혼자만 안다 — 신중하게 가고 싶어서", a: "sheep" },
      { t: "다짐보단 행동, 일단 해본다", a: "squirrel" },
      { t: "준비 더 하고 제대로 시작하려 한다", a: "turtle" },
      { t: "그런 다짐 잘 안 한다", a: null }
    ]
  },
  {
    // Q5: 토끼 / 양 / 거북이 + 중립
    q: "일주일째 계획대로 안 풀리고 있을 때 나는…",
    options: [
      { t: "더 맞는 방법으로 갈아탄다", a: "rabbit" },
      { t: "잠깐 멈추고, 다음 분기에 다시 본다", a: "sheep" },
      { t: "더 좋은 방법론을 찾아본다", a: "turtle" },
      { t: "상황 보면서 그때그때 결정한다", a: null }
    ]
  },
  {
    // Q6: 다람쥐 / 곰 / 고슴도치 + 중립
    q: "갑자기 의욕이 솟구치는 날 나는…",
    options: [
      { t: "오늘 한 단계까지 끝까지 가본다", a: "squirrel" },
      { t: "들뜨지 않게 메모만 해둔다", a: "bear" },
      { t: "이 의욕이 얼마나 갈지 본다", a: "hedgehog" },
      { t: "특별히 다르게 행동하지 않는다", a: null }
    ]
  },
  {
    // Q7: 토끼 / 양 / 거북이 + 중립
    q: "친구가 \"그거 어떻게 돼가?\" 물으면 나는…",
    options: [
      { t: "\"아 그거? 더 재밌는 거 시작했어\"", a: "rabbit" },
      { t: "어색하게 웃는다 (계획만 짜고 있어서)", a: "sheep" },
      { t: "\"준비 중이야\" (한 6개월째 준비)", a: "turtle" },
      { t: "그때그때 다르게 답한다", a: null }
    ]
  },
  {
    // Q8: 다람쥐 / 곰 / 고슴도치 + 중립
    q: "평일 저녁 9시, 오늘 할 일이 남았을 때…",
    options: [
      { t: "컨디션 맞으면 한 번에 끝낸다", a: "squirrel" },
      { t: "내일 새벽에 하기로 마음먹는다", a: "bear" },
      { t: "SNS 잠깐 본다는 게 11시가 된다", a: "hedgehog" },
      { t: "그날 상황 따라 다르다", a: null }
    ]
  },
  // ── Cluster C ──
  {
    // Q9: 토끼 / 양 / 곰 + 중립
    q: "한 달째 손도 안 댄 다이어리를 발견했을 때…",
    options: [
      { t: "괜찮아, 새 거 사서 다시 시작하면 돼", a: "rabbit" },
      { t: "마음이 무거워서 다시 못 펴겠다", a: "sheep" },
      { t: "지난 한 달 어땠는지 천천히 본다", a: "bear" },
      { t: "그냥 둔다 — 별 신경 안 쓴다", a: null }
    ]
  },
  {
    // Q10: 다람쥐 / 거북이 / 고슴도치 + 중립
    q: "작은 성공을 했을 때 나는…",
    options: [
      { t: "기분 좋게 바로 다음 단계로 간다", a: "squirrel" },
      { t: "이게 진짜 맞는 길인지 한 번 더 본다", a: "turtle" },
      { t: "더 잘하는 사람이 자꾸 떠오른다", a: "hedgehog" },
      { t: "별다른 반응 없이 넘어간다", a: null }
    ]
  },
  {
    // Q11: 토끼 / 양 / 곰 + 중립
    q: "분기·시즌이 끝나갈 때 나는…",
    options: [
      { t: "끝나자마자 또 새로 시작", a: "rabbit" },
      { t: "흐지부지 끝나는 게 늘 그래왔다", a: "sheep" },
      { t: "끝나도 끝난 느낌이 잘 안 든다", a: "bear" },
      { t: "분기·시즌을 의식한 적이 없다", a: null }
    ]
  },
  {
    // Q12: 다람쥐 / 거북이 / 고슴도치 + 중립 (v1.9.1 — 긍정 미래 톤)
    q: "5년 후의 내 모습을 떠올리면…",
    options: [
      { t: "5년 뒤도 새로운 거 시도하고 있을 거다", a: "squirrel" },
      { t: "그땐 준비가 다 돼서 제대로 가고 있을 거다", a: "turtle" },
      { t: "그때쯤이면 비교 덜 하고 살 것 같다", a: "hedgehog" },
      { t: "딱히 깊이 생각해본 적 없다", a: null }
    ]
  }
];

// ---------- RESULTS ----------
// 각 동물 = empathy(공감) + traits + evidence(권위) + stories(사회적 증거) + solution(약속)
const RESULTS = {
  rabbit: {
    tag: "의욕만렙 작심삼일러",
    name: "🐰 작심삼일 토끼",
    color: "rabbit",
    season: "Q1 — 발화 / 시작의 계절",
    oneline: "1월에 다이어리 7개 사고 2월에 다 잊는 사람",
    empathy: \`<p>1월 1일, 당신의 책상엔 새 다이어리가 있습니다.<br>그리고 작년 1월의 다이어리도, 재작년 1월의 다이어리도 있죠.</p>
              <p>당신은 시작이 빠른 사람입니다. 의욕이 폭발하는 그 순간, 누구보다 먼저 뛰어가는 사람.<br>문제는 — <strong>그 의욕이 너무 커서, 3주 안에 모두 태워버린다는 것.</strong></p>
              <p>이건 당신의 잘못이 아닙니다. 시작 능력은 당신의 자산이에요. 다만 그 시작을 <strong>17번 반복할 시스템</strong>이 없었을 뿐.</p>\`,
    strengths: ["시작 결정 빠름", "에너지 폭발력", "새로움 개방성"],
    weaknesses: ["작심삼일", "의욕 과다 → 번아웃", "마무리 약함"],
    evidence: {
      quote: "\"의지가 약한 게 아니라, 1년이 너무 길었던 거예요.\"",
      framework: "행동심리학의 <b>새출발 효과(Fresh Start Effect)</b> — 분기·생일·월요일 같은 \"시간적 랜드마크\"는 동기를 회복시킵니다. 1년에 한 번이 아니라, <b>4번 새로 시작</b>할 수 있다면 얘기는 달라집니다."
    },
    stories: [
      { icon: "📖", tag: "90일 가이드", title: "거창한 목표가 토끼를 무너뜨립니다 — 매일 1cm면 충분", url: GUIDE_URL },
      { icon: "✍️", tag: "회원 인사이트", title: "8년 만에 처음, 다이어리가 2월을 넘어갔어요", url: "#story-rabbit" }
    ],
    solutionTitle: "1년이 아니라, 4번의 시작.",
    solutionBody: "메아리셋의 90일 시즌제는 시작이 강한 토끼를 위해 설계됐어요. 1년 약속이 아니라, 90일짜리 약속 4개. 한 번 작심삼일 했어도 다음 시즌에 다시 시작하면 됩니다. 4번이면 1년이 됩니다.",
    echo: "\"새로 시작하는 게 잘못이 아니다. 새로 시작할 시스템이 없었을 뿐이다.\"",
    diagnosis: {
      name_kr: "1월병",
      code: "JanuaryItis",
      symptoms: [
        "1월 1일이면 새 다이어리부터 사고 본다",
        "\"이번엔 진짜야\"를 매년 외친다",
        "3주 지나면 의욕이 스르륵 사라진다"
      ],
      damage: ["다이어리 17권", "실제로 쓴 건 1.2권", "작심삼일 횟수 — 셀 수 없음"],
      prescription: "90일짜리 다이어리 4번. 1년 약속을 90일 4개로 쪼개서 쓰기."
    },
    catchphrases: [
      "이번엔 진짜야",
      "내년부터 진짜 시작",
      "이거보다 좋은 거 찾았어"
    ],
    partners: {
      match: { emoji: "🐢", name: "준비만 거북이", line: "토끼가 끌고, 거북이가 끝낸다. 의외의 환상의 콤비." },
      clash: { emoji: "🐰", name: "또 다른 작심삼일 토끼", line: "둘이 모이면 다이어리만 14권. 시작만 하다 끝남." }
    }
  },

  sheep: {
    tag: "신중한 통째포기파",
    name: "🐑 올오어낫씽 양",
    color: "sheep",
    season: "Q2 — 수정 / 리모델링의 계절",
    oneline: "빈칸 2주 보이면 다이어리 영영 안 펴는 사람",
    empathy: \`<p>당신은 처음부터 신중한 사람입니다. 함부로 시작하지 않고, 시작했을 땐 끝까지 가고 싶은 사람.</p>
              <p>그런데 — 한 번 어긋나면 <strong>처음으로 되돌아갈 용기가 안 납니다.</strong> 빈칸 2주가 보이면, 그 다이어리는 영영 안 펴게 되죠.</p>
              <p>당신에게 부족한 건 의지가 아닙니다. <strong>실패해도 괜찮은 구조</strong>예요. 죄책감 없이 다시 시작할 수 있는 입구.</p>\`,
    strengths: ["계획 정밀함", "신중한 결정", "결과물의 질"],
    weaknesses: ["올오어낫씽 패턴", "회복 어려움", "죄책감 누적"],
    evidence: {
      quote: "\"실패해도 다시 시작할 입구가 있다는 게, 가장 큰 차이였어요.\"",
      framework: "심리학의 <b>올오어낫씽 사고(All-or-Nothing Thinking)</b>는 우울증·강박과 함께 자주 등장하는 인지 왜곡입니다. 한 번 어긋난 계획은 그 자체로는 실패가 아니지만, <b>리셋 입구가 없으면</b> 실패로 굳어지죠."
    },
    stories: [
      { icon: "📖", tag: "90일 가이드", title: "3주 자책은 끝 — 습관에 필요한 66일, 양에게 필요한 한 줄", url: GUIDE_URL },
      { icon: "✍️", tag: "회원 인사이트", title: "3월에 망친 다이어리를 4월에 다시 폈어요", url: "#story-sheep" }
    ],
    solutionTitle: "당신에게 필요한 건 \"리셋 버튼\"입니다.",
    solutionBody: "메아리셋은 90일마다 새 노트로 갈아탑니다. 지난 시즌이 망했어도 다음 시즌은 빈 페이지부터. 분기 끝에 \"새 챕터를 써보세요\"라는 자연스러운 초대가 옵니다. 양에게 가장 필요한 — 죄책감 면제권이에요.",
    echo: "\"실패해도 괜찮다는 약속이 있을 때, 비로소 다시 시작할 수 있다.\"",
    diagnosis: {
      name_kr: "올오어낫씽증후군",
      code: "All-or-Nothing Syndrome",
      symptoms: [
        "빈칸 2주가 보이면 다이어리를 영영 못 편다",
        "\"다음 분기부터\"를 1년에 8번씩 말한다",
        "죄책감이 알아서 불어난다"
      ],
      damage: ["시작 12번", "끝까지 간 적 0번", "망친 시즌 18개"],
      prescription: "빈칸 봐도 죄책감 안 드는 시즌제 다이어리. 90일마다 새 노트로 강제 리셋."
    },
    catchphrases: [
      "아, 망했다",
      "다음 분기부터 다시",
      "이번 건 그냥 없던 걸로"
    ],
    partners: {
      match: { emoji: "🐱", name: "마이웨이 고양이", line: "고양이가 \"뭐 어때\"라고 해주는 순간 양이 다시 다이어리를 편다." },
      clash: { emoji: "🦔", name: "비교병 고슴도치", line: "한 명이 멈추면 다른 한 명도 따라 멈춤. 부정 사이클." }
    }
  },

  squirrel: {
    tag: "새벽 3시의 잠수왕",
    name: "🐿️ 폭주 다람쥐",
    color: "squirrel",
    season: "Q3 — 몰입 / 집중의 계절",
    oneline: "하루 6시간 몰입했다가 일주일 잠수타는 사람",
    empathy: \`<p>당신은 폭발력이 있는 사람입니다. 한번 켜지면 한 시간에 남이 일주일 할 일을 끝내는 사람.</p>
              <p>그런데 — <strong>그 스위치가 자기 마음대로 켜지질 않습니다.</strong> 컨디션·기분·날씨에 따라 들쑥날쑥. 일관성 있는 \"성실한 나\"는 본 적이 없죠.</p>
              <p>당신에게 1년 다이어리는 너무 평평합니다. 매일 같은 분량의 빈칸은 다람쥐의 폭발과 침체를 담아내지 못해요. <strong>스프린트 단위의 도구</strong>가 맞습니다.</p>\`,
    strengths: ["단기 폭발력", "결과물 빠름", "몰입 깊이"],
    weaknesses: ["지속력 부족", "컨디션 의존", "마무리 약함"],
    evidence: {
      quote: "\"꺼지는 게 문제가 아니라, 다시 켜질 입구가 없었다.\"",
      framework: "스포츠심리학과 인지심리학의 공통 결론: <b>인간의 몰입력은 평탄하지 않고 \"파동\"</b>입니다. 1년 단위의 균질한 약속은 다람쥐의 본성과 충돌해요. <b>12주 스프린트</b>는 인지 폭발력의 자연 주기와 일치합니다."
    },
    stories: [
      { icon: "📖", tag: "90일 가이드", title: "재능은 멈추지만 끈질김은 도착합니다 — 다람쥐를 위한 그릿", url: GUIDE_URL },
      { icon: "✍️", tag: "회원 인사이트", title: "꺼졌다 켜졌다 했는데, 90일은 끝까지 가봤어요", url: "#story-squirrel" }
    ],
    solutionTitle: "균질한 1년이 아니라, 폭발하는 12주.",
    solutionBody: "메아리셋은 12주(90일) 스프린트 구조입니다. 균일한 1년이 아니라, 12주 안에 한 챕터를 끝내는 단위. 다람쥐의 몰입력은 12주에 완벽히 맞습니다. 한 번 식어도 다음 분기에 다시 켜지면 돼요.",
    echo: "\"꺼지는 게 문제가 아니라, 다시 켜질 입구가 없는 게 문제다.\"",
    diagnosis: {
      name_kr: "폭주 후 잠수병",
      code: "Burn-and-Vanish",
      symptoms: [
        "하루 6시간 몰입하고 그 다음 일주일은 잠수",
        "평일 10일 중 8일은 \"오늘 안 켜지네\"로 끝",
        "꾸준함은 측정 불가"
      ],
      damage: ["평균 몰입 1.5일", "\"성실한 내 모습\" 본 적 0회", "컨디션 핑계 1,460번"],
      prescription: "폭발도 침체도 다 담는 90일짜리 다이어리. 다람쥐한테 딱 맞는 주기."
    },
    catchphrases: [
      "오늘은 컨디션이 안 와서",
      "오늘 켜졌으니 끝까지 가자",
      "내일 새벽에 몰아서 하자"
    ],
    partners: {
      match: { emoji: "🐻", name: "자책 곰", line: "다람쥐가 폭발할 때 곰이 차분히 받아 적는다. 아이디어 + 누적." },
      clash: { emoji: "🐢", name: "준비만 거북이", line: "다람쥐가 너무 빨라서 거북이가 더 굳어버린다." }
    }
  },

  bear: {
    tag: "부지런한 자기검열러",
    name: "🐻 자책 곰",
    color: "bear",
    season: "Q4 — 수확 / 성찰의 계절",
    oneline: "잘해놓고도 못한 것만 줄 그어가며 보는 사람",
    empathy: \`<p>당신은 성실한 사람입니다. 묵묵히 누적시키고, 어느 순간 돌아보면 꽤 많은 걸 해온 사람.</p>
              <p>그런데 — <strong>당신은 그걸 자기 공으로 못 돌립니다.</strong> 잘한 일은 \"운이 좋았지\", 못한 일은 \"내가 부족해서\". 셀프 보상이 약하니, 다음 단계로 넘어가는 동력이 부족하죠.</p>
              <p>당신이 정말 필요한 건 새 출발이 아닙니다. <strong>\"여기까지 잘 왔다\"고 적어두는 회고 시간</strong>이에요.</p>\`,
    strengths: ["꾸준함", "누적의 힘", "성실"],
    weaknesses: ["셀프 칭찬 부족", "회고 안 함", "다음 단계 진입 어려움"],
    evidence: {
      quote: "\"잘 한 일을 적어두지 않으면, 그건 일어나지 않은 일이 됩니다.\"",
      framework: "교육심리학의 <b>회고적 학습 이론(Dunlosky 외 메타분석)</b>: 단순 반복보다 <b>주기적 회고와 자기설명(self-explanation)</b>이 학습·성취의 정착률을 크게 높입니다. 곰의 성실은 회고 없이는 \"흔적\"으로 남지 않아요."
    },
    stories: [
      { icon: "📖", tag: "90일 가이드", title: "어제의 나와 비교하면 도파민 보상이 켜집니다 — 곰의 도파민 회로", url: GUIDE_URL },
      { icon: "✍️", tag: "회원 인사이트", title: "잘한 일을 처음으로 제 공으로 돌렸어요", url: "#story-bear" }
    ],
    solutionTitle: "적은 것이 돌아와, 자기 칭찬이 됩니다.",
    solutionBody: "메아리셋의 슬로건은 \"적어라, 메아리되어 돌아온다\"예요. 매주 3줄, 분기 끝엔 90일치 메아리가 돌아옵니다. 곰의 성실이 처음으로 \"보이는 형태\"가 되는 거죠. 분기 회고 페이지가 곰을 위해 만들어졌어요.",
    echo: "\"당신이 적은 것은 반드시 돌아온다. 이번엔 자기 칭찬으로.\"",
    diagnosis: {
      name_kr: "만성 자기탓 증후군",
      code: "Chronic Self-Criticism",
      symptoms: [
        "잘한 일은 보자마자 \"운이 좋았네\"로 넘긴다",
        "못한 일만 형광펜으로 줄 그어 다시 읽는다",
        "스스로한테 \"고생했다\" 한 번도 안 한다"
      ],
      damage: ["자기 칭찬 0번", "기분 좋아지는 회로 휴면", "번아웃 위험도 87%"],
      prescription: "\"잘한 것만 적는 칸\" 의무. 어제의 나랑만 비교하는 시스템 꼭 쓰기."
    },
    catchphrases: [
      "이 정도는 다들 하는 거지",
      "운이 좋았네",
      "(자기 칭찬 한 번도 안 함)"
    ],
    partners: {
      match: { emoji: "🐰", name: "작심삼일 토끼", line: "토끼가 옆에서 \"오늘 잘했어!\" 외쳐주는 게 곰한텐 약." },
      clash: { emoji: "🐻", name: "또 다른 자책 곰", line: "둘이 만나면 같이 자기 까기 무한루프. 칭찬 0회." }
    }
  },

  turtle: {
    tag: "꼼꼼한 결제러",
    name: "🐢 준비만 거북이",
    color: "turtle",
    season: "Q0 — 발화 이전 / 준비의 시간",
    oneline: "강의·앱·책 12개 결제, 끝까지 본 건 0개의 사람",
    empathy: \`<p>당신은 함부로 시작하지 않는 사람입니다. 충분한 정보 위에서 움직이고 싶은 사람.</p>
              <p>그런데 — <strong>정보는 모일수록 시작이 멀어집니다.</strong> 책 7권, 강의 5개, 앱 12개. 그리고 시작은 아직.</p>
              <p>당신에게 부족한 건 정보가 아닙니다. 정보가 너무 많아서 못 시작하는 거예요. <strong>90일이라는 명확한 단위</strong>가, 마비된 분석을 풀어줍니다.</p>\`,
    strengths: ["신중함", "정보 큐레이션", "리스크 감지"],
    weaknesses: ["분석 마비", "시작 지연", "정보 수집에 시간 소진"],
    evidence: {
      quote: "\"정보가 부족해서 못 시작한 게 아니라, 너무 많아서 못 시작했어요.\"",
      framework: "심리학자 Barry Schwartz의 <b>선택의 역설(Paradox of Choice)</b> — 옵션이 늘면 결정이 마비됩니다. 거북이에게 필요한 건 더 많은 정보가 아니라, <b>\"6칸 안에 다 담아라\"</b>는 강제 단순화예요."
    },
    stories: [
      { icon: "📖", tag: "90일 가이드", title: "하루 5분, 한 줄이면 1%입니다 — 거북이의 시작법", url: GUIDE_URL },
      { icon: "✍️", tag: "회원 인사이트", title: "6칸짜리 페이지가, 6개월 결제 마비를 풀었어요", url: "#story-turtle" }
    ],
    solutionTitle: "준비를 끝낼 단 6칸.",
    solutionBody: "메아리셋의 준비 페이지는 이번 90일 목표 6가지만 적게 합니다. 6칸. 더 못 적습니다. 정보 마비가 풀리는 순간이에요. 다음 페이지부턴 그 6가지만 따라가면 돼요. 거북이가 처음으로 \"가벼워지는\" 시스템입니다.",
    echo: "\"정보가 부족해서 시작 못 하는 사람은 없다. 정보가 너무 많아서 못 시작할 뿐이다.\"",
    diagnosis: {
      name_kr: "영구 준비 모드",
      code: "Permanent Prep Mode",
      symptoms: [
        "강의·앱·책은 잘 사는데 시작은 안 한다",
        "\"준비 더 하고\"를 하루에 한 번씩 말한다 (1년에 365번)",
        "첫 페이지가 빈 채로 끝나는 비율 92%"
      ],
      damage: ["결제 12건", "끝까지 본 거 0건", "\"준비 중\" 총 38개월"],
      prescription: "5분, 한 줄짜리 가벼운 시작. 시작이 무거우면 영원히 못 시작."
    },
    catchphrases: [
      "조금만 더 알아보고",
      "준비가 더 되면",
      "이 강의 다 듣고 나서"
    ],
    partners: {
      match: { emoji: "🐱", name: "마이웨이 고양이", line: "둘 다 서두르지 않는 평화. 거북이가 처음으로 안 조급해함." },
      clash: { emoji: "🐿️", name: "폭주 다람쥐", line: "다람쥐의 텐션이 거북이를 얼어붙게 만든다." }
    }
  },

  hedgehog: {
    tag: "다정한 비교중독자",
    name: "🦔 비교병 고슴도치",
    color: "hedgehog",
    season: "전 시즌 공통 — 비교의 위기",
    oneline: "인스타 30분 보면 자존감 –50되는 사람",
    empathy: \`<p>당신은 예민한 사람입니다. 다른 사람의 성과를 잘 알아채고, 그 성과 앞에서 자신이 작아지는 걸 느끼는 사람.</p>
              <p>그런데 — <strong>비교는 시작 전에도, 진행 중에도, 끝난 후에도 당신을 멈추게 합니다.</strong> SNS 한 번에 한 달 의지가 흔들리죠.</p>
              <p>당신에게 필요한 건 더 큰 의지가 아닙니다. <strong>당신만의 90일 챕터</strong>예요. 비교가 끼어들 틈이 없는, 자기만의 단위.</p>\`,
    strengths: ["감수성", "타인 성과 인지력", "디테일 강함"],
    weaknesses: ["비교 마비", "자기 효능감 약함", "SNS 후 무기력"],
    evidence: {
      quote: "\"남의 1년이 내 90일과 같은 시간이 아니라는 걸 알게 됐어요.\"",
      framework: "사회심리학의 <b>사회비교이론(Festinger, 1954)</b>은 비교 사고가 자기효능감을 떨어뜨린다는 걸 보여줍니다. 1년은 누구나 비교 가능한 단위지만, <b>90일은 자기만의 시즌</b> — 비교가 끼어들 자리가 없어요."
    },
    stories: [
      { icon: "📖", tag: "90일 가이드", title: "경쟁자는 단 한 명, 어제의 자신 — 고슴도치의 사회적 비교 끊기", url: GUIDE_URL },
      { icon: "✍️", tag: "회원 인사이트", title: "남의 1년이 제 90일과 같은 시간이 아니더라고요", url: "#story-hedgehog" }
    ],
    solutionTitle: "남의 1년과 비교될 수 없는, 내 90일.",
    solutionBody: "메아리셋의 90일은 누구와도 비교 안 되는 당신만의 챕터입니다. 1년은 비교의 단위지만, 90일은 자기만의 시즌. SNS의 \"올해 100% 달성\"은 당신의 90일과 무관합니다. 당신은 4개의 챕터를 가질 거예요.",
    echo: "\"다른 사람의 1년은 당신의 90일과 같은 시간이 아니다.\"",
    diagnosis: {
      name_kr: "SNS 자존감 추락",
      code: "Social Comparison Drain",
      symptoms: [
        "인스타 30분이면 자존감 -50",
        "\"쟤는 어떻게 저렇게…\"를 하루 12번 말한다",
        "비교한 직후엔 다이어리부터 덮어버린다"
      ],
      damage: ["내가 한 일 90%는 까먹음", "멈추는 횟수 주 5회", "내가 얼마나 했는지 안 보임"],
      prescription: "비교 대상이 \"어제의 나\"뿐인 다이어리. SNS 안 봐도 내가 얼마나 했는지 한눈에 보임."
    },
    catchphrases: [
      "쟤는 어떻게 저렇게…",
      "나는 왜 이러지",
      "오늘은 그냥 쉬자"
    ],
    partners: {
      match: { emoji: "🐱", name: "마이웨이 고양이", line: "고양이의 \"굳이?\" 한 마디가 고슴도치의 비교를 끊어준다." },
      clash: { emoji: "🐰", name: "작심삼일 토끼", line: "토끼의 매년 새 시작 자랑이 고슴도치한텐 비교거리." }
    }
  },

  cat: {
    tag: "쿨한 마이웨이러",
    name: "🐱 마이웨이 고양이",
    color: "cat",
    season: "시즌 외 — 자기만의 시간",
    oneline: "새해 결심 안 정하고도 멀쩡하게 사는 사람",
    empathy: \`<p>당신은 흐름에 휩쓸리지 않는 사람입니다. 다이어리·플래너·SNS 같은 도구에 매이지 않고, 자기만의 페이스로 살아온 사람.</p>
              <p>그런데 — 가끔 <strong>"내가 어디로 가고 있는 건가"</strong> 하는 생각이 스칩니다. 외부에 휘둘리지 않은 만큼, 방향을 잡아줄 단서도 적었던 거죠.</p>
              <p>당신에게 필요한 건 시스템이 아닐 수도 있어요. 다만, <strong>강요 없이 90일만 가볍게 적어보는 시도</strong> — 그게 시작이 될 수 있습니다.</p>\`,
    strengths: ["자기 페이스", "외부에 안 휘둘림", "독립성"],
    weaknesses: ["방향 단서 부족", "변화 동기 약함", "자기 피드백 X"],
    evidence: {
      quote: "\"굳이 따라가지 않은 게, 가장 큰 자유였어요.\"",
      framework: "심리학의 <b>자기결정 이론(Deci & Ryan)</b>은 외부 압력에 흔들리지 않는 자율성이 회복력의 핵심임을 보여줍니다. 다만 자율성이 깊어질수록 <b>자기를 비추는 거울</b>이 가끔은 필요하죠. 90일은 강요가 아닌 자기 단위로 작동합니다."
    },
    stories: [
      { icon: "📖", tag: "90일 가이드", title: "혼자 작심삼일, 함께면 100일 — 고양이를 위한 거울 신경 시스템", url: GUIDE_URL },
      { icon: "✍️", tag: "회원 인사이트", title: "강요 없는 90일, 그래서 처음으로 적어봤어요", url: "#story-cat" }
    ],
    solutionTitle: "강요 없는 90일, 가볍게 한 번.",
    solutionBody: "메아리셋의 90일은 강제가 없습니다. 매일 적어야 하는 것도 아니고, 빠지면 안 되는 것도 아니에요. 고양이형의 자기 페이스를 그대로 유지하면서, 90일 끝에 \"내가 이런 시간을 보냈구나\" 하는 메아리만 받아보세요. 가벼운 실험으로 시작해도 충분합니다.",
    echo: "\"휘둘리지 않는 사람에게도, 자기를 비추는 거울은 가끔 필요하다.\"",
    diagnosis: {
      name_kr: "진단 거부형 / 정상범위",
      code: "Normal Range",
      symptoms: [
        "새해 결심 0개",
        "다이어리 없이도 잘 산다",
        "\"왜 그렇게까지?\"를 입에 달고 산다"
      ],
      damage: ["피해 없음", "본인 만족도 88점"],
      prescription: "무리한 처방 없음. 호기심 생기면 90일만 가볍게 해보기 (강요 X)."
    },
    catchphrases: [
      "굳이?",
      "그냥 살아도 되는데",
      "스트레스받지 마"
    ],
    partners: {
      match: { emoji: "🐢", name: "준비만 거북이", line: "둘 다 서두르지 않음. 페이스가 맞아 평화로움." },
      clash: { emoji: "🐿️", name: "폭주 다람쥐", line: "다람쥐의 새벽 3시 텐션이 고양이한텐 너무 피곤하다." }
    }
  }
};

// ---------- STORY IMAGES (v2.4 — 동물별 일러스트 4장 매핑) ----------
// 각 동물 sections 배열의 인덱스(0~4)에 해당하는 이미지 경로.
// 일부 섹션은 일러스트 없음 (key 누락 = 텍스트만 렌더).
const STORY_IMG_BASE = "동물별 사진/스토리사진/";
const STORY_IMAGES = {
  rabbit: {
    0: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 05_11_24 (1).png", // §1 큰 목표에 지쳤어요
    2: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 05_11_24 (2).png", // §3 D-69
    3: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 05_11_24 (3).png", // §4 한 시즌 완주
    4: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 05_11_25 (4).png"  // §5 4번의 시작이 1년
  },
  sheep: {
    0: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 05_07_05 (1).png", // §1 빈칸 2주가 보이면 끝
    1: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 05_07_08 (2).png", // §2 다음 시즌으로 안 따라온다
    2: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 05_07_08 (3).png", // §3 끝까지 해볼래요
    3: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 05_07_09 (4).png"  // §4 4월 1일 새 노트 첫 페이지
  },
  squirrel: {
    0: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 05_07_09 (5).png", // §1 폭발 다음 침체
    1: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 05_07_09 (6).png", // §2 다시 켜질 입구
    2: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 05_07_10 (7).png", // §3 새벽 3시 다시 켜짐
    4: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 05_07_10 (8).png"  // §5 90일 끝까지
  },
  bear: {
    0: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 04_06_16 (1).png", // §1 셀프 칭찬 0회
    2: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 04_06_16 (2).png", // §3 5년 만의 자기 칭찬
    3: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 04_06_17 (3).png", // §4 어제의 나와 비교
    4: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 04_06_18 (4).png"  // §5 시즌 2 잘한 것만
  },
  turtle: {
    0: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 04_06_18 (5).png", // §1 결제 12 완독 0
    1: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 04_06_20 (6).png", // §2 6칸이라는 단어
    3: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 04_06_20 (7).png", // §4 첫 페이지가 비지 않은 시즌
    4: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 04_06_20 (8).png"  // §5 분석 마비가 움직임이
  },
  hedgehog: {
    0: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 03_52_51 (1).png", // §1 SNS 30분 = 다이어리 덮기
    1: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 03_52_51 (2).png", // §2 90일은 자기만의 시즌
    2: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 03_52_53 (3).png", // §3 2월 10일 비교가 안 되는 날
    3: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 03_52_54 (4).png"  // §4 내 90일만 보는 페이지
  },
  cat: {
    0: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 03_52_54 (5).png", // §1 0권 결심 0개
    1: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 03_52_55 (6).png", // §2 강요 없는 90일
    2: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 03_52_56 (7).png", // §3 3주차 첫 한 줄
    4: STORY_IMG_BASE + "ChatGPT Image 2026년 5월 18일 오후 03_52_57 (8).png"  // §5 90일에 한 페이지면 됐어요
  }
};

// ---------- STORIES (회원 인사이트 v0.2 — 7편) ----------
// 페르소나 기반 시뮬레이션 사례. 해시 라우팅(#story-{key})으로 진입.
const STORIES = {
  rabbit: {
    headline: "8년 만에 처음, 다이어리가 2월을 넘어갔어요",
    subtitle: "작심삼일 토끼형 / 32세 / 마케터",
    hook: "매년 1월에 다이어리를 새로 사던 사람이, 처음으로 같은 다이어리를 4월에도 펴고 있어요.",
    sections: [
      { h: "만나기 전, 17권의 다이어리", body: \`<p>제 책상 서랍에는 다이어리 17권이 있어요. 2018년 1월 1일에 산 것도, 2025년 1월 1일에 산 것도 모두 거기 있어요. 공통점은 — 모두 2월 14일쯤에서 끝났다는 거예요.</p><p>매년 1월 1일이 되면 "이번엔 진짜야"라고 다짐했어요. 의욕은 컸어요. 한 달에 책 10권, 매일 운동, 매주 회고. 빼곡한 계획을 첫 페이지에 적었죠. 그리고 — 3주 안에 의욕이 다 타버렸어요.</p><p>그게 8년 반복됐어요.</p>\` },
      { h: \`"90일"이라는 단어\`, body: \`<p>올해 1월, 인스타그램에서 "90일"이라는 단어를 봤어요. 처음엔 "또 다른 다이어리"라고 생각했죠. 그런데 한 줄이 마음에 걸렸어요. <strong>"1년이 아니라 90일짜리 약속."</strong></p><p>1년은 너무 길었던 건 사실이었거든요. 17권의 다이어리가 그걸 증명하고 있었어요.</p>\` },
      { h: "1월 22일, 또 멈출 뻔한 날", body: \`<p>시즌 1을 시작한 지 3주째, 펜이 잘 안 잡혔어요. 매년 멈추던 그 자리. 평소 같으면 다이어리를 덮었을 텐데, 그날 페이지를 펴자 시즌 카운트다운이 보였어요. <strong>"D-69, 3월 31일 시즌 마감."</strong></p><p>"3월 31일이면 끝나는 거잖아." 그 한 문장이 머리를 흔들었어요. 끝이 보이니까 다시 펴졌어요. 1년은 끝이 안 보였는데, 90일은 끝이 보였어요.</p>\` },
      { h: "3월 31일, 메아리가 돌아온 날", body: \`<p>시즌 1 마지막 페이지에서 90일치 적은 게 한 번에 보였어요. 매일은 못 적었지만, 절반쯤은 채워져 있었어요. 처음이었어요 — "한 시즌을 완주했다"는 감각이.</p><p>4월 1일, 새 노트가 시작됐어요. 시즌 1은 끝났고, 시즌 2가 새로 시작된 거예요. 1년이 아니라, 시즌 2.</p>\` },
      { h: "지금, 그리고 다음", body: \`<p>시즌 2가 60일째 진행 중이에요. 시즌 1보다 더 잘 적고 있어요. 매일 안 적어도 죄책감이 없어요. "다음 시즌이 또 오니까."</p><p>올해 12월 31일이면 4권의 시즌 노트가 모일 거예요. 그게 제가 8년 만에 처음 가져보는 "다이어리 1년"이에요. 1년짜리 다이어리 한 권이 아니라, 90일짜리 4권으로 만들어진 1년.</p>\` }
    ],
    closing: "토끼는 1년이 아니라 4번의 시작이 맞았어요.",
    guideTitle: "거창한 목표가 토끼를 무너뜨립니다 — 매일 1cm면 충분"
  },

  sheep: {
    headline: "3월에 망친 다이어리를 4월에 다시 폈어요",
    subtitle: "올오어낫씽 양형 / 29세 / 디자이너",
    hook: "빈칸 2주가 보이면 다이어리를 영영 안 펴던 사람이, 4월 1일에 새 노트를 펼치고 있어요.",
    sections: [
      { h: "빈칸 2주가 보이면, 끝", body: \`<p>저는 다이어리를 정성스럽게 쓰는 사람이었어요. 함부로 사지 않았고, 시작했을 땐 꼼꼼하게. 하지만 — 빈칸 2주가 보이는 순간, 그 다이어리는 끝이었어요.</p><p>매년 똑같았어요. 1월 시작, 3월 7일 빈칸 2주 발견, 4월부턴 서랍 안. 작년에도, 재작년에도. 5년째 같은 패턴이었어요. "이번 분기는 그냥 없던 걸로." 매년 4번 그 말을 했어요.</p><p>자책했죠. "왜 또 망쳤을까." 그런데 자책할수록 다이어리는 더 멀어졌어요.</p>\` },
      { h: \`"다음 시즌으로 안 따라온다"\`, body: \`<p>작년 말, 친구가 메아리셋 얘기를 했어요. 90일마다 새 노트가 시작된대요. <strong>"빈칸이 있어도 다음 시즌으로 안 따라온다"</strong>는 한 마디가 솔깃했어요.</p><p>저한테 필요한 건 더 강한 의지가 아니라, 죄책감이 누적되지 않는 구조였거든요.</p>\` },
      { h: "시즌 1, 또 망친 순간", body: \`<p>1월에 시즌 1을 시작했어요. 잘 적다가, 2월 말부터 또 빈칸 2주. 평소 같으면 덮었어요. 이미 익숙한 패턴이니까.</p><p>그런데 3월 31일에 시즌 1 마무리 알림이 왔어요. "이번 시즌이 끝납니다." 그 순간 처음으로 든 생각: "어차피 4월 1일이면 새 노트인데, 마지막 며칠은 적어볼까?"</p><p>빈칸을 메우려는 게 아니었어요. <strong>빈칸은 빈칸으로 두고, 마지막 며칠만 새로 적자.</strong> 그게 가능하다는 게 신기했어요.</p>\` },
      { h: "4월 1일, 새 노트 첫 페이지", body: \`<p>분기 끝에 알람이 한 번 더 와요. "새 시즌이 시작됩니다." 4월 1일에 새 노트를 펴는데, 첫 페이지가 빈 상태였어요.</p><p>당연한 거잖아요. 새 노트니까. 그런데 저한테는 그게 처음 보는 광경이었어요. 망친 다이어리 위에 또 적는 게 아니라, <strong>진짜 새 노트의 첫 페이지를 펴는 일</strong>.</p><p>죄책감이 없었어요. 시즌 1의 빈칸 2주는 더 이상 "실패"가 아니었어요. "잠시 멈춤"으로 보였어요.</p>\` },
      { h: "지금, 양 평생 최고 기록", body: \`<p>시즌 2 60일째. 시즌 1 (망친 분기) + 시즌 2 (현재) = <strong>누적 60일 적었어요.</strong> 양으로 살아온 5년 중에 제일 많이 적은 거예요.</p><p>올해 안에 한 번 더 빈칸 2주를 만날 거라고 생각해요. 그때 저는 다이어리를 덮지 않을 거예요. 시즌은 또 끝나고, 새 노트는 또 시작될 거니까요.</p>\` }
    ],
    closing: "양에게 필요했던 건 강한 의지가 아니라, 죄책감 없이 다시 시작할 입구였어요.",
    guideTitle: "3주 자책은 끝 — 습관에 필요한 66일, 양에게 필요한 한 줄"
  },

  squirrel: {
    headline: "꺼졌다 켜졌다 했는데, 90일은 끝까지 가봤어요",
    subtitle: "폭주 다람쥐형 / 27세 / 프리랜서 개발자",
    hook: "하루 6시간 몰입했다가 일주일 잠수타던 사람이, 90일은 끝까지 가본 적이 있어요.",
    sections: [
      { h: \`만나기 전, "성실한 나"를 본 적 없음\`, body: \`<p>저는 폭발력이 있는 사람이에요. 한번 켜지면 한 시간에 남이 하루 할 일을 끝내요. 문제는 — 그 다음 일주일은 펜도 안 잡는다는 거예요.</p><p>평일 10일 중 8일은 "오늘 안 켜지네"로 끝나요. 12주 평균을 내보면 켜진 날 1.5일, 꺼진 날 13일. 1년 다이어리는 매일 같은 빈칸을 요구해요. 다람쥐의 폭발과 침체를 못 담아내요.</p><p>그래서 매번 같은 다이어리 빈칸을 보면 자책했어요. "역시 나는 꾸준하지 못한 사람." <strong>"성실한 나"를 본 적이 한 번도 없었어요.</strong></p>\` },
      { h: \`"꺼져도 다시 켜질 입구"\`, body: \`<p>작년 말, 친구가 그러더라고요. "90일이 다람쥐한테 맞아." 무슨 말인지 그땐 몰랐어요. 그런데 한 카피를 봤어요. "꺼져도 다시 켜질 입구가 있는 다이어리."</p><p>다람쥐는 꺼지는 게 문제가 아니에요. 다시 켜질 입구가 없는 게 문제죠.</p>\` },
      { h: "새벽 3시, 다시 켜진 날", body: \`<p>시즌 1 시작 2주차, 2월 첫째 주에 6시간 폭주했어요. 그리고 그 다음 일주일은 완전 잠수. 평소 같으면 다이어리도 끝.</p><p>일주일 뒤 새벽 3시, 갑자기 다시 켜졌어요. 다이어리를 폈는데 — 빈 페이지가 그대로 저를 기다리고 있었어요. <strong>한 주 비었는데 책망하는 페이지가 없었어요.</strong> 그냥 비어 있는 페이지. 그 자리에 적기 시작했어요.</p><p>다람쥐한테 필요한 건 매일 빈칸을 채우는 의지가 아니었어요. 꺼졌다 다시 켜졌을 때 받아주는 페이지였어요.</p>\` },
      { h: "3월 31일, 18일이 누적된 페이지", body: \`<p>시즌 1 끝. 회고 페이지에서 데이터를 봤어요. "켜진 날 18일 / 꺼진 날 72일." 1년 단위로는 한 번도 보지 못한 데이터예요.</p><p>18일이라는 숫자가 작다고 느껴질 줄 알았어요. 그런데 한 페이지에 누적된 게 보이니까 다르더라고요. <strong>18일 동안 적은 것의 부피가 한 번에 보였어요.</strong> 다람쥐의 폭발이 처음으로 "흔적"으로 남은 거예요.</p>\` },
      { h: "지금, 그리고 다음", body: \`<p>시즌 2 진행 중. 켜진 날이 시즌 1의 18일에서 시즌 2 60일 시점 24일로 늘었어요. 꺼져 있어도 "다음 시즌 또 켜질 거니까"라는 감각이 생겼어요.</p><p>4번의 90일이 모이면 누적 켜진 날이 100일 가까이 될 거예요. <strong>그게 다람쥐의 다른 정의예요. 매일 켜진 사람이 아니라, 4번의 시즌에 켜진 날이 누적된 사람.</strong></p>\` }
    ],
    closing: "다람쥐는 꺼지는 게 문제가 아니라, 다시 켜질 입구가 없는 게 문제였어요.",
    guideTitle: "재능은 멈추지만 끈질김은 도착합니다 — 다람쥐를 위한 그릿"
  },

  bear: {
    headline: "잘한 일을 처음으로 제 공으로 돌렸어요",
    subtitle: "자책 곰형 / 34세 / 회사원 (5년차)",
    hook: \`잘해놓고도 "운이 좋았네"로 넘기던 사람이, 처음으로 "이거 내가 했네"라고 말한 순간이 있었어요.\`,
    sections: [
      { h: "만나기 전, 셀프 칭찬 0회", body: \`<p>저는 매일 묵묵히 일하는 사람이에요. 동료들은 저를 "성실하다"고 해요. 하지만 본인 입에서 그 말이 나온 적은 단 한 번도 없어요.</p><p>잘한 일은 보자마자 "운이 좋았네"로 넘겨요. 못한 일만 형광펜으로 줄 그어 다시 읽어요. 5년 동안 스스로한테 "고생했다" 한 번 한 적 없어요.</p><p>문제는 — 셀프 보상이 약하니까 <strong>다음 단계로 넘어가는 동력이 없어요.</strong> 묵묵히 누적은 시키는데, 그 누적이 자기 안에서 보상으로 돌아오지 않아요. 그래서 다음 시즌도 똑같이 묵묵히만 가요.</p>\` },
      { h: \`"적은 것이 돌아온다"\`, body: \`<p>메아리셋 슬로건을 봤어요. "적어라, 메아리되어 돌아온다." 처음엔 카피라고 생각했어요. 그런데 분기 끝에 회고 페이지가 "강제로" 와 있다는 부분이 솔깃했어요.</p><p>저는 회고를 안 하는 사람이거든요. 강제되지 않으면 못 해요.</p>\` },
      { h: "3월 31일, 5년 만의 자기 칭찬", body: \`<p>시즌 1, 매주 3줄씩만 적었어요. 큰 의미 없다고 느꼈죠. 그런데 3월 31일 시즌 회고 페이지를 폈을 때, 90일치 3줄이 한 페이지에 압축돼서 보였어요.</p><p>다 합치면 270줄이에요. 그게 한 페이지에 보이는데 — <strong>"이걸 내가 다 했네"</strong> 라는 말이 입에서 나왔어요. 5년 만에 처음으로 자기 칭찬 1회.</p>\` },
      { h: \`"어제의 나와 비교"\`, body: \`<p>회고 페이지에 칸이 하나 더 있었어요. "어제의 나와 비교." 90일 전의 저와 지금의 저를 적게 되어 있었어요.</p><p>평소엔 비교 대상이 항상 "남" 또는 "있어야 할 나"였어요. 그래서 매번 부족했죠. 그런데 <strong>"어제의 나"와 비교하니까 처음으로 늘어난 게 보였어요.</strong> 도파민 보상 회로가 처음으로 켜지는 감각이었어요.</p>\` },
      { h: "지금, 그리고 다음", body: \`<p>시즌 2 진행 중. 매주 3줄에 "잘한 것만 적는 칸"을 추가로 의무화했어요. 셀프 칭찬 누적 횟수가 시즌 1(1회) → 시즌 2 60일(11회)로 늘었어요.</p><p>올해 끝에는 4페이지의 회고가 모일 거예요. <strong>그게 처음으로 보는 내 1년이에요.</strong> 5년 동안 누적만 시켰지 "보이는 형태"는 없었거든요.</p>\` }
    ],
    closing: \`곰의 성실은 회고 없이는 "흔적"으로 남지 않더라고요.\`,
    guideTitle: "어제의 나와 비교하면 도파민 보상이 켜집니다 — 곰의 도파민 회로"
  },

  turtle: {
    headline: "6칸짜리 페이지가, 6개월 결제 마비를 풀었어요",
    subtitle: "준비만 거북이형 / 31세 / 변호사",
    hook: "강의·앱·책 12개를 결제하고도 첫 페이지를 못 펴던 사람이, 6칸 페이지 하나로 시작하게 됐어요.",
    sections: [
      { h: "만나기 전, 결제 12건 / 완독 0건", body: \`<p>작년 한 해 동안 자기계발 강의 5개, 다이어리 앱 12개, 책 7권을 결제했어요. 끝까지 본 건 0개예요.</p><p>매번 "준비가 좀 더 되면" 또는 "이 강의 다 듣고 나서"라고 했어요. 시작이 무거우면 영원히 못 시작한다는 걸 알면서도, 정보를 더 모으면 안전해질 거라 믿었어요.</p><p>그래서 12개월 동안 정보를 쌓고, 시작은 0일이었어요. <strong>첫 페이지가 빈 채로 끝나는 비율 92%.</strong></p>\` },
      { h: \`"6칸"이라는 단어\`, body: \`<p>메아리셋 소개에서 한 단어를 봤어요. "6칸." 이번 90일 목표를 6개만 적게 한다는 거예요. 더 못 적는다고. 정확히 6개.</p><p>"강제 단순화"라는 단어가 처음으로 와닿았어요. 저한테 부족했던 건 정보가 아니라, <strong>너무 많은 정보를 줄여줄 강제 단순화 도구</strong>였거든요.</p>\` },
      { h: "1월 5일, 30분 동안 6개로 추리는 시간", body: \`<p>시즌 1 첫 페이지를 폈는데 정말로 6칸만 있었어요. 적고 싶은 게 12개는 넘는데, 6개만 적게 되어 있었어요.</p><p>30분 동안 고민했어요. 어떤 6개를 살릴 것인가. 어떤 6개를 버릴 것인가. <strong>이게 그동안 못 했던 일이었어요.</strong> 정보를 모으는 데는 6개월을 썼는데, 추리는 데는 30분도 안 썼던 거예요.</p><p>6개로 추리고 나니 머리가 가벼워졌어요. 결제 마비가 "풀리는" 감각이었어요.</p>\` },
      { h: "2월 중순, 첫 페이지가 비지 않은 시즌", body: \`<p>시즌 1 시작 6주차. 6개 목표를 따라가니까 머리가 단순해졌어요. <strong>첫 페이지가 빈 채로 끝나는 일이 처음으로 안 일어났어요.</strong></p><p>매일 5분, 한 줄. 6개 중 어떤 거 했는지만 표시. 그게 다였어요. 무거운 강의도 안 듣고, 새 앱도 안 깔았어요. 그냥 6칸만.</p>\` },
      { h: "지금, 그리고 다음", body: \`<p>시즌 1 60일 진행. 6개 목표 중 4개 진행 중. 결제 안 한 강의·책이 누적 7개예요. 절약된 비용보다 더 중요한 건 — <strong>6개월 동안 분석 마비였던 게 처음으로 "움직임"이 됐다</strong>는 거예요.</p><p>다음 시즌에도 다시 6칸을 채울 거예요. 12개를 적는 사람으로 돌아가지 않을 거예요.</p>\` }
    ],
    closing: "거북이에게 부족했던 건 정보가 아니라, 정보를 줄여줄 강제 단순화 도구였어요.",
    guideTitle: "하루 5분, 한 줄이면 1%입니다 — 거북이의 시작법"
  },

  hedgehog: {
    headline: "남의 1년이 제 90일과 같은 시간이 아니더라고요",
    subtitle: "비교병 고슴도치형 / 26세 / SNS 마케터",
    hook: "인스타 30분만 봐도 자존감이 -50되던 사람이, 자기 90일을 따로 가진 후로 비교가 줄었어요.",
    sections: [
      { h: "만나기 전, SNS 30분 = 다이어리 덮기", body: \`<p>저는 SNS 마케터예요. 인스타를 안 볼 수가 없어요. 그런데 들어가면 30분 안에 다이어리부터 덮어요.</p><p>"쟤는 어떻게 저렇게…"를 하루 12번씩 말해요. 다른 사람의 성과가 너무 잘 보이는 게 제 페르소나예요. 그게 다정함의 다른 모습이긴 한데 — 비교한 직후엔 무기력이 와서 노트를 못 펴요.</p><p>자기 효능감은 점점 약해졌어요. <strong>"내가 한 일"보다 "남이 한 일"이 머릿속에 더 많이 차 있었거든요.</strong></p>\` },
      { h: \`"90일은 자기만의 시즌"\`, body: \`<p>메아리셋에서 한 줄을 봤어요. "1년은 누구나 비교 가능한 단위지만, 90일은 자기만의 시즌." 처음엔 이해 안 됐어요.</p><p>그런데 곰곰이 생각해봤어요. 인스타에서 자주 보이는 "올해 100일 챌린지" 같은 글은 다 1월 1일 시작. 다 같은 단위. 그래서 비교가 가능했던 거예요. <strong>90일은 시작점도 사람마다 다르고, 끝점도 달라요.</strong> 비교가 끼어들 자리가 없어요.</p>\` },
      { h: "2월 10일, 비교가 안 되는 날", body: \`<p>시즌 1 30일째, 인스타에서 "올해 100일 챌린지 80일 달성" 게시물을 봤어요. 평소대로면 노트 덮었을 거예요.</p><p>그런데 그날은 다른 생각이 들었어요. <strong>"저 100일은 1월 1일부터 시작. 내 90일은 1월 15일부터. 우리는 다른 시간을 살고 있다."</strong></p><p>비교가 처음으로 안 됐어요. 단위가 다르니까. 같은 시간에 다른 시즌을 사는 거였어요.</p>\` },
      { h: "3월 31일, 자기 데이터만 보는 페이지", body: \`<p>시즌 1 끝. 회고 페이지를 폈는데 — <strong>다른 사람 데이터가 없었어요.</strong> 90일치 제 메아리만 있었어요.</p><p>평소엔 다이어리도 SNS 옆에 두고 비교했거든요. 그런데 시즌 회고는 자기 90일만 보게 되어 있어요. 처음으로 깨끗한 자기 데이터를 봤어요. "내가 이만큼 했네"라는 감각이 비교 없이 왔어요.</p>\` },
      { h: "지금, 그리고 다음", body: \`<p>시즌 2 진행 중. 인스타 본 후에도 노트 펴는 비율이 70%로 회복됐어요. 시즌 1엔 30%였거든요. <strong>비교 횟수가 의식적으로 줄어들었어요.</strong> "내 90일이 따로 있으니까"라는 감각 때문에.</p><p>4번의 90일이 모이면 4페이지의 제 시간이에요. 남의 1년이 아니라.</p>\` }
    ],
    closing: "고슴도치의 경쟁자는 단 한 명, 어제의 자신이었어요.",
    guideTitle: "경쟁자는 단 한 명, 어제의 자신 — 고슴도치의 사회적 비교 끊기"
  },

  cat: {
    headline: "강요 없는 90일, 그래서 처음으로 적어봤어요",
    subtitle: "마이웨이 고양이형 / 33세 / 프리랜서 디자이너",
    hook: "한 번도 다이어리를 써본 적 없는 사람이, 처음으로 90일을 가볍게 적어봤어요.",
    sections: [
      { h: "만나기 전, 다이어리 0권 / 새해 결심 0개", body: \`<p>저는 다이어리를 산 적이 없어요. 새해 결심을 정한 적도 없어요. "왜 그렇게까지 해야 해?"가 입버릇이었어요.</p><p>외부 도구·시스템·SNS 챌린지 같은 거에 매이지 않고 살아왔어요. 자기 페이스대로요. 그게 자유였고, 후회한 적도 없어요.</p><p>그런데 가끔, 정말 가끔, 이런 생각이 스쳤어요. <strong>"내가 어디로 가고 있는 건가."</strong> 외부에 안 휘둘린 만큼 방향 단서가 적었던 거예요. 거울이 없는 거랑 비슷한 감각이었어요.</p>\` },
      { h: \`"강요 없는 90일"\`, body: \`<p>친구가 메아리셋 얘기를 하면서 한 줄을 했어요. "강요 없는 90일." 매일 안 적어도 되고, 빠져도 되고, 한 시즌만 가볍게.</p><p>이 말이 처음으로 마음에 걸렸어요. 시스템이 매일 적으라고 했으면 안 했을 거예요. 매일 안 적어도 된다니까 — 한번 해볼 수도 있겠다 싶었어요.</p>\` },
      { h: "첫 2주, 거의 안 적은 시간", body: \`<p>시즌 1 첫 2주는 거의 안 적었어요. 그래도 책임감이 안 들었어요. <strong>강요가 없으니까 죄책감도 없었어요.</strong></p><p>그러다 3주차 어느 날, 한 줄 적어봤어요. "오늘 카페에서 책 읽었다." 그게 다였어요. 그런데 그 한 줄을 적고 나니 기분이 묘했어요. "이게 다이어리구나" 하는 첫 감각.</p><p>거기서부턴 가끔 적었어요. 매일은 아니고. 일주일에 두세 번 정도.</p>\` },
      { h: "3월 31일, 한 페이지의 메아리", body: \`<p>시즌 1 끝에 회고 페이지를 폈어요. 적은 게 한 페이지밖에 안 됐어요. 페이지가 거의 비어 있었어요.</p><p>그런데도 — <strong>"이런 시간을 보냈구나"</strong> 라는 감각이 왔어요. 자기 페이스로 살아왔다는 게 처음으로 "보이는 형태"로 온 거예요. 한 페이지지만, 그 한 페이지가 거울이었어요.</p><p>휘둘리지 않는 사람한테도 자기를 비추는 거울은 가끔 필요하다는 걸 알게 됐어요. 매일은 아니고, 90일에 한 번 정도.</p>\` },
      { h: "지금, 그리고 다음", body: \`<p>시즌 2 진행 중. 시즌 1보다 조금 더 적게 됐어요 (그래도 여전히 가볍게). 다이어리 0권 → 1권째 보유. 새해 결심 0개는 그대로.</p><p>다음 시즌도 강요 없이 가볍게 갈 거예요. <strong>매일은 아니어도, 90일에 한 페이지면 됐어요.</strong> 4번의 시즌이 모이면 4페이지의 거울이 생길 거예요.</p>\` }
    ],
    closing: "휘둘리지 않는 사람한테도, 자기를 비추는 거울은 가끔 필요했어요.",
    guideTitle: "혼자 작심삼일, 함께면 100일 — 고양이를 위한 거울 신경 시스템"
  }
};

// ---------- ANIMAL SVG ----------
const ANIMAL_SVG = {
  rabbit: \`<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="70" cy="100" rx="38" ry="32" fill="#fff"/>
    <ellipse cx="56" cy="40" rx="8" ry="22" fill="#fff" stroke="#E8B5B5" stroke-width="2"/>
    <ellipse cx="84" cy="40" rx="8" ry="22" fill="#fff" stroke="#E8B5B5" stroke-width="2"/>
    <ellipse cx="56" cy="42" rx="3" ry="14" fill="#F8C8C8"/>
    <ellipse cx="84" cy="42" rx="3" ry="14" fill="#F8C8C8"/>
    <circle cx="70" cy="80" r="32" fill="#fff"/>
    <circle cx="60" cy="78" r="3" fill="#2C3639"/>
    <circle cx="80" cy="78" r="3" fill="#2C3639"/>
    <ellipse cx="70" cy="88" rx="3" ry="2" fill="#E8B5B5"/>
    <path d="M68 92 Q70 96 72 92" stroke="#2C3639" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <circle cx="50" cy="84" r="4" fill="#FBDADA" opacity="0.6"/>
    <circle cx="90" cy="84" r="4" fill="#FBDADA" opacity="0.6"/>
  </svg>\`,
  sheep: \`<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
    <circle cx="55" cy="75" r="14" fill="#fff"/>
    <circle cx="85" cy="75" r="14" fill="#fff"/>
    <circle cx="50" cy="65" r="13" fill="#fff"/>
    <circle cx="90" cy="65" r="13" fill="#fff"/>
    <circle cx="70" cy="58" r="14" fill="#fff"/>
    <circle cx="70" cy="80" r="22" fill="#fff"/>
    <ellipse cx="70" cy="85" rx="18" ry="14" fill="#3A3A3A"/>
    <circle cx="63" cy="82" r="2.5" fill="#fff"/>
    <circle cx="77" cy="82" r="2.5" fill="#fff"/>
    <ellipse cx="70" cy="92" rx="3" ry="2" fill="#222"/>
  </svg>\`,
  squirrel: \`<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
    <path d="M105 50 Q125 30 115 70 Q110 90 95 80" fill="#D4A574"/>
    <path d="M108 55 Q120 38 110 70" fill="#E8C290" opacity="0.6"/>
    <ellipse cx="65" cy="80" rx="32" ry="28" fill="#D4A574"/>
    <ellipse cx="65" cy="85" rx="20" ry="16" fill="#F4E0C2"/>
    <circle cx="55" cy="55" r="6" fill="#D4A574"/>
    <circle cx="75" cy="55" r="6" fill="#D4A574"/>
    <circle cx="55" cy="55" r="3" fill="#E8C290"/>
    <circle cx="75" cy="55" r="3" fill="#E8C290"/>
    <circle cx="58" cy="72" r="2.5" fill="#2C3639"/>
    <circle cx="72" cy="72" r="2.5" fill="#2C3639"/>
    <ellipse cx="65" cy="80" rx="2.5" ry="2" fill="#2C3639"/>
    <circle cx="48" cy="78" r="3" fill="#FBDADA" opacity="0.5"/>
    <circle cx="82" cy="78" r="3" fill="#FBDADA" opacity="0.5"/>
  </svg>\`,
  bear: \`<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
    <circle cx="46" cy="48" r="12" fill="#A89478"/>
    <circle cx="94" cy="48" r="12" fill="#A89478"/>
    <circle cx="46" cy="48" r="6" fill="#7A6850"/>
    <circle cx="94" cy="48" r="6" fill="#7A6850"/>
    <circle cx="70" cy="78" r="36" fill="#A89478"/>
    <ellipse cx="70" cy="88" rx="22" ry="18" fill="#D8C8B0"/>
    <circle cx="60" cy="76" r="3" fill="#2C3639"/>
    <circle cx="80" cy="76" r="3" fill="#2C3639"/>
    <ellipse cx="70" cy="88" rx="4" ry="3" fill="#2C3639"/>
    <path d="M66 94 Q70 98 74 94" stroke="#2C3639" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>\`,
  turtle: \`<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="48" cy="100" rx="8" ry="6" fill="#7A9583"/>
    <ellipse cx="100" cy="100" rx="8" ry="6" fill="#7A9583"/>
    <ellipse cx="55" cy="108" rx="6" ry="4" fill="#7A9583"/>
    <ellipse cx="95" cy="108" rx="6" ry="4" fill="#7A9583"/>
    <ellipse cx="115" cy="80" rx="6" ry="3" fill="#7A9583"/>
    <ellipse cx="75" cy="75" rx="42" ry="32" fill="#7A9583"/>
    <ellipse cx="75" cy="73" rx="36" ry="27" fill="#94B89A"/>
    <circle cx="75" cy="73" r="9" fill="none" stroke="#5A7163" stroke-width="1.5"/>
    <circle cx="60" cy="68" r="6.5" fill="none" stroke="#5A7163" stroke-width="1.5"/>
    <circle cx="90" cy="68" r="6.5" fill="none" stroke="#5A7163" stroke-width="1.5"/>
    <circle cx="63" cy="84" r="6" fill="none" stroke="#5A7163" stroke-width="1.5"/>
    <circle cx="87" cy="84" r="6" fill="none" stroke="#5A7163" stroke-width="1.5"/>
    <ellipse cx="32" cy="80" rx="14" ry="11" fill="#9DBFA3"/>
    <circle cx="28" cy="78" r="2.2" fill="#2C3639"/>
    <line x1="22" y1="84" x2="30" y2="84" stroke="#2C3639" stroke-width="1.5" stroke-linecap="round"/>
  </svg>\`,
  hedgehog: \`<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
    <g fill="#8B7AA8">
      <polygon points="55,52 60,38 65,52"/>
      <polygon points="65,48 70,32 75,48"/>
      <polygon points="75,46 81,28 87,46"/>
      <polygon points="85,48 91,32 97,48"/>
      <polygon points="93,54 98,40 103,54"/>
      <polygon points="48,58 53,44 58,58"/>
      <polygon points="42,68 47,54 52,68"/>
      <polygon points="98,68 103,54 108,68"/>
      <polygon points="60,62 65,48 70,62"/>
      <polygon points="70,60 75,44 80,60"/>
      <polygon points="80,62 85,48 90,62"/>
    </g>
    <ellipse cx="75" cy="85" rx="44" ry="30" fill="#B5A1C7"/>
    <ellipse cx="40" cy="85" rx="20" ry="16" fill="#E0D5EC"/>
    <ellipse cx="24" cy="85" rx="3.5" ry="3" fill="#2C3639"/>
    <circle cx="38" cy="80" r="2.2" fill="#2C3639"/>
    <ellipse cx="55" cy="112" rx="5" ry="3" fill="#9885B5"/>
    <ellipse cx="95" cy="112" rx="5" ry="3" fill="#9885B5"/>
  </svg>\`,
  cat: \`<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
    <!-- 귀 -->
    <polygon points="42,42 50,18 60,42" fill="#A8A095"/>
    <polygon points="80,42 90,18 98,42" fill="#A8A095"/>
    <polygon points="46,40 50,26 56,40" fill="#E8DDD0"/>
    <polygon points="84,40 90,26 94,40" fill="#E8DDD0"/>
    <!-- 머리 -->
    <ellipse cx="70" cy="62" rx="33" ry="29" fill="#A8A095"/>
    <!-- 얼굴 (밝은 부분) -->
    <ellipse cx="70" cy="68" rx="22" ry="18" fill="#E8DDD0"/>
    <!-- 눈 (감겨있음 — 관망 분위기) -->
    <path d="M53 60 Q60 57 67 60" stroke="#2C3639" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M73 60 Q80 57 87 60" stroke="#2C3639" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- 코 -->
    <path d="M67 70 L73 70 L70 74 Z" fill="#D49595"/>
    <!-- 입 -->
    <path d="M70 74 Q67 78 64 76" stroke="#2C3639" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M70 74 Q73 78 76 76" stroke="#2C3639" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <!-- 수염 -->
    <line x1="46" y1="68" x2="58" y2="69" stroke="#5C5550" stroke-width="1" stroke-linecap="round"/>
    <line x1="46" y1="73" x2="58" y2="73" stroke="#5C5550" stroke-width="1" stroke-linecap="round"/>
    <line x1="82" y1="69" x2="94" y2="68" stroke="#5C5550" stroke-width="1" stroke-linecap="round"/>
    <line x1="82" y1="73" x2="94" y2="73" stroke="#5C5550" stroke-width="1" stroke-linecap="round"/>
    <!-- 몸 -->
    <ellipse cx="70" cy="118" rx="32" ry="16" fill="#A8A095"/>
  </svg>\`
};

// ---------- STATE ----------
let currentQ = 0;
const answers = [];

// ---------- FLOW ----------
function startQuiz() {
  currentQ = 0;
  answers.length = 0;
  showScene("quiz");
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[currentQ];
  document.getElementById("questionText").textContent = q.q;
  document.getElementById("progressLabel").textContent = \`QUESTION \${currentQ + 1} / \${QUESTIONS.length}\`;
  const pct = Math.round(((currentQ + 1) / QUESTIONS.length) * 100);
  document.getElementById("progressPercent").textContent = pct + "%";
  document.getElementById("progressFill").style.width = pct + "%";

  // 뒤로 가기 버튼 — Q2부터만 표시
  const backBtn = document.getElementById("quizBack");
  if (currentQ > 0) backBtn.classList.add("visible");
  else backBtn.classList.remove("visible");

  const list = document.getElementById("optionsList");
  list.innerHTML = "";

  const opts = [...q.options].sort(() => Math.random() - 0.5);

  opts.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opt.t;
    btn.onclick = () => selectAnswer(opt.a);
    list.appendChild(btn);
  });

  window.scrollTo({ top: 0, behavior: "instant" });
}

function selectAnswer(animal) {
  answers.push({ q: currentQ, animal, isC: currentQ >= 8 });
  currentQ++;
  if (currentQ < QUESTIONS.length) {
    renderQuestion();
  } else {
    showLoading();
  }
}

function goBack() {
  if (currentQ === 0) return;
  currentQ--;
  answers.pop();  // 직전 답 취소
  renderQuestion();
  trackEvent("quiz_back", { from: currentQ + 1 });
}

function showLoading() {
  showScene("loading");
  const sublines = [
    "메아리가 돌아오는 중",
    "당신의 패턴을 정렬하고 있어요",
    "90일 회복 가능성을 분석 중",
    "결과 카드 준비 완료"
  ];
  let i = 0;
  document.getElementById("loaderSub").textContent = sublines[0];
  const interval = setInterval(() => {
    i++;
    if (i < sublines.length) {
      document.getElementById("loaderSub").textContent = sublines[i];
    }
  }, 700);
  setTimeout(() => {
    clearInterval(interval);
    computeAndShowResult();
  }, 2800);
}

function computeAndShowResult() {
  const scores = { rabbit: 0, sheep: 0, squirrel: 0, bear: 0, turtle: 0, hedgehog: 0 };
  let neutralCount = 0;
  answers.forEach(({ animal, isC }) => {
    if (animal === null) {
      neutralCount++;
      return;
    }
    scores[animal] += isC ? 1.5 : 1;
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [winnerAnimal, winnerScore] = sorted[0];

  trackEvent("quiz_neutral_count", { count: neutralCount });

  // 중립 카운트가 동물 최고점보다 많으면 → 고양이 (관망형)
  if (neutralCount > winnerScore) {
    trackEvent("quiz_result_cat", { neutral: neutralCount, top_animal_score: winnerScore });
    return showResult("cat");
  }

  showResult(winnerAnimal);
}

// v2.1: 동물 일러스트 이미지 매핑 (한글 파일명 그대로 사용 — 브라우저 자동 인코딩)
const ANIMAL_PHOTO = {
  rabbit: "토끼", sheep: "양", squirrel: "다람쥐", bear: "곰",
  turtle: "거북이", hedgehog: "고슴도치", cat: "고양이"
};
// v2.1: 파트너 이모지 → 동물 키 매핑 (궁합 카드 사진 변환용)
const EMOJI_TO_ANIMAL = {
  "🐰": "rabbit", "🐑": "sheep", "🐿️": "squirrel", "🐻": "bear",
  "🐢": "turtle", "🦔": "hedgehog", "🐱": "cat"
};
function partnerPhotoHTML(emoji, altName) {
  const animalKey = EMOJI_TO_ANIMAL[emoji];
  if (!animalKey) return emoji; // 폴백: 이모지 그대로
  return \`<img src="동물별 사진/\${ANIMAL_PHOTO[animalKey]}.png" alt="\${altName}" class="partner-photo" loading="lazy">\`;
}

function showResult(animalKey) {
  const r = RESULTS[animalKey];
  const card = document.getElementById("resultCard");
  card.className = "result-card " + r.color;
  document.getElementById("resultAnimal").innerHTML =
    \`<img src="동물별 사진/\${ANIMAL_PHOTO[animalKey]}.png" alt="\${r.name}" class="animal-photo" loading="eager">\`;
  document.getElementById("resultTag").textContent = r.tag;
  document.getElementById("resultName").textContent = r.name;
  document.getElementById("resultOneline").textContent = r.oneline;

  // v2.1: Diagnosis (진단서)
  document.getElementById("resultDiagName").textContent = r.diagnosis.name_kr;
  document.getElementById("resultDiagCode").textContent = r.diagnosis.code;
  const symUl = document.getElementById("resultDiagSymptoms");
  symUl.innerHTML = "";
  r.diagnosis.symptoms.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    symUl.appendChild(li);
  });
  document.getElementById("resultDiagDamage").innerHTML =
    r.diagnosis.damage.map(d => \`<div>· \${d}</div>\`).join("");
  document.getElementById("resultDiagRx").textContent = r.diagnosis.prescription;

  // v2.1: Catchphrases (입버릇)
  const cpOl = document.getElementById("resultCatchphrases");
  cpOl.innerHTML = "";
  r.catchphrases.forEach(c => {
    const li = document.createElement("li");
    li.textContent = \`"\${c}"\`;
    cpOl.appendChild(li);
  });

  // v2.1: Partners (궁합) — 사진으로 렌더링
  document.getElementById("resultMatchEmoji").innerHTML =
    partnerPhotoHTML(r.partners.match.emoji, r.partners.match.name);
  document.getElementById("resultMatchName").textContent = r.partners.match.name;
  document.getElementById("resultMatchLine").textContent = r.partners.match.line;
  document.getElementById("resultClashEmoji").innerHTML =
    partnerPhotoHTML(r.partners.clash.emoji, r.partners.clash.name);
  document.getElementById("resultClashName").textContent = r.partners.clash.name;
  document.getElementById("resultClashLine").textContent = r.partners.clash.line;

  document.getElementById("resultEmpathy").innerHTML = r.empathy;

  const sUl = document.getElementById("resultStrengths");
  const wUl = document.getElementById("resultWeaknesses");
  sUl.innerHTML = ""; wUl.innerHTML = "";
  r.strengths.forEach(s => { const li = document.createElement("li"); li.textContent = s; sUl.appendChild(li); });
  r.weaknesses.forEach(s => { const li = document.createElement("li"); li.textContent = s; wUl.appendChild(li); });

  // Evidence (권위)
  document.getElementById("resultEvidenceQuote").textContent = r.evidence.quote;
  document.getElementById("resultEvidenceFramework").innerHTML = r.evidence.framework;

  // Stories (사회적 증거)
  const animalNoun = r.name.replace(/^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]\s*/u, "");
  document.getElementById("resultStoriesHeadline").textContent = \`📖 다른 \${animalNoun}형의 90일 이야기\`;
  const storiesList = document.getElementById("resultStoriesList");
  storiesList.innerHTML = "";
  r.stories.forEach((s, i) => {
    const a = document.createElement("a");
    a.className = "story-card";
    const isInternal = (s.url || "").startsWith("#");
    a.href = isInternal ? s.url : appendUtm(s.url || CAFE_URL, animalKey, \`story_\${i + 1}\`);
    if (!isInternal) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    a.onclick = () => trackEvent("story_click", { animal: animalKey, idx: i + 1, tag: s.tag, internal: isInternal });
    a.innerHTML = \`
      <div class="story-icon">\${s.icon}</div>
      <div class="story-body">
        <div class="story-tag">\${s.tag}</div>
        <div class="story-title">\${s.title}</div>
      </div>
      <div class="story-arrow">→</div>
    \`;
    storiesList.appendChild(a);
  });

  // Solution card 제거됨 (v2.2 — 광고 톤 약화)

  // CTA URLs
  document.getElementById("ctaShop").href = appendUtm(SHOP_URL, animalKey, "cta_shop");
  document.getElementById("ctaCafe").href = appendUtm(CAFE_URL, animalKey, "cta_cafe");

  currentAnimal = animalKey;
  history.replaceState(null, "", "#result=" + animalKey);

  showScene("result");
  trackEvent("quiz_complete", { animal: animalKey });
}

// 결과·스토리 라우팅을 위한 현재 동물 키 (showResult / showStory에서 set)
let currentAnimal = null;

function showScene(name) {
  document.querySelectorAll(".scene").forEach(s => s.classList.remove("active"));
  document.getElementById(name).classList.add("active");
  window.scrollTo({ top: 0, behavior: "instant" });
}

// ---------- STORY VIEW (v2.3 — 회원 인사이트 해시 라우팅) ----------
function showStory(animalKey) {
  const story = STORIES[animalKey];
  if (!story) return;

  currentAnimal = animalKey;

  document.getElementById("storyHeadline").textContent = story.headline;
  document.getElementById("storySubtitle").textContent = story.subtitle;
  document.getElementById("storyHook").textContent = story.hook;

  const bodyEl = document.getElementById("storyBody");
  const imgMap = STORY_IMAGES[animalKey] || {};
  bodyEl.innerHTML = story.sections.map((s, i) => {
    const imgSrc = imgMap[i];
    const imgHtml = imgSrc
      ? \`<img class="story-image" src="\${encodeURI(imgSrc).replace(/\(/g, "%28").replace(/\)/g, "%29")}" alt="\${s.h}" loading="lazy">\`
      : "";
    return \`
    <div class="story-section">
      \${imgHtml}
      <div class="story-section-h">\${s.h}</div>
      <div class="story-section-body">\${s.body}</div>
    </div>
  \`;
  }).join("");

  document.getElementById("storyClosing").textContent = story.closing;

  const guideLink = document.getElementById("storyGuideLink");
  guideLink.href = appendUtm(GUIDE_URL, animalKey, "story_guide");
  document.getElementById("storyGuideTitle").textContent = story.guideTitle;

  showScene("story");
  trackEvent("story_view", { animal: animalKey });
}

function closeStory() {
  if (currentAnimal && RESULTS[currentAnimal]) {
    // 결과 hash로 복귀 → hashchange가 result 뷰로 전환
    if (location.hash === "#result=" + currentAnimal) {
      // 같은 hash라 hashchange 안 뜸 → 직접 scene 전환
      showScene("result");
    } else {
      location.hash = "#result=" + currentAnimal;
    }
  } else {
    location.hash = "";
    showScene("landing");
  }
}

// 해시 변경 감지 (카드 클릭, 뒤로가기, URL 직접 입력)
window.addEventListener("hashchange", () => {
  const h = location.hash;
  const storyMatch = h.match(/^#story-(\w+)$/);
  const resultMatch = h.match(/^#result=(\w+)$/);

  if (storyMatch && STORIES[storyMatch[1]]) {
    showStory(storyMatch[1]);
  } else if (resultMatch && RESULTS[resultMatch[1]]) {
    // 이미 결과 렌더된 동물이면 scene만 전환, 아니면 새로 렌더
    if (currentAnimal === resultMatch[1]) {
      showScene("result");
    } else {
      showResult(resultMatch[1]);
    }
  }
});

function restartQuiz() {
  history.replaceState(null, "", location.pathname);
  currentAnimal = null;
  showScene("landing");
}

function shareLink() {
  // 모바일: Web Share API (카카오톡·메시지·인스타·메일 등 사용자가 선택)
  // 데스크톱: 클립보드 복사 + 토스트
  if (navigator.share) {
    navigator.share({
      title: "내가 목표를 이룰 수 있을까? — 메아리셋",
      text: "다이어리 5번 실패한 당신의 90일 패턴을 진단해드려요.",
      url: location.href
    }).then(() => trackEvent("share", { method: "native" }))
      .catch(() => {});
  } else {
    navigator.clipboard.writeText(location.href).then(() => {
      toast("링크가 복사되었어요");
      trackEvent("share", { method: "clipboard" });
    }).catch(() => toast("복사 실패"));
  }
}

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2000);
}

function trackEvent(name, data) {
  if (window.gtag) window.gtag("event", name, data);
  if (window.mixpanel) window.mixpanel.track(name, data);
  console.log("[track]", name, data);
}
function trackCta(dest) {
  trackEvent("cta_click", { dest });
}

window.addEventListener("DOMContentLoaded", () => {
  trackEvent("page_view", {});
  const h = location.hash;
  const resultMatch = h.match(/result=(\w+)/);
  const storyMatch = h.match(/^#story-(\w+)$/);

  // 결과 hash가 있으면 먼저 결과 렌더 (currentAnimal 세팅 목적)
  if (resultMatch && RESULTS[resultMatch[1]]) {
    showResult(resultMatch[1]);
  }
  // 스토리 hash면 스토리 뷰 (currentAnimal 없으면 showStory가 set)
  if (storyMatch && STORIES[storyMatch[1]]) {
    showStory(storyMatch[1]);
  }
});
`
