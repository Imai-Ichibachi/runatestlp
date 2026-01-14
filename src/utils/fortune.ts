import { FortuneResult } from '@/utils/fortune';

export interface BaZiPillar {
    kanji: string;
    element: string; // 木, 火, 土, 金, 水
    heavenlyStem?: string;
    earthlyBranch?: string;
    tenGods?: string;
    twelveGods?: string;
    color?: string; // For UI styling
}

export interface FortuneResult {
    moonSign: string;
    moonSignDesc: string;
    fortune: string;
    luckyColor: string;
    luckyNumber: number;
    scores: {
        overall: number;
        love: number;
        money: number;
        work: number;
    };
    radar: {
        fortune: number;
        qi: number;
        aura: number;
        intuition: number;
        karma: number;
    };
    fourPillars: {
        year: BaZiPillar;
        month: BaZiPillar;
        day: BaZiPillar;
    };
    // Detailed Text Sections
    essence: string;
    loveAdvice: string;
    workAdvice: string;
    moneyAdvice: string;
    interpersonalAdvice: string;
    tenGodsExplanation: string;
    radarAnalysis: string;
}

const MOON_SIGNS = [
    { name: '牡羊座', element: '火', desc: '情熱的で行動力に溢れる開拓者' },
    { name: '牡牛座', element: '土', desc: '穏やかで美を愛する堅実家' },
    { name: '双子座', element: '風', desc: '知的好奇心旺盛な情報通' },
    { name: '蟹座', element: '水', desc: '愛情深く家庭を大切にする守護者' },
    { name: '獅子座', element: '火', desc: '華やかで創造性豊かなリーダー' },
    { name: '乙女座', element: '土', desc: '繊細で分析力に優れた完璧主義者' },
    { name: '天秤座', element: '風', desc: '調和を重んじる美の探求者' },
    { name: '蠍座', element: '水', desc: '深い洞察力を持つ神秘家' },
    { name: '射手座', element: '火', desc: '自由を愛する冒険家' },
    { name: '山羊座', element: '土', desc: '野心的で責任感の強い努力家' },
    { name: '水瓶座', element: '風', desc: '独創的な発想を持つ革新者' },
    { name: '魚座', element: '水', desc: '直感力に優れた夢見る芸術家' },
];

const LUCKY_COLORS = [
    'ムーンシルバー', 'ミッドナイトパープル', 'スターダストゴールド',
    'オーシャンブルー', 'オーロラピンク', 'エメラルドグリーン',
    'サンセットオレンジ', 'クリスタルホワイト', 'ラベンダー',
    '深紅のルビー', 'サファイアブルー', '琥珀色',
];

const FORTUNE_MESSAGES = [
    '月の加護があなたに降り注いでいます。今日は新しい出会いに恵まれるでしょう。',
    '星々があなたの歩む道を照らしています。長年の願いが叶う兆しが見えます。',
    '宇宙のエネルギーがあなたを包んでいます。クリエイティブな活動に最適な時期です。',
];

const TEN_GODS = ['比肩', '劫財', '食神', '傷官', '偏財', '正財', '偏官', '正官', '偏印', '印綬'];
const TWELVE_GODS = ['長生', '沐浴', '冠帯', '建禄', '帝旺', '衰', '病', '死', '墓', '絶', '胎', '養'];
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ELEMENTS = ['木', '木', '火', '火', '土', '土', '金', '金', '水', '水'];

function getMoonSign(year: number, month: number, day: number): number {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 0;
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 1;
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 2;
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 3;
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 4;
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 5;
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 6;
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 7;
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 8;
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 9;
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 10;
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 11;
    return 0;
}

// Helper to generate dense text
function generateEssenceText(moonSign: string, tenGod: string): string {
    return `あなたの魂の本質は、${moonSign}の持つ「創造的なエネルギー」と、四柱推命における中心星「${tenGod}」の性質が複雑に絡み合って形成されています。一見すると${moonSign.includes('火') || moonSign.includes('風') ? '活動的で社交的' : '穏やかで思慮深い'}に見えますが、その内側には${tenGod.includes('財') || tenGod.includes('官') ? '社会的な成功への強い意志' : '独自の美学とこだわり'}が秘められています。\n\n魂の奥底には、前世から引き継がれた「探求心」が眠っており、現世ではそれを具体的な形にすることが求められています。周囲の人々はあなたのその不思議な引力に惹きつけられ、自然と助け舟を出してくれるでしょう。しかし、それに甘んじることなく、自らの意志で道を切り拓く強さを持つことが、魂のランクを上げる鍵となります。`;
}

function generateLoveText(score: number, luckyColor: string): string {
    return `恋愛運において、現在は「${score > 80 ? '結実' : score > 60 ? '変革' : '内省'}」の時期に差し掛かっています。${score > 80 ? '運命の糸が強く引き合っており、ソウルメイトとの出会いや関係の進展が期待できる絶好のタイミングです。普段は言えない想いを言葉にすることで、奇跡のような展開が訪れるでしょう。' : '今は焦って答えを出そうとするよりも、自分自身の心の声に耳を傾けるべき時です。相手に合わせすぎるのではなく、自立した精神を持つことが、真のパートナーシップを引き寄せます。'}\n\nラッキーカラーである「${luckyColor}」を身につける（特にアクセサリーやインナーとして）ことで、あなたのオーラに含まれる愛の周波数が増幅され、良縁を引き寄せる力が強まります。`;
}

function generateWorkText(tenGod: string, element: string): string {
    return `仕事運においては、「${tenGod}」の持つエネルギーが強く影響しています。あなたは${element === '火' || element === '金' ? 'リーダーシップを発揮し、周囲を牽引する' : 'サポート役や専門職として、確実な成果を上げる'}ポジションで最も輝きを放ちます。\n\n今年の運気の流れを見ると、新しいプロジェクトや未経験の分野への挑戦が吉と出ています。過去の成功体験に固執せず、柔軟な発想で取り組むことが成功への近道です。また、職場の人間関係では「${element === '水' || element === '土' ? '柔軟性' : '決断力'}」を意識することで、信頼を勝ち得ることができるでしょう。`;
}

export function calculateFortune(name: string, year: number, month: number, day: number): FortuneResult {
    const moonSignIndex = getMoonSign(year, month, day);
    const moonSign = MOON_SIGNS[moonSignIndex];

    const today = new Date();
    const dailySeed = today.getFullYear() * 366 + (today.getMonth() + 1) * 31 + today.getDate();
    const personalSeed = name.length + year + month + day;
    const combinedSeed = dailySeed + personalSeed;

    const luckyColorIndex = (combinedSeed + moonSignIndex) % LUCKY_COLORS.length;
    const luckyNumber = ((combinedSeed * 7) % 99) + 1;
    const fortuneIndex = (combinedSeed + moonSignIndex * 3) % FORTUNE_MESSAGES.length;

    const calculateScore = (offset: number) => {
        const base = ((combinedSeed + offset * 13) % 40) + 60;
        return Math.min(100, base);
    };

    const getBaZiElement = (seed: number) => {
        const stemIndex = seed % 10;
        const branchIndex = seed % 12;
        return {
            kanji: HEAVENLY_STEMS[stemIndex],
            element: ELEMENTS[stemIndex],
            color: ELEMENTS[stemIndex] === '木' ? '#4ade80' : ELEMENTS[stemIndex] === '火' ? '#f87171' : ELEMENTS[stemIndex] === '土' ? '#fbbf24' : ELEMENTS[stemIndex] === '金' ? '#e2e8f0' : '#60a5fa',
            heavenlyStem: HEAVENLY_STEMS[stemIndex],
            earthlyBranch: EARTHLY_BRANCHES[branchIndex],
            tenGods: TEN_GODS[stemIndex], // Simplified logic
            twelveGods: TWELVE_GODS[branchIndex], // Simplified logic
        };
    };

    const dayPillar = getBaZiElement(day);
    const monthPillar = getBaZiElement(month);
    const yearPillar = getBaZiElement(year);

    // Use Month Pillar's Ten God as the "Main" star for text gen
    const mainTenGod = monthPillar.tenGods || '比肩';
    const mainElement = dayPillar.element || '木';

    // Scores
    const sOverall = calculateScore(0);
    const sLove = calculateScore(1);
    const sMoney = calculateScore(2);
    const sWork = calculateScore(3);

    // Radar parameters
    const rFortune = calculateScore(4);
    const rQi = calculateScore(5);
    const rAura = calculateScore(6);
    const rIntuition = calculateScore(7);
    const rKarma = calculateScore(8);

    return {
        moonSign: moonSign.name,
        moonSignDesc: moonSign.desc,
        fortune: FORTUNE_MESSAGES[fortuneIndex],
        luckyColor: LUCKY_COLORS[luckyColorIndex],
        luckyNumber,
        scores: {
            overall: sOverall,
            love: sLove,
            money: sMoney,
            work: sWork,
        },
        radar: {
            fortune: rFortune,
            qi: rQi,
            aura: rAura,
            intuition: rIntuition,
            karma: rKarma,
        },
        fourPillars: {
            year: yearPillar,
            month: monthPillar,
            day: dayPillar,
        },
        // Rich Text Sections
        essence: generateEssenceText(moonSign.name, mainTenGod),
        loveAdvice: generateLoveText(sLove, LUCKY_COLORS[luckyColorIndex]),
        workAdvice: generateWorkText(mainTenGod, mainElement),
        moneyAdvice: `金運の流れは、あなたの「${mainTenGod}」の性質と密接に関係しています。${sMoney > 70 ? '現在はエネルギーの循環が非常に良く、投資や自己投資に適した時期です。お金は「感謝のエネルギー」として捉え、快く送り出すことで、倍になって戻ってくるでしょう。' : '今は蓄財に適した時期であり、無駄な出費を控えることで金運の土台が固まります。一時的な感情での散財には注意が必要ですが、長期的な視点での学びへの投資は吉です。'}`,
        interpersonalAdvice: `対人運においては、あなたの${mainElement}の性質が周囲に影響を与えています。${rAura > 80 ? 'あなたの放つオーラは現在、非常に人を惹きつける力が強くなっています。多くの人があなたにアドバイスや癒やしを求めて集まってくるでしょう。' : '少し一人で過ごす時間を大切にすることで、心のバランスが整い、より良い人間関係を築くための準備が整います。'}無理に合わせるのではなく、自然体でいることが開運の鍵です。`,
        tenGodsExplanation: `あなたの中心星である【${mainTenGod}】は、${mainTenGod.includes('官') ? '責任感と実行力' : mainTenGod.includes('財') ? '人脈と豊かさ' : mainTenGod.includes('印') ? '知性と探求' : '自立と創造'}を象徴する星です。この星を持つ人は、${mainTenGod.includes('食') || mainTenGod.includes('傷') ? '表現力や芸術的センス' : '組織や集団の中での調整能力'}に長けており、晩年になるほどその輝きを増していくと言われています。`,
        radarAnalysis: `五角形のグラフ（レーダーチャート）は、現在のあなたの魂の状態を可視化したものです。特に「${rIntuition > rKarma ? '直感' : 'カルマ'}」の数値が高く出ており、これは${rIntuition > rKarma ? '天からのメッセージを受け取りやすい状態' : '前世からの徳が今、あなたを助けていること'}を示しています。全体のバランスが非常に整っているため、自信を持って行動してください。`
    };
}
