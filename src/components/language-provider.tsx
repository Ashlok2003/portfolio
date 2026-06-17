'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { extraTranslations } from './translations-data'

export type Language = 'en' | 'hi' | 'ja'

type TranslationDict = {
  nav: {
    about: string
    experience: string
    projects: string
    blogs: string
    contact: string
  }
  hero: {
    title: string
    description: string
    ctaTouch: string
    ctaResume: string
    powerOn: string
    powerOff: string
    location: string
    name: string
  }
  skills: {
    title: string
  }
  experience: {
    title: string
  }
  projects: {
    title: string
    taglines: {
      snappy: string
      deeptab: string
      shopxindia: string
      socialpedia: string
    }
  }
  resume: {
    title: string
    subtitle: string
    download: string
    view: string
  }
  contact: {
    title: string
    heading: string
    subtitle: string
    name: string
    email: string
    subject: string
    message: string
    send: string
    sending: string
    success: string
    error: string
  }
  contributions: {
    title: string
    totalCount: string
    loading: string
  }
  commandPalette: {
    searchPlaceholder: string
    langEnTitle: string
    langEnSubtitle: string
    langHiTitle: string
    langHiSubtitle: string
    langJaTitle: string
    langJaSubtitle: string
  }
  extra: typeof extraTranslations.en
}

const translations: Record<Language, TranslationDict> = {
  en: {
    nav: {
      about: 'about',
      experience: 'experience',
      projects: 'projects',
      blogs: 'blogs',
      contact: 'contact',
    },
    hero: {
      title: 'Software Development Engineer',
      description: 'Building scalable, reliable, production-grade systems and applications.',
      ctaTouch: 'Get in Touch',
      ctaResume: 'View Resume',
      powerOn: 'Power: ON',
      powerOff: 'Power: OFF',
      location: 'India',
      name: 'Ashlok Chaudhary',
    },
    skills: {
      title: 'Skills & Tech Stack',
    },
    experience: {
      title: 'Work Experience',
    },
    projects: {
      title: 'Featured Projects',
      taglines: {
        snappy: 'A fast, secure URL shortener and link manager with real-time analytics.',
        deeptab: 'A productivity browser extension to organize tabs and manage workspace clutter.',
        shopxindia: 'An e-commerce platform offering end-to-end seller tools and order tracking.',
        socialpedia: 'A lightweight social network platform for community building and media sharing.',
      },
    },
    resume: {
      title: 'My Resume',
      subtitle: 'View or download my full professional resume for offline reference.',
      download: 'Download PDF',
      view: 'View Full Screen',
    },
    contact: {
      title: 'Get In Touch',
      heading: "Let's Build Something Together",
      subtitle: "Have a question or want to work together? Drop a message and I'll get back to you.",
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully!',
      error: 'Something went wrong. Please try again.',
    },
    contributions: {
      title: 'Contributions',
      totalCount: 'contributions in the last year',
      loading: 'Loading...',
    },
    commandPalette: {
      searchPlaceholder: 'Search for a section or action…',
      langEnTitle: 'Change language to English',
      langEnSubtitle: 'English language mode',
      langHiTitle: 'Change language to Hindi',
      langHiSubtitle: 'हिन्दी भाषा मोड (Hindi)',
      langJaTitle: 'Change language to Japanese',
      langJaSubtitle: '日本語の表示モード (Japanese)',
    },
    extra: extraTranslations.en,
  },
  hi: {
    nav: {
      about: 'परिचय',
      experience: 'अनुभव',
      projects: 'परियोजनाएं',
      blogs: 'ब्लॉग',
      contact: 'संपर्क',
    },
    hero: {
      title: 'सॉफ्टवेयर डेवलपमेंट इंजीनियर',
      description: 'स्केलेबल, विश्वसनीय और प्रोडक्शन-ग्रेड सिस्टम और अनुप्रयोगों का निर्माण।',
      ctaTouch: 'संपर्क करें',
      ctaResume: 'रिज्यूमे देखें',
      powerOn: 'पावर: चालू',
      powerOff: 'पावर: बंद',
      location: 'भारत',
      name: 'अश्लोक चौधरी',
    },
    skills: {
      title: 'कौशल और तकनीक',
    },
    experience: {
      title: 'कार्य अनुभव',
    },
    projects: {
      title: 'प्रमुख परियोजनाएं',
      taglines: {
        snappy: 'वास्तविक समय विश्लेषण के साथ एक तेज़, सुरक्षित यूआरएल शॉर्टनर।',
        deeptab: 'टैब व्यवस्थित करने और उत्पादकता बढ़ाने के लिए एक ब्राउज़र एक्सटेंशन।',
        shopxindia: 'सैलर टूल्स और ऑर्डर ट्रैकिंग प्रदान करने वाला ई-कॉमर्स प्लेटफॉर्म।',
        socialpedia: 'समुदाय निर्माण और मीडिया साझाकरण के लिए एक लाइटवेट सोशल नेटवर्क।',
      },
    },
    resume: {
      title: 'मेरा रिज्यूमे',
      subtitle: 'ऑफ़लाइन संदर्भ के लिए मेरा पूरा व्यावसायिक रिज्यूमे देखें या डाउनलोड करें।',
      download: 'पीडीएफ डाउनलोड करें',
      view: 'फुल स्क्रीन देखें',
    },
    contact: {
      title: 'संपर्क सूत्र',
      heading: 'आइए मिलकर कुछ नया बनाएं',
      subtitle: 'कोई प्रश्न है या साथ काम करना चाहते हैं? संदेश भेजें और मैं आपसे संपर्क करूंगा।',
      name: 'नाम',
      email: 'ईमेल',
      subject: 'विषय',
      message: 'संदेश',
      send: 'संदेश भेजें',
      sending: 'भेज रहा है...',
      success: 'संदेश सफलतापूर्वक भेजा गया!',
      error: 'कुछ गलत हो गया। कृपया पुन: प्रयास करें।',
    },
    contributions: {
      title: 'योगदान',
      totalCount: 'पिछले वर्ष में योगदान',
      loading: 'लोड हो रहा है...',
    },
    commandPalette: {
      searchPlaceholder: 'अनुभाग या क्रिया खोजें…',
      langEnTitle: 'Change language to English',
      langEnSubtitle: 'अंग्रेजी भाषा मोड',
      langHiTitle: 'भाषा बदलकर हिन्दी करें',
      langHiSubtitle: 'हिन्दी भाषा मोड (Hindi)',
      langJaTitle: 'Change language to Japanese',
      langJaSubtitle: 'जापानी भाषा मोड (Japanese)',
    },
    extra: extraTranslations.hi,
  },
  ja: {
    nav: {
      about: '自己紹介',
      experience: '職歴',
      projects: 'プロジェクト',
      blogs: 'ブログ',
      contact: 'お問い合わせ',
    },
    hero: {
      title: 'ソフトウェア開発エンジニア',
      description: 'スケーラブルで信頼性の高いプロダクションレベルのシステムとアプリケーションの構築。',
      ctaTouch: 'お問い合わせ',
      ctaResume: '履歴書を表示',
      powerOn: '電源: ON',
      powerOff: '電源: OFF',
      location: 'インド',
      name: 'アシュロック・チャウダリー',
    },
    skills: {
      title: 'スキルと技術スタック',
    },
    experience: {
      title: '職務経歴',
    },
    projects: {
      title: '主なプロジェクト',
      taglines: {
        snappy: 'リアルタイム分析機能を備えた高速で安全なURL短縮サービス。',
        deeptab: 'タブを整理し、生産性を高めるためのブラウザ拡張機能。',
        shopxindia: 'エンドツーエンドの販売者ツールと注文追跡を提供するEコマースプラットフォーム。',
        socialpedia: 'コミュニティ構築とメディア共有のための軽量ソーシャルネットワーク。',
      },
    },
    resume: {
      title: '履歴書 / レジュメ',
      subtitle: 'オフライン参照用に、私の完全な職務経歴書を表示またはダウンロードしてください。',
      download: 'PDFをダウンロード',
      view: '全画面表示',
    },
    contact: {
      title: 'お問い合わせ',
      heading: '一緒に素晴らしいものを作りましょう',
      subtitle: 'ご質問やコラボレーションのご提案など、お気軽にお問い合わせください。',
      name: 'お名前',
      email: 'メールアドレス',
      subject: '件名',
      message: 'メッセージ',
      send: '送信する',
      sending: '送信中...',
      success: 'メッセージが正常に送信されました！',
      error: 'エラーが発生しました。もう一度お試しください。',
    },
    contributions: {
      title: 'コントリビューション',
      totalCount: '過去1年間のコントリビューション',
      loading: '読み込み中...',
    },
    commandPalette: {
      searchPlaceholder: 'セクションまたはアクションを検索…',
      langEnTitle: 'Change language to English',
      langEnSubtitle: '英語の表示モード',
      langHiTitle: 'Change language to Hindi',
      langHiSubtitle: 'ヒンディー語の表示モード (Hindi)',
      langJaTitle: '言語を日本語に切り替える',
      langJaSubtitle: '日本語の表示モード (Japanese)',
    },
    extra: extraTranslations.ja,
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationDict
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  // Load language preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('language_pref') as Language
    if (saved === 'en' || saved === 'hi' || saved === 'ja') {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language_pref', lang)
  }

  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
