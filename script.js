// 전역 변수들
let teams = [];
let timerInterval = null;
let currentTime = 0;
let isRunning = false;
let currentGameIndex = 0;
let autoMode = false;
let realTimeMode = false; // 실시간 모드 (시간에 따른 자동 게임 전환)
let manualMode = true;    // 수동 모드 (기본값)
let tournament = {
    active: false,
    rounds: [],
    currentRound: 0
};

// 배경 이미지 관리
const backgroundImages = [
    '20211021141222220_8I266MKM.jpg',
    'seoul-hangug-eseo-bam-e-sinae-pung-gyeong.jpg'
];
let currentBackgroundIndex = 0;

// 제시어 게임 데이터 - 6게임으로 구성, 각 게임당 20개 제시어 (몸으로 표현하기 적합한 명사 중심)
let originalWordData = {
    game1: [
        { korean: '코끼리', japanese: '象（ぞう）' },
        { korean: '토끼', japanese: '兎（うさぎ）' },
        { korean: '사자', japanese: 'ライオン' },
        { korean: '원숭이', japanese: '猿（さる）' },
        { korean: '거북이', japanese: '亀（かめ）' },
        { korean: '강아지', japanese: '犬（いぬ）' },
        { korean: '고양이', japanese: '猫（ねこ）' },
        { korean: '새', japanese: '鳥（とり）' },
        { korean: '물고기', japanese: '魚（さかな）' },
        { korean: '뱀', japanese: '蛇（へび）' },
        { korean: '개구리', japanese: '蛙（かえる）' },
        { korean: '나비', japanese: '蝶（ちょう）' },
        { korean: '거미', japanese: '蜘蛛（くも）' },
        { korean: '펭귄', japanese: 'ペンギン' },
        { korean: '기린', japanese: 'キリン' },
        { korean: '호랑이', japanese: '虎（とら）' },
        { korean: '돼지', japanese: '豚（ぶた）' },
        { korean: '닭', japanese: '鶏（にわとり）' },
        { korean: '소', japanese: '牛（うし）' },
        { korean: '말', japanese: '馬（うま）' }
    ],
    game2: [
        { korean: '자동차', japanese: '車（くるま）' },
        { korean: '비행기', japanese: '飛行機（ひこうき）' },
        { korean: '기차', japanese: '電車（でんしゃ）' },
        { korean: '배', japanese: '船（ふね）' },
        { korean: '자전거', japanese: '自転車（じてんしゃ）' },
        { korean: '헬리콥터', japanese: 'ヘリコプター' },
        { korean: '버스', japanese: 'バス' },
        { korean: '트럭', japanese: 'トラック' },
        { korean: '오토바이', japanese: 'オートバイ' },
        { korean: '택시', japanese: 'タクシー' },
        { korean: '지하철', japanese: '地下鉄（ちかてつ）' },
        { korean: '로켓', japanese: 'ロケット' },
        { korean: '잠수함', japanese: '潜水艦（せんすいかん）' },
        { korean: '스쿠터', japanese: 'スクーター' },
        { korean: '구급차', japanese: '救急車（きゅうきゅうしゃ）' },
        { korean: '소방차', japanese: '消防車（しょうぼうしゃ）' },
        { korean: '경찰차', japanese: 'パトカー' },
        { korean: '스케이트보드', japanese: 'スケートボード' },
        { korean: '인력거', japanese: '人力車（じんりきしゃ）' },
        { korean: '세그웨이', japanese: 'セグウェイ' }
    ],
    game3: [
        { korean: '축구', japanese: 'サッカー' },
        { korean: '농구', japanese: 'バスケットボール' },
        { korean: '야구', japanese: '野球' },
        { korean: '탁구', japanese: '卓球' },
        { korean: '테니스', japanese: 'テニス' },
        { korean: '배구', japanese: 'バレーボール' },
        { korean: '골프', japanese: 'ゴルフ' },
        { korean: '볼링', japanese: 'ボウリング' },
        { korean: '라켓', japanese: 'ラケット' },
        { korean: '배트', japanese: 'バット' },
        { korean: '글러브', japanese: 'グローブ' },
        { korean: '스키', japanese: 'スキー' },
        { korean: '스케이트', japanese: 'スケート' },
        { korean: '수영', japanese: '水泳' },
        { korean: '헬멧', japanese: 'ヘルメット' },
        { korean: '아령', japanese: 'ダンベル' },
        { korean: '줄넘기', japanese: '縄跳び（なわとび）' },
        { korean: '자전거', japanese: '自転車（じてんしゃ）' },
        { korean: '골대', japanese: 'ゴール台' },
        { korean: '트램펄린', japanese: 'トランポリン' }
    ],
    game4: [
        { korean: '피아노', japanese: 'ピアノ' },
        { korean: '기타', japanese: 'ギター' },
        { korean: '드럼', japanese: 'ドラム' },
        { korean: '바이올린', japanese: 'バイオリン' },
        { korean: '트럼펫', japanese: 'トランペット' },
        { korean: '플루트', japanese: 'フルート' },
        { korean: '마이크', japanese: 'マイク' },
        { korean: '스피커', japanese: 'スピーカー' },
        { korean: '헤드폰', japanese: 'ヘッドフォン' },
        { korean: '카메라', japanese: 'カメラ' },
        { korean: '텔레비전', japanese: 'テレビ' },
        { korean: '라디오', japanese: 'ラジオ' },
        { korean: '컴퓨터', japanese: 'コンピューター' },
        { korean: '스마트폰', japanese: 'スマートフォン' },
        { korean: '게임기', japanese: 'ゲーム機（き）' },
        { korean: '리모컨', japanese: 'リモコン' },
        { korean: '키보드', japanese: 'キーボード' },
        { korean: '마우스', japanese: 'マウス' },
        { korean: '프린터', japanese: 'プリンター' },
        { korean: '스캐너', japanese: 'スキャナー' }
    ],
    game5: [
        { korean: '햄버거', japanese: 'ハンバーガー' },
        { korean: '피자', japanese: 'ピザ' },
        { korean: '라면', japanese: 'ラーメン' },
        { korean: '김밥', japanese: '海苔巻き（のりまき）' },
        { korean: '도넛', japanese: 'ドーナツ' },
        { korean: '케이크', japanese: 'ケーキ' },
        { korean: '아이스크림', japanese: 'アイスクリーム' },
        { korean: '팝콘', japanese: 'ポップコーン' },
        { korean: '사탕', japanese: '飴（あめ）' },
        { korean: '초콜릿', japanese: 'チョコレート' },
        { korean: '바나나', japanese: 'バナナ' },
        { korean: '사과', japanese: '林檎（りんご）' },
        { korean: '수박', japanese: '西瓜（すいか）' },
        { korean: '오렌지', japanese: 'オレンジ' },
        { korean: '딸기', japanese: '苺（いちご）' },
        { korean: '포도', japanese: '葡萄（ぶどう）' },
        { korean: '당근', japanese: '人参（にんじん）' },
        { korean: '양파', japanese: '玉葱（たまねぎ）' },
        { korean: '토마토', japanese: 'トマト' },
        { korean: '옥수수', japanese: 'とうもろこし' }
    ],
    game6: [
        { korean: '의자', japanese: '椅子（いす）' },
        { korean: '책상', japanese: '机（つくえ）' },
        { korean: '침대', japanese: 'ベッド' },
        { korean: '소파', japanese: 'ソファー' },
        { korean: '냉장고', japanese: '冷蔵庫（れいぞうこ）' },
        { korean: '세탁기', japanese: '洗濯機（せんたくき）' },
        { korean: '전자레인지', japanese: '電子レンジ（でんしレンジ）' },
        { korean: '에어컨', japanese: 'エアコン' },
        { korean: '선풍기', japanese: '扇風機（せんぷうき）' },
        { korean: '청소기', japanese: '掃除機（そうじき）' },
        { korean: '거울', japanese: '鏡（かがみ）' },
        { korean: '시계', japanese: '時計（とけい）' },
        { korean: '전화기', japanese: '電話機（でんわき）' },
        { korean: '우산', japanese: '傘（かさ）' },
        { korean: '가방', japanese: '鞄（かばん）' },
        { korean: '신발', japanese: '靴（くつ）' },
        { korean: '모자', japanese: '帽子（ぼうし）' },
        { korean: '안경', japanese: '眼鏡（めがね）' },
        { korean: '칫솔', japanese: '歯ブラシ（はブラシ）' },
        { korean: '수건', japanese: 'タオル' }
    ]
};

// 현재 사용 중인 제시어 데이터 (셔플 후 분배된 데이터)
let wordGameData = JSON.parse(JSON.stringify(originalWordData)); // 깊은 복사로 초기화

// 모든 제시어를 하나의 배열로 합치는 함수
function getAllWords() {
    const allWords = [];
    Object.values(originalWordData).forEach(gameWords => {
        allWords.push(...gameWords);
    });
    return allWords;
}

// 제시어 전체 셔플 및 재분배 함수
function shuffleAllWords() {
    // 모든 제시어 가져오기
    const allWords = getAllWords();
    
    // 전체 제시어 섞기
    const shuffledAllWords = shuffleArray(allWords);
    
    // 6게임에 20개씩 분배
    const newWordGameData = {};
    for (let i = 1; i <= 6; i++) {
        const startIndex = (i - 1) * 20;
        const endIndex = startIndex + 20;
        newWordGameData[`game${i}`] = shuffledAllWords.slice(startIndex, endIndex);
    }
    
    // 새로운 데이터로 업데이트
    wordGameData = newWordGameData;
    
    // 상태 업데이트
    updateShuffleStatus('셔플됨 - 모든 제시어가 랜덤 분배');
    
    alert('🎲 모든 제시어가 셔플되어 새롭게 분배되었습니다!\n이제 각 경기마다 다양한 제시어가 나옵니다.');
}

// 원래 데이터로 복원하는 함수
function resetToOriginalWords() {
    wordGameData = JSON.parse(JSON.stringify(originalWordData)); // 깊은 복사
    
    // 상태 업데이트
    updateShuffleStatus('기본 카테고리별 구성');
    
    alert('🔄 제시어가 원래 카테고리별로 복원되었습니다.');
}

// 셔플 상태 업데이트 함수
function updateShuffleStatus(status) {
    const statusElement = document.getElementById('shuffleStatus');
    if (statusElement) {
        statusElement.textContent = status;
    }
}

// 기존 그림 데이터 유지
let drawingData = {
    title: '그림 그리기',
    images: [
        { name: '집', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cG9seWdvbiBwb2ludHM9IjEwMCwyMCAzMCwxMDAgMzAsMTgwIDE3MCwxODAgMTcwLDEwMCIgZmlsbD0iIzMzNyIvPgogIDxyZWN0IHg9IjQwIiB5PSIxMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzY2NCIvPgogIDxyZWN0IHg9IjEyMCIgeT0iMTIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiM0NEMiLz4KPC9zdmc+' },
        { name: '강아지', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSIjRkY4Ii8+CiAgPGNpcmNsZSBjeD0iNzAiIGN5PSIzMCIgcj0iMTUiIGZpbGw9IiNGRjgiLz4KICA8Y2lyY2xlIGN4PSIxMzAiIGN5PSIzMCIgcj0iMTUiIGZpbGw9IiNGRjgiLz4KICA8Y2lyY2xlIGN4PSI4NSIgY3k9Ijg1IiByPSIzIiBmaWxsPSIjMDAwIi8+CiAgPGNpcmNsZSBjeD0iMTE1IiBjeT0iODUiIHI9IjMiIGZpbGw9IiMwMDAiLz4KICA8ZWxsaXBzZSBjeD0iMTAwIiBjeT0iMTA1IiByeD0iMTUiIHJ5PSIxMCIgZmlsbD0iIzAwMCIvPgo8L3N2Zz4=' },
        { name: '꽃', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSI3MCIgcj0iMjAiIGZpbGw9IiNGRkMiLz4KICA8Y2lyY2xlIGN4PSI3MCIgY3k9IjkwIiByPSIyMCIgZmlsbD0iI0ZGQyIvPgogIDxjaXJjbGUgY3g9IjEzMCIgY3k9IjkwIiByPSIyMCIgZmlsbD0iI0ZGQyIvPgogIDxjaXJjbGUgY3g9IjkwIiBjeT0iMTEwIiByPSIyMCIgZmlsbD0iI0ZGQyIvPgogIDxjaXJjbGUgY3g9IjExMCIgY3k9IjExMCIgcj0iMjAiIGZpbGw9IiNGRkMiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSI5MCIgcj0iMTAiIGZpbGw9IiNGRkEiLz4KICA8cmVjdCB4PSI5NSIgeT0iMTMwIiB3aWR0aD0iMTAiIGhlaWdodD0iNTAiIGZpbGw9IiMzQzMiLz4KPC9zdmc+' },
        { name: '나무', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB4PSI5MCIgeT0iMTQwIiB3aWR0aD0iMjAiIGhlaWdodD0iNDAiIGZpbGw9IiM2NjQiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjUwIiBmaWxsPSIjNEM0Ii8+Cjwvc3ZnPg==' },
        { name: '자동차', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB4PSI0MCIgeT0iMTAwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRkYwMDAiLz4KICA8Y2lyY2xlIGN4PSI3MCIgY3k9IjE0NSIgcj0iMTUiIGZpbGw9IiMzMzMiLz4KICA8Y2lyY2xlIGN4PSIxMzAiIGN5PSIxNDUiIHI9IjE1IiBmaWxsPSIjMzMzIi8+CiAgPHJlY3QgeD0iNjAiIHk9Ijg1IiB3aWR0aD0iMzAiIGhlaWdodD0iMjAiIGZpbGw9IiM0NEMiLz4KICA8cmVjdCB4PSIxMDAiIHk9Ijg1IiB3aWR0aD0iNDAiIGhlaWdodD0iMjAiIGZpbGw9IiM0NEMiLz4KPC9zdmc+' },
        { name: '태양', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSIjRkZEQTAwIi8+CiAgPGxpbmUgeDE9IjEwMCIgeTE9IjMwIiB4Mj0iMTAwIiB5Mj0iNTAiIHN0cm9rZT0iI0ZGREEwMCIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgPGxpbmUgeDE9IjE3MCIgeTE9IjEwMCIgeDI9IjE1MCIgeTI9IjEwMCIgc3Ryb2tlPSIjRkZEQTAwIiBzdHJva2Utd2lkdGg9IjQiLz4KICA8bGluZSB4MT0iMTAwIiB5MT0iMTcwIiB4Mj0iMTAwIiB5Mj0iMTUwIiBzdHJva2U9IiNGRkRBMDAiIHN0cm9rZS13aWR0aD0iNCIvPgogIDxsaW5lIHgxPSIzMCIgeTE9IjEwMCIgeDI9IjUwIiB5Mj0iMTAwIiBzdHJva2U9IiNGRkRBMDAiIHN0cm9rZS13aWR0aD0iNCIvPgo8L3N2Zz4=' }
    ]
};

// 제시어 게임 상태 관리
let wordGameState = {
    currentGame: 1,
    currentWordIndex: 0,
    correctCount: 0,
    timeLeft: 120, // 2분
    isPlaying: false,
    timerInterval: null,
    shuffledWords: [] // 섞인 제시어 배열
};

// 배열 섞기 함수 (Fisher-Yates 알고리즘)
function shuffleArray(array) {
    const shuffled = [...array]; // 원본 배열 복사
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

let currentDisplayData = null;

const gameSchedule = [
    { name: '몸으로 말해요', start: '10:50', end: '11:08', duration: 18 },
    { name: '발목 풍선 터뜨리기', start: '11:10', end: '11:27', duration: 17 },
    { name: '단합 퀴즈', start: '11:30', end: '11:50', duration: 20 },
    { name: '점심시간', start: '11:50', end: '13:00', duration: 70 },
    { name: '카드 뒤집기', start: '13:00', end: '13:30', duration: 30 },
    { name: '등 맞대고 그림그리기', start: '13:30', end: '13:45', duration: 15 },
    { name: '오타마 릴레이', start: '13:50', end: '14:10', duration: 20 }
];

// 퀴즈 데이터 - PDF에서 가져온 모든 문제를 4경기로 분할
let quizDataByGame = {
    game1: [ // 1경기 - 문제.pdf 1-20문제 + 추가문제.pdf 1-20문제
        // 문제.pdf 1-10문제
        {
            question: "고대 7대 불가사의 중 현재까지 남아있는 유일한 것은 무엇일까요?",
            options: ["바빌론의 공중정원", "알렉산드리아의 등대", "기자의 피라미드", "로도스의 거상"],
            correct: "C",
            explanation: "기자의 피라미드는 고대 7대 불가사의 중 유일하게 현재까지 남아있는 건축물입니다."
        },
        {
            question: "빛의 속도가 가장 느려지는 매질은 무엇일까요?",
            options: ["다이아몬드", "물", "유리", "진공"],
            correct: "A",
            explanation: "다이아몬드의 굴절률이 가장 높아 빛의 속도가 가장 느려집니다."
        },
        {
            question: "\"실리콘밸리\"라는 이름이 붙은 이유는 무엇일까요?",
            options: ["반도체 산업에서 '실리콘'을 주요 재료로 사용했기 때문", "지형이 모래와 돌이 많아 '실리콘'으로 불린 것", "원래는 실리콘 채굴지가 있었기 때문", "미국 정부의 프로젝트 이름이어서"],
            correct: "A",
            explanation: "실리콘밸리는 반도체 산업의 핵심 재료인 실리콘에서 이름이 유래되었습니다."
        },
        {
            question: "세계에서 가장 면적이 넓은 국가는?",
            options: ["미국", "캐나다", "중국", "러시아"],
            correct: "D",
            explanation: "러시아는 약 1,700만 평방킬로미터로 세계에서 가장 넓은 국가입니다."
        },
        {
            question: "DNA 구조를 밝혀낸 두 과학자는 누구일까요?",
            options: ["뉴턴과 갈릴레오", "왓슨과 크릭", "다윈과 멘델", "보어와 슈뢰딩거"],
            correct: "B",
            explanation: "제임스 왓슨과 프랜시스 크릭이 1953년 DNA의 이중나선 구조를 발견했습니다."
        },
        {
            question: "다음 중 \"파자마(pajama)\"라는 단어의 기원은 어느 나라 언어일까요?",
            options: ["인도(힌디어)", "터키어", "페르시아어", "아랍어"],
            correct: "C",
            explanation: "파자마는 페르시아어에서 유래된 단어입니다."
        },
        {
            question: "아프리카 대륙에서 인구가 가장 많은 나라는 어디일까요?",
            options: ["남아프리카공화국", "나이지리아", "이집트", "에티오피아"],
            correct: "B",
            explanation: "나이지리아는 약 2억 2천만 명 이상으로 아프리카에서 인구가 가장 많습니다."
        },
        {
            question: "다음 중 실제로 \"행성\"에서 제외된 천체는 무엇일까요?",
            options: ["세레스", "플루토(명왕성)", "하이페리온", "에리스"],
            correct: "B",
            explanation: "2006년 IAU에 의해 명왕성은 왜소행성으로 분류되었습니다."
        },
        {
            question: "산업혁명 당시 증기기관을 개량하여 산업 전반에 큰 기여를 한 인물은 누구일까요?",
            options: ["토머스 뉴커먼", "제임스 와트", "마이클 패러데이", "로버트 훅"],
            correct: "B",
            explanation: "제임스 와트가 증기기관을 크게 개량하여 산업혁명을 이끌었습니다."
        },
        {
            question: "세계 3대 오페라 극장에 속하지 않는 것은?",
            options: ["밀라노 라 스칼라", "빈 국립 오페라 극장", "뉴욕 메트로폴리탄 오페라 하우스", "파리 오페라 가르니에"],
            correct: "D",
            explanation: "세계 3대 오페라 극장은 라 스칼라, 빈 국립 오페라 극장, 메트로폴리탄 오페라 하우스입니다."
        },
        // 추가문제.pdf 1-10문제
        {
            question: "다음 중 수도가 잘못 연결된 것은?",
            options: ["태국 – 방콕", "호주 – 시드니", "캐나다 – 오타와", "브라질 – 브라질리아"],
            correct: "B",
            explanation: "호주의 수도는 캔버라입니다."
        },
        {
            question: "아프리카 국가 중 수도가 '카이로(Cairo)'인 나라는?",
            options: ["수단", "이집트", "리비아", "튀니지"],
            correct: "B",
            explanation: "이집트의 수도는 카이로입니다."
        },
        {
            question: "다음 중 수도가 유럽 대륙에 있지 않은 국가는?",
            options: ["터키 – 앙카라", "스페인 – 마드리드", "노르웨이 – 오슬로", "헝가리 – 부다페스트"],
            correct: "A",
            explanation: "터키는 아시아와 유럽에 걸쳐 있지만 앙카라는 아시아 지역에 있습니다."
        },
        {
            question: "경주에 위치하며 유네스코 세계문화유산으로 지정된 사찰은?",
            options: ["해인사", "불국사", "송광사", "통도사"],
            correct: "B",
            explanation: "경주 불국사는 1995년 석굴암과 함께 유네스코 세계문화유산으로 지정되었습니다."
        },
        {
            question: "불국사 안에 있는 석조문화재로, 현존 최고(最古)의 이중 석탑은?",
            options: ["다보탑", "석가탑", "분황사 모전석탑", "무량수전 석탑"],
            correct: "B",
            explanation: "석가탑은 국보 제21호로, 현존하는 최고의 이중 석탑입니다."
        },
        {
            question: "팔만대장경이 소장되어 있는 한국의 사찰은?",
            options: ["해인사", "통도사", "송광사", "범어사"],
            correct: "A",
            explanation: "팔만대장경은 해인사에 보관되어 있습니다."
        },
        {
            question: "세계에서 가장 오래된 목판 인쇄물로, 유네스코에 등재된 한국의 문화유산은?",
            options: ["직지심체요절", "무구정광대다라니경", "팔만대장경", "삼국사기"],
            correct: "B",
            explanation: "불국사 석가탑에서 발견된 무구정광대다라니경은 8세기 제작된 최고의 목판 인쇄물입니다."
        },
        {
            question: "세계에서 가장 많이 소비되는 음료는?",
            options: ["커피", "차(Tea)", "맥주", "물"],
            correct: "B",
            explanation: "차는 물 다음으로 세계에서 가장 많이 소비되는 음료입니다."
        },
        {
            question: "노벨상을 가장 많이 수상한 나라는?",
            options: ["미국", "독일", "영국", "프랑스"],
            correct: "A",
            explanation: "미국이 노벨상을 가장 많이 수상했습니다."
        },
        {
            question: "인류 최초로 달에 착륙한 사람은?",
            options: ["유리 가가린", "닐 암스트롱", "버즈 올드린", "마이클 콜린스"],
            correct: "B",
            explanation: "닐 암스트롱이 1969년 아폴로 11호로 최초로 달에 착륙했습니다."
        }
    ],
    
    game2: [ // 2경기 - 문제.pdf 중간 + 추가문제.pdf 중간
        // 문제.pdf 계속
        {
            question: "최초로 인터넷 프로토콜 TCP/IP가 실제 적용된 해는 언제일까요?",
            options: ["1969년", "1973년", "1983년", "1991년"],
            correct: "C",
            explanation: "1983년 1월 1일, ARPANET에서 TCP/IP 프로토콜이 전면 적용되었습니다."
        },
        {
            question: "다음 중 포유류가 아닌 동물은?",
            options: ["오리너구리", "고래", "펭귄", "코알라"],
            correct: "C",
            explanation: "펭귄은 조류(새)입니다."
        },
        {
            question: "\"나는 생각한다, 고로 존재한다\"라는 명제를 제시한 철학자는?",
            options: ["칸트", "데카르트", "니체", "소크라테스"],
            correct: "B",
            explanation: "르네 데카르트가 이 유명한 명제를 제시했습니다."
        },
        {
            question: "근대 올림픽이 처음 개최된 도시는 어디일까요?",
            options: ["아테네", "런던", "파리", "베를린"],
            correct: "A",
            explanation: "1896년 아테네에서 제1회 근대 올림픽이 개최되었습니다."
        },
        {
            question: "커피의 원산지로 알려진 지역은?",
            options: ["콜롬비아", "에티오피아", "브라질", "인도네시아"],
            correct: "B",
            explanation: "커피는 에티오피아 카파 지역에서 기원한 것으로 알려져 있습니다."
        },
        // 추가문제.pdf 계속
        {
            question: "남미에서 수도가 '라파스(La Paz)'인 나라는?",
            options: ["칠레", "볼리비아", "페루", "파라과이"],
            correct: "B",
            explanation: "볼리비아의 행정수도는 라파스입니다."
        },
        {
            question: "아프리카에서 국토 면적이 가장 작은 나라는?",
            options: ["세이셸", "르완다", "가봉", "부룬디"],
            correct: "A",
            explanation: "세이셸이 아프리카에서 국토 면적이 가장 작은 나라입니다."
        },
        {
            question: "북유럽에서 수도가 헬싱키인 나라는?",
            options: ["스웨덴", "덴마크", "핀란드", "노르웨이"],
            correct: "C",
            explanation: "핀란드의 수도는 헬싱키입니다."
        },
        {
            question: "조선시대 왕과 왕비의 제사를 지내던 장소로, 유네스코 세계문화유산에 등재된 곳은?",
            options: ["창덕궁", "종묘", "경복궁", "덕수궁"],
            correct: "B",
            explanation: "종묘는 조선 왕조의 왕과 왕비의 신위를 모신 사당입니다."
        },
        {
            question: "고려대장경(팔만대장경)을 보관하는 해인사의 건축물은?",
            options: ["장경판전", "범어사 대웅전", "송광사 국사전", "통도사 금강계단"],
            correct: "A",
            explanation: "장경판전은 팔만대장경을 보관하는 해인사의 건축물입니다."
        },
        {
            question: "경주 불국사에 있는 국보 제20호로, 화려한 장식미를 자랑하는 석탑은?",
            options: ["석가탑", "다보탑", "분황사 모전석탑", "원각사지 10층석탑"],
            correct: "B",
            explanation: "다보탑은 국보 제20호로 화려한 장식미를 자랑하는 석탑입니다."
        },
        {
            question: "일본 나라(奈良)에 있는 불교 사찰로, 세계에서 가장 큰 목조건축물 중 하나는?",
            options: ["금각사", "은각사", "도다이지(東大寺)", "교토 호류지"],
            correct: "C",
            explanation: "도다이지는 일본 나라에 있는 큰 목조건축물로 유명합니다."
        },
        {
            question: "일본 교토에 위치하며, 가을 단풍으로 유명하고 유네스코 문화유산에 등재된 절은?",
            options: ["기요미즈데라(清水寺)", "료안지(龍安寺)", "긴카쿠지(銀閣寺)", "토후쿠지(東福寺)"],
            correct: "A",
            explanation: "기요미즈데라는 교토의 유명한 사찰로 가을 단풍으로 유명합니다."
        },
        {
            question: "일본의 전통 공연예술 중 하나로, 배우가 가면을 쓰고 엄숙한 분위기에서 연기하는 것은?",
            options: ["가부키", "분라쿠", "노(能)", "교겐"],
            correct: "C",
            explanation: "노(能)는 일본의 전통 가면극입니다."
        },
        {
            question: "지구 대기 중 가장 많은 비율을 차지하는 기체는?",
            options: ["산소", "질소", "이산화탄소", "아르곤"],
            correct: "B",
            explanation: "질소가 약 78%를 차지합니다."
        },
        {
            question: "태양계 행성 중 가장 크기가 작은 행성은?",
            options: ["수성", "화성", "금성", "명왕성"],
            correct: "A",
            explanation: "수성이 태양계에서 가장 작은 행성입니다."
        },
        // 추가: 균등 20문제 맞추기 (총 4문 추가)
        {
            question: "지구에서 가장 큰 대양은?",
            options: ["태평양", "대서양", "인도양", "북극해"],
            correct: "A",
            explanation: "태평양은 지구에서 가장 큰 대양입니다."
        },
        {
            question: "일본의 수도는 어디일까요?",
            options: ["도쿄", "오사카", "교토", "나고야"],
            correct: "A",
            explanation: "일본의 수도는 도쿄입니다."
        },
        {
            question: "세계에서 가장 높은 산은?",
            options: ["에베레스트", "K2", "칸첸중가", "로체"],
            correct: "A",
            explanation: "에베레스트 산은 해발 약 8,848m로 가장 높습니다."
        },
        {
            question: "인류 최초로 인공위성을 발사한 나라는?",
            options: ["미국", "소련", "중국", "영국"],
            correct: "B",
            explanation: "1957년 소련이 스푸트니크 1호를 발사했습니다."
        }
    ],
    
    game3: [ // 3경기 - 역사/과학/문화 혼합
        {
            question: "다음 중 공룡이 살던 중생대의 세 시기를 올바른 순서로 나열한 것은?",
            options: ["쥐라기 – 트라이아스기 – 백악기", "트라이아스기 – 쥐라기 – 백악기", "백악기 – 쥐라기 – 트라이아스기", "트라이아스기 – 백악기 – 쥐라기"],
            correct: "B",
            explanation: "중생대는 트라이아스기, 쥐라기, 백악기 순서입니다."
        },
        {
            question: "한국 최초의 올림픽 금메달은 어느 종목에서 나왔을까?",
            options: ["양궁", "유도", "레슬링", "역도"],
            correct: "C",
            explanation: "양정모가 1976년 몬트리올 올림픽 레슬링에서 금메달을 땄습니다."
        },
        {
            question: "일본에서 개최된 첫 하계 올림픽은?",
            options: ["1940년 도쿄 올림픽", "1964년 도쿄 올림픽", "1972년 삿포로 올림픽", "1998년 나가노 올림픽"],
            correct: "B",
            explanation: "1964년 도쿄 올림픽이 일본에서 개최된 첫 하계 올림픽입니다."
        },
        {
            question: "축구 월드컵에서 한국과 일본이 공동 개최한 해는?",
            options: ["1998년", "2002년", "2006년", "2010년"],
            correct: "B",
            explanation: "2002년 FIFA 월드컵이 한일 공동개최로 열렸습니다."
        },
        {
            question: "세계에서 가장 많은 나라와 국경을 맞대고 있는 나라는?",
            options: ["러시아", "중국", "독일", "브라질"],
            correct: "B",
            explanation: "중국은 14개국과 국경을 접하고 있습니다."
        },
        {
            question: "남아시아 국가 스리랑카의 수도는?",
            options: ["콜롬보", "캔디", "스리자야와르데네푸라코테", "말레"],
            correct: "C",
            explanation: "스리자야와르데네푸라코테가 스리랑카의 수도입니다."
        },
        {
            question: "아프리카에서 인구가 가장 많은 도시는?",
            options: ["카이로", "라고스", "나이로비", "요하네스버그"],
            correct: "B",
            explanation: "라고스가 아프리카에서 인구가 가장 많은 도시입니다."
        },
        {
            question: "세계에서 가장 높은 폭포인 엔젤폭포가 있는 나라는?",
            options: ["베네수엘라", "브라질", "콜롬비아", "페루"],
            correct: "A",
            explanation: "엔젤폭포는 베네수엘라에 있습니다."
        },
        {
            question: "남극 대륙을 최초로 발견했다고 알려진 국가는?",
            options: ["영국", "러시아", "노르웨이", "미국"],
            correct: "B",
            explanation: "1820년 러시아 탐험대가 남극 대륙을 최초로 발견했습니다."
        },
        {
            question: "한국에서 현존하는 가장 오래된 목조건축물은?",
            options: ["불국사 대웅전", "법주사 팔상전", "봉정사 극락전", "수덕사 대웅전"],
            correct: "C",
            explanation: "봉정사 극락전이 현존하는 가장 오래된 목조건축물입니다."
        },
        {
            question: "세계에서 가장 오래된 금속활자로 인쇄된 책은?",
            options: ["무구정광대다라니경", "직지심체요절", "삼국사기", "동국정운"],
            correct: "B",
            explanation: "직지심체요절은 1377년에 제작된 현존하는 가장 오래된 금속활자 인쇄본입니다."
        },
        {
            question: "종묘제례악은 어떤 성격을 가진 음악일까요?",
            options: ["불교 의식 음악", "궁중 제례 음악", "무속 의식 음악", "농악"],
            correct: "B",
            explanation: "종묘제례악은 조선 왕실의 제사 음악입니다."
        },
        {
            question: "세계에서 가장 오래된 별 관측소로 알려진 한국의 문화유산은?",
            options: ["첨성대", "숭례문", "석빙고", "월정교"],
            correct: "A",
            explanation: "첨성대는 신라시대의 천문관측소입니다."
        },
        {
            question: "조선시대 왕실의 기록 보관소로, 세계기록유산에 등재된 것은?",
            options: ["규장각", "장서각", "조선왕조실록", "승정원일기"],
            correct: "C",
            explanation: "조선왕조실록이 세계기록유산에 등재되었습니다."
        },
        {
            question: "일본 나라(奈良)에 위치한 세계문화유산 사찰로, 5층 목탑으로 유명한 곳은?",
            options: ["도다이지", "호류지", "금각사", "은각사"],
            correct: "B",
            explanation: "호류지는 나라에 있는 세계문화유산으로 5층 목탑으로 유명합니다."
        }
    ],
    
    game4: [ // 4경기 - 고난이도 문제 (주관식 형태 포함)
        {
            question: "양자역학의 불확정성 원리를 제시한 독일 물리학자의 이름은?",
            options: ["닐스 보어", "베르너 하이젠베르크", "에르빈 슈뢰딩거", "볼프강 파울리"],
            correct: "B",
            explanation: "베르너 하이젠베르크가 1927년 불확정성 원리를 발표했습니다."
        },
        {
            question: "DNA의 이중나선 구조를 발견한 과학자 조합으로 옳은 것은?",
            options: ["왓슨과 크릭", "다윈과 멘델", "파스퇴르와 코흐", "프랭클린과 윌킨스"],
            correct: "A",
            explanation: "제임스 왓슨과 프랜시스 크릭이 1953년 DNA 이중나선 구조를 규명했습니다."
        },
        {
            question: "일본 에도시대 대표 화가로 '부악삼십육경(富嶽三十六景)'을 그린 우키요에 작가는?",
            options: ["가쓰시카 호쿠사이", "우타가와 히로시게", "기타가와 우타마로", "도샤쿠사이 샤라쿠"],
            correct: "A",
            explanation: "가쓰시카 호쿠사이가 후지산 36경을 그린 대표적 우키요에 화가입니다."
        },
        {
            question: "중세 유럽에서 연금술사들이 찾고자 했던 '만물을 금으로 바꾸는 물질'을 무엇이라 했는가?",
            options: ["현자의 돌", "엘릭서", "아쿠아 포르티스", "필로소피아"],
            correct: "A",
            explanation: "현자의 돌(Philosopher's Stone)은 비금속을 금으로 변환시킨다고 믿어진 물질입니다."
        },
        {
            question: "프랑스 인상파 화가 모네의 작품 '인상, 해돋이'가 전시된 연도는?",
            options: ["1862년", "1874년", "1886년", "1894년"],
            correct: "B",
            explanation: "1874년 전시회에서 '인상, 해돋이'가 공개되며 인상주의라는 명칭이 탄생했습니다."
        },
        {
            question: "셰익스피어의 4대 비극에 속하지 않는 작품은?",
            options: ["햄릿", "오셀로", "안토니우스와 클레오파트라", "리어왕"],
            correct: "C",
            explanation: "4대 비극은 햄릿, 오셀로, 리어왕, 맥베스입니다."
        },
        {
            question: "고대 그리스의 스토아학파 철학자로 로마 황제이기도 했던 인물은?",
            options: ["세네카", "마르쿠스 아우렐리우스", "에픽테토스", "제논"],
            correct: "B",
            explanation: "마르쿠스 아우렐리우스는 로마 5현제 중 한 명이자 스토아 철학자였습니다."
        },
        {
            question: "20세기 초 독일 표현주의 미술 그룹 '다리파(Die Brücke)'의 중심 인물은?",
            options: ["에른스트 루트비히 키르히너", "바실리 칸딘스키", "파울 클레", "에곤 실레"],
            correct: "A",
            explanation: "키르히너는 다리파의 창립 멤버이자 대표적 표현주의 화가입니다."
        },
        {
            question: "노벨 문학상을 수상한 최초의 아시아인 작가는?",
            options: ["가와바타 야스나리", "타고르", "오에 겐자부로", "루쉰"],
            correct: "B",
            explanation: "인도의 시인 라빈드라나트 타고르가 1913년 아시아 최초로 노벨 문학상을 받았습니다."
        },
        {
            question: "고대 바빌로니아의 법전 '함무라비 법전'의 핵심 원칙은?",
            options: ["황금률", "동해보복법", "자연법", "관습법"],
            correct: "B",
            explanation: "함무라비 법전은 '눈에는 눈, 이에는 이'의 동해보복법을 기반으로 합니다."
        },
        {
            question: "르네상스 시대 피렌체 메디치 가문의 후원을 받은 조각가로 '다비드상'을 제작한 인물은?",
            options: ["레오나르도 다 빈치", "미켈란젤로", "도나텔로", "베르니니"],
            correct: "B",
            explanation: "미켈란젤로의 다비드상(1501-1504)은 르네상스 조각의 걸작입니다."
        },
        {
            question: "일본 헤이안 시대 문학의 대표작 '겐지모노가타리(源氏物語)'의 저자는?",
            options: ["무라사키 시키부", "세이 쇼나곤", "이즈미 시키부", "사라시나 일기"],
            correct: "A",
            explanation: "무라사키 시키부가 11세기 초에 쓴 세계 최초의 장편소설입니다."
        },
        {
            question: "상대성이론을 제안한 아인슈타인이 노벨 물리학상을 받은 연구 주제는?",
            options: ["일반 상대성이론", "특수 상대성이론", "광전효과", "브라운 운동"],
            correct: "C",
            explanation: "아인슈타인은 1921년 광전효과 연구로 노벨상을 수상했습니다."
        },
        {
            question: "중국 송나라 시대에 발명되어 세계사를 바꾼 '4대 발명'에 속하지 않는 것은?",
            options: ["화약", "나침반", "인쇄술", "증기기관"],
            correct: "D",
            explanation: "중국 4대 발명은 화약, 나침반, 인쇄술, 종이입니다."
        },
        {
            question: "프랑스 계몽사상가 볼테르의 대표 풍자소설은?",
            options: ["캉디드", "백과전서", "사회계약론", "페르시아인의 편지"],
            correct: "A",
            explanation: "'캉디드'는 볼테르의 대표적 풍자소설로 낙관주의를 비판합니다."
        },
        {
            question: "고대 그리스 철학자 플라톤이 세운 학교의 이름은?",
            options: ["아카데미아", "리케이온", "스토아", "키니코스"],
            correct: "A",
            explanation: "플라톤은 BC 387년경 아테네에 아카데미아를 설립했습니다."
        },
        {
            question: "중세 이슬람 세계에서 철학, 의학, 수학을 집대성한 학자 이븐 시나의 라틴어 이름은?",
            options: ["아비센나", "아베로에스", "알 콰리즈미", "알 파라비"],
            correct: "A",
            explanation: "이븐 시나의 라틴어 이름은 아비센나(Avicenna)입니다."
        },
        // 주관식 문제 추가
        {
            question: "셰익스피어의 4대 비극 작품 4개를 모두 말하시오.",
            type: "essay",
            options: [],
            correct: "주관식",
            answer: "햄릿(Hamlet), 오셀로(Othello), 리어왕(King Lear), 맥베스(Macbeth)",
            hint: "힌트: H로 시작하는 작품, O로 시작하는 작품, K로 시작하는 작품, M로 시작하는 작품",
            explanation: "셰익스피어의 4대 비극은 햄릿, 오셀로, 리어왕, 맥베스입니다."
        },
        {
            question: "르네상스 3대 예술가의 이름을 모두 말하시오.",
            type: "essay",
            options: [],
            correct: "주관식",
            answer: "레오나르도 다 빈치(Leonardo da Vinci), 미켈란젤로(Michelangelo), 라파엘로(Raphael)",
            hint: "힌트: 모나리자를 그린 화가, 시스티나 성당 천장화를 그린 화가, 아테네 학당을 그린 화가",
            explanation: "르네상스 3대 거장은 레오나르도 다 빈치, 미켈란젤로, 라파엘로입니다."
        },
        {
            question: "프랑스 혁명의 3대 이념을 순서대로 말하시오.",
            type: "essay",
            options: [],
            correct: "주관식",
            answer: "자유(Liberté), 평등(Égalité), 박애(Fraternité)",
            hint: "힌트: L로 시작, É로 시작, F로 시작 (프랑스어 순서)",
            explanation: "프랑스 혁명의 3대 이념은 자유, 평등, 박애입니다."
        },
        {
            question: "원소 주기율표에서 첫 번째 원소(수소)의 원소기호와 원자번호를 말하시오.",
            type: "essay",
            options: [],
            correct: "주관식",
            answer: "H (원소기호), 1 (원자번호)",
            hint: "힌트: Hydrogen의 첫 글자, 가장 작은 자연수",
            explanation: "수소의 원소기호는 H이고, 원자번호는 1입니다."
        },
        {
            question: "한국의 3대 명절을 모두 말하시오.",
            type: "essay",
            options: [],
            correct: "주관식",
            answer: "설날, 추석, 단오 (또는 한식)",
            hint: "힌트: 음력 1월 1일, 음력 8월 15일, 음력 5월 5일",
            explanation: "한국의 3대 명절은 설날, 추석, 단오입니다."
        },
        {
            question: "태양계 8개 행성을 태양에서 가까운 순서대로 모두 나열하시오.",
            type: "essay",
            options: [],
            correct: "주관식",
            answer: "수성(Mercury), 금성(Venus), 지구(Earth), 화성(Mars), 목성(Jupiter), 토성(Saturn), 천왕성(Uranus), 해왕성(Neptune)",
            hint: "힌트: 수금지화목토천해 (My Very Educated Mother Just Served Us Nachos)",
            explanation: "태양계의 8개 행성은 수성, 금성, 지구, 화성, 목성, 토성, 천왕성, 해왕성 순서입니다."
        },
        {
            question: "세계 3대 미술관의 이름을 말하시오.",
            type: "essay",
            options: [],
            correct: "주관식",
            answer: "루브르 박물관(Louvre Museum), 대영박물관(British Museum), 메트로폴리탄 미술관(Metropolitan Museum)",
            hint: "힌트: 파리에 있는 박물관, 런던에 있는 박물관, 뉴욕에 있는 박물관",
            explanation: "세계 3대 미술관은 루브르 박물관, 대영박물관, 메트로폴리탄 미술관입니다."
        },
        {
            question: "노벨상 6개 부문의 이름을 모두 말하시오.",
            type: "essay",
            options: [],
            correct: "주관식",
            answer: "물리학상, 화학상, 생리의학상, 문학상, 평화상, 경제학상",
            hint: "힌트: 과학 3개 (물리, 화학, 의학), 인문 1개, 사회 2개",
            explanation: "노벨상은 물리학, 화학, 생리의학, 문학, 평화, 경제학 6개 부문이 있습니다."
        },
        {
            question: "세계 4대 문명 발상지를 모두 말하시오.",
            type: "essay",
            options: [],
            correct: "주관식",
            answer: "메소포타미아 문명, 이집트 문명, 인더스 문명, 황하 문명",
            hint: "힌트: 티그리스-유프라테스 강, 나일 강, 인더스 강, 황하 강 유역",
            explanation: "세계 4대 문명은 메소포타미아, 이집트, 인더스, 황하 문명입니다."
        },
        {
            question: "올림픽 5륜기의 5가지 색깔을 모두 말하시오.",
            type: "essay",
            options: [],
            correct: "주관식",
            answer: "파랑, 노랑, 검정, 초록, 빨강",
            hint: "힌트: 5대륙을 상징하며, 흰 바탕에 5개의 원으로 구성",
            explanation: "올림픽 5륜기는 파랑, 노랑, 검정, 초록, 빨강 5가지 색으로 이루어져 있습니다."
        },
        {
            question: "한국의 5대 궁궐 이름을 모두 말하시오.",
            type: "essay",
            options: [],
            correct: "주관식",
            answer: "경복궁, 창덕궁, 창경궁, 덕수궁, 경희궁",
            hint: "힌트: 경으로 시작 2개, 창으로 시작 2개, 덕으로 시작 1개",
            explanation: "조선시대 한양의 5대 궁궐은 경복궁, 창덕궁, 창경궁, 덕수궁, 경희궁입니다."
        },
        {
            question: "세계 3대 종교를 신자 수가 많은 순서대로 나열하시오.",
            type: "essay",
            options: [],
            correct: "주관식",
            answer: "기독교(Christianity), 이슬람교(Islam), 힌두교(Hinduism)",
            hint: "힌트: 예수, 무함마드, 브라흐마를 믿는 종교 순서대로",
            explanation: "세계 3대 종교는 기독교, 이슬람교, 힌두교 순서입니다."
        },
        {
            question: "베토벤의 3대 교향곡(영웅, 운명, 합창)의 번호를 순서대로 말하시오.",
            type: "essay",
            options: [],
            correct: "주관식",
            answer: "교향곡 3번(영웅), 교향곡 5번(운명), 교향곡 9번(합창)",
            hint: "힌트: 홀수 번호만 해당 (3, 5, 9번)",
            explanation: "베토벤의 3대 교향곡은 3번 영웅, 5번 운명, 9번 합창입니다."
        },
        {
            question: "빛의 3원색을 모두 말하시오.",
            type: "essay",
            options: [],
            correct: "주관식",
            answer: "빨강(Red), 초록(Green), 파랑(Blue)",
            hint: "힌트: RGB (컴퓨터 모니터의 색상 표현 방식)",
            explanation: "빛의 3원색은 빨강(Red), 초록(Green), 파랑(Blue)입니다."
        },
        {
            question: "한국 전통 음악의 3대 악기를 말하시오.",
            type: "essay",
            options: [],
            correct: "주관식",
            answer: "거문고, 가야금, 피리",
            hint: "힌트: 현악기 2개 (6현, 12현), 관악기 1개",
            explanation: "한국 전통 음악의 대표적인 악기는 거문고, 가야금, 피리입니다."
        }
    ]
};

// 일본어 번역 맵 (질문 원문 문자열을 키로 사용)
// 필요한 만큼 계속 추가 가능. 옵션은 A~D 순서로 4개 입력.
const quizTranslationsJP = {
    "고대 7대 불가사의 중 현재까지 남아있는 유일한 것은 무엇일까요?": {
        q: "古代七不思議の中で現在まで残っている唯一のものはどれでしょうか？",
        options: ["バビロンの空中庭園", "アレクサンドリアの大灯台", "ギザのピラミッド", "ロドス島の巨像"],
        exp: "ギザのピラミッドは古代七不思議の中で唯一現存する建造物です。"
    },
    "빛의 속도가 가장 느려지는 매질은 무엇일까요?": {
        q: "光の速度が最も遅くなる媒質はどれでしょうか？",
        options: ["ダイヤモンド", "水", "ガラス", "真空"],
        exp: "ダイヤモンドは屈折率が最も高く、光の速度が最も遅くなります。"
    },
    "\"실리콘밸리\"라는 이름이 붙은 이유는 무엇일까요?": {
        q: "『シリコンバレー』という名前が付いた理由は何でしょうか？",
        options: ["半導体産業で『シリコン』が主要材料として使われたため", "地形が砂や石が多く『シリコン』と呼ばれたため", "元々シリコンの採掘地だったため", "米国政府のプロジェクト名だったため"],
        exp: "シリコンバレーの名称は半導体の基幹材料であるシリコンに由来します。"
    },
    "세계에서 가장 면적이 넓은 국가는?": {
        q: "世界で最も面積が広い国はどこでしょうか？",
        options: ["アメリカ合衆国", "カナダ", "中国", "ロシア"],
        exp: "ロシアは約1,700万平方キロメートルで世界最大の面積を持ちます。"
    },
    "DNA 구조를 밝혀낸 두 과학자는 누구일까요?": {
        q: "DNAの構造を解明した二人の科学者は誰でしょうか？",
        options: ["ニュートンとガリレオ", "ワトソンとクリック", "ダーウィンとメンデル", "ボーアとシュレーディンガー"],
        exp: "ジェームズ・ワトソンとフランシス・クリックが1953年に二重らせん構造を発見しました。"
    },
    "다음 중 \"파자마(pajama)\"라는 단어의 기원은 어느 나라 언어일까요?": {
        q: "次のうち『パジャマ（pajama）』という単語の語源はどの言語でしょうか？",
        options: ["インド（ヒンディー語）", "トルコ語", "ペルシア語", "アラビア語"],
        exp: "パジャマはペルシア語に由来する言葉です。"
    },
    "아프리카 대륙에서 인구가 가장 많은 나라는 어디일까요?": {
        q: "アフリカ大陸で人口が最も多い国はどこでしょうか？",
        options: ["南アフリカ共和国", "ナイジェリア", "エジプト", "エチオピア"],
        exp: "ナイジェリアは2億2千万人以上でアフリカ最大の人口を持ちます。"
    },
    "다음 중 실제로 \"행성\"에서 제외된 천체는 무엇일까요?": {
        q: "次のうち実際に『惑星』から除外された天体はどれでしょうか？",
        options: ["セレス", "冥王星（プルート）", "ハイペリオン", "エリス"],
        exp: "2006年にIAUの定義により冥王星は準惑星に分類されました。"
    },
    "산업혁명 당시 증기기관을 개량하여 산업 전반에 큰 기여를 한 인물은 누구일까요?": {
        q: "産業革命期に蒸気機関を改良し、産業全般に大きく貢献した人物は誰でしょうか？",
        options: ["トーマス・ニューコメン", "ジェームズ・ワット", "マイケル・ファラデー", "ロバート・フック"],
        exp: "ジェームズ・ワットが蒸気機関を大幅に改良し産業革命を牽引しました。"
    },
    "세계 3대 오페라 극장에 속하지 않는 것은?": {
        q: "世界三大オペラ劇場に含まれないのはどれでしょうか？",
        options: ["ミラノ・スカラ座", "ウィーン国立歌劇場", "ニューヨーク・メトロポリタン歌劇場", "パリ・オペラ座（ガルニエ）"],
        exp: "世界三大オペラ劇場はスカラ座、ウィーン国立歌劇場、メトロポリタン歌劇場です。"
    },
    "다음 중 수도가 잘못 연결된 것은?": {
        q: "次のうち首都の組み合わせが誤っているものはどれでしょうか？",
        options: ["タイ – バンコク", "オーストラリア – シドニー", "カナダ – オタワ", "ブラジル – ブラジリア"],
        exp: "オーストラリアの首都はキャンベラです。"
    },
    "아프리카 국가 중 수도가 '카이로(Cairo)'인 나라는?": {
        q: "アフリカの国のうち、首都が『カイロ（Cairo）』である国はどこでしょうか？",
        options: ["スーダン", "エジプト", "リビア", "チュニジア"],
        exp: "エジプトの首都はカイロです。"
    },
    "다음 중 수도가 유럽 대륙에 있지 않은 국가는?": {
        q: "次のうち首都がヨーロッパ大陸にない国はどれでしょうか？",
        options: ["トルコ – アンカラ", "スペイン – マドリード", "ノルウェー – オスロ", "ハンガリー – ブダペスト"],
        exp: "トルコはアジアとヨーロッパに跨りますが、アンカラはアジア側に位置します。"
    },
    "경주에 위치하며 유네스코 세계문화유산으로 지정된 사찰은?": {
        q: "慶州に位置しユネスコ世界文化遺産に指定された寺院はどれでしょうか？",
        options: ["海印寺", "仏国寺", "松広寺", "通度寺"],
        exp: "慶州の仏国寺は石窟庵とともに1995年に世界文化遺産に登録されました。"
    },
    "불국사 안에 있는 석조문화재로, 현존 최고(最古)의 이중 석탑은?": {
        q: "仏国寺にある石造文化財で、現存最古の二重石塔はどれでしょうか？",
        options: ["多宝塔", "釈迦塔", "芬皇寺 模塼石塔", "無量寿殿 石塔"],
        exp: "釈迦塔は国宝第21号で、現存最古の二重石塔です。"
    },
    "팔만대장경이 소장되어 있는 한국의 사찰은?": {
        q: "八万大蔵経が所蔵されている韓国の寺院はどこでしょうか？",
        options: ["海印寺", "通度寺", "松広寺", "梵魚寺"],
        exp: "八万大蔵経は海印寺に保管されています。"
    },
    "세계에서 가장 오래된 목판 인쇄물로, 유네스코에 등재된 한국의 문화유산은?": {
        q: "世界最古の木版印刷物で、ユネスコに登録された韓国の文化遺産はどれでしょうか？",
        options: ["直指心体要節", "無垢淨光大陀羅尼経", "八万大蔵経", "三国史記"],
        exp: "仏国寺の釈迦塔から発見された無垢淨光大陀羅尼経は8世紀の最古の木版印刷物です。"
    },
    "세계에서 가장 많이 소비되는 음료는?": {
        q: "世界で最も消費されている飲み物はどれでしょうか？",
        options: ["コーヒー", "お茶（Tea）", "ビール", "水"],
        exp: "お茶は水に次いで世界で最も消費されている飲み物です。"
    },
    "노벨상을 가장 많이 수상한 나라는?": {
        q: "ノーベル賞を最も多く受賞した国はどこでしょうか？",
        options: ["アメリカ合衆国", "ドイツ", "イギリス", "フランス"],
        exp: "アメリカ合衆国が最も多くのノーベル賞を受賞しています。"
    },
    "인류 최초로 달에 착륙한 사람은?": {
        q: "人類で初めて月に着陸した人物は誰でしょうか？",
        options: ["ユーリイ・ガガーリン", "ニール・アームストロング", "バズ・オルドリン", "マイケル・コリンズ"],
        exp: "1969年、ニール・アームストロングがアポロ11号で初の月面着陸を果たしました。"
    },
    "최초로 인터넷 프로토콜 TCP/IP가 실제 적용된 해는 언제일까요?": {
        q: "インターネット・プロトコルTCP/IPが実際に適用された年はいつでしょうか？",
        options: ["1969年", "1973年", "1983年", "1991年"],
        exp: "1983年1月1日、ARPANETでTCP/IPが全面適用されました。"
    },
    "다음 중 포유류가 아닌 동물은?": {
        q: "次のうち哺乳類ではない動物はどれでしょうか？",
        options: ["カモノハシ", "クジラ", "ペンギン", "コアラ"],
        exp: "ペンギンは鳥類です。"
    },
    "\"나는 생각한다, 고로 존재한다\"라는 명제를 제시한 철학자는?": {
        q: "『我思う、ゆえに我あり』という命題を提示した哲学者は誰でしょうか？",
        options: ["カント", "デカルト", "ニーチェ", "ソクラテス"],
        exp: "ルネ・デカルトがこの有名な命題を提示しました。"
    },
    "근대 올림픽이 처음 개최된 도시는 어디일까요?": {
        q: "近代オリンピックが初めて開催された都市はどこでしょうか？",
        options: ["アテネ", "ロンドン", "パリ", "ベルリン"],
        exp: "1896年、アテネで第1回近代オリンピックが開催されました。"
    },
    "커피의 원산지로 알려진 지역은?": {
        q: "コーヒーの原産地として知られる地域はどこでしょうか？",
        options: ["コロンビア", "エチオピア", "ブラジル", "インドネシア"],
        exp: "コーヒーはエチオピアのカッファ地方で起源したと伝えられています。"
    },
    "남미에서 수도가 '라파스(La Paz)'인 나라는?": {
        q: "南米で首都が『ラパス（La Paz）』である国はどこでしょうか？",
        options: ["チリ", "ボリビア", "ペルー", "パラグアイ"],
        exp: "ボリビアの行政上の首都はラパスです。"
    },
    "아프리카에서 국토 면적이 가장 작은 나라는?": {
        q: "アフリカで国土面積が最も小さい国はどこでしょうか？",
        options: ["セーシェル", "ルワンダ", "ガボン", "ブルンジ"],
        exp: "セーシェルがアフリカで最も国土が小さい国です。"
    },
    "북유럽에서 수도가 헬싱키인 나라는?": {
        q: "北欧で首都がヘルシンキの国はどこでしょうか？",
        options: ["スウェーデン", "デンマーク", "フィンランド", "ノルウェー"],
        exp: "フィンランドの首都はヘルシンキです。"
    },
    "조선시대 왕과 왕비의 제사를 지내던 장소로, 유네스코 세계문화유산에 등재된 곳은?": {
        q: "朝鮮時代に王と王妃の祭祀を執り行った場所で、ユネスコ世界文化遺産に登録された所はどこでしょうか？",
        options: ["昌徳宮", "宗廟", "景福宮", "徳寿宮"],
        exp: "宗廟は朝鮮王朝の王と王妃の神位を祀る祠堂です。"
    },
    "고려대장경(팔만대장경)을 보관하는 해인사의 건축물은?": {
        q: "高麗大蔵経（八万大蔵経）を保管する海印寺の建築物はどれでしょうか？",
        options: ["蔵経板殿", "梵魚寺 大雄殿", "松広寺 国師殿", "通度寺 金剛戒壇"],
        exp: "蔵経板殿は八万大蔵経を保管する海印寺の建築物です。"
    },
    "경주 불국사에 있는 국보 제20호로, 화려한 장식미를 자랑하는 석탑은?": {
        q: "慶州・仏国寺にある国宝第20号で、華麗な装飾美で知られる石塔はどれでしょうか？",
        options: ["釈迦塔", "多宝塔", "芬皇寺 模塼石塔", "円覚寺 十層石塔"],
        exp: "多宝塔は国宝第20号で華麗な装飾美を誇る石塔です。"
    },
    "일본 나라(奈良)에 있는 불교 사찰로, 세계에서 가장 큰 목조건축물 중 하나는?": {
        q: "日本・奈良にある仏教寺院で、世界最大級の木造建築物の一つはどれでしょうか？",
        options: ["金閣寺", "銀閣寺", "東大寺", "京都・法隆寺"],
        exp: "東大寺は奈良にある巨大な木造建築で有名です。"
    },
    "일본 교토에 위치하며, 가을 단풍으로 유명하고 유네스코 문화유산에 등재된 절은?": {
        q: "日本・京都に位置し、紅葉で有名でユネスコ文化遺産に登録された寺はどれでしょうか？",
        options: ["清水寺", "龍安寺", "銀閣寺", "東福寺"],
        exp: "清水寺は京都の名刹で、秋の紅葉で有名です。"
    },
    "일본의 전통 공연예술 중 하나로, 배우가 가면을 쓰고 엄숙한 분위기에서 연기하는 것은?": {
        q: "日本の伝統芸能の一つで、俳優が仮面をつけ厳粛な雰囲気で演じるものはどれでしょうか？",
        options: ["歌舞伎", "文楽", "能", "狂言"],
        exp: "能（のう）は日本の伝統的な仮面劇です。"
    },
    "지구 대기 중 가장 많은 비율을 차지하는 기체는?": {
        q: "地球の大気中で最も多い割合を占める気体はどれでしょうか？",
        options: ["酸素", "窒素", "二酸化炭素", "アルゴン"],
        exp: "窒素は約78%を占めます。"
    },
    "태양계 행성 중 가장 크기가 작은 행성은?": {
        q: "太陽系の惑星の中で最も小さい惑星はどれでしょうか？",
        options: ["水星", "火星", "金星", "冥王星"],
        exp: "水星が太陽系で最も小さい惑星です。"
    },
    "지구에서 가장 큰 대양은?": {
        q: "地球で最も大きい海洋はどれでしょうか？",
        options: ["太平洋", "大西洋", "インド洋", "北極海"],
        exp: "太平洋は地球で最も大きい海洋です。"
    },
    "일본의 수도는 어디일까요?": {
        q: "日本の首都はどこでしょうか？",
        options: ["東京", "大阪", "京都", "名古屋"],
        exp: "日本の首都は東京です。"
    },
    "세계에서 가장 높은 산은?": {
        q: "世界で最も高い山はどれでしょうか？",
        options: ["エベレスト", "K2", "カンチェンジュンガ", "ローツェ"],
        exp: "エベレストは標高約8,848mで最も高い山です。"
    },
    "인류 최초로 인공위성을 발사한 나라는?": {
        q: "人類が初めて人工衛星を打ち上げた国はどこでしょうか？",
        options: ["アメリカ", "ソ連", "中国", "イギリス"],
        exp: "1957年、ソ連がスプートニク1号を打ち上げました。"
    },
    "축구 경기에서 한 팀이 필드 위에 내보내는 선수 수는?": {
        q: "サッカーの試合で1チームがフィールドに出す選手の人数は何人でしょうか？",
        options: ["9人", "10人", "11人", "12人"],
        exp: "サッカーはゴールキーパーを含め1チーム11人で行います。"
    },
    "물의 끓는점(섭씨)은 보통 몇 도일까요?": {
        q: "水の沸点（摂氏）は通常何度でしょうか？",
        options: ["90度", "95度", "100度", "110度"],
        exp: "標準気圧（1気圧）で水の沸点は100℃です。"
    },
    "가장 유명한 고리를 가진 태양계의 행성은?": {
        q: "最も有名な環を持つ太陽系の惑星はどれでしょうか？",
        options: ["木星", "土星", "天王星", "海王星"],
        exp: "複数の惑星に環がありますが、土星の環が最も有名で目立ちます。"
    },
    "웹에서 사용하는 하이퍼텍스트 전송 프로토콜의 약자는?": {
        q: "ウェブで用いられるハイパーテキスト転送プロトコルの略称は？",
        options: ["FTP", "SMTP", "HTTP", "SSH"],
        exp: "HTTPはHyperText Transfer Protocolの略です。"
    },
    "현재 세계에서 인구가 가장 많은 나라는?": {
        q: "現在、世界で人口が最も多い国はどこでしょうか？",
        options: ["中国", "インド", "アメリカ", "インドネシア"],
        exp: "2023年以降、インドが世界最大の人口を持つ国です。"
    },
    "다음 중 공룡이 살던 중생대의 세 시기를 올바른 순서로 나열한 것은?": {
        q: "次のうち恐竜が生きていた中生代の三つの時代を正しい順に並べたものはどれでしょうか？",
        options: ["ジュラ紀 – 三畳紀 – 白亜紀", "三畳紀 – ジュラ紀 – 白亜紀", "白亜紀 – ジュラ紀 – 三畳紀", "三畳紀 – 白亜紀 – ジュラ紀"],
        exp: "中生代は三畳紀、ジュラ紀、白亜紀の順です。"
    },
    "한국 최초의 올림픽 금메달은 어느 종목에서 나왔을까?": {
        q: "韓国初のオリンピック金メダルはどの競技で出たでしょうか？",
        options: ["アーチェリー", "柔道", "レスリング", "重量挙げ"],
        exp: "1976年モントリオール五輪のレスリングでヤン・ジョンモ選手が金メダルを獲得しました。"
    },
    "일본에서 개최된 첫 하계 올림픽은?": {
        q: "日本で開催された最初の夏季オリンピックはどれでしょうか？",
        options: ["1940年 東京五輪", "1964年 東京五輪", "1972年 札幌五輪", "1998年 長野五輪"],
        exp: "1964年の東京オリンピックが日本初の夏季大会です。"
    },
    "축구 월드컵에서 한국과 일본이 공동 개최한 해는?": {
        q: "サッカー・ワールドカップで韓国と日本が共同開催した年はいつでしょうか？",
        options: ["1998年", "2002年", "2006年", "2010年"],
        exp: "2002年FIFAワールドカップは日韓共同開催で行われました。"
    },
    "세계에서 가장 많은 나라와 국경을 맞대고 있는 나라는?": {
        q: "世界で最も多くの国と国境を接している国はどこでしょうか？",
        options: ["ロシア", "中国", "ドイツ", "ブラジル"],
        exp: "中国は14か国と国境を接しています。"
    },
    "남아시아 국가 스리랑카의 수도는?": {
        q: "南アジアの国スリランカの首都はどこでしょうか？",
        options: ["コロンボ", "キャンディ", "スリジャヤワルダナプラ・コッテ", "マレ"],
        exp: "スリジャヤワルダナプラ・コッテがスリランカの首都です。"
    },
    "아프리카에서 인구가 가장 많은 도시는?": {
        q: "アフリカで人口が最も多い都市はどこでしょうか？",
        options: ["カイロ", "ラゴス", "ナイロビ", "ヨハネスブルグ"],
        exp: "ラゴスがアフリカで最も人口の多い都市です。"
    },
    "세계에서 가장 높은 폭포인 엔젤폭포가 있는 나라는?": {
        q: "世界で最も高い滝であるエンジェルフォールがある国はどこでしょうか？",
        options: ["ベネズエラ", "ブラジル", "コロンビア", "ペルー"],
        exp: "エンジェルフォールはベネズエラにあります。"
    },
    "남극 대륙을 최초로 발견했다고 알려진 국가는?": {
        q: "南極大陸を最初に発見したとされる国はどこでしょうか？",
        options: ["イギリス", "ロシア", "ノルウェー", "アメリカ合衆国"],
        exp: "1820年、ロシアの探検隊が南極大陸を初めて発見しました。"
    },
    "한국에서 현존하는 가장 오래된 목조건축물은?": {
        q: "韓国で現存する最も古い木造建築物はどれでしょうか？",
        options: ["仏国寺 大雄殿", "法住寺 八相殿", "鳳停寺 極楽殿", "修徳寺 大雄殿"],
        exp: "鳳停寺 極楽殿が現存最古の木造建築物です。"
    },
    "세계에서 가장 오래된 금속활자로 인쇄된 책은?": {
        q: "世界で最も古い金属活字で印刷された本はどれでしょうか？",
        options: ["無垢淨光大陀羅尼経", "直指心体要節", "三国史記", "東国正韻"],
        exp: "直指心体要節は1377年に製作された現存最古の金属活字本です。"
    },
    "종묘제례악은 어떤 성격을 가진 음악일까요?": {
        q: "宗廟祭礼楽はどのような性格を持つ音楽でしょうか？",
        options: ["仏教の儀式音楽", "宮中の祭礼音楽", "巫俗の儀式音楽", "農楽"],
        exp: "宗廟祭礼楽は朝鮮王室の祭祀音楽です。"
    },
    "세계에서 가장 오래된 별 관측소로 알려진 한국의 문화유산은?": {
        q: "世界で最も古い星の観測所として知られる韓国の文化遺産はどれでしょうか？",
        options: ["瞻星台", "崇礼門", "石氷庫", "月精橋"],
        exp: "瞻星台は新羅時代の天文観測所です。"
    },
    "조선시대 왕실의 기록 보관소로, 세계기록유산에 등재된 것은?": {
        q: "朝鮮時代の王室の記録保管所で、世界記録遺産に登録されたものはどれでしょうか？",
        options: ["奎章閣", "蔵書閣", "朝鮮王朝実録", "承政院日記"],
        exp: "朝鮮王朝実録が世界記録遺産に登録されました。"
    },
    "일본 나라(奈良)에 위치한 세계문화유산 사찰로, 5층 목탑으로 유명한 곳은?": {
        q: "日本・奈良に位置する世界文化遺産の寺院で、五重塔で有名な所はどれでしょうか？",
        options: ["東大寺", "法隆寺", "金閣寺", "銀閣寺"],
        exp: "法隆寺は五重塔で有名な世界文化遺産です。"
    },
    "일본의 전통 정원의 미학적 특징으로 옳지 않은 것은?": {
        q: "日本の伝統庭園の美学的特徴として正しくないものはどれでしょうか？",
        options: ["非対称的構成", "人工的造形物の最小化", "直線的な対称の強調", "季節の変化を考慮した配置"],
        exp: "日本の伝統庭園は自然な非対称を追求します。"
    },
    "일본의 대표적 전통 인형극은?": {
        q: "日本を代表する伝統の人形劇はどれでしょうか？",
        options: ["文楽", "歌舞伎", "能", "狂言"],
        exp: "文楽は日本の伝統的な人形劇です。"
    },
    "세계 최초로 세계문화유산과 자연유산을 동시에 보유한 일본의 섬은?": {
        q: "世界で初めて文化遺産と自然遺産を同時に保有した日本の島はどれでしょうか？",
        options: ["北海道", "屋久島", "沖縄", "京都"],
        exp: "屋久島は複合遺産として登録された日本の島です。"
    },
    "일본의 전통 다도(茶道)를 체계화한 인물은?": {
        q: "日本の伝統である茶道を体系化した人物は誰でしょうか？",
        options: ["千利休", "徳川家康", "織田信長", "宮本武蔵"],
        exp: "千利休が日本の茶道を体系化しました。"
    },
    "최초로 지동설을 주장한 고대 그리스 학자는?": {
        q: "最初に地動説を主張した古代ギリシャの学者は誰でしょうか？",
        options: ["アリストテレス", "コペルニクス", "アリスタルコス", "ガリレオ"],
        exp: "アリスタルコスが最初に地動説を唱えました。"
    },
    "인체에서 가장 작은 뼈는?": {
        q: "人体で最も小さい骨はどれでしょうか？",
        options: ["アブミ骨", "椎骨", "背骨", "鼓室骨"],
        exp: "アブミ骨は耳の中にある最も小さい骨です。"
    },
    "빛의 세 가지 원색은?": {
        q: "光の三原色はどれでしょうか？",
        options: ["赤・黄・青", "赤・緑・青", "赤・青・白", "緑・黄・青"],
        exp: "光の三原色は赤・緑・青です。"
    },
    "인류가 처음으로 원자폭탄을 투하한 도시는?": {
        q: "人類が初めて原子爆弾を投下した都市はどこでしょうか？",
        options: ["東京", "長崎", "広島", "大阪"],
        exp: "1945年8月6日、広島に原子爆弾が投下されました。"
    },
    "세계 최초로 인류의 게놈 지도를 완성한 프로젝트의 이름은?": {
        q: "世界で初めて人類ゲノム地図を完成させたプロジェクトの名称は？",
        options: ["GenomeX", "DNA2020", "ヒトゲノム計画", "BioMap"],
        exp: "Human Genome Project（ヒトゲノム計画）がゲノム地図を完成させました。"
    },
    "『파우스트』를 쓴 독일의 대문호는?": {
        q: "『ファウスト』を書いたドイツの大文豪は誰でしょうか？",
        options: ["ゲーテ", "シラー", "ハイネ", "トーマス・マン"],
        exp: "ヨハン・ヴォルフガング・フォン・ゲーテが『ファウスト』を書きました。"
    },
    "피카소의 화풍 중, '게르니카'를 대표하는 시기는?": {
        q: "ピカソの画風のうち、『ゲルニカ』を代表する時期はどれでしょうか？",
        options: ["青の時代", "バラ色の時代", "キュビズム（立体派）", "ゲルニカ時代"],
        exp: "『ゲルニカ』はピカソのキュビズム（立体派）の代表作です。"
    },
    "세계 3대 비극 작가로 알려진 고대 그리스 인물은 아닌 사람은?": {
        q: "世界三大悲劇作家として知られる古代ギリシャの人物ではないのは誰でしょうか？",
        options: ["アイスキュロス", "ソフォクレス", "エウリピデス", "ホメロス"],
        exp: "ホメロスは叙事詩人で、三大悲劇作家はアイスキュロス、ソフォクレス、エウリピデスです。"
    },
    "셰익스피어의 4대 비극이 아닌 것은?": {
        q: "シェイクスピアの四大悲劇ではないのはどれでしょうか？",
        options: ["リア王", "オセロ", "マクベス", "ロミオとジュリエット"],
        exp: "『ロミオとジュリエット』は悲劇ですが四大悲劇には含まれません。"
    },
    "한국 현대시에서 '진달래꽃'을 쓴 시인은?": {
        q: "韓国現代詩で『ツツジの花』を書いた詩人は誰でしょうか？",
        options: ["尹東柱", "金素月", "李箱", "白石"],
        exp: "金素月が『ツツジの花（진달래꽃）』を書きました。"
    },
    "한국 프로야구 원년은 언제일까?": {
        q: "韓国プロ野球の元年はいつでしょうか？",
        options: ["1979年", "1982年", "1984年", "1986年"],
        exp: "韓国プロ野球は1982年に始まりました。"
    },
    "올림픽 마라톤에서 최초로 2연패를 달성한 선수는?": {
        q: "オリンピック・マラソンで初めて2連覇を達成した選手は誰でしょうか？",
        options: ["孫基禎", "アベベ・ビキラ", "エミール・ザトペック", "カルロス・ロペス"],
        exp: "アベベ・ビキラは1960年と1964年の五輪で連覇しました。"
    },
    "노벨 평화상을 가장 많이 수상한 나라는?": {
        q: "ノーベル平和賞を最も多く受賞した国はどこでしょうか？",
        options: ["アメリカ合衆国", "スウェーデン", "スイス", "ノルウェー"],
        exp: "アメリカ合衆国が最も多くのノーベル平和賞受賞者を出しています。"
    },
    "세계 최초의 인터넷(ARPANET)이 처음 연결된 해는?": {
        q: "世界初のインターネット（ARPANET）が初めて接続された年はいつでしょうか？",
        options: ["1965年", "1969年", "1973年", "1983年"],
        exp: "1969年、ARPANETが構築されインターネットの始まりとなりました。"
    },
    // 4경기 고난이도 문제 번역
    "양자역학의 불확정성 원리를 제시한 독일 물리학자의 이름은?": {
        q: "量子力学の不確定性原理を提示したドイツの物理学者は誰でしょうか？",
        options: ["ニールス・ボーア", "ヴェルナー・ハイゼンベルク", "エルヴィン・シュレーディンガー", "ヴォルフガング・パウリ"],
        exp: "ヴェルナー・ハイゼンベルクが1927年に不確定性原理を発表しました。"
    },
    "DNA의 이중나선 구조를 발견한 과학자 조합으로 옳은 것은?": {
        q: "DNAの二重らせん構造を発見した科学者の組み合わせで正しいものはどれでしょうか？",
        options: ["ワトソンとクリック", "ダーウィンとメンデル", "パスツールとコッホ", "フランクリンとウィルキンス"],
        exp: "ジェームズ・ワトソンとフランシス・クリックが1953年にDNAの二重らせん構造を解明しました。"
    },
    "일본 에도시대 대표 화가로 '부악삼십육경(富嶽三十六景)'을 그린 우키요에 작가는?": {
        q: "日本の江戸時代を代表する画家で、『富嶽三十六景』を描いた浮世絵作家は誰でしょうか？",
        options: ["葛飾北斎", "歌川広重", "喜多川歌麿", "東洲斎写楽"],
        exp: "葛飾北斎が富士山三十六景を描いた代表的な浮世絵画家です。"
    },
    "중세 유럽에서 연금술사들이 찾고자 했던 '만물을 금으로 바꾸는 물질'을 무엇이라 했는가?": {
        q: "中世ヨーロッパで錬金術師たちが探し求めた『万物を金に変える物質』を何といいましたか？",
        options: ["賢者の石", "エリクサー", "王水", "フィロソフィア"],
        exp: "賢者の石（Philosopher's Stone）は非金属を金に変換できると信じられた物質です。"
    },
    "프랑스 인상파 화가 모네의 작품 '인상, 해돋이'가 전시된 연도는?": {
        q: "フランスの印象派画家モネの作品『印象・日の出』が展示された年はいつでしょうか？",
        options: ["1862年", "1874年", "1886年", "1894年"],
        exp: "1874年の展覧会で『印象・日の出』が公開され、印象主義という名称が誕生しました。"
    },
    "셰익스피어의 4대 비극에 속하지 않는 작품은?": {
        q: "シェイクスピアの四大悲劇に含まれない作品はどれでしょうか？",
        options: ["ハムレット", "オセロ", "アントニーとクレオパトラ", "リア王"],
        exp: "四大悲劇はハムレット、オセロ、リア王、マクベスです。"
    },
    "고대 그리스의 스토아학파 철학자로 로마 황제이기도 했던 인물은?": {
        q: "古代ギリシャのストア派哲学者であり、ローマ皇帝でもあった人物は誰でしょうか？",
        options: ["セネカ", "マルクス・アウレリウス", "エピクテトス", "ゼノン"],
        exp: "マルクス・アウレリウスはローマ五賢帝の一人であり、ストア派哲学者でした。"
    },
    "20세기 초 독일 표현주의 미술 그룹 '다리파(Die Brücke)'의 중심 인물은?": {
        q: "20世紀初頭のドイツ表現主義美術グループ『ブリュッケ（Die Brücke）』の中心人物は誰でしょうか？",
        options: ["エルンスト・ルートヴィヒ・キルヒナー", "ワシリー・カンディンスキー", "パウル・クレー", "エゴン・シーレ"],
        exp: "キルヒナーはブリュッケの創設メンバーであり、代表的な表現主義画家です。"
    },
    "노벨 문학상을 수상한 최초의 아시아인 작가는?": {
        q: "ノーベル文学賞を受賞した最初のアジア人作家は誰でしょうか？",
        options: ["川端康成", "タゴール", "大江健三郎", "魯迅"],
        exp: "インドの詩人ラビンドラナート・タゴールが1913年にアジア初のノーベル文学賞を受賞しました。"
    },
    "고대 바빌로니아의 법전 '함무라비 법전'의 핵심 원칙은?": {
        q: "古代バビロニアの法典『ハンムラビ法典』の核心原則は何でしょうか？",
        options: ["黄金律", "同害報復法", "自然法", "慣習法"],
        exp: "ハンムラビ法典は『目には目を、歯には歯を』の同害報復法を基盤としています。"
    },
    "르네상스 시대 피렌체 메디치 가문의 후원을 받은 조각가로 '다비드상'을 제작한 인물은?": {
        q: "ルネサンス時代のフィレンツェのメディチ家の支援を受けた彫刻家で、『ダビデ像』を制作した人物は誰でしょうか？",
        options: ["レオナルド・ダ・ヴィンチ", "ミケランジェロ", "ドナテッロ", "ベルニーニ"],
        exp: "ミケランジェロのダビデ像（1501-1504）はルネサンス彫刻の傑作です。"
    },
    "일본 헤이안 시대 문학의 대표작 '겐지모노가타리(源氏物語)'의 저자는?": {
        q: "日本の平安時代文学の代表作『源氏物語』の著者は誰でしょうか？",
        options: ["紫式部", "清少納言", "和泉式部", "更級日記"],
        exp: "紫式部が11世紀初頭に書いた世界最初の長編小説です。"
    },
    "상대성이론을 제안한 아인슈타인이 노벨 물리학상을 받은 연구 주제는?": {
        q: "相対性理論を提唱したアインシュタインがノーベル物理学賞を受賞した研究テーマは何でしょうか？",
        options: ["一般相対性理論", "特殊相対性理論", "光電効果", "ブラウン運動"],
        exp: "アインシュタインは1921年に光電効果の研究でノーベル賞を受賞しました。"
    },
    "중국 송나라 시대에 발명되어 세계사를 바꾼 '4대 발명'에 속하지 않는 것은?": {
        q: "中国の宋代に発明され世界史を変えた『四大発明』に含まれないものはどれでしょうか？",
        options: ["火薬", "羅針盤", "印刷術", "蒸気機関"],
        exp: "中国の四大発明は火薬、羅針盤、印刷術、紙です。"
    },
    "프랑스 계몽사상가 볼테르의 대표 풍자소설은?": {
        q: "フランスの啓蒙思想家ヴォルテールの代表的な風刺小説はどれでしょうか？",
        options: ["カンディード", "百科全書", "社会契約論", "ペルシア人の手紙"],
        exp: "『カンディード』はヴォルテールの代表的な風刺小説で楽観主義を批判します。"
    },
    "고대 그리스 철학자 플라톤이 세운 학교의 이름은?": {
        q: "古代ギリシャの哲学者プラトンが設立した学校の名前は何でしょうか？",
        options: ["アカデメイア", "リュケイオン", "ストア", "キュニコス"],
        exp: "プラトンは紀元前387年頃にアテネにアカデメイアを設立しました。"
    },
    "중세 이슬람 세계에서 철학, 의학, 수학을 집대성한 학자 이븐 시나의 라틴어 이름은?": {
        q: "中世イスラム世界で哲学、医学、数学を集大成した学者イブン・シーナーのラテン語名は何でしょうか？",
        options: ["アヴィセンナ", "アヴェロエス", "アル＝フワーリズミー", "アル＝ファーラービー"],
        exp: "イブン・シーナーのラテン語名はアヴィセンナ（Avicenna）です。"
    },
    // 주관식 문제 번역
    "셰익스피어의 4대 비극 작품 4개를 모두 말하시오.": {
        q: "シェイクスピアの四大悲劇作品を全て答えてください。",
        options: [],
        exp: "シェイクスピアの四大悲劇はハムレット、オセロ、リア王、マクベスです。",
        answer: "ハムレット（Hamlet）、オセロ（Othello）、リア王（King Lear）、マクベス（Macbeth）",
        hint: "ヒント：Hで始まる作品、Oで始まる作品、Kで始まる作品、Mで始まる作品"
    },
    "르네상스 3대 예술가의 이름을 모두 말하시오.": {
        q: "ルネサンス三大芸術家の名前を全て答えてください。",
        options: [],
        exp: "ルネサンス三大巨匠はレオナルド・ダ・ヴィンチ、ミケランジェロ、ラファエロです。",
        answer: "レオナルド・ダ・ヴィンチ（Leonardo da Vinci）、ミケランジェロ（Michelangelo）、ラファエロ（Raphael）",
        hint: "ヒント：モナリザを描いた画家、システィーナ礼拝堂の天井画を描いた画家、アテネの学堂を描いた画家"
    },
    "프랑스 혁명의 3대 이념을 순서대로 말하시오.": {
        q: "フランス革命の三大理念を順番に答えてください。",
        options: [],
        exp: "フランス革命の三大理念は自由、平等、友愛です。",
        answer: "自由（Liberté）、平等（Égalité）、友愛（Fraternité）",
        hint: "ヒント：Lで始まる、Éで始まる、Fで始まる（フランス語順）"
    },
    "원소 주기율표에서 첫 번째 원소(수소)의 원소기호와 원자번호를 말하시오.": {
        q: "元素周期表で最初の元素（水素）の元素記号と原子番号を答えてください。",
        options: [],
        exp: "水素の元素記号はHで、原子番号は1です。",
        answer: "H（元素記号）、1（原子番号）",
        hint: "ヒント：Hydrogenの最初の文字、最小の自然数"
    },
    "한국의 3대 명절을 모두 말하시오.": {
        q: "韓国の三大名節を全て答えてください。",
        options: [],
        exp: "韓国の三大名節は旧正月（ソルラル）、秋夕（チュソク）、端午（タノ）です。",
        answer: "旧正月（ソルラル）、秋夕（チュソク）、端午（タノ）",
        hint: "ヒント：陰暦1月1日、陰暦8月15日、陰暦5月5日"
    },
    "태양계 8개 행성을 태양에서 가까운 순서대로 모두 나열하시오.": {
        q: "太陽系の8つの惑星を太陽に近い順に全て並べてください。",
        options: [],
        exp: "太陽系の8つの惑星は水星、金星、地球、火星、木星、土星、天王星、海王星の順です。",
        answer: "水星（Mercury）、金星（Venus）、地球（Earth）、火星（Mars）、木星（Jupiter）、土星（Saturn）、天王星（Uranus）、海王星（Neptune）",
        hint: "ヒント：水金地火木土天海（My Very Educated Mother Just Served Us Nachos）"
    },
    "세계 3대 미술관의 이름을 말하시오.": {
        q: "世界三大美術館の名前を答えてください。",
        options: [],
        exp: "世界三大美術館はルーヴル美術館、大英博物館、メトロポリタン美術館です。",
        answer: "ルーヴル美術館（Louvre Museum）、大英博物館（British Museum）、メトロポリタン美術館（Metropolitan Museum）",
        hint: "ヒント：パリにある博物館、ロンドンにある博物館、ニューヨークにある博物館"
    },
    "노벨상 6개 부문의 이름을 모두 말하시오.": {
        q: "ノーベル賞6部門の名前を全て答えてください。",
        options: [],
        exp: "ノーベル賞は物理学、化学、生理学・医学、文学、平和、経済学の6部門があります。",
        answer: "物理学賞、化学賞、生理学・医学賞、文学賞、平和賞、経済学賞",
        hint: "ヒント：科学3つ（物理、化学、医学）、人文1つ、社会2つ"
    },
    "세계 4대 문명 발상지를 모두 말하시오.": {
        q: "世界四大文明の発祥地を全て答えてください。",
        options: [],
        exp: "世界四大文明はメソポタミア、エジプト、インダス、黄河文明です。",
        answer: "メソポタミア文明、エジプト文明、インダス文明、黄河文明",
        hint: "ヒント：チグリス・ユーフラテス川、ナイル川、インダス川、黄河流域"
    },
    "올림픽 5륜기의 5가지 색깔을 모두 말하시오.": {
        q: "オリンピック五輪旗の5つの色を全て答えてください。",
        options: [],
        exp: "オリンピック五輪旗は青、黄、黒、緑、赤の5色で構成されています。",
        answer: "青、黄、黒、緑、赤",
        hint: "ヒント：五大陸を象徴し、白地に5つの輪で構成"
    },
    "한국의 5대 궁궐 이름을 모두 말하시오.": {
        q: "韓国の五大宮殿の名前を全て答えてください。",
        options: [],
        exp: "朝鮮時代の漢陽（ソウル）の五大宮殿は景福宮、昌徳宮、昌慶宮、徳寿宮、慶熙宮です。",
        answer: "景福宮（キョンボックン）、昌徳宮（チャンドックン）、昌慶宮（チャンギョングン）、徳寿宮（トクスグン）、慶熙宮（キョンヒグン）",
        hint: "ヒント：景で始まる2つ、昌で始まる2つ、徳で始まる1つ"
    },
    "세계 3대 종교를 신자 수가 많은 순서대로 나열하시오.": {
        q: "世界三大宗教を信者数が多い順に並べてください。",
        options: [],
        exp: "世界三大宗教はキリスト教、イスラム教、ヒンドゥー教の順です。",
        answer: "キリスト教（Christianity）、イスラム教（Islam）、ヒンドゥー教（Hinduism）",
        hint: "ヒント：イエス、ムハンマド、ブラフマーを信じる宗教の順に"
    },
    "베토벤의 3대 교향곡(영웅, 운명, 합창)의 번호를 순서대로 말하시오.": {
        q: "ベートーヴェンの三大交響曲（英雄、運命、合唱）の番号を順に答えてください。",
        options: [],
        exp: "ベートーヴェンの三大交響曲は3番英雄、5番運命、9番合唱です。",
        answer: "交響曲第3番（英雄）、交響曲第5番（運命）、交響曲第9番（合唱）",
        hint: "ヒント：奇数番号のみ該当（3、5、9番）"
    },
    "빛의 3원색을 모두 말하시오.": {
        q: "光の三原色を全て答えてください。",
        options: [],
        exp: "光の三原色は赤（Red）、緑（Green）、青（Blue）です。",
        answer: "赤（Red）、緑（Green）、青（Blue）",
        hint: "ヒント：RGB（コンピュータモニターの色表現方式）"
    },
    "한국 전통 음악의 3대 악기를 말하시오.": {
        q: "韓国伝統音楽の三大楽器を答えてください。",
        options: [],
        exp: "韓国伝統音楽の代表的な楽器は伽耶琴、玄琴、笛です。",
        answer: "伽耶琴（カヤグム）、玄琴（コムンゴ）、笛（ピリ）",
        hint: "ヒント：弦楽器2つ（6弦、12弦）、管楽器1つ"
    }
};

// 번역 헬퍼: 주어진 퀴즈 객체에 대한 일본어 번역을 반환 (없으면 null)
function getJPTranslationForQuiz(quiz) {
    const t = quizTranslationsJP[quiz.question];
    if (!t) return null;
    // 주관식 문제는 options가 빈 배열이므로 체크하지 않음
    if (quiz.type === 'essay') {
        return t;
    }
    // 객관식 문제는 options가 4개여야 함
    if (!t.options || t.options.length !== 4) return null;
    return t;
}

// 퀴즈 예시 문제
const sampleQuizData = {
    question: "한국에서 가장 높은 산은 무엇일까요?",
    options: ["지리산", "한라산", "백두산", "설악산"],
    correct: "C",
    explanation: "백두산은 해발 2,744m로 한국에서 가장 높은 산입니다."
};

// 예시 문제 일본어 번역
const sampleQuizTranslationJP = {
    q: "韓国で最も高い山はどれでしょうか？",
    options: ["智異山（チリサン）", "漢拏山（ハルラサン）", "白頭山（ペクトゥサン）", "雪嶽山（ソラクサン）"],
    exp: "白頭山は標高2,744mで韓国最高峰です。"
};

// 퀴즈쇼 관련 변수
let currentGame = 1; // 현재 경기 번호
let currentQuizIndex = 0;
let selectedAnswer = null;
let isAnswerShown = false;
let gameTimer = null;
let gameTimeLeft = 240; // 기본 4분 = 240초

// 경기별 타이머 시간 설정
function getGameTimeLimit(gameNumber) {
    switch (gameNumber) {
        case 1:
        case 2:
        case 3:
            return 240; // 1~3경기: 4분
        case 4:
            return 300; // 4경기: 5분
        default:
            return 240; // 기본: 4분
    }
}

// 문제 순서 랜덤 섞기 관련 상태
let quizShuffled = false;
let originalQuizDataBackup = null;

// Fisher-Yates 셔플 (퀴즈용 - 배열을 직접 수정)
function shuffleQuizArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// 1~3경기만 합쳐서 섞고 재분배하는 함수 (기본 셔플)
function shuffleGames123() {
    const gameKeys = ['game1', 'game2', 'game3'];
    
    // 각 경기 문제 수 기록
    const counts = gameKeys.map(k => quizDataByGame[k].length);

    // 1~3경기 문제 풀 수집
    const pool = [];
    gameKeys.forEach(k => {
        quizDataByGame[k].forEach(q => pool.push(q));
    });

    // 전체 셔플
    shuffleQuizArray(pool);

    // 다시 분배
    let offset = 0;
    gameKeys.forEach((k, idx) => {
        const size = counts[idx];
        quizDataByGame[k] = pool.slice(offset, offset + size);
        offset += size;
    });
}

// 4경기만 문제 순서 섞기 (결승전 셔플)
function shuffleGame4Only() {
    if (!quizDataByGame.game4 || quizDataByGame.game4.length === 0) return;
    
    // 4경기 문제만 섞기 (배열 내부에서 순서만 변경)
    shuffleQuizArray(quizDataByGame.game4);
}

// 기본 셔플: 1~3경기만 섞기
function randomizeQuizOrder() {
    if (!originalQuizDataBackup) {
        // 최초 실행 시 원본 백업
        originalQuizDataBackup = JSON.parse(JSON.stringify(quizDataByGame));
    }
    shuffleGames123();
    quizShuffled = true;
    currentGame = 1;
    currentQuizIndex = 0;
    showAlert('1~3경기의 문제 순서를 무작위로 섞어 재배치했습니다. (겹침 없이 분배)', 'success');
    // 관리 리스트 갱신
    const management = document.getElementById('quizManagement');
    if (management && management.style.display === 'block') {
        updateQuizList();
    }
}

// 결승전 셔플: 4경기만 섞기
function randomizeFinalQuizOrder() {
    if (!originalQuizDataBackup) {
        // 최초 실행 시 원본 백업
        originalQuizDataBackup = JSON.parse(JSON.stringify(quizDataByGame));
    }
    shuffleGame4Only();
    showAlert('4경기(결승전)의 문제 순서를 무작위로 섞었습니다.', 'success');
    // 관리 리스트 갱신
    const management = document.getElementById('quizManagement');
    if (management && management.style.display === 'block') {
        updateQuizList();
    }
}

// 섹션 전환
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
}

// 팀 관리
function addTeam() {
    const teamInputs = document.getElementById('teamInputs');
    const teamIndex = teamInputs.children.length;

    const teamDiv = document.createElement('div');
    teamDiv.className = 'team-input';
    teamDiv.innerHTML = `
        <input type="text" placeholder="팀 ${teamIndex + 1} 이름" id="team${teamIndex}">
        <button class="remove-team-btn" onclick="removeTeam(${teamIndex})">삭제</button>
    `;
    teamInputs.appendChild(teamDiv);
}

function removeTeam(index) {
    const teamInputs = document.getElementById('teamInputs');
    if (teamInputs.children.length > 2) {
        teamInputs.children[index].remove();
        updateTeamIndices();
    }
}

function updateTeamIndices() {
    const inputs = document.querySelectorAll('#teamInputs input');
    inputs.forEach((input, index) => {
        input.id = `team${index}`;
        input.placeholder = `팀 ${index + 1} 이름`;
    });
}

function initializeTeams() {
    teams = [];
    const inputs = document.querySelectorAll('#teamInputs input');

    inputs.forEach((input, index) => {
        const teamName = input.value.trim() || `팀 ${index + 1}`;
        teams.push({
            name: teamName,
            score: 0,
            id: index
        });
    });

    updateScoreboard();
    showAlert('팀 설정이 완료되었습니다!', 'success');
}

function updateScoreboard() {
    const container = document.getElementById('scoreboardContainer');
    container.innerHTML = '';

    teams.forEach((team, index) => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        teamCard.style.background = getTeamColor(index);

        teamCard.innerHTML = `
            <div class="team-name">${team.name}</div>
            <div class="team-score">${team.score}</div>
            <div class="score-controls">
                <button class="score-btn plus" onclick="changeScore(${index}, 100)">+100</button>
                <button class="score-btn plus" onclick="changeScore(${index}, 50)">+50</button>
                <button class="score-btn plus" onclick="changeScore(${index}, 10)">+10</button>
                <button class="score-btn minus" onclick="changeScore(${index}, -10)">-10</button>
                <button class="score-btn minus" onclick="changeScore(${index}, -50)">-50</button>
                <button class="score-btn minus" onclick="changeScore(${index}, -100)">-100</button>
                <button class="score-btn reset" onclick="resetScore(${index})">리셋</button>
            </div>
        `;

        container.appendChild(teamCard);
    });
}

function getTeamColor(index) {
    const colors = [
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    ];
    return colors[index % colors.length];
}

function changeScore(teamIndex, change) {
    teams[teamIndex].score += change;
    if (teams[teamIndex].score < 0) teams[teamIndex].score = 0;
    updateScoreboard();
}

function resetScore(teamIndex) {
    teams[teamIndex].score = 0;
    updateScoreboard();
}

function resetAllScores() {
    teams.forEach(team => team.score = 0);
    updateScoreboard();
    showAlert('모든 팀의 점수가 초기화되었습니다!', 'info');
}

function showWinner() {
    if (teams.length === 0) {
        showAlert('먼저 팀을 설정해주세요!', 'warning');
        return;
    }

    const maxScore = Math.max(...teams.map(team => team.score));
    const winners = teams.filter(team => team.score === maxScore);

    if (winners.length === 1) {
        showAlert(`🏆 우승팀: ${winners[0].name} (${maxScore}점)`, 'success');
    } else if (winners.length > 1) {
        const winnerNames = winners.map(team => team.name).join(', ');
        showAlert(`🏆 공동 우승: ${winnerNames} (${maxScore}점)`, 'success');
    } else {
        showAlert('아직 점수가 없습니다!', 'info');
    }
}

// 순위별 발표 함수 (1등=우승, 2등, 3등)
function showRankingOverlay(rank) {
    const overlay = document.getElementById('winnerOverlay');
    const textEl = document.getElementById('winnerText');
    const audio = document.getElementById('drumrollAudio');
    if (!overlay || !textEl || !audio) {
        showAlert('오버레이 요소 또는 오디오를 찾을 수 없습니다.', 'warning');
        return;
    }

    // 팀 확인
    if (!teams || teams.length === 0) {
        showAlert('먼저 팀을 설정해주세요!', 'warning');
        return;
    }

    // 점수별로 팀 정렬 (내림차순)
    const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
    
    // 동점자 처리를 위해 고유 점수 목록 생성
    const uniqueScores = [...new Set(sortedTeams.map(t => t.score))].sort((a, b) => b - a);
    
    // 요청한 순위가 존재하는지 확인
    if (rank > uniqueScores.length) {
        showAlert(`${rank}등에 해당하는 팀이 없습니다.`, 'warning');
        return;
    }
    
    // 해당 순위의 점수
    const targetScore = uniqueScores[rank - 1];
    
    // 해당 점수를 가진 팀들
    const rankedTeams = sortedTeams.filter(t => t.score === targetScore);
    
    // 발표 메시지 생성
    let rankLabel;
    switch(rank) {
        case 1:
            rankLabel = '🥇 우승팀';
            break;
        case 2:
            rankLabel = '🥈 2등';
            break;
        case 3:
            rankLabel = '🥉 3등';
            break;
        default:
            rankLabel = `${rank}등`;
    }
    
    const teamNames = rankedTeams.length > 1
        ? rankedTeams.map(t => t.name).join(', ')
        : rankedTeams[0].name;
    
    textEl.textContent = `${rankLabel}\n\n${teamNames}`;
    
    showOverlayAnimation(overlay, textEl, audio);
}

// 기존 우승팀 발표 함수 (하위 호환성)
function showWinnerOverlay() {
    showRankingOverlay(1);
}

// 전체 순위 표시 오버레이
function showFullRankingsOverlay() {
    const overlay = document.getElementById('rankingsOverlay');
    const container = document.getElementById('rankingsFullscreenContainer');
    
    if (!overlay || !container) {
        showAlert('순위 표시 요소를 찾을 수 없습니다.', 'warning');
        return;
    }
    
    // 팀 확인
    if (!teams || teams.length === 0) {
        showAlert('먼저 팀을 설정해주세요!', 'warning');
        return;
    }
    
    // 점수별로 팀 정렬 (내림차순)
    const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
    
    // 고유 점수 목록 생성 (순위 계산용)
    const uniqueScores = [...new Set(sortedTeams.map(t => t.score))].sort((a, b) => b - a);
    
    // 순위 표시
    container.innerHTML = '';
    
    sortedTeams.forEach((team, index) => {
        // 실제 순위 계산 (동점자는 같은 순위)
        const rank = uniqueScores.indexOf(team.score) + 1;
        
        const rankingDiv = document.createElement('div');
        rankingDiv.className = `rankings-fullscreen-item rank-${rank}`;
        
        // 메달 이모지
        let medal = '';
        if (rank === 1) medal = '🥇';
        else if (rank === 2) medal = '🥈';
        else if (rank === 3) medal = '🥉';
        
        rankingDiv.innerHTML = `
            ${medal ? `<div class="rankings-fullscreen-medal">${medal}</div>` : ''}
            <div class="rankings-fullscreen-position">${rank}위</div>
            <div class="rankings-fullscreen-team">
                <div class="rankings-fullscreen-team-name">${team.name}</div>
            </div>
        `;
        
        container.appendChild(rankingDiv);
    });
    
    // 오버레이 표시
    overlay.style.display = 'flex';
    overlay.classList.add('active');
    document.body.classList.add('no-scroll');
    
    // 닫기 핸들러 설정
    const close = () => {
        overlay.classList.remove('active');
        overlay.style.display = 'none';
        document.body.classList.remove('no-scroll');
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        }
        // 이벤트 제거
        const btn = document.getElementById('rankingsCloseBtn');
        if (btn) btn.removeEventListener('click', close);
        document.removeEventListener('keydown', onEsc);
    };
    
    const onEsc = (e) => { if (e.key === 'Escape') close(); };
    
    const btn = document.getElementById('rankingsCloseBtn');
    if (btn) {
        btn.removeEventListener('click', close); // 기존 이벤트 제거
        btn.addEventListener('click', close);
    }
    document.removeEventListener('keydown', onEsc); // 기존 이벤트 제거
    document.addEventListener('keydown', onEsc);
    
    // 전체화면 진입
    if (overlay.requestFullscreen) {
        overlay.requestFullscreen().catch(() => {});
    }
}

// 오버레이 애니메이션 실행
function showOverlayAnimation(overlay, textEl, audio) {
    // 초기 상태 리셋
    overlay.style.display = 'flex';
    overlay.classList.add('active');
    document.body.classList.add('no-scroll');
    textEl.classList.remove('reveal', 'shake', 'visible');
    // 인라인 스타일 제거하여 CSS 클래스가 제대로 적용되도록
    textEl.style.opacity = '';
    textEl.style.transform = '';

    // 오디오 시작점에서 재생 (일부 브라우저 정책으로 사용자 제스처 필요)
    try {
        audio.currentTime = 0;
    } catch (e) {}
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => {
            // 자동재생 실패 시 사용자에게 한 번 더 클릭 유도
            // overlay 클릭 시 재시도
        });
    }

    // 약 5초 후 텍스트 등장
    const revealDelay = 5000; // ms
    const revealTimer = setTimeout(() => {
        console.log('5초 후 텍스트 보이기 시작:', textEl.textContent);
        textEl.classList.add('visible');
    }, revealDelay);

    // 닫기 핸들러 설정 (중복 등록 방지 위해 한 번만)
    const close = () => {
        clearTimeout(revealTimer);
        audio.pause();
        overlay.classList.remove('active');
        overlay.style.display = 'none';
        document.body.classList.remove('no-scroll');
        textEl.classList.remove('reveal', 'shake', 'visible');
        // 인라인 스타일도 완전 정리
        textEl.style.opacity = '';
        textEl.style.transform = '';
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        }
        // 이벤트 제거
        const btn = document.getElementById('winnerCloseBtn');
        if (btn) btn.removeEventListener('click', close);
        document.removeEventListener('keydown', onEsc);
    };

    const onEsc = (e) => { if (e.key === 'Escape') close(); };

    const btn = document.getElementById('winnerCloseBtn');
    if (btn) btn.addEventListener('click', close);
    document.addEventListener('keydown', onEsc);

    // 실제 브라우저 전체화면 진입 (사용자 제스처 기반이므로 성공 확률 높음)
    if (overlay.requestFullscreen) {
        overlay.requestFullscreen().catch(() => {});
    }
}

// 타이머 기능
function setTimer(seconds) {
    currentTime = seconds;
    console.log('타이머 설정됨:', seconds, '초');
    updateTimerDisplay();
}

function startTimer() {
    console.log('타이머 시작 시도, 현재 실행 상태:', isRunning);
    if (!isRunning) {
        isRunning = true;
        console.log('타이머 시작됨');
        timerInterval = setInterval(() => {
            currentTime--;
            console.log('타이머 카운트다운:', currentTime);
            updateTimerDisplay();

            if (currentTime === 10) {
                showAlert('⚠️ 10초 남았습니다!', 'warning');
                playSound('warning');
            }

            if (currentTime <= 0) {
                pauseTimer();
                showAlert('⏰ 시간 종료!', 'info');
                playSound('end');

                // 자동모드에서 타이머 종료 시 다음 게임으로 자동 전환
                if (autoMode) {
                    setTimeout(() => {
                        nextGame();
                    }, 2000);
                }
            }
        }, 1000);
        playSound('start');
    }
}

function pauseTimer() {
    isRunning = false;
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    pauseTimer();
    currentTime = 0;
    updateTimerDisplay();
}

function addTime(seconds) {
    currentTime += seconds;
    updateTimerDisplay();
}

function subtractTime(seconds) {
    currentTime -= seconds;
    if (currentTime < 0) currentTime = 0;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    const displayText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    console.log('타이머 표시 업데이트:', displayText);
    const timerEl = document.getElementById('timerDisplay');
    if (timerEl) {
        timerEl.textContent = displayText;
    } else {
        console.error('타이머 표시 요소를 찾을 수 없습니다');
    }
}

// 게임 진행 상태 관리
function toggleAutoMode() {
    autoMode = !autoMode;
    const btn = document.querySelector('.auto-mode-toggle');
    btn.textContent = autoMode ? '자동모드 OFF' : '자동모드 ON';
    btn.style.background = autoMode ?
        'linear-gradient(45deg, #f093fb, #f5576c)' :
        'linear-gradient(45deg, #43e97b, #38f9d7)';

    updateModeStatus();

    if (autoMode) {
        showAlert('타이머 자동 진행 모드가 활성화되었습니다. 타이머 종료 시 다음 게임으로 자동 전환됩니다.', 'info');
    } else {
        showAlert('타이머 자동 진행이 비활성화되었습니다.', 'info');
    }
}

function toggleRealTimeMode() {
    realTimeMode = !realTimeMode;
    manualMode = !realTimeMode;

    const btn = document.querySelector('.realtime-toggle');
    btn.textContent = realTimeMode ? '실시간모드 OFF' : '실시간모드 ON';
    btn.style.background = realTimeMode ?
        'linear-gradient(45deg, #ff6b6b, #ee5a24)' :
        'linear-gradient(45deg, #667eea, #764ba2)';

    updateModeStatus();

    if (realTimeMode) {
        // 실시간 모드 활성화 시 현재 시간에 맞는 게임으로 즉시 전환
        updateCurrentTime();
        showAlert('실시간 모드가 활성화되었습니다. 현재 시간에 따라 게임이 자동으로 전환됩니다.', 'info');
    } else {
        showAlert('수동 모드가 활성화되었습니다. 게임 전환을 직접 제어할 수 있습니다.', 'info');
    }
}

function setGameIndex(index) {
    if (index >= 0 && index < gameSchedule.length) {
        currentGameIndex = index;
        updateGameProgress();
        showAlert(`게임이 "${gameSchedule[index].name}"로 변경되었습니다.`, 'info');
    }
}

function jumpToGame(gameIndex) {
    setGameIndex(gameIndex);
}

function nextGame() {
    if (currentGameIndex < gameSchedule.length - 1) {
        currentGameIndex++;
        updateGameProgress();
        showAlert(`다음 게임: ${gameSchedule[currentGameIndex].name}`, 'info');
    }
}

function previousGame() {
    if (currentGameIndex > 0) {
        currentGameIndex--;
        updateGameProgress();
        showAlert(`이전 게임: ${gameSchedule[currentGameIndex].name}`, 'info');
    }
}

function updateGameProgress() {
    const progress = document.getElementById('gameProgress');
    if (progress) {
        const current = gameSchedule[currentGameIndex];
        const progressPercent = (currentGameIndex / (gameSchedule.length - 1)) * 100;
        progress.innerHTML = `
            <div class="progress-title">현재 진행: ${current.name}</div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progressPercent}%"></div>
            </div>
            <div>시간: ${current.start} ~ ${current.end} (${current.duration}분)</div>
            ${currentGameIndex < gameSchedule.length - 1 ?
                `<div class="next-game">다음: ${gameSchedule[currentGameIndex + 1].name}</div>` :
                '<div class="next-game">모든 게임 완료!</div>'}
        `;
    }

    // 게임 선택 UI도 업데이트
    updateGameSelector();
    updateModeStatus();
}

function updateGameSelector() {
    const container = document.getElementById('gameSelector');
    if (!container) return;

    container.innerHTML = gameSchedule.map((game, index) =>
        `<button class="game-selector-btn ${index === currentGameIndex ? 'current' : ''}" 
                 onclick="jumpToGame(${index})">
            ${index + 1}. ${game.name}
            <br><small>${game.start} ~ ${game.end}</small>
         </button>`
    ).join('');
}

function updateModeStatus() {
    const status = document.getElementById('modeStatus');
    if (!status) return;

    let statusText = '';
    if (realTimeMode) {
        statusText = '현재: 실시간 모드 (시간에 따라 자동 전환)';
    } else if (autoMode) {
        statusText = '현재: 수동 모드 + 타이머 자동 진행';
    } else {
        statusText = '현재: 완전 수동 모드 (모든 전환을 직접 제어)';
    }

    status.textContent = statusText;
}

// 게임별 맞춤 타이머 설정
function setGameTimer(gameType) {
    switch (gameType) {
        case 'body':
            setTimer(120); // 몸으로 말해요 - 팀당 2분
            break;
        case 'balloon':
            setTimer(180); // 발목 풍선 터뜨리기 - 경기당 3분
            break;
        case 'pingpong':
            setTimer(240); // 탁구공 옮기기 - 경기당 4분
            break;
        case 'card':
            setTimer(180); // 카드 뒤집기 - 경기당 3분
            break;
        case 'drawing':
            setTimer(80); // 등 맞대고 그림그리기 - 팀당 1분 20초
            break;
        case 'spoon':
            setTimer(120); // 오타마 릴레이 - 경기당 2분
            break;
        case 'explanation':
            setTimer(300); // 게임 설명용 - 5분
            break;
        case 'break':
            setTimer(180); // 휴식시간 - 3분
            break;
    }
    updateTimerDisplay();
}

// 사운드 기능
function playSound(type) {
    // 특정 효과음(mp3) 직접 재생 타입들
    if (type === 'end') {
        const audio = new Audio('bedside-clock-alarm-95792.mp3');
        audio.volume = 0.7;
        audio.play().catch(e => console.log('Audio play failed:', e));
        return;
    }
    if (type === 'correct') {
        // 정답 효과음: 고전 띵동 (정답.mp3
        const audio = new Audio('고전 띵동 (정답.mp3');
        audio.volume = 0.9;
        audio.play().catch(e => console.log('Audio play failed:', e));
        return;
    }
    if (type === 'wrong') {
        // 오답 효과음: 063_삐삑 (오답 -짧은).mp3
        const audio = new Audio('063_삐삑 (오답 -짧은).mp3');
        audio.volume = 0.9;
        audio.play().catch(e => console.log('Audio play failed:', e));
        return;
    }

    // 다른 사운드는 기존 방식 사용
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    function createBeep(frequency, duration) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }

    switch (type) {
        case 'start':
            createBeep(800, 0.2);
            setTimeout(() => createBeep(1000, 0.3), 200);
            break;
        case 'warning':
            for (let i = 0; i < 3; i++) {
                setTimeout(() => createBeep(1200, 0.1), i * 150);
            }
            break;
    }
}

// 알림 시스템
function showAlert(message, type) {
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.textContent = message;

    document.querySelector('.container').insertBefore(alert, document.querySelector('.game-progress'));

    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// 추가 기능들
function distributeGamePoints() {
    if (teams.length === 0) {
        showAlert('먼저 팀을 설정해주세요!', 'warning');
        return;
    }

    const ranking = teams.map((team, index) => ({ ...team, index }))
        .sort((a, b) => b.score - a.score);

    let message = `현재 순위:\n`;
    ranking.forEach((team, rank) => {
        const position = rank + 1;
        let points = 0;
        if (position === 1) points = 3;
        else if (position === 2) points = 2;
        else if (position === 3) points = 1;

        message += `${position}등: ${team.name} (${team.score}점) -> +${points + 1}점\n`;
        teams[team.index].score += (points + 1);
    });

    updateScoreboard();
    showAlert(message, 'success');
}

function showGameRanking() {
    if (teams.length === 0) {
        showAlert('먼저 팀을 설정해주세요!', 'warning');
        return;
    }

    const ranking = teams.map(team => team)
        .sort((a, b) => b.score - a.score);

    let message = `현재 전체 순위:\n`;
    ranking.forEach((team, index) => {
        message += `${index + 1}등: ${team.name} (${team.score}점)\n`;
    });

    showAlert(message, 'info');
}

function quickAlert(message) {
    showAlert(message, 'info');
    playSound('warning');
}

// 토너먼트 기능
function createTournament() {
    if (teams.length < 2) {
        showAlert('토너먼트를 위해서는 최소 2팀이 필요합니다!', 'warning');
        return;
    }

    tournament.active = true;
    tournament.rounds = [];
    tournament.currentRound = 0;

    // 첫 번째 라운드 생성
    const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
    const firstRound = [];

    // 6팀인 경우: 2팀씩 3경기 -> 3팀 동시 경기
    if (shuffledTeams.length === 6) {
        // 1라운드: 2팀씩 3경기
        for (let i = 0; i < 6; i += 2) {
            firstRound.push({
                team1: shuffledTeams[i],
                team2: shuffledTeams[i + 1],
                winner: null,
                completed: false
            });
        }
        tournament.rounds.push(firstRound);

        // 2라운드: 3팀 동시 결승전 (1,2,3등 결정)
        tournament.rounds.push([{
            teams: [], // 1라운드 승자들이 들어감
            rankings: [], // 최종 순위
            completed: false,
            isFinalRound: true
        }]);
    } else {
        // 일반적인 토너먼트 브래킷 생성
        let currentTeams = shuffledTeams;

        while (currentTeams.length > 1) {
            const roundMatches = [];
            const nextRoundTeams = [];

            // 홀수 팀인 경우 한 팀은 부전승
            if (currentTeams.length % 2 === 1) {
                nextRoundTeams.push(currentTeams.pop());
            }

            for (let i = 0; i < currentTeams.length; i += 2) {
                if (i + 1 < currentTeams.length) {
                    roundMatches.push({
                        team1: currentTeams[i],
                        team2: currentTeams[i + 1],
                        winner: null,
                        completed: false
                    });
                }
            }

            tournament.rounds.push(roundMatches);
            currentTeams = nextRoundTeams;
        }
    }

    updateTournamentDisplay();
    showAlert('토너먼트가 시작되었습니다!', 'success');
}

function updateTournamentDisplay() {
    const container = document.getElementById('tournamentContainer');
    if (!container) return;

    if (!tournament.active) {
        container.innerHTML = `
            <div class="tournament-controls">
                <button class="nav-btn" onclick="createTournament()">토너먼트 시작</button>
                <p>팀을 먼저 설정한 후 토너먼트를 시작하세요.</p>
            </div>
        `;
        return;
    }

    let html = `
        <div class="tournament-controls">
            <button class="nav-btn" onclick="resetTournament()">토너먼트 초기화</button>
            <button class="nav-btn" onclick="showTournamentWinner()">최종 우승자 발표</button>
        </div>
        <div class="bracket-flow">
    `;

    tournament.rounds.forEach((round, roundIndex) => {
        if (roundIndex > 0) {
            html += `
                <div class="bracket-connector">
                    <div class="connector-line"></div>
                </div>
            `;
        }

        html += `
            <div class="bracket-round">
                <div class="round-title">
                    ${roundIndex === tournament.rounds.length - 1 ? '결승전' :
                roundIndex === tournament.rounds.length - 2 ? '준결승' :
                    `${roundIndex + 1}라운드`}
                </div>
                <div class="round-matches">
        `;

        if (round[0] && round[0].isFinalRound) {
            // 3팀 동시 결승전
            html += `
                <div class="tournament-match">
                    <h4>최종 결승전 (3팀 동시)</h4>
                    <div class="final-teams">
            `;

            // 1라운드 승자들 표시
            const winners = tournament.rounds[0]
                .filter(match => match.winner)
                .map(match => match.winner);

            winners.forEach((team, index) => {
                html += `
                    <div class="match-team ${round[0].rankings.includes(team) ? 'winner' : ''}" 
                         onclick="setFinalRanking(${roundIndex}, 0, ${team.id})">
                        ${team.name}
                        ${round[0].rankings.indexOf(team) >= 0 ?
                        `(${round[0].rankings.indexOf(team) + 1}등)` : ''}
                    </div>
                `;
            });

            html += `
                    </div>
                    <p style="text-align: center; color: #666; margin-top: 10px;">
                        팀을 클릭하여 순위를 결정하세요 (1등부터 순서대로)
                    </p>
                </div>
            `;
        } else {
            // 일반 매치들
            round.forEach((match, matchIndex) => {
                html += `
                    <div class="tournament-match">
                        <div class="match-teams">
                            <div class="match-team ${match.winner === match.team1 ? 'winner' : match.completed && match.winner !== match.team1 ? 'eliminated' : ''}" 
                                 onclick="selectWinner(${roundIndex}, ${matchIndex}, 'team1')">
                                ${match.team1.name}
                            </div>
                            <div class="match-vs">VS</div>
                            <div class="match-team ${match.winner === match.team2 ? 'winner' : match.completed && match.winner !== match.team2 ? 'eliminated' : ''}" 
                                 onclick="selectWinner(${roundIndex}, ${matchIndex}, 'team2')">
                                ${match.team2.name}
                            </div>
                        </div>
                        ${match.completed ?
                        `<div style="text-align: center; margin-top: 10px; color: #43e97b; font-weight: bold;">
                             승자: ${match.winner.name}
                           </div>` :
                        `<div style="text-align: center; margin-top: 5px; color: #666; font-size: 0.9rem;">
                             승자를 클릭하세요
                           </div>`}
                    </div>
                `;
            });
        }

        html += `
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

function selectWinner(roundIndex, matchIndex, teamSide) {
    const match = tournament.rounds[roundIndex][matchIndex];

    if (match.completed) return;

    match.winner = match[teamSide];
    match.completed = true;

    // 다음 라운드에 승자 추가
    if (roundIndex < tournament.rounds.length - 1) {
        const nextRound = tournament.rounds[roundIndex + 1];

        if (nextRound[0] && nextRound[0].isFinalRound) {
            // 3팀 동시 결승전으로 진출
            // 모든 1라운드 경기가 끝났는지 확인
            const allCompleted = tournament.rounds[roundIndex].every(m => m.completed);
            if (allCompleted) {
                showAlert('1라운드가 완료되었습니다! 3팀이 최종 결승에 진출했습니다.', 'success');
            }
        } else {
            // 일반 토너먼트 브래킷
            const nextMatchIndex = Math.floor(matchIndex / 2);
            if (!nextRound[nextMatchIndex]) {
                nextRound[nextMatchIndex] = {
                    team1: null,
                    team2: null,
                    winner: null,
                    completed: false
                };
            }

            if (!nextRound[nextMatchIndex].team1) {
                nextRound[nextMatchIndex].team1 = match.winner;
            } else {
                nextRound[nextMatchIndex].team2 = match.winner;
            }
        }
    }

    updateTournamentDisplay();
    showAlert(`${match.winner.name}이(가) 승리했습니다!`, 'success');
    playSound('start');
}

function setFinalRanking(roundIndex, matchIndex, teamId) {
    const finalRound = tournament.rounds[roundIndex][matchIndex];
    const team = teams.find(t => t.id === teamId);

    if (finalRound.rankings.includes(team)) {
        // 이미 순위가 정해진 팀을 다시 클릭하면 순위에서 제거
        finalRound.rankings = finalRound.rankings.filter(t => t !== team);
    } else {
        // 새로운 순위 추가
        if (finalRound.rankings.length < 3) {
            finalRound.rankings.push(team);
        }
    }

    // 모든 순위가 결정되면 완료 처리
    if (finalRound.rankings.length === 3) {
        finalRound.completed = true;
        showAlert('최종 결승이 완료되었습니다! 점수판에서 수동으로 점수를 부여하세요.', 'success');
    }

    updateTournamentDisplay();
}

function resetTournament() {
    tournament.active = false;
    tournament.rounds = [];
    tournament.currentRound = 0;
    updateTournamentDisplay();
    showAlert('토너먼트가 초기화되었습니다.', 'info');
}

function showTournamentWinner() {
    if (!tournament.active) {
        showAlert('진행 중인 토너먼트가 없습니다.', 'warning');
        return;
    }

    const finalRound = tournament.rounds[tournament.rounds.length - 1][0];
    if (finalRound && finalRound.isFinalRound && finalRound.completed) {
        const rankings = finalRound.rankings;
        let message = '🏆 토너먼트 최종 순위:\n';
        rankings.forEach((team, index) => {
            const rank = ['🥇', '🥈', '🥉'];
            message += `${rank[index]} ${index + 1}등: ${team.name}\n`;
        });
        showAlert(message, 'success');
    } else {
        showAlert('토너먼트가 아직 완료되지 않았습니다.', 'warning');
    }
}

// 실시간 시계 기능
function updateCurrentTime() {
    // 실시간 모드가 활성화된 경우에만 자동으로 게임 전환
    if (!realTimeMode) return;

    const now = new Date();
    const currentTimeMinutes = now.getHours() * 60 + now.getMinutes();

    for (let i = 0; i < gameSchedule.length; i++) {
        const game = gameSchedule[i];
        const [startHour, startMin] = game.start.split(':').map(Number);
        const [endHour, endMin] = game.end.split(':').map(Number);
        const startMinutes = startHour * 60 + startMin;
        const endMinutes = endHour * 60 + endMin;

        if (currentTimeMinutes >= startMinutes && currentTimeMinutes <= endMinutes) {
            if (currentGameIndex !== i) {
                currentGameIndex = i;
                updateGameProgress();
                showAlert(`실시간 모드: ${game.name} 시간입니다!`, 'info');
            }
            break;
        }
    }
}

// 제시어 표시 기능
function showWordDisplay(content, type = 'word') {
    let overlay = document.getElementById('wordDisplayOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'wordDisplayOverlay';
        overlay.className = 'word-display-overlay';
        overlay.innerHTML = `
            <div class="word-display-content">
                <div class="word-display-text" id="wordDisplayText" style="display: none;"></div>
                <img class="word-display-image" id="wordDisplayImage" style="display: none;" alt="그림">
                <div class="word-display-controls">
                    <button class="word-display-btn next" onclick="showNextWord()">다음</button>
                    <button class="word-display-btn" onclick="showRandomWord()">랜덤</button>
                    <button class="word-display-btn close" onclick="hideWordDisplay()">닫기</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    const textEl = document.getElementById('wordDisplayText');
    const imageEl = document.getElementById('wordDisplayImage');

    if (type === 'word') {
        textEl.textContent = content;
        textEl.style.display = 'block';
        imageEl.style.display = 'none';
        currentDisplayData = { content, type };
    } else if (type === 'image') {
        imageEl.src = content.url;
        imageEl.alt = content.name;
        textEl.style.display = 'none';
        imageEl.style.display = 'block';
        currentDisplayData = { content, type };
    }

    overlay.classList.add('active');
    playSound('start');
}

function hideWordDisplay() {
    const overlay = document.getElementById('wordDisplayOverlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
    currentDisplayData = null;
}

function showNextWord() {
    if (currentDisplayData) {
        if (currentDisplayData.type === 'word') {
            const currentIndex = wordData.bodyLanguage.words.indexOf(currentDisplayData.content);
            const nextIndex = (currentIndex + 1) % wordData.bodyLanguage.words.length;
            showWordDisplay(wordData.bodyLanguage.words[nextIndex], 'word');
        } else if (currentDisplayData.type === 'image') {
            const currentIndex = wordData.drawing.images.findIndex(img => img.url === currentDisplayData.content.url);
            const nextIndex = (currentIndex + 1) % wordData.drawing.images.length;
            showWordDisplay(wordData.drawing.images[nextIndex], 'image');
        }
    }
}

function showRandomWord() {
    if (currentDisplayData) {
        if (currentDisplayData.type === 'word') {
            const randomWord = wordData.bodyLanguage.words[Math.floor(Math.random() * wordData.bodyLanguage.words.length)];
            showWordDisplay(randomWord, 'word');
        } else if (currentDisplayData.type === 'image') {
            const randomImage = wordData.drawing.images[Math.floor(Math.random() * wordData.drawing.images.length)];
            showWordDisplay(randomImage, 'image');
        }
    }
}

function displayRandomBodyWord() {
    const randomWord = wordData.bodyLanguage.words[Math.floor(Math.random() * wordData.bodyLanguage.words.length)];
    showWordDisplay(randomWord, 'word');
}

function displayRandomDrawingImage() {
    const randomImage = wordData.drawing.images[Math.floor(Math.random() * wordData.drawing.images.length)];
    showWordDisplay(randomImage, 'image');
}

function displaySpecificWord(word) {
    showWordDisplay(word, 'word');
}

function displaySpecificImage(imageData) {
    showWordDisplay(imageData, 'image');
}

// 제시어 관리 기능
function addCustomWord(category) {
    const input = document.getElementById(`add-${category}-input`);
    const word = input.value.trim();

    if (word) {
        if (category === 'body') {
            wordData.bodyLanguage.words.push(word);
        } else if (category === 'custom') {
            wordData.customWords.push(word);
        }

        input.value = '';
        updateWordManagement();
        showAlert(`"${word}" 제시어가 추가되었습니다!`, 'success');
    }
}

function removeWord(category, word) {
    if (category === 'body') {
        const index = wordData.bodyLanguage.words.indexOf(word);
        if (index > -1) {
            wordData.bodyLanguage.words.splice(index, 1);
        }
    } else if (category === 'custom') {
        const index = wordData.customWords.indexOf(word);
        if (index > -1) {
            wordData.customWords.splice(index, 1);
        }
    }

    updateWordManagement();
    showAlert(`"${word}" 제시어가 삭제되었습니다!`, 'info');
}

function updateWordManagement() {
    const container = document.getElementById('wordManagementContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="word-management">
            <h3>제시어 관리</h3>
            <div class="word-categories">
                <!-- 몸으로 말해요 카테고리 -->
                <div class="word-category">
                    <div class="category-title">${wordData.bodyLanguage.title} (${wordData.bodyLanguage.words.length}개)</div>
                    <div class="word-list">
                        ${wordData.bodyLanguage.words.map(word =>
        `<span class="word-tag" onclick="displaySpecificWord('${word}')" 
                             oncontextmenu="removeWord('body', '${word}'); return false;" 
                             title="클릭: 표시, 우클릭: 삭제">${word}</span>`
    ).join('')}
                    </div>
                    <input type="text" class="add-word-input" id="add-body-input" placeholder="새 제시어 추가..." 
                           onkeypress="if(event.key==='Enter') addCustomWord('body')">
                    <div class="category-controls">
                        <button class="category-btn add" onclick="addCustomWord('body')">추가</button>
                        <button class="category-btn random" onclick="displayRandomBodyWord()">랜덤 표시</button>
                    </div>
                </div>

                <!-- 그림 그리기 카테고리 -->
                <div class="word-category">
                    <div class="category-title">${wordData.drawing.title} (${wordData.drawing.images.length}개)</div>
                    <div class="drawing-images">
                        ${wordData.drawing.images.map(img =>
        `<img src="${img.url}" alt="${img.name}" class="drawing-image" 
                             onclick="displaySpecificImage(${JSON.stringify(img).replace(/"/g, '&quot;')})" 
                             title="${img.name}">`
    ).join('')}
                    </div>
                    <div class="category-controls">
                        <button class="category-btn random" onclick="displayRandomDrawingImage()">랜덤 표시</button>
                    </div>
                </div>

                <!-- 사용자 정의 제시어 -->
                <div class="word-category">
                    <div class="category-title">사용자 정의 제시어 (${wordData.customWords.length}개)</div>
                    <div class="word-list">
                        ${wordData.customWords.map(word =>
        `<span class="word-tag" onclick="displaySpecificWord('${word}')" 
                             oncontextmenu="removeWord('custom', '${word}'); return false;" 
                             title="클릭: 표시, 우클릭: 삭제">${word}</span>`
    ).join('')}
                    </div>
                    <input type="text" class="add-word-input" id="add-custom-input" placeholder="새 제시어 추가..." 
                           onkeypress="if(event.key==='Enter') addCustomWord('custom')">
                    <div class="category-controls">
                        <button class="category-btn add" onclick="addCustomWord('custom')">추가</button>
                        <button class="category-btn random" onclick="if(wordData.customWords.length > 0) displaySpecificWord(wordData.customWords[Math.floor(Math.random() * wordData.customWords.length)])">랜덤 표시</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ESC 키로 제시어 표시 닫기
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        hideWordDisplay();
    }
});

// 배경 이미지 관리
function initializeBackground() {
    const bgElement = document.querySelector('.dynamic-background');
    if (bgElement && backgroundImages.length > 0) {
        bgElement.style.backgroundImage = `url(${backgroundImages[0]})`;

        // 배경 이미지 슬라이드쇼 시작
        setInterval(() => {
            currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
            bgElement.style.backgroundImage = `url(${backgroundImages[currentBackgroundIndex]})`;
        }, 10000); // 10초마다 배경 변경
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', function () {
    updateGameProgress();
    updateWordManagement();
    updateGameSelector();
    updateModeStatus();
    initializeBackground();

    // 실시간 시계 추가
    const timeDisplay = document.createElement('div');
    timeDisplay.className = 'current-time';
    document.body.appendChild(timeDisplay);

    // 1초마다 시간 업데이트
    setInterval(() => {
        const now = new Date();
        timeDisplay.textContent = now.toLocaleTimeString('ko-KR', { hour12: false });
        updateCurrentTime();
    }, 1000);
});

// 퀴즈쇼 관련 함수들
function showQuizMode() {
    document.getElementById('quiz').classList.add('active');
    document.querySelector('[onclick="showSection(\'quiz\')"]').click();
}

function showQuizManagement() {
    const management = document.getElementById('quizManagement');
    management.style.display = management.style.display === 'none' ? 'block' : 'none';
    
    if (management.style.display === 'block') {
        updateQuizList();
    }
}

function updateQuizList() {
    const container = document.getElementById('quizList');
    let allQuestions = '';
    
    Object.keys(quizDataByGame).forEach((gameKey, gameIndex) => {
        const gameNumber = gameIndex + 1;
        const gameQuestions = quizDataByGame[gameKey];
        
        allQuestions += `<h3>${gameNumber}경기 문제들 (${gameQuestions.length}개)</h3>`;
        
        allQuestions += gameQuestions.map((quiz, index) => `
            <div class="quiz-item">
                <div class="quiz-question">${gameNumber}-${index + 1}. ${quiz.question}</div>
                <div class="quiz-options">
                    A) ${quiz.options[0]}<br>
                    B) ${quiz.options[1]}<br>
                    C) ${quiz.options[2]}<br>
                    D) ${quiz.options[3]}
                </div>
                <div class="quiz-answer">정답: ${quiz.correct} - ${quiz.options[quiz.correct.charCodeAt(0) - 65]}</div>
            </div>
        `).join('');
    });
    
    container.innerHTML = allQuestions;
}

function startQuizShow() {
    console.log('퀴즈쇼 시작 버튼 클릭됨');
    
    currentGame = 1;
    currentQuizIndex = 0;
    selectedAnswer = null;
    isAnswerShown = false;
    gameTimeLeft = getGameTimeLimit(currentGame); // 경기별 시간 설정
    
    const fullscreen = document.getElementById('quizShowFullscreen');
    console.log('전체화면 요소:', fullscreen);
    
    if (fullscreen) {
        fullscreen.style.display = 'block';
        fullscreen.classList.add('active');
        console.log('전체화면 모드 활성화됨');
        startGameTimer();
        loadQuestion();
    } else {
        console.error('quizShowFullscreen 요소를 찾을 수 없습니다');
    }
}

function closeQuizShow() {
    const fullscreen = document.getElementById('quizShowFullscreen');
    fullscreen.style.display = 'none';
    fullscreen.classList.remove('active');
    
    // 타이머 정리
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
}

function loadQuestion() {
    console.log('문제 로딩 시작, 현재 경기:', currentGame, '문제 인덱스:', currentQuizIndex);
    
    const currentGameQuestions = quizDataByGame[`game${currentGame}`];
    
    if (!currentGameQuestions) {
        console.error(`game${currentGame} 데이터가 없습니다`);
        return;
    }
    
    // 순차적으로 문제 진행
    if (currentQuizIndex >= currentGameQuestions.length) {
        // 현재 경기의 모든 문제를 다 했을 때
        if (currentGame < 4) {
            alert(`${currentGame}경기의 모든 문제가 완료되었습니다! 다음 경기로 넘어갑니다.`);
            currentGame++;
            currentQuizIndex = 0;
            gameTimeLeft = getGameTimeLimit(currentGame); // 경기별 시간 설정
            startGameTimer();
        } else {
            alert('🎉 모든 경기의 모든 문제가 완료되었습니다! 퀴즈가 종료됩니다.');
            closeQuizShow();
            return;
        }
    }
    
    const quiz = currentGameQuestions[currentQuizIndex];
    console.log('현재 퀴즈:', quiz);
    
    // 퀴즈 제목 업데이트
    const quizTitle = document.getElementById('quizTitle');
    if (quizTitle) {
        quizTitle.textContent = `${currentGame}경기 단합 퀴즈`;
    }
    
    // 진행도 업데이트
    const currentQuestionEl = document.getElementById('currentQuestion');
    const totalQuestionsEl = document.getElementById('totalQuestions');
    
    if (currentQuestionEl && totalQuestionsEl) {
        currentQuestionEl.textContent = currentQuizIndex + 1;
        totalQuestionsEl.textContent = currentGameQuestions.length;
    }
    
    // 문제 표시 (한-일 병기)
    const questionTextEl = document.getElementById('questionText');
    if (questionTextEl && quiz) {
        const t = getJPTranslationForQuiz(quiz);
        if (t) {
            questionTextEl.innerHTML = `${quiz.question}<br><span class="jp">${t.q}</span>`;
        } else {
            questionTextEl.textContent = quiz.question;
        }
    }
    
    // 주관식 문제인지 확인
    const isEssay = quiz.type === 'essay';
    const optionsSection = document.querySelector('.options-section');
    
    // 힌트 버튼 표시/숨김 (주관식 문제만)
    const showHintBtn = document.getElementById('showHintBtn');
    if (showHintBtn) {
        if (isEssay && quiz.hint) {
            showHintBtn.style.display = 'inline-block';
        } else {
            showHintBtn.style.display = 'none';
        }
    }
    
    // 힌트 섹션 숨기기 (새 문제 로드 시)
    const hintSection = document.getElementById('hintSection');
    if (hintSection) {
        hintSection.style.display = 'none';
    }
    
    if (isEssay) {
        // 주관식: 선택지 숨기기
        if (optionsSection) optionsSection.style.display = 'none';
    } else {
        // 객관식: 선택지 표시
        if (optionsSection) optionsSection.style.display = 'grid';
        
        const options = ['A', 'B', 'C', 'D'];
        const t = getJPTranslationForQuiz(quiz);
        options.forEach((letter, index) => {
            const optionElement = document.getElementById(`option${letter}`);
            if (optionElement && quiz && quiz.options[index]) {
                const optionText = optionElement.querySelector('.option-text');
                if (optionText) {
                    if (t) {
                        optionText.innerHTML = `${quiz.options[index]}<br><span class="jp">${t.options[index]}</span>`;
                    } else {
                        optionText.textContent = quiz.options[index];
                    }
                }
                optionElement.classList.remove('selected', 'correct', 'wrong', 'disabled');
            }
        });
    }
    
    // 답안 섹션 숨기기
    const answerSection = document.getElementById('answerSection');
    const showAnswerBtn = document.getElementById('showAnswerBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    
    if (answerSection) answerSection.style.display = 'none';
    if (showAnswerBtn) showAnswerBtn.style.display = 'inline-block';
    if (nextQuestionBtn) nextQuestionBtn.style.display = 'none';
    
    selectedAnswer = null;
    isAnswerShown = false;
    
    console.log('문제 로딩 완료');
}

function selectOption(letter) {
    if (isAnswerShown) return;

    // 예시 모드 처리
    if (currentGame === 0) {
        const correctAnswer = sampleQuizData.correct;
        
        // 비활성화된 보기 클릭 방지
        const targetEl = document.getElementById(`option${letter}`);
        if (targetEl && targetEl.classList.contains('disabled')) return;

        // 클릭한 보기를 시각적으로 선택 상태로 표시
        const clicked = document.getElementById(`option${letter}`);
        if (clicked) {
            clicked.classList.add('selected');
        }

        selectedAnswer = letter;

        if (letter === correctAnswer) {
            // 정답: 즉시 해설 표시 및 정답 하이라이트, 효과음 재생
            showSampleAnswer();
            // 모든 보기 비활성화
            document.querySelectorAll('.option').forEach(opt => opt.classList.add('disabled'));
            playSound('correct');
        } else {
            // 오답: 해당 보기 비활성화 + 오답 표시, 효과음 재생
            if (clicked) {
                clicked.classList.add('wrong', 'disabled');
                clicked.classList.remove('selected');
            }
            playSound('wrong');
        }
        return;
    }

    // 일반 게임 모드 처리
    const currentGameQuestions = quizDataByGame[`game${currentGame}`];
    const quiz = currentGameQuestions[currentQuizIndex];
    const correctAnswer = quiz.correct;

    // 비활성화된 보기 클릭 방지
    const targetEl = document.getElementById(`option${letter}`);
    if (targetEl && targetEl.classList.contains('disabled')) return;

    // 클릭한 보기를 시각적으로 선택 상태로 표시
    const clicked = document.getElementById(`option${letter}`);
    if (clicked) {
        clicked.classList.add('selected');
    }

    selectedAnswer = letter;

    if (letter === correctAnswer) {
        // 정답: 즉시 해설 표시 및 정답 하이라이트, 효과음 재생
        showAnswer();
        // 모든 보기 비활성화
        document.querySelectorAll('.option').forEach(opt => opt.classList.add('disabled'));
        playSound('correct');
    } else {
        // 오답: 해당 보기 비활성화 + 오답 표시, 효과음 재생
        if (clicked) {
            clicked.classList.add('wrong', 'disabled');
            clicked.classList.remove('selected');
        }
        playSound('wrong');
        // 오답 시에는 해설을 열지 않고, 다른 보기를 계속 선택 가능
    }
}

function showSampleAnswer() {
    if (isAnswerShown) return;
    
    const correctAnswer = sampleQuizData.correct;
    
    // 정답 표시
    const options = ['A', 'B', 'C', 'D'];
    options.forEach(letter => {
        const optionElement = document.getElementById(`option${letter}`);
        if (letter === correctAnswer) {
            optionElement.classList.add('correct');
        } else if (letter === selectedAnswer && letter !== correctAnswer) {
            optionElement.classList.add('wrong');
        }
    });
    
    // 정답 설명 표시 (한-일 병기)
    const answerSection = document.getElementById('answerSection');
    const correctAnswerText = sampleQuizData.options[correctAnswer.charCodeAt(0) - 65];
    const correctAnswerTextJP = sampleQuizTranslationJP.options[correctAnswer.charCodeAt(0) - 65];
    document.getElementById('correctAnswerText').innerHTML = `${correctAnswer} - ${correctAnswerText}<br><span class="jp">${correctAnswerTextJP}</span>`;
    document.getElementById('explanationText').innerHTML = `${sampleQuizData.explanation}<br><span class="jp">${sampleQuizTranslationJP.exp}</span>`;
    
    answerSection.style.display = 'block';
    document.getElementById('showAnswerBtn').style.display = 'none';
    document.getElementById('nextQuestionBtn').style.display = 'none'; // 예시에서는 다음 문제 없음
    
    isAnswerShown = true;
}

// 힌트 표시 함수
function showHint() {
    const currentGameQuestions = quizDataByGame[`game${currentGame}`];
    if (!currentGameQuestions) return;
    
    const quiz = currentGameQuestions[currentQuizIndex];
    if (!quiz || !quiz.hint) return;
    
    const hintSection = document.getElementById('hintSection');
    const hintText = document.getElementById('hintText');
    
    const t = getJPTranslationForQuiz(quiz);
    
    // 힌트 내용 구성 (한국어 + 일본어)
    let hintContent = `<p style="font-size: 1.3rem; margin-bottom: 10px;">${quiz.hint}</p>`;
    
    if (t && t.hint) {
        hintContent += `<p class="jp" style="font-size: 1.1rem; opacity: 0.9;">${t.hint}</p>`;
    }
    
    hintText.innerHTML = hintContent;
    hintSection.style.display = 'block';
}

function showAnswer() {
    if (isAnswerShown) return;
    
    // 예시 모드 처리
    if (currentGame === 0) {
        showSampleAnswer();
        return;
    }
    
    // 일반 게임 모드 처리
    const currentGameQuestions = quizDataByGame[`game${currentGame}`];
    const quiz = currentGameQuestions[currentQuizIndex];
    const isEssay = quiz.type === 'essay';
    
    if (isEssay) {
        // 주관식 문제: 정답을 바로 표시
        const answerSection = document.getElementById('answerSection');
        const t = getJPTranslationForQuiz(quiz);
        
        if (t && t.answer) {
            document.getElementById('correctAnswerText').innerHTML = `${quiz.answer}<br><span class="jp">${t.answer}</span>`;
            document.getElementById('explanationText').innerHTML = `${quiz.explanation}<br><span class="jp">${t.exp}</span>`;
        } else {
            document.getElementById('correctAnswerText').textContent = quiz.answer;
            document.getElementById('explanationText').textContent = quiz.explanation;
        }
        
        answerSection.style.display = 'block';
        document.getElementById('showAnswerBtn').style.display = 'none';
        document.getElementById('nextQuestionBtn').style.display = 'inline-block';
        
        isAnswerShown = true;
    } else {
        // 객관식 문제: 기존 로직
        const correctAnswer = quiz.correct;
        
        // 정답 표시
        const options = ['A', 'B', 'C', 'D'];
        options.forEach(letter => {
            const optionElement = document.getElementById(`option${letter}`);
            if (letter === correctAnswer) {
                optionElement.classList.add('correct');
            } else if (letter === selectedAnswer && letter !== correctAnswer) {
                optionElement.classList.add('wrong');
            }
        });
        
        // 정답 설명 표시
        const answerSection = document.getElementById('answerSection');
        const t = getJPTranslationForQuiz(quiz);
        const kor = quiz.options[correctAnswer.charCodeAt(0) - 65];
        if (t) {
            document.getElementById('correctAnswerText').innerHTML = `${correctAnswer} - ${kor}<br><span class="jp">${t.options[correctAnswer.charCodeAt(0) - 65]}</span>`;
            document.getElementById('explanationText').innerHTML = `${quiz.explanation}<br><span class="jp">${t.exp}</span>`;
        } else {
            document.getElementById('correctAnswerText').textContent = `${correctAnswer} - ${kor}`;
            document.getElementById('explanationText').textContent = quiz.explanation;
        }
        
        answerSection.style.display = 'block';
        document.getElementById('showAnswerBtn').style.display = 'none';
        document.getElementById('nextQuestionBtn').style.display = 'inline-block';
        
        isAnswerShown = true;
    }
}

function nextQuestion() {
    const currentGameQuestions = quizDataByGame[`game${currentGame}`];
    
    // 순차적으로 다음 문제로 이동
    currentQuizIndex++;
    loadQuestion();
}

function prevQuestion() {
    const currentGameQuestions = quizDataByGame[`game${currentGame}`];
    
    // 이전 문제로 이동 (첫 문제면 그대로 유지)
    if (currentQuizIndex > 0) {
        currentQuizIndex--;
    }
    loadQuestion();
}

// 4분 타이머 시작
function startGameTimer() {
    if (gameTimer) {
        clearInterval(gameTimer);
    }
    
    gameTimer = setInterval(() => {
        gameTimeLeft--;
        updateQuizTimerDisplay();
        
        if (gameTimeLeft <= 0) {
            clearInterval(gameTimer);
            gameTimer = null;
            alert(`${currentGame}경기 시간이 종료되었습니다!`);
            nextGame();
        }
    }, 1000);
}

// 타이머 표시 업데이트 (퀴즈용)
function updateQuizTimerDisplay() {
    const minutes = Math.floor(gameTimeLeft / 60);
    const seconds = gameTimeLeft % 60;
    const timerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    const progressEl = document.querySelector('.quiz-progress');
    if (progressEl) {
        const currentEl = document.getElementById('currentQuestion');
        const totalEl = document.getElementById('totalQuestions');
        progressEl.innerHTML = `
            <span id="currentQuestion">${currentEl ? currentEl.textContent : '1'}</span> / 
            <span id="totalQuestions">${totalEl ? totalEl.textContent : '10'}</span> | 
            ⏰ ${timerText}
        `;
    }
}

// 다음 경기로 전환
function nextGame() {
    if (currentGame < 4) {
        currentGame++;
        currentQuizIndex = 0;
        gameTimeLeft = getGameTimeLimit(currentGame); // 경기별 시간 설정
        startGameTimer();
        loadQuestion();
        alert(`${currentGame}경기를 시작합니다!`);
    } else {
        alert('🎉 모든 경기의 모든 문제가 완료되었습니다!');
        closeQuizShow();
    }
}

// 이전 경기로 전환
function prevGame() {
    if (currentGame > 1) {
        currentGame--;
        currentQuizIndex = 0;
        gameTimeLeft = getGameTimeLimit(currentGame); // 경기별 시간 설정
        startGameTimer();
        loadQuestion();
        alert(`${currentGame}경기를 시작합니다!`);
    }
}

// ===========================================
// 제시어 게임 관련 함수들
// ===========================================

// 제시어 게임 시작
function startWordGame(gameNumber) {
    if (!teams.length) {
        alert('먼저 팀을 설정해주세요!');
        return;
    }

    wordGameState.currentGame = gameNumber;
    wordGameState.currentWordIndex = 0;
    wordGameState.correctCount = 0;
    wordGameState.timeLeft = 120; // 2분
    wordGameState.isPlaying = true;

    // 제시어 섞기
    const gameData = wordGameData[`game${gameNumber}`];
    wordGameState.shuffledWords = shuffleArray(gameData);

    document.getElementById('wordGameFullscreen').style.display = 'flex';
    updateWordGameDisplay();
    startWordGameTimer();
}

// 제시어 게임 화면 업데이트
function updateWordGameDisplay() {
    const currentWord = wordGameState.shuffledWords[wordGameState.currentWordIndex];
    
    document.getElementById('wordGameTitle').textContent = `제시어 게임 - ${wordGameState.currentGame}경기`;
    document.getElementById('currentWordIndex').textContent = wordGameState.currentWordIndex + 1;
    document.getElementById('koreanWord').textContent = currentWord.korean;
    document.getElementById('japaneseWord').textContent = currentWord.japanese;
    document.getElementById('correctCounter').textContent = wordGameState.correctCount;
    
    updateWordGameTimer();
}

// 제시어 게임 타이머 시작
function startWordGameTimer() {
    if (wordGameState.timerInterval) {
        clearInterval(wordGameState.timerInterval);
    }
    
    wordGameState.timerInterval = setInterval(() => {
        wordGameState.timeLeft--;
        updateWordGameTimer();
        
        if (wordGameState.timeLeft <= 0) {
            endWordGame();
        }
    }, 1000);
}

// 제시어 게임 타이머 업데이트
function updateWordGameTimer() {
    const minutes = Math.floor(wordGameState.timeLeft / 60);
    const seconds = wordGameState.timeLeft % 60;
    const timerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('wordGameTimer').textContent = timerText;
    
    // 시간이 30초 이하일 때 경고 색상
    const timerEl = document.getElementById('wordGameTimer');
    if (wordGameState.timeLeft <= 30) {
        timerEl.style.color = '#ff4444';
        timerEl.style.fontWeight = 'bold';
    } else {
        timerEl.style.color = '#333';
        timerEl.style.fontWeight = 'normal';
    }
}

// 정답 처리
function correctAnswer() {
    if (!wordGameState.isPlaying) return;
    
    wordGameState.correctCount++;
    playSound('correct'); // 정답 효과음 재생
    nextWord();
}

// 스킵 처리
function skipWord() {
    if (!wordGameState.isPlaying) return;
    
    nextWord();
}

// 다음 제시어로 이동
function nextWord() {
    if (wordGameState.currentWordIndex < wordGameState.shuffledWords.length - 1) {
        wordGameState.currentWordIndex++;
        updateWordGameDisplay();
    } else {
        // 모든 제시어 완료
        endWordGame();
    }
}

// 제시어 게임 종료
function endWordGame() {
    wordGameState.isPlaying = false;
    
    if (wordGameState.timerInterval) {
        clearInterval(wordGameState.timerInterval);
        wordGameState.timerInterval = null;
    }
    
    document.getElementById('wordGameFullscreen').style.display = 'none';
    document.getElementById('finalScore').textContent = wordGameState.correctCount;
    document.getElementById('wordGameResult').style.display = 'flex';
    
    // 사운드 재생
    playSound('end');
}

// 제시어 게임 재시작
function restartWordGame() {
    document.getElementById('wordGameResult').style.display = 'none';
    startWordGame(wordGameState.currentGame);
}

// 제시어 게임 결과 화면 닫기
function closeWordGameResult() {
    document.getElementById('wordGameResult').style.display = 'none';
}

// 제시어 게임 닫기
function closeWordGame() {
    wordGameState.isPlaying = false;
    
    if (wordGameState.timerInterval) {
        clearInterval(wordGameState.timerInterval);
        wordGameState.timerInterval = null;
    }
    
    document.getElementById('wordGameFullscreen').style.display = 'none';
}

// 제시어 게임 네비게이션
function goToWordGame(gameNumber) {
    if (gameNumber >= 1 && gameNumber <= 6) {
        startWordGame(gameNumber);
    }
}

function prevWordGame() {
    if (wordGameState.currentGame > 1) {
        startWordGame(wordGameState.currentGame - 1);
    }
}

function nextWordGame() {
    if (wordGameState.currentGame < 6) {
        startWordGame(wordGameState.currentGame + 1);
    }
}

// 키보드 이벤트 처리
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // 제시어 게임 관련 화면 닫기
        if (document.getElementById('wordGameFullscreen').style.display === 'flex') {
            closeWordGame();
        }
        if (document.getElementById('wordGameResult').style.display === 'flex') {
            closeWordGameResult();
        }
    }
    
    // 제시어 게임 진행 중 키보드 단축키
    if (document.getElementById('wordGameFullscreen').style.display === 'flex' && wordGameState.isPlaying) {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            correctAnswer();
        } else if (event.key === 'ArrowRight' || event.key === 's' || event.key === 'S') {
            event.preventDefault();
            skipWord();
        }
    }
});

// 특정 경기로 이동
function goToGame(gameNumber) {
    if (gameNumber >= 1 && gameNumber <= 4) {
        currentGame = gameNumber;
        currentQuizIndex = 0;
        gameTimeLeft = getGameTimeLimit(currentGame); // 경기별 시간 설정
        startGameTimer();
        loadQuestion();
        alert(`${currentGame}경기로 이동합니다!`);
    }
}

// 타이머 프리셋 함수 수정
function setGameTimer(gameType) {
    let minutes = 0;
    let seconds = 0;
    
    switch(gameType) {
        case 'body':
            minutes = 2;
            break;
        case 'balloon':
            minutes = 3;
            break;
        case 'quiz':
            minutes = 18;
            break;
        case 'card':
            minutes = 3;
            break;
        case 'drawing':
            minutes = 1;
            seconds = 20;
            break;
        case 'spoon':
            minutes = 2;
            break;
        case 'explanation':
            minutes = 5;
            break;
        case 'break':
            minutes = 3;
            break;
    }
    
    const totalSeconds = minutes * 60 + seconds;
    setTimer(totalSeconds);
}

// 예시 퀴즈 보기 함수
function showSampleQuiz() {
    const fullscreen = document.getElementById('quizShowFullscreen');
    
    if (fullscreen) {
        // 예시 모드 설정
        currentGame = 0; // 예시용 특별 번호
        currentQuizIndex = 0;
        selectedAnswer = null;
        isAnswerShown = false;
        
        fullscreen.style.display = 'block';
        fullscreen.classList.add('active');
        
        loadSampleQuestion();
        
        // 예시에서는 타이머 없음
        if (gameTimer) {
            clearInterval(gameTimer);
            gameTimer = null;
        }
        
        alert('예시 퀴즈 모드입니다. 실제 게임이 아닙니다.');
    }
}

function loadSampleQuestion() {
    // 퀴즈 제목 업데이트
    const quizTitle = document.getElementById('quizTitle');
    if (quizTitle) {
        quizTitle.textContent = '퀴즈 예시 문제';
    }
    
    // 진행도 업데이트
    const currentQuestionEl = document.getElementById('currentQuestion');
    const totalQuestionsEl = document.getElementById('totalQuestions');
    
    if (currentQuestionEl && totalQuestionsEl) {
        currentQuestionEl.textContent = '예시';
        totalQuestionsEl.textContent = '문제';
    }
    
    // 문제 표시 (한-일 병기)
    const questionTextEl = document.getElementById('questionText');
    if (questionTextEl) {
        questionTextEl.innerHTML = `${sampleQuizData.question}<br><span class="jp">${sampleQuizTranslationJP.q}</span>`;
    }
    
    // 선택지 표시 (한-일 병기)
    const options = ['A', 'B', 'C', 'D'];
    options.forEach((letter, index) => {
        const optionElement = document.getElementById(`option${letter}`);
        if (optionElement && sampleQuizData.options[index]) {
            const optionText = optionElement.querySelector('.option-text');
            if (optionText) {
                optionText.innerHTML = `${sampleQuizData.options[index]}<br><span class="jp">${sampleQuizTranslationJP.options[index]}</span>`;
            }
            optionElement.classList.remove('selected', 'correct', 'wrong', 'disabled');
        }
    });
    
    // 답안 섹션 숨기기
    const answerSection = document.getElementById('answerSection');
    const showAnswerBtn = document.getElementById('showAnswerBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    
    if (answerSection) answerSection.style.display = 'none';
    if (showAnswerBtn) showAnswerBtn.style.display = 'inline-block';
    if (nextQuestionBtn) nextQuestionBtn.style.display = 'none';
    
    selectedAnswer = null;
    isAnswerShown = false;
}

// 특정 경기로 퀴즈쇼 시작
function startSpecificGame(gameNumber) {
    console.log(`${gameNumber}경기 퀴즈쇼 시작`);
    
    currentGame = gameNumber;
    currentQuizIndex = 0;
    selectedAnswer = null;
    isAnswerShown = false;
    gameTimeLeft = getGameTimeLimit(gameNumber); // 경기별 시간 설정
    
    const fullscreen = document.getElementById('quizShowFullscreen');
    
    if (fullscreen) {
        fullscreen.style.display = 'block';
        fullscreen.classList.add('active');
        startGameTimer();
        loadQuestion();
        alert(`${gameNumber}경기를 시작합니다! (4분 제한시간)`);
    } else {
        console.error('quizShowFullscreen 요소를 찾을 수 없습니다');
    }
}