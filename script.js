// ==================== النظام الصوتي التفاعلي ====================

// إعداد نظام التعليق الصوتي
const speechSynthesis = window.speechSynthesis;
let currentVoice = null;

// اختيار صوت مناسب حسب اللغة
function initVoice() {
    const voices = speechSynthesis.getVoices();

    if (currentLang === 'ar') {
        // البحث عن صوت عربي
        currentVoice = voices.find(voice =>
            voice.lang.startsWith('ar') ||
            voice.lang === 'ar-SA' ||
            voice.lang === 'ar-EG'
        ) || voices[0];
    } else {
        // البحث عن صوت إنجليزي
        currentVoice = voices.find(voice =>
            voice.lang.startsWith('en') ||
            voice.lang === 'en-US' ||
            voice.lang === 'en-GB'
        ) || voices[0];
    }
}

// تشغيل عند تحميل الأصوات
speechSynthesis.onvoiceschanged = initVoice;
initVoice();

// وظيفة التحدث بالعربية أو الإنجليزية
function speak(text, rate = 1) {
    // إيقاف أي كلام سابق
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // تحديد اللغة
    utterance.lang = currentLang === 'ar' ? 'ar-SA' : 'en-US';
    utterance.rate = rate;
    utterance.pitch = 1.2; // صوت أكثر حيوية للأطفال
    utterance.volume = 1;

    if (currentVoice) {
        utterance.voice = currentVoice;
    }

    speechSynthesis.speak(utterance);
}

// عبارات تشجيعية متنوعة
const encouragementPhrases = [
    "أحسنت! أنت رائع! 🌟",
    "ممتاز! واصل التقدم! 🎉",
    "عمل رائع! أنت نجم! ⭐",
    "برافو! إجابة صحيحة! 🏆",
    "يا لك من ذكي! 🧠✨",
    "رائع جداً! استمر! 💪",
    "أكثر من رائع! 🌈",
    "أنت بطل حقيقي! 🦸",
    "إجابة ممتازة! 🎯",
    "أبدعت! مذهل! 🌺"
];

// عبارات احتفالية عند إكمال درس
const completionPhrases = [
    "مبروك! أكملت الدرس بنجاح! 🎊",
    "رائع! لقد أتممت درساً جديداً! 🌟",
    "أحسنت! أنت تتقدم بشكل ممتاز! 🏅",
    "عظيم! تعلمت شيئاً جديداً اليوم! 📚"
];

// اختيار عبارة عشوائية
function getRandomPhrase(phrases) {
    return phrases[Math.floor(Math.random() * phrases.length)];
}

// ==================== نظام تعدد اللغات ====================

let currentLang = localStorage.getItem('language') || 'ar';

const translations = {
    ar: {
        // الصفحة الرئيسية
        mainTitle: "علوم الطبيعة والبيئة",
        heroSubtitle: "رحلة تعليمية رائعة للأطفال من 6-12 سنة",
        startButton: "🚀 ابدأ الرحلة التعليمية",

        // القائمة الرئيسية
        mainMenu: "📚 القائمة الرئيسية",
        lessons: "الدروس التعليمية",
        lessonsDesc: "10 دروس تفاعلية رائعة",
        games: "الألعاب التعليمية",
        gamesDesc: "ألعاب ممتعة ومفيدة",
        stories: "القصص التعليمية",
        storiesDesc: "قصص شيقة ومفيدة",
        exam: "الامتحان النهائي",
        examDesc: "اختبر معلوماتك",
        certificates: "الشهادات",
        certificatesDesc: "شهادات الإكمال",
        parents: "نصائح للآباء",
        parentsDesc: "إرشادات للأهل",
        backToHome: "← العودة للرئيسية",
        backToMenu: "← العودة للقائمة",

        // رسائل الشخصية المرشدة
        mascotWelcome: "مرحباً! أنا شجرة المعرفة 🌳",
        mascotMenu: "اختر ما تحب أن تتعلمه! 📚",
        mascotLessons: "استعد لرحلة تعليمية رائعة! 🚀",
        mascotGames: "وقت المرح والتعلم! 🎮",
        mascotStories: "هيا نقرأ قصصاً جميلة! 📖",
        mascotExam: "أنت مستعد! أظهر ما تعلمته! ✨",
        mascotCertificates: "أحسنت! استلم شهادتك! 🏆",
        mascotParents: "نصائح مفيدة للآباء! 👨‍👩‍👧",

        // عبارات تشجيعية
        encouragement1: "أحسنت! أنت رائع! 🌟",
        encouragement2: "ممتاز! واصل التقدم! 🎉",
        encouragement3: "عمل رائع! أنت نجم! ⭐",
        encouragement4: "برافو! إجابة صحيحة! 🏆",
        encouragement5: "يا لك من ذكي! 🧠✨",
        encouragement6: "رائع جداً! استمر! 💪",
        encouragement7: "أكثر من رائع! 🌈",
        encouragement8: "أنت بطل حقيقي! 🦸",
        encouragement9: "إجابة ممتازة! 🎯",
        encouragement10: "أبدعت! مذهل! 🌺",

        // لعبة الذاكرة
        memoryTitle: "اختر مستوى اللعبة:",
        memoryEasy: "😊 سهل (8 بطاقات)",
        memoryMedium: "🤔 متوسط (12 بطاقة)",
        memoryHard: "🧠 صعب (16 بطاقة)",
        memoryStart: "اختر مستوى لبدء اللعبة! 🎮",
        memoryMoves: "الحركات:",
        memoryPairs: "الأزواج المتطابقة:",
        memoryWin: "🎉 مبروك! فزت في المستوى",
        memoryComplete: "أكملت اللعبة في",
        moves: "حركة",

        // أزرار
        completed: "أكملت الدرس",
        backToLessons: "← العودة للدروس",
        backToGames: "← العودة للألعاب"
    },
    en: {
        // Homepage
        mainTitle: "Nature and Environment Science",
        heroSubtitle: "An amazing educational journey for children ages 6-12",
        startButton: "🚀 Start the Educational Journey",

        // Main Menu
        mainMenu: "📚 Main Menu",
        lessons: "Educational Lessons",
        lessonsDesc: "10 amazing interactive lessons",
        games: "Educational Games",
        gamesDesc: "Fun and useful games",
        stories: "Educational Stories",
        storiesDesc: "Interesting and useful stories",
        exam: "Final Exam",
        examDesc: "Test your knowledge",
        certificates: "Certificates",
        certificatesDesc: "Completion certificates",
        parents: "Tips for Parents",
        parentsDesc: "Guidance for parents",
        backToHome: "← Back to Home",
        backToMenu: "← Back to Menu",

        // Mascot Messages
        mascotWelcome: "Hello! I'm the Knowledge Tree 🌳",
        mascotMenu: "Choose what you want to learn! 📚",
        mascotLessons: "Get ready for an amazing educational journey! 🚀",
        mascotGames: "Time for fun and learning! 🎮",
        mascotStories: "Let's read beautiful stories! 📖",
        mascotExam: "You're ready! Show what you've learned! ✨",
        mascotCertificates: "Well done! Get your certificate! 🏆",
        mascotParents: "Useful tips for parents! 👨‍👩‍👧",

        // Encouragement Phrases
        encouragement1: "Well done! You're amazing! 🌟",
        encouragement2: "Excellent! Keep going! 🎉",
        encouragement3: "Great work! You're a star! ⭐",
        encouragement4: "Bravo! Correct answer! 🏆",
        encouragement5: "How smart you are! 🧠✨",
        encouragement6: "Very good! Continue! 💪",
        encouragement7: "More than great! 🌈",
        encouragement8: "You're a real hero! 🦸",
        encouragement9: "Excellent answer! 🎯",
        encouragement10: "You're brilliant! Amazing! 🌺",

        // Memory Game
        memoryTitle: "Choose game level:",
        memoryEasy: "😊 Easy (8 cards)",
        memoryMedium: "🤔 Medium (12 cards)",
        memoryHard: "🧠 Hard (16 cards)",
        memoryStart: "Choose a level to start the game! 🎮",
        memoryMoves: "Moves:",
        memoryPairs: "Matched Pairs:",
        memoryWin: "🎉 Congratulations! You won at",
        memoryComplete: "You completed the game in",
        moves: "moves",

        // Buttons
        completed: "Lesson Completed",
        backToLessons: "← Back to Lessons",
        backToGames: "← Back to Games"
    }
};

// الحصول على الترجمة
function t(key) {
    return translations[currentLang][key] || key;
}

// تبديل اللغة
function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('language', currentLang);

    // تحديث اتجاه الصفحة
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    // تحديث زر اللغة
    const langIcon = document.getElementById('langIcon');
    const langText = document.getElementById('langText');

    if (currentLang === 'ar') {
        langIcon.textContent = '🇬🇧';
        langText.textContent = 'English';
    } else {
        langIcon.textContent = '🇸🇦';
        langText.textContent = 'العربية';
    }

    // تحديث الصوت
    initVoice();

    // إعادة تحميل المحتوى
    location.reload();
}

// تطبيق اللغة عند التحميل
function applyLanguage() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    // تحديث زر اللغة
    const langIcon = document.getElementById('langIcon');
    const langText = document.getElementById('langText');

    if (currentLang === 'ar') {
        langIcon.textContent = '🇬🇧';
        langText.textContent = 'English';
    } else {
        langIcon.textContent = '🇸🇦';
        langText.textContent = 'العربية';
    }
}

// ==================== بيانات الدورة التعليمية ====================

const lessons = [
    {
        id: 1,
        title: "مقدمة إلى الطبيعة",
        icon: "🌍",
        image: "lesson_1_nature_intro_1765325457287.png",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description: "تعرف على مفهوم الطبيعة والبيئة وعناصرها الأساسية",
        videoDescription: "فيديو يوضح مفهوم الطبيعة والبيئة مع أمثلة تفاعلية",
        pdfTitle: "المفاهيم الأساسية للطبيعة",
        exercises: [
            { title: "رسم الطبيعة", description: "ارسم منظراً طبيعياً يتضمن الشمس والأشجار والماء" },
            { title: "تحديد العناصر الطبيعية", description: "ميّز بين العناصر الطبيعية والصناعية" },
            { title: "لعبة التصنيف", description: "صنف العناصر: سماء، أرض، ماء" }
        ],
        activity: "رحلة ميدانية افتراضية: استكشف حديقة افتراضية وتعرف على النباتات والحيوانات",
        story: {
            title: "قصة شجرة الصداقة",
            content: "في غابة جميلة، كانت هناك شجرة كبيرة اسمها صديقة. كانت صديقة تحب مساعدة الجميع - الطيور تبني أعشاشها على فروعها، والأرانب تستريح تحت ظلها، والنحل يجمع الرحيق من أزهارها. يوماً ما، قرر الجميع شكر صديقة بزراعة المزيد من الأشجار حولها. وهكذا أصبحت الغابة أكثر جمالاً وازدهاراً. تعلمنا من هذه القصة أن الطبيعة عائلة واحدة، وكل عنصر فيها مهم ويساعد الآخر."
        }
    },
    {
        id: 2,
        title: "النباتات والزهور",
        icon: "🌸",
        image: "lesson_2_plants_flowers_1765325490790.png",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description: "تعلم عن أجزاء النبات ودورها في الطبيعة",
        videoDescription: "فيديو يشرح دور النباتات في إنتاج الأكسجين والغذاء",
        pdfTitle: "أجزاء النبات ووظائفها",
        exercises: [
            { title: "تلوين النباتات", description: "لوّن أجزاء النبات بالألوان الصحيحة" },
            { title: "تعريف الأجزاء", description: "اكتب اسم كل جزء من أجزاء النبات" },
            { title: "دورة نمو النبات", description: "رتب مراحل نمو النبات بالترتيب الصحيح" }
        ],
        activity: "زراعة بذور بسيطة: ازرع بذرة فاصوليا وراقب نموها يومياً",
        story: {
            title: "قصة البذرة الصغيرة",
            content: "كانت هناك بذرة صغيرة اسمها أمل. كانت أمل تحلم بأن تصبح شجرة كبيرة. طلبت من الشمس أن تدفئها، ومن المطر أن يسقيها، ومن التربة أن تطعمها. بدأت أمل تنمو ببطء - أولاً خرجت جذورها إلى الأسفل، ثم ساقها إلى الأعلى. وبعد أيام، أصبحت لديها أوراق خضراء جميلة. مع مرور الوقت، أصبحت أمل شجرة قوية تعطي الظل والثمار للجميع. تعلمنا أن الصبر والرعاية يحولان الحلم الصغير إلى حقيقة كبيرة."
        }
    },
    {
        id: 3,
        title: "الحيوانات والطيور",
        icon: "🦁",
        image: "lesson_3_animals_birds_1765325510461.png",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description: "اكتشف أنواع الحيوانات وبيئاتها المختلفة",
        videoDescription: "فيديو يستعرض فصائل الحيوانات وأماكن عيشها",
        pdfTitle: "فصائل الحيوانات وبيئاتها",
        exercises: [
            { title: "تلوين الحيوانات", description: "لوّن الحيوانات المختلفة" },
            { title: "تصنيف الحيوانات", description: "صنف الحيوانات: أليفة، برية، طيور، أسماك" },
            { title: "أصوات الحيوانات", description: "طابق كل حيوان مع صوته" }
        ],
        activity: "صنع طائر من الورق: استخدم الورق الملون لصنع طائر جميل",
        story: {
            title: "قصة الفأر الذكي",
            content: "في مزرعة كبيرة، عاش فأر صغير ذكي اسمه حسّون. لاحظ حسّون أن الطيور تأكل الحبوب من الحقل، والقطط تطارد الفئران، والكلاب تحرس المزرعة. فكر حسّون: 'لكل حيوان دور!' قرر حسّون أن يساعد بطريقته الخاصة - بدأ يجمع البذور الزائدة ويخزنها للشتاء، مساعداً المزارع. عندما جاء الشتاء القارس، شكر المزارع حسّون على ذكائه. تعلمنا أن كل مخلوق، مهما كان صغيراً، له دور مهم في الطبيعة."
        }
    },
    {
        id: 4,
        title: "الماء والهواء",
        icon: "💧",
        image: "lesson_4_water_air_1765325527865.png",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description: "افهم أهمية الماء والهواء لجميع الكائنات الحية",
        videoDescription: "فيديو يشرح دورة الماء في الطبيعة وأهمية الهواء النقي",
        pdfTitle: "دورة الماء وأهمية الهواء",
        exercises: [
            { title: "تجربة الماء", description: "شاهد كيف يتبخر الماء ويتكثف" },
            { title: "دورة الماء", description: "ارسم دورة الماء: بخار، سحاب، مطر" },
            { title: "الطفو والغرق", description: "جرب أي الأشياء تطفو وأيها تغرق" }
        ],
        activity: "تجربة غرق وطفو: ضع أشياء مختلفة في الماء ولاحظ ماذا يحدث",
        story: {
            title: "قصة قطرة الماء",
            content: "قطرة ماء صغيرة اسمها ندى عاشت في البحر. يوماً ما، دفأتها الشمس فطارت عالياً كبخار. في السماء، التقت بقطرات أخرى وشكلوا سحابة بيضاء. سافرت السحابة فوق الأرض حتى وصلت إلى حقل عطشان. سقطت ندى مع أصدقائها كمطر منعش، فرحت النباتات والحيوانات بالماء. بعضها شربته النباتات، وبعضها تسرب للأرض ليصبح نهراً، وعادت ندى إلى البحر لتبدأ رحلة جديدة. تعلمنا أن الماء يدور في دائرة رائعة تخدم كل الكائنات الحية."
        }
    },
    {
        id: 5,
        title: "التربة والأرض",
        icon: "🌱",
        description: "اكتشف أنواع التربة ومكوناتها الأساسية",
        videoDescription: "فيديو يستعرض أنواع التربة وأهميتها للنباتات",
        pdfTitle: "مكونات التربة وأنواعها",
        exercises: [
            { title: "فحص التربة", description: "افحص عينات تربة مختلفة بالعدسة المكبرة" },
            { title: "أنواع التربة", description: "تعرف على التربة الرملية، الطينية، والطمية" },
            { title: "ما يعيش في التربة", description: "تعرف على الكائنات الحية الدقيقة في التربة" }
        ],
        activity: "زراعة البذور في تربة: ازرع بذوراً في أنواع مختلفة من التربة ولاحظ الفرق",
        story: {
            title: "قصة التربة السعيدة",
            content: "كانت هناك قطعة أرض حزينة لا ينمو فيها شيء. جاءت دودة صغيرة اسمها نشيطة وقالت: 'سأساعدك!' بدأت نشيطة تحفر في التربة، تخلطها وتهويها. جاء المطر ونزل إلى عمق التربة. جاءت أوراق الأشجار المتساقطة وأطعمت التربة. ببطء، أصبحت التربة غنية ومغذية. زرع المزارع بذوراً، ونمت نباتات جميلة. أصبحت التربة سعيدة مليئة بالحياة. تعلمنا أن التربة الصحية هي أساس الحياة، وأن الكائنات الصغيرة لها دور كبير في العناية بها."
        }
    },
    {
        id: 6,
        title: "دورة الحياة",
        icon: "🦋",
        description: "تعلم عن مراحل نمو الكائنات الحية",
        videoDescription: "فيديو يوضح دورات حياة مختلفة: النبات، الفراشة، الدجاجة",
        pdfTitle: "مراحل النمو والتطور",
        exercises: [
            { title: "ترتيب مراحل النمو", description: "رتب مراحل نمو الفراشة من البيضة للفراشة" },
            { title: "دورة حياة النبات", description: "رتب: بذرة، شتلة، نبتة، شجرة" },
            { title: "نمو الإنسان", description: "رتب مراحل نمو الإنسان من الطفولة للشباب" }
        ],
        activity: "زراعة البذور ومراقبة النمو: سجل نمو نبتتك على مدار أسبوعين",
        story: {
            title: "قصة الفراشة الصغيرة",
            content: "في ورقة شجر، وضعت فراشة بيضة صغيرة. خرجت منها يرقة صغيرة اسمها يسرى. كانت يسرى جائعة جداً، أكلت الكثير من أوراق الشجر ونمت وكبرت. يوماً ما، شعرت يسرى بالنعاس الشديد، فصنعت لنفسها بيتاً حريرياً (شرنقة) ونامت فيه. مرت أيام وأسابيع. وفجأة، انشقت الشرنقة وخرجت منها فراشة جميلة بألوان رائعة! طارت يسرى بأجنحتها الجديدة فرحة بالتحول العجيب. تعلمنا أن الحياة رحلة تحول ونمو مستمر."
        }
    },
    {
        id: 7,
        title: "الطاقة والضوء",
        icon: "☀️",
        description: "افهم مصادر الطاقة وأهمية الشمس",
        videoDescription: "فيديو يشرح مصادر الطاقة: الشمس، الرياح، الماء",
        pdfTitle: "أنواع الطاقة واستخداماتها",
        exercises: [
            { title: "مصادر الطاقة", description: "تعرف على مصادر الطاقة المتجددة" },
            { title: "تجربة الضوء", description: "شاهد كيف ينكسر الضوء في المنشور" },
            { title: "الظل والضوء", description: "العب بالظلال في ضوء الشمس" }
        ],
        activity: "صناعة دفينة شمسية: اصنع مجفف فواكه بسيط بالطاقة الشمسية",
        story: {
            title: "قصة الشمس والضوء",
            content: "الشمس الطيبة تشرق كل صباح لتعطي الضوء والدفء للأرض. تقول الشمس: 'أعطي ضوئي للنباتات لتصنع غذاءها، ودفئي للحيوانات لتشعر بالراحة، وطاقتي للماء ليتبخر ويصبح مطراً.' يوماً ما، اختبأت الشمس خلف السحاب الكثيف، فحزنت النباتات والحيوانات. صرخوا: 'نحن بحاجة إليك يا شمس!' عندما سمعتهم، أزاحت الشمس السحاب وأشرقت بقوة. عادت الحياة والبهجة للطبيعة. تعلمنا أن الشمس هي مصدر الحياة والطاقة على الأرض، ويجب أن نشكرها دائماً."
        }
    },
    {
        id: 8,
        title: "التلوث والنظافة",
        icon: "🚯",
        description: "تعرف على مخاطر التلوث وكيفية حماية البيئة",
        videoDescription: "فيديو يوضح أنواع التلوث: الهواء، الماء، التربة",
        pdfTitle: "أنواع التلوث وحلول النظافة",
        exercises: [
            { title: "تحديد المخاطر", description: "حدد مصادر التلوث في الصور" },
            { title: "حلول للنظافة", description: "اقترح حلولاً للحفاظ على نظافة البيئة" },
            { title: "فرز النفايات", description: "تعلم كيفية فرز النفايات بشكل صحيح" }
        ],
        activity: "حملة نظافة افتراضية: نظف الحديقة الافتراضية من القمامة",
        story: {
            title: "قصة النهر النظيف",
            content: "كان هناك نهر جميل اسمه صافي، ماؤه نقي والأسماك تسبح فيه بسعادة. لكن الناس بدأوا يرمون القمامة في النهر. حزن صافي وأصبح ماؤه قذراً، مرضت الأسماك وهربت الطيور. جاءت طفلة اسمها سلمى ورأت النهر الحزين. قالت: 'يجب أن أساعد!' جمعت سلمى أصدقاءها ونظفوا النهر معاً. أزالوا القمامة ووضعوا لافتات 'حافظوا على النهر نظيفاً'. عاد صافي نظيفاً وعادت الحياة إليه. تعلمنا أن النظافة مسؤولية الجميع، وأن عملاً صغيراً يمكن أن يحدث فرقاً كبيراً."
        }
    },
    {
        id: 9,
        title: "الحفاظ على البيئة",
        icon: "♻️",
        description: "تعلم طرق الحفاظ على البيئة وإعادة التدوير",
        videoDescription: "فيديو يشرح أهمية إعادة التدوير والتقليل من النفايات",
        pdfTitle: "إعادة التدوير وحماية البيئة",
        exercises: [
            { title: "تمارين إعادة التدوير", description: "صنف المواد: ورق، بلاستيك، زجاج، معدن" },
            { title: "تقليل الاستهلاك", description: "فكر في طرق لتقليل استخدام البلاستيك" },
            { title: "إعادة الاستخدام", description: "اقترح استخدامات جديدة للأشياء القديمة" }
        ],
        activity: "صناعة منتجات من مواد معاد تدويرها: اصنع شيئاً مفيداً من علب فارغة",
        story: {
            title: "قصة الصديق الأخضر",
            content: "في مدينة صغيرة، عاش صبي اسمه خالد يحب البيئة كثيراً. لقبه أصدقاؤه بـ'الصديق الأخضر'. كان خالد يجمع الزجاجات البلاستيكية الفارغة ويحولها إلى أصص للزهور. يجمع الأوراق ويصنع منها دفاتر جديدة. علّم خالد أصدقاءه قاعدة الـ3R: تقليل (Reduce)، إعادة استخدام (Reuse)، إعادة تدوير (Recycle). أعجب الجميع بأفكاره وبدأوا يقلدونه. أصبحت المدينة أنظف وأجمل. منحت البلدية خالد جائزة 'حامي البيئة'. تعلمنا أن كل شخص يمكنه أن يكون صديقاً للبيئة بأفعال بسيطة."
        }
    },
    {
        id: 10,
        title: "عالم المستقبل",
        icon: "🌏",
        description: "تخيل مستقبل البيئة وكيف نحميها",
        videoDescription: "فيديو يستعرض تقنيات المستقبل الصديقة للبيئة",
        pdfTitle: "مستقبل البيئة والتكنولوجيا الخضراء",
        exercises: [
            { title: "تصميم عالم نظيف", description: "ارسم مدينة المستقبل الصديقة للبيئة" },
            { title: "الحلول المبتكرة", description: "فكر في اختراعات تساعد البيئة" },
            { title: "وعد للبيئة", description: "اكتب وعداً شخصياً لحماية البيئة" }
        ],
        activity: "رسم المستقبل: ارسم كيف تتخيل الأرض بعد 50 سنة",
        story: {
            title: "قصة الغد المشرق",
            content: "نامت لينا وحلمت بالمستقبل. في حلمها، رأت مدينة مستقبلية رائعة حيث السيارات تطير ولا تلوث الهواء، الأشجار تنمو على أسطح المباني، الطاقة تأتي من الشمس والرياح، والماء نظيف وفير. سألت: 'كيف أصبح العالم هكذا؟' أجابها جدها المستقبلي: 'لأن أطفال اليوم، مثلك يا لينا، تعلموا حب البيئة والمحافظة عليها. كل طفل زرع شجرة، وكل عائلة قللت النفايات، وكل مدرسة علّمت الوعي البيئي. العمل الصغير اليوم يصنع غداً مشرقاً.' استيقظت لينا متحمسة: 'سأبدأ اليوم! سأزرع شجرة!' تعلمنا أن مستقبل الأرض بأيدينا، وأن أفعالنا اليوم تصنع عالم الغد."
        }
    }
];

const examQuestions = [
    {
        id: 1,
        question: "ما هي العناصر الأساسية للطبيعة؟",
        type: "multiple",
        options: [
            "الماء، الهواء، التربة، والكائنات الحية",
            "السيارات، المباني، والطرق",
            "التلفاز، الكمبيوتر، والألعاب"
        ],
        correct: 0
    },
    {
        id: 2,
        question: "اشرح دور النباتات في البيئة",
        type: "text",
        answer: "النباتات تنتج الأكسجين، توفر الغذاء، تنقي الهواء، وتمنع تآكل التربة"
    },
    {
        id: 3,
        question: "كيف نحمي بيئتنا؟",
        type: "multiple",
        options: [
            "بإعادة التدوير، تقليل النفايات، وزراعة الأشجار",
            "برمي القمامة في الشارع",
            "باستخدام الكثير من البلاستيك"
        ],
        correct: 0
    },
    {
        id: 4,
        question: "ما هي دورة الماء؟",
        type: "text",
        answer: "الماء يتبخر من البحار والأنهار، يشكل سحباً، ثم ينزل مطراً، ويعود للبحار"
    },
    {
        id: 5,
        question: "اشرح أهمية إعادة التدوير",
        type: "multiple",
        options: [
            "تقلل النفايات، توفر الموارد، وتحمي البيئة",
            "تزيد القمامة",
            "لا فائدة منها"
        ],
        correct: 0
    }
];

// ==================== إدارة الصفحات ====================

function showPage(pageId) {
    // إخفاء جميع الصفحات
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // إظهار الصفحة المطلوبة
    document.getElementById(pageId).classList.add('active');

    // تحديث رسالة الشخصية المرشدة
    updateMascotMessage(pageId);

    // تحميل المحتوى حسب الصفحة
    if (pageId === 'lessonsPage') {
        loadLessons();
    } else if (pageId === 'storiesPage') {
        loadStories();
    } else if (pageId === 'examPage') {
        loadExam();
    }

    // التمرير للأعلى
    window.scrollTo(0, 0);
}

// ==================== الشخصية المرشدة ====================

function updateMascotMessage(pageId) {
    const messages = {
        homePage: "مرحباً! أنا شجرة المعرفة 🌳",
        menuPage: "اختر ما تحب أن تتعلمه! 📚",
        lessonsPage: "استعد لرحلة تعليمية رائعة! 🚀",
        gamesPage: "وقت المرح والتعلم! 🎮",
        storiesPage: "هيا نقرأ قصصاً جميلة! 📖",
        examPage: "أنت مستعد! أظهر ما تعلمته! ✨",
        certificatesPage: "أحسنت! استلم شهادتك! 🏆",
        parentsPage: "نصائح مفيدة للآباء! 👨‍👩‍👧"
    };

    const speech = document.getElementById('mascotSpeech');
    speech.textContent = messages[pageId] || "مرحباً بك! 😊";

    // تأثير الظهور
    speech.style.animation = 'none';
    setTimeout(() => {
        speech.style.animation = 'popIn 0.5s ease forwards';
    }, 10);
}

// ==================== تحميل الدروس ====================

function loadLessons() {
    const lessonsGrid = document.getElementById('lessonsGrid');
    lessonsGrid.innerHTML = '';

    lessons.forEach((lesson, index) => {
        const lessonCard = document.createElement('div');
        lessonCard.className = 'lesson-card';
        lessonCard.style.animationDelay = `${index * 0.1} s`;
        lessonCard.onclick = () => showLessonDetail(lesson.id);

        lessonCard.innerHTML = `
    < div class="lesson-number" > ${lesson.id}</div >
            <div class="lesson-icon">${lesson.icon}</div>
            <div class="lesson-content">
                <h3>${lesson.title}</h3>
                <p>${lesson.description}</p>
                <div class="lesson-status">
                    <span class="status-badge video">📹 فيديو</span>
                    <span class="status-badge exercise">✏️ تمارين</span>
                    <span class="status-badge story">📚 قصة</span>
                </div>
            </div>
`;

        lessonsGrid.appendChild(lessonCard);
    });
}

// ==================== تفاصيل الدرس ====================

function showLessonDetail(lessonId) {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    const detailContent = document.getElementById('lessonDetailContent');
    detailContent.innerHTML = `
    < div class="lesson-header" >
            <h2>${lesson.icon} ${lesson.title}</h2>
            <p>${lesson.description}</p>
        </div >

    ${lesson.image ? `
        <div class="lesson-section">
            <h3>🖼️ صورة توضيحية</h3>
            <div style="text-align: center; margin: 20px 0;">
                <img src="${lesson.image}" alt="${lesson.title}" style="max-width: 100%; border-radius: 20px; box-shadow: var(--shadow-lg);">
            </div>
        </div>
        ` : ''
        }
        
        <div class="lesson-section">
            <h3>📹 الفيديو التعليمي</h3>
            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 15px; margin-bottom: 20px;">
                <iframe 
                    src="${lesson.videoUrl || 'about:blank'}" 
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            <p style="text-align: center; color: #666;">${lesson.videoDescription}</p>
        </div>
        
        <div class="lesson-section">
            <h3>📄 الملف التعليمي</h3>
            <div class="exercise-item">
                <h4>📚 ${lesson.pdfTitle}</h4>
                <p>ملف تعليمي شامل يحتوي على جميع المعلومات الأساسية</p>
                <button class="btn-secondary" onclick="downloadPDF(${lessonId})">
                    📥 تحميل الملف
                </button>
            </div>
        </div>
        
        <div class="lesson-section">
            <h3>✏️ التمارين العملية</h3>
            ${lesson.exercises.map((ex, i) => `
                <div class="exercise-item">
                    <h4>${i + 1}. ${ex.title}</h4>
                    <p>${ex.description}</p>
                </div>
            `).join('')}
        </div>
        
        <div class="lesson-section">
            <h3>🎨 النشاط التفاعلي</h3>
            <div class="exercise-item">
                <p>${lesson.activity}</p>
                <button class="btn-primary" onclick="startActivity(${lessonId})">
                    🎯 ابدأ النشاط
                </button>
            </div>
        </div>
        
        <div class="lesson-section">
            <h3>📖 ${lesson.story.title}</h3>
            <div class="story-box">
                <p>${lesson.story.content}</p>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 40px;">
            <button class="btn-primary" onclick="completeLesson(${lessonId})">
                ✅ أكملت الدرس
            </button>
            <button class="btn-secondary" onclick="showPage('lessonsPage')">
                ← العودة للدروس
            </button>
        </div>
`;

    showPage('lessonDetailPage');
}

// ==================== تحميل القصص ====================

function loadStories() {
    const storiesGrid = document.getElementById('storiesGrid');
    storiesGrid.innerHTML = '';

    lessons.forEach((lesson, index) => {
        const storyCard = document.createElement('div');
        storyCard.className = 'story-card';
        storyCard.style.animationDelay = `${index * 0.1} s`;
        storyCard.onclick = () => showStory(lesson.id);

        storyCard.innerHTML = `
    < h3 > ${lesson.icon} ${lesson.story.title}</h3 >
        <p>${lesson.story.content.substring(0, 150)}...</p>
`;

        storiesGrid.appendChild(storyCard);
    });
}

function showStory(lessonId) {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    showCelebration(`
    < h2 style = "font-size: 2.5rem; color: var(--dark-green); margin-bottom: 20px;" >
        ${lesson.icon} ${lesson.story.title}
        </h2 >
    <div style="text-align: right; line-height: 1.8; font-size: 1.1rem; max-height: 400px; overflow-y: auto; padding: 20px;">
        ${lesson.story.content}
    </div>
`);
}

// ==================== الامتحان ====================

function loadExam() {
    const examContainer = document.getElementById('examContainer');
    examContainer.innerHTML = `
    < div style = "text-align: center; margin-bottom: 40px;" >
            <h3 style="font-size: 2rem; color: var(--dark-green); margin-bottom: 15px;">
                📝 اختبر معلوماتك
            </h3>
            <p style="font-size: 1.2rem; color: #666;">
                أجب على جميع الأسئلة لتحصل على نتيجتك
            </p>
        </div >

    ${examQuestions.map((q, index) => `
            <div class="question-card" style="animation-delay: ${index * 0.1}s;">
                <h3>السؤال ${q.id}: ${q.question}</h3>
                
                ${q.type === 'multiple' ? `
                    <div class="answer-options">
                        ${q.options.map((option, i) => `
                            <label class="answer-option">
                                <input type="radio" name="question${q.id}" value="${i}">
                                <span>${option}</span>
                            </label>
                        `).join('')}
                    </div>
                ` : `
                    <textarea 
                        class="answer-text" 
                        id="answer${q.id}" 
                        rows="4" 
                        placeholder="اكتب إجابتك هنا..."
                    ></textarea>
                `}
            </div>
        `).join('')
        }

<div style="text-align: center; margin-top: 40px;">
    <button class="btn-primary btn-glow" onclick="submitExam()">
        ✅ إرسال الإجابات
    </button>
    <button class="btn-secondary" onclick="showPage('menuPage')">
        ← العودة للقائمة
    </button>
</div>
`;
}

function submitExam() {
    let score = 0;
    let total = examQuestions.length;

    examQuestions.forEach(q => {
        if (q.type === 'multiple') {
            const selected = document.querySelector(`input[name = "question${q.id}"]: checked`);
            if (selected && parseInt(selected.value) === q.correct) {
                score++;
            }
        } else {
            const answer = document.getElementById(`answer${q.id} `).value.trim();
            if (answer.length > 10) { // أي إجابة معقولة
                score++;
            }
        }
    });

    const percentage = Math.round((score / total) * 100);

    let message = '';
    let emoji = '';

    if (percentage >= 80) {
        message = `ممتاز جداً! حصلت على ${score} من ${total} (${percentage}%)`;
        emoji = '🏆🌟✨';
        createParticles('🎉');
    } else if (percentage >= 60) {
        message = `جيد جداً! حصلت على ${score} من ${total} (${percentage}%)`;
        emoji = '👍⭐';
        createParticles('⭐');
    } else {
        message = `حاولحاولت! حصلت على ${score} من ${total} (${percentage}%). حاول مرة أخرى!`;
        emoji = '💪📚';
    }

    showCelebration(`
    < h2 style = "font-size: 3rem; margin-bottom: 20px;" > ${emoji}</h2 >
        <h3 style="font-size: 2rem; color: var(--primary-green); margin-bottom: 20px;">
            نتيجة الامتحان
        </h3>
        <p style="font-size: 1.5rem; color: #333; margin-bottom: 30px;">
            ${message}
        </p>
        ${percentage >= 70 ? `
            <button class="btn-primary" onclick="closeModal(); showPage('certificatesPage');">
                🏆 احصل على شهادتك
            </button>
        ` : `
            <button class="btn-primary" onclick="closeModal(); loadExam();">
                🔄 حاول مرة أخرى
            </button>
        `}
`);

    // حفظ النتيجة
    localStorage.setItem('examScore', percentage);
}

// ==================== الألعاب ====================

function playGame(gameType) {
    const gameContent = document.getElementById('gameContent');

    const games = {
        matching: {
            title: '🎯 لعبة المطابقة',
            description: 'طابق الصورة مع الاسم الصحيح',
            content: createMatchingGame()
        },
        quiz: {
            title: '❓ لعبة الأسئلة',
            description: 'أجب على الأسئلة بسرعة',
            content: createQuizGame()
        },
        puzzle: {
            title: '🧩 لعبة الألغاز',
            description: 'اكمل اللغز البيئي',
            content: createPuzzleGame()
        },
        memory: {
            title: '🃏 لعبة الذاكرة',
            description: 'اعثر على البطاقات المتطابقة',
            content: createMemoryGame()
        }
    };

    const game = games[gameType];

    gameContent.innerHTML = `
    < div class="lesson-detail" >
            <div class="lesson-header">
                <h2>${game.title}</h2>
                <p>${game.description}</p>
            </div>
            
            <div class="lesson-section">
                ${game.content}
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
                <button class="btn-secondary" onclick="showPage('gamesPage')">
                    ← العودة للألعاب
                </button>
            </div>
        </div >
    `;

    showPage('gamePage');
}

// بيانات لعبة المطابقة المتقدمة
const matchingData = {
    ar: [
        { question: 'ما الذي ينتج الأكسجين؟', options: ['🌳 الأشجار', '🚗 السيارات', '🏠 المباني'], correct: 0 },
        { question: 'ماذا تحتاج النباتات؟', options: ['☀️ الشمس والماء', '🍔 الطعام', '📺 التلفاز'], correct: 0 },
        { question: 'من يلقح الأزهار؟', options: ['🐝 النحل', '🐟 السمك', '🚁 الطائرة'], correct: 0 },
        { question: 'أين تعيش الأسماك؟', options: ['💧 الماء', '🌳 الشجرة', '⛰️ الجبل'], correct: 0 },
        { question: 'ماذا يحمي الأرض من الشمس؟', options: ['🌍 الغلاف الجوي', '🏠 المنازل', '👕 الملابس'], correct: 0 },
        { question: 'ما هو رمز إعادة التدوير؟', options: ['♻️ ثلاثة أسهم', '⭐ نجمة', '❤️ قلب'], correct: 0 }
    ],
    en: [
        { question: 'What produces oxygen?', options: ['🌳 Trees', '🚗 Cars', '🏠 Buildings'], correct: 0 },
        { question: 'What do plants need?', options: ['☀️ Sun and water', '🍔 Food', '📺 TV'], correct: 0 },
        { question: 'Who pollinates flowers?', options: ['🐝 Bees', '🐟 Fish', '🚁 Helicopter'], correct: 0 },
        { question: 'Where do fish live?', options: ['💧 Water', '🌳 Tree', '⛰️ Mountain'], correct: 0 },
        { question: 'What protects Earth from the sun?', options: ['🌍 Atmosphere', '🏠 Houses', '👕 Clothes'], correct: 0 },
        { question: 'What is the recycling symbol?', options: ['♻️ Three arrows', '⭐ Star', '❤️ Heart'], correct: 0 }
    ]
};

let matchingScore = 0;
let matchingAnswers = [];

function createMatchingGame() {
    matchingScore = 0;
    matchingAnswers = [];
    const questions = matchingData[currentLang];

    return `
        <div style="max-width: 700px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 15px; margin-bottom: 30px; text-align: center;">
                <h3 style="margin: 0; font-size: 1.5rem;">
                    ${currentLang === 'ar' ? '🎯 اختر الإجابة الصحيحة لكل سؤال' : '🎯 Choose the correct answer for each question'}
                </h3>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">
                    ${currentLang === 'ar' ? 'أظهر معرفتك بالطبيعة والبيئة!' : 'Show your knowledge of nature and environment!'}
                </p>
            </div>
            
            ${questions.map((q, i) => `
                <div class="question-card" style="margin-bottom: 25px; animation-delay: ${i * 0.1}s;">
                    <h4 style="color: var(--dark-green); margin-bottom: 15px; font-size: 1.2rem;">
                        ${i + 1}. ${q.question}
                    </h4>
                    <div style="display: grid; gap: 10px;">
                        ${q.options.map((opt, j) => `
                            <label class="answer-option" style="cursor: pointer; transition: all 0.3s;">
                                <input type="radio" name="match${i}" value="${j}" onchange="recordMatchAnswer(${i}, ${j})">
                                <span style="font-size: 1.1rem;">${opt}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
            
            <div style="text-align: center; margin-top: 30px;">
                <button class="btn-primary btn-glow" onclick="checkMatchingAdvanced()" style="font-size: 1.2rem; padding: 15px 40px;">
                    ${currentLang === 'ar' ? '✅ تحقق من الإجابات' : '✅ Check Answers'}
                </button>
            </div>
            
            <div id="matchingResult" style="margin-top: 20px;"></div>
        </div>
    `;
}

function recordMatchAnswer(questionIndex, answer) {
    matchingAnswers[questionIndex] = answer;
}

function checkMatchingAdvanced() {
    const questions = matchingData[currentLang];
    matchingScore = 0;

    questions.forEach((q, i) => {
        if (matchingAnswers[i] === q.correct) {
            matchingScore++;
        }
    });

    const percentage = Math.round((matchingScore / questions.length) * 100);
    let message, emoji;

    if (percentage === 100) {
        message = currentLang === 'ar'
            ? `🏆 ممتاز جداً! حصلت على ${matchingScore}/${questions.length} - نتيجة كاملة!`
            : `🏆 Excellent! You got ${matchingScore}/${questions.length} - Perfect score!`;
        emoji = '🎉🌟✨';
        createFlowerRain();
    } else if (percentage >= 70) {
        message = currentLang === 'ar'
            ? `👍 جيد جداً! حصلت على ${matchingScore}/${questions.length}`
            : `👍 Very good! You got ${matchingScore}/${questions.length}`;
        emoji = '⭐';
        createParticles('⭐');
    } else {
        message = currentLang === 'ar'
            ? `💪 حاول مرة أخرى! حصلت على ${matchingScore}/${questions.length}`
            : `💪 Try again! You got ${matchingScore}/${questions.length}`;
        emoji = '📚';
    }

    speak(message);
    showCelebration(`${emoji}<br><br>${message}`);
}

// بيانات لعبة الأسئلة المتنوعة
const quizData = {
    ar: {
        easy: [
            { q: 'ما لون أوراق الأشجار؟', a: ['🟢 أخضر', '🔵 أزرق', '🔴 أحمر', '⚫ أسود'], correct: 0 },
            { q: 'ما هو مصدر الضوء الطبيعي؟', a: ['☀️ الشمس', '💡 المصباح', '📱 الهاتف', '🖥️ الكمبيوتر'], correct: 0 },
            { q: 'ماذا تأكل الأرانب؟', a: ['🥕 الجزر', '🍖 اللحم', '🐟 السمك', '🍕 البيتزا'], correct: 0 },
            { q: 'كم عدد أرجل العنكبوت؟', a: ['8️⃣ ثمانية', '6️⃣ ستة', '4️⃣ أربعة', '🔟 عشرة'], correct: 0 },
            { q: 'ما هو أكبر حيوان بحري؟', a: ['🐋 الحوت الأزرق', '🦈 القرش', '🐬 الدولفين', '🐙 الأخطبوط'], correct: 0 }
        ],
        medium: [
            { q: 'ما اسم العملية التي تصنع بها النباتات غذاءها؟', a: ['🌱 التمثيل الضوئي', '💨 التنفس', '💧 الامتصاص', '🌡️ التبخر'], correct: 0 },
            { q: 'كم عدد فصول السنة؟', a: ['4️⃣ أربعة', '3️⃣ ثلاثة', '5️⃣ خمسة', '2️⃣ اثنان'], correct: 0 },
            { q: 'ما هي الطاقة المتجددة؟', a: ['☀️ طاقة لا تنفد', '⚡ طاقة كهربائية', '🔥 طاقة حرارية', '⛽ طاقة البترول'], correct: 0 },
            { q: 'ماذا نسمي حيوان يأكل النباتات فقط؟', a: ['🌿 عاشب', '🍖 لاحم', '🍽️ قارت', '🦴 كانس'], correct: 0 },
            { q: 'ما هو الغاز الذي نتنفسه؟', a: ['💨 الأكسجين', '🌫️ ثاني أكسيد الكربون', '💦 بخار الماء', '🌪️ النيتروجين'], correct: 0 }
        ],
        hard: [
            { q: 'ما هي السلسلة الغذائية؟', a: ['🌾→🐰→🦊 انتقال الطاقة بين الكائنات', '🍕 طعام مختلف', '⛓️ سلسلة معدنية', '🔗 ارتباط كيميائي'], correct: 0 },
            { q: 'ما اسم طبقة الأوزون؟', a: ['🛡️ طبقة تحمي الأرض من الأشعة', '☁️ طبقة من السحاب', '🌊 طبقة من الماء', '🌋 طبقة من الحمم'], correct: 0 },
            { q: 'ما هو الاحتباس الحراري؟', a: ['🌡️ ارتفاع حرارة الأرض', '❄️ انخفاض الحرارة', '🌊 ارتفاع الماء', '⛈️ كثرة الأمطار'], correct: 0 },
            { q: 'ما هي التربة الأفضل للزراعة؟', a: ['🌾 الطينية الغنية', '🏖️ الرملية', '🪨 الص خرية', '❄️ الجليدية'], correct: 0 },
            { q: 'كم تستغرق الأرض للدوران حول نفسها؟', a: ['🌍 24 ساعة', '🌙 شهر', '☀️ سنة', '⏰ 12 ساعة'], correct: 0 }
        ]
    },
    en: {
        easy: [
            { q: 'What color are tree leaves?', a: ['🟢 Green', '🔵 Blue', '🔴 Red', '⚫ Black'], correct: 0 },
            { q: 'What is the natural source of light?', a: ['☀️ The Sun', '💡 Lamp', '📱 Phone', '🖥️ Computer'], correct: 0 },
            { q: 'What do rabbits eat?', a: ['🥕 Carrots', '🍖 Meat', '🐟 Fish', '🍕 Pizza'], correct: 0 },
            { q: 'How many legs does a spider have?', a: ['8️⃣ Eight', '6️⃣ Six', '4️⃣ Four', '🔟 Ten'], correct: 0 },
            { q: 'What is the largest sea animal?', a: ['🐋 Blue Whale', '🦈 Shark', '🐬 Dolphin', '🐙 Octopus'], correct: 0 }
        ],
        medium: [
            { q: 'What process do plants use to make food?', a: ['🌱 Photosynthesis', '💨 Respiration', '💧 Absorption', '🌡️ Evaporation'], correct: 0 },
            { q: 'How many seasons are there?', a: ['4️⃣ Four', '3️⃣ Three', '5️⃣ Five', '2️⃣ Two'], correct: 0 },
            { q: 'What is renewable energy?', a: ['☀️ Energy that doesn\'t run out', '⚡ Electric energy', '🔥 Heat energy', '⛽ Petroleum energy'], correct: 0 },
            { q: 'What do we call an animal that eats only plants?', a: ['🌿 Herbivore', '🍖 Carnivore', '🍽️ Omnivore', '🦴 Scavenger'], correct: 0 },
            { q: 'What gas do we breathe?', a: ['💨 Oxygen', '🌫️ Carbon dioxide', '💦 Water vapor', '🌪️ Nitrogen'], correct: 0 }
        ],
        hard: [
            { q: 'What is a food chain?', a: ['🌾→🐰→🦊 Energy transfer between organisms', '🍕 Different foods', '⛓️ Metal chain', '🔗 Chemical bond'], correct: 0 },
            { q: 'What is the ozone layer?', a: ['🛡️ Layer protecting Earth from radiation', '☁️ Cloud layer', '🌊 Water layer', '🌋 Lava layer'], correct: 0 },
            { q: 'What is global warming?', a: ['🌡️ Earth temperature rising', '❄️ Temperature dropping', '🌊 Water rising', '⛈️ More rain'], correct: 0 },
            { q: 'What is the best soil for farming?', a: ['🌾 Rich loamy soil', '🏖️ Sandy', '🪨 Rocky', '❄️ Icy'], correct: 0 },
            { q: 'How long does Earth take to rotate?', a: ['🌍 24 hours', '🌙 A month', '☀️ A year', '⏰ 12 hours'], correct: 0 }
        ]
    }
};

let quizLevel = 'easy';
let quizScore = 0;
let quizAnswers = [];

function createQuizGame() {
    return `
        <div style="max-width: 700px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h3 style="color: var(--dark-green); margin-bottom: 20px; font-size: 1.8rem;">
                    ${currentLang === 'ar' ? '❓ اختر مستوى الأسئلة' : '❓ Choose Quiz Level'}
                </h3>
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                    <button class="btn-primary" onclick="startQuiz('easy')" style="padding: 12px 25px;">
                        ${currentLang === 'ar' ? '😊 سهل' : '😊 Easy'}
                    </button>
                    <button class="btn-primary" onclick="startQuiz('medium')" style="padding: 12px 25px;">
                        ${currentLang === 'ar' ? '🤔 متوسط' : '🤔 Medium'}
                    </button>
                    <button class="btn-primary" onclick="startQuiz('hard')" style="padding: 12px 25px;">
                        ${currentLang === 'ar' ? '🧠 صعب' : '🧠 Hard'}
                    </button>
                </div>
            </div>
            
            <div id="quizContent" style="min-height: 300px;">
                <p style="text-align: center; color: #666; font-size: 1.2rem;">
                    ${currentLang === 'ar' ? 'اختر مستوى لبدء الاختبار! 🎯' : 'Choose a level to start the quiz! 🎯'}
                </p>
            </div>
        </div>
    `;
}

function startQuiz(level) {
    quizLevel = level;
    quizScore = 0;
    quizAnswers = [];

    const questions = quizData[currentLang][level];
    const levelNames = {
        ar: { easy: 'السهل', medium: 'المتوسط', hard: 'الصعب' },
        en: { easy: 'Easy', medium: 'Medium', hard: 'Hard' }
    };

    const content = document.getElementById('quizContent');
    content.innerHTML = `
        <div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; padding: 20px; border-radius: 15px; margin-bottom: 30px; text-align: center;">
            <h3 style="margin: 0; font-size: 1.5rem;">
                ${currentLang === 'ar'
            ? `🎯 مستوى: ${levelNames.ar[level]}`
            : `🎯 Level: ${levelNames.en[level]}`
        }
            </h3>
        </div>
        
        ${questions.map((q, i) => `
            <div class="question-card" style="margin-bottom: 25px;">
                <h4 style="color: var(--dark-green); margin-bottom: 15px;">
                    ${i + 1}. ${q.q}
                </h4>
                <div class="answer-options">
                    ${q.a.map((opt, j) => `
                        <label class="answer-option">
                            <input type="radio" name="quiz${i}" value="${j}" onchange="recordQuizAnswer(${i}, ${j})">
                            <span>${opt}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `).join('')}
        
        <div style="text-align: center; margin-top: 30px;">
            <button class="btn-primary btn-glow" onclick="checkQuizAdvanced()">
                ${currentLang === 'ar' ? '✅ تحقق من الإجابات' : '✅ Check Answers'}
            </button>
        </div>
    `;

    const message = currentLang === 'ar' ? 'هيا نبدأ! اختبر معلوماتك' : "Let's start! Test your knowledge";
    speak(message);
}

function recordQuizAnswer(questionIndex, answer) {
    quizAnswers[questionIndex] = answer;
}

function checkQuizAdvanced() {
    const questions = quizData[currentLang][quizLevel];
    quizScore = 0;

    questions.forEach((q, i) => {
        if (quizAnswers[i] === q.correct) {
            quizScore++;
        }
    });

    const percentage = Math.round((quizScore / questions.length) * 100);
    let message, emoji;

    if (percentage === 100) {
        message = currentLang === 'ar'
            ? `🏆 رائع! إجابات صحيحة ${quizScore}/${questions.length} - نتيجة كاملة!`
            : `🏆 Amazing! Correct answers ${quizScore}/${questions.length} - Perfect score!`;
        emoji = '🎉🌟✨';
        createFlowerRain();
    } else if (percentage >= 70) {
        message = currentLang === 'ar'
            ? `👍 جيد! إجابات صحيحة ${quizScore}/${questions.length}`
            : `👍 Good! Correct answers ${quizScore}/${questions.length}`;
        emoji = '⭐';
        createParticles('⭐');
    } else {
        message = currentLang === 'ar'
            ? `💪 حاول مرة أخرى! إجابات صحيحة ${quizScore}/${questions.length}`
            : `💪 Try again! Correct answers ${quizScore}/${questions.length}`;
        emoji = '📚';
    }

    speak(message);
    showCelebration(`${emoji}<br><br>${message}`);
}

function createPuzzleGame() {
    return `
    < div style = "text-align: center;" >
            <div style="font-size: 8rem; margin: 40px 0;">
                🧩
            </div>
            <p style="font-size: 1.3rem; color: #666; margin-bottom: 30px;">
                اسحب القطع لتكمل صورة الطبيعة الجميلة
            </p>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; max-width: 400px; margin: 0 auto;">
                ${['🌳', '🌸', '🦋', '☀️', '💧', '🌈', '🌱', '🐝', '🌻'].map((emoji, i) => `
                    <div class="exercise-item" style="font-size: 3rem; padding: 30px; cursor: move; text-align: center;" draggable="true">
                        ${emoji}
                    </div>
                `).join('')}
            </div>
            <button class="btn-primary" style="margin-top: 30px;" onclick="completePuzzle()">
                ✅ أكملت اللغز
            </button>
        </div >
    `;
}

function createMemoryGame() {
    return `
    < div style = "max-width: 700px; margin: 0 auto;" >
            <div style="text-align: center; margin-bottom: 30px;">
                <h3 style="color: var(--dark-green); margin-bottom: 20px;">اختر مستوى اللعبة:</h3>
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                    <button class="btn-primary" onclick="startMemoryLevel('easy')" style="padding: 12px 25px;">
                        😊 سهل (8 بطاقات)
                    </button>
                    <button class="btn-primary" onclick="startMemoryLevel('medium')" style="padding: 12px 25px;">
                        🤔 متوسط (12 بطاقة)
                    </button>
                    <button class="btn-primary" onclick="startMemoryLevel('hard')" style="padding: 12px 25px;">
                        🧠 صعب (16 بطاقة)
                    </button>
                </div>
            </div>
            
            <div id="memoryGameBoard" style="min-height: 400px;">
                <p style="text-align: center; color: #666; font-size: 1.2rem;">
                    اختر مستوى لبدء اللعبة! 🎮
                </p>
            </div>
            
            <div id="memoryStats" style="text-align: center; margin-top: 20px; font-size: 1.2rem; color: var(--dark-green);"></div>
        </div >
    `;
}

// متغيرات لعبة الذاكرة
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let gameLevel = 'easy';

function startMemoryLevel(level) {
    gameLevel = level;
    moves = 0;
    matchedPairs = 0;
    flippedCards = [];

    // تحديد البطاقات حسب المستوى
    const allEmojis = ['🌳', '🌸', '🦁', '💧', '☀️', '🦋', '🌱', '🌻', '🐝', '🌈', '🍃', '🐛', '🌺', '🐞', '🦜', '🌿'];
    let pairCount;

    if (level === 'easy') {
        pairCount = 4; // 8 بطاقات
    } else if (level === 'medium') {
        pairCount = 6; // 12 بطاقة
    } else {
        pairCount = 8; // 16 بطاقة
    }

    // إنشاء أزواج البطاقات
    const selectedEmojis = allEmojis.slice(0, pairCount);
    memoryCards = [...selectedEmojis, ...selectedEmojis];

    // خلط البطاقات
    memoryCards.sort(() => Math.random() - 0.5);

    // عرض اللوحة
    renderMemoryBoard();
    updateMemoryStats();

    // صوت تشجيعي
    speak('هيا نبدأ! ابحث عن الأزواج المتطابقة');
}

function renderMemoryBoard() {
    const board = document.getElementById('memoryGameBoard');
    const gridCols = gameLevel === 'easy' ? 4 : 4;

    board.innerHTML = `
    < div style = "display: grid; grid-template-columns: repeat(${gridCols}, 1fr); gap: 12px;" >
        ${memoryCards.map((emoji, index) => `
                <div 
                    class="memory-card" 
                    id="card-${index}"
                    onclick="flipMemoryCard(${index}, '${emoji}')"
                    style="
                        aspect-ratio: 1;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        border-radius: 15px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 2.5rem;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: var(--shadow-md);
                        position: relative;
                        transform-style: preserve-3d;
                    "
                >
                    <span class="card-front" style="position: absolute; backface-visibility: hidden;">❓</span>
                    <span class="card-back" style="position: absolute; backface-visibility: hidden; transform: rotateY(180deg);">${emoji}</span>
                </div>
            `).join('')
        }
        </div >
    `;
}

function flipMemoryCard(index, emoji) {
    const card = document.getElementById(`card - ${index} `);

    // تجاهل إذا كانت البطاقة مقلوبة أو متطابقة
    if (flippedCards.includes(index) || card.classList.contains('matched')) {
        return;
    }

    // تجاهل إذا كان هناك بطاقتان مفتوحتان بالفعل
    if (flippedCards.length >= 2) {
        return;
    }

    // قلب البطاقة
    card.style.transform = 'rotateY(180deg)';
    card.style.background = 'white';
    flippedCards.push(index);

    // التحقق من التطابق
    if (flippedCards.length === 2) {
        moves++;
        updateMemoryStats();

        setTimeout(() => {
            checkMemoryMatch();
        }, 600);
    }
}

function checkMemoryMatch() {
    const [index1, index2] = flippedCards;
    const card1 = document.getElementById(`card - ${index1} `);
    const card2 = document.getElementById(`card - ${index2} `);
    const emoji1 = memoryCards[index1];
    const emoji2 = memoryCards[index2];

    if (emoji1 === emoji2) {
        // تطابق!
        card1.classList.add('matched');
        card2.classList.add('matched');
        card1.style.background = 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)';
        card2.style.background = 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)';
        card1.style.opacity = '0.7';
        card2.style.opacity = '0.7';

        matchedPairs++;

        // صوت تشجيعي
        const phrase = getRandomPhrase(encouragementPhrases);
        speak(phrase);
        createParticles('🌟');

        // التحقق من الفوز
        if (matchedPairs === memoryCards.length / 2) {
            setTimeout(() => {
                winMemoryGame();
            }, 500);
        }
    } else {
        // لا تطابق
        setTimeout(() => {
            card1.style.transform = 'rotateY(0deg)';
            card2.style.transform = 'rotateY(0deg)';
            card1.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            card2.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }, 400);
    }

    flippedCards = [];
}

function updateMemoryStats() {
    const stats = document.getElementById('memoryStats');
    const totalPairs = memoryCards.length / 2;
    stats.innerHTML = `
    < strong > الحركات:</strong > ${moves} |
        <strong>الأزواج المتطابقة:</strong> ${matchedPairs}/${totalPairs}
    `;
}

function winMemoryGame() {
    const levelNames = {
        easy: 'السهل',
        medium: 'المتوسط',
        hard: 'الصعب'
    };

    const message = `🎉 مبروك! فزت في المستوى ${levelNames[gameLevel]} ! 🏆\n\nأكملت اللعبة في ${moves} حركة!`;
    speak(message);
    showCelebration(message.replace(/\n/g, '<br>'));
    createFlowerRain();
}

// وظائف مساعدة للألعاب
function selectMatch(index) {
    console.log('Selected:', index);
    const phrase = getRandomPhrase(encouragementPhrases);
    speak(phrase);
    showCelebration(phrase);
}

function checkMatching() {
    const phrase = 'رائع! جميع الإجابات صحيحة! 🌟🎉';
    speak(phrase);
    showCelebration(phrase);
    createFlowerRain();
}

function checkQuiz() {
    const phrase = 'ممتاز! أجبت بشكل صحيح! 🏆✨';
    speak(phrase);
    showCelebration(phrase);
    createFlowerRain();
}

function completePuzzle() {
    const phrase = 'أحسنت! أكملت اللغز! 🎨🎉';
    speak(phrase);
    showCelebration(phrase);
    createFlowerRain();
}

// ==================== الشهادة ====================

function generateCertificate() {
    const studentName = document.getElementById('studentName').value.trim();

    if (!studentName) {
        alert('من فضلك أدخل اسمك');
        return;
    }

    const today = new Date().toLocaleDateString('ar-EG');
    const score = localStorage.getItem('examScore') || '100';

    const certificatePreview = document.getElementById('certificatePreview');
    certificatePreview.innerHTML = `
    < div class="certificate-title" >
            🏆 شهادة إتمام الدورة 🏆
        </div >
        
        <div class="certificate-text">
            نشهد بأن الطالب/الطالبة
        </div>
        
        <div class="certificate-name">
            ${studentName}
        </div>
        
        <div class="certificate-text">
            قد أتم بنجاح دورة
            <br>
            <strong style="color: var(--primary-green); font-size: 1.5rem;">
                علوم الطبيعة والبيئة
            </strong>
            <br>
            بدرجة <strong style="color: var(--primary-green);">${score}%</strong>
        </div>
        
        <div class="certificate-seal">
            ✓
        </div>
        
        <div class="certificate-text">
            التاريخ: ${today}
        </div>
        
        <div style="margin-top: 40px;">
            <button class="btn-primary" onclick="printCertificate()">
                🖨️ طباعة الشهادة
            </button>
            <button class="btn-secondary" onclick="downloadCertificate()">
                📥 تحميل الشهادة
            </button>
        </div>
    `;

    certificatePreview.style.animation = 'bounceIn 0.8s ease';
    createParticles('🎓');
    showCelebration('مبروك! حصلت على شهادتك! 🎉🏆');
}

function printCertificate() {
    window.print();
}

function downloadCertificate() {
    alert('سيتم تحميل الشهادة قريباً! 📥');
}

// ==================== وظائف مساعدة ====================

function completeLesson(lessonId) {
    const completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    if (!completed.includes(lessonId)) {
        completed.push(lessonId);
        localStorage.setItem('completedLessons', JSON.stringify(completed));
    }

    const message = getRandomPhrase(completionPhrases);
    speak(message);
    showCelebration(message);
    createParticles('✨');
}

function playVideo(lessonId) {
    showCelebration(`الفيديو قيد التشغيل... 📹<br><small>في النسخة الكاملة، سيتم تشغيل فيديو تعليمي تفاعلي</small>`);
}

function downloadPDF(lessonId) {
    showCelebration(`جاري تحميل الملف التعليمي... 📥<br><small>في النسخة الكاملة، سيتم تحميل ملف PDF تفاعلي</small>`);
}

function startActivity(lessonId) {
    showCelebration(`النشاط التفاعلي سيبدأ قريباً! 🎨<br><small>في النسخة الكاملة، ستتمكن من القيام بأنشطة تفاعلية</small>`);
}

function showCelebration(message) {
    const modal = document.getElementById('congratsModal');
    const congratsMessage = document.getElementById('congratsMessage');

    congratsMessage.innerHTML = message;
    modal.classList.add('active');

    // نطق الرسالة بصوت
    const textOnly = message.replace(/<[^>]*>/g, ''); // إزالة HTML tags
    speak(textOnly);

    // نثر الأزهار والورود
    createFlowerRain();
}

function closeModal() {
    const modal = document.getElementById('congratsModal');
    modal.classList.remove('active');
}

// وظيفة نثر الأزهار والورود المحسنة
function createFlowerRain() {
    const flowers = ['🌸', '🌺', '🌻', '🌷', '🌹', '💐', '🌼', '🏵️', '💮', '🪷'];
    const particles = document.getElementById('particles');

    // إنشاء 30 زهرة
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle flower-particle';
        particle.textContent = flowers[Math.floor(Math.random() * flowers.length)];

        // موضع عشوائي
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.fontSize = (Math.random() * 2.5 + 1.5) + 'rem';

        // تأثير دوران عشوائي
        particle.style.animationDuration = (Math.random() * 2 + 3) + 's';

        particles.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 5000);
    }
}

function createParticles(emoji) {
    const particles = document.getElementById('particles');

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = emoji;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.fontSize = (Math.random() * 2 + 1) + 'rem';

        particles.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
}

// ==================== تهيئة التطبيق ====================

document.addEventListener('DOMContentLoaded', function () {
    // تطبيق اللغة المحفوظة
    applyLanguage();

    // عرض رسالة ترحيب
    setTimeout(() => {
        updateMascotMessage('homePage');
    }, 500);

    // إضافة تأثيرات صوتية (اختياري)
    console.log('🌱 تم تحميل تطبيق علوم الطبيعة والبيئة بنجاح!');

    // تحميل الإعدادات المحفوظة
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// ==================== تفاعل الشخصية ====================

document.getElementById('mascot')?.addEventListener('click', function () {
    const messages = [
        "أحب الطبيعة! 🌳",
        "هل تعلمت شيئاً جديداً اليوم؟ 📚",
        "النباتات تحتاج للماء والشمس! ☀️💧",
        "حافظ على البيئة نظيفة! ♻️",
        "أنت رائع! استمر! 🌟",
        "الأرض بيتنا، دعونا نحميها! 🌍",
        "كل مخلوق له دور مهم! 🦋",
        "التعلم ممتع! هيا نواصل! 🎉"
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const speech = document.getElementById('mascotSpeech');
    speech.textContent = randomMessage;
    speech.style.animation = 'none';

    setTimeout(() => {
        speech.style.animation = 'popIn 0.5s ease forwards';
    }, 10);

    // نطق الرسالة
    speak(randomMessage);
    createParticles('💚');
});
