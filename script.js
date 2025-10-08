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
        { korean: '수영', japanese: '水着（みずぎ）' },
        { korean: '헬멧', japanese: 'ヘルメット' },
        { korean: '아령', japanese: 'ダンベル' },
        { korean: '줄넘기', japanese: '縄跳び（なわとび）' },
        { korean: '자전거', japanese: '自転車（じてんしゃ）' },
        { korean: '골대', japanese: 'ゴール' },
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
    
    game4: [ // 4경기 - 문화/예술/스포츠/현대
        {
            question: "일본의 전통 정원의 미학적 특징으로 옳지 않은 것은?",
            options: ["비대칭적 구조", "인공적 조형물 최소화", "직선적 대칭 강조", "계절의 변화를 고려한 배치"],
            correct: "C",
            explanation: "일본 전통 정원은 자연스러운 비대칭을 추구합니다."
        },
        {
            question: "일본의 대표적 전통 인형극은?",
            options: ["분라쿠", "가부키", "노(能)", "교겐"],
            correct: "A",
            explanation: "분라쿠는 일본의 전통 인형극입니다."
        },
        {
            question: "세계 최초로 세계문화유산과 자연유산을 동시에 보유한 일본의 섬은?",
            options: ["홋카이도", "야쿠시마", "오키나와", "교토"],
            correct: "B",
            explanation: "야쿠시마는 복합유산으로 등재된 일본의 섬입니다."
        },
        {
            question: "일본의 전통 다도(茶道)를 체계화한 인물은?",
            options: ["센노 리큐", "도쿠가와 이에야스", "오다 노부나가", "미야모토 무사시"],
            correct: "A",
            explanation: "센노 리큐가 일본의 전통 다도를 체계화했습니다."
        },
        {
            question: "최초로 지동설을 주장한 고대 그리스 학자는?",
            options: ["아리스토텔레스", "코페르니쿠스", "아리스타르코스", "갈릴레오"],
            correct: "C",
            explanation: "아리스타르코스가 최초로 지동설을 주장했습니다."
        },
        {
            question: "인체에서 가장 작은 뼈는?",
            options: ["침골", "추골", "등골", "고실골"],
            correct: "A",
            explanation: "침골은 귀 안에 있는 가장 작은 뼈입니다."
        },
        {
            question: "빛의 세 가지 원색은?",
            options: ["빨강·노랑·파랑", "빨강·초록·파랑", "빨강·파랑·흰색", "초록·노랑·파랑"],
            correct: "B",
            explanation: "빛의 삼원색은 빨강, 초록, 파랑입니다."
        },
        {
            question: "인류가 처음으로 원자폭탄을 투하한 도시는?",
            options: ["도쿄", "나가사키", "히로시마", "오사카"],
            correct: "C",
            explanation: "1945년 8월 6일 히로시마에 최초로 원자폭탄이 투하되었습니다."
        },
        {
            question: "세계 최초로 인류의 게놈 지도를 완성한 프로젝트의 이름은?",
            options: ["GenomeX", "DNA2020", "Human Genome Project", "BioMap"],
            correct: "C",
            explanation: "Human Genome Project가 인류 게놈 지도를 완성했습니다."
        },
        {
            question: "『파우스트』를 쓴 독일의 대문호는?",
            options: ["괴테", "실러", "하이네", "토마스 만"],
            correct: "A",
            explanation: "요한 볼프강 폰 괴테가 『파우스트』를 썼습니다."
        },
        {
            question: "피카소의 화풍 중, '게르니카'를 대표하는 시기는?",
            options: ["청색 시대", "장미 시대", "입체파 시대", "게르니카 시대"],
            correct: "C",
            explanation: "게르니카는 피카소의 입체파 시기 대표작입니다."
        },
        {
            question: "세계 3대 비극 작가로 알려진 고대 그리스 인물은 아닌 사람은?",
            options: ["아이스킬로스", "소포클레스", "에우리피데스", "호메로스"],
            correct: "D",
            explanation: "호메로스는 서사시인이며, 3대 비극 작가는 아이스킬로스, 소포클레스, 에우리피데스입니다."
        },
        {
            question: "셰익스피어의 4대 비극이 아닌 것은?",
            options: ["리어왕", "오셀로", "맥베스", "로미오와 줄리엣"],
            correct: "D",
            explanation: "로미오와 줄리엣은 비극이지만 4대 비극에는 포함되지 않습니다."
        },
        {
            question: "한국 현대시에서 '진달래꽃'을 쓴 시인은?",
            options: ["윤동주", "김소월", "이상", "백석"],
            correct: "B",
            explanation: "김소월이 '진달래꽃'을 썼습니다."
        },
        {
            question: "한국 프로야구 원년은 언제일까?",
            options: ["1979년", "1982년", "1984년", "1986년"],
            correct: "B",
            explanation: "한국 프로야구는 1982년에 시작되었습니다."
        },
        {
            question: "올림픽 마라톤에서 최초로 2연패를 달성한 선수는?",
            options: ["손기정", "아베베 비킬라", "에밀 자토펙", "카를로스 로페스"],
            correct: "B",
            explanation: "아베베 비킬라가 1960년, 1964년 올림픽에서 연속 우승했습니다."
        },
        {
            question: "노벨 평화상을 가장 많이 수상한 나라는?",
            options: ["미국", "스웨덴", "스위스", "노르웨이"],
            correct: "A",
            explanation: "미국이 노벨 평화상을 가장 많이 수상했습니다."
        },
        {
            question: "세계 최초의 인터넷(ARPANET)이 처음 연결된 해는?",
            options: ["1965년", "1969년", "1973년", "1983년"],
            correct: "B",
            explanation: "1969년 ARPANET이 최초로 구축되어 인터넷의 시작이 되었습니다."
        }
    ]
};

// 퀴즈쇼 관련 변수
let currentGame = 1; // 현재 경기 번호
let currentQuizIndex = 0;
let selectedAnswer = null;
let isAnswerShown = false;
let gameTimer = null;
let gameTimeLeft = 240; // 4분 = 240초

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
                <button class="score-btn" onclick="changeScore(${index}, 1)">+1</button>
                <button class="score-btn" onclick="changeScore(${index}, -1)">-1</button>
                <button class="score-btn" onclick="resetScore(${index})">리셋</button>
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

// 타이머 기능
function setTimer(seconds) {
    currentTime = seconds;
    updateTimerDisplay();
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            currentTime--;
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
    document.getElementById('timerDisplay').textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
    if (type === 'end') {
        // MP3 파일 재생
        const audio = new Audio('bedside-clock-alarm-95792.mp3');
        audio.volume = 0.7;
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

        // 점수 배점
        finalRound.rankings.forEach((team, index) => {
            const points = [5, 3, 1]; // 1등 5점, 2등 3점, 3등 1점
            team.score += points[index];
        });

        updateScoreboard();
        showAlert('최종 결승이 완료되었습니다!', 'success');
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
    gameTimeLeft = 240; // 4분 초기화
    
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
            gameTimeLeft = 240; // 4분 초기화
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
    
    // 문제 표시
    const questionTextEl = document.getElementById('questionText');
    if (questionTextEl && quiz) {
        questionTextEl.textContent = quiz.question;
    }
    
    // 선택지 표시
    const options = ['A', 'B', 'C', 'D'];
    options.forEach((letter, index) => {
        const optionElement = document.getElementById(`option${letter}`);
        if (optionElement && quiz && quiz.options[index]) {
            const optionText = optionElement.querySelector('.option-text');
            if (optionText) {
                optionText.textContent = quiz.options[index];
            }
            optionElement.classList.remove('selected', 'correct', 'wrong');
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
    
    console.log('문제 로딩 완료');
}

function selectOption(letter) {
    if (isAnswerShown) return;
    
    // 이전 선택 제거
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // 새 선택 추가
    document.getElementById(`option${letter}`).classList.add('selected');
    selectedAnswer = letter;
}

function showAnswer() {
    if (isAnswerShown) return;
    
    const currentGameQuestions = quizDataByGame[`game${currentGame}`];
    const quiz = currentGameQuestions[currentQuizIndex];
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
    document.getElementById('correctAnswerText').textContent = 
        `${correctAnswer} - ${quiz.options[correctAnswer.charCodeAt(0) - 65]}`;
    document.getElementById('explanationText').textContent = quiz.explanation;
    
    answerSection.style.display = 'block';
    document.getElementById('showAnswerBtn').style.display = 'none';
    document.getElementById('nextQuestionBtn').style.display = 'inline-block';
    
    isAnswerShown = true;
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
        updateTimerDisplay();
        
        if (gameTimeLeft <= 0) {
            clearInterval(gameTimer);
            gameTimer = null;
            alert(`${currentGame}경기 시간이 종료되었습니다!`);
            nextGame();
        }
    }, 1000);
}

// 타이머 표시 업데이트
function updateTimerDisplay() {
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
        gameTimeLeft = 240; // 4분 초기화
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
        gameTimeLeft = 240; // 4분 초기화
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
        gameTimeLeft = 240; // 4분 초기화
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

// 특정 경기로 퀴즈쇼 시작
function startSpecificGame(gameNumber) {
    console.log(`${gameNumber}경기 퀴즈쇼 시작`);
    
    currentGame = gameNumber;
    currentQuizIndex = 0;
    selectedAnswer = null;
    isAnswerShown = false;
    gameTimeLeft = 240; // 4분 초기화
    
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