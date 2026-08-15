import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  CreditCard, FileText, Briefcase, Building2, GraduationCap, Car,
  Globe2, Home as HomeIcon, Users, Search, X, MapPin, Clock, FileCheck2,
  ChevronLeft, AlertCircle, Activity, Landmark, Gavel, Sprout,
  HeartHandshake, Moon, Anchor, Trees, Trophy, Zap, ExternalLink,
  Shield, Bell, Settings as SettingsIcon, Info, Lock, ScrollText,
  Flag, Send, Trash2, CheckCircle2, ChevronRight,
  MessageCircle, KeyRound, LogOut, Inbox
} from "lucide-react";

/* ---------------------------------------------------------
   ALGERIA NATIONAL PALETTE
--------------------------------------------------------- */
const C = {
  green: "#0B6B3A",
  greenDark: "#03502A",
  greenSoft: "#0B6B3A14",
  red: "#D21034",
  redSoft: "#D2103412",
  gold: "#A9762F",
  goldSoft: "#A9762F1A",
  white: "#FFFFFF",
  bg: "#FAF9F5",
  headerBg: "#F3F1E9",
  cream: "#F3F1E9",
  creamBorder: "#E4E0D3",
  text: "#14231C",
  textMuted: "#5E6B63",
  border: "#0000000F",
};

/* Simple client-side gate for the admin area. This is NOT real security —
   anyone reading the source can find it — it only hides the reports/chat
   screens from casual users. Change this before any real-world use. */
const ADMIN_PASSWORD = "lotfi1993";

/* ---------------------------------------------------------
   ALGERIA FLAG (inline SVG, no external assets)
--------------------------------------------------------- */
const ALGERIA_EMBLEM_DATA_URI =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAioAAAIqCAMAAAA97pGBAAAAn1BMVEX///+bcTmabzaZbjOYbDCXay6WaSn9/PqVZyX49fH6+PWZbjKUZiOXayyVaCj18ezw6uLazLvt5+Cfd0KjfUvp4NTg1MXr49medT2TZB27oIC5nXqkfk3FrpLAp4iphlrNuaGvj2fXyLWRYBOrimO0lnDZyrfMuJ/Twazl2sysil3ErZG0l3TJtqCphVWwj2ONWgC/poKKVADTwqnJspNpEKpDAAAgAElEQVR4nOxdC3uiyNKWbu7QAnJVFJEEBTW4803+/2/7urpBUcGYzMzunk2/5zzPZqIigaLu9dZkIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIPC/Ak0z3Whb5e/Zoty8XlCm2e6nV8eOqWnaP32SAv8sjFkdFbt0T2xdVYmiyPgKlkKIqttzO2nKrIpi458+X4F/BHGxOr4ufUslGEkfACGsECt4TXeF+0+ft8DfCKpLVnvbVhWM0YdS0hcYbBF1Tk6rKHb+6b9B4M/DrQ6bgGqSMfVBFQgAfhgRI6yo/uZQCGn5D0NzoxRRj+TO4FDxkIlKtYzk+0HDXNr1MvD9hGoRolj3BoraI4X4WeQKefkvIq4Wvm6hGxHBZGoTf19mu8KLoroOY9cAOLM4DOso8qpVevJ16vaCyFx/WtaTvdAu/zEY8W6ZyDK6UgxE9pfr4y5ytA9iYRpMO1HxnlInGBHr+iCK5ZeFIULp/wjqVWOTnkZASFHtoNwV9SfDGSf0qkVDdKWvXhDWg8wTuuV/H0b+mhDU1wPYX2db1zC/djzNcKKs8XHf40EKXqaxUC3/yzDq1FIv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";

function AlgeriaEmblem({ size = 52 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        background: C.cream,
        border: `1.5px solid ${C.creamBorder}`,
        boxShadow: "0 2px 6px rgba(169,118,47,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <img
        src={ALGERIA_EMBLEM_DATA_URI}
        alt="شعار الجمهورية الجزائرية الديمقراطية الشعبية"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

/* ---------------------------------------------------------
   CATEGORIES
--------------------------------------------------------- */
const CATEGORIES = [
  { id: "identite", label: "الهوية والوثائق", icon: CreditCard },
  { id: "civil", label: "الحالة المدنية", icon: FileText },
  { id: "travail", label: "الشغل والضمان", icon: Briefcase },
  { id: "affaires", label: "الأعمال والاستثمار والصناعة", icon: Building2 },
  { id: "logement", label: "السكن والعقار", icon: HomeIcon },
  { id: "education", label: "التربية والتعليم والتكوين", icon: GraduationCap },
  { id: "transport", label: "السيارة والنقل", icon: Car },
  { id: "national", label: "الخدمة الوطنية", icon: Shield },
  { id: "sante", label: "الصحة", icon: Activity },
  { id: "religion", label: "الحج والعمرة والأوقاف", icon: Moon },
  { id: "banque", label: "البنوك والمال", icon: Landmark },
  { id: "justice", label: "الأسرة والعدالة", icon: Gavel },
  { id: "agriculture", label: "الفلاحة", icon: Sprout },
  { id: "peche", label: "الصيد البحري والبري", icon: Anchor },
  { id: "forets", label: "الغابات", icon: Trees },
  { id: "jeunesse", label: "الشباب والرياضة", icon: Trophy },
  { id: "energie", label: "الطاقة", icon: Zap },
  { id: "associations", label: "الجمعيات والنقابات", icon: HeartHandshake },
  { id: "expat", label: "الجالية بالخارج", icon: Globe2 },{ id: "digital", label: "الرقمنة والخدمات الإلكترونية", icon: ExternalLink },
  
];

const OFFICIAL_SOURCES = [
  { label: "وزارة الداخلية والجماعات المحلية والتهيئة العمرانية", domain: "interieur.gov.dz" },
  { label: "منصة جواز السفر البيومتري", domain: "passeport.interieur.gov.dz" },
  { label: "وزارة الشؤون الخارجية والجالية (القنصليات)", domain: "mfa.gov.dz" },
  { label: "الصندوق الوطني للتأمينات الاجتماعية (CNAS)", domain: "cnas.dz" },
  { label: "الصندوق الوطني للضمان الاجتماعي لغير الأجراء (CASNOS)", domain: "casnos.dz" },
  { label: "الوكالة الوطنية للتشغيل (ANEM)", domain: "anem.dz" },
  { label: "المركز الوطني للسجل التجاري (CNRC)", domain: "cnrc.dz" },
  { label: "مديرية الضرائب العامة", domain: "mfdgi.gov.dz" },
  { label: "الوكالة الجزائرية لترقية الاستثمار (AAPI)", domain: "aapi.dz" },
  { label: "التسجيلات الجامعية (Progrès)", domain: "progres.mesrs.dz" },
  { label: "وزارة التربية الوطنية", domain: "education.gov.dz" },
  { label: "وزارة التكوين والتعليم المهنيين", domain: "mfep.gov.dz" },
  { label: "وزارة الصيد البحري والمنتجات الصيدية", domain: "mpeche.gov.dz" },
  { label: "المديرية العامة للغابات", domain: "dgf.gov.dz" },
  { label: "وزارة الشباب والرياضة", domain: "mjs.gov.dz" },
  { label: "سونلغاز (الكهرباء والغاز)", domain: "sonelgaz.dz" },
  { label: "بريد الجزائر", domain: "poste.dz" },
  { label: "الديوان الوطني للحج والعمرة", domain: "onpo.dz" },
  { label: "وزارة العدل", domain: "mjustice.dz" },
  { label: "مؤسسة وسيط الجمهورية", domain: "mediateur-repub.dz" },
];

const PROCS = [
  // ---------------- الهوية والوثائق ----------------
  {
    id: "cin",
    cat: "identite",
    title: "بطاقة التعريف الوطنية البيومترية",
    sub: "استخراج أو تجديد البطاقة",
    where: "البلدية (محل الإقامة) أو الدائرة",
    duration: "من 10 إلى 20 يوماً عادةً",
    fees: "مجانية للاستخراج الأول، رسوم عند الضياع أو التلف",
    docs: [
      "مستخرج من عقد الميلاد رقم 12 (خاص)",
      "4 صور شمسية حديثة (بخلفية بيضاء)",
      "شهادة الإقامة",
      "البطاقة القديمة (في حالة التجديد)",
    ],
    steps: [
      "التوجه إلى مصلحة الحالة المدنية بالبلدية",
      "ملء استمارة الطلب وإيداع الوثائق",
      "أخذ البصمات والصورة الرقمية في نفس الجلسة",
      "انتظار استلام رسالة نصية (SMS) لسحب البطاقة",
      "التوجه لسحب البطاقة بحضور شخصي",
    ],
    note: "يمكن حجز موعد إلكترونيًا عبر بعض البلديات التي فعّلت الخدمة عن بعد.",
  },
  {
    id: "passeport",
    cat: "identite",
    title: "جواز السفر البيومتري",
    sub: "استخراج أو تجديد جواز السفر",
    where: "أي بلدية أو دائرة في الولاية، أو القنصلية للمقيمين بالخارج",
    duration: "10 إلى 15 يوماً (إجراء عادي) أو 48 ساعة (إجراء سريع، برسوم أعلى)",
    fees: "رسوم الطابع الجبائي + رسوم إضافية في الإجراء السريع",
    docs: [
      "مستخرج من عقد الميلاد رقم 12-خ",
      "صورتان شمسيتان للمقيمين في الجزائر (4 صور للمقيمين بالخارج)",
      "شهادة الإقامة (فقط إذا تغيّر محل الإقامة)",
      "الجواز القديم في حالة التجديد",
    ],
    steps: [
      "إنشاء حساب وتعبئة الاستمارة عبر منصة passeport.interieur.gov.dz",
      "حجز موعد إلكتروني إن كان متاحًا بالمكتب المختار",
      "الحضور شخصيًا لإيداع الملف وأخذ البصمات والصورة",
      "متابعة حالة الطلب عبر الموقع",
      "الحضور لسحب الجواز بعد إشعار SMS بحضور صاحب الطلب",
    ],
    note: "صلاحية الجواز 10 سنوات للبالغين و5 سنوات للقُصّر.",
  },
  {
    id: "permis",
    cat: "identite",
    title: "رخصة السياقة",
    sub: "الحصول عليها لأول مرة أو تجديدها",
    where: "مصلحة رخص السياقة بالولاية (الدائرة) بعد اجتياز مدرسة تعليم السياقة",
    duration: "عدة أسابيع للتكوين + مدة إدارية لاستلام الرخصة البيومترية",
    fees: "رسوم مدرسة السياقة (متغيرة) + رسوم الامتحان ورسوم الطابع",
    docs: [
      "شهادة الميلاد",
      "شهادة طبية (فحص النظر والقدرة على السياقة)",
      "4 صور شمسية",
      "شهادة إتمام التكوين من مدرسة معتمدة",
    ],
    steps: [
      "التسجيل في مدرسة تعليم السياقة معتمدة",
      "اجتياز الدروس النظرية (كود المرور) والامتحان",
      "اجتياز الدروس التطبيقية وامتحان السياقة",
      "إيداع ملف الطلب لدى مصلحة الولاية المختصة",
      "استلام الرخصة البيومترية بعد المعالجة",
    ],
  },

  // ---------------- الحالة المدنية ----------------
  {
    id: "s12",
    cat: "civil",
    title: "شهادة الميلاد (نسخة S12 / عقد الميلاد)",
    sub: "مستخرج من سجل الحالة المدنية",
    where: "بلدية مكان الميلاد أو أي بلدية موصولة بالشبكة الوطنية",
    duration: "فورية غالبًا إذا كانت البلدية موصولة بالشبكة",
    fees: "رسوم رمزية للطابع",
    docs: ["بطاقة التعريف الوطنية أو شهادة الإقامة", "رقم عقد الميلاد إن وُجد"],
    steps: [
      "التوجه إلى شباك الحالة المدنية بأي بلدية (النظام مركزي حاليًا)",
      "تقديم الاسم الكامل وتاريخ ومكان الميلاد",
      "استلام النسخة فورًا في أغلب الحالات",
    ],
    note: "شهادة S12 هي النسخة الخاصة المطلوبة لملفات جواز السفر والبطاقة البيومترية.",
  },
  {
    id: "mariage",
    cat: "civil",
    title: "عقد الزواج",
    sub: "إبرام عقد الزواج أو استخراج نسخة منه",
    where: "بلدية إقامة أحد الزوجين",
    duration: "حسب موعد يحدده ضابط الحالة المدنية",
    fees: "رسوم رمزية",
    docs: [
      "شهادة الميلاد لكل من الزوجين",
      "شهادة السكن",
      "شهادة طبية لكل من الزوجين (ما قبل الزواج)",
      "بطاقتا التعريف الوطنية",
      "موافقة الولي إن اقتضى الأمر",
    ],
    steps: [
      "إيداع ملف الزواج لدى مصلحة الحالة المدنية",
      "تحديد موعد إبرام العقد أمام ضابط الحالة المدنية وشاهدين",
      "توقيع العقد واستلام الدفتر العائلي",
    ],
  },
  {
    id: "deces",
    cat: "civil",
    title: "شهادة الوفاة",
    sub: "تصريح بالوفاة واستخراج الشهادة",
    where: "بلدية مكان الوفاة",
    duration: "خلال 24 ساعة من الوفاة (إلزامي التصريح)",
    fees: "مجانية غالبًا",
    docs: ["شهادة طبية معاينة للوفاة", "بطاقة تعريف المتوفى", "بطاقة المصرِّح"],
    steps: [
      "الحصول على الشهادة الطبية للوفاة من طبيب أو مصلحة استعجالات",
      "التصريح بالوفاة لدى مصلحة الحالة المدنية بالبلدية خلال 24 ساعة",
      "استلام شهادة الوفاة ورخصة الدفن",
    ],
  },
  {
    id: "casier",
    cat: "civil",
    title: "صحيفة السوابق القضائية (رقم 3)",
    sub: "وثيقة تُطلب غالبًا للتوظيف أو السفر",
    where: "المحكمة التابع لها محل الميلاد، أو إلكترونيًا عبر منصة الوزارة",
    duration: "أيام قليلة، وأحيانًا فورية عبر المنصة الإلكترونية",
    fees: "مجانية غالبًا",
    docs: ["بطاقة التعريف الوطنية", "معلومات الحالة المدنية الكاملة"],
    steps: [
      "التوجه لأمانة ضبط المحكمة أو استعمال المنصة الإلكترونية لوزارة العدل",
      "تقديم معلومات الميلاد الكاملة",
      "استلام الوثيقة (تسليم مباشر أو عبر البريد)",
    ],
  },
  {
    id: "nationalite",
    cat: "civil",
    title: "شهادة الجنسية الجزائرية",
    sub: "إثبات الجنسية للإجراءات الإدارية أو القنصلية",
    where: "المحكمة (قسم شؤون الأسرة) التابعة لمحل الإقامة أو الميلاد",
    duration: "من أسبوع إلى عدة أسابيع",
    fees: "رسوم طابع رمزية",
    docs: ["شهادة ميلاد الطالب", "شهادة ميلاد الأب (أو الأب والجد للمولودين بالخارج)"],
    steps: [
      "إيداع الطلب لدى أمانة ضبط المحكمة المختصة",
      "تقديم وثائق النسب (ميلاد الأب/الجد) لإثبات الجنسية الأصلية",
      "استلام الشهادة بعد المعالجة",
    ],
  },

  // ---------------- الشغل والضمان الاجتماعي ----------------
  {
    id: "cnas",
    cat: "travail",
    title: "الانخراط في الضمان الاجتماعي (CNAS) وبطاقة الشفاء Chifa",
    sub: "للأجراء في القطاع العام والخاص",
    where: "وكالة CNAS التابعة لمكان العمل أو الإقامة",
    duration: "يقوم بها المُشغِّل غالبًا عند التوظيف",
    fees: "اشتراكات تُقتطع من الأجر",
    docs: ["عقد العمل أو شهادة العمل", "شهادة الميلاد", "صورة شمسية"],
    steps: [
      "يقوم صاحب العمل بالتصريح بالعامل لدى CNAS عند التوظيف",
      "تقديم ملف بطاقة الشفاء (Chifa) عبر الوكالة أو الموقع الإلكتروني",
      "استلام بطاقة Chifa لاستخدامها في الصيدليات والمصالح الصحية",
    ],
  },
  {
    id: "casnos",
    cat: "travail",
    title: "الضمان الاجتماعي لغير الأجراء (CASNOS)",
    sub: "للتجار والحرفيين والمهن الحرة",
    where: "وكالة CASNOS التابعة لمقر النشاط",
    duration: "فورية للتسجيل، ثم اشتراكات سنوية",
    fees: "اشتراك سنوي حسب فئة النشاط",
    docs: ["السجل التجاري أو بطاقة الحرفي", "البطاقة الجبائية NIF", "بطاقة التعريف الوطنية"],
    steps: [
      "التوجه لوكالة CASNOS بملف النشاط المهني",
      "التسجيل ودفع أول اشتراك",
      "استلام دفتر الاشتراك وبطاقة التأمين الصحي",
    ],
  },
  {
    id: "anem",
    cat: "travail",
    title: "التسجيل في وكالة التشغيل (ANEM) ومنحة البطالة",
    sub: "للباحثين عن عمل",
    where: "الوكالة المحلية للتشغيل (ANEM) بمكان الإقامة",
    duration: "التسجيل فوري، ودراسة ملف المنحة تستغرق أسابيع",
    fees: "مجانية",
    docs: ["بطاقة التعريف الوطنية", "الشهادات والمؤهلات", "شهادة الإقامة"],
    steps: [
      "إنشاء ملف باحث عن عمل عبر منصة ANEM الإلكترونية أو بالوكالة",
      "تحديث الوضعية دوريًا حسب المدة المطلوبة",
      "لمنحة البطالة: إيداع ملف الشروط (السن، الدخل) ومتابعته",
    ],
  },

  // ---------------- الضرائب والأعمال ----------------
  {
    id: "rc",
    cat: "affaires",
    title: "السجل التجاري (CNRC)",
    sub: "لإنشاء مؤسسة أو نشاط تجاري",
    where: "المركز الوطني للسجل التجاري (فرع الولاية) أو إلكترونيًا",
    duration: "من يوم إلى بضعة أيام حسب نوع النشاط",
    fees: "رسوم استخراج تختلف حسب الشكل القانوني للنشاط",
    docs: [
      "بطاقة التعريف الوطنية",
      "عقد الإيجار أو ملكية المحل",
      "شهادة الإقامة",
      "عقد تأسيس الشركة (للشركات)",
    ],
    steps: [
      "حجز اسم النشاط عبر بوابة CNRC الإلكترونية",
      "إيداع الملف الإداري (شخص طبيعي أو معنوي)",
      "دفع الرسوم واستلام مستخرج السجل التجاري",
      "استكمال التسجيل الجبائي والانخراط في CASNOS",
    ],
  },
  {
    id: "nif",
    cat: "affaires",
    title: "البطاقة الجبائية (NIF)",
    sub: "رقم التعريف الجبائي لكل نشاط اقتصادي",
    where: "مفتشية الضرائب التابعة لمقر النشاط",
    duration: "أيام قليلة",
    fees: "مجانية",
    docs: ["السجل التجاري أو بطاقة الحرفي", "بطاقة التعريف الوطنية"],
    steps: [
      "إيداع طلب البطاقة الجبائية لدى مفتشية الضرائب",
      "تقديم وثائق النشاط (سجل تجاري / بطاقة حرفي)",
      "استلام رقم NIF واستعماله في كل الفواتير والمعاملات",
    ],
  },
  {
    id: "artisan",
    cat: "affaires",
    title: "بطاقة الحرفي (الصناعة التقليدية والحرف)",
    sub: "لممارسي الحرف والصناعات التقليدية",
    where: "غرفة الصناعة التقليدية والحرف بالولاية",
    duration: "من أسبوع إلى أسبوعين",
    fees: "رسوم رمزية",
    docs: ["شهادة الميلاد", "شهادة تكوين أو خبرة في الحرفة", "صور شمسية"],
    steps: [
      "إيداع طلب التسجيل لدى غرفة الحرف",
      "إثبات التأهيل أو الخبرة في النشاط الحرفي",
      "استلام بطاقة الحرفي والتسجيل في السجل الخاص",
    ],
  },

  // ---------------- السكن والعقار ----------------
  {
    id: "permis-construire",
    cat: "logement",
    title: "رخصة البناء",
    sub: "لبناء أو تعديل عقار",
    where: "مصلحة التعمير بالبلدية",
    duration: "من شهر إلى 3 أشهر حسب حجم المشروع",
    fees: "رسوم دراسة الملف تختلف حسب المساحة",
    docs: [
      "سند الملكية أو عقد الأرض",
      "مخطط هندسي من مهندس معماري معتمد",
      "شهادة الحيازة أو الملكية",
    ],
    steps: [
      "إعداد المخطط لدى مهندس معماري",
      "إيداع الملف لدى مصلحة التعمير بالبلدية",
      "دراسة الملف من طرف اللجنة التقنية",
      "استلام رخصة البناء قبل الشروع في الأشغال",
    ],
  },
  {
    id: "propriete",
    cat: "logement",
    title: "سند الملكية العقارية",
    sub: "تسجيل وشهر الملكية لدى المحافظة العقارية",
    where: "المحافظة العقارية بالولاية",
    duration: "عدة أسابيع إلى أشهر حسب الملف",
    fees: "رسوم تسجيل ونسبة من قيمة العقار",
    docs: ["عقد البيع الموثّق", "مخطط مسح الأراضي", "بطاقة التعريف الوطنية"],
    steps: [
      "توثيق عقد البيع لدى الموثق",
      "إيداع العقد لدى مصلحة الشهر العقاري",
      "دفع رسوم التسجيل والشهر",
      "استلام سند الملكية المشهر",
    ],
  },

  // ---------------- التعليم ----------------
  {
    id: "progres",
    cat: "education",
    title: "التسجيلات الجامعية (منصة Progrès)",
    sub: "التسجيل الأولي والتسجيلات المتتالية بالجامعة",
    where: "إلكترونيًا عبر progres.mesrs.dz ثم تأكيد بالمؤسسة الجامعية",
    duration: "حسب الجدول الزمني السنوي الذي تحدده الوزارة",
    fees: "رسوم تسجيل رمزية سنوية",
    docs: ["كشف نقاط البكالوريا أو الشهادة", "شهادة الميلاد", "صور شمسية"],
    steps: [
      "إنشاء حساب على منصة Progrès",
      "اختيار التخصصات حسب الرغبات والأهلية",
      "تأكيد التوجيه النهائي والتسجيل الإلكتروني",
      "التوجه للمؤسسة الجامعية لسحب بطاقة الطالب",
    ],
  },
  {
    id: "equivalence",
    cat: "education",
    title: "معادلة الشهادات",
    sub: "معادلة شهادة أجنبية بشهادة جزائرية أو العكس",
    where: "وزارة التعليم العالي (للشهادات الجامعية) أو وزارة التربية (للبكالوريا)",
    duration: "عدة أشهر غالبًا",
    fees: "رسوم دراسة الملف",
    docs: ["نسخة مصادق عليها من الشهادة", "كشوف النقاط", "ترجمة رسمية إن اقتضى الأمر"],
    steps: [
      "إيداع الملف لدى المصلحة المختصة بالوزارة",
      "دراسة الملف من طرف لجنة المعادلات",
      "استلام قرار المعادلة",
    ],
  },

  // ---------------- السيارة والنقل ----------------
  {
    id: "carte-grise",
    cat: "transport",
    title: "البطاقة الرمادية (بطاقة السيارة)",
    sub: "عند شراء مركبة جديدة أو مستعملة",
    where: "مصلحة المرور بالولاية (الدائرة) أو مركز الفحص التقني",
    duration: "من أيام إلى أسبوعين",
    fees: "رسوم تسجيل حسب فئة المركبة",
    docs: ["فاتورة الشراء أو عقد البيع", "شهادة التأمين", "بطاقة التعريف الوطنية"],
    steps: [
      "إيداع ملف المركبة لدى مصلحة البطاقة الرمادية",
      "تسديد الرسوم المطلوبة",
      "استلام البطاقة الرمادية باسم المالك الجديد",
    ],
  },
  {
    id: "controle-technique",
    cat: "transport",
    title: "المراقبة التقنية للمركبات",
    sub: "فحص دوري إلزامي للمركبة",
    where: "مراكز المراقبة التقنية المعتمدة (EPIC / خاصة)",
    duration: "نصف يوم غالبًا",
    fees: "رسوم فحص ثابتة",
    docs: ["البطاقة الرمادية", "شهادة التأمين سارية المفعول"],
    steps: [
      "حجز موعد بمركز المراقبة التقنية",
      "إجراء الفحص الفني للمركبة",
      "استلام محضر المراقبة (مقبول أو يتطلب إصلاحًا)",
    ],
    note: "دورية المراقبة تختلف حسب عمر المركبة (سنوية غالبًا للمركبات الخاصة).",
  },

  // ---------------- الخدمة الوطنية ----------------
  {
    id: "report-service",
    cat: "national",
    title: "تأجيل الخدمة الوطنية",
    sub: "لطلبة الجامعات أو لأسباب عائلية/صحية",
    where: "مكتب الخدمة الوطنية بالدائرة أو البلدية",
    duration: "حسب دراسة الملف",
    fees: "مجانية",
    docs: ["شهادة التسجيل الجامعي (للطلبة)", "بطاقة استدعاء الخدمة الوطنية", "شهادة طبية إن اقتضى الأمر"],
    steps: [
      "إيداع طلب التأجيل مرفقًا بمبرراته لدى مكتب الخدمة الوطنية",
      "متابعة الملف حتى صدور القرار",
      "تجديد التأجيل سنويًا للطلبة عند الاقتضاء",
    ],
  },

  // ---------------- السيارة والنقل (تكملة) ----------------
  {
    id: "assurance-auto",
    cat: "transport",
    title: "تأمين السيارة",
    sub: "عقد التأمين الإلزامي لكل مركبة",
    where: "أي شركة تأمين معتمدة (وكالة محلية)",
    duration: "نفس اليوم غالبًا",
    fees: "قسط التأمين يختلف حسب الصيغة (شامل / أدنى) وقوة المركبة",
    docs: ["البطاقة الرمادية", "رخصة السياقة", "بطاقة التعريف الوطنية"],
    steps: [
      "اختيار صيغة التأمين المناسبة (أدنى إلزامي أو شامل)",
      "تقديم وثائق المركبة وصاحبها لدى وكالة التأمين",
      "دفع القسط واستلام شهادة التأمين (الملصقة الصفراء)",
    ],
    note: "التأمين الأدنى إلزامي قانونًا لكل مركبة تسير على الطريق العمومي.",
  },
  {
    id: "transport-public",
    cat: "transport",
    title: "رخصة استغلال النقل (سيارة أجرة / نقل عمومي)",
    sub: "لممارسة نشاط نقل الأشخاص أو البضائع",
    where: "مديرية النقل بالولاية",
    duration: "عدة أسابيع لدراسة الملف",
    fees: "رسوم دراسة الملف والترخيص",
    docs: ["رخصة السياقة المهنية المناسبة للفئة", "بطاقة رمادية للمركبة", "شهادة السوابق القضائية"],
    steps: [
      "إيداع طلب الرخصة لدى مديرية النقل",
      "استيفاء شروط المركبة والسائق (السن، الخبرة، الشهادات)",
      "استلام رخصة الاستغلال بعد الموافقة",
    ],
  },

  // ---------------- الصحة ----------------
  {
    id: "chifa",
    cat: "sante",
    title: "بطاقة الشفاء الإلكترونية (Chifa)",
    sub: "لاسترجاع مصاريف العلاج والأدوية آليًا",
    where: "وكالة CNAS التابعة لمكان العمل أو الإقامة",
    duration: "بضعة أسابيع لاستلام البطاقة بعد الطلب",
    fees: "مجانية (ضمن اشتراكات الضمان الاجتماعي)",
    docs: ["شهادة الانخراط في الضمان الاجتماعي", "شهادة الميلاد", "صورة شمسية"],
    steps: [
      "التأكد من التصريح بالعامل أو التبعية العائلية لدى CNAS",
      "إيداع طلب بطاقة Chifa بالوكالة أو عبر الموقع الإلكتروني",
      "استلام البطاقة واستعمالها لدى الصيدليات والأطباء المتعاقدين",
    ],
  },
  {
    id: "carnet-sante",
    cat: "sante",
    title: "الدفتر الصحي للطفل والتلقيحات",
    sub: "متابعة صحة الطفل واللقاحات الإلزامية",
    where: "قاعة العلاج أو المستشفى العمومي عند الولادة",
    duration: "يُسلّم عند الولادة مباشرة",
    fees: "مجانية، واللقاحات ضمن البرنامج الوطني مجانية",
    docs: ["شهادة الميلاد"],
    steps: [
      "استلام الدفتر الصحي عند الولادة من المصلحة الصحية",
      "احترام روزنامة التلقيحات الإلزامية حسب سن الطفل",
      "تحيين الدفتر عند كل زيارة طبية أو تلقيح",
    ],
  },
  {
    id: "evacuation-sanitaire",
    cat: "sante",
    title: "الإحالة للعلاج بالخارج (الإجلاء الصحي)",
    sub: "لحالات مرضية لا يتوفر علاجها بالجزائر",
    where: "اللجنة الطبية الولائية ثم اللجنة الوطنية بوزارة الصحة",
    duration: "تختلف حسب استعجالية الحالة",
    fees: "تكفل جزئي أو كلي من الدولة حسب قرار اللجنة",
    docs: ["ملف طبي كامل ومحيّن", "تقرير من طبيب مختص يثبت غياب العلاج محليًا"],
    steps: [
      "تكوين ملف طبي لدى المستشفى المعالج",
      "عرض الملف على اللجنة الطبية الولائية للموافقة المبدئية",
      "تحويل الملف للجنة الوطنية بوزارة الصحة للبت النهائي",
    ],
  },

  // ---------------- الحج والعمرة والأوقاف ----------------
  {
    id: "hadj",
    cat: "religion",
    title: "التسجيل لأداء فريضة الحج",
    sub: "عبر الديوان الوطني للحج والعمرة",
    where: "منصة الديوان الإلكترونية أو مقرّاته بالولايات",
    duration: "حسب حملة التسجيل السنوية وقرعة التخصيص",
    fees: "تكلفة الرحلة تُحدَّد سنويًا من الديوان",
    docs: ["بطاقة التعريف الوطنية أو جواز السفر", "شهادة طبية للياقة", "الدفع المسبق حسب الصيغة المختارة"],
    steps: [
      "التسجيل في فترة الاكتتاب السنوية عبر منصة الديوان",
      "دفع المبلغ المطلوب حسب الصيغة (عادية / خاصة)",
      "المشاركة في القرعة إذا فاق عدد المسجَّلين الحصة المخصصة",
      "استكمال الوثائق الصحية والسفر قبل الموسم",
    ],
  },
  {
    id: "omra",
    cat: "religion",
    title: "التسجيل لأداء العمرة",
    sub: "عبر وكالات سياحية وحج معتمدة",
    where: "وكالات سفر معتمدة من الديوان الوطني للحج والعمرة",
    duration: "حسب برنامج الوكالة المختارة",
    fees: "تختلف حسب الوكالة والموسم",
    docs: ["جواز سفر ساري المفعول", "شهادة تلقيح (حسب الاشتراطات الصحية السعودية)", "تأشيرة عمرة"],
    steps: [
      "اختيار وكالة معتمدة من القائمة الرسمية للديوان",
      "دفع تكلفة البرنامج واستكمال ملف التأشيرة",
      "استلام التأشيرة والسفر ضمن الفوج المحدد",
    ],
  },
  {
    id: "waqf",
    cat: "religion",
    title: "تسجيل ملف وقف (وقف عقاري أو خيري)",
    sub: "لتخصيص ملك لأغراض دينية أو خيرية دائمة",
    where: "مديرية الشؤون الدينية والأوقاف بالولاية",
    duration: "عدة أسابيع لدراسة الملف",
    fees: "رسوم توثيق العقد",
    docs: ["سند ملكية العقار", "عقد الوقف الموثّق", "بطاقة التعريف الوطنية للواقف"],
    steps: [
      "تحرير عقد الوقف لدى الموثق بتحديد وجه الوقف والمستفيدين",
      "إيداع نسخة من العقد لدى مديرية الشؤون الدينية للتسجيل",
      "متابعة تسيير الوقف حسب الشروط المحددة في العقد",
    ],
  },

  // ---------------- البنوك والمال ----------------
  {
    id: "ccp",
    cat: "banque",
    title: "فتح حساب بريدي (CCP)",
    sub: "الحساب الجاري البريدي لدى بريد الجزائر",
    where: "أي مكتب بريد",
    duration: "نفس اليوم غالبًا",
    fees: "مجانية أو رسوم رمزية للدفتر",
    docs: ["بطاقة التعريف الوطنية", "شهادة الإقامة", "صورة شمسية"],
    steps: [
      "التوجه لأقرب مكتب بريد بالوثائق المطلوبة",
      "ملء استمارة فتح الحساب",
      "استلام دفتر الصكوك البريدية (أو بطاقة الذهبية) بعد المعالجة",
    ],
  },
  {
    id: "compte-bancaire",
    cat: "banque",
    title: "فتح حساب بنكي",
    sub: "لدى بنك عمومي أو خاص",
    where: "أي وكالة بنكية",
    duration: "من يوم إلى بضعة أيام",
    fees: "حسب سياسة كل بنك (قد تكون مجانية للحساب الجاري البسيط)",
    docs: ["بطاقة التعريف الوطنية", "شهادة الإقامة", "شهادة عمل أو مصدر الدخل", "صورة شمسية"],
    steps: [
      "اختيار البنك ونوع الحساب المناسب",
      "إيداع الملف وتوقيع اتفاقية فتح الحساب",
      "استلام دفتر الشيكات و/أو البطاقة البنكية",
    ],
  },
  {
    id: "heritage-transfer",
    cat: "banque",
    title: "تحويل الميراث (للمقيمين والمغتربين)",
    sub: "نقل أو تحويل أموال أو ممتلكات موروثة",
    where: "الموثق لتحرير عقد الوراثة، ثم البنك أو مصلحة الصرف للتحويل",
    duration: "تختلف حسب تعقيد التركة",
    fees: "رسوم توثيق ورسوم تحويل حسب المبلغ",
    docs: ["الفريضة الشرعية (إعلام وراثة)", "شهادة وفاة المورِّث", "وثائق ملكية التركة"],
    steps: [
      "استخراج الفريضة الشرعية (إعلام الوراثة) من المحكمة أو الموثق",
      "تصفية التركة وتوزيع الحصص بين الورثة",
      "لتحويل الأموال بالخارج: إيداع طلب لدى البنك مرفقًا بوثائق التركة والموافقات اللازمة",
    ],
  },

  // ---------------- الأسرة والعدالة ----------------
  {
    id: "divorce",
    cat: "justice",
    title: "الطلاق أو الخلع",
    sub: "إنهاء العلاقة الزوجية عبر المحكمة",
    where: "محكمة قسم شؤون الأسرة التابعة لمحل الزوجية",
    duration: "من عدة أشهر حسب نوع الدعوى (اتفاق أو نزاع)",
    fees: "رسوم قضائية وأتعاب محاماة إن وُجدت",
    docs: ["عقد الزواج", "بطاقتا التعريف الوطنية", "الدفتر العائلي"],
    steps: [
      "إيداع عريضة افتتاح الدعوى لدى أمانة ضبط المحكمة",
      "جلسات الصلح الإلزامية أمام القاضي",
      "صدور الحكم بالطلاق أو الخلع وتسجيله بالحالة المدنية",
    ],
  },
  {
    id: "garde-pension",
    cat: "justice",
    title: "الحضانة والنفقة",
    sub: "تحديد حضانة الأبناء ونفقتهم بعد الانفصال",
    where: "محكمة قسم شؤون الأسرة",
    duration: "أسابيع إلى أشهر حسب الملف",
    fees: "رسوم قضائية رمزية",
    docs: ["حكم الطلاق (إن وُجد)", "شهادات ميلاد الأبناء", "إثبات دخل الطرفين"],
    steps: [
      "إيداع دعوى الحضانة أو النفقة لدى المحكمة",
      "حضور جلسات النظر في الدعوى",
      "صدور الحكم وتنفيذه (قد يشمل النفقة الشهرية وحق الزيارة)",
    ],
  },

  // ---------------- الفلاحة ----------------
  {
    id: "carte-fellah",
    cat: "agriculture",
    title: "بطاقة الفلاح والامتياز الفلاحي",
    sub: "للاستفادة من أراضي الدولة الفلاحية والدعم",
    where: "مديرية المصالح الفلاحية (DSA) بالولاية، وديوان الأراضي الفلاحية",
    duration: "عدة أشهر لدراسة ملف الامتياز",
    fees: "رسوم إيجارية سنوية رمزية على عقد الامتياز",
    docs: ["شهادة الميلاد", "شهادة تكوين أو خبرة فلاحية", "مخطط الأرض المطلوبة"],
    steps: [
      "إيداع طلب الامتياز لدى مديرية المصالح الفلاحية",
      "دراسة الملف من طرف اللجنة المختصة",
      "توقيع عقد الامتياز الفلاحي واستلام بطاقة الفلاح",
    ],
  },
  {
    id: "forage-agricole",
    cat: "agriculture",
    title: "رخصة حفر بئر أو استغلال مورد مائي فلاحي",
    sub: "لاستعمال المياه الجوفية في السقي الفلاحي",
    where: "مديرية الموارد المائية بالولاية",
    duration: "عدة أسابيع",
    fees: "رسوم دراسة الملف",
    docs: ["سند ملكية أو حيازة الأرض", "دراسة تقنية للموقع (حسب الحجم)"],
    steps: [
      "إيداع طلب الترخيص لدى مديرية الموارد المائية",
      "معاينة الموقع من طرف المصالح التقنية",
      "استلام رخصة الحفر أو الاستغلال",
    ],
  },

  // ---------------- الجمعيات والحياة المدنية ----------------
  {
    id: "creation-association",
    cat: "associations",
    title: "تأسيس جمعية",
    sub: "إنشاء جمعية محلية أو وطنية ذات طابع اجتماعي أو ثقافي أو رياضي",
    where: "البلدية (جمعية محلية) أو الولاية أو الوزارة الوصية حسب نطاق الجمعية",
    duration: "عدة أسابيع لدراسة الملف والحصول على وصل الإيداع",
    fees: "مجانية غالبًا",
    docs: ["القانون الأساسي للجمعية", "محضر الجمعية العامة التأسيسية", "قائمة الأعضاء المؤسسين وبطاقات تعريفهم"],
    steps: [
      "عقد الجمعية العامة التأسيسية وتحرير القانون الأساسي",
      "إيداع الملف لدى الجهة المختصة (بلدية / ولاية / وزارة)",
      "الحصول على وصل الإيداع الذي يخوّل ممارسة النشاط",
    ],
  },
  {
    id: "renouvellement-association",
    cat: "associations",
    title: "تجديد أو تحيين مكتب الجمعية",
    sub: "بعد كل جمعية عامة انتخابية لتجديد الهياكل",
    where: "نفس الجهة التي تم لديها التأسيس",
    duration: "بضعة أسابيع",
    fees: "مجانية",
    docs: ["محضر الجمعية العامة الانتخابية", "قائمة أعضاء المكتب الجديد"],
    steps: [
      "عقد الجمعية العامة الانتخابية وتحرير المحضر",
      "إيداع المحضر لدى الجهة الوصية لتحيين الملف",
      "استلام وصل الإيداع المحيّن",
    ],
  },

  // ---------------- الأعمال والاستثمار والصناعة (تكملة) ----------------
  {
    id: "aapi-investissement",
    cat: "affaires",
    title: "تصريح أو شهادة الاستثمار (AAPI)",
    sub: "تسجيل مشروع استثماري لدى الوكالة الجزائرية لترقية الاستثمار",
    where: "الشباك الوحيد للوكالة الجزائرية لترقية الاستثمار (AAPI) بالولاية",
    duration: "أيام معدودة للتصريح الإلكتروني، وأطول لدراسة الامتيازات",
    fees: "مجانية للتسجيل، رسوم حسب الامتيازات المطلوبة",
    docs: ["السجل التجاري أو مشروع تأسيس الشركة", "دراسة الجدوى للمشروع", "بطاقة التعريف الوطنية للمستثمر"],
    steps: [
      "التسجيل عبر المنصة الإلكترونية لـ AAPI",
      "إيداع ملف المشروع لدى الشباك الوحيد",
      "الحصول على شهادة التسجيل وامتيازات الاستثمار إن وُجدت",
    ],
    note: "الوكالة الجزائرية لترقية الاستثمار (AAPI) هي الجهة التي عوّضت الوكالة الوطنية لتطوير الاستثمار (ANDI) سابقًا.",
  },
  {
    id: "carte-exportateur",
    cat: "affaires",
    title: "بطاقة المتعامل المصدّر",
    sub: "لممارسة نشاط التصدير خارج الجزائر",
    where: "الغرفة الجزائرية للتجارة والصناعة (CACI) ومصالح الجمارك",
    duration: "عدة أسابيع",
    fees: "رسوم تسجيل حسب النشاط",
    docs: ["السجل التجاري", "البطاقة الجبائية NIF", "شهادة منشأ المنتوج المصدَّر"],
    steps: [
      "استكمال السجل التجاري بنشاط التصدير",
      "التسجيل لدى الغرفة الجزائرية للتجارة والصناعة",
      "استكمال إجراءات التصريح الجمركي عند كل عملية تصدير",
    ],
  },

  // ---------------- التربية والتعليم والتكوين ----------------
  {
    id: "inscription-rawda",
    cat: "education",
    title: "التسجيل بالروضة (التحضيري)",
    sub: "تسجيل الطفل بالسنة التحضيرية قبل الابتدائي",
    where: "الروضات العمومية التابعة للتربية الوطنية أو روضات خاصة معتمدة",
    duration: "خلال فترة التسجيلات السنوية قبل الدخول المدرسي",
    fees: "مجانية بالعمومي، رسوم شهرية بالخاص",
    docs: ["شهادة الميلاد", "شهادة التلقيحات", "شهادة السكن"],
    steps: [
      "التوجه للروضة القريبة من السكن خلال حملة التسجيلات",
      "إيداع ملف الطفل (السن المطلوب 5 سنوات غالبًا للتحضيري)",
      "تأكيد التسجيل قبل الدخول المدرسي",
    ],
  },
  {
    id: "inscription-scolaire",
    cat: "education",
    title: "التسجيل بالطور الابتدائي والمتوسط والثانوي",
    sub: "التسجيل الأول بالسنة الأولى ابتدائي، والتسجيلات المتتالية والتحويلات",
    where: "المدرسة أو المؤسسة التابعة للخريطة المدرسية لمكان السكن",
    duration: "خلال حملة التسجيلات التي تسبق الدخول المدرسي",
    fees: "مجانية في التعليم العمومي",
    docs: ["شهادة الميلاد", "شهادة السكن", "كشف النقاط أو شهادة الانتقال (للتحويل)"],
    steps: [
      "التوجه للمؤسسة التابعة لمنطقة السكن حسب الخريطة المدرسية",
      "إيداع ملف التسجيل (أو التحويل من مؤسسة أخرى)",
      "استلام تأكيد التسجيل قبل الدخول المدرسي",
    ],
  },
  {
    id: "ecole-privee",
    cat: "education",
    title: "اعتماد مدرسة أو مؤسسة تعليم خاصة",
    sub: "فتح مؤسسة تعليمية خاصة (ابتدائي، متوسط، ثانوي)",
    where: "مديرية التربية بالولاية ثم وزارة التربية الوطنية للاعتماد النهائي",
    duration: "عدة أشهر لدراسة الملف والمطابقة",
    fees: "رسوم دراسة الملف",
    docs: [
      "دراسة تقنية للمحل (مطابقة معايير السلامة والمساحة)",
      "الشهادات العلمية والمهنية لطاقم التدريس والإدارة",
      "السجل التجاري أو النظام الأساسي للمؤسسة",
    ],
    steps: [
      "إيداع ملف طلب الاعتماد لدى مديرية التربية بالولاية",
      "معاينة المحل من طرف اللجنة التقنية المختصة",
      "الحصول على الاعتماد الرسمي قبل استقبال التلاميذ",
    ],
  },
  {
    id: "formation-pro",
    cat: "education",
    title: "التكوين المهني (CFPA / INSFP)",
    sub: "التسجيل في التكوين المهني المتخصص",
    where: "مراكز التكوين المهني والتمهين (CFPA) أو المعاهد المتخصصة (INSFP)",
    duration: "حسب فترات التسجيل السنوية (دورات سبتمبر وفيفري غالبًا)",
    fees: "رمزية بالعمومي",
    docs: ["شهادة الميلاد أو المستوى الدراسي", "شهادة السكن", "صور شمسية"],
    steps: [
      "اختيار التخصص المتاح بالمركز الأقرب",
      "إيداع ملف التسجيل خلال الحملة السنوية",
      "اجتياز مقابلة أو اختبار قبول إن وُجد",
      "بداية التكوين (حضوري أو بالتمهين لدى مؤسسة)",
    ],
  },
  {
    id: "institut-prive",
    cat: "education",
    title: "اعتماد معهد أو مركز تكوين خاص",
    sub: "لفتح مركز تكوين مهني أو معهد خاص",
    where: "مديرية التكوين والتعليم المهنيين بالولاية",
    duration: "عدة أشهر",
    fees: "رسوم دراسة الملف",
    docs: ["دراسة تقنية للمحل والتجهيزات", "برنامج التكوين المقترح", "مؤهلات الطاقم المؤطر"],
    steps: [
      "إيداع طلب الاعتماد لدى المديرية الولائية للتكوين المهني",
      "معاينة المحل والتجهيزات البيداغوجية",
      "الحصول على رخصة الفتح قبل بدء النشاط",
    ],
  },

  // ---------------- الصيد البحري والبري ----------------
  {
    id: "permis-peche-maritime",
    cat: "peche",
    title: "رخصة الصيد البحري",
    sub: "لممارسة نشاط الصيد البحري بسفينة أو كصياد بحّار",
    where: "المديرية الولائية للصيد البحري والمنتجات الصيدية",
    duration: "تُدرس من طرف لجنة محلية مختصة",
    fees: "رسوم دراسة الملف",
    docs: [
      "بطاقة التعريف الوطنية",
      "مستخرج من صحيفة السوابق القضائية (رقم 3)",
      "شهادة تسجيل السفينة (لمجهزي السفن)",
      "شهادة كفاءة مهنية بحرية",
    ],
    steps: [
      "إيداع طلب الترخيص لدى المديرية الولائية للصيد البحري",
      "دراسة الملف من طرف اللجنة المحلية المختصة",
      "استلام رخصة الصيد البحري بعد الموافقة",
    ],
    note: "ينظَّم الصيد البحري بموجب المرسوم التنفيذي رقم 03-481 المحدد لشروط ممارسة الصيد البحري.",
  },
  {
    id: "immatriculation-navire",
    cat: "peche",
    title: "تسجيل سفينة صيد (بطاقة الشحن البحري)",
    sub: "تسجيل المركب أو سفينة الصيد في السجل البحري",
    where: "مصلحة الملاحة البحرية بالميناء المختص",
    duration: "عدة أسابيع",
    fees: "رسوم تسجيل وطابع بحري",
    docs: ["فاتورة شراء أو بناء السفينة", "شهادة الصلاحية للملاحة", "بطاقة التعريف الوطنية للمالك"],
    steps: [
      "معاينة السفينة من طرف مصلحة الملاحة البحرية",
      "إيداع ملف التسجيل بالسجل البحري",
      "استلام بطاقة تسجيل السفينة (رقم النداء البحري)",
    ],
  },
  {
    id: "permis-chasse",
    cat: "peche",
    title: "رخصة الصيد البري",
    sub: "لممارسة صيد الطرائد المسموح بها موسميًا",
    where: "مديرية الصيد أو مصالح الغابات بالولاية، بالتنسيق مع الجمعية الجهوية للصيادين",
    duration: "قبل افتتاح موسم الصيد السنوي (يُعلن عنه رسميًا كل خريف)",
    fees: "رسوم الرخصة ورسوم الانخراط بالجمعية",
    docs: [
      "الانخراط في جمعية جهوية للصيادين",
      "مستخرج من صحيفة السوابق القضائية",
      "شهادة طبية تثبت اللياقة لممارسة الصيد",
      "رخصة حمل سلاح صيد سارية المفعول (للصيد بالبندقية)",
      "عقد تأمين ضد أخطار قد تلحق بالغير",
    ],
    steps: [
      "الانخراط في جمعية صيادين معتمدة",
      "تكوين ملف طلب الرخصة قبل بداية الموسم",
      "إيداع الملف لدى الجهة المختصة (الولاية/الغابات) ودفع الرسوم",
      "استلام رخصة الصيد قبل تاريخ افتتاح الموسم",
    ],
    note: "ينظَّم الصيد البري بموجب القانون 04-07 والمرسوم التنفيذي 06-442، وتاريخ افتتاح الموسم يُحدَّد سنويًا بقرار وزاري.",
  },

  // ---------------- الغابات ----------------
  {
    id: "exploitation-forestiere",
    cat: "forets",
    title: "رخصة استغلال المنتوجات الغابية",
    sub: "لجمع الحطب أو الفلين أو النباتات من الأملاك الغابية",
    where: "المحافظة السامية للغابات (المديرية الولائية للغابات)",
    duration: "عدة أسابيع لدراسة الملف",
    fees: "معلوم استغلال حسب نوع المنتوج والكمية",
    docs: ["طلب مرفق بتحديد المنطقة والمنتوج المطلوب", "بطاقة التعريف الوطنية"],
    steps: [
      "إيداع طلب الاستغلال لدى مصالح الغابات بالولاية",
      "معاينة الموقع وتحديد الكمية المسموح بها",
      "دفع المعلوم واستلام رخصة الاستغلال",
    ],
  },
  {
    id: "concession-forestiere",
    cat: "forets",
    title: "الامتياز السياحي أو الرعوي بالأملاك الغابية",
    sub: "لاستغلال مساحة غابية لنشاط سياحي أو رعوي",
    where: "المديرية الولائية للغابات",
    duration: "عدة أشهر لدراسة الملف",
    fees: "إتاوة سنوية حسب المساحة والنشاط",
    docs: ["دراسة المشروع المقترح", "مخطط تحديد الموقع", "بطاقة التعريف الوطنية أو وثائق الشركة"],
    steps: [
      "إيداع ملف طلب الامتياز لدى مديرية الغابات",
      "دراسة الملف من طرف اللجنة المختصة",
      "توقيع عقد الامتياز عند الموافقة",
    ],
  },

  // ---------------- الشباب والرياضة ----------------
  {
    id: "agrement-club-sportif",
    cat: "jeunesse",
    title: "اعتماد نادٍ أو جمعية رياضية",
    sub: "لتأسيس نادٍ رياضي هاوٍ في أي تخصص",
    where: "مديرية الشباب والرياضة بالولاية",
    duration: "عدة أسابيع",
    fees: "مجانية غالبًا",
    docs: ["القانون الأساسي للنادي", "محضر التأسيس", "قائمة الأعضاء المؤسسين"],
    steps: [
      "عقد الجمعية العامة التأسيسية للنادي",
      "إيداع الملف لدى مديرية الشباب والرياضة",
      "الحصول على الاعتماد والانخراط في الرابطة أو الاتحادية المعنية",
    ],
  },
  {
    id: "licence-sportive",
    cat: "jeunesse",
    title: "الرخصة الرياضية (بطاقة الرياضي)",
    sub: "لممارسة رياضة تنافسية منظمة ضمن نادٍ",
    where: "النادي المنخرط فيه الرياضي، ثم الرابطة الولائية للاتحادية المعنية",
    duration: "بضعة أيام بعد الفحص الطبي",
    fees: "رسوم رمزية سنوية",
    docs: ["شهادة طبية تثبت القدرة على ممارسة الرياضة", "شهادة الانخراط بالنادي", "صورة شمسية"],
    steps: [
      "الانخراط بنادٍ معتمد",
      "إجراء الفحص الطبي الرياضي",
      "إيداع الملف لدى الرابطة لاستخراج الرخصة",
    ],
  },
  {
    id: "camps-jeunesse",
    cat: "jeunesse",
    title: "الاستفادة من مخيمات ودور الشباب",
    sub: "برامج المخيمات الصيفية ودور الشباب التابعة لوزارة الشباب والرياضة",
    where: "دار الشباب أو مديرية الشباب والرياضة بالولاية",
    duration: "حسب برنامج كل موسم (صيفي غالبًا)",
    fees: "رمزية أو مجانية حسب البرنامج",
    docs: ["شهادة الميلاد", "شهادة مدرسية أو جامعية (لفئة الطلبة)"],
    steps: [
      "التسجيل لدى دار الشباب أو عبر الحملة السنوية للمخيمات",
      "استكمال الملف الصحي والإداري",
      "الالتحاق بالبرنامج في التاريخ المحدد",
    ],
  },

  // ---------------- الطاقة ----------------
  {
    id: "raccordement-energie",
    cat: "energie",
    title: "ربط السكن بالكهرباء والغاز الطبيعي",
    sub: "طلب التوصيل الجديد عبر سونلغاز",
    where: "الوكالة التجارية لسونلغاز التابعة لمنطقة السكن",
    duration: "من عدة أسابيع إلى أشهر حسب بُعد الموقع عن الشبكة",
    fees: "تكلفة الربط تختلف حسب المسافة ونوع التوصيل",
    docs: ["سند ملكية أو عقد إيجار السكن", "رخصة البناء أو شهادة المطابقة", "بطاقة التعريف الوطنية"],
    steps: [
      "إيداع طلب الربط لدى الوكالة التجارية لسونلغاز",
      "دفع تسبيق التوصيل حسب التعريفة",
      "إنجاز الأشغال وتركيب العداد من طرف مصالح سونلغاز",
    ],
  },
  {
    id: "energie-renouvelable",
    cat: "energie",
    title: "رخصة استغلال محطة طاقة متجددة (شمسية)",
    sub: "لتركيب ألواح شمسية بقدرة تستوجب ترخيصًا أو للربط بالشبكة",
    where: "مصالح سونلغاز والجهات المختصة بوزارة الطاقة حسب قدرة المحطة",
    duration: "تختلف حسب حجم المشروع (فردي أو صناعي)",
    fees: "حسب دراسة الملف",
    docs: ["مخطط تقني للمحطة", "دراسة المطابقة لمعايير الربط بالشبكة"],
    steps: [
      "إيداع طلب الربط أو الترخيص لدى الجهة المختصة حسب قدرة المحطة",
      "دراسة المطابقة التقنية",
      "الحصول على الموافقة قبل التركيب أو الربط بالشبكة",
    ],
    note: "الإجراءات والعتبات التقنية للطاقة المتجددة الفردية تُحدَّث بانتظام؛ يُنصح بالتأكد من آخر التنظيمات لدى سونلغاز قبل الشروع في المشروع.",
  },

  // ---------------- الأسرة والعدالة (تكملة) ----------------
  {
    id: "requete-plainte",
    cat: "justice",
    title: "تحرير عريضة أو شكوى قضائية",
    sub: "افتتاح دعوى مدنية أو تقديم شكوى جزائية",
    where: "أمانة ضبط المحكمة المختصة (مدنية) أو مركز الشرطة/الدرك (جزائية)",
    duration: "الإيداع فوري، ومدة الفصل تختلف حسب نوع القضية",
    fees: "رسوم قضائية رمزية للدعاوى المدنية، الشكوى الجزائية مجانية",
    docs: ["بطاقة التعريف الوطنية", "الوثائق المثبتة للحق أو الضرر", "محضر معاينة إن وُجد"],
    steps: [
      "تحرير العريضة أو الشكوى بذكر الوقائع والمطالب بدقة",
      "إيداعها لدى أمانة ضبط المحكمة (مدني) أو مصلحة الأمن المختصة (جزائي)",
      "متابعة سير الدعوى أو الشكوى حتى صدور القرار",
    ],
  },
  {
    id: "mediateur-republique",
    cat: "justice",
    title: "الشكوى لدى وسيط الجمهورية",
    sub: "للتظلم من قرار أو تجاوز إداري تعذّر حله بالطرق العادية",
    where: "مصالح وسيط الجمهورية (مكاتب مركزية وجهوية)",
    duration: "تختلف حسب طبيعة الملف",
    fees: "مجانية",
    docs: ["نسخة من المراسلات أو القرار الإداري محل التظلم", "بطاقة التعريف الوطنية"],
    steps: [
      "التأكد من استنفاد طرق التظلم العادية لدى الإدارة المعنية أولاً",
      "إيداع الشكوى لدى مصالح وسيط الجمهورية مع شرح الوقائع",
      "متابعة الملف حتى الرد أو التوصية الصادرة",
    ],
  },
  {
    id: "recours-administratif",
    cat: "justice",
    title: "الطعن أمام المحكمة الإدارية",
    sub: "للنزاعات مع الإدارة (قرارات البلدية، الولاية، المؤسسات العمومية...)",
    where: "المحكمة الإدارية المختصة إقليميًا",
    duration: "عدة أشهر غالبًا",
    fees: "رسوم قضائية",
    docs: ["نسخة من القرار الإداري المطعون فيه", "إثبات التظلم المسبق للإدارة إن اقتضى الأمر", "بطاقة التعريف الوطنية"],
    steps: [
      "التظلم المسبق لدى الجهة الإدارية مصدرة القرار (عند الاقتضاء)",
      "إيداع عريضة الطعن لدى المحكمة الإدارية خلال الآجال القانونية",
      "متابعة الدعوى حتى صدور الحكم",
    ],
  },

  // ---------------- الجمعيات والنقابات (تكملة) ----------------
  {
    id: "creation-syndicat",
    cat: "associations",
    title: "تأسيس نقابة مهنية",
    sub: "لتنظيم منتسبي مهنة أو قطاع نشاط للدفاع عن مصالحهم",
    where: "مديرية العمل بالولاية (نقابة محلية) أو وزارة العمل (نقابة وطنية)",
    duration: "عدة أسابيع لدراسة الملف",
    fees: "مجانية",
    docs: ["القانون الأساسي للنقابة", "محضر الجمعية العامة التأسيسية", "قائمة الأعضاء المؤسسين ومهنهم"],
    steps: [
      "عقد الجمعية العامة التأسيسية للنقابة",
      "إيداع الملف لدى مديرية العمل أو الوزارة حسب النطاق",
      "الحصول على وصل التسجيل الذي يخوّل ممارسة النشاط النقابي",
    ],
  },

  // ---------------- الجالية بالخارج ----------------
  {
    id: "inscription-consulaire",
    cat: "expat",
    title: "التسجيل القنصلي",
    sub: "واجب على كل مقيم جزائري بالخارج، يمنح الحماية القنصلية",
    where: "القنصلية أو السفارة الجزائرية التابعة لمكان الإقامة",
    duration: "جلسة واحدة غالبًا؛ البطاقة صالحة 5 سنوات",
    fees: "مجانية",
    docs: [
      "جواز السفر أو بطاقة التعريف الوطنية",
      "شهادة ميلاد حديثة (نسخة S12)",
      "شهادة الجنسية الجزائرية",
      "إثبات الإقامة القانونية في بلد الاستقبال",
      "عقد الزواج والدفتر العائلي (للمتزوجين)",
      "4 صور شمسية",
    ],
    forExpats: true,
    steps: [
      "تعبئة استمارة التسجيل القنصلي (متوفرة بموقع البعثة)",
      "الحضور شخصيًا لإيداع الملف بالقنصلية",
      "استلام بطاقة التسجيل القنصلي مجانًا",
      "تجديد التسجيل عند انتهاء الصلاحية أو تغيير الإقامة",
    ],
    note: "التسجيل القنصلي ضروري للاستفادة من كل الخدمات القنصلية اللاحقة (جواز، توكيل، حماية...).",
  },
  {
    id: "passeport-etranger",
    cat: "expat",
    title: "جواز السفر البيومتري من الخارج",
    sub: "استخراج أو تجديد الجواز عبر القنصلية",
    where: "المصلحة القنصلية لمكان الإقامة",
    duration: "أطول عادة من الجزائر، وتختلف حسب البعثة",
    fees: "رسوم الطابع بعملة بلد الإقامة",
    docs: [
      "التسجيل القنصلي ساري المفعول",
      "مستخرج من عقد الميلاد رقم 12-خ",
      "4 صور شمسية",
      "الجواز القديم",
    ],
    forExpats: true,
    steps: [
      "التسجيل والتعبئة عبر منصة passeport.interieur.gov.dz",
      "حجز موعد بالمصلحة القنصلية",
      "الحضور لإيداع الملف وأخذ البصمات",
      "استلام الجواز بحضور شخصي عند الجاهزية",
    ],
  },
  {
    id: "cin-etranger",
    cat: "expat",
    title: "بطاقة التعريف الوطنية من الخارج",
    sub: "استخراج أو تجديد البطاقة البيومترية عبر القنصلية",
    where: "المصلحة القنصلية لمكان الإقامة",
    duration: "تختلف حسب حجم الطلبات بالبعثة",
    fees: "مجانية للاستخراج الأول",
    docs: ["التسجيل القنصلي", "مستخرج عقد الميلاد رقم 12", "4 صور شمسية"],
    forExpats: true,
    steps: [
      "إيداع الطلب لدى المصلحة القنصلية",
      "أخذ البصمات والصورة الرقمية",
      "استلام البطاقة عند الجاهزية بحضور شخصي",
    ],
  },
  {
    id: "mariage-mixte",
    cat: "expat",
    title: "عقد الزواج المختلط والمصادقة على الوثائق",
    sub: "زواج جزائري(ة) من أجنبي(ة) وتوثيق العقد لدى القنصلية",
    where: "القنصلية الجزائرية أو الجهة الأجنبية المختصة ثم التأشير القنصلي",
    duration: "عدة أسابيع حسب البلد",
    fees: "رسوم مصادقة",
    docs: [
      "شهادة الميلاد للزوجين",
      "شهادة عدم المانع من الزواج (Certificat de coutume)",
      "شهادة الإقامة",
      "وثيقة الزواج الأجنبية (في حالة إتمامه محليًا) لتسجيلها لاحقًا بالجزائر",
    ],
    forExpats: true,
    steps: [
      "الحصول على شهادة عدم المانع من القنصلية إذا تم الزواج في الخارج",
      "إتمام إجراءات الزواج وفق قانون بلد الإقامة",
      "تسجيل عقد الزواج لدى القنصلية لنقله لاحقًا إلى الحالة المدنية بالجزائر",
    ],
  },
  {
    id: "equivalence-etranger",
    cat: "expat",
    title: "معادلة الشهادات الأجنبية للمغتربين",
    sub: "معادلة شهادة تحصّل عليها المغترب في بلد الإقامة",
    where: "وزارة التعليم العالي أو التربية الوطنية بالجزائر (عبر ملف يُودع مباشرة أو بواسطة ممثل)",
    duration: "عدة أشهر",
    fees: "رسوم دراسة الملف",
    docs: ["نسخة مصادق عليها ومترجمة من الشهادة", "كشوف النقاط", "برنامج الدراسة إن طُلب"],
    forExpats: true,
    steps: [
      "تصديق الشهادة من الجهات الرسمية ببلد الإقامة والقنصلية الجزائرية",
      "ترجمة الوثائق رسميًا للعربية أو الفرنسية",
      "إيداع الملف لدى لجنة المعادلات المختصة بالجزائر",
    ],
  },
  {
    id: "procuration",
    cat: "expat",
    title: "التوكيل القنصلي",
    sub: "توكيل شخص بالجزائر لإنجاز إجراء إداري نيابة عن المغترب",
    where: "المصلحة القنصلية لمكان الإقامة",
    duration: "جلسة واحدة",
    fees: "رسوم تصديق",
    docs: ["جواز السفر أو بطاقة التعريف", "بيانات الشخص الموكَّل الكاملة", "موضوع التوكيل بدقة"],
    forExpats: true,
    steps: [
      "تحديد موعد بالقنصلية أو الحضور في أوقات الاستقبال",
      "تحرير نص التوكيل أمام الموظف القنصلي",
      "التوقيع والتصديق، ثم إرسال أو تسليم نسخة للموكَّل بالجزائر",
    ],
  },
  {
    id: "vote-etranger",
    cat: "expat",
    title: "التسجيل في القوائم الانتخابية بالخارج",
    sub: "للمشاركة في الانتخابات من بلد الإقامة",
    where: "المصلحة القنصلية",
    duration: "خلال فترات التسجيل التي تُعلن عنها السلطات",
    fees: "مجانية",
    docs: ["التسجيل القنصلي ساري المفعول", "جواز السفر أو بطاقة التعريف"],
    forExpats: true,
    steps: [
      "التأكد من التسجيل القنصلي أولاً (شرط أساسي)",
      "التسجيل في القائمة الانتخابية الخاصة بالجالية لدى القنصلية",
      "التصويت يوم الاقتراع بمركز التصويت التابع للبعثة",
    ],
  },
  {
    id: "vehicule-import",
    cat: "expat",
    title: "جلب سيارة من الخارج والإعفاءات الجمركية",
    sub: "شروط استفادة المغتربين من تسهيلات استيراد المركبات",
    where: "مصالح الجمارك الجزائرية عند نقاط الدخول (ميناء/مطار)",
    duration: "يُنجز إجراء التخليص الجمركي عند الدخول",
    fees: "قد تشمل رسوم جمركية جزئية أو إعفاء حسب الشروط والقوانين السارية",
    docs: [
      "وثيقة ملكية المركبة",
      "إثبات الإقامة بالخارج لمدة معينة",
      "التسجيل القنصلي",
      "وثائق التأمين والجمركة",
    ],
    forExpats: true,
    steps: [
      "التحقق من الشروط والسقوف الجمركية السارية حاليًا قبل السفر",
      "تجهيز وثائق ملكية المركبة والإقامة",
      "التصريح الجمركي عند نقطة الدخول للجزائر",
      "استكمال إجراءات البطاقة الرمادية بعد الدخول",
    ],
    note: "الشروط والإعفاءات الجمركية تُحدَّث بقوانين المالية سنويًا، يُنصح بالتأكد من آخر التحيينات رسميًا قبل الشروع في الإجراء.",
  },
  {
    id: "transfert-corps",
    cat: "expat",
    title: "نقل جثمان متوفى من الخارج إلى الجزائر",
    sub: "إجراء عاجل تنظّمه القنصلية",
    where: "المصلحة القنصلية لمكان الوفاة",
    duration: "أيام قليلة، إجراء مستعجل",
    fees: "تكاليف النقل على عاتق الأسرة غالبًا",
    docs: ["شهادة الوفاة المحلية", "تصريح تحنيط/تعليب الجثمان من جهة مؤهلة", "جواز سفر أو وثيقة تعريف المتوفى"],
    forExpats: true,
    steps: [
      "التصريح بالوفاة لدى الجهات المحلية والحصول على شهادة الوفاة",
      "الاتصال الفوري بالقنصلية الجزائرية لتنسيق الإجراءات",
      "استصدار رخصة نقل الجثمان (تسريح بنقل جثة)",
      "تنظيم النقل مع شركة مؤهلة والتنسيق مع البلدية بالجزائر لتحديد موعد الدفن",
    ],
  },
  {
    id: "digital-dzds",
    cat: "digital",
    title: "البوابة الوطنية للخدمات الرقمية (Dzair Digital Services)",
    sub: "بوابة موحدة تجمع أكثر من 52 خدمة رقمية حكومية في مكان واحد",
    where: "dzds.dz",
    duration: "خدمة دائمة عبر الإنترنت",
    fees: "الولوج مجاني (بعض الخدمات داخلها قد تتطلب رسوم)",
    docs: ["رقم التعريف الوطني (NIN)", "رقم هاتف مسجل باسمك"],
    forExpats: false,
    steps: [
      "الدخول إلى الموقع الرسمي dzds.dz",
      "إنشاء حساب جديد أو تسجيل الدخول",
      "اختيار الخدمة المطلوبة من القائمة",
      "تعبئة الطلب واتباع التعليمات الظاهرة"
    ],
    note: "الرابط الرسمي الوحيد هو dzds.dz — احذر من أي رابط آخر يُشارك عبر فيسبوك أو مواقع مشبوهة"
  },
  {
    id: "digital-baridimob",
    cat: "digital",
    title: "بريدي موب (BaridiMob) وبريدي نات",
    sub: "التطبيق الرسمي لبريد الجزائر لتسيير حساب CCP والدفع الإلكتروني",
    where: "poste.dz / تطبيق BaridiMob من المتجر الرسمي",
    duration: "التفعيل فوري بعد التسجيل بحساب CCP",
    fees: "مجاني، برسوم اشتراك شهرية رمزية حسب الخدمة",
    docs: ["حساب بريدي جاري (CCP) نشط", "رقم الهاتف المسجل بالحساب"],
    forExpats: false,
    steps: [
      "تحميل تطبيق BaridiMob من Google Play الرسمي فقط",
      "إدخال رقم الحساب البريدي (CCP) والمعلومات الشخصية",
      "تفعيل الحساب عبر رمز التحقق المرسل بالـ SMS",
      "الاستفادة من التحويلات، شحن الرصيد، ودفع الفواتير"
    ],
    note: "حمّل التطبيق فقط من المتجر الرسمي، ولا تشارك كلمة المرور مع أي شخص"
  },
  {
    id: "digital-tabioucom",
    cat: "digital",
    title: "طابعكم — دفع الطوابع الجبائية إلكترونيًا",
    sub: "منصة المديرية العامة للضرائب لشراء الطوابع الجبائية عبر الإنترنت",
    where: "tabioucom.mf.gov.dz",
    duration: "الوصل جاهز فورًا بعد الدفع",
    fees: "قيمة الطابع تختلف حسب الوثيقة المطلوبة (جواز سفر، بطاقة تعريف، رخصة سياقة...)",
    docs: ["بطاقة بنكية (ذهبية أو CIB)", "معرفة نوع الوثيقة المطلوبة"],
    forExpats: false,
    steps: [
      "الدخول إلى tabioucom.mf.gov.dz",
      "اختيار نوع الوثيقة (جواز سفر، بطاقة تعريف، رخصة سياقة)",
      "الدفع الإلكتروني بالبطاقة البنكية",
      "تحميل وطباعة وصل الطابع الجبائي الإلكتروني"
    ],
    note: "الوصل الإلكتروني يُدرج مباشرة في ملف طلب الوثيقة المعنية"
  },
  {
    id: "digital-cnas",
    cat: "digital",
    title: "الفضاء الرقمي لـ CNAS (العمال الأجراء)",
    sub: "خدمات إلكترونية للمؤمَّن اجتماعيًا: شهادات الانتساب، متابعة الملفات",
    where: "cnas.dz",
    duration: "استخراج الشهادات فوري أونلاين",
    fees: "مجاني",
    docs: ["رقم الضمان الاجتماعي", "بطاقة التعريف الوطنية"],
    forExpats: false,
    steps: [
      "الدخول إلى الموقع الرسمي cnas.dz",
      "الولوج للفضاء الشخصي أو استعمال خدمة elhanaa.cnas.dz",
      "استخراج شهادة الانتساب أو عدم الانتساب مباشرة",
      "تحميل وطباعة الوثيقة"
    ],
    note: "الخدمة موجهة للعمال الأجراء؛ غير الأجراء يستعملون CASNOS"
  },
  {
    id: "digital-casnos",
    cat: "digital",
    title: "الفضاء الرقمي لـ CASNOS (غير الأجراء)",
    sub: "التصريح بالنشاط ودفع الاشتراكات لأصحاب المهن الحرة والحرفيين",
    where: "casnos.com.dz — خدمات إلكترونية عبر damancom.casnos.dz",
    duration: "التصريح بالنشاط يجب خلال 10 أيام من بداية النشاط",
    fees: "حسب فئة النشاط؛ التأخر في التصريح يعرض لغرامة 5000 دج + 20% شهريًا",
    docs: ["السجل التجاري أو بطاقة الحرفي", "بطاقة التعريف الوطنية"],
    forExpats: false,
    steps: [
      "الدخول إلى damancom.casnos.dz",
      "إنشاء حساب أو تسجيل الدخول",
      "ملء استمارة التصريح بالنشاط",
      "متابعة الاشتراكات ودفعها إلكترونيًا"
    ],
    note: "إلزامية لكل من يمارس نشاطًا مستقلًا حتى بدون أعوان"
  },
  {
    id: "digital-cnr",
    cat: "digital",
    title: "فضاء المتقاعد — CNR",
    sub: "متابعة ملف التقاعد، معرفة قيمة المعاش، والتحقق من الوثائق",
    where: "cnr.dz و dz.cnr.dz (فضاء المتقاعد)",
    duration: "المعلومات متاحة فورًا أونلاين",
    fees: "مجاني",
    docs: ["رقم وصل استلام ملف التقاعد", "رقم الضمان الاجتماعي وبطاقة التعريف"],
    forExpats: false,
    steps: [
      "الدخول إلى www.cnr.dz",
      "اختيار 'الخدمات الإلكترونية' أو فضاء المتقاعد",
      "إدخال رقم الضمان الاجتماعي ورقم بطاقة التعريف",
      "متابعة حالة الملف أو استخراج شهادة الدخل"
    ],
    note: "يمكن أيضًا التحقق من صحة الوثائق الصادرة عن الصندوق عبر retraite.cnr.dz/#/validate"
  },
  {
    id: "digital-interieur-services",
    cat: "digital",
    title: "بوابة الخدمات الإلكترونية لوزارة الداخلية",
    sub: "أكثر من 62 إجراء إداري عن بعد: شهادات ميلاد، زواج، وفاة، وغيرها",
    where: "services.interieur.gov.dz",
    duration: "استخراج شهادات الحالة المدنية فوري أونلاين",
    fees: "مجاني لمعظم الشهادات",
    docs: ["بطاقة التعريف الوطنية البيومترية", "رقم الحالة المدنية إن وجد"],
    forExpats: false,
    steps: [
      "الدخول إلى services.interieur.gov.dz",
      "اختيار الإجراء المطلوب من القائمة",
      "إدخال المعلومات الشخصية المطلوبة",
      "استخراج الوثيقة إلكترونيًا دون تنقل"
    ],
    note: "نفس البوابة تسمح كذلك بطلب بطاقة التعريف البيومترية لحاملي جواز السفر البيومتري"
  },
  {
    id: "digital-anem",
    cat: "digital",
    title: "الوكالة الوطنية للتشغيل (ANEM) — منصة وسيط أونلاين",
    sub: "التسجيل كطالب عمل، تجديد الطلب، ومنحة البطالة",
    where: "anem.dz (الموقع الرئيسي) — البوابة الفرعية قد تتغير، تأكد من anem.dz أولًا",
    duration: "تفعيل الحساب خلال 72 ساعة كحد أقصى",
    fees: "مجاني",
    docs: ["شهادة أو مؤهل دراسي", "بطاقة التعريف الوطنية"],
    forExpats: false,
    steps: [
      "الدخول إلى anem.dz والبحث عن رابط منصة وسيط أونلاين المحدّث",
      "إنشاء حساب كطالب عمل",
      "استكمال بيانات المؤهلات والخبرة",
      "متابعة العروض وتجديد الطلب دوريًا"
    ],
    note: "⚠️ روابط البوابات الفرعية (وسيط أونلاين) تتغير أحيانًا؛ اعتمد دائمًا anem.dz كمرجع أول واحذر الصفحات المزيفة"
  },
  {
    id: "digital-anade",
    cat: "digital",
    title: "الوكالة الوطنية لدعم وتنمية المقاولاتية (ANADE)",
    sub: "دعم وتمويل حاملي المشاريع من مختلف الفئات العمرية حتى 55 سنة",
    where: "anade.dz — التسجيل عبر promoteur.anade.dz",
    duration: "دراسة الملف تستغرق عدة أسابيع حسب برنامج الدعم",
    fees: "حسب برنامج التمويل المختار (قروض بدون فائدة، تمويل ثلاثي...)",
    docs: ["دراسة جدوى المشروع", "بطاقة التعريف الوطنية", "شهادة الإقامة"],
    forExpats: false,
    steps: [
      "الدخول إلى promoteur.anade.dz",
      "إنشاء حساب كصاحب مشروع",
      "ملء ملف المشروع (الطبيعة، التكلفة، التمويل)",
      "متابعة دراسة الملف عبر الوكالة الولائية"
    ],
    note: "الوكالة كانت تُعرف سابقًا بـ ANSEJ قبل التحول إلى ANADE سنة 2020"
  },
  {
    id: "digital-cnrc",
    cat: "digital",
    title: "المركز الوطني للسجل التجاري (CNRC) — بوابة سجلكوم",
    sub: "استخراج السجل التجاري والتحقق منه إلكترونيًا",
    where: "sidjilcom.cnrc.dz — تسجيل المؤسسات عبر sidjilcom-entreprise.cnrc.dz",
    duration: "يختلف حسب نوع الإجراء (إنشاء، تعديل، شطب)",
    fees: "حسب نوع النشاط والإجراء المطلوب",
    docs: ["بطاقة التعريف الوطنية", "عقد الملكية أو الإيجار للمقر"],
    forExpats: false,
    steps: [
      "الدخول إلى sidjilcom.cnrc.dz",
      "إنشاء حساب أو تسجيل الدخول",
      "تعبئة استمارة السجل التجاري إلكترونيًا",
      "استكمال الإجراء لدى الفرع الولائي إن اقتضى الأمر"
    ],
    note: "يتيح الموقع أيضًا قارئ الكود الآمن للتحقق من صحة مستخرجات السجل التجاري"
  },
  {
    id: "digital-douane",
    cat: "digital",
    title: "المديرية العامة للجمارك — خدمات ALCES",
    sub: "التصريح الجمركي، محاكاة الرسوم، والتسجيل الفردي أو للشركات",
    where: "douane.gov.dz",
    duration: "يختلف حسب نوع العملية الجمركية",
    fees: "الرسوم الجمركية تُحسب حسب طبيعة وقيمة البضاعة المستوردة",
    docs: ["فاتورة الشراء", "بطاقة التعريف الوطنية أو السجل التجاري"],
    forExpats: false,
    steps: [
      "الدخول إلى douane.gov.dz",
      "الوصول لمنصة ALCES للخدمات الإلكترونية",
      "التسجيل الفردي أو تسجيل الشركة",
      "محاكاة الرسوم الجمركية أو إيداع التصريح"
    ],
    note: "مفيدة بالخصوص للمقيمين بالخارج الراغبين في استيراد سيارة أو معدات"
  },
  {
    id: "digital-casier",
    cat: "digital",
    title: "صحيفة السوابق القضائية إلكترونيًا (القسيمة رقم 3)",
    sub: "استخراج شهادة السوابق العدلية دون التنقل إلى المحكمة",
    where: "e-casier.mjustice.dz",
    duration: "الوثيقة جاهزة بصيغة PDF فور إتمام الطلب",
    fees: "200 دج (دفع إلكتروني عبر المنصة)",
    docs: ["بطاقة التعريف الوطنية البيومترية", "رقم هاتف شخصي لاستقبال رمز التحقق"],
    forExpats: false,
    steps: [
      "الدخول إلى e-casier.mjustice.dz فقط (تأكد من الرابط الرسمي)",
      "إنشاء حساب بالمعلومات الشخصية",
      "تأكيد الحساب عبر رمز SMS",
      "طلب واستخراج القسيمة رقم 3 بصيغة PDF موقعة إلكترونيًا"
    ],
    note: "الوثيقة الإلكترونية لها نفس القيمة القانونية للوثيقة الورقية وتحتوي على رمز QR للتحقق؛ كل شخص يطلب صحيفته بنفسه فقط"
  },
  {
    id: "digital-aadl",
    cat: "digital",
    title: "منصة عدل (AADL) — السكن البيع بالإيجار",
    sub: "التسجيل ومتابعة ملف الاكتتاب في برامج السكن AADL",
    where: "aadl.dz — التسجيل عبر inscription.aadl.dz",
    duration: "يختلف حسب مرحلة البرنامج (اكتتاب، دفع، توزيع)",
    fees: "حسب صنف السكن والدخل الشهري للمكتتب",
    docs: ["بطاقة التعريف الوطنية البيومترية", "شهادة الدخل الشهري"],
    forExpats: false,
    steps: [
      "الدخول إلى aadl.dz",
      "تسجيل الدخول إلى الحساب الشخصي (aadl.dz/relogin)",
      "متابعة نتيجة الاكتتاب وحالة الملف",
      "دفع الأشطر المطلوبة إلكترونيًا عند الطلب"
    ],
    note: "احذر الروابط غير الرسمية المتداولة على فيسبوك؛ الرابط الوحيد هو aadl.dz"
  },
  {
    id: "digital-sonelgaz",
    cat: "digital",
    title: "فضاء الزبون سونلغاز (e-taqaty)",
    sub: "دفع فواتير الكهرباء والغاز ومتابعة الاستهلاك إلكترونيًا",
    where: "sonelgaz.dz — فضاء الزبون عبر e-taqaty.sonelgaz.dz",
    duration: "الدفع والوصل فوريان",
    fees: "قيمة الفاتورة حسب الاستهلاك (نظام الأشطر)",
    docs: ["مرجع الزبون (موجود على الفاتورة)", "بطاقة بنكية ذهبية أو CIB"],
    forExpats: false,
    steps: [
      "الدخول إلى e-taqaty.sonelgaz.dz",
      "إنشاء حساب أو تسجيل الدخول",
      "إدخال مرجع الزبون للاطلاع على الفاتورة",
      "الدفع بالبطاقة البنكية ومتابعة منحنى الاستهلاك"
    ],
    note: "يمكن الدفع أيضًا عبر تطبيق BaridiMob بنفس مرجع الزبون"
  },
    {
    id: "digital-mfdgi",
    cat: "digital",
    title: "المديرية العامة للضرائب — الموقع الرسمي",
    sub: "معلومات الضرائب، النشرات الرسمية، والخدمات الجبائية للمهنيين والأفراد",
    where: "mfdgi.gov.dz",
    duration: "المعلومات متاحة فورًا؛ الخدمات التفاعلية حسب الإجراء",
    fees: "الاطلاع مجاني",
    docs: ["رقم التعريف الجبائي (NIF) للمهنيين إن اقتضى الأمر"],
    forExpats: false,
    steps: [
      "الدخول إلى mfdgi.gov.dz",
      "تصفح الأخبار الجبائية والنشرات الرسمية",
      "الوصول لخدمة طابعكم لدفع الطوابع الجبائية",
      "التواصل مع مصلحة الضرائب المختصة عند الحاجة"
    ],
    note: "الموقع يوجه أيضًا لمنصة طابعكم (tabioucom.mf.gov.dz) للدفع الإلكتروني"
  },
  {
    id: "digital-passeport-interieur",
    cat: "digital",
    title: "بوابة جواز السفر وبطاقة التعريف البيومترية",
    sub: "طلب ومتابعة جواز السفر والبطاقة الوطنية البيومترية إلكترونيًا",
    where: "passeport.interieur.gov.dz",
    duration: "متابعة الطلب فورية أونلاين؛ آجال الإصدار تختلف حسب المصلحة",
    fees: "حسب نوع الوثيقة (طابع جبائي عبر tabioucom.mf.gov.dz)",
    docs: ["بطاقة التعريف الوطنية أو جواز سفر سابق", "شهادة الميلاد", "شهادة الإقامة"],
    forExpats: true,
    steps: [
      "الدخول إلى passeport.interieur.gov.dz",
      "طلب بطاقة التعريف البيومترية مباشرة لحاملي جواز السفر البيومتري",
      "متابعة حالة طلب جواز السفر أو بطاقة التعريف",
      "استلام الوثيقة من المصلحة المختصة عند الجاهزية"
    ],
    note: "الجزائريون المسجلون بالقنصليات يمكنهم استخراج بطاقة التعريف بدون شرط السن"
  },
  {
    id: "digital-progres",
    cat: "digital",
    title: "منصة Progres — التسجيل الجامعي",
    sub: "التسجيل الجامعي النهائي ودفع حقوق التسجيل للطلبة الجدد والقدامى",
    where: "progres.mesrs.dz/webetu",
    duration: "فترة التسجيل محددة سنويًا (عادة أوت-سبتمبر للطلبة الجدد)",
    fees: "200 دج لحقوق التسجيل + 150 دج اختياريًا للنقل الجامعي",
    docs: ["رقم التسجيل في البكالوريا", "الرقم السري من كشف النقاط الأصلي"],
    forExpats: false,
    steps: [
      "الدخول إلى progres.mesrs.dz/webetu",
      "تسجيل الدخول برقم التسجيل والرقم السري",
      "التأكد من المعلومات الشخصية ونتيجة التوجيه",
      "دفع حقوق التسجيل إلكترونيًا أو عبر مكتب البريد"
    ],
    note: "الطلبة القدامى يستعملون progres.mesrs.dz/epaiement لإعادة التسجيل"
  },
  {
    id: "digital-onec-bac",
    cat: "digital",
    title: "الديوان الوطني للامتحانات والمسابقات (ONEC)",
    sub: "نتائج البكالوريا، سحب الاستدعاءات، وكشوف النقاط",
    where: "bac.onec.dz",
    duration: "النتائج تُعلن عادة نهاية جوان أو مطلع جويلية",
    fees: "مجاني",
    docs: ["رقم التسجيل الموجود في الاستدعاء"],
    forExpats: false,
    steps: [
      "الدخول إلى bac.onec.dz فقط (تأكد من الرابط الرسمي)",
      "اختيار مديرية التربية التابع لها المترشح",
      "إدخال رقم التسجيل للاطلاع على النتيجة أو سحب الاستدعاء",
      "طباعة كشف النقاط أو الاستدعاء بصيغة PDF"
    ],
    note: "احذر أي رابط أو موعد يُنشر عبر فيسبوك من جهات غير رسمية؛ الرابط الوحيد هو bac.onec.dz"
  },
  {
    id: "digital-awlya",
    cat: "digital",
    title: "فضاء الأولياء (awlya.education.dz)",
    sub: "متابعة أولياء التلاميذ لنتائج ومسار أبنائهم فـ التعليم المتمدرس",
    where: "awlya.education.dz",
    duration: "الاطلاع متاح فورًا أونلاين",
    fees: "مجاني",
    docs: ["معلومات التسجيل المدرسي للتلميذ"],
    forExpats: false,
    steps: [
      "الدخول إلى awlya.education.dz",
      "إنشاء حساب أو تسجيل الدخول كولي أمر",
      "ربط الحساب بالتلميذ عبر معلومات التسجيل",
      "متابعة النتائج والغيابات ونتيجة البكالوريا للمتمدرسين"
    ],
    note: "مخصصة للمترشحين المتمدرسين في المؤسسات الحكومية؛ تكمل خدمة bac.onec.dz"
  },
  
];

/* ---------------------------------------------------------
   STORAGE HELPERS (shared reports)
--------------------------------------------------------- */
async function loadReports() {
  try {
    const res = await window.storage.get("reports", true);
    return res ? JSON.parse(res.value) : [];
  } catch {
    return [];
  }
}
async function saveReports(list) {
  try {
    await window.storage.set("reports", JSON.stringify(list), true);
    return true;
  } catch {
    return false;
  }
}

/* Chat threads: one shared key per session, e.g. "chat:ab12cd34" */
async function loadChatThread(sessionId) {
  try {
    const res = await window.storage.get(`chat:${sessionId}`, true);
    return res ? JSON.parse(res.value) : null;
  } catch {
    return null;
  }
}
async function saveChatThread(sessionId, thread) {
  try {
    await window.storage.set(`chat:${sessionId}`, JSON.stringify(thread), true);
    return true;
  } catch {
    return false;
  }
}
async function listChatThreads() {
  try {
    const res = await window.storage.list("chat:", true);
    if (!res || !res.keys) return [];
    const threads = await Promise.all(
      res.keys.map(async (k) => {
        try {
          const r = await window.storage.get(k, true);
          const parsed = r ? JSON.parse(r.value) : null;
          return parsed ? { sessionId: k.replace("chat:", ""), ...parsed } : null;
        } catch {
          return null;
        }
      })
    );
    return threads.filter(Boolean).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } catch {
    return [];
  }
}

/* Very small rule-based "assistant" — keyword matching, not a real AI call. */
const BOT_GREETING = "أهلاً بيك! 👋 تفضل، بماذا نساعدك اليوم؟";
const BOT_QUICK_REPLIES = ["كيفاش نجدد جواز السفر؟", "بغيت نبلغ عن معلومة خاطئة", "نحب نهدر مع شخص حقيقي"];
function botReplyFor(textRaw) {
  const t = textRaw.toLowerCase();
  if (t.includes("شخص حقيقي") || t.includes("انسان") || t.includes("إنسان") || t.includes("موظف") || t.includes("حقيقي")) {
    return { text: "تمام، بعثت طلبك لفريقنا وباش يردّو عليك هنا فنفس المحادثة أول ما يكونو متاحين. 🙏", awaitingHuman: true };
  }
  if (t.includes("جواز")) {
    return { text: "جواز السفر البيومتري تلقاه فقسم «الهوية والوثائق» بالصفحة الرئيسية — فيه كل الوثائق والخطوات بالتفصيل.", awaitingHuman: false };
  }
  if (t.includes("بطاقة") && (t.includes("تعريف") || t.includes("وطنية"))) {
    return { text: "بطاقة التعريف الوطنية البيومترية تلقاها فقسم «الهوية والوثائق». تقدر تعلّم على الوثائق كي تفتحها.", awaitingHuman: false };
  }
  if (t.includes("مغترب") || t.includes("قنصل") || t.includes("خارج")) {
    return { text: "كل إجراءات المغتربين مجمّعة فقسم «الجالية بالخارج» بالصفحة الرئيسية.", awaitingHuman: false };
  }
  if (t.includes("خطأ") || t.includes("غالط") || t.includes("بلغ") || t.includes("بلّغ")) {
    return { text: "تقدر تبلّغ مباشرة من داخل صفحة الإجراء (زر «بلّغ عن معلومة خاطئة»)، ولا من هنا فـ«بلّغ عن مشكلة». التبليغ بلا اسم ولا معلومات شخصية.", awaitingHuman: false };
  }
  return {
    text: "ما فهمتش قصدك بالضبط 🙂 جرب كلمة كيما «جواز»، «بطاقة» أو «مغتربين»، ولا اضغط «نحب نهدر مع شخص حقيقي» باش نربطك بفريقنا.",
    awaitingHuman: false,
  };
}

/* ---------------------------------------------------------
   SHARED UI PIECES
--------------------------------------------------------- */
function TopBar({ title, onBack, right }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: C.white,
        borderBottom: `1px solid ${C.border}`,
        padding: "16px 18px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      {onBack ? (
        <button onClick={onBack} aria-label="رجوع" style={iconBtnStyle}>
          <ChevronRight size={20} color={C.text} />
        </button>
      ) : (
        <div style={{ width: 36 }} />
      )}
      <h1 style={{ flex: 1, textAlign: "center", fontSize: 17, fontWeight: 800, color: C.text, margin: 0 }}>
        {title}
      </h1>
      <div style={{ width: 36, display: "flex", justifyContent: "flex-end" }}>{right}</div>
    </div>
  );
}

const iconBtnStyle = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: "none",
  background: C.bg,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  flexShrink: 0,
};

function SearchBar({ query, setQuery, autoFocus }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: C.white,
        border: `1px solid ${C.creamBorder}`,
        borderRadius: 16,
        padding: "13px 16px",
        boxShadow: "0 2px 8px rgba(20,35,28,0.04)",
      }}
    >
      <Search size={17} color={C.gold} />
      <input
        autoFocus={autoFocus}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ابحث عن إجراء... جواز السفر، عقد الزواج..."
        style={{ border: "none", outline: "none", background: "transparent", fontSize: 14.5, flex: 1, color: C.text, fontFamily: "'Cairo', sans-serif" }}
      />
      {query && (
        <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted }}>
          <X size={15} />
        </button>
      )}
    </div>
  );
}

function InfoChip({ icon: Icon, text }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: C.greenSoft,
        border: `1px solid ${C.green}33`,
        borderRadius: 20,
        padding: "6px 12px",
        fontSize: 12.5,
        color: C.text,
      }}
    >
      <Icon size={13} color={C.green} />
      {text}
    </div>
  );
}

function Section({ title, icon: Icon, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        {Icon && <Icon size={16} color={C.red} />}
        <h3 style={{ fontSize: 16.5, fontWeight: 800, color: C.text, margin: 0 }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

/* ---------------------------------------------------------
   REPORT FORM (inline, inside detail panel)
--------------------------------------------------------- */
function ReportBox({ proc, onSubmitted }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!text.trim()) return;
    setSending(true);
    const list = await loadReports();
    list.unshift({
      id: `${Date.now()}`,
      procId: proc.id,
      procTitle: proc.title,
      message: text.trim(),
      createdAt: new Date().toISOString(),
      status: "open",
    });
    const ok = await saveReports(list);
    setSending(false);
    if (ok) {
      setDone(true);
      setText("");
      onSubmitted && onSubmitted();
    }
  };

  if (done) {
    return (
      <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: C.green, marginTop: 18 }}>
        <CheckCircle2 size={16} />
        شكرًا، وصلنا تبليغك وباش يتراجع.
      </div>
    );
  }

  return (
    <div style={{ marginTop: 18, borderTop: `1px dashed ${C.border}`, paddingTop: 14 }}>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            color: C.textMuted,
            fontSize: 12.5,
            cursor: "pointer",
            padding: 0,
          }}
        >
          <Flag size={14} /> لقيت معلومة خاطئة أو قديمة فهاذ الإجراء؟ بلّغ عنها
        </button>
      ) : (
        <div>
          <p style={{ fontSize: 12.5, color: C.textMuted, margin: "0 0 8px" }}>
            اشرح لنا واش لقيت غالط (وثيقة، مدة، رسوم...):
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="مثلاً: الرسوم تبدلت، صارت XXX دج بدل..."
            style={{
              width: "100%",
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: 10,
              fontSize: 13,
              fontFamily: "'Cairo', sans-serif",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button
              onClick={submit}
              disabled={sending || !text.trim()}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: C.green,
                color: C.white,
                border: "none",
                borderRadius: 20,
                padding: "8px 16px",
                fontSize: 12.5,
                fontWeight: 700,
                cursor: sending ? "default" : "pointer",
                opacity: sending || !text.trim() ? 0.6 : 1,
              }}
            >
              <Send size={13} /> إرسال التبليغ
            </button>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "none", border: "none", color: C.textMuted, fontSize: 12.5, cursor: "pointer" }}
            >
              إلغاء
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   DETAIL PANEL
--------------------------------------------------------- */
function DetailPanel({ proc, onBack, onReportChange }) {
  const [checked, setChecked] = useState({});
  if (!proc) return null;
  const toggle = (i) => setChecked((c) => ({ ...c, [i]: !c[i] }));

  return (
    <div>
      <TopBar title={proc.title} onBack={onBack} />
      <div style={{ padding: "16px 20px 40px" }}>
        {proc.forExpats && (
          <span
            style={{
              display: "inline-block",
              background: C.redSoft,
              color: C.red,
              fontSize: 10.5,
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 20,
              marginBottom: 8,
            }}
          >
            الجالية بالخارج
          </span>
        )}
        <p style={{ color: C.textMuted, fontSize: 13.5, margin: "0 0 16px" }}>{proc.sub}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            <InfoChip icon={MapPin} text={proc.where} />
            <InfoChip icon={Clock} text={proc.duration} />
            {proc.fees && <InfoChip icon={Landmark} text={proc.fees} />}
          </div>

          <Section title="الوثائق المطلوبة" icon={FileCheck2}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {proc.docs.map((d, i) => (
                <li
                  key={i}
                  onClick={() => toggle(i)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    cursor: "pointer",
                    fontSize: 14.5,
                    color: checked[i] ? C.green : C.text,
                    textDecoration: checked[i] ? "line-through" : "none",
                    opacity: checked[i] ? 0.6 : 1,
                  }}
                >
                  <span
                    style={{
                      marginTop: 3,
                      width: 16,
                      height: 16,
                      borderRadius: 4,
                      border: `1.5px solid ${C.green}`,
                      background: checked[i] ? C.green : "transparent",
                      flexShrink: 0,
                    }}
                  />
                  {d}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="خطوات الإجراء">
            <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {proc.steps.map((s, i) => (
                <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span
                    style={{
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: C.white,
                      background: C.green,
                      width: 23,
                      height: 23,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 14.5, color: C.text, lineHeight: 1.6, paddingTop: 2 }}>{s}</span>
                </li>
              ))}
            </ol>
          </Section>

          {proc.note && (
            <div
              style={{
                display: "flex",
                gap: 10,
                background: C.redSoft,
                border: `1px solid ${C.red}30`,
                borderRadius: 10,
                padding: "12px 14px",
              }}
            >
              <AlertCircle size={18} color={C.red} style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ margin: 0, fontSize: 13.5, color: "#8A1F30", lineHeight: 1.6 }}>{proc.note}</p>
            </div>
          )}

          <ReportBox proc={proc} onSubmitted={onReportChange} />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   PROCEDURE LIST CARD
--------------------------------------------------------- */
function ProcRow({ proc, onOpen }) {
  return (
    <button
      onClick={() => onOpen(proc)}
      style={{
        textAlign: "right",
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: "14px 16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
      }}
    >
      <ChevronLeft size={18} color={C.textMuted} style={{ flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <h4 style={{ fontSize: 15.5, fontWeight: 700, color: C.text, margin: 0 }}>{proc.title}</h4>
          {proc.forExpats && (
            <span style={{ background: C.redSoft, color: C.red, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>
              مغتربين
            </span>
          )}
        </div>
        <p style={{ fontSize: 12.5, color: C.textMuted, margin: "3px 0 0" }}>{proc.sub}</p>
      </div>
    </button>
  );
}

/* ---------------------------------------------------------
   HOME: CATEGORY GRID
--------------------------------------------------------- */
function CategoryCard({ cat, count, onOpen }) {
  const Icon = cat.icon;
  return (
    <button
      onClick={() => onOpen(cat.id)}
      style={{
        textAlign: "right",
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 18,
        padding: "16px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 160,
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
      }}
    >
      <h3 style={{ fontSize: 14.5, fontWeight: 800, color: C.text, margin: 0, lineHeight: 1.35 }}>{cat.label}</h3>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.green, background: C.greenSoft, borderRadius: 20, padding: "3px 10px" }}>
          {count}
        </span>
        <Icon size={40} strokeWidth={1.5} color={C.green} />
      </div>
    </button>
  );
}

function HomePage({ query, setQuery, onOpenCategory, onOpenProc, countByCategory }) {
  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.trim();
    return PROCS.filter((p) => p.title.includes(q) || p.sub.includes(q) || p.docs.some((d) => d.includes(q)));
  }, [query]);

  return (
    <div>
      <div
        style={{
          background: `linear-gradient(180deg, ${C.bg} 0%, ${C.headerBg} 100%)`,
          padding: "28px 22px 22px",
          borderBottom: `1px solid ${C.creamBorder}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
          <AlgeriaEmblem size={64} />
          <div style={{ textAlign: "right" }}>
            <h1 style={{ fontFamily: "'Amiri', serif", color: C.text, fontSize: 26, fontWeight: 700, margin: 0, lineHeight: 1.15 }}>دزايرنا</h1>
            <p style={{ color: C.textMuted, fontSize: 12, letterSpacing: 0.5, margin: "2px 0 0" }}>DZAYERNA · دليلك الإداري</p>
          </div>
        </div>
        <p style={{ color: C.textMuted, fontSize: 13.5, lineHeight: 1.9, margin: "16px 0 0", textAlign: "right" }}>
          الإجراءات الإدارية في الجزائر، داخل الوطن ولأبناء الجالية، فمكان واحد.
        </p>

        <div style={{ marginTop: 18 }}>
          <SearchBar query={query} setQuery={setQuery} />
        </div>
      </div>

      <div style={{ padding: "22px 18px 40px" }}>
        {searchResults ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontSize: 12.5, color: C.textMuted, margin: "0 0 4px" }}>{searchResults.length} نتيجة</p>
            {searchResults.length === 0 ? (
              <p style={{ fontSize: 14, color: C.textMuted, textAlign: "center", padding: "30px 0" }}>
                ما لقيناش إجراء يطابق البحث.
              </p>
            ) : (
              searchResults.map((p) => <ProcRow key={p.id} proc={p} onOpen={onOpenProc} />)
            )}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {CATEGORIES.map((c) => (
              <CategoryCard key={c.id} cat={c} count={countByCategory[c.id] || 0} onOpen={onOpenCategory} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   CATEGORY PAGE
--------------------------------------------------------- */
function CategoryPage({ catId, onBack, onOpenProc }) {
  const cat = CATEGORIES.find((c) => c.id === catId);
  const items = PROCS.filter((p) => p.cat === catId);
  return (
    <div>
      <TopBar title={cat ? cat.label : ""} onBack={onBack} />
      <div style={{ padding: "16px 18px 40px", display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((p) => (
          <ProcRow key={p.id} proc={p} onOpen={onOpenProc} />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   SEARCH PAGE (dedicated tab)
--------------------------------------------------------- */
function SearchPage({ onOpenProc }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    if (!q.trim()) return null;
    const s = q.trim();
    return PROCS.filter((p) => p.title.includes(s) || p.sub.includes(s) || p.docs.some((d) => d.includes(s)));
  }, [q]);

  return (
    <div>
      <div style={{ padding: "18px 18px 12px", background: C.white, borderBottom: `1px solid ${C.border}` }}>
        <h1 style={{ fontSize: 19, fontWeight: 800, color: C.text, margin: "0 0 12px" }}>البحث</h1>
        <SearchBar query={q} setQuery={setQ} autoFocus />
      </div>
      <div style={{ padding: "16px 18px 40px" }}>
        {!results ? (
          <p style={{ fontSize: 13.5, color: C.textMuted, textAlign: "center", padding: "40px 10px" }}>
            اكتب كلمة باش تلقى الإجراء لي تحوس عليه، مثلاً «جواز»، «بطاقة»، «عقد زواج»...
          </p>
        ) : results.length === 0 ? (
          <p style={{ fontSize: 13.5, color: C.textMuted, textAlign: "center", padding: "40px 10px" }}>
            ما لقيناش إجراء يطابق البحث.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontSize: 12.5, color: C.textMuted, margin: "0 0 2px" }}>{results.length} نتيجة</p>
            {results.map((p) => (
              <ProcRow key={p.id} proc={p} onOpen={onOpenProc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   NOTIFICATIONS PAGE (reports review — admin only)
--------------------------------------------------------- */
function NotificationsPage({ onBack, reports, loading, onResolve, onDelete }) {
  const open = reports.filter((r) => r.status === "open");
  const resolved = reports.filter((r) => r.status !== "open");

  return (
    <div>
      <TopBar title="الإشعارات والتبليغات" onBack={onBack} />
      <div style={{ padding: "16px 18px 40px" }}>
        <p style={{ fontSize: 12.5, color: C.textMuted, lineHeight: 1.6, marginBottom: 18 }}>
          هنا التبليغات لي بعثها المستخدمين على معلومات ناقصة أو قديمة. راجعها وحدد إذا خاصها تصحيح فالتطبيق ولا
          التبليغ ماكانش صحيح.
        </p>
        {loading ? (
          <p style={{ fontSize: 13, color: C.textMuted }}>...جاري التحميل</p>
        ) : reports.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px 10px", color: C.textMuted }}>
            <Bell size={36} color={C.textMuted} style={{ marginBottom: 10 }} />
            <p style={{ fontSize: 14 }}>مافماش تبليغات حاليًا.</p>
          </div>
        ) : (
          <>
            {open.length > 0 && (
              <>
                <h3 style={{ fontSize: 13, fontWeight: 800, color: C.red, margin: "0 0 10px" }}>
                  في الانتظار ({open.length})
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                  {open.map((r) => (
                    <ReportCard key={r.id} r={r} onResolve={onResolve} onDelete={onDelete} />
                  ))}
                </div>
              </>
            )}
            {resolved.length > 0 && (
              <>
                <h3 style={{ fontSize: 13, fontWeight: 800, color: C.textMuted, margin: "0 0 10px" }}>
                  معالَجة ({resolved.length})
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {resolved.map((r) => (
                    <ReportCard key={r.id} r={r} onDelete={onDelete} resolved />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ReportCard({ r, onResolve, onDelete, resolved }) {
  return (
    <div
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: 14,
        opacity: resolved ? 0.6 : 1,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div>
          <p style={{ fontSize: 13.5, fontWeight: 700, color: C.text, margin: 0 }}>{r.procTitle || "تبليغ عام"}</p>
          <p style={{ fontSize: 12.5, color: C.textMuted, margin: "4px 0 0", lineHeight: 1.5 }}>{r.message}</p>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        {!resolved && (
          <button
            onClick={() => onResolve(r.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: C.greenSoft,
              color: C.green,
              border: "none",
              borderRadius: 20,
              padding: "6px 12px",
              fontSize: 11.5,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            <CheckCircle2 size={13} /> تحديد كمُعالَج
          </button>
        )}
        <button
          onClick={() => onDelete(r.id)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: C.redSoft,
            color: C.red,
            border: "none",
            borderRadius: 20,
            padding: "6px 12px",
            fontSize: 11.5,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <Trash2 size={13} /> حذف
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   PUBLIC CHAT PAGE ("تواصل معنا")
--------------------------------------------------------- */
function ChatBubble({ msg }) {
  const isUser = msg.sender === "user";
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-start" : "flex-end", marginBottom: 10 }}>
      <div
        style={{
          maxWidth: "78%",
          background: isUser ? C.green : C.bg,
          color: isUser ? C.white : C.text,
          borderRadius: isUser ? "14px 14px 14px 4px" : "14px 14px 4px 14px",
          padding: "10px 13px",
          fontSize: 13.5,
          lineHeight: 1.6,
        }}
      >
        {msg.text}
      </div>
    </div>
  );
}

function ChatPage({ onBack }) {
  const [sessionId] = useState(() => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`);
  const [messages, setMessages] = useState([{ sender: "bot", text: BOT_GREETING }]);
  const [awaitingHuman, setAwaitingHuman] = useState(false);
  const [input, setInput] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const existing = await loadChatThread(sessionId);
      if (existing) {
        setMessages(existing.messages);
        setAwaitingHuman(!!existing.awaitingHuman);
      }
      setReady(true);
    })();
  }, [sessionId]);

  useEffect(() => {
    if (!awaitingHuman) return;
    const t = setInterval(async () => {
      const thread = await loadChatThread(sessionId);
      if (thread && thread.messages.length > messages.length) {
        setMessages(thread.messages);
        setAwaitingHuman(!!thread.awaitingHuman);
      }
    }, 4000);
    return () => clearInterval(t);
  }, [awaitingHuman, sessionId, messages.length]);

  const persist = async (msgs, waiting) => {
    await saveChatThread(sessionId, { messages: msgs, awaitingHuman: waiting, updatedAt: new Date().toISOString() });
  };

  const send = async (text) => {
    if (!text.trim()) return;
    const userMsg = { sender: "user", text: text.trim() };
    let next = [...messages, userMsg];
    setMessages(next);
    setInput("");

    if (awaitingHuman) {
      // human takeover in progress — don't auto-reply, just wait for admin
      await persist(next, true);
      return;
    }
    const { text: reply, awaitingHuman: nowWaiting } = botReplyFor(text);
    const botMsg = { sender: "bot", text: reply };
    next = [...next, botMsg];
    setMessages(next);
    setAwaitingHuman(nowWaiting);
    await persist(next, nowWaiting);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 62px)" }}>
      <TopBar title="تواصل معنا" onBack={onBack} />
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px" }}>
        {messages.map((m, i) => (
          <ChatBubble key={i} msg={m} />
        ))}
        {messages.length === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
            {BOT_QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                style={{
                  alignSelf: "flex-end",
                  background: C.white,
                  border: `1px solid ${C.green}55`,
                  color: C.green,
                  borderRadius: 20,
                  padding: "8px 14px",
                  fontSize: 12.5,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}
        {awaitingHuman && (
          <p style={{ fontSize: 11.5, color: C.textMuted, textAlign: "center", margin: "10px 0" }}>
            ⏳ فريقنا واصلهم طلبك، وباش يردّو من قريب هنا فنفس المحادثة.
          </p>
        )}
      </div>
      <div style={{ display: "flex", gap: 8, padding: 12, borderTop: `1px solid ${C.border}`, background: C.white }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="اكتب رسالتك..."
          style={{
            flex: 1,
            border: `1px solid ${C.border}`,
            borderRadius: 20,
            padding: "10px 16px",
            fontSize: 13.5,
            outline: "none",
            fontFamily: "'Cairo', sans-serif",
          }}
        />
        <button
          onClick={() => send(input)}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: C.green,
            border: "none",
            color: C.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   ADMIN LOGIN
--------------------------------------------------------- */
function AdminLoginPage({ onBack, onSuccess }) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);

  const submit = () => {
    if (pwd === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <TopBar title="دخول المشرف" onBack={onBack} />
      <div style={{ padding: "30px 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: C.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
          <KeyRound size={24} color={C.green} />
        </div>
        <p style={{ fontSize: 13, color: C.textMuted, textAlign: "center", marginBottom: 20, maxWidth: 280 }}>
          هاذي المنطقة خاصة بالمشرف بَرك، باش يراجع التبليغات ويرد على الدردشات.
        </p>
        <input
          type="password"
          value={pwd}
          onChange={(e) => {
            setPwd(e.target.value);
            setError(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="كلمة السر"
          style={{
            width: "100%",
            maxWidth: 280,
            border: `1px solid ${error ? C.red : C.border}`,
            borderRadius: 12,
            padding: "12px 14px",
            fontSize: 14,
            textAlign: "center",
            outline: "none",
            marginBottom: 10,
          }}
        />
        {error && <p style={{ color: C.red, fontSize: 12, margin: "0 0 10px" }}>كلمة السر غالطة، عاود جرب.</p>}
        <button
          onClick={submit}
          style={{
            background: C.green,
            color: C.white,
            border: "none",
            borderRadius: 20,
            padding: "10px 30px",
            fontSize: 13.5,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          دخول
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   ADMIN: CHAT THREADS DASHBOARD
--------------------------------------------------------- */
function AdminChatConversation({ thread, onBack, onSent }) {
  const [reply, setReply] = useState("");
  const [messages, setMessages] = useState(thread.messages);
  const [sending, setSending] = useState(false);

  const send = async () => {
    if (!reply.trim()) return;
    setSending(true);
    const next = [...messages, { sender: "admin", text: reply.trim() }];
    setMessages(next);
    await saveChatThread(thread.sessionId, { messages: next, awaitingHuman: false, updatedAt: new Date().toISOString() });
    setReply("");
    setSending(false);
    onSent && onSent();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 62px)" }}>
      <TopBar title={`محادثة #${thread.sessionId.slice(0, 6)}`} onBack={onBack} />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.sender === "admin" ? "flex-start" : "flex-end", marginBottom: 10 }}>
            <div
              style={{
                maxWidth: "78%",
                background: m.sender === "admin" ? C.green : m.sender === "user" ? C.text : C.bg,
                color: m.sender === "bot" ? C.text : C.white,
                borderRadius: 14,
                padding: "10px 13px",
                fontSize: 13.5,
                lineHeight: 1.6,
              }}
            >
              {m.text}
              <div style={{ fontSize: 9.5, opacity: 0.7, marginTop: 3 }}>
                {m.sender === "admin" ? "أنت (المشرف)" : m.sender === "user" ? "المستخدم" : "الرد الآلي"}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, padding: 12, borderTop: `1px solid ${C.border}`, background: C.white }}>
        <input
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="اكتب ردك كمشرف..."
          style={{ flex: 1, border: `1px solid ${C.border}`, borderRadius: 20, padding: "10px 16px", fontSize: 13.5, outline: "none", fontFamily: "'Cairo', sans-serif" }}
        />
        <button
          onClick={send}
          disabled={sending}
          style={{ width: 40, height: 40, borderRadius: "50%", background: C.green, border: "none", color: C.white, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, opacity: sending ? 0.6 : 1 }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

function AdminChatsPage({ onBack }) {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openThread, setOpenThread] = useState(null);

  const refresh = async () => {
    setLoading(true);
    const list = await listChatThreads();
    setThreads(list);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  if (openThread) {
    return (
      <AdminChatConversation
        thread={openThread}
        onBack={() => {
          setOpenThread(null);
          refresh();
        }}
        onSent={refresh}
      />
    );
  }

  return (
    <div>
      <TopBar title="الدردشات" onBack={onBack} />
      <div style={{ padding: "16px 18px 40px" }}>
        {loading ? (
          <p style={{ fontSize: 13, color: C.textMuted }}>...جاري التحميل</p>
        ) : threads.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px 10px", color: C.textMuted }}>
            <MessageCircle size={36} color={C.textMuted} style={{ marginBottom: 10 }} />
            <p style={{ fontSize: 14 }}>مافماش محادثات حاليًا.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {threads.map((t) => {
              const last = t.messages[t.messages.length - 1];
              return (
                <button
                  key={t.sessionId}
                  onClick={() => setOpenThread(t)}
                  style={{
                    textAlign: "right",
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    borderRadius: 14,
                    padding: 14,
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>محادثة #{t.sessionId.slice(0, 6)}</span>
                    {t.awaitingHuman && (
                      <span style={{ background: C.redSoft, color: C.red, fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 20 }}>
                        بانتظار الرد
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 12.5, color: C.textMuted, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {last ? last.text : ""}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   SETTINGS / INFO PAGES
--------------------------------------------------------- */
function InfoPage({ title, onBack, children }) {
  return (
    <div>
      <TopBar title={title} onBack={onBack} />
      <div style={{ padding: "18px 20px 50px", fontSize: 14, color: C.text, lineHeight: 1.9 }}>{children}</div>
    </div>
  );
}

function GeneralReportForm() {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!text.trim()) return;
    setSending(true);
    const list = await loadReports();
    list.unshift({
      id: `${Date.now()}`,
      procId: null,
      procTitle: null,
      message: text.trim(),
      createdAt: new Date().toISOString(),
      status: "open",
    });
    const ok = await saveReports(list);
    setSending(false);
    if (ok) {
      setDone(true);
      setText("");
    }
  };

  return (
    <div style={{ marginTop: 8 }}>
      {done && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: C.green, marginBottom: 12 }}>
          <CheckCircle2 size={16} /> تبعثلنا التبليغ، شكرًا ليك.
        </div>
      )}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder="اكتب ملاحظتك أو المشكلة لي لقيتها فالتطبيق..."
        style={{
          width: "100%",
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: 12,
          fontSize: 14,
          fontFamily: "'Cairo', sans-serif",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />
      <button
        onClick={submit}
        disabled={sending || !text.trim()}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: C.green,
          color: C.white,
          border: "none",
          borderRadius: 20,
          padding: "10px 18px",
          fontSize: 13.5,
          fontWeight: 700,
          marginTop: 10,
          cursor: sending ? "default" : "pointer",
          opacity: sending || !text.trim() ? 0.6 : 1,
        }}
      >
        <Send size={14} /> إرسال
      </button>
    </div>
  );
}

function SettingsRow({ it, onNavigate, badge }) {
  const Icon = it.icon;
  return (
    <button
      onClick={() => onNavigate(it.id)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: "14px 16px",
        cursor: "pointer",
        textAlign: "right",
        width: "100%",
      }}
    >
      <div style={{ width: 36, height: 36, borderRadius: 10, background: C.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <Icon size={17} color={C.green} />
        {badge > 0 && (
          <span
            style={{
              position: "absolute",
              top: -5,
              left: -5,
              background: C.red,
              color: C.white,
              fontSize: 9.5,
              fontWeight: 800,
              minWidth: 15,
              height: 15,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 3px",
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <span style={{ flex: 1, fontSize: 14.5, fontWeight: 700, color: C.text }}>{it.label}</span>
      <ChevronLeft size={16} color={C.textMuted} />
    </button>
  );
}

function SettingsPage({ onBack, onNavigate, isAdmin, onAdminLogout, openReportsCount, openChatsCount }) {
  const items = [
    { id: "about", label: "من نحن", icon: Info },
    { id: "sources", label: "المصادر الرسمية", icon: ExternalLink },
    { id: "chat", label: "تواصل معنا", icon: MessageCircle },
    { id: "report", label: "بلّغ عن مشكلة", icon: Flag },
    { id: "privacy", label: "سياسة الخصوصية", icon: Lock },
    { id: "terms", label: "شروط الاستخدام", icon: ScrollText },
  ];
  const adminItems = [
    { id: "admin-reports", label: "التبليغات (لوحة الإدارة)", icon: Inbox },
    { id: "admin-chats", label: "الدردشات (لوحة الإدارة)", icon: MessageCircle },
  ];
  return (
    <div>
      <TopBar title="الإعدادات" onBack={onBack} />
      <div style={{ padding: "16px 18px 8px", display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((it) => (
          <SettingsRow key={it.id} it={it} onNavigate={onNavigate} />
        ))}

        {isAdmin && (
          <>
            <p style={{ fontSize: 11.5, fontWeight: 800, color: C.textMuted, margin: "14px 2px 2px" }}>لوحة المشرف</p>
            {adminItems.map((it) => (
              <SettingsRow
                key={it.id}
                it={it}
                onNavigate={onNavigate}
                badge={it.id === "admin-reports" ? openReportsCount : it.id === "admin-chats" ? openChatsCount : 0}
              />
            ))}
            <button
              onClick={onAdminLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "none",
                border: "none",
                color: C.red,
                fontSize: 13.5,
                fontWeight: 700,
                cursor: "pointer",
                padding: "12px 6px",
              }}
            >
              <LogOut size={16} /> تسجيل خروج المشرف
            </button>
          </>
        )}

        {!isAdmin && (
          <SettingsRow
            key="admin-login"
            it={{ id: "admin-login", label: "دخول المشرف", icon: KeyRound }}
            onNavigate={onNavigate}
          />
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   BOTTOM NAV
--------------------------------------------------------- */
function BottomNav({ active, onChange }) {
  const tabs = [
    { id: "home", label: "الرئيسية", icon: HomeIcon },
    { id: "search", label: "بحث", icon: Search },
    { id: "settings", label: "الإعدادات", icon: SettingsIcon },
  ];
  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        background: C.white,
        borderTop: `1px solid ${C.border}`,
        display: "flex",
        padding: "8px 10px calc(8px + env(safe-area-inset-bottom))",
        zIndex: 20,
      }}
    >
      {tabs.map((t) => {
        const Icon = t.icon;
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px 0",
              position: "relative",
            }}
          >
            <div style={{ position: "relative" }}>
              <Icon size={21} color={isActive ? C.green : C.textMuted} strokeWidth={isActive ? 2.3 : 2} />
            </div>
            <span style={{ fontSize: 10.5, fontWeight: isActive ? 800 : 600, color: isActive ? C.green : C.textMuted }}>
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------
   MAIN APP
--------------------------------------------------------- */
function ExitToast({ show }) {
  if (!show) return null;
  return (
    <div
      style={{
        position: "absolute",
        bottom: 78,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#15201AEE",
        color: C.white,
        fontSize: 12.5,
        fontWeight: 600,
        padding: "10px 18px",
        borderRadius: 20,
        zIndex: 60,
        whiteSpace: "nowrap",
        boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
      }}
    >
      اضغط رجوع مرة أخرى للخروج
    </div>
  );
}

export default function App() {
  const scrollRef = useRef(null);
  const stackRef = useRef([{ type: "home" }]);
  const historyOkRef = useRef(true);
  const exitArmedRef = useRef(false);

  const [stack, setStack] = useState([{ type: "home" }]);
  const [query, setQuery] = useState("");
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [chatOpenCount, setChatOpenCount] = useState(0);
  const [showExitToast, setShowExitToast] = useState(false);

  useEffect(() => {
    stackRef.current = stack;
  }, [stack]);

  const current = stack[stack.length - 1];

  /* ---- data ---- */
  const refreshReports = async () => {
    setLoadingReports(true);
    const list = await loadReports();
    setReports(list);
    setLoadingReports(false);
  };
  const refreshChatBadge = async () => {
    const threads = await listChatThreads();
    setChatOpenCount(threads.filter((t) => t.awaitingHuman).length);
  };
  useEffect(() => {
    refreshReports();
    refreshChatBadge();
  }, []);

  const countByCategory = useMemo(() => {
    const m = {};
    PROCS.forEach((p) => {
      m[p.cat] = (m[p.cat] || 0) + 1;
    });
    return m;
  }, []);
  const openCount = reports.filter((r) => r.status === "open").length;

  const resolveReport = async (id) => {
    const updated = reports.map((r) => (r.id === id ? { ...r, status: "resolved" } : r));
    setReports(updated);
    await saveReports(updated);
  };
  const deleteReport = async (id) => {
    const updated = reports.filter((r) => r.id !== id);
    setReports(updated);
    await saveReports(updated);
  };

  /* ---- navigation core ----
     One shared history stack. Pushing a screen saves the scroll position of
     the screen we're leaving, so coming back lands exactly where we were —
     never at the top of the app. Hardware/gesture back is wired through the
     browser History API when the environment allows it; if it's blocked
     (sandboxed preview), the in-app back arrows still work via direct stack
     pops, just without hardware-back support. */
  const push = (frame) => {
    const savedScroll = scrollRef.current ? scrollRef.current.scrollTop : 0;
    setStack((s) => {
      const updated = [...s];
      updated[updated.length - 1] = { ...updated[updated.length - 1], scroll: savedScroll };
      return [...updated, { ...frame, scroll: 0 }];
    });
    if (historyOkRef.current) {
      try {
        window.history.pushState({ n: stackRef.current.length + 1 }, "");
      } catch {
        historyOkRef.current = false;
      }
    }
  };

  const directPop = () => {
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  };

  const goBack = () => {
    if (stackRef.current.length <= 1) return;
    if (historyOkRef.current) {
      try {
        window.history.back();
        return;
      } catch {
        historyOkRef.current = false;
      }
    }
    directPop();
  };

  const switchTab = (tab) => {
    setStack([{ type: tab, scroll: 0 }]);
    if (historyOkRef.current) {
      try {
        window.history.pushState({ n: 1 }, "");
      } catch {
        historyOkRef.current = false;
      }
    }
  };

  // Hardware / gesture back button (and browser back) support, with a
  // press-twice-to-exit confirmation once we're back at the root screen.
  useEffect(() => {
    try {
      window.history.pushState({ n: 1 }, "");
    } catch {
      historyOkRef.current = false;
    }
    if (!historyOkRef.current) return;

    const onPopState = () => {
      if (stackRef.current.length > 1) {
        directPop();
        return;
      }
      if (exitArmedRef.current) {
        // second press within the window — let the exit proceed as-is.
        return;
      }
      exitArmedRef.current = true;
      setShowExitToast(true);
      try {
        window.history.pushState({ n: 1 }, "");
      } catch {
        historyOkRef.current = false;
      }
      setTimeout(() => {
        exitArmedRef.current = false;
        setShowExitToast(false);
      }, 2200);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Restore scroll position whenever the visible screen changes.
  useEffect(() => {
    const top = stack[stack.length - 1];
    const raf = requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = top.scroll || 0;
    });
    return () => cancelAnimationFrame(raf);
  }, [stack]);

  const openProc = current.type === "detail" ? PROCS.find((p) => p.id === current.procId) : null;

  return (
    <div style={{ minHeight: "100vh", background: "#E7E9E7", display: "flex", justifyContent: "center" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .app-root, .app-root * { font-family: 'Cairo', sans-serif; }
        button { font-family: inherit; }
        .phone-shell { width: 100%; max-width: 430px; min-height: 100vh; background: ${C.bg}; position: relative; display: flex; flex-direction: column; }
        @media (min-width: 431px) {
          .phone-shell { min-height: 852px; max-height: 90vh; margin: 20px 0; border-radius: 34px; overflow: hidden; box-shadow: 0 20px 60px -20px rgba(0,0,0,0.35), 0 0 0 8px #111; }
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-thumb { background: #04663555; border-radius: 8px; }
        input::placeholder, textarea::placeholder { color: #68766F99; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      <div className="app-root phone-shell" dir="rtl">
        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", paddingBottom: 4 }}>
          {current.type === "home" && (
            <HomePage
              query={query}
              setQuery={setQuery}
              onOpenCategory={(id) => push({ type: "category", catId: id })}
              onOpenProc={(proc) => push({ type: "detail", procId: proc.id })}
              countByCategory={countByCategory}
            />
          )}

          {current.type === "category" && (
            <CategoryPage
              catId={current.catId}
              onBack={goBack}
              onOpenProc={(proc) => push({ type: "detail", procId: proc.id })}
            />
          )}

          {current.type === "detail" && openProc && (
            <DetailPanel proc={openProc} onBack={goBack} onReportChange={refreshReports} />
          )}

          {current.type === "detail" && !openProc && (
            <div>
              <TopBar title="الإجراء" onBack={goBack} />
              <div style={{ padding: "40px 20px", textAlign: "center", color: C.textMuted }}>
                <p style={{ fontSize: 14 }}>ما لقيناش هاذ الإجراء. جرب ترجع وتعاود البحث.</p>
              </div>
            </div>
          )}

          {current.type === "search" && (
            <SearchPage onOpenProc={(proc) => push({ type: "detail", procId: proc.id })} onBack={() => switchTab("home")} />
          )}

          {current.type === "chat" && <ChatPage onBack={goBack} />}

          {current.type === "admin-login" && (
            <AdminLoginPage
              onBack={goBack}
              onSuccess={() => {
                setIsAdmin(true);
                goBack();
              }}
            />
          )}

          {current.type === "admin-reports" && (
            <NotificationsPage
              onBack={goBack}
              reports={reports}
              loading={loadingReports}
              onResolve={resolveReport}
              onDelete={deleteReport}
            />
          )}

          {current.type === "admin-chats" && <AdminChatsPage onBack={goBack} />}

          {current.type === "settings" && (
            <SettingsPage
              onBack={() => switchTab("home")}
              isAdmin={isAdmin}
              openReportsCount={openCount}
              openChatsCount={chatOpenCount}
              onAdminLogout={() => setIsAdmin(false)}
              onNavigate={(id) => {
                if (id === "admin-login" || id === "admin-reports" || id === "admin-chats" || id === "chat") {
                  push({ type: id });
                  return;
                }
                push({ type: "info", infoPage: id });
              }}
            />
          )}

          {current.type === "info" && current.infoPage === "about" && (
            <InfoPage title="من نحن" onBack={goBack}>
              <p>
                «دزايرنا» تطبيق غير حكومي، هدفه يسهّل على المواطن الجزائري وعلى أبناء الجالية بالخارج الوصول لمعلومات
                الإجراءات الإدارية (الوثائق المطلوبة، الخطوات، وين تروح) فمكان واحد وبطريقة واضحة وسهلة.
              </p>
              <p>
                التطبيق يجمع معلوماته من القوانين والتنظيمات الجزائرية المعروفة والمصادر الرسمية المتاحة، ويعتمد على
                تبليغات المستخدمين باش يتصحّح ويتحدّث باستمرار. ماهوش بديل عن المصالح الرسمية، وهدفه فقط يوجّهك قبل ما
                تروح للإدارة.
              </p>
            </InfoPage>
          )}

          {current.type === "info" && current.infoPage === "sources" && (
            <InfoPage title="المصادر الرسمية" onBack={goBack}>
              <p style={{ marginBottom: 14 }}>
                هاذي قائمة المصالح والمواقع الرسمية لي يخصك ترجعلها باش تتأكد من آخر تحديث قبل أي إجراء:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {OFFICIAL_SOURCES.map((s) => (
                  <div key={s.domain} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5 }}>
                    <ExternalLink size={13} color={C.green} style={{ flexShrink: 0 }} />
                    <span>
                      {s.label} — <span style={{ color: C.green, fontWeight: 700 }}>{s.domain}</span>
                    </span>
                  </div>
                ))}
              </div>
            </InfoPage>
          )}

          {current.type === "info" && current.infoPage === "report" && (
            <InfoPage title="بلّغ عن مشكلة" onBack={goBack}>
              <p style={{ marginBottom: 4 }}>
                عندك ملاحظة عامة على التطبيق، ولا لقيت حاجة خاطئة وماكانتش مرتبطة بإجراء معيّن؟ اكتبها هنا:
              </p>
              <GeneralReportForm />
            </InfoPage>
          )}

          {current.type === "info" && current.infoPage === "privacy" && (
            <InfoPage title="سياسة الخصوصية" onBack={goBack}>
              <p>ما نجمعوش حسابات شخصية ولا معلومات تعريفية إجبارية لاستعمال التطبيق.</p>
              <p>
                التبليغات لي تبعثها (على إجراء معيّن أو تبليغ عام) تتخزّن باش الفريق يراجعها ويصحح المعلومات، وتبقى
                مرتبطة فقط بالنص لي كتبتيه من غير ما نطلبو منك اسمك أو بياناتك الشخصية.
              </p>
              <p>ما نبيعوش ولا نتقاسموش أي معلومة مع أطراف خارجية لأغراض إشهارية.</p>
            </InfoPage>
          )}

          {current.type === "info" && current.infoPage === "terms" && (
            <InfoPage title="شروط الاستخدام" onBack={goBack}>
              <p>استعمال «دزايرنا» يعني موافقتك على النقاط التالية:</p>
              <p>
                التطبيق غير حكومي وغير رسمي، والمعلومات فيه لغرض التوجيه العام فقط. الشروط والآجال والرسوم الإدارية
                تتغيّر بمراسيم وقرارات دورية، فلا يمكن ضمان دقّتها الكاملة فكل لحظة.
              </p>
              <p>
                يُنصح دائمًا بالتأكد من آخر المعلومات لدى المصلحة الرسمية المعنية قبل إنجاز أي إجراء، ولا يتحمّل
                التطبيق أي مسؤولية عن قرار اتُّخذ بناءً فقط على المعلومات المعروضة هنا.
              </p>
            </InfoPage>
          )}
        </div>

        {["home", "category", "search", "settings"].includes(current.type) && (
          <BottomNav
            active={current.type === "category" ? "home" : current.type}
            onChange={(t) => switchTab(t)}
          />
        )}

        <ExitToast show={showExitToast} />
      </div>
    </div>
  );
}
