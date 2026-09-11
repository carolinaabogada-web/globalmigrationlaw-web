/**
 * One-time (re-runnable) content seed for the Global Migration Law site.
 *
 * Populates Sanity with the real, approved ES/EN copy extracted from the
 * Claude Design export (`DC Migración Legal sitio web/*.dc.html`) and
 * uploads the real photos/icons from `scripts/seed-assets/`, so Carolina
 * starts from a fully-written site instead of an empty CMS.
 *
 * Usage:
 *   1. Create a project at https://www.sanity.io/manage, add its
 *      Project ID + dataset to .env.local, and create a token with
 *      "Editor" (write) permissions -> SANITY_API_WRITE_TOKEN.
 *   2. npm run seed
 *
 * Safe to re-run: singleton documents use fixed IDs (createOrReplace),
 * and repeated runs reuse already-uploaded assets by filename.
 */
import path from 'node:path';
import fs from 'node:fs';
import dotenv from 'dotenv';
import { createClient, type SanityClient } from '@sanity/client';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    'Faltan NEXT_PUBLIC_SANITY_PROJECT_ID y/o SANITY_API_WRITE_TOKEN en .env.local. ' +
      'Crea el proyecto de Sanity primero (ver comentario al inicio de este archivo).',
  );
  process.exit(1);
}

const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-11-01',
  token,
  useCdn: false,
});

const ASSETS_DIR = path.resolve(process.cwd(), 'scripts/seed-assets');

const assetCache = new Map<string, string>();

async function uploadImage(filename: string) {
  if (assetCache.has(filename)) {
    return imageField(assetCache.get(filename)!);
  }

  const existing = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename },
  );
  if (existing) {
    assetCache.set(filename, existing);
    return imageField(existing);
  }

  const filePath = path.join(ASSETS_DIR, filename);
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload('image', buffer, { filename });
  assetCache.set(filename, asset._id);
  console.log(`  ✓ subida imagen: ${filename}`);
  return imageField(asset._id);
}

function imageField(assetId: string) {
  return {
    _type: 'image' as const,
    asset: { _type: 'reference' as const, _ref: assetId },
  };
}

function ls(es: string, en: string) {
  return { es, en };
}

async function main() {
  console.log('Subiendo imágenes...');
  const logoHeader = await uploadImage('logo-header.png');
  const logoIcon = await uploadImage('logo-icon.png');
  const logoFooter = await uploadImage('logo-footer.png');
  const heroImage = await uploadImage('hero-pasaporte.jpg');
  const carolinaBandera = await uploadImage('carolina-bandera.png');
  const carolinaTraje = await uploadImage('carolina-traje.png');
  const carolinaRetrato = await uploadImage('carolina-retrato.png');
  const andreaPhoto = await uploadImage('andrea.jpg');
  const santiagoPhoto = await uploadImage('santiago.jpg');
  // Specialty/value icons are NOT uploaded to Sanity — they're bundled as
  // code components (components/icons/) and selected via the `iconKey`
  // string field below, so there's nothing to keep in sync here.

  console.log('Creando documentos...');

  // --- siteSettings ---
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    logoHeader,
    logoIcon,
    logoFooter,
    favicon: logoIcon,
    theme: {
      _type: 'themeColors',
      primary: '#1F3864',
      primaryDark: '#142647',
      accent: '#9C7A32',
      accentSoft: '#C7A65C',
      bg: '#FBFAF8',
      bgAlt: '#F2EEE3',
      cardBg: '#FBFAF8',
      text: '#2B2E33',
      textMuted: '#4B4F56',
      textSoft: '#6B6E74',
      border: '#E7E2D6',
    },
    whatsappNumber: '34600000000',
    whatsappDefaultMessage: ls(
      'Hola, quisiera una asesoría sobre mi caso de extranjería.',
      'Hi, I would like advice on my immigration case.',
    ),
    contactEmail: 'contacto@dcmigracionlegal.com',
    notificationEmail: 'diazcalderoncarolina@gmail.com',
    address: ls('Madrid, España', 'Madrid, Spain'),
    trustpilotUrl: 'https://es.trustpilot.com/review/migrationlaw.es',
    footerTagline: ls(
      'Extranjería · Nacionalidad · Movilidad Internacional',
      'Immigration · Nationality · International Mobility',
    ),
    footerCopyright: ls(
      '© 2026 Global Migration Law',
      '© 2026 Global Migration Law',
    ),
    navHome: ls('Inicio', 'Home'),
    navSpecialties: ls('Especialidades', 'Specialties'),
    navTeam: ls('Nuestro Equipo', 'Our Team'),
    navAbout: ls('Quiénes Somos', 'About Us'),
    popupEnabled: false,
    popupKicker: ls('Primer contacto', 'First contact'),
    popupTitle: ls(
      'Cuéntanos tu caso por WhatsApp',
      'Tell us about your case on WhatsApp',
    ),
    popupBody: ls(
      'Escríbenos y te indicaremos cómo agendar una consulta con la abogada. Este primer contacto sirve para orientarte sobre el servicio; no sustituye a una valoración jurídica.',
      'Message us and we’ll explain how to book a consultation with the lawyer. This first contact is to orient you about the service; it does not replace a legal assessment.',
    ),
    popupButton: ls('Escribir por WhatsApp', 'Message on WhatsApp'),
  });
  console.log('  ✓ siteSettings');

  // --- team members ---
  await client.createOrReplace({
    _id: 'team-carolina',
    _type: 'teamMember',
    name: 'Carolina Díaz Calderón',
    role: ls(
      'Abogada · Dirección del despacho',
      'Attorney at law · Managing lawyer',
    ),
    credentialLine: ls(
      'Colegiada ICAM n.º 97778',
      'Madrid Bar Association (ICAM) no. 97778',
    ),
    bio: ls(
      'Abogada colegiada en el Ilustre Colegio de Abogados de Madrid (ICAM), licenciada por la Universidad Complutense de Madrid, con Máster en Extranjería y Nacionalidad Española y Máster en Protección de Datos por el IE (Instituto de Empresa). Fundadora de Global Migration Law, dirige personalmente cada expediente, combinando conocimiento técnico actualizado con un trato directo y humano hacia cada cliente.\n\nCarolina ha construido su trayectoria en torno a un objetivo claro: acompañar a personas extranjeras y sus familias en procesos que, muchas veces, determinan su futuro en España. Su enfoque combina el dominio normativo con una comunicación clara, en español e inglés, adaptada a cada cliente.',
      'Admitted lawyer with the Madrid Bar Association (ICAM), graduate of Universidad Complutense de Madrid, and holder of a Master’s degree in Immigration and Spanish Nationality Law and a Master’s degree in Data Protection from IE (Instituto de Empresa). As founder of Global Migration Law, Carolina personally oversees every case, combining up-to-date technical expertise with a direct, human approach to each client.\n\nCarolina has built her career around a clear purpose: guiding foreign nationals and their families through processes that often determine their future in Spain. Her approach blends deep regulatory knowledge with clear communication, in both Spanish and English, tailored to each client.',
    ),
    photo: carolinaTraje,
    isLead: true,
    order: 0,
  });
  console.log('  ✓ team-carolina');

  await client.createOrReplace({
    _id: 'team-andrea',
    _type: 'teamMember',
    name: 'Andrea Díaz',
    role: ls('Asesora Legal y Financiera', 'Legal & Financial Advisor'),
    bio: ls(
      'Graduada en Administración de Empresas (ADE) por la Universidad Pontificia de Salamanca, Andrea Díaz aporta a Global Migration Law una visión integral que conecta la estrategia migratoria con la planificación financiera del cliente. Su formación le permite acompañar a personas y familias no solo en el cumplimiento normativo, sino también en las implicaciones económicas de cada proceso.',
      'Andrea Díaz holds a degree in Business Administration (ADE) from Universidad Pontificia de Salamanca. She brings Global Migration Law an integrated perspective that connects immigration strategy with each client’s financial planning, supporting clients through both regulatory compliance and the economic implications of their case.',
    ),
    photo: andreaPhoto,
    isLead: false,
    order: 1,
  });
  console.log('  ✓ team-andrea');

  await client.createOrReplace({
    _id: 'team-santiago',
    _type: 'teamMember',
    name: 'Santiago Rodríguez',
    role: ls(
      'Profesional en Finanzas e Impuestos',
      'Finance & Tax Professional',
    ),
    bio: ls(
      'Financiero egresado de la Universidad de los Andes, Santiago Rodríguez lidera los aspectos fiscales y financieros de los expedientes en Global Migration Law. Su experiencia asegura que cada trámite —desde solvencia económica hasta estructuras patrimoniales— cumpla con los requisitos exigidos por la normativa española.',
      'A finance graduate of Universidad de los Andes, Santiago Rodríguez leads the tax and financial dimensions of case files at Global Migration Law. His expertise ensures that each procedure — from proof of economic means to asset structuring — meets the standards required under Spanish regulations.',
    ),
    photo: santiagoPhoto,
    isLead: false,
    order: 2,
  });
  console.log('  ✓ team-santiago');

  await client.createOrReplace({
    _id: 'team-pilar',
    _type: 'teamMember',
    name: 'Pilar Alzate',
    role: ls('Asesora Legal', 'Legal Advisor'),
    bio: ls(
      'Abogada por la Universidad de Salamanca, Pilar Alzate forma parte del equipo legal de Global Migration Law, donde combina rigor jurídico con un trato cercano hacia cada cliente en sus procesos de extranjería y nacionalidad.',
      'A lawyer trained at Universidad de Salamanca, Pilar Alzate is part of the legal team at Global Migration Law, combining legal rigor with close, personal attention throughout each client’s immigration and nationality process.',
    ),
    isLead: false,
    order: 3,
  });
  console.log('  ✓ team-pilar');

  // --- specialties ---
  const specialtiesData = [
    {
      id: 'specialty-estudios',
      title: ls(
        'Estancias y residencias por estudios',
        'Study-related stays and residence',
      ),
      iconKey: 'studies',
      covers: ls(
        'Autorizaciones de estancia por estudios, prórrogas y modificación a autorización de trabajo (cuenta ajena o propia) al finalizar o durante los estudios.',
        'Study stay authorizations, extensions, and modification to work authorization (employed or self-employed) upon completion of or during studies.',
      ),
      why: ls(
        'El momento y la vía elegidos para modificar tu situación determinan si conservas continuidad legal en España o tienes que volver a empezar.',
        'The timing and pathway you choose determine whether you keep legal continuity in Spain or have to start over.',
      ),
    },
    {
      id: 'specialty-familia',
      title: ls(
        'Residencia de familiares de españoles',
        'Residence for family members of Spanish nationals',
      ),
      iconKey: 'family',
      covers: ls(
        'Autorizaciones de residencia para cónyuges, hijos y otros familiares de ciudadanos españoles, desde España o vía consular, incluyendo supuestos de guarda y custodia de menores.',
        'Residence authorizations for spouses, children, and other family members of Spanish citizens, from within Spain or through consulates, including guardianship of minors.',
      ),
      why: ls(
        'Es una de las vías más rápidas del ordenamiento español, pero también una de las que más se deniega por errores documentales evitables.',
        'One of the fastest pathways under Spanish law — and also one of the most frequently denied over avoidable documentation errors.',
      ),
    },
    {
      id: 'specialty-reagrupacion',
      title: ls('Reagrupación familiar', 'Family reunification'),
      iconKey: 'reunification',
      covers: ls(
        'Reagrupación de cónyuges, hijos y ascendientes de residentes extranjeros en España.',
        'Reunification of spouses, children, and ascendants of foreign residents in Spain.',
      ),
      why: ls(
        'Los requisitos de vivienda, medios económicos y vínculo familiar deben acreditarse con precisión. Un expediente bien preparado evita meses de retrasos.',
        'Housing, financial means, and family-tie requirements must be proven precisely. A well-prepared file avoids months of delays.',
      ),
    },
    {
      id: 'specialty-nacionalidad',
      title: ls('Nacionalidad española', 'Spanish nationality'),
      iconKey: 'nationality',
      covers: ls(
        'Solicitudes de nacionalidad por residencia, por opción y por la vía ibero-americana reducida, incluyendo recursos frente a resoluciones desfavorables o expedientes archivados.',
        'Applications for nationality by residence, by option, and through the reduced Ibero-American pathway, including appeals against unfavorable decisions.',
      ),
      why: ls(
        'Es, para la mayoría de nuestros clientes, el objetivo final de años de trayectoria legal en España.',
        'For most of our clients, this is the culmination of years of legal residence in Spain.',
      ),
    },
    {
      id: 'specialty-modificaciones',
      title: ls(
        'Modificaciones y renovaciones de autorización',
        'Authorization modifications and renewals',
      ),
      iconKey: 'modifications',
      covers: ls(
        'Cambios de situación (estudios a trabajo, no lucrativa a trabajo, etc.) y renovaciones de todo tipo de autorizaciones de residencia y trabajo.',
        'Changes of status (studies to work, non-lucrative to work, etc.) and renewals of all types of residence and work authorizations.',
      ),
      why: ls(
        'Cada modificación se valora con criterios distintos a la autorización original. Planificamos el cambio con antelación suficiente.',
        'Each modification is assessed under different criteria than the original authorization. We plan the transition with enough lead time.',
      ),
    },
    {
      id: 'specialty-nomada',
      title: ls(
        'Visado de Nacionalidad Digital (Nómadas Digitales)',
        'Digital Nomad Visa',
      ),
      iconKey: 'digitalNomad',
      covers: ls(
        'Asesoramiento para trabajadores remotos y autónomos societarios, incluyendo casos de socios minoritarios y estructuras societarias complejas.',
        'Advice for remote workers and self-employed company owners, including minority shareholders and complex corporate structures.',
      ),
      why: ls(
        'No todos los perfiles encajan en el mismo molde. La clave está en acreditar correctamente el control efectivo o el rol de gestión.',
        'Not every profile fits the standard mold. The key is properly proving effective control or a genuine management role.',
      ),
    },
    {
      id: 'specialty-inversores',
      title: ls(
        'Inversores y establecimiento empresarial',
        'Investors and business establishment',
      ),
      iconKey: 'investors',
      covers: ls(
        'Autorizaciones de residencia para inversores y autorizaciones de establecimiento y dirección de empresas en España.',
        'Residence authorizations for investors and authorizations for establishing and managing businesses in Spain.',
      ),
      why: ls(
        'La solidez del proyecto empresarial y la documentación financiera son tan determinantes como el propio capital invertido.',
        'The strength of the business project and its financial documentation matter as much as the capital itself.',
      ),
    },
    {
      id: 'specialty-recursos',
      title: ls(
        'Recursos y procedimientos contenciosos',
        'Appeals and administrative litigation',
      ),
      iconKey: 'appeals',
      covers: ls(
        'Recursos de reposición y alzada frente a resoluciones desfavorables de la administración, incluyendo defectos de notificación y vulneración de la confianza legítima.',
        'Reconsideration and appeal proceedings against unfavorable administrative decisions, including defective notification and breach of legitimate trust.',
      ),
      why: ls(
        'Una denegación o un archivo no es el final del proceso — es el inicio de otro.',
        'A denial or an archived file isn’t the end of the process — it’s the start of another one.',
      ),
    },
  ];

  for (let i = 0; i < specialtiesData.length; i++) {
    const s = specialtiesData[i];
    await client.createOrReplace({
      _id: s.id,
      _type: 'specialty',
      title: s.title,
      slug: { _type: 'slug', current: s.id.replace('specialty-', '') },
      iconKey: s.iconKey,
      covers: s.covers,
      why: s.why,
      order: i,
    });
  }
  console.log(`  ✓ ${specialtiesData.length} especialidades`);

  // --- specialtiesPage ---
  await client.createOrReplace({
    _id: 'specialtiesPage',
    _type: 'specialtiesPage',
    kicker: ls('Especialidades', 'Specialties'),
    title: ls(
      'Derecho de extranjería, sin improvisación',
      'Immigration law, without improvisation',
    ),
    intro: ls(
      'Cada vía tiene requisitos, plazos y criterios de valoración distintos. Diseñamos cada caso desde el análisis normativo y la experiencia práctica en cada uno de estos ámbitos.',
      'Each pathway carries its own requirements, timelines, and evaluation criteria. We build every case on regulatory analysis and practical experience across these areas.',
    ),
    coversLabel: ls('¿Qué cubre?', 'What it covers'),
    whyLabel: ls('Por qué importa la estrategia', 'Why strategy matters'),
    cta: {
      _type: 'ctaBlock',
      title: ls(
        '¿Tienes un caso de extranjería y necesitas una valoración profesional?',
        'Have an immigration case and need a professional assessment?',
      ),
      button: ls('Escríbenos por WhatsApp', 'Message us on WhatsApp'),
    },
  });
  console.log('  ✓ specialtiesPage');

  // --- homePage ---
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    heroKicker: ls(
      'Extranjería · Nacionalidad · Movilidad Internacional · Madrid',
      'Immigration · Nationality · International Mobility · Madrid',
    ),
    heroHeadline: ls(
      'Abogada de extranjería, nacionalidad e inmigración en España',
      'Immigration, residency and nationality lawyer in Spain',
    ),
    heroSubtitle: ls(
      'Detrás de cada expediente hay un proyecto de vida. Te acompaño personalmente, con información clara y trato cercano, en cada paso del camino.',
      'Behind every case file there is a life project. I accompany you personally, with clear information and close attention, at every step of the way.',
    ),
    heroImage,
    heroCtaPrimary: ls('Escríbenos por WhatsApp', 'Message us on WhatsApp'),
    heroCtaSecondary: ls('Ver especialidades', 'View specialties'),
    credentials: [
      ls(
        'Despacho especializado en Extranjería, Inmigración y Nacionalidad',
        'Firm specialized in Immigration, Residency and Nationality law',
      ),
      ls(
        'Dirección jurídica y seguimiento personalizado por la abogada responsable',
        'Legal direction and personal case supervision by the lawyer in charge',
      ),
      ls(
        'Atención en español e inglés · España, Colombia y Reino Unido',
        'Service in Spanish and English · Spain, Colombia and the UK',
      ),
    ],
    lawyerKicker: ls('Tu abogada', 'Your lawyer'),
    lawyerBody: ls(
      'Soy abogada especializada en Derecho de Extranjería, Inmigración y Nacionalidad, y dirijo personalmente cada expediente que asumimos. Trabajo con un equipo con presencia en España, Colombia y Reino Unido, pero la dirección jurídica y el seguimiento de tu caso son siempre míos: sabrás con quién hablas y en qué punto se encuentra tu procedimiento.',
      'I am a lawyer specialized in Spanish immigration, residency and nationality law, and I personally direct every case we take on. I work with a team present in Spain, Colombia and the UK, but the legal direction and follow-up of your file are always mine: you will know exactly who you are speaking to and where your procedure stands.',
    ),
    lawyerFacts: [
      ls(
        'Dirección jurídica de todos los expedientes',
        'Legal direction of every case file',
      ),
      ls('Atención en español e inglés', 'Service in Spanish and English'),
      ls(
        'Madrid, con clientes en España y en el exterior',
        'Based in Madrid, clients in Spain and abroad',
      ),
    ],
    lawyerCta: ls('Conocer al equipo', 'Meet the team'),
    lawyerPhoto: carolinaBandera,
    servicesKicker: ls('Servicios más demandados', 'Most requested services'),
    servicesTitle: ls(
      'Los procesos en los que más experiencia acumulamos',
      'The processes where we’ve built the deepest experience',
    ),
    servicesViewAllLabel: ls(
      'Ver todas las especialidades',
      'View all specialties',
    ),
    servicesMoreLabel: ls('Saber más', 'Learn more'),
    featuredSpecialties: [
      { _type: 'reference', _ref: 'specialty-nomada', _key: 'nomada' },
      { _type: 'reference', _ref: 'specialty-familia', _key: 'familia' },
      {
        _type: 'reference',
        _ref: 'specialty-nacionalidad',
        _key: 'nacionalidad',
      },
    ],
    whyKicker: ls('Por qué elegirnos', 'Why choose us'),
    whyTitle: ls(
      'Un despacho boutique especializado, con trato directo',
      'A specialized boutique firm, with direct attention',
    ),
    whyBody: ls(
      'Cada expediente es distinto. No trabajamos con plantillas: analizamos tu situación concreta, identificamos la vía legal más adecuada y te acompañamos con información clara en cada fase del proceso.',
      'Every case is different. We don’t work from templates: we analyze your specific situation, identify the most suitable legal pathway, and guide you with clear information at every stage.',
    ),
    whyPoints: [
      ls(
        'Despacho especializado en Derecho de Extranjería, Inmigración y Nacionalidad',
        'Firm specialized in Immigration, Residency and Nationality law',
      ),
      ls(
        'Dirección jurídica y seguimiento personalizado por la abogada responsable del expediente',
        'Legal direction and personal follow-up by the lawyer responsible for the file',
      ),
      ls(
        'Atención personalizada en español e inglés, en España y desde el exterior',
        'Personalized attention in Spanish and English, in Spain and from abroad',
      ),
      ls(
        'Confidencialidad absoluta, respaldada por formación en protección de datos',
        'Absolute confidentiality, backed by data protection training',
      ),
    ],
    testimonialsKicker: ls('Testimonios', 'Testimonials'),
    testimonialsTitle: ls(
      'La experiencia de quienes ya confiaron en nosotros',
      'What clients who trusted us have to say',
    ),
    testimonialsTrustpilotLabel: ls(
      'Ver todas las opiniones en Trustpilot',
      'See all reviews on Trustpilot',
    ),
    testimonials: [
      {
        _key: 't1',
        name: 'Sandra Zabala',
        date: '3 jun 2026 · Trustpilot',
        quote: ls(
          'Gracias a la abogada Carolina y a su equipo por su ayuda y por su gestión, fue un acierto confiar mi proceso a su equipo, fueron ágiles, transparentes, me sentí acompañada en todo momento, los recomendaré a mis amigos y familiares.',
          'Thanks to lawyer Carolina and her team for their help and management — trusting my process to her team was the right call. They were quick, transparent, and I felt supported the whole way. I’ll recommend them to my friends and family.',
        ),
      },
      {
        _key: 't2',
        name: 'Samantha Briceño',
        date: '15 may 2026 · Trustpilot',
        quote: ls(
          'Mucho profesionalismo y atención estupenda. Carolina ha tenido una respuesta muy rápida ante mi caso y ha sido muy eficaz, estoy muy contenta.',
          'Very professional with a wonderful attitude. Carolina responded to my case very quickly and was highly effective — I’m very happy.',
        ),
      },
      {
        _key: 't3',
        name: 'María Plaza',
        date: '15 may 2026 · Trustpilot',
        quote: ls(
          'Excelente profesional. La recomiendo 100%. Realizó nuestro trámite súper bien, saliendo favorable. La letrada Carolina se portó excelente con los plazos conversados.',
          'Excellent professional. I recommend her 100%. She handled our case very well and it was approved. Lawyer Carolina kept every timeline we agreed on.',
        ),
      },
    ],
    faqKicker: ls('Preguntas frecuentes', 'Frequently asked questions'),
    faqTitle: ls(
      'Lo que más nos preguntan nuestros clientes',
      'What our clients ask us most',
    ),
    faqItems: [
      {
        _key: 'f1',
        question: ls(
          '¿Puedo iniciar mi trámite si aún estoy fuera de España?',
          'Can I start my process while I’m still outside Spain?',
        ),
        answer: ls(
          'Sí. Coordinamos con consulados españoles en el extranjero y damos seguimiento cercano a clientes que inician su proceso desde otro país.',
          'Yes. We coordinate with Spanish consulates abroad and closely follow up with clients who begin their process from another country.',
        ),
      },
      {
        _key: 'f2',
        question: ls('¿Atienden en inglés?', 'Do you assist in English?'),
        answer: ls(
          'Sí, Carolina se comunica en español e inglés, adaptando la información técnica a cada cliente.',
          'Yes, Carolina communicates in both Spanish and English, adapting technical information to each client.',
        ),
      },
      {
        _key: 'f3',
        question: ls(
          '¿Cuánto tiempo toma un expediente de extranjería?',
          'How long does an immigration case take?',
        ),
        answer: ls(
          'Los plazos los fija la Administración y varían según la vía y el organismo competente. Tras estudiar tu caso te informamos de los plazos legales y orientativos aplicables, sin prometer resultados que no dependen del despacho.',
          'Processing times are set by the authorities and vary by pathway and competent body. Once we study your case we inform you of the applicable legal and indicative timeframes, without promising outcomes that are outside the firm’s control.',
        ),
      },
      {
        _key: 'f4',
        question: ls(
          '¿Qué pasa si mi expediente fue denegado o archivado?',
          'What if my file was denied or archived?',
        ),
        answer: ls(
          'Analizamos la resolución y, si existen motivos jurídicos para ello, preparamos el recurso o la nueva solicitud con los argumentos adecuados.',
          'We review the decision and, where there are legal grounds, prepare the appeal or a new application with the appropriate arguments.',
        ),
      },
      {
        _key: 'f5',
        question: ls(
          '¿Cómo es el proceso de trabajo con la abogada?',
          'What is it like to work with the lawyer?',
        ),
        answer: ls(
          'La dirección jurídica y el seguimiento de tu expediente están personalmente supervisados por la abogada responsable, con comunicación transparente sobre trámites, riesgos y alternativas.',
          'The legal direction and follow-up of your file are personally supervised by the lawyer in charge, with transparent communication on procedures, risks and alternatives.',
        ),
      },
    ],
    contactKicker: ls('Contacto', 'Contact'),
    contactTitle: ls(
      '¿Tienes un caso de extranjería y necesitas una valoración profesional?',
      'Have an immigration case and need a professional assessment?',
    ),
    contactBody: ls(
      'Solicita tu cita y cuéntanos tu situación. Te responderemos con información clara sobre el camino legal más adecuado para tu caso.',
      'Book your consultation and tell us about your situation. We’ll reply with clear information on the best legal pathway for your case.',
    ),
    contactCtaWhatsapp: ls('Escríbenos por WhatsApp', 'Message us on WhatsApp'),
    contactFormNameLabel: ls('Nombre completo', 'Full name'),
    contactFormEmailLabel: ls('Correo electrónico', 'Email address'),
    contactFormPhoneLabel: ls('Teléfono (opcional)', 'Phone (optional)'),
    contactFormMessageLabel: ls(
      'Cuéntanos brevemente tu caso',
      'Briefly tell us about your case',
    ),
    contactFormSubmitLabel: ls('Enviar consulta', 'Send inquiry'),
    contactFormSuccessMessage: ls(
      'Gracias, hemos recibido tu mensaje.',
      'Thank you, your message has been received.',
    ),
  });
  console.log('  ✓ homePage');

  // --- teamPage ---
  await client.createOrReplace({
    _id: 'teamPage',
    _type: 'teamPage',
    kicker: ls('Nuestro Equipo', 'Our Team'),
    title: ls(
      'Un equipo que conoce a fondo el derecho de extranjería',
      'A team that knows Spanish immigration law inside out',
    ),
    intro: ls(
      'Detrás de cada expediente hay un equipo que trabaja con cercanía, rigor y discreción.',
      'Behind every case file is a team that works with closeness, rigor, and discretion.',
    ),
    collabTitle: ls('Colaboradores', 'Collaborators'),
    intlTitle: ls(
      'Un equipo con presencia internacional',
      'A team with international reach',
    ),
    intlBody: ls(
      'Global Migration Law cuenta con un equipo de colaboradores en España, Colombia y Reino Unido, lo que permite dar seguimiento cercano a expedientes con conexión internacional. Cada colaborador interviene en la preparación documental y el seguimiento, siempre bajo la supervisión directa de Carolina como abogada responsable del caso.',
      'Global Migration Law has a team of collaborators in Spain, Colombia, and the United Kingdom, allowing close follow-up on cases with an international dimension. Each collaborator assists with document preparation and case tracking, always under Carolina’s direct supervision as the lawyer responsible for the case.',
    ),
    fiscalTitle: ls('Colaboración fiscal', 'Tax collaboration'),
    fiscalBody: ls(
      'Para los aspectos fiscales que pueden surgir en procesos de extranjería, inversión o nómadas digitales, colaboramos con el equipo fiscal de Confulting F, en Madrid, ofreciendo una visión integral —legal y fiscal— cuando el caso lo requiere.',
      'For the tax matters that can arise in immigration, investment, or Digital Nomad Visa cases, we collaborate with the tax team at Confulting F, in Madrid, allowing us to offer an integrated legal and tax perspective when a case requires it.',
    ),
    workTitle: ls('Nuestra forma de trabajar', 'How we work'),
    workPoints: [
      ls(
        'Dirección jurídica y seguimiento personalizado por la abogada responsable del expediente',
        'Legal direction and personal follow-up by the lawyer responsible for the file',
      ),
      ls(
        'Equipo con presencia en España, Colombia y Reino Unido',
        'Team with presence in Spain, Colombia, and the United Kingdom',
      ),
      ls(
        'Colaboración con especialistas fiscales para una visión integral',
        'Collaboration with tax specialists for a fully integrated view',
      ),
      ls(
        'Comunicación transparente sobre plazos, riesgos y alternativas',
        'Transparent communication on timelines, risks, and alternatives',
      ),
      ls(
        'Documentación cuidada y adaptada a cada organismo',
        'Carefully prepared documentation, tailored to each authority',
      ),
      ls(
        'Confidencialidad absoluta en el tratamiento de cada expediente',
        'Absolute confidentiality in handling every case',
      ),
    ],
    cta: {
      _type: 'ctaBlock',
      title: ls(
        '¿Quieres que revisemos tu caso?',
        'Want us to review your case?',
      ),
      button: ls('Escríbenos por WhatsApp', 'Message us on WhatsApp'),
    },
  });
  console.log('  ✓ teamPage');

  // --- aboutPage ---
  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    kicker: ls('Quiénes Somos', 'About Us'),
    historyTitle: ls('Nuestra historia', 'Our story'),
    historyBody: ls(
      'Global Migration Law nace de la vocación de Carolina Díaz Calderón por acompañar a personas extranjeras en uno de los procesos más determinantes de su vida: construir un futuro en España. Formada en la Universidad Complutense de Madrid y especializada mediante un Máster en Extranjería y Nacionalidad Española, Carolina fundó este despacho con una premisa clara: el derecho de extranjería exige tanto rigor técnico como sensibilidad humana.',
      'Global Migration Law was born from Carolina Díaz Calderón’s commitment to guiding foreign nationals through one of the most defining processes in their lives: building a future in Spain. Trained at Universidad Complutense de Madrid and specialized through a Master’s degree in Immigration and Spanish Nationality Law, Carolina founded this firm on a clear premise: immigration law demands both technical rigor and human sensitivity.',
    ),
    historyImage: carolinaRetrato,
    missionKicker: ls('Nuestra misión', 'Our mission'),
    missionTitle: ls(
      'Convertir procesos administrativos complejos en caminos claros',
      'Turning complex administrative processes into clear paths forward',
    ),
    missionBody: ls(
      'Creemos que cada persona que llega a España merece una respuesta legal seria, informada y humana, sin tecnicismos innecesarios ni promesas vacías.',
      'We believe every person arriving in Spain deserves a serious, informed, and human legal response — without unnecessary jargon or empty promises.',
    ),
    valuesTitle: ls('Nuestros valores', 'Our values'),
    values: [
      {
        _key: 'v1',
        title: ls('Rigor técnico', 'Technical rigor'),
        body: ls(
          'Seguimos de cerca cada cambio normativo y jurisprudencial en materia de extranjería.',
          'We closely follow every regulatory and case-law development in immigration law.',
        ),
        iconKey: 'rigor',
      },
      {
        _key: 'v2',
        title: ls('Cercanía', 'Closeness'),
        body: ls(
          'Cada cliente tiene un interlocutor directo y accesible.',
          'Every client has a direct, accessible point of contact.',
        ),
        iconKey: 'closeness',
      },
      {
        _key: 'v3',
        title: ls('Transparencia', 'Transparency'),
        body: ls(
          'Explicamos plazos, riesgos y alternativas con honestidad, sin generar falsas expectativas.',
          'We explain timelines, risks, and alternatives honestly, without creating false expectations.',
        ),
        iconKey: 'transparency',
      },
      {
        _key: 'v4',
        title: ls('Confidencialidad', 'Confidentiality'),
        body: ls(
          'Tratamos cada expediente con la máxima discreción, respaldada por formación específica en protección de datos.',
          'We handle every case with the utmost discretion, backed by specific training in data protection.',
        ),
        iconKey: 'confidentiality',
      },
    ],
    whyTitle: ls('Por qué elegirnos', 'Why choose us'),
    whyPoints: [
      ls(
        'Despacho especializado en Derecho de Extranjería, Inmigración y Nacionalidad',
        'Firm specialized in Immigration, Residency and Nationality law',
      ),
      ls(
        'Atención personalizada, en español e inglés',
        'Personalized attention, in Spanish and English',
      ),
      ls(
        'Experiencia en casos complejos: recursos, expedientes archivados, situaciones familiares atípicas',
        'Experience with complex cases: appeals, archived files, atypical family situations',
      ),
      ls(
        'Trato directo con la abogada responsable en cada fase del proceso',
        'Direct access to the lawyer responsible for your case at every stage',
      ),
    ],
    cta: {
      _type: 'ctaBlock',
      title: ls(
        '¿Tienes un caso de extranjería y necesitas una valoración profesional?',
        'Have an immigration case and need a professional assessment?',
      ),
      button: ls('Escríbenos por WhatsApp', 'Message us on WhatsApp'),
    },
  });
  console.log('  ✓ aboutPage');

  console.log(
    '\nListo. Abre /studio y revisa el contenido, o npm run dev para verlo en el sitio.',
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
