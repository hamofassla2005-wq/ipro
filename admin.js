/**
 * iPro Store & Mobile Services Lab - Master Admin Dashboard Controller
 * Full CRUD, Real-Time LocalStorage Sync, PIN Lock Security, Interactive Analytics
 */

// ================= 1. DEFAULT DATASETS =================
const DEFAULT_PHONES_CATALOG = [
  {
    id: "iphone-18-pro-max",
    name: "iPhone 18 Pro Max",
    category: "iphone-18",
    badgeAr: "مستقبل آبل فلاجشيب 2026/2027",
    conditionAr: "جديد كرتونة متبرشم (إصدار حصري)",
    inStock: true,
    chip: "A19 Pro Bionic (2nm Ultra)",
    displayAr: "شاشة 6.9 بوصة Micro-OLED بدقة 120Hz",
    cameraAr: "كاميرا رباعية 48MP فيوجن + 10x تقريب بصري",
    storageOptions: ["256GB", "512GB", "1TB", "2TB"],
    colors: [
      { nameAr: "تيتانيوم ذهبي شمسي", hex: "linear-gradient(135deg, #f7d672 0%, #aa7c11 100%)" },
      { nameAr: "تيتانيوم أوبسيديان أسود", hex: "linear-gradient(135deg, #2b2b30 0%, #0c0c0e 100%)" }
    ]
  },
  {
    id: "iphone-18-pro",
    name: "iPhone 18 Pro",
    category: "iphone-18",
    badgeAr: "فئة البرو الأحدث",
    conditionAr: "جديد كرتونة متبرشم",
    inStock: true,
    chip: "A19 Pro Bionic (2nm)",
    displayAr: "شاشة 6.3 بوصة Super Retina XDR ProMotion 120Hz",
    cameraAr: "كاميرا 48MP ثلاثية مع مستشعر سوني المكدس",
    storageOptions: ["256GB", "512GB", "1TB"],
    colors: [
      { nameAr: "تيتانيوم ذهبي ملكي", hex: "linear-gradient(135deg, #d8b248 0%, #7d5914 100%)" },
      { nameAr: "تيتانيوم طبيعي مطور", hex: "linear-gradient(135deg, #c2bdae 0%, #706b60 100%)" }
    ]
  },
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    category: "iphone-17",
    badgeAr: "إصدار 2025/2026 المميز",
    conditionAr: "جديد كرتونة متبرشم أصلي",
    inStock: true,
    chip: "A19 Bionic Pro (3nm+)",
    displayAr: "شاشة 6.9 بوصة بدون حواف بنظام Dynamic Island المصغر",
    cameraAr: "نظام ثلاثي 48MP بالكامل (رئيسية + واسعة + تيليفوتو)",
    storageOptions: ["256GB", "512GB", "1TB"],
    colors: [
      { nameAr: "تيتانيوم صحراوي ذهبي", hex: "linear-gradient(135deg, #d8b248 0%, #684f18 50%, #f7d672 100%)" }
    ]
  },
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    category: "iphone-16",
    badgeAr: "الأكثر طلباً ومبيعاً",
    conditionAr: "جديد كرتونة متبرشم فابريكا",
    inStock: true,
    chip: "A18 Pro Bionic (3nm)",
    displayAr: "شاشة 6.9 بوصة Super Retina XDR OLED (120Hz)",
    cameraAr: "كاميرا 48MP فيوجن + 48MP زاوية عريضة + 5x زووم",
    storageOptions: ["256GB", "512GB", "1TB"],
    colors: [
      { nameAr: "تيتانيوم صحراوي ذهبي", hex: "linear-gradient(135deg, #d8b248 0%, #684f18 50%, #f7d672 100%)" }
    ]
  },
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    category: "iphone-15",
    badgeAr: "قيمة استثنائية مقابل السعر",
    conditionAr: "جديد كرتونة وبطارية 100%",
    inStock: true,
    chip: "A17 Pro Bionic (3nm)",
    displayAr: "شاشة 6.7 بوصة ProMotion 120Hz مع Dynamic Island",
    cameraAr: "كاميرا رئيسية 48MP مع تقريب بصري 5x",
    storageOptions: ["256GB", "512GB"],
    colors: [
      { nameAr: "تيتانيوم طبيعي", hex: "linear-gradient(135deg, #c2bdae 0%, #706b60 100%)" }
    ]
  },
  {
    id: "iphone-14-pro-max-used",
    name: "iPhone 14 Pro Max (كسر زيرو فابريكا)",
    category: "certified",
    badgeAr: "كسر زيرو فرز أول فابريكا",
    conditionAr: "استعمال خفيف - بطارية 95%+ فابريكا",
    inStock: true,
    chip: "A16 Bionic (4nm)",
    displayAr: "شاشة 6.7 بوصة Super Retina XDR OLED 120Hz",
    cameraAr: "كاميرا 48MP بدقة فائقة وتصوير سينمائي 4K",
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: [
      { nameAr: "ذهبي فخم", hex: "linear-gradient(135deg, #fae7a5 0%, #a68434 100%)" }
    ]
  }
];

const DEFAULT_ACCESSORIES_CATALOG = [
  {
    id: "acc-1",
    category: "chargers",
    nameAr: "شاحن لاسلكي مغناطيسي سريع MagSafe 25W أصلي",
    price: 1350,
    compat: "iPhone 12 حتى iPhone 18",
    warranty: "ضمان سنة معتمد واستبدال",
    badgeAr: "ماج سيف 25W سريع",
    descAr: "شاحن مغناطيسي أصلي يدعم الشحن السريع اللاسلكي بقدرة 25 واط مع كابل مجدول فائق المتانة."
  },
  {
    id: "acc-2",
    category: "cases",
    nameAr: "جراب تيتانيوم فاخر مع مسند مغناطيسي MagSafe",
    price: 1450,
    compat: "iPhone 15, 16, 17, 18 Series",
    warranty: "ضمان ضد التآكل والاصفرار",
    badgeAr: "تيتانيوم فاخر VIP",
    descAr: "حماية عسكرية ضد أقوى الصدمات والسقوط مع إطار تيتانيوم حقيقي ومسند معدني مخفي متعدد الزوايا."
  },
  {
    id: "acc-3",
    category: "audio",
    nameAr: "سماعة Apple AirPods Pro 2 الأصلية Type-C",
    price: 9800,
    compat: "جميع أجهزة Apple",
    warranty: "ضمان سنة دولي ومحلي",
    badgeAr: "عزل ضوضاء ANC",
    descAr: "شريحة Apple H2 لعزل ضوضاء نشط مضاعف وصوت مكاني مخصص مع علبة MagSafe متطورة."
  },
  {
    id: "acc-4",
    category: "glass",
    nameAr: "باغة حماية زجاجية كورية 9H مضادة للكسر والبصمات",
    price: 650,
    compat: "متاح لجميع موديلات الآيفون",
    warranty: "تركيب مجاني في المعمل",
    badgeAr: "ياقوت كوري 9H",
    descAr: "زجاج ياباني مقوى معالج بحواف ناعمة بتقنية النانو لحماية شاشة OLED من الصدمات والخدش."
  },
  {
    id: "acc-5",
    category: "chargers",
    nameAr: "رأس شاحن سريع Apple 30W USB-C أصلي فابريكا",
    price: 1450,
    compat: "شحن سريع لجميع الآيفون",
    warranty: "ضمان سنة معتمد iPro",
    badgeAr: "شحن فائق 30W",
    descAr: "شاحن سريع أصلي يملأ 50% من البطارية في 20 دقيقة فقط مع تحكم أوتوماتيكي بدرجة الحرارة."
  }
];

const DEFAULT_SERVICES_CATALOG = [
  {
    id: "screen-replacement",
    title: "تغيير شاشات Super Retina OLED أصلية",
    price: 3850,
    time: "30 - 45 دقيقة فوري",
    warranty: "ضمان سنة كاملة معتمد",
    desc: "شاشات OLED أصلية فابريكا مع نقل وبرمجة التروتون (TrueTone) وبصمة الوجه FaceID بدون أي رسايل."
  },
  {
    id: "battery-replacement",
    title: "تغيير بطاريات أصلية (صحة 100% بدون رسايل)",
    price: 1450,
    time: "20 - 30 دقيقة فوري",
    warranty: "ضمان سنة معتمد واستبدال",
    desc: "بطاريات كوبالت أصلية 100% مع نقل شريحة BMS لتظهر نسبة 100% في إعدادات الآيفون مباشرة."
  },
  {
    id: "back-glass-laser",
    title: "تغيير باغات وزجاج الظهر بالليزر البارد",
    price: 1250,
    time: "45 - 60 دقيقة فوري",
    warranty: "ضمان عزل وتثبيت دائم",
    desc: "إصلاح بالليزر الخارجي بدون فك البوردة أو الكاميرات، مع زجاج ظهر أصلي بنفس لون الفابريكا."
  },
  {
    id: "logic-board-repair",
    title: "صيانة البوردة المتقدمة (مايكروسولدرينج و FaceID)",
    price: 1800,
    time: "1 - 3 ساعات",
    warranty: "ضمان 6 شهور موثق",
    desc: "فحص ميكروسكوبي وكاميرات حرارية لحل أعطال الباور والريستارت والصوت وبرمجة FaceID."
  },
  {
    id: "water-damage-recovery",
    title: "إنقاذ أجهزة السقوط في الماء واستعادة البيانات",
    price: 1500,
    time: "2 - 4 ساعات",
    warranty: "نسبة نجاح تتعدى 95%",
    desc: "تنظيف بالموجات فوق الصوتية لإزالة الأملاح والشورت واستعادة البيانات كاملة بأمان تام."
  }
];

const DEFAULT_STORE_SETTINGS = {
  waDevices: "201017891759",
  waMaintenance: "201115373748",
  waAccessories: "201101675132",
  announcementText: "عرض خاص: احصل على سكرينة حماية أصلية مجاناً + ضمان سنة مع أي جهاز تشتريه!",
  adminPin: "1234"
};

const SAMPLE_INQUIRIES = [
  {
    id: "inq-101",
    dept: "أجهزة الآيفون",
    details: "استفسار عن سعر: iPhone 16 Pro Max (256GB - تيتانيوم صحراوي ذهبي)",
    date: "اليوم، 02:45 م",
    targetWa: "201017891759"
  },
  {
    id: "inq-102",
    dept: "معمل الصيانة",
    details: "حجز صيانة فوري: تغيير شاشة OLED أصلية لجهاز iPhone 15 Pro",
    date: "اليوم، 01:15 م",
    targetWa: "201115373748"
  },
  {
    id: "inq-103",
    dept: "الإكسسوارات الفاخرة",
    details: "طلب إكسسوار: شاحن لاسلكي MagSafe 25W + جراب تيتانيوم فاخر",
    date: "أمس، 08:30 م",
    targetWa: "201101675132"
  }
];

// App State
let phones = [];
let accessories = [];
let services = [];
let inquiries = [];
let settings = {};

// ================= 2. INITIALIZATION ON DOM READY =================
document.addEventListener("DOMContentLoaded", () => {
  initAuthSystem();
  loadAllData();
  setupSidebarNavigation();
  setupModalsAndEvents();
  renderAllPanels();
});

// ================= 3. SECURITY & PIN AUTH SYSTEM =================
function initAuthSystem() {
  const lockOverlay = document.getElementById("adminLockOverlay");
  const pinForm = document.getElementById("pinAuthForm");
  const pinInput = document.getElementById("adminPinInput");
  const toggleBtn = document.getElementById("btnTogglePin");
  const eyeIcon = document.getElementById("pinEyeIcon");
  const logoutBtn = document.getElementById("btnAdminLogout");

  // Load saved pin or default
  const savedSettings = JSON.parse(localStorage.getItem("ipro_store_settings") || "{}");
  const correctPin = savedSettings.adminPin || DEFAULT_STORE_SETTINGS.adminPin;

  // Check if session is already active
  const isAuth = sessionStorage.getItem("ipro_admin_auth") === "true";
  if (isAuth && lockOverlay) {
    lockOverlay.classList.add("unlocked");
  }

  // Toggle PIN visibility
  if (toggleBtn && pinInput && eyeIcon) {
    toggleBtn.addEventListener("click", () => {
      const isPass = pinInput.type === "password";
      pinInput.type = isPass ? "text" : "password";
      eyeIcon.className = isPass ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    });
  }

  // Submit PIN
  if (pinForm && pinInput) {
    pinForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const entered = pinInput.value.trim();
      const curPin = (JSON.parse(localStorage.getItem("ipro_store_settings") || "{}")).adminPin || DEFAULT_STORE_SETTINGS.adminPin;

      if (entered === curPin) {
        sessionStorage.setItem("ipro_admin_auth", "true");
        if (lockOverlay) {
          lockOverlay.classList.add("unlocked");
        }
        showToast("مرحباً بك! تم تسجيل الدخول بنجاح", "fa-circle-check");
        pinInput.value = "";
      } else {
        pinInput.classList.add("shake-error");
        setTimeout(() => pinInput.classList.remove("shake-error"), 600);
        showToast("رمز PIN غير صحيح، حاول مرة أخرى", "fa-triangle-exclamation");
        pinInput.select();
      }
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("ipro_admin_auth");
      if (lockOverlay) {
        lockOverlay.classList.remove("unlocked");
      }
      showToast("تم قفل لوحة التحكم وتسجيل الخروج", "fa-lock");
    });
  }
}

// ================= 4. DATA LOADING & SAVING =================
function loadAllData() {
  // Phones
  try {
    const p = localStorage.getItem("ipro_phones_catalog");
    phones = p ? JSON.parse(p) : DEFAULT_PHONES_CATALOG;
  } catch (e) {
    phones = DEFAULT_PHONES_CATALOG;
  }

  // Accessories
  try {
    const a = localStorage.getItem("ipro_accessories_catalog");
    accessories = a ? JSON.parse(a) : DEFAULT_ACCESSORIES_CATALOG;
  } catch (e) {
    accessories = DEFAULT_ACCESSORIES_CATALOG;
  }

  // Services
  try {
    const s = localStorage.getItem("ipro_services_catalog");
    services = s ? JSON.parse(s) : DEFAULT_SERVICES_CATALOG;
  } catch (e) {
    services = DEFAULT_SERVICES_CATALOG;
  }

  // Inquiries
  try {
    const inq = localStorage.getItem("ipro_inquiries_log");
    inquiries = inq ? JSON.parse(inq) : SAMPLE_INQUIRIES;
    if (!inq) {
      localStorage.setItem("ipro_inquiries_log", JSON.stringify(SAMPLE_INQUIRIES));
    }
  } catch (e) {
    inquiries = SAMPLE_INQUIRIES;
  }

  // Store Settings
  try {
    const set = localStorage.getItem("ipro_store_settings");
    settings = set ? { ...DEFAULT_STORE_SETTINGS, ...JSON.parse(set) } : { ...DEFAULT_STORE_SETTINGS };
  } catch (e) {
    settings = { ...DEFAULT_STORE_SETTINGS };
  }
}

function savePhones() {
  localStorage.setItem("ipro_phones_catalog", JSON.stringify(phones));
  updateStats();
}

function saveAccessories() {
  localStorage.setItem("ipro_accessories_catalog", JSON.stringify(accessories));
  updateStats();
}

function saveServices() {
  localStorage.setItem("ipro_services_catalog", JSON.stringify(services));
  updateStats();
}

function saveInquiries() {
  localStorage.setItem("ipro_inquiries_log", JSON.stringify(inquiries));
  updateStats();
}

function saveStoreSettings() {
  localStorage.setItem("ipro_store_settings", JSON.stringify(settings));
}

// ================= 5. SIDEBAR NAVIGATION & TABS =================
function setupSidebarNavigation() {
  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  const toggleBtn = document.getElementById("btnSidebarToggle");
  const sidebar = document.getElementById("adminSidebar");

  sidebarLinks.forEach(link => {
    link.addEventListener("click", () => {
      const targetPaneId = link.dataset.tab;
      switchDashboardTab(targetPaneId);

      // Close mobile sidebar on selection
      if (sidebar && window.innerWidth <= 1080) {
        sidebar.classList.remove("open");
      }
    });
  });

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }
}

window.switchDashboardTab = function(paneId) {
  // Update nav buttons
  document.querySelectorAll(".sidebar-link").forEach(l => {
    l.classList.toggle("active", l.dataset.tab === paneId);
  });

  // Update panels
  document.querySelectorAll(".dashboard-panel").forEach(p => {
    p.classList.toggle("active", p.id === paneId);
  });

  // Update topbar title
  const titleMap = {
    paneOverview: "نظرة عامة والتحليلات",
    paneDevices: "إدارة كتالوج أجهزة الآيفون",
    paneAccessories: "إدارة قسم الإكسسوارات الفاخرة",
    paneServices: "إدارة خدمات وأسعار الصيانة",
    paneInquiries: "سجل طلبات واستفسارات العملاء",
    paneSettings: "إعدادات المتجر وأرقام التواصل"
  };

  const titleEl = document.getElementById("currentTabTitle");
  if (titleEl && titleMap[paneId]) {
    titleEl.textContent = titleMap[paneId];
  }
};

// ================= 6. STATS & BADGES UPDATE =================
function updateStats() {
  // Counters
  const pCount = phones.length;
  const aCount = accessories.length;
  const sCount = services.length;
  const inqCount = inquiries.length;

  // Sidebar badges
  const bP = document.getElementById("sideBadgePhones");
  const bA = document.getElementById("sideBadgeAcc");
  const bS = document.getElementById("sideBadgeServices");
  const bInq = document.getElementById("sideBadgeInquiries");

  if (bP) bP.textContent = pCount;
  if (bA) bA.textContent = aCount;
  if (bS) bS.textContent = sCount;
  if (bInq) bInq.textContent = inqCount;

  // KPI cards
  const kP = document.getElementById("kpiPhonesCount");
  const kA = document.getElementById("kpiAccessoriesCount");
  const kS = document.getElementById("kpiServicesCount");
  const kInq = document.getElementById("kpiInquiriesCount");

  if (kP) kP.textContent = pCount;
  if (kA) kA.textContent = aCount;
  if (kS) kS.textContent = sCount;
  if (kInq) kInq.textContent = inqCount;
}

// ================= 7. RENDER PANELS =================
function renderAllPanels() {
  updateStats();
  renderPhonesTable();
  renderAccessoriesTable();
  renderServicesTable();
  renderInquiriesTable();
  populateSettingsForm();
}

// --- A. Render Phones Table ---
function renderPhonesTable(filteredList = null) {
  const tbody = document.getElementById("phonesTableBody");
  if (!tbody) return;

  const list = filteredList || phones;
  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">لا توجد أجهزة مطابقة لخيارات البحث.</td></tr>`;
    return;
  }

  tbody.innerHTML = "";
  list.forEach(item => {
    const tr = document.createElement("tr");
    const inStock = item.inStock !== false;

    tr.innerHTML = `
      <td>
        <div class="item-thumb-title">
          <div class="thumb-icon-box"><i class="fa-solid fa-mobile-screen"></i></div>
          <div class="title-sub">
            <strong>${item.name}</strong>
            <small>${item.badgeAr || "Apple Flagship"}</small>
          </div>
        </div>
      </td>
      <td><span class="badge-tag-sm">${item.category}</span></td>
      <td>
        <strong style="font-size:0.85rem; color:#fff;">${item.chip || "Apple Silicon"}</strong><br>
        <small style="color:var(--text-muted);">${item.displayAr ? item.displayAr.substring(0, 32) + "..." : ""}</small>
      </td>
      <td><span style="font-family:var(--font-en); font-weight:700; color:var(--gold-light);">${(item.storageOptions || []).join(", ")}</span></td>
      <td>
        <span class="stock-toggle-pill ${inStock ? 'in-stock' : 'out-stock'}" onclick="togglePhoneStock('${item.id}')" title="انقر لتغيير التوفر">
          <i class="fa-solid ${inStock ? 'fa-check' : 'fa-xmark'}"></i>
          <span>${inStock ? 'متوفر فوري' : 'نفد مؤقتاً'}</span>
        </span>
      </td>
      <td>
        <div class="table-actions">
          <button type="button" class="btn-icon-action" onclick="openEditPhoneModal('${item.id}')" title="تعديل"><i class="fa-solid fa-pen-to-square"></i></button>
          <button type="button" class="btn-icon-action del" onclick="deletePhone('${item.id}')" title="حذف"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Toggle Stock
window.togglePhoneStock = function(id) {
  const item = phones.find(p => p.id === id);
  if (!item) return;
  item.inStock = item.inStock === false ? true : false;
  savePhones();
  renderPhonesTable();
  showToast(`تم تحديث حالة توفر (${item.name})`, "fa-rotate");
};

// Delete Phone
window.deletePhone = function(id) {
  const item = phones.find(p => p.id === id);
  if (!item) return;
  if (!confirm(`هل أنت متأكد من حذف الجهاز: (${item.name}) نهائياً من المتجر؟`)) return;

  phones = phones.filter(p => p.id !== id);
  savePhones();
  renderPhonesTable();
  showToast(`تم حذف (${item.name}) بنجاح`, "fa-trash");
};

// --- B. Render Accessories Table ---
function renderAccessoriesTable(filteredList = null) {
  const tbody = document.getElementById("accessoriesTableBody");
  if (!tbody) return;

  const list = filteredList || accessories;
  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">لا توجد إكسسوارات مطابقة.</td></tr>`;
    return;
  }

  tbody.innerHTML = "";
  list.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <div class="item-thumb-title">
          <div class="thumb-icon-box"><i class="fa-solid fa-headphones"></i></div>
          <div class="title-sub">
            <strong>${item.nameAr || item.name}</strong>
            <small>${item.badgeAr || "Apple Luxury"}</small>
          </div>
        </div>
      </td>
      <td><span class="badge-tag-sm">${item.category || "General"}</span></td>
      <td><strong style="color:var(--gold-light); font-family:var(--font-en); font-size:1.05rem;">${Number(item.price).toLocaleString()} ج.م</strong></td>
      <td><small style="color:var(--text-muted);">${item.compat || "All Apple"}</small></td>
      <td><small style="color:#10B981; font-weight:700;">${item.warranty || "ضمان سنة معتمد"}</small></td>
      <td>
        <div class="table-actions">
          <button type="button" class="btn-icon-action" onclick="openEditAccModal('${item.id}')" title="تعديل"><i class="fa-solid fa-pen-to-square"></i></button>
          <button type="button" class="btn-icon-action del" onclick="deleteAccessory('${item.id}')" title="حذف"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Delete Accessory
window.deleteAccessory = function(id) {
  const item = accessories.find(a => a.id === id);
  if (!item) return;
  if (!confirm(`هل أنت متأكد من حذف الإكسسوار: (${item.nameAr || item.name})؟`)) return;

  accessories = accessories.filter(a => a.id !== id);
  saveAccessories();
  renderAccessoriesTable();
  showToast(`تم حذف الإكسسوار بنجاح`, "fa-trash");
};

// --- C. Render Services Table with Real-time Inline Editable Prices ---
function renderServicesTable() {
  const tbody = document.getElementById("servicesTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";
  services.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <div class="item-thumb-title">
          <div class="thumb-icon-box"><i class="fa-solid fa-screwdriver-wrench"></i></div>
          <div class="title-sub">
            <strong>${item.title}</strong>
            <small>${item.desc ? item.desc.substring(0, 45) + "..." : ""}</small>
          </div>
        </div>
      </td>
      <td>
        <div style="display:flex; align-items:center; gap:0.4rem;">
          <input type="number" class="inline-price-input" value="${item.price}" onchange="updateServicePriceInline('${item.id}', this.value)" title="عدل السعر واضغط Enter">
          <span style="font-size:0.85rem; color:var(--text-muted);">ج.م</span>
        </div>
      </td>
      <td><span style="font-weight:700; color:#fff;">${item.time}</span></td>
      <td><span style="color:#10B981; font-weight:700;">${item.warranty}</span></td>
      <td>
        <div class="table-actions">
          <button type="button" class="btn-icon-action" onclick="openEditServiceModal('${item.id}')" title="تعديل التفاصيل"><i class="fa-solid fa-pen-to-square"></i></button>
          <button type="button" class="btn-icon-action del" onclick="deleteService('${item.id}')" title="حذف"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.updateServicePriceInline = function(id, newPrice) {
  const item = services.find(s => s.id === id);
  if (!item) return;
  const p = Number(newPrice);
  if (isNaN(p) || p <= 0) return;
  item.price = p;
  saveServices();
  showToast(`تم تحديث سعر (${item.title}) إلى ${p.toLocaleString()} ج.م`, "fa-check");
};

window.deleteService = function(id) {
  const item = services.find(s => s.id === id);
  if (!item) return;
  if (!confirm(`هل أنت متأكد من حذف خدمة الصيانة: (${item.title})؟`)) return;

  services = services.filter(s => s.id !== id);
  saveServices();
  renderServicesTable();
  showToast(`تم حذف الخدمة بنجاح`, "fa-trash");
};

// --- D. Render Inquiries Log Table ---
function renderInquiriesTable() {
  const tbody = document.getElementById("inquiriesTableBody");
  if (!tbody) return;

  if (inquiries.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:2rem; color:var(--text-muted);">سجل الاستفسارات فارغ حالياً.</td></tr>`;
    return;
  }

  tbody.innerHTML = "";
  inquiries.forEach(inq => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><span class="badge-tag-sm">${inq.dept}</span></td>
      <td><strong style="color:#fff;">${inq.details}</strong></td>
      <td><small style="color:var(--text-muted);">${inq.date}</small></td>
      <td><span style="font-family:var(--font-en); font-weight:700; color:var(--gold-light);">+${inq.targetWa}</span></td>
      <td>
        <a href="https://wa.me/${inq.targetWa}" target="_blank" class="btn btn-outline-gold btn-sm" style="padding:0.25rem 0.65rem; font-size:0.75rem;">
          <i class="fa-brands fa-whatsapp"></i>
          <span>فتح المحادثة</span>
        </a>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Clear Inquiries Log
const btnClearInquiries = document.getElementById("btnClearInquiries");
if (btnClearInquiries) {
  btnClearInquiries.addEventListener("click", () => {
    if (!confirm("هل أنت متأكد من رغبتك في مسح سجل الاستفسارات بالكامل؟")) return;
    inquiries = [];
    saveInquiries();
    renderInquiriesTable();
    showToast("تم تفريغ سجل الاستفسارات بنجاح", "fa-trash");
  });
}

// --- E. Settings Form Handling ---
function populateSettingsForm() {
  const waDev = document.getElementById("settingWaDevices");
  const waMaint = document.getElementById("settingWaMaintenance");
  const waAcc = document.getElementById("settingWaAccessories");
  const ann = document.getElementById("settingAnnouncement");
  const pin = document.getElementById("settingAdminPin");

  if (waDev) waDev.value = settings.waDevices || "201017891759";
  if (waMaint) waMaint.value = settings.waMaintenance || "201115373748";
  if (waAcc) waAcc.value = settings.waAccessories || "201101675132";
  if (ann) ann.value = settings.announcementText || "";
  if (pin) pin.value = settings.adminPin || "1234";
}

const storeSettingsForm = document.getElementById("storeSettingsForm");
if (storeSettingsForm) {
  storeSettingsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    settings.waDevices = document.getElementById("settingWaDevices").value.trim();
    settings.waMaintenance = document.getElementById("settingWaMaintenance").value.trim();
    settings.waAccessories = document.getElementById("settingWaAccessories").value.trim();
    settings.announcementText = document.getElementById("settingAnnouncement").value.trim();
    settings.adminPin = document.getElementById("settingAdminPin").value.trim() || "1234";

    saveStoreSettings();
    showToast("تم حفظ كافة إعدادات وأرقام المتجر بنجاح!", "fa-circle-check");
  });
}

// Factory Reset button
const btnFactoryReset = document.getElementById("btnFactoryReset");
const btnQuickReset = document.getElementById("btnQuickReset");

function performFactoryReset() {
  if (!confirm("⚠️ تحذير: هل أنت متأكد من استعادة كافة بيانات المتجر الافتراضية (الأجهزة، الإكسسوارات، الأسعار، والإعدادات)؟")) return;

  localStorage.removeItem("ipro_phones_catalog");
  localStorage.removeItem("ipro_accessories_catalog");
  localStorage.removeItem("ipro_services_catalog");
  localStorage.removeItem("ipro_store_settings");
  localStorage.removeItem("ipro_inquiries_log");

  loadAllData();
  renderAllPanels();
  showToast("تمت استعادة إعدادات وبيانات المتجر الافتراضية الأصلية بنجاح!", "fa-rotate-left");
}

if (btnFactoryReset) btnFactoryReset.addEventListener("click", performFactoryReset);
if (btnQuickReset) btnQuickReset.addEventListener("click", performFactoryReset);

// ================= 8. MODALS & FORMS (CRUD) =================
function setupModalsAndEvents() {
  // Search & Filter Listeners
  const searchPhones = document.getElementById("searchPhonesInput");
  const filterPhones = document.getElementById("filterPhonesCategory");

  const filterPhonesHandler = () => {
    const q = (searchPhones?.value || "").trim().toLowerCase();
    const cat = filterPhones?.value || "all";

    const filtered = phones.filter(p => {
      const matchQ = p.name.toLowerCase().includes(q) || (p.chip && p.chip.toLowerCase().includes(q));
      const matchCat = cat === "all" || p.category === cat;
      return matchQ && matchCat;
    });
    renderPhonesTable(filtered);
  };

  if (searchPhones) searchPhones.addEventListener("input", filterPhonesHandler);
  if (filterPhones) filterPhones.addEventListener("change", filterPhonesHandler);

  // Accessories Search & Filter
  const searchAcc = document.getElementById("searchAccessoriesInput");
  const filterAcc = document.getElementById("filterAccessoriesCategory");

  const filterAccHandler = () => {
    const q = (searchAcc?.value || "").trim().toLowerCase();
    const cat = filterAcc?.value || "all";

    const filtered = accessories.filter(a => {
      const title = (a.nameAr || a.name || "").toLowerCase();
      const matchQ = title.includes(q);
      const matchCat = cat === "all" || a.category === cat;
      return matchQ && matchCat;
    });
    renderAccessoriesTable(filtered);
  };

  if (searchAcc) searchAcc.addEventListener("input", filterAccHandler);
  if (filterAcc) filterAcc.addEventListener("change", filterAccHandler);

  // Modal triggers
  const btnAddPhone = document.getElementById("btnOpenAddPhoneModal");
  if (btnAddPhone) {
    btnAddPhone.addEventListener("click", () => {
      document.getElementById("modalPhoneTitle").innerHTML = `<i class="fa-solid fa-mobile-screen gold-text"></i> إضافة جهاز آيفون جديد`;
      document.getElementById("formPhoneModal").reset();
      document.getElementById("modalPhoneId").value = "";
      openAdminModal("modalPhone");
    });
  }

  const btnAddAcc = document.getElementById("btnOpenAddAccModal");
  if (btnAddAcc) {
    btnAddAcc.addEventListener("click", () => {
      document.getElementById("modalAccTitle").innerHTML = `<i class="fa-solid fa-headphones gold-text"></i> إضافة إكسسوار جديد`;
      document.getElementById("formAccModal").reset();
      document.getElementById("modalAccId").value = "";
      openAdminModal("modalAccessory");
    });
  }

  const btnAddService = document.getElementById("btnOpenAddServiceModal");
  if (btnAddService) {
    btnAddService.addEventListener("click", () => {
      document.getElementById("modalServiceTitle").innerHTML = `<i class="fa-solid fa-screwdriver-wrench gold-text"></i> إضافة خدمة صيانة وتسعير`;
      document.getElementById("formServiceModal").reset();
      document.getElementById("modalServiceId").value = "";
      openAdminModal("modalService");
    });
  }

  // Form Submissions
  // 1. Phone Form
  const formPhone = document.getElementById("formPhoneModal");
  if (formPhone) {
    formPhone.addEventListener("submit", (e) => {
      e.preventDefault();
      const editId = document.getElementById("modalPhoneId").value;
      const name = document.getElementById("mPhoneName").value.trim();
      const category = document.getElementById("mPhoneCategory").value;
      const chip = document.getElementById("mPhoneChip").value.trim();
      const displayAr = document.getElementById("mPhoneDisplay").value.trim();
      const cameraAr = document.getElementById("mPhoneCamera").value.trim();
      const storages = document.getElementById("mPhoneStorages").value.split(",").map(s => s.trim()).filter(Boolean);
      const conditionAr = document.getElementById("mPhoneCondition").value.trim();
      const badgeAr = document.getElementById("mPhoneBadge").value.trim() || "Apple Flagship";

      if (editId) {
        const item = phones.find(p => p.id === editId);
        if (item) {
          item.name = name;
          item.category = category;
          item.chip = chip;
          item.displayAr = displayAr;
          item.cameraAr = cameraAr;
          item.storageOptions = storages;
          item.conditionAr = conditionAr;
          item.badgeAr = badgeAr;
          showToast(`تم تعديل بيانات (${name}) بنجاح`, "fa-check");
        }
      } else {
        const newId = "phone-" + Date.now();
        phones.unshift({
          id: newId,
          name,
          category,
          chip,
          displayAr,
          cameraAr,
          storageOptions: storages.length ? storages : ["256GB", "512GB"],
          conditionAr,
          badgeAr,
          inStock: true,
          colors: [{ nameAr: "تيتانيوم ذهبي", hex: "linear-gradient(135deg, #d8b248 0%, #aa7c11 100%)" }]
        });
        showToast(`تمت إضافة (${name}) للمتجر فوراً!`, "fa-circle-plus");
      }

      savePhones();
      renderPhonesTable();
      closeAdminModal("modalPhone");
    });
  }

  // 2. Accessory Form
  const formAcc = document.getElementById("formAccModal");
  if (formAcc) {
    formAcc.addEventListener("submit", (e) => {
      e.preventDefault();
      const editId = document.getElementById("modalAccId").value;
      const nameAr = document.getElementById("mAccName").value.trim();
      const category = document.getElementById("mAccCategory").value;
      const price = Number(document.getElementById("mAccPrice").value);
      const compat = document.getElementById("mAccCompat").value.trim();
      const warranty = document.getElementById("mAccWarranty").value.trim();
      const badgeAr = document.getElementById("mAccBadge").value.trim() || "فاخر VIP";
      const descAr = document.getElementById("mAccDesc").value.trim();

      if (editId) {
        const item = accessories.find(a => a.id === editId);
        if (item) {
          item.nameAr = nameAr;
          item.category = category;
          item.price = price;
          item.compat = compat;
          item.warranty = warranty;
          item.badgeAr = badgeAr;
          item.descAr = descAr;
          showToast(`تم تعديل (${nameAr}) بنجاح`, "fa-check");
        }
      } else {
        const newId = "acc-" + Date.now();
        accessories.unshift({
          id: newId,
          nameAr,
          category,
          price,
          compat,
          warranty,
          badgeAr,
          descAr,
          visualType: category === "cases" ? "luxury-case" : category === "audio" ? "airpods-pro" : "magsafe-charger"
        });
        showToast(`تمت إضافة الإكسسوار بنجاح!`, "fa-circle-plus");
      }

      saveAccessories();
      renderAccessoriesTable();
      closeAdminModal("modalAccessory");
    });
  }

  // 3. Service Form
  const formService = document.getElementById("formServiceModal");
  if (formService) {
    formService.addEventListener("submit", (e) => {
      e.preventDefault();
      const editId = document.getElementById("modalServiceId").value;
      const title = document.getElementById("mServiceTitle").value.trim();
      const price = Number(document.getElementById("mServicePrice").value);
      const time = document.getElementById("mServiceTime").value.trim();
      const warranty = document.getElementById("mServiceWarranty").value.trim();
      const desc = document.getElementById("mServiceDesc").value.trim();

      if (editId) {
        const item = services.find(s => s.id === editId);
        if (item) {
          item.title = title;
          item.price = price;
          item.time = time;
          item.warranty = warranty;
          item.desc = desc;
          showToast(`تم تعديل خدمة (${title}) بنجاح`, "fa-check");
        }
      } else {
        const newId = "srv-" + Date.now();
        services.unshift({
          id: newId,
          title,
          price,
          time,
          warranty,
          desc
        });
        showToast(`تمت إضافة خدمة الصيانة والتسعير!`, "fa-circle-plus");
      }

      saveServices();
      renderServicesTable();
      closeAdminModal("modalService");
    });
  }
}

// Edit Modals Populate
window.openEditPhoneModal = function(id) {
  const item = phones.find(p => p.id === id);
  if (!item) return;

  document.getElementById("modalPhoneTitle").innerHTML = `<i class="fa-solid fa-pen-to-square gold-text"></i> تعديل بيانات: ${item.name}`;
  document.getElementById("modalPhoneId").value = item.id;
  document.getElementById("mPhoneName").value = item.name;
  document.getElementById("mPhoneCategory").value = item.category;
  document.getElementById("mPhoneChip").value = item.chip || "";
  document.getElementById("mPhoneDisplay").value = item.displayAr || "";
  document.getElementById("mPhoneCamera").value = item.cameraAr || "";
  document.getElementById("mPhoneStorages").value = (item.storageOptions || []).join(", ");
  document.getElementById("mPhoneCondition").value = item.conditionAr || "";
  document.getElementById("mPhoneBadge").value = item.badgeAr || "";

  openAdminModal("modalPhone");
};

window.openEditAccModal = function(id) {
  const item = accessories.find(a => a.id === id);
  if (!item) return;

  document.getElementById("modalAccTitle").innerHTML = `<i class="fa-solid fa-pen-to-square gold-text"></i> تعديل: ${item.nameAr || item.name}`;
  document.getElementById("modalAccId").value = item.id;
  document.getElementById("mAccName").value = item.nameAr || item.name;
  document.getElementById("mAccCategory").value = item.category || "chargers";
  document.getElementById("mAccPrice").value = item.price;
  document.getElementById("mAccCompat").value = item.compat || "";
  document.getElementById("mAccWarranty").value = item.warranty || "";
  document.getElementById("mAccBadge").value = item.badgeAr || "";
  document.getElementById("mAccDesc").value = item.descAr || item.desc || "";

  openAdminModal("modalAccessory");
};

window.openEditServiceModal = function(id) {
  const item = services.find(s => s.id === id);
  if (!item) return;

  document.getElementById("modalServiceTitle").innerHTML = `<i class="fa-solid fa-pen-to-square gold-text"></i> تعديل خدمة: ${item.title}`;
  document.getElementById("modalServiceId").value = item.id;
  document.getElementById("mServiceTitle").value = item.title;
  document.getElementById("mServicePrice").value = item.price;
  document.getElementById("mServiceTime").value = item.time;
  document.getElementById("mServiceWarranty").value = item.warranty;
  document.getElementById("mServiceDesc").value = item.desc || "";

  openAdminModal("modalService");
};

window.openAdminModal = function(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add("active");
};

window.closeAdminModal = function(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove("active");
};

// ================= 9. TOAST NOTIFICATION UTILITY =================
function showToast(message, iconClass = "fa-circle-check") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid ${iconClass} gold-text"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(15px)";
    toast.style.transition = "all 0.35s ease";
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}
