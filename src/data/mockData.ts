import { UserProfile, MatchConversation, GlobalEvent, UserPassportData } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'me',
  name: 'Alejandro',
  age: 27,
  country: 'España',
  countryCode: 'ES',
  flag: '🇪🇸',
  city: 'Madrid / Barcelona',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  ],
  bio: 'Arquitecto de software y viajero curioso. Apasionado por la gastronomía mediterránea, el senderismo alpino y aprender nuevos idiomas.',
  occupation: 'Lead Product Engineer',
  languages: ['Español (Nativo)', 'Inglés (C1)', 'Japonés (A2)'],
  nativeLanguage: 'Español',
  mbti: 'ENFP',
  interests: ['Fotografía', 'Senderismo', 'Idiomas', 'Café de Especialidad', 'Tecnología', 'Viajes en Tren'],
  intent: 'Amor y Relación Seria',
  distanceKm: 0,
  isOnline: true,
  isVerified: true,
  trustScore: 98,
  zodiac: 'Tauro',
  heightCm: 182,
  prompts: [
    {
      question: 'Mi domingo ideal en el mundo',
      answer: 'Perderme por callejones con encanto buscando librerías antiguas y el mejor espresso de la ciudad.'
    },
    {
      question: 'Lo que más me atrae de otras culturas',
      answer: 'Cómo la música y la cocina cuentan historias que ningún libro de historia puede transmitir.'
    }
  ],
  culturalFact: 'En España cenamos a las 10 PM y las sobremesas pueden durar horas hablando de la vida.'
};

export const PROFILES_CATALOG: UserProfile[] = [
  {
    id: 'p_1',
    name: 'Yuki Tanaka',
    age: 26,
    country: 'Japón',
    countryCode: 'JP',
    flag: '🇯🇵',
    city: 'Tokio (Shibuya)',
    avatar: '/src/assets/images/profile_tokyo_yuki_1792886711549.jpg',
    gallery: [
      '/src/assets/images/profile_tokyo_yuki_1792886711549.jpg',
    ],
    bio: 'Diseñadora gráfica y barista aficionada. Me encanta descubrir templos ocultos en Kioto y practicar mi español. Buscando conectar con almas sensibles y creativas.',
    occupation: 'UI/UX Brand Designer',
    languages: ['Japonés (Nativo)', 'Inglés (Fluido)', 'Español (Intermedio)'],
    nativeLanguage: 'Japonés',
    mbti: 'INFJ',
    interests: ['Café Latte Art', 'Fotografía Callejera', 'Cerámica', 'Manga & Cine', 'Senderismo en Monte Fuji'],
    intent: 'Amor y Relación Seria',
    distanceKm: 10420,
    isOnline: true,
    isVerified: true,
    trustScore: 99,
    voiceBioDuration: 14,
    zodiac: 'Virgo',
    heightCm: 165,
    prompts: [
      {
        question: 'Una tradición de mi país que deberías probar',
        answer: 'Hacer "Shinrin-yoku" (baño de bosque) en primavera escuchando el viento y tomando té verde matcha fresco.'
      },
      {
        question: 'Mi mayor sueño este año',
        answer: 'Hacer un viaje por Andalucía y aprender a bailar flamenco con auténtica pasión.'
      }
    ],
    culturalFact: 'En Tokio tenemos una palabra para mirar la lluvia mientras saboreas café caliente: "Amayadori".'
  },
  {
    id: 'p_2',
    name: 'Julien Laurent',
    age: 28,
    country: 'Francia',
    countryCode: 'FR',
    flag: '🇫🇷',
    city: 'París (Montmartre)',
    avatar: '/src/assets/images/profile_paris_julien_1792886711734.jpg',
    gallery: [
      '/src/assets/images/profile_paris_julien_1792886711734.jpg',
    ],
    bio: 'Enólogo y escritor en mis ratos libres. Amante de la buena conversación, el jazz vinilo y cocinar para personas especiales sin prisas.',
    occupation: 'Sommelier & Gastronomic Writer',
    languages: ['Francés (Nativo)', 'Inglés (C2)', 'Español (B2)', 'Italiano (Conversacional)'],
    nativeLanguage: 'Francés',
    mbti: 'ENFJ',
    interests: ['Catas de Vino', 'Jazz en Directo', 'Literatura Clásica', 'Viajes en Moto', 'Cocina Francesa'],
    intent: 'Amor y Relación Seria',
    distanceKm: 1050,
    isOnline: true,
    isVerified: true,
    trustScore: 96,
    voiceBioDuration: 18,
    zodiac: 'Libra',
    heightCm: 183,
    prompts: [
      {
        question: 'La clave para conquistarme',
        answer: 'Un debate filosófico profundo bajo los puentes del Sena con un buen Pinot Noir y quesos de pueblo.'
      },
      {
        question: 'Mi viaje más inolvidable',
        answer: 'Cruzar los Andes en tren y quedarme sin palabras frente a la inmensidad del cielo nocturno.'
      }
    ],
    culturalFact: 'En París, un croissant crujiente mojado en café matutino es un ritual sagrado de serenidad.'
  },
  {
    id: 'p_3',
    name: 'Camila Ribeiro',
    age: 25,
    country: 'Brasil',
    countryCode: 'BR',
    flag: '🇧🇷',
    city: 'Río de Janeiro (Ipanema)',
    avatar: '/src/assets/images/profile_rio_camila_1792886712005.jpg',
    gallery: [
      '/src/assets/images/profile_rio_camila_1792886712005.jpg',
    ],
    bio: 'Bióloga marina y surfista de amaneceres. La energía del mar me llena el corazón. Me encanta bailar Bossa Nova y compartir la alegría brasileña.',
    occupation: 'Marine Biologist & Eco-Explorer',
    languages: ['Portugués (Nativo)', 'Español (Fluido)', 'Inglés (Fluido)'],
    nativeLanguage: 'Portugués',
    mbti: 'ESFP',
    interests: ['Surf', 'Ecología Marina', 'Bossa Nova', 'Puesta de Sol en Arpoador', 'Açaí Orgánico', 'Capoeira'],
    intent: 'Intercambio Cultural',
    distanceKm: 8120,
    isOnline: true,
    isVerified: true,
    trustScore: 97,
    voiceBioDuration: 12,
    zodiac: 'Sagitario',
    heightCm: 168,
    prompts: [
      {
        question: 'Mi mantra de vida',
        answer: '"Tudo bem!" — No importa cuán agitada esté la marea, siempre saldrá el sol con buena energía.'
      },
      {
        question: 'Si vienes a Río, prometo llevarte a',
        answer: 'A ver la puesta de sol en las piedras de Arpoador donde todos aplaudimos cuando el sol se despide.'
      }
    ],
    culturalFact: 'En Brasil celebramos el afecto con abrazos sinceros de dos vueltas: el "abraço apertado".'
  },
  {
    id: 'p_4',
    name: 'Elena Vance',
    age: 27,
    country: 'Estados Unidos',
    countryCode: 'US',
    flag: '🇺🇸',
    city: 'Nueva York (Brooklyn)',
    avatar: '/src/assets/images/profile_ny_elena_1792886711627.jpg',
    gallery: [
      '/src/assets/images/profile_ny_elena_1792886711627.jpg',
    ],
    bio: 'Arquitecta de rascacielos ecológicos y coleccionista de arte contemporáneo. Fascinada por las ciudades con historia antigua y gente con visión global.',
    occupation: 'Sustainable Architect',
    languages: ['Inglés (Nativo)', 'Español (Avanzado)', 'Alemán (B1)'],
    nativeLanguage: 'Inglés',
    mbti: 'INTJ',
    interests: ['Diseño Urbano', 'Museos de Arte Moderno', 'Podcast de Ciencia', 'Rooftop Lounges', 'Running'],
    intent: 'Networking',
    distanceKm: 5780,
    isOnline: false,
    isVerified: true,
    trustScore: 98,
    voiceBioDuration: 16,
    zodiac: 'Acuario',
    heightCm: 172,
    prompts: [
      {
        question: 'Lo que más valoro en una persona',
        answer: 'Curiosidad genuina por comprender cómo funciona el mundo y valentía para vivir sin fronteras mentales.'
      },
      {
        question: 'Dos verdades y una mentira',
        answer: 'He corrido la maratón de Boston, he diseñado un parque flotante y le tengo fobia a las palomas.'
      }
    ],
    culturalFact: 'En Brooklyn convivimos personas de más de 120 nacionalidades distintas a menos de 5 calles de distancia.'
  }
];

export const INITIAL_CONVERSATIONS: MatchConversation[] = [
  {
    id: 'conv_1',
    profile: PROFILES_CATALOG[0], // Yuki
    lastMessage: 'Konbanwa! Me encantaría que me contaras sobre la comida española auténtica 🌸',
    lastMessageTime: 'Hace 5 min',
    unreadCount: 1,
    compatibilityScore: 94,
    messages: [
      {
        id: 'm1',
        senderId: 'p_1',
        text: 'こんにちは！はじめまして。プロフィールを見て、とても素敵な感性をお持ちだと思いました ✨',
        translatedText: '¡Hola! Encantada de conocerte. Vi tu perfil y sentí que tienes una sensibilidad maravillosa ✨',
        timestamp: '19:42',
        sourceLang: 'ja',
        targetLang: 'es',
        culturalNote: 'Uso de cortesía cálida "Hajimemashite" común al iniciar lazos de amistad sincera.'
      },
      {
        id: 'm2',
        senderId: 'me',
        text: '¡Konnichiwa Yuki! Qué honor conectar contigo desde Tokio. Tu trabajo de diseño es espectacular.',
        translatedText: 'こんにちはユキさん！東京から繋がれて光栄です。あなたのデザインは本当に素晴らしいですね。',
        timestamp: '19:45',
        sourceLang: 'es',
        targetLang: 'ja'
      },
      {
        id: 'm3',
        senderId: 'p_1',
        text: 'Konbanwa! Me encantaría que me contaras sobre la comida española auténtica 🌸 ¿Es verdad que las tapas son un estilo de vida?',
        translatedText: 'Buenas noches! Me encantaría que me contaras sobre la comida española auténtica 🌸 ¿Es verdad que las tapas son un estilo de vida?',
        timestamp: '19:48',
        sourceLang: 'es',
        targetLang: 'es'
      }
    ]
  },
  {
    id: 'conv_2',
    profile: PROFILES_CATALOG[1], // Julien
    lastMessage: 'Salut mon ami! Est-ce que tu connais les vignobles de Bourgogne?',
    lastMessageTime: '18:15',
    unreadCount: 0,
    compatibilityScore: 89,
    messages: [
      {
        id: 'm_j1',
        senderId: 'p_2',
        text: 'Bonjour! Ravi de te rencontrer sur WorldConnect. Tu as l’air d’avoir un esprit voyageur passionné.',
        translatedText: '¡Buenos días! Encantado de conocerte en WorldConnect. Pareces tener un espíritu viajero apasionado.',
        timestamp: '17:30',
        sourceLang: 'fr',
        targetLang: 'es'
      },
      {
        id: 'm_j2',
        senderId: 'me',
        text: '¡Salut Julien! Totalmente. Siempre he creído que viajar abre los ojos y el paladar. ¿Cuál es tu vino favorito?',
        timestamp: '17:50',
        sourceLang: 'es',
        targetLang: 'fr'
      },
      {
        id: 'm_j3',
        senderId: 'p_2',
        text: 'Salut mon ami! Est-ce que tu connais les vignobles de Bourgogne? C’est de la pure poésie.',
        translatedText: '¡Hola amigo! ¿Conoces los viñedos de Borgoña? Es pura poesía en copa.',
        timestamp: '18:15',
        sourceLang: 'fr',
        targetLang: 'es'
      }
    ]
  },
  {
    id: 'conv_3',
    profile: PROFILES_CATALOG[2], // Camila
    lastMessage: 'Oi! Aqui em Copacabana o dia está lindo! Vamos fazer uma chamada de vídeo?',
    lastMessageTime: 'Ayer',
    unreadCount: 0,
    compatibilityScore: 92,
    messages: [
      {
        id: 'm_c1',
        senderId: 'p_3',
        text: 'Oi! Aqui em Copacabana o dia está lindo! Vamos fazer uma chamada de vídeo?',
        translatedText: '¡Hola! ¡Aquí en Copacabana el día está precioso! ¿Hacemos una videollamada para mostrarte el mar?',
        timestamp: 'Ayer 15:10',
        sourceLang: 'pt',
        targetLang: 'es'
      }
    ]
  }
];

export const GLOBAL_EVENTS: GlobalEvent[] = [
  {
    id: 'ev_1',
    title: 'Noche Cultural Tokio x Madrid: Idiomas & Amistad',
    category: 'Intercambio de Idiomas',
    countryFocus: ['🇯🇵 Japón', '🇪🇸 España', '🇲🇽 México'],
    date: 'Hoy',
    time: '21:00 UTC (En 45 min)',
    attendeesCount: 142,
    maxAttendees: 200,
    bannerGradient: 'from-blue-600 via-indigo-600 to-violet-700',
    isLiveNow: true,
    hostName: 'Kenji & Maria (Comunidad WorldConnect)'
  },
  {
    id: 'ev_2',
    title: 'Speed Dating Internacional: Almas Creativas & Nómadas',
    category: 'Speed Dating Global',
    countryFocus: ['🇫🇷 Francia', '🇧🇷 Brasil', '🇺🇸 EE.UU.', '🇩🇪 Alemania'],
    date: 'Mañana',
    time: '19:30 UTC',
    attendeesCount: 88,
    maxAttendees: 100,
    bannerGradient: 'from-fuchsia-600 via-purple-600 to-indigo-700',
    isLiveNow: false,
    hostName: 'Sophie Moreau (Matchmaker IA)'
  },
  {
    id: 'ev_3',
    title: 'LatAm & Bossa Nova Lounge: Música, Charla & Cocktails Virtuales',
    category: 'Cultura & Música',
    countryFocus: ['🇧🇷 Brasil', '🇦🇷 Argentina', '🇨🇴 Colombia'],
    date: 'Viernes',
    time: '23:00 UTC',
    attendeesCount: 210,
    maxAttendees: 300,
    bannerGradient: 'from-amber-500 via-rose-500 to-purple-600',
    isLiveNow: false,
    hostName: 'Camila Ribeiro'
  }
];

export const INITIAL_PASSPORT: UserPassportData = {
  level: 4,
  levelTitle: 'Explorador Cosmopolita',
  xp: 3450,
  xpToNextLevel: 5000,
  stampsCount: 7,
  visitedCountries: ['Japón', 'Francia', 'Brasil', 'Portugal', 'Italia', 'México', 'Reino Unido'],
  coins: 480,
  superLikesLeft: 3,
  boostsLeft: 1,
  isPremium: true,
  premiumTier: 'WorldPass',
  badges: [
    {
      id: 'b1',
      name: 'Políglota Activo',
      icon: '🌐',
      description: 'Hablaste con personas en más de 3 idiomas distintos con traducción IA.',
      unlocked: true
    },
    {
      id: 'b2',
      name: 'Identidad Verificada 100%',
      icon: '🛡️',
      description: 'Superaste la verificación biométrica 3D anti-catfish.',
      unlocked: true
    },
    {
      id: 'b3',
      name: 'Embajador Cultural',
      icon: '🎌',
      description: 'Compartiste recomendaciones locales con 5 matches internacionales.',
      unlocked: true
    },
    {
      id: 'b4',
      name: 'Viajero Transatlántico',
      icon: '✈️',
      description: 'Conectaste con perfiles en 3 continentes diferentes.',
      unlocked: true
    },
    {
      id: 'b5',
      name: 'Maestro de Primera Cita 3D',
      icon: '☕',
      description: 'Completaste una experiencia virtual de cita interactiva.',
      unlocked: false
    }
  ]
};

export const COUNTRIES_DIRECTORY = [
  { code: 'JP', name: 'Japón', flag: '🇯🇵', count: 18420, continent: 'Asia' },
  { code: 'FR', name: 'Francia', flag: '🇫🇷', count: 24100, continent: 'Europa' },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷', count: 31200, continent: 'Sudamérica' },
  { code: 'US', name: 'Estados Unidos', flag: '🇺🇸', count: 52000, continent: 'Norteamérica' },
  { code: 'ES', name: 'España', flag: '🇪🇸', count: 28900, continent: 'Europa' },
  { code: 'IT', name: 'Italia', flag: '🇮🇹', count: 19800, continent: 'Europa' },
  { code: 'KR', name: 'Corea del Sur', flag: '🇰🇷', count: 14300, continent: 'Asia' },
  { code: 'DE', name: 'Alemania', flag: '🇩🇪', count: 22100, continent: 'Europa' },
  { code: 'MX', name: 'México', flag: '🇲🇽', count: 29500, continent: 'Latinoamérica' },
  { code: 'CA', name: 'Canadá', flag: '🇨🇦', count: 17200, continent: 'Norteamérica' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', count: 12400, continent: 'Oceanía' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', count: 18700, continent: 'Sudamérica' }
];
