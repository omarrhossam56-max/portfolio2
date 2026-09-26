"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";

interface Project {
  id: string;
  image: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
}

const projects: Project[] = [
  {
    id: "islamic-prayer-assistant",
    image: "/workflows/islamic-prayer-assistant.png",
    titleEn: "AI Islamic Prayer Assistant",
    titleAr: "مساعد الصلاة الإسلامي الذكي",
    descriptionEn:
      "An AI-powered assistant that helps users stay consistent with their daily prayers through personalized reminders, prayer tracking, and daily follow-ups. It can answer Islamic questions, track prayer activity, and provide daily and monthly progress reports.",
    descriptionAr:
      "مساعد ذكي يساعد المستخدمين على الانتظام في صلواتهم اليومية من خلال تذكيرات شخصية، وتتبع الصلوات، ومتابعة يومية. يمكنه الإجابة على الأسئلة الإسلامية، وتتبع نشاط الصلاة، وتقديم تقارير تقدم يومية وشهرية.",
  },
  {
    id: "financial-assistant",
    image: "/workflows/project-financial.png",
    titleEn: "AI Financial Assistant",
    titleAr: "المساعد المالي والمحاسبي الذكي",
    descriptionEn:
      "An AI-powered assistant for managing expenses, income, advances, and debts. It allows users to record transactions, generate detailed or comprehensive reports, and track partial or full repayments with automatic balance and date updates.\n\nIt sends repayment reminders, handles date changes intelligently, and validates data to prevent errors and inconsistencies.",
    descriptionAr:
      "مساعد ذكي بالذكاء الاصطناعي لإدارة المصروفات، الإيرادات، السلف، والديون. يتيح للمستخدمين تسجيل المعاملات المالية، واستخراج تقارير تفصيلية أو شاملة، وتتبع السدادات الجزئية أو الكاملة مع تحديث تلقائي للأرصدة والتواريخ.\n\nيرسل تذكيرات بالسداد، ويتعامل مع تغيير المواعيد بذكاء، ويتحقق من صحة البيانات لمنع الأخطاء والتناقضات.",
  },
  {
    id: "medical-clinic",
    image: "/workflows/medical-clinic.png",
    titleEn: "Medical Clinic – 24/7 AI Automation",
    titleAr: "العيادة الطبية – أتمتة ذكية 24/7",
    descriptionEn:
      "An AI-powered Messenger automation system that manages patient communication and appointments 24/7. Patients can book, cancel, or reschedule appointments with automatic conflict prevention.\n\nThe system also provides information about doctors, availability, and services, while securely recording patient and appointment data. Complaints are automatically handled and escalated to the clinic management via email.\n\nAt the end of each week, the system follows up with patients who attended their appointments to collect feedback, record their experience, and automatically escalate any negative feedback or service issues to management.",
    descriptionAr:
      "نظام أتمتة ذكي عبر Messenger لإدارة تواصل المرضى وحجز المواعيد على مدار الساعة 24/7. يمكن للمرضى حجز المواعيد أو إلغاؤها أو إعادة جدولتها مع منع التعارض التلقائي.\n\nيوفر النظام أيضاً معلومات حول الأطباء والمواعيد المتاحة والخدمات، مع تسجيل بيانات المرضى والمواعيد بأمان. كما يتم التعامل مع الشكاوى تلقائياً وتصعيدها لإدارة العيادة عبر البريد الإلكتروني.\n\nفي نهاية كل أسبوع، يقوم النظام بمتابعة المرضى الذين حضروا مواعيدهم لجمع التقييمات، وتسجيل تجربتهم، وتصعيد أي ملاحظات سلبية أو مشكلات في الخدمة للإدارة فوراً.",
  },
  {
    id: "ugc-ad-generator",
    image: "/workflows/ugc-ad-generator.png",
    titleEn: "AI UGC Ad Generator",
    titleAr: "مولّد إعلانات UGC الذكي",
    descriptionEn:
      "An AI-powered automation that turns a product image into a ready-to-use UGC ad. The workflow is controlled through Telegram, automatically records all data in Google Sheets and Google Drive, generates the visuals, converts them into a video, and sends the final UGC ad back to the user.",
    descriptionAr:
      "أتمتة ذكية تحوّل صورة منتج إلى إعلان UGC جاهز للاستخدام. يتم التحكم في سير العمل عبر Telegram، مع تسجيل تلقائي لجميع البيانات في Google Sheets وGoogle Drive، وتوليد المرئيات، وتحويلها إلى فيديو، وإرسال الإعلان النهائي للمستخدم.",
  },
  {
    id: "nutrition-coach",
    image: "/workflows/nutrition-coach.png",
    titleEn: "AI Nutrition & Fitness Coach",
    titleAr: "مدرب التغذية واللياقة الذكي",
    descriptionEn:
      "An AI-powered nutrition and fitness assistant that analyzes food images to estimate calories, nutrients, and macros. Users can log meals by image or text, track calories, protein, steps, workouts, and supplements, and access their complete food history.\n\nThe system can also create daily meal plans, send three daily check-ins, and provide monthly progress reports including nutrition, activity, and weight changes.",
    descriptionAr:
      "مساعد ذكي للتغذية واللياقة البدنية يحلل صور الطعام لتقدير السعرات الحرارية والعناصر الغذائية والماكروز. يمكن للمستخدمين تسجيل الوجبات بالصورة أو النص، وتتبع السعرات والبروتين والخطوات والتمارين والمكملات الغذائية، والوصول إلى سجل طعامهم الكامل.\n\nيمكن للنظام أيضاً إنشاء خطط وجبات يومية، وإرسال ثلاث رسائل متابعة يومية، وتقديم تقارير تقدم شهرية تشمل التغذية والنشاط والتغيرات في الوزن.",
  },
  {
    id: "ecommerce-chatbot",
    image: "/workflows/ecommerce-chatbot.png",
    titleEn: "AI E-Commerce Chatbot",
    titleAr: "شات بوت التجارة الإلكترونية الذكي",
    descriptionEn:
      "An AI-powered shopping assistant connected to a website that helps customers find products, view images and details, and place orders through natural conversation. It understands requests, recommends suitable products, and confirms orders.\n\nThe product catalog is fully synchronized, so any changes to prices, products, or availability are automatically reflected in the chatbot in real time.",
    descriptionAr:
      "مساعد تسوق ذكي متصل بالموقع الإلكتروني يساعد العملاء في إيجاد المنتجات، وعرض الصور والتفاصيل، وتقديم الطلبات من خلال محادثة طبيعية. يفهم الطلبات، ويوصي بالمنتجات المناسبة، ويؤكد الطلبات.\n\nكتالوج المنتجات متزامن بالكامل، بحيث تنعكس أي تغييرات في الأسعار أو المنتجات أو التوفر تلقائياً في الشات بوت بشكل فوري.",
  },
  {
    id: "facebook-engagement",
    image: "/workflows/facebook-engagement.png",
    titleEn: "Facebook AI Customer Engagement",
    titleAr: "تفاعل العملاء الذكي على فيسبوك",
    descriptionEn:
      "An AI-powered automation that instantly responds to Facebook comments and continues the conversation with customers through Messenger. It handles high volumes of comments automatically and can send customers a private message within seconds.",
    descriptionAr:
      "أتمتة ذكية ترد فوراً على تعليقات فيسبوك وتواصل المحادثة مع العملاء عبر Messenger. تتعامل مع أعداد كبيرة من التعليقات تلقائياً، وبإمكانها إرسال رسالة خاصة للعملاء في غضون ثوانٍ.",
  },
  {
    id: "automotive-service",
    image: "/workflows/automotive-service.png",
    titleEn: "AI Automotive Service Automation",
    titleAr: "أتمتة خدمات السيارات الذكية",
    descriptionEn:
      "An AI-powered automation system for a Saudi automotive service company that manages oil changes, maintenance services, repairs, and customer appointments using vehicle and customer information such as plate numbers and phone numbers.\n\nThe system also helps management track financial operations, manage contracts, and plan future activities. It can analyze images and PDF documents, extract company-related information, and compare historical data with current operations.",
    descriptionAr:
      "نظام أتمتة ذكي لشركة خدمات سيارات سعودية يدير تغيير الزيوت وخدمات الصيانة والإصلاحات ومواعيد العملاء باستخدام معلومات المركبات والعملاء مثل أرقام اللوحات وأرقام الهواتف.\n\nيساعد النظام الإدارة أيضاً في تتبع العمليات المالية وإدارة العقود والتخطيط للأنشطة المستقبلية. كما يمكنه تحليل الصور ومستندات PDF واستخراج المعلومات المتعلقة بالشركة ومقارنة البيانات التاريخية مع العمليات الحالية.",
  },
  {
    id: "fashion-chatbot",
    image: "/workflows/fashion-chatbot.png",
    titleEn: "AI Fashion Store Chatbot",
    titleAr: "شات بوت متجر الأزياء الذكي",
    descriptionEn:
      "An AI-powered chatbot for a Saudi fashion store, connected to Google Sheets and the brand's product catalog. It helps customers browse products, check sizes and colors, view product images, and place orders.\n\nCustomers can also send a product image to check its availability and receive its details. The chatbot handles customer complaints and is fully trained on the brand's information. Every order is automatically recorded and sent to the business owner via WhatsApp and email.",
    descriptionAr:
      "شات بوت ذكي لمتجر أزياء سعودي، متصل بـ Google Sheets وكتالوج منتجات العلامة التجارية. يساعد العملاء في تصفح المنتجات والتحقق من المقاسات والألوان وعرض صور المنتجات وتقديم الطلبات.\n\nيمكن للعملاء أيضاً إرسال صورة منتج للتحقق من توفره واستقبال تفاصيله. يتعامل الشات بوت مع شكاوى العملاء وهو مدرب بالكامل على معلومات العلامة التجارية. كل طلب يُسجَّل تلقائياً ويُرسَل لصاحب العمل عبر WhatsApp والبريد الإلكتروني.",
  },
  {
    id: "voice-receptionist",
    image: "/workflows/voice-receptionist.png",
    titleEn: "AI Voice Receptionist for Medical Clinics",
    titleAr: "موظف الاستقبال الصوتي الذكي للعيادات",
    descriptionEn:
      "A 24/7 AI voice receptionist that handles patient calls naturally and professionally. It can provide information about doctors, services, and availability, answer patient inquiries, book appointments, process cancellations, and handle complaints.\n\nThe agent follows the clinic's knowledge base, avoids answering questions outside its scope, and politely redirects or ends the call when necessary—providing an always-available experience similar to a human receptionist.",
    descriptionAr:
      "موظف استقبال صوتي ذكي يعمل 24/7 ويتعامل مع مكالمات المرضى بشكل طبيعي واحترافي. يمكنه تقديم معلومات عن الأطباء والخدمات والمواعيد المتاحة، والإجابة على استفسارات المرضى، وحجز المواعيد، ومعالجة الإلغاءات، والتعامل مع الشكاوى.\n\nيلتزم الوكيل بقاعدة معرفة العيادة، ويتجنب الإجابة على أسئلة خارج نطاق عمله، ويُعيد التوجيه أو ينهي المكالمة بأدب عند الضرورة—مما يوفر تجربة متاحة دائماً مشابهة لموظف الاستقبال البشري.",
  },
];

function wrap(index: number, length: number) {
  return ((index % length) + length) % length;
}

export default function ProjectGallery() {
  const { language, isRTL } = useLanguage();
  const isAr = language === "ar";
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const total = projects.length;
  const prev = wrap(current - 1, total);
  const next = wrap(current + 1, total);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setCurrent((c) => wrap(c + dir, total));
  };

  const activeProject = projects[current];
  const activeTitle = isAr ? activeProject.titleAr : activeProject.titleEn;
  const activeDesc = isAr ? activeProject.descriptionAr : activeProject.descriptionEn;

  // 0.3s ease slide transition
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
    }),
  };

  return (
    <div className="w-full">
      {/* Dots Navigation */}
      <div className="flex items-center justify-end gap-2 mb-8">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? "24px" : "8px",
              height: "8px",
              background:
                i === current ? "#b5804a" : "rgba(181, 128, 74, 0.35)",
              boxShadow:
                i === current ? "0 0 10px rgba(181, 128, 74, 0.6)" : "none",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Carousel Container with Prominent Side Peeks (Desktop) ── */}
      <div className="relative w-full overflow-hidden select-none py-2">
        
        {/* Left Peeking Preview — Desktop Only */}
        <div
          className="hidden lg:block absolute left-0 top-0 bottom-0 w-[15%] z-10 cursor-pointer group"
          onClick={() => go(-1)}
          aria-label="Previous project preview"
        >
          <div
            className="w-full h-full relative overflow-hidden rounded-2xl border transition-all duration-300 group-hover:opacity-100 group-hover:scale-95 group-hover:border-[#b5804a]"
            style={{
              opacity: 0.75,
              transform: "scale(0.93)",
              transformOrigin: "right center",
              borderColor: "rgba(181, 128, 74, 0.4)",
              background: "#140f0a",
              boxShadow: "0 12px 35px rgba(0,0,0,0.6)",
            }}
          >
            <Image
              src={projects[prev].image}
              alt={isAr ? projects[prev].titleAr : projects[prev].titleEn}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="260px"
            />
            {/* Subtle Edge Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, rgba(13,9,5,0.45) 0%, transparent 65%)",
              }}
            />
          </div>
        </div>

        {/* ── Center Active Large Image ── */}
        <div className="relative mx-auto lg:w-[68%] w-full z-20">
          <div
            className="relative w-full overflow-hidden rounded-2xl shadow-2xl"
            style={{
              aspectRatio: "16/9",
              border: "1px solid rgba(181, 128, 74, 0.45)",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.7), 0 0 35px rgba(181,128,74,0.15)",
              background: "#080604",
            }}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeProject.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={activeProject.image}
                  alt={activeTitle}
                  fill
                  className="object-contain object-center p-1 sm:p-2"
                  sizes="(max-width: 1024px) 100vw, 68vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Subtle bottom fade */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(13,9,5,0.6) 0%, transparent 35%)",
              }}
            />

            {/* Left Arrow Button */}
            <button
              onClick={() => go(-1)}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group"
              style={{
                background: "#b5804a",
                border: "1px solid rgba(181, 128, 74, 0.8)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 4px 20px rgba(181,128,74,0.4)",
              }}
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" style={{ color: "#1a0f00" }} />
            </button>

            {/* Right Arrow Button */}
            <button
              onClick={() => go(1)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group"
              style={{
                background: "#b5804a",
                border: "1px solid rgba(181, 128, 74, 0.8)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 4px 20px rgba(181,128,74,0.4)",
              }}
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" style={{ color: "#1a0f00" }} />
            </button>
          </div>
        </div>

        {/* Right Peeking Preview — Desktop Only */}
        <div
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-[15%] z-10 cursor-pointer group"
          onClick={() => go(1)}
          aria-label="Next project preview"
        >
          <div
            className="w-full h-full relative overflow-hidden rounded-2xl border transition-all duration-300 group-hover:opacity-100 group-hover:scale-95 group-hover:border-[#b5804a]"
            style={{
              opacity: 0.75,
              transform: "scale(0.93)",
              transformOrigin: "left center",
              borderColor: "rgba(181, 128, 74, 0.4)",
              background: "#140f0a",
              boxShadow: "0 12px 35px rgba(0,0,0,0.6)",
            }}
          >
            <Image
              src={projects[next].image}
              alt={isAr ? projects[next].titleAr : projects[next].titleEn}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="260px"
            />
            {/* Subtle Edge Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to left, rgba(13,9,5,0.45) 0%, transparent 65%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Project Info below Center Image ── */}
      <div className="relative lg:w-[68%] w-full mx-auto mt-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`info-${activeProject.id}`}
            custom={direction}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            className="space-y-3"
          >
            {/* Title */}
            <div>
              <h4
                className="font-serif font-bold text-xl sm:text-2xl"
                style={{ color: "#f0e6d6" }}
              >
                {activeTitle}
              </h4>
            </div>

            {/* Description */}
            <p
              className="text-sm sm:text-base leading-relaxed whitespace-pre-line"
              style={{ color: "#c4b5a5" }}
            >
              {activeDesc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
