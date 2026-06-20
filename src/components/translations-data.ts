export const extraTranslations = {
  en: {
    experience: {
      openleaf: {
        role: 'Backend Developer Intern',
        location: 'Onsite - Mumbai, Maharashtra',
        date: 'Mar 2026 - Present',
        description: 'Building high-performance backend services for a B2B/B2C logistics management platform that delivers end-to-end purchase order automation and supply chain orchestration across enterprise retail channels.',
        achievements: [
          'Developed distributed PO automation pipelines in Go handling multi-channel order ingestion from platforms like Blinkit, Swiggy Instamart, and Zepto.',
          'Engineered PostgreSQL-backed inventory sync services with Redis caching to handle real-time warehouse stock updates at low latency.',
          'Built RESTful and event-driven Node.js microservices for B2B appointment scheduling, NDR tracking, and carrier webhook processing.',
          'Implemented role-based access control (Admin, Warehouse, Seller) with JWT auth middleware across the multi-tenant dashboard API.',
          'Optimized SQL query plans on large order tables (10M+ rows), reducing reporting query time by over 60% via composite indexing and materialized views.'
        ]
      },
      whatbytes: {
        role: 'Backend Developer Intern',
        location: 'Remote',
        date: 'Sep 2025 - Mar 2026',
        description: 'Designed and implemented scalable backend systems, LLM integrations, and automated analytics pipelines.',
        achievements: [
          'Engineered a comprehensive ad analytics flow and LinkedIn ads scraper, enabling automated data extraction and deep performance insights.',
          'Built robust media processing pipelines integrated with OpenAI Whisper for automated audio/video transcription and analysis.',
          'Integrated LLMs and OpenSearch to power advanced semantic search and AI-driven data processing capabilities.',
          'Architected and deployed end-to-end CI/CD pipelines to automate testing and deployments, ensuring high reliability.'
        ]
      },
      talentcorner: {
        role: 'Full Stack Developer Intern',
        location: 'Onsite - Mumbai, Maharashtra',
        date: 'Apr 2025 - Jul 2025',
        description: 'Engineered high-performance lead management and data scraping pipelines.',
        achievements: [
          'Engineered a scalable lead management and verification platform using Node.js and MySQL, streamlining data enrichment pipelines.',
          'Developed intuitive, reusable dashboard modules in React, delivering real-time business metrics and actionable analytics.',
          'Implemented a clean, modular architecture using controller-service-repository patterns to ensure high maintainability.',
          'Set up CI/CD pipelines to automate the build, test, and deployment processes, accelerating feature delivery.'
        ]
      }
    },
    projects: {
      labels: {
        problem: 'The Problem',
        approach: 'The Approach',
        infra: 'Infrastructure & Stack',
        outcome: 'Outcome',
        code: 'Code',
        live: 'Live'
      },
      deeptab: {
        problem: 'Existing tools like Copilot and Cursor Tab are closed-source, locking users into specific models, pricing, and opaque context pipelines with no way to self-host or control cost.',
        approach: 'Built a provider-agnostic completion pipeline with SSE streaming, pending-completion replay, continuation prediction, and reactive configuration — targeting sub-200ms perceived latency.',
        outcome: 'Shipped a working inline completion provider with pluggable model support, local state replay, continuation matching, and a phased roadmap for context gathering, FIM prompting, and caching.'
      },
      snappypro: {
        problem: 'Standard browser capture tools lack developer-grade features like annotation overlays, per-pixel image adjustments, channel curves editing, and optimized GIF encoding.',
        approach: 'Built a Manifest V3 Chrome Extension with multi-mode capture (viewport, full-page scroll-stitch, element selector, custom region), offscreen rendering for recording, and a pure-JS image processing engine.',
        outcome: 'Shipped a lightweight extension with 5 capture modes, a full annotation canvas, 12 one-click filters, interactive RGB channel curves, and high-quality WebM/GIF export via offscreen rendering.'
      },
      shopxindia: {
        problem: 'Monolithic commerce systems couple deployment boundaries and complicate backend scaling.',
        approach: 'Designed domain-bounded microservices unified behind a federated GraphQL gateway.',
        outcome: 'Decoupled services into isolated, auto-scaling deploy units sharing a single typed API schema.'
      },
      socialpedia: {
        problem: 'Syncing live user presence status and chat history with low frontend layout jitter.',
        approach: 'Integrated WebSockets for persistent user messaging and WebRTC for direct audio/video streams.',
        outcome: 'Supports concurrent message broadcasts under 80ms latency and high-fidelity media connection.'
      }
    },
    blogs: {
      title: 'Written Logs',
      latest: 'Latest',
      read: 'Read',
      minRead: 'min read',
      scaling: {
        title: 'Scaling E-Commerce to 10K RPS with GraphQL Federation',
        excerpt: 'How I decomposed a monolithic storefront into federated subgraphs, implemented distributed caching, and achieved sub-100ms P99 latency at scale.',
        content: `When ShopXIndia outgrew its monolithic REST API, I led the migration to a federated GraphQL architecture using Apollo Federation v2. The system was decomposed into five domain-aligned subgraphs — catalog, inventory, orders, users, and payments — each independently deployable and owned by separate teams.\n\nThe critical challenge was query performance. A single storefront page could resolve data across three subgraphs. I implemented a multi-tier caching strategy: Redis for entity-level caching with 30s TTL, DataLoader for request-scoped batching to eliminate N+1 queries, and Cloudflare edge caching for anonymous catalog requests.\n\nAuthentication was handled via a custom gateway plugin that validates JWTs at the router level and propagates user context to subgraphs through headers, avoiding redundant token verification. For observability, I instrumented every resolver with OpenTelemetry spans, feeding into Grafana dashboards that track per-subgraph latency, error rates, and cache hit ratios.\n\nThe result: P99 latency dropped from 1.2s to 87ms, the system comfortably handles 10K requests per second during flash sales, and deployment frequency increased from weekly to multiple times per day per service.`
      },
      websockets: {
        title: 'Building Real-Time Infrastructure: WebSockets at Scale',
        excerpt: 'Architecture decisions behind a real-time messaging system supporting 50K concurrent connections with presence, typing indicators, and WebRTC signaling.',
        content: `SocialPedia required real-time capabilities that went far beyond basic chat — presence tracking, typing indicators, read receipts, live notifications, and peer-to-peer video calling via WebRTC signaling.\n\nI architected the real-time layer using a horizontally scaled WebSocket cluster backed by Redis Pub/Sub for cross-instance message fanout. Each Socket.IO server instance maintains local connection state, while Redis handles room-level broadcasting. This allows us to add WebSocket nodes behind a load balancer without sticky sessions — connections are stateless at the infrastructure level.\n\nFor presence, I implemented a heartbeat-based system where clients send a ping every 15 seconds. Absence of two consecutive pings triggers an offline event propagated to all friends via Redis. Typing indicators use a debounced emit pattern — the client sends a "typing" event, and the server auto-expires it after 3 seconds if no follow-up arrives.\n\nWebRTC signaling was the most complex piece. I built a custom signaling server that handles offer/answer exchange and ICE candidate trickling through the existing WebSocket channel, eliminating the need for a separate signaling infrastructure. TURN server fallback is configured for users behind symmetric NATs.\n\nAt peak, the system sustains 50K concurrent WebSocket connections across 4 nodes with a median message delivery latency of 12ms.`
      },
      zerotrust: {
        title: 'Zero-Trust File Sharing: End-to-End Encryption in the Browser',
        excerpt: 'Implementing client-side AES-256-GCM encryption, pre-signed S3 URLs, and ephemeral access links for a file sharing platform with zero server-side trust.',
        content: `FileShareX was designed around a zero-trust principle: the server should never have access to plaintext file contents. Every file is encrypted client-side using the Web Crypto API with AES-256-GCM before upload.\n\nThe encryption flow works as follows: the browser generates a random 256-bit key and a 96-bit IV per file. The file is encrypted in streaming chunks (64KB buffers) to handle large files without memory pressure. The encrypted blob is uploaded directly to S3 via a pre-signed PUT URL — the server never touches the file bytes. The decryption key is embedded in the URL fragment (after the #), which browsers never send to servers.\n\nFor sharing, I implemented three mechanisms: direct links with the key fragment, QR codes encoding the full URL, and email-based sharing where the recipient gets a link that prompts for a PIN (the PIN derives the decryption key via PBKDF2 with 100K iterations). Ephemeral links auto-expire after a configurable TTL or download count using S3 object lifecycle policies and a Lambda function that revokes pre-signed URLs.\n\nThe architecture uses pre-signed URLs for both upload and download, meaning S3 bandwidth costs are the only storage expense — no application-layer proxy needed. File metadata (name, size, expiry, share method) is stored in MongoDB, but never the encryption key.`
      }
    }
  },
  hi: {
    experience: {
      openleaf: {
        role: 'बैकएंड डेवलपर इंटर्न',
        location: 'ऑनसाइट - मुंबई, महाराष्ट्र',
        date: 'मार्च 2026 - वर्तमान',
        description: 'B2B/B2C लॉजिस्टिक्स प्रबंधन प्लेटफॉर्म के लिए उच्च-प्रदर्शन बैकएंड सेवाओं का निर्माण जो उद्यम खुदरा चैनलों में एंड-टू-एंड खरीद आदेश स्वचालन और आपूर्ति श्रृंखला ऑर्केस्ट्रेशन प्रदान करता है।',
        achievements: [
          'Blinkit, Swiggy Instamart, और Zepto जैसे प्लेटफॉर्म से मल्टी-चैनल ऑर्डर इनजेशन को संभालने वाले Go में वितरित PO ऑटोमेशन पाइपलाइन विकसित की।',
          'कम विलंबता पर वास्तविक समय गोदाम स्टॉक अपडेट को संभालने के लिए Redis कैशिंग के साथ PostgreSQL-समर्थित इन्वेंट्री सिंक सेवाएं तैयार कीं।',
          'B2B अपॉइंटमेंट शेड्यूलिंग, NDR ट्रैकिंग और कैरियर वेबहुक प्रोसेसिंग के लिए RESTful और इवेंट-संचालित Node.js माइक्रोसर्विसेज का निर्माण किया।',
          'मल्टी-टेनेंट डैशबोर्ड एपीआई में JWT प्रमाणीकरण मिडलवेयर के साथ भूमिका-आधारित एक्सेस कंट्रोल (एडमिन, वेयरहाउस, सेलर) लागू किया।',
          'बड़ी ऑर्डर तालिकाओं (10M+ पंक्तियों) पर SQL क्वेरी योजनाओं को अनुकूलित किया, जिससे कंपोजिट इंडेक्सिंग और मटीरियलाइज्ड व्यू के माध्यम से रिपोर्टिंग क्वेरी समय में 60% से अधिक की कमी आई।'
        ]
      },
      whatbytes: {
        role: 'बैकएंड डेवलपर इंटर्न',
        location: 'रिमोट',
        date: 'सितंबर 2025 - मार्च 2026',
        description: 'स्केलेबल बैकएंड सिस्टम, एलएलएम एकीकरण और स्वचालित विश्लेषण पाइपलाइनों का डिज़ाइन और कार्यान्वयन किया।',
        achievements: [
          'एक व्यापक विज्ञापन विश्लेषण प्रवाह और लिंक्डइन विज्ञापन स्क्रैपर तैयार किया, जिससे स्वचालित डेटा निष्कर्षण और गहरा प्रदर्शन विश्लेषण सक्षम हुआ।',
          'स्वचालित ऑडियो/वीडियो ट्रांसक्रिप्शन और विश्लेषण के लिए OpenAI Whisper के साथ एकीकृत मजबूत मीडिया प्रोसेसिंग पाइपलाइनों का निर्माण किया।',
          'उन्नत सिमेंटिक खोज और एआई-संचालित डेटा प्रोसेसिंग क्षमताओं को शक्ति प्रदान करने के लिए एलएलएम और ओपनसर्च को एकीकृत किया।',
          'उच्च विश्वसनीयता सुनिश्चित करते हुए, परीक्षणों और परिनियोजन को स्वचालित करने के लिए एंड-टू-एंड सीआई/सीडी पाइपलाइन का निर्माण और संचालन किया।'
        ]
      },
      talentcorner: {
        role: 'फुल स्टैक डेवलपर इंटर्न',
        location: 'ऑनसाइट - मुंबई, महाराष्ट्र',
        date: 'अप्रैल 2025 - जुलाई 2025',
        description: 'उच्च प्रदर्शन वाले लीड प्रबंधन और डेटा स्क्रैपिंग पाइपलाइनों का निर्माण किया।',
        achievements: [
          'Node.js और MySQL का उपयोग करके एक स्केलेबल लीड प्रबंधन और सत्यापन मंच तैयार किया, जिससे डेटा संवर्धन पाइपलाइनों को सुव्यवस्थित किया गया।',
          'React में सहज, पुन: प्रयोज्य डैशबोर्ड मॉड्यूल विकसित किए, जो वास्तविक समय के व्यावसायिक मेट्रिक्स और कार्रवाई योग्य विश्लेषण प्रदान करते हैं।',
          'उच्च रखरखाव सुनिश्चित करने के लिए नियंत्रक-सेवा-भंडार पैटर्न का उपयोग करके एक स्वच्छ, मॉड्यूलर वास्तुकला को लागू किया।',
          'फीचर डिलीवरी में तेजी लाते हुए, निर्माण, परीक्षण और परिनियोजन प्रक्रियाओं को स्वचालित करने के लिए सीआई/सीडी पाइपलाइन स्थापित की।'
        ]
      }
    },
    projects: {
      labels: {
        problem: 'समस्या',
        approach: 'दृष्टिकोण',
        infra: 'बुनियादी ढांचा और तकनीक',
        outcome: 'परिणाम',
        code: 'कोड',
        live: 'लाइव'
      },
      deeptab: {
        problem: 'Copilot और Cursor Tab जैसे मौजूदा उपकरण बंद-स्रोत हैं, जो उपयोगकर्ताओं को विशिष्ट मॉडलों, मूल्य निर्धारण और अपारदर्शी संदर्भ पाइपलाइनों में बांधते हैं।',
        approach: 'SSE स्ट्रीमिंग, पेंडिंग-कम्पलीशन रीप्ले, कंटीन्यूएशन प्रेडिक्शन और रिएक्टिव कॉन्फ़िगरेशन के साथ एक प्रदाता-अज्ञेयवादी कम्पलीशन पाइपलाइन बनाई।',
        outcome: 'प्लग करने योग्य मॉडल समर्थन, लोकल स्टेट रीप्ले, कंटीन्यूएशन मैचिंग और FIM प्रॉम्प्टिंग के लिए रोडमैप के साथ एक इनलाइन कम्पलीशन प्रोवाइडर शिप किया।'
      },
      snappypro: {
        problem: 'मानक ब्राउज़र कैप्चर टूल में एनोटेशन ओवरले, प्रति-पिक्सेल इमेज एडजस्टमेंट, चैनल कर्व एडिटिंग और ऑप्टिमाइज़्ड GIF एन्कोडिंग जैसी डेवलपर सुविधाओं का अभाव है।',
        approach: 'मल्टी-मोड कैप्चर, ऑफस्क्रीन रेंडरिंग और प्योर-JS इमेज प्रोसेसिंग इंजन के साथ एक Manifest V3 Chrome एक्सटेंशन बनाया।',
        outcome: '5 कैप्चर मोड, फुल एनोटेशन कैनवास, 12 वन-क्लिक फ़िल्टर, इंटरैक्टिव RGB चैनल कर्व और ऑफस्क्रीन रेंडरिंग के साथ WebM/GIF एक्सपोर्ट शिप किया।'
      },
      shopxindia: {
        problem: 'मोनोलिथिक कॉमर्स सिस्टम परिनियोजन सीमाओं को जोड़ते हैं और बैकएंड स्केलिंग को जटिल बनाते हैं।',
        approach: 'एक संघीय GraphQL गेटवे के पीछे एकीकृत डोमेन-बाउंडेड माइक्रोसर्विसेज का डिज़ाइन तैयार किया।',
        outcome: 'सेवाओं को पृथक, ऑटो-स्केलिंग परिनियोजन इकाइयों में विभाजित किया जो एक ही प्रकार के एपीआई स्कीमा को साझा करती हैं।'
      },
      socialpedia: {
        problem: 'कम फ्रंटएंड लेआउट घबराहट के साथ लाइव उपयोगकर्ता उपस्थिति स्थिति और चैट इतिहास को सिंक करना।',
        approach: 'स्थिर उपयोगकर्ता मैसेजिंग के लिए वेबसॉकेट और प्रत्यक्ष ऑडियो/वीडियो स्ट्रीम के लिए WebRTC को एकीकृत किया।',
        outcome: '80ms से कम विलंबता और उच्च-निष्ठा मीडिया कनेक्शन के तहत समवर्ती संदेश प्रसारण का समर्थन करता है।'
      }
    },
    blogs: {
      title: 'लिखित लॉग्स',
      latest: 'नवीनतम',
      read: 'पढ़ें',
      minRead: 'मिनट का पाठ',
      scaling: {
        title: 'GraphQL फेडरेशन के साथ ई-कॉमर्स को 10K RPS तक स्केल करना',
        excerpt: 'मैंने कैसे एक मोनोलिथिक स्टोरफ्रंट को फ़ेडरेटेड सबग्राफ में विघटित किया, वितरित कैशिंग लागू की, और बड़े पैमाने पर उप-100ms P99 विलंबता प्राप्त की।',
        content: `जब ShopXIndia अपने मोनोलिथिक REST API से आगे निकल गया, तो मैंने Apollo Federation v2 का उपयोग करके एक फ़ेडरेटेड GraphQL आर्किटेक्चर में माइग्रेशन का नेतृत्व किया। सिस्टम को पांच डोमेन-संरेखित सबग्राफ — कैटलॉग, इन्वेंट्री, ऑर्डर, उपयोगकर्ता और भुगतान — में विघटित किया गया था, जिनमें से प्रत्येक स्वतंत्र रूप से तैनात करने योग्य था।\n\nमहत्वपूर्ण चुनौती क्वेरी प्रदर्शन की थी। एक एकल स्टोरफ्रंट पेज तीन सबग्राफ में डेटा हल कर सकता था। मैंने एक बहु-स्तरीय कैशिंग रणनीति लागू की: 30s TTL के साथ इकाई-स्तरीय कैशिंग के लिए Redis, N+1 प्रश्नों को समाप्त करने के लिए अनुरोध-दायरे वाले बैचिंग के लिए DataLoader, और अनाम कैटलॉग अनुरोधों के लिए Cloudflare एज कैशिंग।\n\nप्रमाणीकरण एक कस्टम गेटवे प्लगइन के माध्यम से संभाला गया था जो राउटर स्तर पर JWT को मान्य करता है और हेडर के माध्यम से सबग्राफ में उपयोगकर्ता संदर्भ को प्रसारित करता है।\n\nपरिणाम: P99 विलंबता 1.2s से गिरकर 87ms हो गई, सिस्टम फ्लैश सेल के दौरान प्रति सेकंड 10K अनुरोधों को आराम से संभालता है, और तैनाती की आवृत्ति बढ़ गई है।`
      },
      websockets: {
        title: 'वास्तविक समय अवसंरचना का निर्माण: बड़े पैमाने पर वेबसॉकेट',
        excerpt: 'उपस्थिति, टाइपिंग संकेतक और WebRTC सिग्नलिंग के साथ 50K समवर्ती कनेक्शनों का समर्थन करने वाली एक वास्तविक समय संदेश प्रणाली के पीछे वास्तुकला निर्णय।',
        content: `SocialPedia को वास्तविक समय की क्षमताओं की आवश्यकता थी जो बुनियादी चैट से कहीं आगे थीं — उपस्थिति ट्रैकिंग, टाइपिंग संकेतक, पढ़े गए रसीदें, लाइव सूचनाएं और WebRTC सिग्नलिंग के माध्यम से पीयर-टू-पीयर वीडियो कॉलिंग।\n\nमैंने क्रॉस-इंस्टेंस संदेश फैनआउट के लिए Redis Pub/Sub द्वारा समर्थित क्षैतिज रूप से स्केल किए गए WebSocket क्लस्टर का उपयोग करके वास्तविक समय की परत का निर्माण किया। प्रत्येक Socket.IO सर्वर इंस्टेंस स्थानीय कनेक्शन स्थिति बनाए रखता है, जबकि Redis रूम-स्तरीय प्रसारण को संभालता है।\n\nउपस्थिति के लिए, मैंने एक दिल की धड़कन-आधारित प्रणाली लागू की जहां ग्राहक हर 15 सेकंड में एक पिंग भेजते हैं। लगातार दो पिंग न मिलने पर एक ऑफ़लाइन घटना शुरू होती है।\n\nपीक पर, सिस्टम 12ms की औसत संदेश वितरण विलंबता के साथ 4 नोड्स में 50K समवर्ती वेबसॉकेट कनेक्शन को बनाए रखता है।`
      },
      zerotrust: {
        title: 'शून्य-विश्वास फ़ाइल साझाकरण: ब्राउज़र में एंड-टू-एंड एन्क्रिप्शन',
        excerpt: 'सर्वर-साइड शून्य विश्वास वाले फ़ाइल साझाकरण प्लेटफ़ॉर्म के लिए क्लाइंट-साइड AES-256-GCM एन्क्रिप्शन, प्री-हस्ताक्षरित S3 URL और अल्पकालिक पहुँच लिंक लागू करना।',
        content: `FileShareX को शून्य-विश्वास सिद्धांत के इर्द-गिर्द डिज़ाइन किया गया था: सर्वर के पास कभी भी फ़ाइल सामग्री तक पहुँच नहीं होनी चाहिए। अपलोड से पहले वेब क्रिप्टो एपीआई का उपयोग करके क्लाइंट-साइड में हर फ़ाइल को एन्क्रिप्ट किया जाता है।\n\nएन्क्रिप्शन प्रवाह इस प्रकार काम करता है: ब्राउज़र प्रति फ़ाइल एक यादृच्छिक 256-बिट कुंजी और 96-बिट IV उत्पन्न करता है। फ़ाइल को बफ़र्स में एन्क्रिप्ट किया जाता है। एन्क्रिप्टेड ब्लॉब को सीधे S3 में अपलोड किया जाता है। डिक्रिप्शन कुंजी को URL हैश (#) में एम्बेड किया गया है, जिसे ब्राउज़र कभी भी सर्वर पर नहीं भेजते हैं।\n\nमेटाडेटा MongoDB में संग्रहीत किया जाता है, लेकिन एन्क्रिप्शन कुंजी कभी नहीं।`
      }
    }
  },
  ja: {
    experience: {
      openleaf: {
        role: 'バックエンド開発インターン',
        location: 'オンサイト - ムンバイ、マハラシュトラ',
        date: '2026年3月 - 現在',
        description: 'エンタープライズ小売チャネル全体でエンドツーエンドの発注自動化とサプライチェーンの調整を実現する、B2B/B2C物流管理プラットフォーム向けの高性能なバックエンドサービスの構築。',
        achievements: [
          'Blinkit、Swiggy Instamart、Zeptoなどのプラットフォームからのマルチチャネル注文の取り込みを処理する、Goでの分散型発注自動化パイプラインの開発。',
          '低遅延でリアルタイムの倉庫在庫更新を処理するために、Redisキャッシュを備えたPostgreSQLベースの在庫同期サービスを設計。',
          'B2Bアポイントメントスケジューリング、NDR追跡、および配送業者ウェブフック処理用のRESTfulおよびイベント駆動型Node.jsマイクロサービスの構築。',
          'マルチテナントダッシュボードAPI全体で、JWT認証ミドルウェアを使用したロールベースのアクセス制御（管理者、倉庫、販売者）の実装。',
          '大規模な注文テーブル（1,000万行以上）のSQLクエリプランを最適化し、複合インデックスとマテリアライズドビューによりレポートクエリ時間を60%以上削減。'
        ]
      },
      whatbytes: {
        role: 'バックエンド開発インターン',
        location: 'リモート',
        date: '2025年9月 - 2026年3月',
        description: 'スケーラブルなバックエンドシステム、LLM統合、および自動分析パイプラインの設計と実装。',
        achievements: [
          '包括的な広告分析フローとLinkedIn広告スクレーパーを開発し、自動データ抽出と深いパフォーマンスインサイトを実現。',
          '音声/動画の自動文字起こしと分析のために、OpenAI Whisperを統合した堅牢なメディア処理パイプラインを構築。',
          '高度なセマンティック検索とAI駆動のデータ処理機能を強化するために、LLMとOpenSearchを統合。',
          'テストとデプロイを自動化するためのエンドツーエンドのCI/CDパイプラインを設計・導入し、高い信頼性を確保。'
        ]
      },
      talentcorner: {
        role: 'フルスタック開発インターン',
        location: 'オンサイト - ムンバイ、マハラシュトラ',
        date: '2025年4月 - 2025年7月',
        description: '高性能なリード管理およびデータスクレイピングパイプラインの設計。',
        achievements: [
          'Node.jsとMySQLを使用してスケーラブルなリード管理および検証プラットフォームを開発し、データ拡充パイプラインを合理化。',
          'Reactで直感的かつ再利用可能なダッシュボードモジュールを開発し、リアルタイムのビジネス指標と実用的な分析を提供。',
          '高いメンテナンス性を確保するために、コントローラー・サービス・リポジトリパターンを採用したクリーンでモジュール化されたアーキテクチャを実装。',
          'ビルド、テスト、およびデプロイプロセスを自動化するためのCI/CDパイプラインを構築し、機能リリースのスピードを向上。'
        ]
      }
    },
    projects: {
      labels: {
        problem: '課題',
        approach: 'アプローチ',
        infra: 'インフラ & 技術スタック',
        outcome: '成果',
        code: 'コード',
        live: 'ライブ'
      },
      deeptab: {
        problem: 'CopilotやCursor Tabなどの既存ツールはクローズドソースで、ユーザーを特定のモデル、価格設定、不透明なコンテキストパイプラインに固定します。',
        approach: 'SSEストリーミング、保留中の補完リプレイ、継続予測、リアクティブ設定を備えた、プロバイダー非依存の補完パイプラインを構築。',
        outcome: 'プラグ可能なモデルサポート、ローカル状態リプレイ、継続マッチング、FIMプロンプティングのロードマップを備えたインライン補完プロバイダーを出荷。'
      },
      snappypro: {
        problem: '標準のブラウザキャプチャツールには、アノテーションオーバーレイ、ピクセル単位の画像調整、チャンネルカーブ編集、最適化されたGIFエンコーディングなどの開発者向け機能がありません。',
        approach: 'マルチモードキャプチャ、オフスクリーンレンダリング、純粋なJSの画像処理エンジンを備えたManifest V3 Chrome拡張機能を構築。',
        outcome: '5つのキャプチャモード、フルアノテーションキャンバス、12のワンクリックフィルター、インタラクティブRGBチャンネルカーブ、オフスクリーンレンダリングによるWebM/GIFエクスポートを出荷。'
      },
      shopxindia: {
        problem: 'モノリシックなコマースシステムはデプロイ境界を結合し、バックエンドのスケーリングを複雑にします。',
        approach: '連合されたGraphQLゲートウェイの背後に統合された、ドメイン境界に分かれたマイクロサービスを設計。',
        outcome: '単一の型定義されたAPIスキーマを共有する、分離された自動スケーリングデプロイユニットにサービスを分割。'
      },
      socialpedia: {
        problem: 'フロントエンドのレイアウトジッターを抑えながら、ライブユーザーのプレゼンスステータスとチャット履歴を同期。',
        approach: '永続的なユーザーメッセージングのためのWebSocketと、直接の音声/ビデオストリームのためのWebRTCの統合。',
        outcome: '80ミリ秒未満の遅延と高忠実度メディア接続での同時メッセージブロードキャストをサポート。'
      }
    },
    blogs: {
      title: '活動ログ',
      latest: '最新',
      read: '読む',
      minRead: '分で読める',
      scaling: {
        title: 'GraphQLフェデレーションによるEコマースの10K RPSへのスケール',
        excerpt: 'モノリシックなストアフロントを連合サブグラフに分解し、分散キャッシュを実装し、大規模環境で100ミリ秒未満のP99レイテンシを達成した方法。',
        content: `ShopXIndiaがモノリシックなREST APIから成長した際、私はApollo Federation v2を使用した連合GraphQLアーキテクチャへの移行を主導しました。システムはカタログ、在庫、注文、ユーザー、決済の5つのドメインごとに独立してデプロイ可能なサブグラフに分解されました。\n\n主な課題はクエリ性能でした。1つのページが3つのサブグラフを解決する必要がありました。そのためマルチレベルキャッシュを実装しました。30秒TTLのRedisキャッシュ、N+1クエリを削減するDataLoader、そしてCloudflareエッジキャッシュです。\n\n結果としてP99レイテンシは1.2秒から87ミリ秒に低下し、システムはフラッシュセール中の10K RPSを容易に処理できるようになりました。`
      },
      websockets: {
        title: 'リアルタイムインフラの構築：大規模環境におけるWebSocket',
        excerpt: 'プレゼンス、タイピングインジケーター、およびWebRTCシグナリングを備え、5万の同時接続をサポートするリアルタイムメッセージングシステムの背後にあるアーキテクチャの決定。',
        content: `SocialPediaには、基本的なチャットを遥かに超えるリアルタイム機能が必要でした。プレゼンス追跡、タイピング表示、ライブ通知、WebRTCによるビデオ通話シグナリングなどです。\n\n私はRedis Pub/Subを活用して水平スケールするWebSocketクラスタを構築しました。各Socket.IOインスタンスがローカルの接続状態を保持し、Redisがクロスインスタンスの配信を処理します。これによってステートレスな接続維持が可能になりました。\n\nピーク時、このシステムは4ノードで5万の同時接続を維持し、平均遅延12ミリ秒を達成しました。`
      },
      zerotrust: {
        title: 'ゼロトラストファイル共有：ブラウザでのエンドツーエンド暗号化',
        excerpt: 'サーバー側の信頼がゼロのファイル共有プラットフォーム向けに、クライアント側AES-256-GCM暗号化、署名付きS3 URL、および一時的なアクセスリンクの実装。',
        content: `FileShareXは、サーバーが平文データに絶対にアクセスできない「ゼロトラスト」を基本に設計されました。アップロード前にブラウザでWeb Crypto APIを使用し、AES-256-GCMでファイルを暗号化します。\n\n暗号化キーはURLのハッシュ断片（#）に含まれ、これはサーバーに送信されません。したがって、サーバーはファイルの中身を知ることができません。\n\nファイル名やサイズなどのメタデータはMongoDBに格納されますが、暗号化キーは一切サーバー側に保存されません。`
      }
    }
  }
}


