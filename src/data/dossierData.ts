export interface ExpertSection {
  role: string;
  expertName: string;
  avatarIcon: string;
  title: string;
  summary: string;
  keyPillars: {
    title: string;
    description: string;
    deliverables: string[];
  }[];
  deepDiveMarkdown: string;
}

export const EXPERT_DOSSIER_DATA: Record<string, ExpertSection> = {
  pm: {
    role: 'Product Manager',
    expertName: 'Marcus Vance, Ex-Head of Product en Dating Tech',
    avatarIcon: 'Briefcase',
    title: 'Visión de Producto, Investigación de Mercado y Modelo de Negocio',
    summary: 'Análisis estratégico del mercado global de citas ($9.6B en 2026), deficiencias críticas de Tinder/Bumble en conexiones internacionales y diseño de monetización sostenible.',
    keyPillars: [
      {
        title: 'Investigación de Mercado & Oportunidad Global',
        description: 'Tinder, Bumble y Badoo están hiper-localizados (radio de 50-100 km). Más del 68% de los usuarios de la Generación Z y nómadas digitales expresan frustración por superficialidad y barreras lingüísticas.',
        deliverables: [
          'TAM: $9.6B mercado global de online dating',
          'SAM: $2.4B mercado de citas transfronterizas, expatriados y poliglotas',
          'SOM (Año 1-2): $48M con foco en corredores clave (LatAm-Europa, Asia-Norteamérica)',
          'Pain points resueltos: "Swiping fatigue", estafas por perfiles falsos y barrera idiomática'
        ]
      },
      {
        title: 'Modelo de Negocio & Unit Economics',
        description: 'Estructura híbrida Freemium + Suscripciones Escalonadas (WorldPass $14.99/mes, Global VIP $29.99/mes) + Microtransacciones de Monedas Globales ("WorldCoins").',
        deliverables: [
          'ARPU esperado: $6.80 blended (vs $4.10 en Tinder gracias al pasaporte cultural)',
          'CAC Blended inicial: $4.20 con viralidad orgánica por eventos de idiomas',
          'LTV estimado a 12 meses: $48.50',
          'LTV / CAC Ratio proyectado: 11.5x en cohorte de viajeros frecuentes',
          'Conversión a pago objetivo: 7.2% (apoyado en traducción ilimitada y Travel Teleport)'
        ]
      },
      {
        title: 'MVP en 90 Días con Presupuesto Optimizado',
        description: 'Presupuesto total de arranque: $18,500 USD para llegar a beta pública en App Store y Google Play con 10,000 usuarios activos.',
        deliverables: [
          'Día 1-30: Core matching + Swipe + Auth multifactor + Biometría básica',
          'Día 31-60: Chat con Traducción Gemini Flash + Audio notes + Sistema de Pasaporte cultural',
          'Día 61-90: Salas de eventos grupales + Integración de pagos Stripe/Apple Pay + Beta cerrada',
          'Desglose de inversión: Infraestructura ($2.5k), APIs IA ($1.8k), Legal & KYC ($3.2k), Growth Seed ($11.0k)'
        ]
      }
    ],
    deepDiveMarkdown: `
### Análisis Competitivo Diferencial

| Característica | Tinder | Bumble | Badoo | **WorldConnect** |
| :--- | :--- | :--- | :--- | :--- |
| **Enfoque Geográfico** | Local (5-100km) | Local (Mujeres inician) | Local / Cercanía | **Global sin fronteras (200+ países)** |
| **Traducción en Chat** | Inexistente / Manual | No disponible | No disponible | **IA en Tiempo Real (Gemini Flash)** |
| **Matching Psicológico** | Algoritmo ELO superficial | Filtros básicos | Popularidad | **Sinergia MBTI + Matriz de Valores** |
| **Seguridad Anti-Fraude** | Selfie estático básico | Foto simple | Verificación básica | **Biometría 3D + Detección IA de Red Flags** |
| **Social / Eventos** | Swipe Night ocasional | Bumble BFF | Livestreams genéricos | **Eventos Internacionales + Citas 3D** |
| **Gamificación Cultural** | Ninguna | Insignias simples | Insignias simples | **Pasaporte con Sellos, Niveles & XP** |
`
  },
  ux: {
    role: 'UX/UI Designer',
    expertName: 'Elena Rostova, Senior Apple Design Awardee',
    avatarIcon: 'Palette',
    title: 'Filosofía de Diseño Apple-Grade, Ergonomía Móvil y Wireframing',
    summary: 'Construcción de un lenguaje visual sofisticado: azul ultramar, violeta cinemático y blanco puro con desenfoques glassmorphic, microinteracciones a 120 FPS y pulgares en zona natural.',
    keyPillars: [
      {
        title: 'Lenguaje Visual & Sistema de Diseño',
        description: 'Inspirado en iOS 18 con superficies translúcidas (Frosted Glass), tipografía moderna (Plus Jakarta Sans) y contraste accesible para exteriores.',
        deliverables: [
          'Paleta cromática: Deep Slate (#020617), Electric Indigo (#4f46e5), Neon Violet (#7c3aed), Pure White',
          'Regla 60-30-10: 60% lienzo oscuro o claro neutro, 30% tarjetas sutiles, 10% acentos interactivos',
          'Zero-Pill discipline: Metadatos con separadores limpios tipográficos (· / -), sin cápsulas estáticas',
          'Modo Oscuro / Modo Claro nativo sincronizado'
        ]
      },
      {
        title: 'Ergonomía Thumb-Zone (Alcance Natural)',
        description: 'El 80% de las acciones críticas (Swipe, Super Like, Enviar Mensaje, Traducir, Cambiar Tab) se ubican en los 140px inferiores de la pantalla.',
        deliverables: [
          'Áreas táctiles mínimas de 48x48px para evitar toques involuntarios',
          'Sticky bottom cap estricto < 15% del viewport para maximizar la visibilidad de fotos',
          'Haptic feedback táctil en Like, Super Like y apertura de traducción',
          'Animaciones con curvas Apple ease-out cubic-bezier(0.16, 1, 0.3, 1)'
        ]
      },
      {
        title: 'Flujos de Usuario y Experiencia de Primera Cita Virtual',
        description: 'Rediseño de la primera cita a distancia para eliminar la incomodidad ("awkward silence") mediante dinámicas guiadas.',
        deliverables: [
          'Flujo Onboarding 60 segundos: Social login -> Selfie liveness 3D -> Selección de 3 pasiones',
          'Rompehielos asistido por IA: Sugerencias culturales automáticas para dar el primer paso',
          'Salas 3D de Citas Virtuales: Café en Roma, Paseo por Montmartre o Noche Estrellada con juegos de preguntas'
        ]
      }
    ],
    deepDiveMarkdown: `
### Arquitectura de Pantallas del MVP
1. **Screen 01: Discover & Swipe Deck** (Tarjetas gestuales fluidas con reproducción de audio bio, banderas de idiomas y radar de compatibilidad).
2. **Screen 02: World Explorer & Map View** (Mapa interactivo de continentes con buscador por país y filtrado de usuarios en línea).
3. **Screen 03: Smart Chat & Translation Engine** (Mensajes bidireccionales con toggle "Mostrar Original / Traducido", grabador de voz y selector de Icebreakers).
4. **Screen 04: Cultural Passport & Gamification Hub** (Sellos de países visitados/conversados, XP de idiomas, medallas y tienda de monedas).
5. **Screen 05: Live Cultural Hangouts & Virtual Dates** (Salas de audio/video comunitarias y experiencias inmersivas 1 a 1).
`
  },
  dev: {
    role: 'Desarrollador Full Stack',
    expertName: 'Dr. Hiroshi Sato, Chief Software Architect',
    avatarIcon: 'Code2',
    title: 'Arquitectura Técnica, Base de Datos y Pipeline de IA en Producción',
    summary: 'Arquitectura de baja latencia con React 19, TypeScript, Node.js Express, WebSockets para mensajería instantánea, WebRTC para videollamadas peer-to-peer y Gemini 3.8 Flash para traducción de milisegundos.',
    keyPillars: [
      {
        title: 'Stack Tecnológico Recomendado',
        description: 'Stack de ultra rendimiento probado para escalar de 1,000 a 1,000,000 de conexiones concurrentes.',
        deliverables: [
          'Frontend: React 19 + Vite 8 + Tailwind CSS v4 + Motion + Service Workers (PWA & Native wrapper Capacitor/React Native)',
          'Backend: Node.js Express / NestJS con TypeScript y Bun runtime para procesamiento intensivo',
          'Realtime: WebSockets (Socket.io / ws) + Redis Pub/Sub para chat y presencia online',
          'Video/Audio: WebRTC con servidores TURN/STUN (LiveKit / Twilio Video)',
          'AI Engine: Google GenAI SDK con Gemini 3.8 Flash para traducción (<350ms) y matching MBTI'
        ]
      },
      {
        title: 'Diseño de Base de Datos Relacional / NoSQL Híbrido',
        description: 'PostgreSQL para entidades relacionales transaccionales + MongoDB / Firestore para mensajes de chat de alto volumen + Redis para sesiones y geocaching.',
        deliverables: [
          'Tabla users: id, email, name, birthdate, country_code, city, lat, lng, mbti, selfie_verified, trust_score',
          'Tabla swipes: id, user_id, target_user_id, action (like, pass, superlike), created_at',
          'Tabla matches: id, user_a_id, user_b_id, match_score, is_active, last_message_at',
          'Colección messages: id, match_id, sender_id, text, translated_cache, audio_url, created_at',
          'Tabla passport_stamps: id, user_id, country_code, unlocked_at, interaction_type'
        ]
      },
      {
        title: 'Pipeline de IA y Latencia de Traducción',
        description: 'Proxy server-side seguro en /api/ai/* para proteger credenciales y cachear traducciones recurrentes.',
        deliverables: [
          'Endpoint /api/ai/translate con detección automática de idioma y notas culturales de modismos',
          'Endpoint /api/ai/icebreakers que analiza perfiles cruzados para sugerencias hiper-personalizadas',
          'Cache LRU en Redis para frases comunes (ahorro del 60% en costos de API)',
          'Fallback instantáneo con fall-safe para operar 100% offline o con latencia de red elevada'
        ]
      }
    ],
    deepDiveMarkdown: `
### Esquema Relacional PostgreSQL (DDL Core)
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  birthdate DATE NOT NULL,
  gender VARCHAR(20),
  country_code CHAR(2) NOT NULL,
  city VARCHAR(100) NOT NULL,
  geom GEOMETRY(Point, 4326),
  mbti CHAR(4),
  bio TEXT,
  languages_spoken TEXT[],
  native_language VARCHAR(50),
  selfie_verified BOOLEAN DEFAULT FALSE,
  trust_score INT DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_a UUID REFERENCES users(id) ON DELETE CASCADE,
  user_b UUID REFERENCES users(id) ON DELETE CASCADE,
  synergy_score INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_geom ON users USING GIST (geom);
CREATE INDEX idx_matches_users ON matches (user_a, user_b);
\`\`\`
`
  },
  marketing: {
    role: 'Especialista en Marketing & Growth',
    expertName: 'Camila Duarte, Ex-Growth Director en Consumer Apps',
    avatarIcon: 'TrendingUp',
    title: 'Estrategia de Crecimiento, Adquisición Viral y Plan de Lanzamiento',
    summary: 'Plan go-to-market sin quemar capital: aprovechamiento de comunidades políglotas, nómadas digitales, creadores de contenido de intercambio cultural y optimización de App Store (ASO).',
    keyPillars: [
      {
        title: 'Estrategia de Lanzamiento en 3 Fases (Día 0 a Día 90)',
        description: 'Lanzamiento concentrado en corredores específicos ("City Pairs") para evitar el problema del huevo y la gallina.',
        deliverables: [
          'Fase 1 (Día 1-30): Alpha cerrada con 500 nómadas digitales y estudiantes de intercambio (Madrid-Tokio, París-Río)',
          'Fase 2 (Día 31-60): Campaña en TikTok e Instagram Reels sobre "Citas con traducción en tiempo real: ¿Funciona?"',
          'Fase 3 (Día 61-90): Lanzamiento público con evento global "La Noche Mundial de las Citas Virtuales"'
        ]
      },
      {
        title: 'Canales de Adquisición Orgánica y Viralidad (K-Factor > 1.2)',
        description: 'Mecanismo de bucle viral intrínseco donde cada usuario invita a amigos para desbloquear sellos de pasaporte y eventos exclusivos.',
        deliverables: [
          'Programa de Embajadores Universitarios en 25 campus internacionales',
          'Alianzas con plataformas de idiomas (Duolingo/Babbel communities, Tandem, HelloTalk)',
          'Campaña "Comparte tu Pasaporte Cultural" en Instagram Stories (altísima conversión)',
          'ASO enfocado en palabras clave de alta intención: "citas internacionales", "conocer extranjeros", "dating mundial"'
        ]
      },
      {
        title: 'Roadmap de Crecimiento a 12 Meses',
        description: 'Hitos clave para alcanzar 250,000 usuarios registrados y $1.2M de ARR en el primer año.',
        deliverables: [
          'Q1: Lanzamiento MVP móvil + Validación de retención D30 > 28%',
          'Q2: Activación de Salas de Audio/Video Grupales y Citas Virtuales 3D',
          'Q3: Expansión a Latinoamérica y Sudeste Asiático con alianzas de aerolíneas/hostales',
          'Q4: Lanzamiento de "Avatares IA Twins" para pre-evaluación conversacional automática'
        ]
      }
    ],
    deepDiveMarkdown: `
### Proyección de Crecimiento a 12 Meses
- **Mes 3 (Fin de MVP):** 15,000 MAU | 850 Suscriptores Premium | $11,500 MRR
- **Mes 6:** 65,000 MAU | 4,200 Suscriptores Premium | $56,000 MRR
- **Mes 9:** 140,000 MAU | 9,800 Suscriptores Premium | $132,000 MRR
- **Mes 12:** 280,000 MAU | 21,500 Suscriptores Premium | $290,000 MRR (Rentable)
`
  },
  security: {
    role: 'Experto en Seguridad & Privacidad',
    expertName: 'Rafael Mendoza, CISSP, Ex-CISO en Fintech & Social Networks',
    avatarIcon: 'ShieldAlert',
    title: 'Seguridad Integral, Verificación Biométrica y Detección de Fraude IA',
    summary: 'Blindaje completo contra estafas románticas ("Pig Butchering"), perfiles falsos ("Catfishing"), extorsión y cumplimiento estricto con GDPR, CCPA y Apple App Store Guidelines.',
    keyPillars: [
      {
        title: 'Sistema Biométrico Anti-Catfish (Liveness Detection)',
        description: 'Verificación de identidad en dos pasos con prueba de vida activa 3D para garantizar que cada perfil pertenezca a una persona real.',
        deliverables: [
          'Verificación por cámara en tiempo real con rotación de cabeza y gesto aleatorio',
          'Mapeo de similitud vectorial entre el selfie verificado y las fotos subidas a la galería',
          'Insignia azul verificada con hash criptográfico inmutable en backend',
          'Bloqueo inmediato de fotos generadas por IA que intenten suplantar identidad'
        ]
      },
      {
        title: 'Detección Automatizada de Estafas Románticas por IA',
        description: 'Modelo de detección de texto en segundo plano que analiza señales de alerta sin violar la privacidad del usuario.',
        deliverables: [
          'Alerta proactiva si un usuario solicita transferencias de dinero, criptomonedas o links sospechosos',
          'Restricción temporal y revisión humana en caso de patrones de romance scam ("Love Bombing" rápido)',
          'Score de Confianza Dinámico (TrustScore de 0 a 100 visible en cada perfil)',
          'Modo Fantasma / Travel Privacy para ocultar la ubicación exacta en países de riesgo'
        ]
      },
      {
        title: 'Privacidad, Cifrado y Cumplimiento Normativo',
        description: 'Seguridad por diseño para proteger datos personales sensibles, orientación y preferencias.',
        deliverables: [
          'Cifrado en tránsito (TLS 1.3 con HSTS) y en reposo (AES-256 en base de datos)',
          'Cumplimiento con RGPD (Derecho al olvido en 1-clic y exportación de datos en JSON)',
          'Moderación automática de fotos y contenidos inapropiados con Gemini Vision / safe-content filters',
          'Botón de Emergencia SOS y reporte anónimo con evidencia cifrada en 2 toques'
        ]
      }
    ],
    deepDiveMarkdown: `
### Protocolo de Prevención de Fraude en 4 Capas
1. **Capa 1 - Onboarding:** Verificación de número telefónico vía SMS OTP + verificación de reputación de IP.
2. **Capa 2 - Perfil:** Análisis biométrico de prueba de vida 3D + verificación de fotos contra bases de datos públicas de fotos de stock.
3. **Capa 3 - Mensajería:** Filtro inteligente de palabras clave de estafas financieras (Crypto, Binance, Western Union, Emergencia médica).
4. **Capa 4 - Comunidad:** Sistema de reporte asistido con bloqueo bidireccional instantáneo y expulsión permanente por huella de dispositivo.
`
  }
};
