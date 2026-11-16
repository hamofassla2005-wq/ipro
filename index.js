/**
 * iPro Store & Mobile Services Lab - Master Client Controller
 * Dedicated WhatsApp Routing:
 *   - Device Inquiries: +201017891759
 *   - Repair Services: +201115373748
 *   - Accessories Department: +201101675132
 * Fully responsive, bilingual (Egyptian Arabic default & English), with LocalStorage sync.
 */

// ================= DEDICATED WHATSAPP CONTACT NUMBERS & DASHBOARD SYNC =================
function getActiveWhatsApp() {
  try {
    const s = localStorage.getItem("ipro_store_settings");
    if (s) {
      const p = JSON.parse(s);
      return {
        devices: p.waDevices || "201017891759",
        maintenance: p.waMaintenance || "201115373748",
        accessories: p.waAccessories || "201101675132"
      };
    }
  } catch (e) {}
  return {
    devices: "201017891759",
    maintenance: "201115373748",
    accessories: "201101675132"
  };
}

let WHATSAPP_DEVICES = getActiveWhatsApp().devices;
let WHATSAPP_MAINTENANCE = getActiveWhatsApp().maintenance;
let WHATSAPP_ACCESSORIES = getActiveWhatsApp().accessories;

function recordStoreInquiry(dept, details, targetWa) {
  try {
    const raw = localStorage.getItem("ipro_inquiries_log");
    const list = raw ? JSON.parse(raw) : [];
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    list.unshift({
      id: "inq-" + Date.now(),
      dept,
      details,
      date: `اليوم، ${timeStr}`,
      targetWa
    });
    localStorage.setItem("ipro_inquiries_log", JSON.stringify(list.slice(0, 50)));
  } catch (e) {}
}

// ================= COMPLETE BILINGUAL TRANSLATIONS =================
const I18N = {
  ar: {
    announcementBadge: "الفرع المعتمد • iPro Store",
    announcementText: "عرض خاص: احصل على <span class='gold-highlight'>سكرينة حماية أصلية مجاناً + ضمان سنة</span> مع أي جهاز تشتريه!",
    logoSub: "STORE & LAB",
    navHome: "الرئيسية",
    navStore: "أجهزة الآيفون",
    navAccessories: "الإكسسوارات",
    navRepair: "خدمات الصيانة والأسعار",
    navEstimator: "حاسبة الصيانة",
    navTrack: "تتبع جهازك",
    navBranch: "مقر الفرع",
    btnAdmin: "لوحة التحكم",
    btnBookRepair: "احجز صيانة",
    popularSearch: "الأكثر بحثاً:",
    heroChip: "المركز المعتمد الأول لبيع وصيانة الآيفون في مصر",
    heroTitle1: "الفخامة الملكية في",
    heroTitle2: "عالم الآيفون",
    heroTitle3: "& أقوى معمل صيانة فوري.",
    heroDesc: "أهلاً بيك في iPro Store. بنقدملك تشكيلة حصرية من أحدث أجهزة iPhone حتى فئات 17 و 18 القادمة مع باقات الضمان المعتمد، وقسم إكسسوارات راقي، وأحدث معمل صيانة فوري لتصليح جهازك في 30 دقيقة بقطع غيار أصلية فابريكا 100% وأسعار معلنة وواضحة.",
    heroBtnWhatsAppDevice: "مبيعات الأجهزة: 01017891759",
    heroBtnWhatsAppRepair: "صيانة الأجهزة: 01115373748",
    heroBtnWhatsAppAcc: "الإكسسوارات: 01101675132",
    metric1: "قطع غيار أصلية فابريكا",
    metric2: "صيانة فورية في الاستراحة",
    metric3: "ضمان معتمد واستبدال",
    minUnit: "دقيقة",
    storeLiveOpen: "الفرع مفتوح الآن لاستقبالكم",
    quickEstimatorBtn: "احسب تكلفة صيانتك",
    storeBadge: "قسم بيع الأجهزة",
    storeTitle1: "أقوى تشكيلة من أجهزة",
    storeTitle2: "iPhone الأصلية",
    storeSubtitle: "متوفر أحدث موديلات Apple حتى فئات 17 و 18، وأجهزة كسر زيرو فابريكا فرز أول مع ضمان واستبدال فوري. (طلب السعر والحجز عبر واتساب: 01017891759).",
    tabAll: "جميع الموديلات",
    tabAllAcc: "جميع الإكسسوارات",
    tabUsed: "كسر زيرو فابريكا فرز أول",
    sortLabel: "ترتيب:",
    sortFeatured: "المميز أولاً",
    sortRating: "الأعلى تقييماً",
    accBadge: "قسم الإكسسوارات الفاخرة",
    accTitle1: "أفخم إكسسوارات",
    accTitle2: "Apple الأصلية",
    accSubtitle: "شواحن MagSafe، جرابات تيتانيوم وجلد طبيعي، باغات حماية زجاجية 9H، وسماعات إيربودز بالضمان المعتمد. للتواصل والاستفسار عبر واتساب: 01101675132.",
    repairBadge: "قسم ومعمل الصيانة المعتمد",
    repairTitle1: "خدمات وأسعار الصيانة الفورية بأيدي",
    repairTitle2: "خبراء Apple",
    repairSubtitle: "أسعار صيانة واضحة ومعلنة بالجنيه المصري (ج.م) بقطع غيار أصلية فابريكا وضمان رسمي كتابي. للاستفسار والحجز المباشر تواصل عبر واتساب الصيانة: 01115373748.",
    calcBadge: "تسعير شفاف وفوري",
    calcTitle: "حاسبة تكلفة الصيانة الفورية",
    calcDesc: "اختر موديل جهازك ونوع الصيانة المطلوبة عشان تشوف السعر المقدر بالجنيه المصري ومدة الإصلاح والضمان فوراً.",
    calcExpressTag: "معظم الصيانات بتخلص في 30 دقيقة",
    calcStep1: "1. اختر موديل جهاز الآيفون:",
    calcStep2: "2. اختر نوع الصيانة المطلوبة:",
    calcTimeLabel: "وقت التنفيذ المقدر:",
    calcWarrantyLabel: "فترة الضمان المعتمد:",
    calcBookBtn: "احجز موعد صيانة فوري",
    trackBadge: "نظام التتبع المباشر",
    trackTitle: "تابع حالة تصليح جهازك لحظة بلحظة",
    trackDesc: "لو سايب جهازك عندنا في المعمل، اكتب رقم إيصال الصيانة بتاعك (الكود) وهتقدر تتابع جهازك في أي مرحلة: (الفحص والتشخيص ➔ الفك والتركيب ➔ اختبار الجودة ➔ جاهز للاستلام).",
    btnTrack: "استعلم عن الجهاز",
    statusWorking: "جاري العمل عليه",
    stepReceived: "استلام الجهاز",
    stepDiagnosis: "الفحص الفني",
    stepRepair: "جاري الصيانة",
    stepQC: "اختبار الجودة",
    stepReady: "جاهز للاستلام",
    branchBadge: "مرحباً بكم في iPro Store",
    branchTitle: "تفضل بزيارتنا في مقر الفرع",
    branchDesc: "استمتع بتجربة تسوق راقية وشراء مباشر لأحدث أجهزة الآيفون والإكسسوارات مع استلام فوري، أو تفضل بالجلوس في صالة الاستراحة VIP بينما يقوم مهندسونا بفحص وصيانة جهازك أمامك في خلال 30 دقيقة.",
    branchSalesLabel: "مبيعات وحجز الأجهزة:",
    branchRepairLabel: "قسم ومعمل الصيانة:",
    branchAccLabel: "قسم الإكسسوارات الفاخرة:",
    branchHoursLabel: "مواعيد العمل اليومية:",
    branchHoursText: "يومياً من 11:00 صباحاً حتى 11:30 مساءً (الجمعة من 1:30 ظهراً)",
    btnBranchSales: "مبيعات الأجهزة",
    btnBranchRepair: "قسم الصيانة",
    btnBranchAcc: "الإكسسوارات",
    footerDesc: "أرقى متجر لأجهزة الآيفون الأصلية والإكسسوارات في مصر وأحدث معمل صيانة فوري بقطع أصلية فابريكا وضمان رسمي معتمد.",
    footerCol1: "أجهزة الآيفون",
    footerCol2: "الصيانة والإكسسوارات",
    footerCol3: "أرقام التواصل الرسمية",
    footerUsedLink: "أجهزة كسر زيرو فابريكا",
    footerHours: "يومياً من 11:00 صباحاً حتى 11:30 مساءً",
    cartTitle: "قائمة الأجهزة المختارة",
    cartTotalItems: "إجمالي الأجهزة:",
    btnInquireWhatsApp: "إرسال القائمة لواتساب المبيعات (+201017891759)",
    inquirePriceBtn: "اطلب السعر",
    inStockStatus: "متوفر فوري بالفرع",
    detailsBtn: "مواصفات الجهاز",
    bookModalBadge: "حجز موعد VIP فوري",
    bookModalTitle: "احجز صيانة جهازك في المعمل",
    bookModalDesc: "احجز دورك المسبق لتسريع الصيانة في خلال 30 دقيقة. واتساب الصيانة: 01115373748.",
    fieldName: "الاسم بالكامل *",
    fieldPhone: "رقم الموبايل (واتساب) *",
    fieldModel: "موديل الآيفون *",
    fieldService: "الخدمة المطلوبة *",
    fieldDate: "تاريخ الموعد المناسب *",
    fieldTime: "وقت الحضور *",
    fieldNotes: "ملاحظات أو وصف العطل",
    chkExpress: "أرغب في الاستفادة من المسار السريع الفوري (30 دقيقة) مجاناً",
    btnConfirmBooking: "تأكيد الحجز وإرسال التفاصيل لواتساب الصيانة",
    successBadge: "تم التأكيد بنجاح",
    ticketIdLabel: "كود إيصال الصيانة أو الحجز:",
    btnCloseSuccess: "حسناً، متابعة التصفح",
    accWhatsAppBtn: "طلب عبر واتساب"
  },
  en: {
    announcementBadge: "Authorized Branch • iPro Store",
    announcementText: "Special Offer: Get a <span class='gold-highlight'>Free 9H Screen Guard + 1-Year Warranty</span> with any device today!",
    logoSub: "STORE & LAB",
    navHome: "Home",
    navStore: "iPhones",
    navAccessories: "Accessories",
    navRepair: "Repairs & Prices",
    navEstimator: "Cost Estimator",
    navTrack: "Track Device",
    navBranch: "Our Branch",
    btnAdmin: "Dashboard",
    btnBookRepair: "Book Repair",
    popularSearch: "Trending:",
    heroChip: "#1 Apple Flagship Store & Certified Lab in Egypt",
    heroTitle1: "The Pinnacle of",
    heroTitle2: "iPhone Luxury",
    heroTitle3: "& Elite Express Care.",
    heroDesc: "Welcome to iPro Store. Explore official iPhones up to next-gen 17 & 18 Series, premium accessories, and express 30-min lab repairs with 100% genuine Apple components and transparent EGP pricing.",
    heroBtnWhatsAppDevice: "Device Sales: 01017891759",
    heroBtnWhatsAppRepair: "Device Repairs: 01115373748",
    heroBtnWhatsAppAcc: "Accessories: 01101675132",
    metric1: "100% Genuine OEM Parts",
    metric2: "30-Min Fast Screen Fix",
    metric3: "1-Year Warranty & Swap",
    minUnit: "min",
    storeLiveOpen: "Branch is Open Now",
    quickEstimatorBtn: "Calculate Repair Cost",
    storeBadge: "Sales Department",
    storeTitle1: "Exclusive Collection of",
    storeTitle2: "Original iPhones",
    storeSubtitle: "Latest iPhone 18, 17, 16 & 15 models in stock, plus Grade A+ Pre-Owned units with official warranty. (Inquire via WhatsApp: 01017891759).",
    tabAll: "All Models",
    tabAllAcc: "All Accessories",
    tabUsed: "Grade A+ Pre-Owned",
    sortLabel: "Sort:",
    sortFeatured: "Featured First",
    sortRating: "Top Rated",
    accBadge: "Luxury Accessories",
    accTitle1: "Premium Original",
    accTitle2: "Apple Accessories",
    accSubtitle: "MagSafe chargers, titanium cases, 9H glass guards, and AirPods Pro. For inquiries via WhatsApp: 01101675132.",
    repairBadge: "Certified Lab Department",
    repairTitle1: "Express Mobile Repairs by",
    repairTitle2: "Apple Specialists",
    repairSubtitle: "Transparent pricing in EGP with authentic factory components and written warranty. Direct maintenance WhatsApp: 01115373748.",
    calcBadge: "Instant & Transparent",
    calcTitle: "Instant Repair Cost Calculator",
    calcDesc: "Select your device model and required service to view estimated turnaround, warranty, and pricing in EGP.",
    calcExpressTag: "Most repairs finished in 30 minutes",
    calcStep1: "1. Select iPhone Model:",
    calcStep2: "2. Select Service Required:",
    calcTimeLabel: "Estimated Turnaround:",
    calcWarrantyLabel: "Certified Warranty:",
    calcBookBtn: "Book This Repair Now",
    trackBadge: "Live Lab Tracking",
    trackTitle: "Track Your iPhone Repair Status",
    trackDesc: "Enter your 6-digit Ticket ID to follow its journey through Diagnosis, Bench Assembly, Quality Testing, and Pickup.",
    btnTrack: "Track Device",
    statusWorking: "In Progress",
    stepReceived: "Received",
    stepDiagnosis: "Diagnosis",
    stepRepair: "Bench Repair",
    stepQC: "Quality QC",
    stepReady: "Ready for Pickup",
    branchBadge: "Welcome to iPro Store",
    branchTitle: "Visit Our Flagship Store",
    branchDesc: "Enjoy a luxury shopping experience for official Apple devices and accessories with instant pickup, or relax in our VIP lounge while our certified technicians service your iPhone within 30 minutes.",
    branchSalesLabel: "Device Sales Hotline:",
    branchRepairLabel: "Repair & Lab Department:",
    branchAccLabel: "Luxury Accessories:",
    branchHoursLabel: "Opening Hours:",
    branchHoursText: "Daily 11:00 AM – 11:30 PM (Friday from 1:30 PM)",
    btnBranchSales: "Sales WhatsApp",
    btnBranchRepair: "Repair Lab",
    btnBranchAcc: "Accessories",
    footerDesc: "Egypt's premier flagship store for authentic iPhones, luxury accessories, and certified mobile repair lab.",
    footerCol1: "iPhone Models",
    footerCol2: "Repairs & Accessories",
    footerCol3: "Official Contacts",
    footerUsedLink: "Grade A+ Pre-Owned",
    footerHours: "Daily: 11:00 AM – 11:30 PM",
    cartTitle: "Selected Devices List",
    cartTotalItems: "Total Selected Devices:",
    btnInquireWhatsApp: "Send List to Sales WhatsApp (+201017891759)",
    inquirePriceBtn: "Inquire Price",
    inStockStatus: "In Stock at Store",
    detailsBtn: "Device Specs",
    bookModalBadge: "VIP Appointment",
    bookModalTitle: "Book Lab Repair Service",
    bookModalDesc: "Reserve your express slot in under 30 minutes. Direct repair WhatsApp: 01115373748.",
    fieldName: "Full Name *",
    fieldPhone: "Phone (WhatsApp) *",
    fieldModel: "iPhone Model *",
    fieldService: "Service Required *",
    fieldDate: "Preferred Date *",
    fieldTime: "Preferred Time *",
    fieldNotes: "Notes or Symptoms",
    chkExpress: "Request 30-Minute Priority Lane (Free)",
    btnConfirmBooking: "Confirm Booking to Repair WhatsApp",
    successBadge: "Confirmed Successfully",
    ticketIdLabel: "Ticket ID / Receipt Code:",
    btnCloseSuccess: "Continue Browsing",
    accWhatsAppBtn: "Order on WhatsApp"
  }
};

// ================= DEFAULT DATA CATALOGS =================
const DEFAULT_PHONES_CATALOG = [
  {
    id: "iphone-18-pro-max",
    name: "iPhone 18 Pro Max",
    category: "iphone-18",
    badgeAr: "مستقبل آبل فلاجشيب 2026/2027",
    badgeEn: "Next-Gen 2026/2027 Flagship",
    conditionAr: "جديد كرتونة متبرشم (إصدار حصري)",
    conditionEn: "Brand New Factory Sealed",
    rating: 5.0,
    reviewsCount: 148,
    chip: "A19 Pro Bionic (2nm Ultra)",
    displayAr: "شاشة 6.9 بوصة Micro-OLED بدقة 120Hz وتعتيم مضاد للانعكاس",
    displayEn: "6.9-inch Micro-OLED 120Hz Anti-Reflective",
    cameraAr: "كاميرا رباعية 48MP فيوجن + 10x تقريب بصري + تصوير سينمائي 8K",
    cameraEn: "Quad 48MP Fusion Camera + 10x Optical Zoom + 8K Video",
    batteryAr: "بطارية سيليكون كربون تدوم حتى 36 ساعة تشغيل متواصل",
    batteryEn: "Silicon-Carbon Battery up to 36 Hours",
    storageOptions: ["256GB", "512GB", "1TB", "2TB"],
    colors: [
      { nameAr: "تيتانيوم ذهبي شمسي", nameEn: "Solar Gold Titanium", hex: "linear-gradient(135deg, #f7d672 0%, #aa7c11 100%)", class: "gold-edition" },
      { nameAr: "تيتانيوم أوبسيديان أسود", nameEn: "Obsidian Black Titanium", hex: "linear-gradient(135deg, #2b2b30 0%, #0c0c0e 100%)", class: "black-edition" },
      { nameAr: "تيتانيوم طبيعي ناصع", nameEn: "Pure Natural Titanium", hex: "linear-gradient(135deg, #cfcac0 0%, #858075 100%)", class: "natural-edition" }
    ],
    highlightsAr: [
      "معالج A19 Pro بتقنية 2nm الأسرع عالمياً مع تبريد بغرفة بخار ذهبية",
      "زر كاميرا لمسي فائق الحساسية مع تقريب بريزم ميكانيكي",
      "ذكاء اصطناعي Apple Intelligence الجيل الثالث المدمج في النظام",
      "ضمان iPro الماسي المعتمد لمدة 18 شهر مع خدمة VIP"
    ],
    highlightsEn: [
      "A19 Pro 2nm CPU with gold vapor-chamber thermal design",
      "Capacitive camera shutter with optical mechanical zoom",
      "Built-in 3rd Gen Apple Intelligence on-device architecture",
      "18-Month iPro Diamond Warranty & VIP Support"
    ]
  },
  {
    id: "iphone-18-pro",
    name: "iPhone 18 Pro",
    category: "iphone-18",
    badgeAr: "فئة البرو الأحدث",
    badgeEn: "Latest Pro Edition",
    conditionAr: "جديد كرتونة متبرشم",
    conditionEn: "Brand New Factory Sealed",
    rating: 4.9,
    reviewsCount: 112,
    chip: "A19 Pro Bionic (2nm)",
    displayAr: "شاشة 6.3 بوصة Super Retina XDR ProMotion 120Hz",
    displayEn: "6.3-inch Super Retina XDR ProMotion 120Hz",
    cameraAr: "كاميرا 48MP ثلاثية مع مستشعر سوني المكدس الجديد",
    cameraEn: "Triple 48MP Camera with Next-Gen Sony Stacked Sensor",
    batteryAr: "حتى 30 ساعة تشغيل فيديو متواصل",
    batteryEn: "Up to 30 Hours Continuous Video Playback",
    storageOptions: ["256GB", "512GB", "1TB"],
    colors: [
      { nameAr: "تيتانيوم ذهبي ملكي", nameEn: "Royal Gold Titanium", hex: "linear-gradient(135deg, #d8b248 0%, #7d5914 100%)", class: "gold-edition" },
      { nameAr: "تيتانيوم طبيعي مطور", nameEn: "Refined Natural Titanium", hex: "linear-gradient(135deg, #c2bdae 0%, #706b60 100%)", class: "natural-edition" }
    ],
    highlightsAr: [
      "شاسيه تيتانيوم مصقول فائق الخفة والصلابة",
      "شاشة متطورة مضادة لبصمات الأصابع والخدوش",
      "شحن سريع بقدرة 45W عبر منفذ USB-C 4",
      "ضمان معتمد كامل واستبدال فوري"
    ],
    highlightsEn: [
      "Lightweight aerospace grade titanium chassis",
      "Enhanced anti-reflective and scratch-resistant screen",
      "45W Ultra-Fast Charging via USB-C 4.0",
      "Full Official Replacement Warranty"
    ]
  },
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    category: "iphone-17",
    badgeAr: "إصدار 2025/2026 المميز",
    badgeEn: "Flagship 2025/2026 Edition",
    conditionAr: "جديد كرتونة متبرشم أصلي",
    conditionEn: "Brand New Sealed OEM",
    rating: 5.0,
    reviewsCount: 295,
    chip: "A19 Bionic Pro (3nm+)",
    displayAr: "شاشة 6.9 بوصة بدون حواف بنظام Dynamic Island المصغر",
    displayEn: "6.9-inch Borderless OLED with Slim Dynamic Island",
    cameraAr: "نظام ثلاثي 48MP بالكامل (رئيسية + واسعة + تيليفوتو)",
    cameraEn: "Full 48MP Triple System (Wide, Ultrawide, Telephoto)",
    batteryAr: "حتى 33 ساعة تشغيل فيديو",
    batteryEn: "Up to 33 Hours Video Playback",
    storageOptions: ["256GB", "512GB", "1TB"],
    colors: [
      { nameAr: "تيتانيوم صحراوي ذهبي", nameEn: "Desert Gold Titanium", hex: "linear-gradient(135deg, #d8b248 0%, #684f18 50%, #f7d672 100%)", class: "gold-edition" },
      { nameAr: "تيتانيوم أسود فاحم", nameEn: "Jet Black Titanium", hex: "linear-gradient(135deg, #38383e 0%, #18181b 50%, #4a4a52 100%)", class: "black-edition" },
      { nameAr: "تيتانيوم طبيعي", nameEn: "Natural Titanium", hex: "linear-gradient(135deg, #b8b3a8 0%, #7d786e 50%, #cfcac0 100%)", class: "natural-edition" }
    ],
    highlightsAr: [
      "كاميرا أمامية 24MP فائقة الوضوح مع مستشعر TrueDepth أصغر",
      "شاشة مطلية بطبقة مضادة للانعكاس والخدوش أكثر بـ 3 أضعاف",
      "تحسينات ضخمة في سرعة وتوافق الذكاء الاصطناعي",
      "ضمان سنة معتمد من iPro Store مع هدايا استلام مجانية"
    ],
    highlightsEn: [
      "24MP Ultra-Clear Selfie with miniaturized TrueDepth",
      "3x Scratch-Resistant Anti-Reflective Glass",
      "Massive speedups in local AI processing",
      "1-Year iPro Certified Warranty with free premium gifts"
    ]
  },
  {
    id: "iphone-17-air",
    name: "iPhone 17 Air (Slim)",
    category: "iphone-17",
    badgeAr: "أنحف آيفون في التاريخ",
    badgeEn: "Thinnest iPhone Ever",
    conditionAr: "جديد كرتونة متبرشم",
    conditionEn: "Brand New Sealed",
    rating: 4.8,
    reviewsCount: 160,
    chip: "A19 Bionic Chip",
    displayAr: "شاشة 6.6 بوصة Super Retina XDR 120Hz ProMotion",
    displayEn: "6.6-inch Super Retina XDR 120Hz ProMotion",
    cameraAr: "كاميرا فيوجن 48MP أحادية متقدمة في المنتصف",
    cameraEn: "48MP Fusion Center Camera with 2x lossless zoom",
    batteryAr: "حتى 24 ساعة تشغيل فيديو",
    batteryEn: "Up to 24 Hours Video Playback",
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: [
      { nameAr: "شامبين ذهبي فخم", nameEn: "Champagne Luxury Gold", hex: "linear-gradient(135deg, #f0dfb0 0%, #9e7f3a 100%)", class: "gold-edition" }
    ],
    highlightsAr: [
      "سماكة نحيفة استثنائية 5.5 ملم فقط في اليد",
      "هيكل من الألومنيوم والتيتانيوم الخفيف والمقاوم للانحناء",
      "أداء فائق مع استهلاك طاقة منخفض بفضل معالج A19",
      "شاحن سريع ومسار استبدال فوري"
    ],
    highlightsEn: [
      "Ultra-thin 5.5mm chassis with ultra-premium feel",
      "Reinforced titanium-aluminum rigid architecture",
      "Top-tier performance with low thermal envelope",
      "Fast charging & instant swap warranty"
    ]
  },
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    category: "iphone-16",
    badgeAr: "الأكثر طلباً ومبيعاً",
    badgeEn: "Best Seller Flagship",
    conditionAr: "جديد كرتونة متبرشم فابريكا",
    conditionEn: "Brand New Factory Sealed",
    rating: 5.0,
    reviewsCount: 342,
    chip: "A18 Pro Bionic (3nm)",
    displayAr: "شاشة 6.9 بوصة Super Retina XDR OLED (120Hz ProMotion)",
    displayEn: "6.9-inch Super Retina XDR OLED 120Hz",
    cameraAr: "كاميرا 48MP فيوجن + 48MP زاوية عريضة + 5x زووم بصري",
    cameraEn: "48MP Fusion + 48MP Ultrawide + 5x Optical Telephoto",
    batteryAr: "بطارية تدوم حتى 33 ساعة تشغيل متواصل",
    batteryEn: "Battery life up to 33 hours continuous use",
    storageOptions: ["256GB", "512GB", "1TB"],
    colors: [
      { nameAr: "تيتانيوم صحراوي ذهبي", nameEn: "Desert Titanium", hex: "linear-gradient(135deg, #d8b248 0%, #684f18 50%, #f7d672 100%)", class: "gold-edition" }
    ],
    highlightsAr: [
      "شاسيه تيتانيوم درجة 5 متين جداً ولمسة ذهبية فاخرة",
      "زر الكاميرا الجديد Camera Control الميكانيكي الحساس",
      "ذكاء اصطناعي Apple Intelligence مدمج مع حماية خصوصية",
      "ضمان iPro الذهبي المعتمد لمدة سنة كاملة"
    ],
    highlightsEn: [
      "Grade 5 aerospace titanium in luxury golden hue",
      "Mechanical Camera Control sapphire button",
      "Built-in private Apple Intelligence suite",
      "1-Year Full Certified iPro Warranty"
    ]
  },
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    category: "iphone-15",
    badgeAr: "قيمة عالية مقابل أداء",
    badgeEn: "Peak Value & Performance",
    conditionAr: "جديد أو كسر زيرو فابريكا فرز أول",
    conditionEn: "Brand New or Certified Grade A+",
    rating: 4.9,
    reviewsCount: 420,
    chip: "A17 Pro (3nm)",
    displayAr: "شاشة 6.7 بوصة ProMotion 120Hz",
    displayEn: "6.7-inch ProMotion 120Hz OLED",
    cameraAr: "كاميرا 48MP مع عدسة تيليفوتو 5x بيريسكوب",
    cameraEn: "48MP Camera with 5x Periscope Telephoto",
    batteryAr: "حتى 29 ساعة تشغيل فيديو",
    batteryEn: "Up to 29 Hours Playback",
    storageOptions: ["256GB", "512GB"],
    colors: [
      { nameAr: "تيتانيوم طبيعي", nameEn: "Natural Titanium", hex: "linear-gradient(135deg, #b8b3a8 0%, #7d786e 100%)", class: "natural-edition" }
    ],
    highlightsAr: [
      "منفذ USB-C سريع جداً مع سرعات USB 3",
      "زر الأكشن القابل للتخصيص Action Button",
      "فحص بطارية 100% بدون أي خدش فابريكا",
      "ضمان 6 شهور استبدال فوري"
    ],
    highlightsEn: [
      "USB-C port with high speed USB 3 transfer",
      "Fully customizable physical Action Button",
      "100% battery health, zero cosmetic scratches",
      "6-Month Instant Replacement Guarantee"
    ]
  }
];

const DEFAULT_ACCESSORIES_CATALOG = [
  {
    id: "acc-1",
    category: "magsafe",
    nameAr: "شاحن MagSafe اللاسلكي الأصلي 25W",
    nameEn: "Original Apple 25W MagSafe Fast Charger",
    descAr: "شاحن مغناطيسي لاسلكي سريع بقوة 25W يدعم محاذاة فائقة الدقة لكل فئات iPhone 12 حتى 18 Pro Max.",
    descEn: "Official magnetic high-speed wireless charger supporting iPhone 12 up to 18 Pro Max.",
    price: 2850,
    badgeAr: "MagSafe أصلي معتمد",
    badgeEn: "MagSafe OEM",
    conditionAr: "شحن سريع فائق 25W",
    conditionEn: "25W Qi2 Certified",
    specPill: "Qi2 & MagSafe 25W",
    rating: 5.0,
    reviewsCount: 195,
    visualType: "magsafe-charger",
    compat: "iPhone 12 to 18 Pro Max",
    highlightsAr: [
      "شحن مغناطيسي فائق السرعة بقدرة 25W بدون تسخين الجهاز",
      "متوافق مع جميع هواتف iPhone 12 حتى 18 Pro Max وعلب AirPods",
      "ضمان 12 شهر استبدال فوري معتمد من iPro Store"
    ],
    highlightsEn: [
      "High-speed 25W wireless charging with zero overheating",
      "Universal fit for iPhone 12-18 series & MagSafe AirPods",
      "12-Month Official Instant Swap Warranty"
    ],
    colors: [
      { nameAr: "أبيض فابريكا", nameEn: "OEM White", hex: "#f5f5f7" },
      { nameAr: "رمادي تيتانيوم", nameEn: "Titanium Gray", hex: "#48484a" }
    ]
  },
  {
    id: "acc-2",
    category: "cases",
    nameAr: "جراب تيتانيوم فاخر مع مسند مغناطيسي MagSafe",
    nameEn: "Luxury Titanium Armor Case with MagSafe Kickstand",
    descAr: "حماية عسكرية ضد أقوى الصدمات والسقوط مع إطار تيتانيوم حقيقي ومسند معدني مخفي متعدد الزوايا.",
    descEn: "Military-grade drop protection with genuine titanium frame and integrated kickstand.",
    price: 1450,
    badgeAr: "تيتانيوم فاخر VIP",
    badgeEn: "Titanium Armor",
    conditionAr: "حماية عسكرية 3M",
    conditionEn: "Military Grade Drop",
    specPill: "Military Grade 3M",
    rating: 4.9,
    reviewsCount: 310,
    visualType: "luxury-case",
    compat: "iPhone 15, 16, 17, 18 Series",
    highlightsAr: [
      "إطار تيتانيوم حقيقي مضاد للصدمات والسقوط القوي حتى 3 أمتار",
      "حلقة مغناطيسية مدمجة قوية متوافقة مع شواحن وحوامل MagSafe",
      "بروز حماية كامل لعدسات الكاميرا والشاشة ضد أي احتكاك"
    ],
    highlightsEn: [
      "Genuine titanium outer bumper with 3-meter drop test rating",
      "Ultra-strong MagSafe magnetic alignment ring built-in",
      "Raised bezel defense protecting camera lens & OLED glass"
    ],
    colors: [
      { nameAr: "تيتانيوم صحراوي ذهبي", nameEn: "Desert Gold", hex: "#c3a572", class: "case-gold" },
      { nameAr: "تيتانيوم أسود مطفي", nameEn: "Space Black", hex: "#2c2c2e", class: "case-black" },
      { nameAr: "تيتانيوم طبيعي", nameEn: "Natural Titanium", hex: "#8e8e93", class: "case-silver" },
      { nameAr: "أزرق كحلي داكن", nameEn: "Deep Navy", hex: "#1c2b42", class: "case-blue" }
    ]
  },
  {
    id: "acc-3",
    category: "audio",
    nameAr: "سماعة Apple AirPods Pro 2 الأصلية Type-C",
    nameEn: "Apple AirPods Pro 2 (USB-C) OEM Factory",
    descAr: "شريحة Apple H2 لعزل ضوضاء مضاعف وصوت مكاني مخصص مع علبة MagSafe مقاومة للغبار ورذاذ الماء.",
    descEn: "Apple H2 Silicon delivering 2x Active Noise Cancellation and personalized spatial audio.",
    price: 9800,
    badgeAr: "عزل ضوضاء ANC",
    badgeEn: "Pro ANC Active",
    conditionAr: "أصلية فابريكا Type-C",
    conditionEn: "OEM Factory Type-C",
    specPill: "Apple H2 Silicon",
    rating: 5.0,
    reviewsCount: 420,
    visualType: "airpods-pro",
    compat: "All Apple Devices",
    highlightsAr: [
      "عزل ضوضاء نشط مضاعف وصوت مكاني محيطي ثلاثي الأبعاد",
      "علبة شحن MagSafe مع مكبر صوت وسلسلة لتحديد الموقع Find My",
      "عمر بطارية يصل إلى 30 ساعة متواصلة مع علبة الشحن"
    ],
    highlightsEn: [
      "2x Active Noise Cancellation with personalized spatial audio",
      "MagSafe charging case equipped with Find My speaker",
      "Up to 30 hours of continuous high-fidelity listening"
    ],
    colors: [
      { nameAr: "أبيض ناصع Apple", nameEn: "Gloss White", hex: "#ffffff" }
    ]
  },
  {
    id: "acc-4",
    category: "glass",
    nameAr: "باغة حماية زجاجية كورية 9H مضادة للكسر والبصمات",
    nameEn: "Korean 9H Ultra-Tough Tempered Glass Guard",
    descAr: "زجاج ياباني مقوى معالج بحواف ناعمة منحنية بتقنية النانو لحماية شاشة OLED من الصدمات والخدش.",
    descEn: "Oleophobic coated 9H sapphire tempered glass with curved edges and zero bubbles.",
    price: 650,
    badgeAr: "ياقوت كوري 9H",
    badgeEn: "Sapphire 9H Guard",
    conditionAr: "مضادة للصدمات والبصمات",
    conditionEn: "Anti-Scratch Coating",
    specPill: "9H Sapphire Coating",
    rating: 4.9,
    reviewsCount: 520,
    visualType: "glass-guard",
    compat: "All iPhone Models",
    highlightsAr: [
      "صلابة 9H تمنع الخدوش العميقة والكسور من المفاتيح والأسطح الحادة",
      "طبقة نانو أوليوفوبيك تمنع التصاق بصمات الأصابع والزيوت والماء",
      "تركيب احترافي مجاني بغرفة معقمة خالية من الأتربة في المعمل"
    ],
    highlightsEn: [
      "True 9H surface hardness resisting keys and sharp blades",
      "Nano-oleophobic layer repelling oils, smudges and fingerprints",
      "Free clean-room dustless installation at our certified lab"
    ],
    storageOptions: ["iPhone 18/17 Pro Max", "iPhone 16 Pro Max", "iPhone 15 Series", "iPhone 14/13/12 Series"]
  },
  {
    id: "acc-5",
    category: "cables",
    nameAr: "رأس شاحن Apple 30W سريع أصلي Type-C",
    nameEn: "Original Apple 30W USB-C Fast Power Adapter",
    descAr: "محول طاقة فابريكا أصلي فائق السرعة لشحن 50% من بطارية الآيفون في 25 دقيقة فقط بأمان تام.",
    descEn: "Genuine power adapter charging 50% battery in 25 minutes with surge protection.",
    price: 1950,
    badgeAr: "شحن سريع فابريكا",
    badgeEn: "30W Fast PD",
    conditionAr: "أصلي 100% بالكرتونة",
    conditionEn: "100% Genuine Boxed",
    specPill: "Power Delivery 30W",
    rating: 5.0,
    reviewsCount: 280,
    visualType: "power-adapter",
    compat: "Universal iPhone / iPad",
    highlightsAr: [
      "شحن فائق السرعة يدعم تقنية Power Delivery 3.0 الذكية",
      "حماية متقدمة ضد ارتفاع درجات الحرارة وتغير التيار الكهربائي",
      "يحافظ على صحة البطارية بنسبة 100% بدون أي هبوط مفاجئ"
    ],
    highlightsEn: [
      "Supports latest Power Delivery 3.0 intelligent fast charging",
      "Comprehensive surge, overvoltage and thermal defense",
      "Guarantees long-term battery health with zero sudden drops"
    ],
    colors: [
      { nameAr: "أبيض فابريكا", nameEn: "OEM White", hex: "#ffffff" }
    ]
  },
  {
    id: "acc-6",
    category: "cables",
    nameAr: "كابل شحن Apple مضفر أصلي Type-C to Type-C (2m)",
    nameEn: "Original Apple 2m Braided Type-C Fast Cable (240W)",
    descAr: "كابل قماشي مضفر عالي المتانة ومقاوم للقطع بطول 2 متر يدعم قدرة شحن حتى 240W ونقل بيانات فائق.",
    descEn: "Woven braided high-durability cable supporting 240W fast charging & high data sync.",
    price: 1150,
    badgeAr: "مضفر فائق التحمل",
    badgeEn: "Braided 240W",
    conditionAr: "طول 2 متر أصلي",
    conditionEn: "2-Meter OEM Cable",
    specPill: "240W Fast Sync",
    rating: 4.9,
    reviewsCount: 215,
    visualType: "braided-cable",
    compat: "iPhone 15, 16, 17, 18 Series",
    highlightsAr: [
      "نسيج قماشي مضفر قوي ومقاوم للثني والقطع لسنوات طويلة",
      "يدعم قدرة شحن قصوى تصل إلى 240W ونقل بيانات عالي السرعة",
      "رؤوس تيتانيوم متينة ضد الأكسدة والاهتراء"
    ],
    highlightsEn: [
      "Tough woven cloth braid engineered against fraying & bends",
      "Massive 240W power throughput with high-speed data transfer",
      "Titanium reinforced end connectors resisting corrosion"
    ],
    storageOptions: ["طول 1 متر", "طول 2 متر"]
  },
  {
    id: "acc-7",
    category: "magsafe",
    nameAr: "باور بانك MagSafe المغناطيسي الأصلي اللاسلكي",
    nameEn: "Original Apple MagSafe Magnetic Battery Pack",
    descAr: "بطارية مغناطيسية مدمجة تثبت على ظهر الآيفون تلقائياً بدون كابلات وتظهر مستوى الشحن في ويدجت iOS.",
    descEn: "Compact snap-on wireless magnetic battery pack with native iOS battery widget integration.",
    price: 3450,
    badgeAr: "باور بانك مغناطيسي",
    badgeEn: "MagSafe Bank",
    conditionAr: "لصق مباشر MagSafe",
    conditionEn: "Direct Snap-On",
    specPill: "Wireless Quick Bank",
    rating: 4.9,
    reviewsCount: 165,
    visualType: "magsafe-battery",
    compat: "iPhone 12 to 18 Pro Max",
    highlightsAr: [
      "يلتصق بقوة بمغناطيس الهاتف تلقائياً بدون أي أسلاك معقدة",
      "مؤشر ذكي لمستوى الشحن يظهر مباشرة في ويدجت الآيفون",
      "حجم نحيف وخفيف جداً مريح أثناء مسك الموبايل في اليد"
    ],
    highlightsEn: [
      "Snaps firmly onto back chassis without cumbersome cables",
      "Displays real-time charging status on native iOS battery widget",
      "Ultra-slim and lightweight profile ideal for daily handling"
    ],
    colors: [
      { nameAr: "أبيض فابريكا", nameEn: "OEM White", hex: "#f5f5f7" },
      { nameAr: "ذهبي تيتانيوم", nameEn: "Titanium Gold", hex: "#c3a572" }
    ]
  },
  {
    id: "acc-8",
    category: "cases",
    nameAr: "جراب جلد طبيعي Nappa الفاخر مع MagSafe",
    nameEn: "Luxury Genuine Nappa Leather Case with MagSafe",
    descAr: "مصنوع من جلد طبيعي إيطالي معالج بأزرار ألومنيوم ميكانيكية وبطانة ميكروفايبر ناعمة لحماية ظهر الهاتف.",
    descEn: "Italian genuine leather case with machined aluminum buttons and soft microfiber lining.",
    price: 1250,
    badgeAr: "جلد طبيعي Nappa",
    badgeEn: "Italian Leather",
    conditionAr: "ملمس فخم وأزرار معدنية",
    conditionEn: "Machined Buttons",
    specPill: "Genuine Nappa Finish",
    rating: 5.0,
    reviewsCount: 190,
    visualType: "luxury-case",
    compat: "iPhone 15, 16, 17, 18 Series",
    highlightsAr: [
      "جلد طبيعي نابا معالج فاخر يدوم طويلاً ويكتسب لمعاناً كلاسيكياً",
      "أزرار ألومنيوم ميكانيكية دقيقة مريحة للغاية في الاستخدام",
      "بطانة ميكروفايبر ناعمة من الداخل تحمي الظهر من أي خدوش"
    ],
    highlightsEn: [
      "Premium tanned genuine leather developing a unique natural patina",
      "Tactile machined aluminum buttons with satisfying click feel",
      "Velvety interior microfiber lining protecting glass back"
    ],
    colors: [
      { nameAr: "بني هافان ملكي", nameEn: "Royal Tan", hex: "#7a3f1d", class: "case-brown" },
      { nameAr: "أسود فاخر", nameEn: "Midnight Black", hex: "#1c1c1e", class: "case-black" },
      { nameAr: "كحلي داكن", nameEn: "Deep Navy", hex: "#132338", class: "case-navy" }
    ]
  }
];

const DEFAULT_SERVICES_CATALOG = [
  {
    id: "srv-screen",
    titleAr: "تغيير شاشات Super Retina OLED أصلية فابريكا",
    titleEn: "Factory Original Super Retina OLED Screen Replacement",
    descAr: "استبدال شاشة أصلية 100% مع نقل بيانات TrueTone وحساسات FaceID وضمان عدم ظهور رسالة الشاشة غير الأصلية.",
    descEn: "100% OEM screen replacement with TrueTone & FaceID reprogramming without any warning banner.",
    price: 3800,
    timeAr: "30 - 40 دقيقة",
    timeEn: "30 - 40 Minutes",
    icon: "fa-display",
    featuresAr: [
      "شاشات أصلية مفكوكة من أجهزة فابريكا",
      "نقل TrueTone وحساس الإضاءة التلقائي",
      "ضمان كتابي معتمد 6 شهور ضد عيوب اللمس"
    ],
    featuresEn: [
      "100% Factory pull genuine OEM display",
      "Full TrueTone and ambient sensor calibration",
      "6-Month written warranty on touch & display"
    ]
  },
  {
    id: "srv-battery",
    titleAr: "تغيير بطاريات فابريكا مع صحة 100% وإزالة التحذير",
    titleEn: "OEM Battery Replacement with 100% Health & No Warning",
    descAr: "تركيب بطارية بخلايا أصلية جديدة مع لحام الفلاتة الأصلية بجهاز Spot Welder لقراءة صحة البطارية 100% في الإعدادات.",
    descEn: "New OEM cell spot-welded with original BMS board showing 100% health in iOS settings.",
    price: 2100,
    timeAr: "25 - 35 دقيقة",
    timeEn: "25 - 35 Minutes",
    icon: "fa-battery-full",
    featuresAr: [
      "صحة البطارية تظهر 100% في إعدادات الآيفون",
      "استخدام عوازل ولصقات مائية أصلية مضادة للسوائل",
      "ضمان معتمد سنة كاملة ضد الانتفاخ أو الهبوط"
    ],
    featuresEn: [
      "Reads 100% Maximum Capacity in Battery Health",
      "Original waterproof adhesive gasket replaced",
      "1-Year Full Warranty against degradation"
    ]
  },
  {
    id: "srv-backglass",
    titleAr: "تغيير زجاج الظهر بليزر الفايبر البارد",
    titleEn: "Cold Fiber Laser Back Glass Replacement",
    descAr: "إزالة زجاج الظهر المكسور بدقة الليزر بدون فتح الجهاز أو المساس بالبوردة أو ملف الشحن اللاسلكي MagSafe.",
    descEn: "Precise laser separation without opening the chassis or affecting the MagSafe coil.",
    price: 1650,
    timeAr: "45 دقيقة",
    timeEn: "45 Minutes",
    icon: "fa-wand-magic-sparkles",
    featuresAr: [
      "بدون فك مكونات الجهاز الداخلية نهائياً",
      "زجاج أصلي متوافق مع لوجو أبل وألوان الفابريكا",
      "إعادة عزل الجهاز ضد الأتربة والسوائل"
    ],
    featuresEn: [
      "Zero disassembly of sensitive internal logic",
      "Original matching color with Apple logo",
      "Fresh water and dust resistance sealing"
    ]
  },
  {
    id: "srv-board",
    titleAr: "صيانة الماذر بورد ومايكروسولدرينج (IC & Power)",
    titleEn: "Logic Board Micro-Soldering (Power & Baseband IC)",
    descAr: "إصلاح أعطال الباور، الشحن، قفلات الشورت، الشبكة، وإصلاح أجهزة الساقطة في الماء تحت الميكروسكوب.",
    descEn: "Fixing power drain, short circuits, no network, and water damage under high-magnification microscopes.",
    price: 3200,
    timeAr: "نفس اليوم / ساعتين",
    timeEn: "Same Day / 2 Hours",
    icon: "fa-microchip",
    featuresAr: [
      "مهندسون معتمدون بخبرة 12 سنة في أجهزة Apple",
      "أحدث محطات لحام JBC وأجهزة فحص Thermal Cam",
      "الحفاظ الكامل على بيانات وصور العميل دون مسح"
    ],
    featuresEn: [
      "Certified Apple logic board engineers (12+ yrs)",
      "State-of-the-art JBC and infrared thermal diagnostics",
      "Strict data protection with zero wiping"
    ]
  }
];

// Price estimator map for calculator (in EGP)
const REPAIR_ESTIMATES_EGP = {
  "iPhone 18 Pro Max": { screen: 8900, battery: 3400, backglass: 2600, camera: 4500, water: 2900, board: 4900, diag: 0 },
  "iPhone 18 Pro": { screen: 7900, battery: 3200, backglass: 2400, camera: 4200, water: 2800, board: 4500, diag: 0 },
  "iPhone 17 Pro Max": { screen: 7200, battery: 2900, backglass: 2200, camera: 3800, water: 2500, board: 4200, diag: 0 },
  "iPhone 17 Pro": { screen: 6500, battery: 2700, backglass: 2000, camera: 3500, water: 2400, board: 3900, diag: 0 },
  "iPhone 16 Pro Max": { screen: 5800, battery: 2400, backglass: 1850, camera: 3200, water: 2100, board: 3500, diag: 0 },
  "iPhone 16 Pro": { screen: 5200, battery: 2200, backglass: 1750, camera: 2900, water: 1900, board: 3200, diag: 0 },
  "iPhone 16": { screen: 4200, battery: 1950, backglass: 1550, camera: 2400, water: 1700, board: 2800, diag: 0 },
  "iPhone 15 Pro Max": { screen: 4800, battery: 2100, backglass: 1650, camera: 2800, water: 1800, board: 3000, diag: 0 },
  "iPhone 15": { screen: 3600, battery: 1850, backglass: 1450, camera: 2100, water: 1500, board: 2500, diag: 0 },
  "iPhone 14 Series": { screen: 3100, battery: 1650, backglass: 1350, camera: 1800, water: 1400, board: 2200, diag: 0 },
  "iPhone 13 / 12 / 11": { screen: 2400, battery: 1400, backglass: 1100, camera: 1400, water: 1200, board: 1900, diag: 0 },
  "default": { screen: 3500, battery: 1850, backglass: 1500, camera: 2200, water: 1600, board: 2600, diag: 0 }
};

// ================= GLOBAL STATE =================
let currentLang = "ar";
let phonesCatalog = [];
let accessoriesCatalog = [];
let servicesCatalog = [];
let selectedInquiryDevices = [];
let activeCategoryFilter = "all";
let activeSortOption = "featured";

// ================= 1. BULLETPROOF LANGUAGE TOGGLE SYSTEM =================
// Exposed on window so inline onclick handlers in HTML work 100% unconditionally
window.toggleSiteLang = function(lang) {
  if (lang !== "ar" && lang !== "en") lang = "ar";
  localStorage.setItem("ipro_lang", lang);
  applySiteLanguage(lang, true);
};

function applySiteLanguage(lang, showToastAlert = false) {
  currentLang = lang;
  const isAr = lang === "ar";

  document.documentElement.lang = isAr ? "ar" : "en";
  document.documentElement.dir = isAr ? "rtl" : "ltr";
  document.body.className = isAr ? "lang-ar" : "lang-en";

  // Update active state on ALL language buttons in the DOM (both header & mobile menu)
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  // Translate all [data-i18n] nodes in the document
  const dict = I18N[lang] || I18N.ar;
  document.querySelectorAll("[data-i18n]").forEach(node => {
    const key = node.dataset.i18n;
    if (dict[key]) {
      node.innerHTML = dict[key];
    }
  });

  renderProducts();
  renderAccessories();
  renderServices();
  renderInquiryDrawerUI();
  if (typeof initComparisonTool === "function") initComparisonTool();

  if (showToastAlert) {
    showToast(isAr ? "تم تفعيل اللغة العربية 🇪🇬" : "English Language Activated 🇬🇧", "fa-language");
  }
}

// ================= 2. INITIALIZATION ON DOM READY =================
document.addEventListener("DOMContentLoaded", () => {
  loadCatalogs();

  // Initialize saved or default language
  const savedLang = localStorage.getItem("ipro_lang") || "ar";
  applySiteLanguage(savedLang, false);

  initNavigation();
  initCategoryFilters();
  initComparisonTool();
  initRepairEstimator();
  initBranchMediaSwitcher();
  initCartDrawer();
  initModals();
  initLiveSearch();
  initScrollAnimations();
});

function loadCatalogs() {
  try {
    const p = localStorage.getItem("ipro_phones_catalog");
    phonesCatalog = p ? JSON.parse(p) : DEFAULT_PHONES_CATALOG;
    // Always purge removed devices such as iphone-14-pro-max-used from cache
    phonesCatalog = phonesCatalog.filter(item => item.id !== "iphone-14-pro-max-used");
    localStorage.setItem("ipro_phones_catalog", JSON.stringify(phonesCatalog));
  } catch (e) {
    phonesCatalog = DEFAULT_PHONES_CATALOG.filter(item => item.id !== "iphone-14-pro-max-used");
  }

  try {
    const a = localStorage.getItem("ipro_accessories_catalog");
    const parsed = a ? JSON.parse(a) : null;
    accessoriesCatalog = (parsed && parsed.length && parsed[0].visualType) ? parsed : DEFAULT_ACCESSORIES_CATALOG;
  } catch (e) {
    accessoriesCatalog = DEFAULT_ACCESSORIES_CATALOG;
  }

  try {
    const s = localStorage.getItem("ipro_services_catalog");
    servicesCatalog = s ? JSON.parse(s) : DEFAULT_SERVICES_CATALOG;
  } catch (e) {
    servicesCatalog = DEFAULT_SERVICES_CATALOG;
  }

  // Refresh dynamic numbers from store settings
  const activeWa = getActiveWhatsApp();
  WHATSAPP_DEVICES = activeWa.devices;
  WHATSAPP_MAINTENANCE = activeWa.maintenance;
  WHATSAPP_ACCESSORIES = activeWa.accessories;
}

// ================= 3. NAVIGATION & MOBILE DRAWER =================
function initNavigation() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");
  const closeAnnouncementBtn = document.getElementById("closeAnnouncementBtn");
  const topAnnouncement = document.getElementById("topAnnouncement");

  function closeMenu() {
    if (navMenu) navMenu.classList.remove("active");
    if (menuBtn) menuBtn.classList.remove("active");
    document.body.classList.remove("menu-locked");
  }

  function openMenu() {
    if (navMenu) navMenu.classList.add("active");
    if (menuBtn) menuBtn.classList.add("active");
    document.body.classList.add("menu-locked");
  }

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.contains("active");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navMenu.querySelectorAll(".nav-link, .mobile-menu-cta-btn").forEach(link => {
      link.addEventListener("click", () => closeMenu());
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (navMenu.classList.contains("active") && !navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("active")) {
        closeMenu();
      }
    });

    // Close on window resize if widening past mobile breakpoint
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1140 && navMenu.classList.contains("active")) {
        closeMenu();
      }
    });
  }

  if (closeAnnouncementBtn && topAnnouncement) {
    closeAnnouncementBtn.addEventListener("click", () => {
      topAnnouncement.style.display = "none";
    });
  }
}

// ================= 4. RENDER IPHONE PRODUCTS (NO PRICES) =================
function renderProducts() {
  const container = document.getElementById("productGrid");
  if (!container) return;

  const isAr = currentLang === "ar";
  const t = I18N[currentLang];

  let list = [...phonesCatalog];
  if (activeCategoryFilter !== "all") {
    list = list.filter(item => item.category === activeCategoryFilter);
  }

  if (activeSortOption === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  }

  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <i class="fa-solid fa-box-open" style="font-size: 2.5rem; color: var(--gold-light); margin-bottom: 1rem; display: block;"></i>
        <p style="font-size: 1.1rem; font-weight: 700; color: #fff;">${isAr ? "لا توجد أجهزة متوفرة حالياً في هذا القسم" : "No devices currently available in this category"}</p>
        <p style="font-size: 0.9rem; margin-top: 0.5rem;">${isAr ? "تواصل معنا مباشرة عبر واتساب لطلب أي إصدار أو حجز جهازك" : "Contact us on WhatsApp to preorder or request any model"}</p>
      </div>
    `;
    return;
  }

  list.forEach(phone => {
    const defaultColor = (phone.colors && phone.colors[0]) || { nameAr: "تيتانيوم صحراوي ذهبي", nameEn: "Desert Gold Titanium", hex: "#d4af37", class: "gold-edition" };
    const defaultStorage = (phone.storageOptions && phone.storageOptions[0]) || "256GB";

    const card = document.createElement("article");
    card.className = "product-card";
    card.id = `prod-${phone.id}`;

    const badgeText = isAr ? (phone.badgeAr || "مميز") : (phone.badgeEn || "Featured");
    const conditionText = isAr ? (phone.conditionAr || "أصلي معتمد") : (phone.conditionEn || "Certified OEM");
    const displayText = isAr ? (phone.displayAr || "شاشة Super Retina XDR") : (phone.displayEn || "Super Retina XDR OLED");
    const cameraText = isAr ? (phone.cameraAr || "كاميرا فيوجن 48MP") : (phone.cameraEn || "48MP Fusion Camera");
    const highlightText = isAr 
      ? ((phone.highlightsAr && phone.highlightsAr[0]) || "ضمان رسمي معتمد من iPro Store")
      : ((phone.highlightsEn && phone.highlightsEn[0]) || "Official iPro Certified Warranty");

    card.innerHTML = `
      <div class="product-badges-header">
        <span class="product-badge-flag"><i class="fa-solid fa-crown"></i> ${badgeText}</span>
        <span class="product-condition-tag">${conditionText}</span>
      </div>

      <div class="product-visual">
        <div class="rendered-iphone ${defaultColor.class || 'gold-edition'}" id="render-${phone.id}">
          <div class="inner-screen-glass">
            <div class="card-dynamic-pill"></div>
            <div class="card-screen-center">
              <i class="fa-solid fa-gem"></i>
            </div>
            <div class="card-bottom-bar"></div>
          </div>
        </div>
      </div>

      <div class="product-info">
        <div class="product-meta-row">
          <span class="product-chip-type"><i class="fa-solid fa-microchip"></i> ${phone.chip || 'Apple Silicon'}</span>
          <span class="product-rating"><i class="fa-solid fa-star"></i> ${phone.rating || 5.0} (${phone.reviewsCount || 100})</span>
        </div>

        <h3 class="product-title">${phone.name}</h3>

        <ul class="product-highlights">
          <li><i class="fa-solid fa-display"></i> ${displayText}</li>
          <li><i class="fa-solid fa-camera"></i> ${cameraText}</li>
          <li><i class="fa-solid fa-shield-check"></i> ${highlightText}</li>
        </ul>

        <div class="product-options-row">
          <div class="storage-pills" id="storage-${phone.id}">
            ${(phone.storageOptions || ['256GB']).map((st, idx) => `
              <button type="button" class="storage-pill ${idx === 0 ? 'active' : ''}" data-size="${st}">
                ${st}
              </button>
            `).join('')}
          </div>

          <div class="color-dots-compact" id="colors-${phone.id}">
            ${(phone.colors || [defaultColor]).map((c, idx) => `
              <button type="button" class="color-dot-sm ${idx === 0 ? 'active' : ''}" 
                data-color-name="${isAr ? (c.nameAr || c.name || 'ذهبي') : (c.nameEn || c.name || 'Gold')}" 
                data-class="${c.class || 'gold-edition'}" 
                style="background: ${c.hex || '#d4af37'};" 
                title="${isAr ? (c.nameAr || c.name) : (c.nameEn || c.name)}"></button>
            `).join('')}
          </div>
        </div>

        <!-- Inquire to WhatsApp: +201017891759 (No Prices) -->
        <div class="product-footer-row">
          <div class="product-availability-status">
            <span class="avail-dot"></span>
            <span>${t.inStockStatus}</span>
          </div>

          <div class="product-action-buttons">
            <button type="button" class="btn-icon-view" title="${t.detailsBtn}" onclick="openProductModal('${phone.id}')">
              <i class="fa-solid fa-eye"></i>
            </button>
            <button type="button" class="btn-inquire-whatsapp" onclick="directWhatsAppInquiry('${phone.id}')" title="واتساب المبيعات">
              <i class="fa-brands fa-whatsapp"></i>
              <span>${t.inquirePriceBtn}</span>
            </button>
            <button type="button" class="btn-add-list" onclick="addDeviceToInquiry('${phone.id}')" title="إضافة للقائمة">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
    setupCardInteractivity(phone);
  });
}

function setupCardInteractivity(phone) {
  const card = document.getElementById(`prod-${phone.id}`);
  if (!card) return;

  const storagePills = card.querySelectorAll(".storage-pill");
  storagePills.forEach(pill => {
    pill.addEventListener("click", () => {
      storagePills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
    });
  });

  const colorDots = card.querySelectorAll(".color-dot-sm");
  const mockup = document.getElementById(`render-${phone.id}`);
  colorDots.forEach(dot => {
    dot.addEventListener("click", () => {
      colorDots.forEach(d => d.classList.remove("active"));
      dot.classList.add("active");

      const cssClass = dot.dataset.class;
      if (mockup && cssClass) {
        mockup.className = `rendered-iphone ${cssClass}`;
      }
    });
  });
}

let activeAccCategoryFilter = "all";
let activeAccSortOption = "featured";

function initCategoryFilters() {
  // 1. Phone category tabs
  const phoneTabs = document.querySelectorAll("#categoryTabs .tab-btn");
  phoneTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      phoneTabs.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategoryFilter = btn.dataset.category || "all";
      renderProducts();
    });
  });

  const phoneSort = document.getElementById("storeSortSelect");
  if (phoneSort) {
    phoneSort.addEventListener("change", (e) => {
      activeSortOption = e.target.value;
      renderProducts();
    });
  }

  // 2. Accessories category tabs
  const accTabs = document.querySelectorAll("#accessoriesTabs .tab-btn");
  accTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      accTabs.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeAccCategoryFilter = btn.dataset.accCat || "all";
      renderAccessories();
    });
  });

  const accSort = document.getElementById("accSortSelect");
  if (accSort) {
    accSort.addEventListener("change", (e) => {
      activeAccSortOption = e.target.value;
      renderAccessories();
    });
  }
}

// ================= 5. RENDER ACCESSORIES (LIKE MOBILES, WITH VISUALS) =================
function renderAccessoryVisual(acc) {
  const type = acc.visualType || "magsafe-charger";
  const colors = acc.colors || [];
  const defaultClass = (colors[0] && colors[0].class) || "";

  switch (type) {
    case "magsafe-charger":
      return `
        <div class="mockup-magsafe-charger">
          <div class="magsafe-inner-ring">
            <div class="magsafe-center-emblem">
              <i class="fa-solid fa-bolt-lightning"></i>
            </div>
          </div>
          <div class="magsafe-cord"></div>
          <span class="magsafe-floating-label">MagSafe 25W</span>
        </div>
      `;
    case "luxury-case":
      return `
        <div class="mockup-case ${defaultClass}" id="case-mockup-${acc.id}">
          <div class="case-camera-bump">
            <div class="case-lens-dot"></div>
            <div class="case-lens-dot"></div>
            <div class="case-lens-dot"></div>
            <div class="case-lens-dot"></div>
          </div>
          <div class="case-magsafe-ring">
            <i class="fa-brands fa-apple gold-text" style="font-size:1.4rem;"></i>
          </div>
          <div class="case-magsafe-line"></div>
        </div>
      `;
    case "airpods-pro":
      return `
        <div class="mockup-airpods">
          <div class="airpods-pod-left"></div>
          <div class="airpods-pod-right"></div>
          <div class="airpods-lid-seam"></div>
          <div class="airpods-led-dot"></div>
          <span class="airpods-anc-badge"><i class="fa-solid fa-waveform-lines"></i> ANC Active</span>
        </div>
      `;
    case "glass-guard":
      return `
        <div class="mockup-glass">
          <div class="glass-speaker-cut"></div>
          <div class="glass-diamond-badge">
            <i class="fa-solid fa-gem"></i>
            <span>9H SAPPHIRE</span>
          </div>
          <div class="glass-glare-effect"></div>
        </div>
      `;
    case "power-adapter":
      return `
        <div class="mockup-adapter">
          <i class="fa-brands fa-apple" style="font-size:1.8rem; color:var(--gold-light);"></i>
          <div class="adapter-port"></div>
          <span class="adapter-wattage">30W Type-C</span>
        </div>
      `;
    case "braided-cable":
      return `
        <div class="mockup-cable">
          <div class="cable-connector"></div>
          <div class="cable-center-badge">
            <i class="fa-solid fa-bolt gold-text"></i>
          </div>
          <span class="cable-floating-label">240W 2M</span>
        </div>
      `;
    case "magsafe-battery":
      return `
        <div class="mockup-battery-pack">
          <i class="fa-brands fa-apple" style="font-size:1.6rem; color:var(--gold-light);"></i>
          <div class="battery-led-status">
            <span></span><span></span><span></span><span></span>
          </div>
          <span class="battery-pack-tag">MagSafe Power</span>
        </div>
      `;
    default:
      return `
        <div class="mockup-magsafe-charger">
          <div class="magsafe-inner-ring">
            <div class="magsafe-center-emblem"><i class="fa-solid fa-gem"></i></div>
          </div>
        </div>
      `;
  }
}

function renderAccessories() {
  const container = document.getElementById("accessoriesGrid");
  if (!container) return;

  const isAr = currentLang === "ar";
  const t = I18N[currentLang];

  let list = [...accessoriesCatalog];
  if (activeAccCategoryFilter !== "all") {
    list = list.filter(item => item.category === activeAccCategoryFilter);
  }

  if (activeAccSortOption === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  } else if (activeAccSortOption === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (activeAccSortOption === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  }

  container.innerHTML = "";

  list.forEach(acc => {
    const card = document.createElement("article");
    card.className = "product-card accessory-product-card";
    card.id = `acc-${acc.id}`;

    const title = isAr ? (acc.nameAr || acc.name) : (acc.nameEn || acc.name);
    const badgeText = isAr ? (acc.badgeAr || "أصلي معتمد") : (acc.badgeEn || "Certified OEM");
    const conditionText = isAr ? (acc.conditionAr || "فابريكا فرز أول") : (acc.conditionEn || "Factory Grade A");
    const specPill = acc.specPill || "Apple OEM Accessory";
    const highlights = isAr ? (acc.highlightsAr || []) : (acc.highlightsEn || []);

    const visualHtml = renderAccessoryVisual(acc);
    const hasColors = acc.colors && acc.colors.length > 0;
    const hasSizes = acc.storageOptions && acc.storageOptions.length > 0;

    card.innerHTML = `
      <div class="product-badges-header">
        <span class="product-badge-flag"><i class="fa-solid fa-crown"></i> ${badgeText}</span>
        <span class="product-condition-tag">${conditionText}</span>
      </div>

      <div class="product-visual accessory-visual-box">
        ${visualHtml}
      </div>

      <div class="product-info">
        <div class="product-meta-row">
          <span class="product-chip-type"><i class="fa-solid fa-microchip"></i> ${specPill}</span>
          <span class="product-rating"><i class="fa-solid fa-star"></i> ${acc.rating || 5.0} (${acc.reviewsCount || 100})</span>
        </div>

        <h3 class="product-title">${title}</h3>

        <ul class="product-highlights">
          ${highlights.map(h => `<li><i class="fa-solid fa-shield-check gold-text"></i> ${h}</li>`).join('')}
        </ul>

        <div class="product-options-row">
          ${hasSizes ? `
            <div class="storage-pills">
              ${acc.storageOptions.map((sz, idx) => `
                <button type="button" class="storage-pill ${idx === 0 ? 'active' : ''}">${sz}</button>
              `).join('')}
            </div>
          ` : ''}

          ${hasColors ? `
            <div class="color-dots-compact" id="acc-colors-${acc.id}">
              ${acc.colors.map((c, idx) => `
                <button type="button" class="color-dot-sm ${idx === 0 ? 'active' : ''}" 
                  data-class="${c.class || ''}" 
                  style="background: ${c.hex || '#d4af37'};" 
                  title="${isAr ? (c.nameAr || c.name || '') : (c.nameEn || c.name || '')}"></button>
              `).join('')}
            </div>
          ` : ''}

          <div class="accessory-compat-inline">
            <i class="fa-solid fa-circle-info gold-text"></i>
            <span>${acc.compat || 'Apple iPhone'}</span>
          </div>
        </div>

        <div class="product-footer-row">
          <div class="accessory-price-display">
            <span class="acc-price-label">${isAr ? 'السعر الرسمي:' : 'Official Price:'}</span>
            <span class="acc-price-value gold-gradient-text">${Number(acc.price).toLocaleString()} ج.م</span>
          </div>

          <div class="product-action-buttons">
            <button type="button" class="btn-inquire-whatsapp" onclick="directWhatsAppAccessoryInquiry('${title}', '${acc.price}')" title="اطلب عبر واتساب الإكسسوارات">
              <i class="fa-brands fa-whatsapp"></i>
              <span>${isAr ? 'اطلب الإكسسوار' : 'Order Now'}</span>
            </button>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
    setupAccessoryCardInteractivity(card, acc);
  });
}

function setupAccessoryCardInteractivity(card, acc) {
  // Option pills
  const pills = card.querySelectorAll(".storage-pill");
  pills.forEach(p => {
    p.addEventListener("click", () => {
      pills.forEach(item => item.classList.remove("active"));
      p.classList.add("active");
    });
  });

  // Color dots for cases
  const colorDots = card.querySelectorAll(".color-dot-sm");
  const caseMockup = card.querySelector(".mockup-case");
  if (colorDots.length && caseMockup) {
    colorDots.forEach(dot => {
      dot.addEventListener("click", () => {
        colorDots.forEach(d => d.classList.remove("active"));
        dot.classList.add("active");
        const cls = dot.dataset.class;
        if (cls) {
          caseMockup.className = `mockup-case ${cls}`;
        }
      });
    });
  }
}

// ================= 6. RENDER REPAIR SERVICES (WHATSAPP: +201115373748) =================
function renderServices() {
  const container = document.getElementById("servicesGrid");
  if (!container) return;

  const isAr = currentLang === "ar";

  container.innerHTML = "";

  servicesCatalog.forEach(srv => {
    const card = document.createElement("div");
    card.className = "service-card";

    const title = isAr ? (srv.titleAr || srv.title) : (srv.titleEn || srv.title);
    const desc = isAr ? (srv.descAr || srv.desc) : (srv.descEn || srv.desc);
    const time = isAr ? (srv.timeAr || srv.time || "30 دقيقة") : (srv.timeEn || srv.time || "30 Minutes");
    const featuresList = isAr ? (srv.featuresAr || srv.features || []) : (srv.featuresEn || srv.features || []);

    card.innerHTML = `
      <div class="service-card-top">
        <div class="service-icon-box">
          <i class="fa-solid ${srv.icon || 'fa-wrench'}"></i>
        </div>
        <div class="service-duration-badge">
          <i class="fa-regular fa-clock"></i>
          <span>${time}</span>
        </div>
      </div>

      <h3 class="service-title">${title}</h3>
      <p class="service-description">${desc}</p>

      <ul class="service-checklist">
        ${featuresList.map(f => `<li><i class="fa-solid fa-check gold-text"></i> ${f}</li>`).join('')}
      </ul>

      <div class="service-footer">
        <div class="service-price-block">
          <span class="service-price-label">${isAr ? 'السعر المعتمد يبدأ من:' : 'Price from:'}</span>
          <span class="service-starting-price">${Number(srv.price).toLocaleString()} ج.م</span>
        </div>
        <button type="button" class="btn btn-gold btn-sm" onclick="directWhatsAppRepairInquiry('${title}', '${srv.price}')">
          <i class="fa-brands fa-whatsapp"></i>
          <span>${isAr ? 'احجز الصيانة' : 'Book Repair'}</span>
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

// ================= 7. REPAIR ESTIMATOR TOOL =================
function initRepairEstimator() {
  const modelSelect = document.getElementById("calcModelSelect");
  const serviceSelect = document.getElementById("calcServiceSelect");
  const priceDisplay = document.getElementById("calcPriceDisplay");
  const timeDisplay = document.getElementById("calcTimeDisplay");
  const warrantyDisplay = document.getElementById("calcWarrantyDisplay");
  const bookBtn = document.getElementById("bookCalculatedServiceBtn");

  function calculate() {
    if (!modelSelect || !serviceSelect) return;
    const isAr = currentLang === "ar";
    const model = modelSelect.value;
    const srv = serviceSelect.value;

    const modelObj = REPAIR_ESTIMATES_EGP[model] || REPAIR_ESTIMATES_EGP["default"];
    const estPrice = modelObj[srv] || REPAIR_ESTIMATES_EGP["default"][srv] || 1850;

    let timeText = isAr ? "30 دقيقة (فوري)" : "30 mins (Express)";
    let warrantyText = isAr ? "ضمان 6 شهور معتمد" : "6 Months Warranty";

    if (srv === "water" || srv === "board") {
      timeText = isAr ? "ساعتين / نفس اليوم" : "2 Hours / Same Day";
      warrantyText = isAr ? "ضمان 3 شهور معتمد" : "3 Months Warranty";
    }

    if (priceDisplay) priceDisplay.textContent = estPrice === 0 ? (isAr ? "مجاناً فحص" : "Free Diagnostic") : `${estPrice.toLocaleString()} ج.م`;
    if (timeDisplay) timeDisplay.textContent = timeText;
    if (warrantyDisplay) warrantyDisplay.textContent = warrantyText;
  }

  if (modelSelect && serviceSelect) {
    modelSelect.addEventListener("change", calculate);
    serviceSelect.addEventListener("change", calculate);
    calculate();
  }

  if (bookBtn) {
    bookBtn.addEventListener("click", () => {
      const model = modelSelect ? modelSelect.value : "iPhone";
      const srv = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex].text : "الصيانة";
      const isAr = currentLang === "ar";
      const msg = isAr
        ? `مرحباً معمل iPro، استعلمت من الحاسبة عن صيانة: (${srv}) لجهاز (${model})، حابب أحجز موعد فوري.`
        : `Hello iPro Lab, I calculated repair: (${srv}) for (${model}), I would like to book an appointment.`;
      window.open(`https://wa.me/${WHATSAPP_MAINTENANCE}?text=${encodeURIComponent(msg)}`, "_blank");
    });
  }
}

// ================= 8. INTERACTIVE IPHONE COMPARISON TOOL =================
function initComparisonTool() {
  const sel1 = document.getElementById("selectCompareDev1");
  const sel2 = document.getElementById("selectCompareDev2");
  const grid = document.getElementById("compareResultsGrid");

  if (!sel1 || !sel2 || !grid) return;

  // Populate dropdowns with available phones if empty
  if (sel1.options.length === 0) {
    phonesCatalog.forEach((p) => {
      const opt1 = document.createElement("option");
      opt1.value = p.id;
      opt1.textContent = p.name;
      sel1.appendChild(opt1);

      const opt2 = document.createElement("option");
      opt2.value = p.id;
      opt2.textContent = p.name;
      sel2.appendChild(opt2);
    });

    if (phonesCatalog.length > 0) sel1.selectedIndex = 0;
    if (phonesCatalog.length > 1) sel2.selectedIndex = 1;
  }

  function renderComparison() {
    const p1 = phonesCatalog.find(p => p.id === sel1.value) || phonesCatalog[0];
    const p2 = phonesCatalog.find(p => p.id === sel2.value) || phonesCatalog[1] || phonesCatalog[0];

    if (!p1 || !p2) return;
    const isAr = currentLang === "ar";

    function buildCol(p) {
      return `
        <div class="compare-col">
          <div class="compare-header">
            <span class="badge-tag-sm">${p.category}</span>
            <h3>${p.name}</h3>
            <p style="color:var(--gold-light); font-weight:700; font-size:0.85rem; margin:0;">${p.badgeAr || 'Apple Flagship'}</p>
          </div>

          <div class="compare-specs-list">
            <div class="compare-spec-item">
              <div class="compare-spec-icon"><i class="fa-solid fa-microchip"></i></div>
              <div class="compare-spec-text">
                <strong>${isAr ? 'المعالج وسرعة الأداء' : 'Processor & Chip'}</strong>
                <span>${p.chip || 'Apple Silicon Bionic'}</span>
              </div>
            </div>

            <div class="compare-spec-item">
              <div class="compare-spec-icon"><i class="fa-solid fa-mobile-screen"></i></div>
              <div class="compare-spec-text">
                <strong>${isAr ? 'مواصفات الشاشة' : 'Display & Screen'}</strong>
                <span>${p.displayAr || 'Super Retina XDR ProMotion 120Hz'}</span>
              </div>
            </div>

            <div class="compare-spec-item">
              <div class="compare-spec-icon"><i class="fa-solid fa-camera"></i></div>
              <div class="compare-spec-text">
                <strong>${isAr ? 'منظومة الكاميرات والزووم' : 'Camera System'}</strong>
                <span>${p.cameraAr || '48MP Pro Fusion Camera'}</span>
              </div>
            </div>

            <div class="compare-spec-item">
              <div class="compare-spec-icon"><i class="fa-solid fa-battery-full"></i></div>
              <div class="compare-spec-text">
                <strong>${isAr ? 'البطارية وسرعة الشحن' : 'Battery Life'}</strong>
                <span>${p.batteryAr || 'تشغيل متواصل حتى 33 ساعة مع شحن سريع'}</span>
              </div>
            </div>

            <div class="compare-spec-item">
              <div class="compare-spec-icon"><i class="fa-solid fa-hard-drive"></i></div>
              <div class="compare-spec-text">
                <strong>${isAr ? 'خيارات السعات المتاحة' : 'Storage Options'}</strong>
                <span>${(p.storageOptions || ['256GB', '512GB']).join(' • ')}</span>
              </div>
            </div>

            <div class="compare-spec-item">
              <div class="compare-spec-icon"><i class="fa-solid fa-certificate"></i></div>
              <div class="compare-spec-text">
                <strong>${isAr ? 'الحالة والضمان المعتمد' : 'Condition & Warranty'}</strong>
                <span>${p.conditionAr || 'جديد كرتونة متبرشم أصلي'}</span>
              </div>
            </div>
          </div>

          <div class="compare-footer-cta">
            <button type="button" class="btn btn-gold btn-block" onclick="directWhatsAppInquiry('${p.id}')">
              <i class="fa-brands fa-whatsapp"></i>
              <span>${isAr ? `اطلب سعر ${p.name}` : `Inquire for ${p.name}`}</span>
            </button>
          </div>
        </div>
      `;
    }

    grid.innerHTML = buildCol(p1) + buildCol(p2);
  }

  sel1.onchange = renderComparison;
  sel2.onchange = renderComparison;
  renderComparison();
}

// ================= 9. BRANCH MEDIA & GOOGLE MAPS SWITCHER =================
function initBranchMediaSwitcher() {
  const btnPhoto = document.getElementById("btnBranchPhotoTab");
  const btnMap = document.getElementById("btnBranchMapTab");
  const panePhoto = document.getElementById("branchPhotoPane");
  const paneMap = document.getElementById("branchMapPane");

  if (!btnPhoto || !btnMap || !panePhoto || !paneMap) return;

  btnPhoto.addEventListener("click", () => {
    btnPhoto.classList.add("active");
    btnMap.classList.remove("active");
    panePhoto.classList.add("active");
    paneMap.classList.remove("active");
  });

  btnMap.addEventListener("click", () => {
    btnMap.classList.add("active");
    btnPhoto.classList.remove("active");
    paneMap.classList.add("active");
    panePhoto.classList.remove("active");
  });
}

window.directWhatsAppInquiry = function(phoneId) {
  const phone = phonesCatalog.find(p => p.id === phoneId);
  if (!phone) return;

  const card = document.getElementById(`prod-${phoneId}`);
  const activeStorage = card ? card.querySelector(".storage-pill.active")?.dataset.size || "256GB" : "256GB";
  const activeColor = card ? card.querySelector(".color-dot-sm.active")?.dataset.colorName || "تيتانيوم" : "تيتانيوم";

  const isAr = currentLang === "ar";
  const msg = isAr
    ? `مساء الخير، بستفسر عن سعر وتوافر جهاز: ${phone.name} (مساحة: ${activeStorage}) (لون: ${activeColor}) في فرع iPro Store.`
    : `Hello, I'm inquiring about the price and availability of: ${phone.name} (${activeStorage}, ${activeColor}) at iPro Store.`;

  recordStoreInquiry("أجهزة الآيفون", `استفسار: ${phone.name} (${activeStorage} - ${activeColor})`, WHATSAPP_DEVICES);
  window.open(`https://wa.me/${WHATSAPP_DEVICES}?text=${encodeURIComponent(msg)}`, "_blank");
};

window.directWhatsAppAccessoryInquiry = function(title, price) {
  const isAr = currentLang === "ar";
  const msg = isAr
    ? `أهلاً، حابب أطلب من قسم الإكسسوارات: (${title}) بالسعر المعلن: (${Number(price).toLocaleString()} ج.م). هل متاح حالياً بالفرع؟`
    : `Hello, I would like to order accessory: (${title}) at (${Number(price).toLocaleString()} EGP). Is it in stock?`;
  recordStoreInquiry("الإكسسوارات الفاخرة", `طلب: ${title} (${Number(price).toLocaleString()} ج.م)`, WHATSAPP_ACCESSORIES);
  window.open(`https://wa.me/${WHATSAPP_ACCESSORIES}?text=${encodeURIComponent(msg)}`, "_blank");
};

window.directWhatsAppRepairInquiry = function(title, price) {
  const isAr = currentLang === "ar";
  const msg = isAr
    ? `مساء الخير يا بشمهندس، بستفسر عن خدمة الصيانة: (${title}) بالسعر المعلن: (${Number(price).toLocaleString()} ج.م). حابب أحجز موعد فوري بالمعمل.`
    : `Hello iPro Lab engineer, inquiring about repair service: (${title}) at (${Number(price).toLocaleString()} EGP). Would like to book an appointment.`;
  recordStoreInquiry("معمل الصيانة", `صيانة: ${title} (${Number(price).toLocaleString()} ج.م)`, WHATSAPP_MAINTENANCE);
  window.open(`https://wa.me/${WHATSAPP_MAINTENANCE}?text=${encodeURIComponent(msg)}`, "_blank");
};

window.addDeviceToInquiry = function(phoneId) {
  const phone = phonesCatalog.find(p => p.id === phoneId);
  if (!phone) return;

  const card = document.getElementById(`prod-${phoneId}`);
  const storage = card ? card.querySelector(".storage-pill.active")?.dataset.size || "256GB" : "256GB";
  const color = card ? card.querySelector(".color-dot-sm.active")?.dataset.colorName || "ذهبي" : "ذهبي";

  selectedInquiryDevices.push({
    id: phone.id + "_" + Date.now(),
    name: phone.name,
    storage,
    color
  });

  renderInquiryDrawerUI();
  showToast(currentLang === "ar" ? `تمت إضافة ${phone.name} لقائمتك!` : `Added ${phone.name} to inquiry list!`, "fa-bag-shopping");
};

function renderInquiryDrawerUI() {
  const container = document.getElementById("cartItemsContainer");
  const countBadge = document.getElementById("cartCount");
  const drawerCount = document.getElementById("cartDrawerCount");
  const totalCount = document.getElementById("cartTotalItemsCount");

  const count = selectedInquiryDevices.length;
  if (countBadge) countBadge.textContent = count;
  if (drawerCount) drawerCount.textContent = count;
  if (totalCount) totalCount.textContent = `${count} ${currentLang === "ar" ? "أجهزة" : "Devices"}`;

  if (!container) return;

  if (count === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
        <i class="fa-solid fa-bag-shopping" style="font-size:2.5rem; opacity:0.3; margin-bottom:1rem; display:block;"></i>
        <p>${currentLang === "ar" ? "قائمتك فارغة، أضف الأجهزة التي ترغب في طلب أسعارها معاً." : "Your list is empty. Add devices to inquire about together."}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = "";
  selectedInquiryDevices.forEach((item, index) => {
    const el = document.createElement("div");
    el.className = "cart-item-card";
    el.innerHTML = `
      <div class="cart-item-info">
        <strong>${item.name}</strong>
        <span>${item.storage} • ${item.color}</span>
      </div>
      <button type="button" class="btn-remove-cart" onclick="removeInquiryItem(${index})" title="حذف">&times;</button>
    `;
    container.appendChild(el);
  });
}

window.removeInquiryItem = function(index) {
  selectedInquiryDevices.splice(index, 1);
  renderInquiryDrawerUI();
};

function initCartDrawer() {
  const trigger = document.getElementById("cartTriggerBtn");
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartBackdrop");
  const closeBtn = document.getElementById("closeCartBtn");
  const whatsappCheckoutBtn = document.getElementById("whatsappCheckoutBtn");

  const openDrawer = () => {
    if (drawer) drawer.classList.add("active");
    if (backdrop) backdrop.classList.add("active");
  };

  const closeDrawer = () => {
    if (drawer) drawer.classList.remove("active");
    if (backdrop) backdrop.classList.remove("active");
  };

  if (trigger) trigger.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);

  if (whatsappCheckoutBtn) {
    whatsappCheckoutBtn.addEventListener("click", () => {
      if (selectedInquiryDevices.length === 0) {
        showToast(currentLang === "ar" ? "يرجى إضافة جهاز واحد على الأقل" : "Please add at least one device", "fa-triangle-exclamation");
        return;
      }

      const isAr = currentLang === "ar";
      let text = isAr
        ? `مساء الخير مبيعات iPro Store، حابب استفسر عن أسعار وتوافر الأجهزة التالية:\n`
        : `Hello iPro Sales, inquiring about price & availability of the following devices:\n`;

      selectedInquiryDevices.forEach((d, i) => {
        text += `\n${i + 1}. ${d.name} (${d.storage} - ${d.color})`;
      });

      text += isAr ? `\n\nبرجاء موافاتي بالأسعار والضمان المتاح. شكراً!` : `\n\nPlease reply with pricing & warranty. Thank you!`;

      window.open(`https://wa.me/${WHATSAPP_DEVICES}?text=${encodeURIComponent(text)}`, "_blank");
      closeDrawer();
    });
  }
}

// ================= 10. MODALS =================
function initModals() {
  const successModal = document.getElementById("checkoutSuccessModal");
  const closeSuccessBtn = document.getElementById("closeSuccessModalBtn");

  const productModal = document.getElementById("productQuickModal");
  const closeProductBtn = document.getElementById("closeProductModalBtn");

  const openModal = (m) => m && m.classList.add("active");
  const closeModal = (m) => m && m.classList.remove("active");

  if (closeSuccessBtn && successModal) closeSuccessBtn.addEventListener("click", () => closeModal(successModal));
  if (closeProductBtn && productModal) closeProductBtn.addEventListener("click", () => closeModal(productModal));

  // Close when clicking on backdrop
  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal(backdrop);
    });
  });
}

window.openProductModal = function(phoneId) {
  const phone = phonesCatalog.find(p => p.id === phoneId);
  if (!phone) return;

  const modal = document.getElementById("productQuickModal");
  const isAr = currentLang === "ar";

  document.getElementById("modalProdTitle").textContent = phone.name;
  document.getElementById("modalProdBadge").textContent = isAr ? (phone.badgeAr || "مميز") : (phone.badgeEn || "Featured");
  document.getElementById("modalChip").textContent = phone.chip || "Apple Silicon";
  document.getElementById("modalDisplay").textContent = isAr ? (phone.displayAr || "شاشة OLED") : (phone.displayEn || "OLED Display");
  document.getElementById("modalCamera").textContent = isAr ? (phone.cameraAr || "كاميرا متطورة") : (phone.cameraEn || "Advanced Camera");
  document.getElementById("modalBattery").textContent = isAr ? (phone.batteryAr || "بطارية ممتازة") : (phone.batteryEn || "All-Day Battery");

  const highlightsList = document.getElementById("modalHighlightsList");
  if (highlightsList) {
    const h = isAr ? (phone.highlightsAr || []) : (phone.highlightsEn || []);
    highlightsList.innerHTML = h.map(item => `<li><i class="fa-solid fa-circle-check gold-text"></i> ${item}</li>`).join("");
  }

  const inquireBtn = document.getElementById("modalDirectInquireBtn");
  if (inquireBtn) {
    inquireBtn.onclick = () => {
      directWhatsAppInquiry(phone.id);
      modal.classList.remove("active");
    };
  }

  if (modal) modal.classList.add("active");
};

// ================= 11. LIVE SEARCH =================
function initLiveSearch() {
  const searchBtn = document.getElementById("searchToggleBtn");
  const overlay = document.getElementById("searchOverlay");
  const input = document.getElementById("liveSearchInput");
  const clearBtn = document.getElementById("clearSearchBtn");
  const resultsBox = document.getElementById("searchResultsBox");

  if (!searchBtn || !overlay || !input) return;

  searchBtn.addEventListener("click", () => {
    overlay.classList.toggle("active");
    if (overlay.classList.contains("active")) {
      input.focus();
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      input.value = "";
      if (resultsBox) resultsBox.classList.remove("has-results");
      overlay.classList.remove("active");
    });
  }

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      if (resultsBox) resultsBox.classList.remove("has-results");
      return;
    }

    const matchedPhones = phonesCatalog.filter(p => p.name.toLowerCase().includes(query));
    const matchedAccs = accessoriesCatalog.filter(a => (a.nameAr || a.name || "").toLowerCase().includes(query) || (a.nameEn || "").toLowerCase().includes(query));
    const matchedServices = servicesCatalog.filter(s => (s.titleAr || s.title || "").toLowerCase().includes(query) || (s.titleEn || "").toLowerCase().includes(query));

    let html = `<div style="display:flex; flex-direction:column; gap:0.65rem;">`;

    matchedPhones.forEach(p => {
      html += `
        <div style="background:rgba(255,255,255,0.05); padding:0.75rem 1rem; border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="color:#fff;">${p.name}</strong>
            <small style="display:block; color:var(--gold-light);">${currentLang === "ar" ? "أجهزة آيفون" : "iPhone"}</small>
          </div>
          <button type="button" class="btn btn-gold btn-sm" onclick="directWhatsAppInquiry('${p.id}')">
            <i class="fa-brands fa-whatsapp"></i> ${currentLang === "ar" ? "طلب السعر" : "Inquire"}
          </button>
        </div>
      `;
    });

    matchedAccs.forEach(a => {
      const name = currentLang === "ar" ? (a.nameAr || a.name) : (a.nameEn || a.name);
      html += `
        <div style="background:rgba(255,255,255,0.05); padding:0.75rem 1rem; border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="color:#fff;">${name}</strong>
            <small style="display:block; color:var(--gold-light);">${Number(a.price).toLocaleString()} ج.م</small>
          </div>
          <button type="button" class="btn btn-gold btn-sm" onclick="directWhatsAppAccessoryInquiry('${name}', '${a.price}')">
            <i class="fa-brands fa-whatsapp"></i> ${currentLang === "ar" ? "طلب الإكسسوار" : "Order"}
          </button>
        </div>
      `;
    });

    matchedServices.forEach(s => {
      const title = currentLang === "ar" ? (s.titleAr || s.title) : (s.titleEn || s.title);
      html += `
        <div style="background:rgba(255,255,255,0.05); padding:0.75rem 1rem; border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="color:#fff;">${title}</strong>
            <small style="display:block; color:var(--gold-light);">${Number(s.price).toLocaleString()} ج.م</small>
          </div>
          <button type="button" class="btn btn-gold btn-sm" onclick="directWhatsAppRepairInquiry('${title}', '${s.price}')">
            <i class="fa-brands fa-whatsapp"></i> ${currentLang === "ar" ? "حجز الصيانة" : "Book"}
          </button>
        </div>
      `;
    });

    if (matchedPhones.length === 0 && matchedAccs.length === 0 && matchedServices.length === 0) {
      html += `<div style="text-align:center; padding:1.5rem; color:var(--text-muted);">${currentLang === "ar" ? "لا توجد نتائج مطابقة لبحثك." : "No matching results found."}</div>`;
    }

    html += `</div>`;

    if (resultsBox) {
      resultsBox.innerHTML = html;
      resultsBox.classList.add("has-results");
    }
  });

  document.querySelectorAll(".quick-tag").forEach(tag => {
    tag.addEventListener("click", () => {
      input.value = tag.dataset.tag;
      input.dispatchEvent(new Event("input"));
    });
  });
}

// ================= 12. TOAST NOTIFICATION UTILITY =================
function showToast(message, iconClass = "fa-check") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid ${iconClass} gold-text"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}



// ================= 13. SCROLL REVEAL ANIMATIONS =================
function initScrollAnimations() {

  // 2. IntersectionObserver Scroll Reveal for Sections & Cards
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -60px 0px",
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply to all primary content cards & sections
  const targets = document.querySelectorAll(`
    .store-section,
    .compare-section,
    .compare-card,
    .accessories-section,
    .repair-section,
    .reviews-section,
    .reviews-summary-banner,
    .review-card,
    .branch-section,
    .estimator-container,
    .product-grid,
    .accessories-grid,
    .services-grid,
    .branch-card
  `);

  targets.forEach(el => {
    el.classList.add("scroll-reveal");
    revealObserver.observe(el);
  });
}
