/**
 * One-time (re-runnable) content seed for the Global Migration Law site.
 *
 * Populates Sanity with the real, approved ES/EN copy extracted from the
 * Claude Design export (`DC Migración Legal sitio web/*.dc.html`), plus a
 * first-draft Arabic translation, and uploads the real photos/icons from
 * `scripts/seed-assets/`, so Carolina starts from a fully-written site
 * instead of an empty CMS. The Arabic copy is a solid starting point but
 * should be reviewed by a native/professional legal translator before
 * going live — it can be edited any time from /studio without touching
 * this script again.
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

function ls(es: string, en: string, ar: string) {
  return { es, en, ar };
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
  const pilarPhoto = await uploadImage('pilar.png');
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
      'مرحبًا، أرغب في استشارة بخصوص حالتي في الهجرة.',
    ),
    contactEmail: 'contacto@dcmigracionlegal.com',
    notificationEmail: 'diazcalderoncarolina@gmail.com',
    address: ls('Madrid, España', 'Madrid, Spain', 'مدريد، إسبانيا'),
    trustpilotUrl: 'https://es.trustpilot.com/review/migrationlaw.es',
    footerTagline: ls(
      'Extranjería · Nacionalidad · Movilidad Internacional',
      'Immigration · Nationality · International Mobility',
      'الهجرة · الجنسية · التنقل الدولي',
    ),
    footerCopyright: ls(
      '© 2026 Global Migration Law',
      '© 2026 Global Migration Law',
      '© 2026 Global Migration Law',
    ),
    navHome: ls('Inicio', 'Home', 'الرئيسية'),
    navSpecialties: ls('Especialidades', 'Specialties', 'التخصصات'),
    navTeam: ls('Nuestro Equipo', 'Our Team', 'فريقنا'),
    navAbout: ls('Quiénes Somos', 'About Us', 'من نحن'),
    popupEnabled: false,
    popupKicker: ls('Primer contacto', 'First contact', 'التواصل الأول'),
    popupTitle: ls(
      'Cuéntanos tu caso por WhatsApp',
      'Tell us about your case on WhatsApp',
      'أخبرنا عن حالتك عبر واتساب',
    ),
    popupBody: ls(
      'Escríbenos y te indicaremos cómo agendar una consulta con la abogada. Este primer contacto sirve para orientarte sobre el servicio; no sustituye a una valoración jurídica.',
      'Message us and we’ll explain how to book a consultation with the lawyer. This first contact is to orient you about the service; it does not replace a legal assessment.',
      'راسلنا وسنوضح لك كيفية حجز استشارة مع المحامية. يهدف هذا التواصل الأول إلى توجيهك بخصوص الخدمة، ولا يُعد بديلاً عن التقييم القانوني.',
    ),
    popupButton: ls(
      'Escribir por WhatsApp',
      'Message on WhatsApp',
      'راسلنا عبر واتساب',
    ),
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
      'محامية · مديرة المكتب',
    ),
    credentialLine: ls(
      'Colegiada ICAM n.º 97778',
      'Madrid Bar Association (ICAM) no. 97778',
      'عضو نقابة المحامين بمدريد (ICAM) رقم 97778',
    ),
    bio: ls(
      'Abogada colegiada en el Ilustre Colegio de Abogados de Madrid (ICAM), licenciada por la Universidad Complutense de Madrid, con Máster en Extranjería y Nacionalidad Española y Máster en Protección de Datos por el IE (Instituto de Empresa). Fundadora de Global Migration Law, dirige personalmente cada expediente, combinando conocimiento técnico actualizado con un trato directo y humano hacia cada cliente.\n\nCarolina ha construido su trayectoria en torno a un objetivo claro: acompañar a personas extranjeras y sus familias en procesos que, muchas veces, determinan su futuro en España. Su enfoque combina el dominio normativo con una comunicación clara, en español e inglés, adaptada a cada cliente.',
      'Admitted lawyer with the Madrid Bar Association (ICAM), graduate of Universidad Complutense de Madrid, and holder of a Master’s degree in Immigration and Spanish Nationality Law and a Master’s degree in Data Protection from IE (Instituto de Empresa). As founder of Global Migration Law, Carolina personally oversees every case, combining up-to-date technical expertise with a direct, human approach to each client.\n\nCarolina has built her career around a clear purpose: guiding foreign nationals and their families through processes that often determine their future in Spain. Her approach blends deep regulatory knowledge with clear communication, in both Spanish and English, tailored to each client.',
      'محامية مسجلة في نقابة المحامين بمدريد (ICAM)، حاصلة على إجازة في الحقوق من جامعة كومبلوتنسي بمدريد، وعلى ماجستير في قانون الهجرة والجنسية الإسبانية، وماجستير في حماية البيانات من معهد IE للأعمال. بصفتها مؤسسة Global Migration Law، تشرف كارولينا شخصيًا على كل ملف، جامعةً بين المعرفة التقنية المحدثة والتعامل المباشر والإنساني مع كل عميل.\n\nبنت كارولينا مسيرتها المهنية حول هدف واضح: مرافقة الأجانب وعائلاتهم في مسارات كثيرًا ما تحدد مستقبلهم في إسبانيا. يجمع نهجها بين الإتقان التنظيمي والتواصل الواضح، باللغتين الإسبانية والإنجليزية، بما يتناسب مع كل عميل.',
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
    role: ls(
      'Asesora Legal y Financiera',
      'Legal & Financial Advisor',
      'مستشارة قانونية ومالية',
    ),
    bio: ls(
      'Graduada en Administración de Empresas (ADE) por la Universidad Pontificia de Salamanca, Andrea Díaz aporta a Global Migration Law una visión integral que conecta la estrategia migratoria con la planificación financiera del cliente. Su formación le permite acompañar a personas y familias no solo en el cumplimiento normativo, sino también en las implicaciones económicas de cada proceso.',
      'Andrea Díaz holds a degree in Business Administration (ADE) from Universidad Pontificia de Salamanca. She brings Global Migration Law an integrated perspective that connects immigration strategy with each client’s financial planning, supporting clients through both regulatory compliance and the economic implications of their case.',
      'حاصلة على درجة في إدارة الأعمال من الجامعة البابوية في سلامنكا، تُقدّم أندريا دياز لشركة Global Migration Law رؤية شاملة تربط استراتيجية الهجرة بالتخطيط المالي للعميل. يتيح لها تكوينها مرافقة الأفراد والعائلات ليس فقط في الامتثال التنظيمي، بل أيضًا في الآثار الاقتصادية لكل إجراء.',
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
      'أخصائي في المالية والضرائب',
    ),
    bio: ls(
      'Financiero egresado de la Universidad de los Andes, Santiago Rodríguez lidera los aspectos fiscales y financieros de los expedientes en Global Migration Law. Su experiencia asegura que cada trámite —desde solvencia económica hasta estructuras patrimoniales— cumpla con los requisitos exigidos por la normativa española.',
      'A finance graduate of Universidad de los Andes, Santiago Rodríguez leads the tax and financial dimensions of case files at Global Migration Law. His expertise ensures that each procedure — from proof of economic means to asset structuring — meets the standards required under Spanish regulations.',
      'خريج المالية من جامعة الأنديز، يقود سانتياغو رودريغيز الجوانب الضريبية والمالية للملفات في Global Migration Law. تضمن خبرته أن يستوفي كل إجراء —من إثبات الملاءة المالية إلى هيكلة الأصول— المتطلبات التي تفرضها اللوائح الإسبانية.',
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
    role: ls('Asesora Legal', 'Legal Advisor', 'مستشارة قانونية'),
    bio: ls(
      'Abogada por la Universidad de Salamanca, Pilar Alzate forma parte del equipo legal de Global Migration Law, donde combina rigor jurídico con un trato cercano hacia cada cliente en sus procesos de extranjería y nacionalidad.',
      'A lawyer trained at Universidad de Salamanca, Pilar Alzate is part of the legal team at Global Migration Law, combining legal rigor with close, personal attention throughout each client’s immigration and nationality process.',
      'محامية من جامعة سلامنكا، بيلار ألزاتي عضو في الفريق القانوني لشركة Global Migration Law، حيث تجمع بين الدقة القانونية والتعامل القريب مع كل عميل في إجراءات الهجرة والجنسية.',
    ),
    photo: pilarPhoto,
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
        'الإقامات الدراسية',
      ),
      iconKey: 'studies',
      covers: ls(
        'Autorizaciones de estancia por estudios, prórrogas y modificación a autorización de trabajo (cuenta ajena o propia) al finalizar o durante los estudios.',
        'Study stay authorizations, extensions, and modification to work authorization (employed or self-employed) upon completion of or during studies.',
        'تصاريح الإقامة لأغراض الدراسة، والتمديدات، وتعديل تصريح العمل (بأجر أو لحساب خاص) عند إنهاء الدراسة أو أثناءها.',
      ),
      why: ls(
        'El momento y la vía elegidos para modificar tu situación determinan si conservas continuidad legal en España o tienes que volver a empezar.',
        'The timing and pathway you choose determine whether you keep legal continuity in Spain or have to start over.',
        'يحدد التوقيت والمسار المختار لتعديل وضعك ما إذا كنت ستحافظ على استمراريتك القانونية في إسبانيا أو ستضطر للبدء من جديد.',
      ),
    },
    {
      id: 'specialty-familia',
      title: ls(
        'Residencia de familiares de españoles',
        'Residence for family members of Spanish nationals',
        'إقامة أفراد أسرة المواطنين الإسبان',
      ),
      iconKey: 'family',
      covers: ls(
        'Autorizaciones de residencia para cónyuges, hijos y otros familiares de ciudadanos españoles, desde España o vía consular, incluyendo supuestos de guarda y custodia de menores.',
        'Residence authorizations for spouses, children, and other family members of Spanish citizens, from within Spain or through consulates, including guardianship of minors.',
        'تصاريح الإقامة للأزواج والأبناء وأفراد الأسرة الآخرين للمواطنين الإسبان، من داخل إسبانيا أو عبر القنصليات، بما في ذلك حالات حضانة القُصّر.',
      ),
      why: ls(
        'Es una de las vías más rápidas del ordenamiento español, pero también una de las que más se deniega por errores documentales evitables.',
        'One of the fastest pathways under Spanish law — and also one of the most frequently denied over avoidable documentation errors.',
        'هذا أحد أسرع المسارات في النظام القانوني الإسباني، لكنه أيضًا من أكثرها رفضًا بسبب أخطاء مستندية يمكن تجنبها.',
      ),
    },
    {
      id: 'specialty-reagrupacion',
      title: ls(
        'Reagrupación familiar',
        'Family reunification',
        'لم شمل الأسرة',
      ),
      iconKey: 'reunification',
      covers: ls(
        'Reagrupación de cónyuges, hijos y ascendientes de residentes extranjeros en España.',
        'Reunification of spouses, children, and ascendants of foreign residents in Spain.',
        'لم شمل الأزواج والأبناء والأصول (الوالدين) للمقيمين الأجانب في إسبانيا.',
      ),
      why: ls(
        'Los requisitos de vivienda, medios económicos y vínculo familiar deben acreditarse con precisión. Un expediente bien preparado evita meses de retrasos.',
        'Housing, financial means, and family-tie requirements must be proven precisely. A well-prepared file avoids months of delays.',
        'يجب إثبات متطلبات السكن والموارد الاقتصادية ورابطة القرابة بدقة. الملف المُعدّ جيدًا يجنّب شهورًا من التأخير.',
      ),
    },
    {
      id: 'specialty-nacionalidad',
      title: ls(
        'Nacionalidad española',
        'Spanish nationality',
        'الجنسية الإسبانية',
      ),
      iconKey: 'nationality',
      covers: ls(
        'Solicitudes de nacionalidad por residencia, por opción y por la vía ibero-americana reducida, incluyendo recursos frente a resoluciones desfavorables o expedientes archivados.',
        'Applications for nationality by residence, by option, and through the reduced Ibero-American pathway, including appeals against unfavorable decisions.',
        'طلبات الحصول على الجنسية بالإقامة، وبالاختيار، وعبر المسار الإيبيرو-أمريكي المخفف، بما في ذلك الطعون ضد القرارات غير المواتية أو الملفات المحفوظة.',
      ),
      why: ls(
        'Es, para la mayoría de nuestros clientes, el objetivo final de años de trayectoria legal en España.',
        'For most of our clients, this is the culmination of years of legal residence in Spain.',
        'بالنسبة لمعظم عملائنا، يُعد هذا الهدف النهائي لسنوات من المسار القانوني في إسبانيا.',
      ),
    },
    {
      id: 'specialty-modificaciones',
      title: ls(
        'Modificaciones y renovaciones de autorización',
        'Authorization modifications and renewals',
        'تعديلات وتجديدات التصاريح',
      ),
      iconKey: 'modifications',
      covers: ls(
        'Cambios de situación (estudios a trabajo, no lucrativa a trabajo, etc.) y renovaciones de todo tipo de autorizaciones de residencia y trabajo.',
        'Changes of status (studies to work, non-lucrative to work, etc.) and renewals of all types of residence and work authorizations.',
        'تغييرات الوضع (من الدراسة إلى العمل، من الإقامة غير الربحية إلى العمل، إلخ) وتجديد جميع أنواع تصاريح الإقامة والعمل.',
      ),
      why: ls(
        'Cada modificación se valora con criterios distintos a la autorización original. Planificamos el cambio con antelación suficiente.',
        'Each modification is assessed under different criteria than the original authorization. We plan the transition with enough lead time.',
        'يُقيَّم كل تعديل وفق معايير مختلفة عن التصريح الأصلي. نخطط للتغيير بوقت كافٍ مسبقًا.',
      ),
    },
    {
      id: 'specialty-nomada',
      title: ls(
        'Visado de Nacionalidad Digital (Nómadas Digitales)',
        'Digital Nomad Visa',
        'تأشيرة الرحّالة الرقمي (العمل عن بُعد)',
      ),
      iconKey: 'digitalNomad',
      covers: ls(
        'Asesoramiento para trabajadores remotos y autónomos societarios, incluyendo casos de socios minoritarios y estructuras societarias complejas.',
        'Advice for remote workers and self-employed company owners, including minority shareholders and complex corporate structures.',
        'استشارات للعاملين عن بُعد وأصحاب الأعمال الحرة ضمن شركات، بما في ذلك حالات الشركاء ذوي الحصص الصغيرة والهياكل الشركاتية المعقدة.',
      ),
      why: ls(
        'No todos los perfiles encajan en el mismo molde. La clave está en acreditar correctamente el control efectivo o el rol de gestión.',
        'Not every profile fits the standard mold. The key is properly proving effective control or a genuine management role.',
        'لا تتوافق جميع الحالات مع نموذج واحد. يكمن المفتاح في إثبات السيطرة الفعلية أو الدور الإداري بشكل صحيح.',
      ),
    },
    {
      id: 'specialty-inversores',
      title: ls(
        'Inversores y establecimiento empresarial',
        'Investors and business establishment',
        'المستثمرون وتأسيس الشركات',
      ),
      iconKey: 'investors',
      covers: ls(
        'Autorizaciones de residencia para inversores y autorizaciones de establecimiento y dirección de empresas en España.',
        'Residence authorizations for investors and authorizations for establishing and managing businesses in Spain.',
        'تصاريح الإقامة للمستثمرين وتصاريح تأسيس وإدارة الشركات في إسبانيا.',
      ),
      why: ls(
        'La solidez del proyecto empresarial y la documentación financiera son tan determinantes como el propio capital invertido.',
        'The strength of the business project and its financial documentation matter as much as the capital itself.',
        'متانة المشروع التجاري والمستندات المالية لا تقل أهمية عن رأس المال المستثمر نفسه.',
      ),
    },
    {
      id: 'specialty-recursos',
      title: ls(
        'Recursos y procedimientos contenciosos',
        'Appeals and administrative litigation',
        'الطعون والإجراءات القضائية',
      ),
      iconKey: 'appeals',
      covers: ls(
        'Recursos de reposición y alzada frente a resoluciones desfavorables de la administración, incluyendo defectos de notificación y vulneración de la confianza legítima.',
        'Reconsideration and appeal proceedings against unfavorable administrative decisions, including defective notification and breach of legitimate trust.',
        'طعون إعادة النظر والاستئناف ضد القرارات الإدارية غير المواتية، بما في ذلك عيوب الإخطار وانتهاك الثقة المشروعة.',
      ),
      why: ls(
        'Una denegación o un archivo no es el final del proceso — es el inicio de otro.',
        'A denial or an archived file isn’t the end of the process — it’s the start of another one.',
        'الرفض أو حفظ الملف ليس نهاية الإجراء — بل هو بداية إجراء آخر.',
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
    kicker: ls('Especialidades', 'Specialties', 'التخصصات'),
    title: ls(
      'Derecho de extranjería, sin improvisación',
      'Immigration law, without improvisation',
      'قانون الهجرة، دون ارتجال',
    ),
    intro: ls(
      'Cada vía tiene requisitos, plazos y criterios de valoración distintos. Diseñamos cada caso desde el análisis normativo y la experiencia práctica en cada uno de estos ámbitos.',
      'Each pathway carries its own requirements, timelines, and evaluation criteria. We build every case on regulatory analysis and practical experience across these areas.',
      'لكل مسار متطلبات وآجال ومعايير تقييم مختلفة. نُصمم كل حالة انطلاقًا من التحليل القانوني والخبرة العملية في كل من هذه المجالات.',
    ),
    coversLabel: ls('¿Qué cubre?', 'What it covers', 'ماذا يشمل؟'),
    whyLabel: ls(
      'Por qué importa la estrategia',
      'Why strategy matters',
      'لماذا تهم الاستراتيجية',
    ),
    cta: {
      _type: 'ctaBlock',
      title: ls(
        '¿Tienes un caso de extranjería y necesitas una valoración profesional?',
        'Have an immigration case and need a professional assessment?',
        'هل لديك حالة هجرة وتحتاج إلى تقييم مهني؟',
      ),
      button: ls(
        'Escríbenos por WhatsApp',
        'Message us on WhatsApp',
        'راسلنا عبر واتساب',
      ),
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
      'الهجرة · الجنسية · التنقل الدولي · مدريد',
    ),
    heroHeadline: ls(
      'Abogada de extranjería, nacionalidad e inmigración en España',
      'Immigration, residency and nationality lawyer in Spain',
      'محامية هجرة وجنسية وشؤون المهاجرين في إسبانيا',
    ),
    heroSubtitle: ls(
      'Detrás de cada expediente hay un proyecto de vida. Te acompaño personalmente, con información clara y trato cercano, en cada paso del camino.',
      'Behind every case file there is a life project. I accompany you personally, with clear information and close attention, at every step of the way.',
      'خلف كل ملف يوجد مشروع حياة. أرافقك شخصيًا، بمعلومات واضحة وتعامل قريب، في كل خطوة من الطريق.',
    ),
    heroImage,
    heroCtaPrimary: ls(
      'Escríbenos por WhatsApp',
      'Message us on WhatsApp',
      'راسلنا عبر واتساب',
    ),
    heroCtaSecondary: ls(
      'Ver especialidades',
      'View specialties',
      'عرض التخصصات',
    ),
    credentials: [
      ls(
        'Despacho especializado en Extranjería, Inmigración y Nacionalidad',
        'Firm specialized in Immigration, Residency and Nationality law',
        'مكتب متخصص في قانون الهجرة والجنسية',
      ),
      ls(
        'Dirección jurídica y seguimiento personalizado por la abogada responsable',
        'Legal direction and personal case supervision by the lawyer in charge',
        'إشراف قانوني ومتابعة شخصية من المحامية المسؤولة',
      ),
      ls(
        'Atención en español e inglés · España, Colombia y Reino Unido',
        'Service in Spanish and English · Spain, Colombia and the UK',
        'خدمة باللغتين الإسبانية والإنجليزية · إسبانيا وكولومبيا والمملكة المتحدة',
      ),
    ],
    lawyerKicker: ls('Tu abogada', 'Your lawyer', 'محاميتك'),
    lawyerBody: ls(
      'Soy abogada especializada en Derecho de Extranjería, Inmigración y Nacionalidad, y dirijo personalmente cada expediente que asumimos. Trabajo con un equipo con presencia en España, Colombia y Reino Unido, pero la dirección jurídica y el seguimiento de tu caso son siempre míos: sabrás con quién hablas y en qué punto se encuentra tu procedimiento.',
      'I am a lawyer specialized in Spanish immigration, residency and nationality law, and I personally direct every case we take on. I work with a team present in Spain, Colombia and the UK, but the legal direction and follow-up of your file are always mine: you will know exactly who you are speaking to and where your procedure stands.',
      'أنا محامية متخصصة في قانون الهجرة والجنسية، وأشرف شخصيًا على كل ملف نتولاه. أعمل مع فريق له حضور في إسبانيا وكولومبيا والمملكة المتحدة، لكن الإشراف القانوني ومتابعة حالتك يبقيان دائمًا من مسؤوليتي: ستعرف دائمًا مع من تتحدث وأين وصلت إجراءاتك.',
    ),
    lawyerFacts: [
      ls(
        'Dirección jurídica de todos los expedientes',
        'Legal direction of every case file',
        'إشراف قانوني على جميع الملفات',
      ),
      ls(
        'Atención en español e inglés',
        'Service in Spanish and English',
        'خدمة باللغتين الإسبانية والإنجليزية',
      ),
      ls(
        'Madrid, con clientes en España y en el exterior',
        'Based in Madrid, clients in Spain and abroad',
        'مدريد، مع عملاء في إسبانيا وخارجها',
      ),
    ],
    lawyerCta: ls('Conocer al equipo', 'Meet the team', 'تعرّف على الفريق'),
    lawyerPhoto: carolinaBandera,
    servicesKicker: ls(
      'Servicios más demandados',
      'Most requested services',
      'الخدمات الأكثر طلبًا',
    ),
    servicesTitle: ls(
      'Los procesos en los que más experiencia acumulamos',
      'The processes where we’ve built the deepest experience',
      'الإجراءات التي نمتلك فيها أكبر خبرة',
    ),
    servicesViewAllLabel: ls(
      'Ver todas las especialidades',
      'View all specialties',
      'عرض جميع التخصصات',
    ),
    servicesMoreLabel: ls('Saber más', 'Learn more', 'معرفة المزيد'),
    featuredSpecialties: [
      { _type: 'reference', _ref: 'specialty-nomada', _key: 'nomada' },
      { _type: 'reference', _ref: 'specialty-familia', _key: 'familia' },
      {
        _type: 'reference',
        _ref: 'specialty-nacionalidad',
        _key: 'nacionalidad',
      },
    ],
    whyKicker: ls('Por qué elegirnos', 'Why choose us', 'لماذا تختارنا'),
    whyTitle: ls(
      'Un despacho boutique especializado, con trato directo',
      'A specialized boutique firm, with direct attention',
      'مكتب متخصص بحجم صغير، بتعامل مباشر',
    ),
    whyBody: ls(
      'Cada expediente es distinto. No trabajamos con plantillas: analizamos tu situación concreta, identificamos la vía legal más adecuada y te acompañamos con información clara en cada fase del proceso.',
      'Every case is different. We don’t work from templates: we analyze your specific situation, identify the most suitable legal pathway, and guide you with clear information at every stage.',
      'كل ملف مختلف. نحن لا نعمل بقوالب جاهزة: نحلل وضعك الخاص، ونحدد المسار القانوني الأنسب، ونرافقك بمعلومات واضحة في كل مرحلة من الإجراء.',
    ),
    whyPoints: [
      ls(
        'Despacho especializado en Derecho de Extranjería, Inmigración y Nacionalidad',
        'Firm specialized in Immigration, Residency and Nationality law',
        'مكتب متخصص في قانون الهجرة والجنسية',
      ),
      ls(
        'Dirección jurídica y seguimiento personalizado por la abogada responsable del expediente',
        'Legal direction and personal follow-up by the lawyer responsible for the file',
        'إشراف قانوني ومتابعة شخصية من المحامية المسؤولة عن الملف',
      ),
      ls(
        'Atención personalizada en español e inglés, en España y desde el exterior',
        'Personalized attention in Spanish and English, in Spain and from abroad',
        'خدمة شخصية باللغتين الإسبانية والإنجليزية، داخل إسبانيا وخارجها',
      ),
      ls(
        'Confidencialidad absoluta, respaldada por formación en protección de datos',
        'Absolute confidentiality, backed by data protection training',
        'سرية تامة، مدعومة بتدريب في حماية البيانات',
      ),
    ],
    testimonialsKicker: ls('Testimonios', 'Testimonials', 'آراء العملاء'),
    testimonialsTitle: ls(
      'La experiencia de quienes ya confiaron en nosotros',
      'What clients who trusted us have to say',
      'تجارب من وثقوا بنا',
    ),
    testimonialsTrustpilotLabel: ls(
      'Ver todas las opiniones en Trustpilot',
      'See all reviews on Trustpilot',
      'عرض جميع التقييمات على Trustpilot',
    ),
    testimonials: [
      {
        _key: 't1',
        name: 'Sandra Zabala',
        date: '3 jun 2026 · Trustpilot',
        quote: ls(
          'Gracias a la abogada Carolina y a su equipo por su ayuda y por su gestión, fue un acierto confiar mi proceso a su equipo, fueron ágiles, transparentes, me sentí acompañada en todo momento, los recomendaré a mis amigos y familiares.',
          'Thanks to lawyer Carolina and her team for their help and management — trusting my process to her team was the right call. They were quick, transparent, and I felt supported the whole way. I’ll recommend them to my friends and family.',
          'أشكر المحامية كارولينا وفريقها على مساعدتهم وإدارتهم لملفي، كان قرارًا موفقًا أن أثق بفريقها، فقد كانوا سريعين وشفافين، وشعرت بالمرافقة في كل لحظة، سأوصي بهم لأصدقائي وعائلتي.',
        ),
      },
      {
        _key: 't2',
        name: 'Samantha Briceño',
        date: '15 may 2026 · Trustpilot',
        quote: ls(
          'Mucho profesionalismo y atención estupenda. Carolina ha tenido una respuesta muy rápida ante mi caso y ha sido muy eficaz, estoy muy contenta.',
          'Very professional with a wonderful attitude. Carolina responded to my case very quickly and was highly effective — I’m very happy.',
          'احترافية عالية واهتمام رائع. استجابت كارولينا لحالتي بسرعة كبيرة وكانت فعّالة جدًا، أنا سعيدة جدًا.',
        ),
      },
      {
        _key: 't3',
        name: 'María Plaza',
        date: '15 may 2026 · Trustpilot',
        quote: ls(
          'Excelente profesional. La recomiendo 100%. Realizó nuestro trámite súper bien, saliendo favorable. La letrada Carolina se portó excelente con los plazos conversados.',
          'Excellent professional. I recommend her 100%. She handled our case very well and it was approved. Lawyer Carolina kept every timeline we agreed on.',
          'محامية ممتازة. أوصي بها بنسبة 100%. أنجزت إجراءاتنا بشكل رائع جدًا وكانت النتيجة إيجابية. التزمت المحامية كارولينا بالمواعيد المتفق عليها بشكل ممتاز.',
        ),
      },
    ],
    faqKicker: ls(
      'Preguntas frecuentes',
      'Frequently asked questions',
      'الأسئلة الشائعة',
    ),
    faqTitle: ls(
      'Lo que más nos preguntan nuestros clientes',
      'What our clients ask us most',
      'الأسئلة الأكثر شيوعًا من عملائنا',
    ),
    faqItems: [
      {
        _key: 'f1',
        question: ls(
          '¿Puedo iniciar mi trámite si aún estoy fuera de España?',
          'Can I start my process while I’m still outside Spain?',
          'هل يمكنني بدء إجراءاتي وأنا لا أزال خارج إسبانيا؟',
        ),
        answer: ls(
          'Sí. Coordinamos con consulados españoles en el extranjero y damos seguimiento cercano a clientes que inician su proceso desde otro país.',
          'Yes. We coordinate with Spanish consulates abroad and closely follow up with clients who begin their process from another country.',
          'نعم. ننسق مع القنصليات الإسبانية في الخارج ونتابع عن قرب العملاء الذين يبدأون إجراءاتهم من بلد آخر.',
        ),
      },
      {
        _key: 'f2',
        question: ls(
          '¿Atienden en inglés?',
          'Do you assist in English?',
          'هل تقدمون الخدمة باللغة الإنجليزية؟',
        ),
        answer: ls(
          'Sí, Carolina se comunica en español e inglés, adaptando la información técnica a cada cliente.',
          'Yes, Carolina communicates in both Spanish and English, adapting technical information to each client.',
          'نعم، تتواصل كارولينا بالإسبانية والإنجليزية، وتكيّف المعلومات التقنية بما يناسب كل عميل.',
        ),
      },
      {
        _key: 'f3',
        question: ls(
          '¿Cuánto tiempo toma un expediente de extranjería?',
          'How long does an immigration case take?',
          'كم من الوقت يستغرق ملف الهجرة؟',
        ),
        answer: ls(
          'Los plazos los fija la Administración y varían según la vía y el organismo competente. Tras estudiar tu caso te informamos de los plazos legales y orientativos aplicables, sin prometer resultados que no dependen del despacho.',
          'Processing times are set by the authorities and vary by pathway and competent body. Once we study your case we inform you of the applicable legal and indicative timeframes, without promising outcomes that are outside the firm’s control.',
          'تحدد الإدارة المواعيد وتختلف حسب المسار والجهة المختصة. بعد دراسة حالتك، نُطلعك على المواعيد القانونية والإرشادية المعمول بها، دون الوعد بنتائج لا تعتمد على المكتب.',
        ),
      },
      {
        _key: 'f4',
        question: ls(
          '¿Qué pasa si mi expediente fue denegado o archivado?',
          'What if my file was denied or archived?',
          'ماذا يحدث إذا رُفض ملفي أو تم حفظه؟',
        ),
        answer: ls(
          'Analizamos la resolución y, si existen motivos jurídicos para ello, preparamos el recurso o la nueva solicitud con los argumentos adecuados.',
          'We review the decision and, where there are legal grounds, prepare the appeal or a new application with the appropriate arguments.',
          'نحلل القرار، وإذا وُجدت أسباب قانونية لذلك، نُعد الطعن أو الطلب الجديد بالحجج المناسبة.',
        ),
      },
      {
        _key: 'f5',
        question: ls(
          '¿Cómo es el proceso de trabajo con la abogada?',
          'What is it like to work with the lawyer?',
          'كيف تسير عملية العمل مع المحامية؟',
        ),
        answer: ls(
          'La dirección jurídica y el seguimiento de tu expediente están personalmente supervisados por la abogada responsable, con comunicación transparente sobre trámites, riesgos y alternativas.',
          'The legal direction and follow-up of your file are personally supervised by the lawyer in charge, with transparent communication on procedures, risks and alternatives.',
          'يخضع الإشراف القانوني ومتابعة ملفك لإشراف شخصي من المحامية المسؤولة، مع تواصل شفاف حول الإجراءات والمخاطر والبدائل.',
        ),
      },
    ],
    contactKicker: ls('Contacto', 'Contact', 'تواصل معنا'),
    contactTitle: ls(
      '¿Tienes un caso de extranjería y necesitas una valoración profesional?',
      'Have an immigration case and need a professional assessment?',
      'هل لديك حالة هجرة وتحتاج إلى تقييم مهني؟',
    ),
    contactBody: ls(
      'Solicita tu cita y cuéntanos tu situación. Te responderemos con información clara sobre el camino legal más adecuado para tu caso.',
      'Book your consultation and tell us about your situation. We’ll reply with clear information on the best legal pathway for your case.',
      'اطلب موعدك وأخبرنا بوضعك. سنرد عليك بمعلومات واضحة حول المسار القانوني الأنسب لحالتك.',
    ),
    contactCtaWhatsapp: ls(
      'Escríbenos por WhatsApp',
      'Message us on WhatsApp',
      'راسلنا عبر واتساب',
    ),
    contactFormNameLabel: ls(
      'Nombre completo',
      'Full name',
      'الاسم الكامل',
    ),
    contactFormEmailLabel: ls(
      'Correo electrónico',
      'Email address',
      'البريد الإلكتروني',
    ),
    contactFormPhoneLabel: ls(
      'Teléfono (opcional)',
      'Phone (optional)',
      'الهاتف (اختياري)',
    ),
    contactFormMessageLabel: ls(
      'Cuéntanos brevemente tu caso',
      'Briefly tell us about your case',
      'أخبرنا بإيجاز عن حالتك',
    ),
    contactFormSubmitLabel: ls(
      'Enviar consulta',
      'Send inquiry',
      'إرسال الاستشارة',
    ),
    contactFormSuccessMessage: ls(
      'Gracias, hemos recibido tu mensaje.',
      'Thank you, your message has been received.',
      'شكرًا لك، لقد استلمنا رسالتك.',
    ),
  });
  console.log('  ✓ homePage');

  // --- teamPage ---
  await client.createOrReplace({
    _id: 'teamPage',
    _type: 'teamPage',
    kicker: ls('Nuestro Equipo', 'Our Team', 'فريقنا'),
    title: ls(
      'Un equipo que conoce a fondo el derecho de extranjería',
      'A team that knows Spanish immigration law inside out',
      'فريق يتقن قانون الهجرة بعمق',
    ),
    intro: ls(
      'Detrás de cada expediente hay un equipo que trabaja con cercanía, rigor y discreción.',
      'Behind every case file is a team that works with closeness, rigor, and discretion.',
      'خلف كل ملف يوجد فريق يعمل بقرب ودقة وسرية.',
    ),
    collabTitle: ls('Colaboradores', 'Collaborators', 'المتعاونون'),
    intlTitle: ls(
      'Un equipo con presencia internacional',
      'A team with international reach',
      'فريق ذو حضور دولي',
    ),
    intlBody: ls(
      'Global Migration Law cuenta con un equipo de colaboradores en España, Colombia y Reino Unido, lo que permite dar seguimiento cercano a expedientes con conexión internacional. Cada colaborador interviene en la preparación documental y el seguimiento, siempre bajo la supervisión directa de Carolina como abogada responsable del caso.',
      'Global Migration Law has a team of collaborators in Spain, Colombia, and the United Kingdom, allowing close follow-up on cases with an international dimension. Each collaborator assists with document preparation and case tracking, always under Carolina’s direct supervision as the lawyer responsible for the case.',
      'تمتلك Global Migration Law فريقًا من المتعاونين في إسبانيا وكولومبيا والمملكة المتحدة، مما يتيح متابعة دقيقة للملفات ذات البعد الدولي. يشارك كل متعاون في إعداد المستندات والمتابعة، تحت الإشراف المباشر لكارولينا بصفتها المحامية المسؤولة عن الحالة.',
    ),
    fiscalTitle: ls(
      'Colaboración fiscal',
      'Tax collaboration',
      'التعاون الضريبي',
    ),
    fiscalBody: ls(
      'Para los aspectos fiscales que pueden surgir en procesos de extranjería, inversión o nómadas digitales, colaboramos con el equipo fiscal de Confulting F, en Madrid, ofreciendo una visión integral —legal y fiscal— cuando el caso lo requiere.',
      'For the tax matters that can arise in immigration, investment, or Digital Nomad Visa cases, we collaborate with the tax team at Confulting F, in Madrid, allowing us to offer an integrated legal and tax perspective when a case requires it.',
      'بالنسبة للجوانب الضريبية التي قد تنشأ في إجراءات الهجرة أو الاستثمار أو الرحّالة الرقميين، نتعاون مع الفريق الضريبي لشركة Confulting F في مدريد، لتقديم رؤية شاملة —قانونية وضريبية— عندما تتطلب الحالة ذلك.',
    ),
    workTitle: ls('Nuestra forma de trabajar', 'How we work', 'طريقة عملنا'),
    workPoints: [
      ls(
        'Dirección jurídica y seguimiento personalizado por la abogada responsable del expediente',
        'Legal direction and personal follow-up by the lawyer responsible for the file',
        'إشراف قانوني ومتابعة شخصية من المحامية المسؤولة عن الملف',
      ),
      ls(
        'Equipo con presencia en España, Colombia y Reino Unido',
        'Team with presence in Spain, Colombia, and the United Kingdom',
        'فريق له حضور في إسبانيا وكولومبيا والمملكة المتحدة',
      ),
      ls(
        'Colaboración con especialistas fiscales para una visión integral',
        'Collaboration with tax specialists for a fully integrated view',
        'تعاون مع متخصصين ضريبيين لرؤية شاملة',
      ),
      ls(
        'Comunicación transparente sobre plazos, riesgos y alternativas',
        'Transparent communication on timelines, risks, and alternatives',
        'تواصل شفاف حول المواعيد والمخاطر والبدائل',
      ),
      ls(
        'Documentación cuidada y adaptada a cada organismo',
        'Carefully prepared documentation, tailored to each authority',
        'توثيق دقيق ومُكيّف مع كل جهة',
      ),
      ls(
        'Confidencialidad absoluta en el tratamiento de cada expediente',
        'Absolute confidentiality in handling every case',
        'سرية تامة في التعامل مع كل ملف',
      ),
    ],
    cta: {
      _type: 'ctaBlock',
      title: ls(
        '¿Quieres que revisemos tu caso?',
        'Want us to review your case?',
        'هل تريد منا مراجعة حالتك؟',
      ),
      button: ls(
        'Escríbenos por WhatsApp',
        'Message us on WhatsApp',
        'راسلنا عبر واتساب',
      ),
    },
  });
  console.log('  ✓ teamPage');

  // --- aboutPage ---
  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    kicker: ls('Quiénes Somos', 'About Us', 'من نحن'),
    historyTitle: ls('Nuestra historia', 'Our story', 'قصتنا'),
    historyBody: ls(
      'Global Migration Law nace de la vocación de Carolina Díaz Calderón por acompañar a personas extranjeras en uno de los procesos más determinantes de su vida: construir un futuro en España. Formada en la Universidad Complutense de Madrid y especializada mediante un Máster en Extranjería y Nacionalidad Española, Carolina fundó este despacho con una premisa clara: el derecho de extranjería exige tanto rigor técnico como sensibilidad humana.',
      'Global Migration Law was born from Carolina Díaz Calderón’s commitment to guiding foreign nationals through one of the most defining processes in their lives: building a future in Spain. Trained at Universidad Complutense de Madrid and specialized through a Master’s degree in Immigration and Spanish Nationality Law, Carolina founded this firm on a clear premise: immigration law demands both technical rigor and human sensitivity.',
      'وُلدت Global Migration Law من شغف كارولينا دياز كالديرون بمرافقة الأجانب في واحدة من أهم المحطات في حياتهم: بناء مستقبل في إسبانيا. تخرجت كارولينا من جامعة كومبلوتنسي بمدريد وتخصصت عبر ماجستير في قانون الهجرة والجنسية الإسبانية، وأسست هذا المكتب انطلاقًا من مبدأ واضح: قانون الهجرة يتطلب دقة تقنية وحساسية إنسانية في آنٍ واحد.',
    ),
    historyImage: carolinaRetrato,
    missionKicker: ls('Nuestra misión', 'Our mission', 'رسالتنا'),
    missionTitle: ls(
      'Convertir procesos administrativos complejos en caminos claros',
      'Turning complex administrative processes into clear paths forward',
      'تحويل الإجراءات الإدارية المعقدة إلى مسارات واضحة',
    ),
    missionBody: ls(
      'Creemos que cada persona que llega a España merece una respuesta legal seria, informada y humana, sin tecnicismos innecesarios ni promesas vacías.',
      'We believe every person arriving in Spain deserves a serious, informed, and human legal response — without unnecessary jargon or empty promises.',
      'نؤمن بأن كل شخص يصل إلى إسبانيا يستحق استجابة قانونية جادة ومدروسة وإنسانية، دون تعقيدات تقنية غير ضرورية أو وعود فارغة.',
    ),
    valuesTitle: ls('Nuestros valores', 'Our values', 'قيمنا'),
    values: [
      {
        _key: 'v1',
        title: ls('Rigor técnico', 'Technical rigor', 'الدقة التقنية'),
        body: ls(
          'Seguimos de cerca cada cambio normativo y jurisprudencial en materia de extranjería.',
          'We closely follow every regulatory and case-law development in immigration law.',
          'نتابع عن كثب كل تغيير تنظيمي وقضائي في مجال قانون الهجرة.',
        ),
        iconKey: 'rigor',
      },
      {
        _key: 'v2',
        title: ls('Cercanía', 'Closeness', 'القرب'),
        body: ls(
          'Cada cliente tiene un interlocutor directo y accesible.',
          'Every client has a direct, accessible point of contact.',
          'لكل عميل جهة اتصال مباشرة ومتاحة.',
        ),
        iconKey: 'closeness',
      },
      {
        _key: 'v3',
        title: ls('Transparencia', 'Transparency', 'الشفافية'),
        body: ls(
          'Explicamos plazos, riesgos y alternativas con honestidad, sin generar falsas expectativas.',
          'We explain timelines, risks, and alternatives honestly, without creating false expectations.',
          'نوضح المواعيد والمخاطر والبدائل بصدق، دون خلق توقعات غير واقعية.',
        ),
        iconKey: 'transparency',
      },
      {
        _key: 'v4',
        title: ls('Confidencialidad', 'Confidentiality', 'السرية'),
        body: ls(
          'Tratamos cada expediente con la máxima discreción, respaldada por formación específica en protección de datos.',
          'We handle every case with the utmost discretion, backed by specific training in data protection.',
          'نتعامل مع كل ملف بأقصى درجات الكتمان، مدعومة بتدريب متخصص في حماية البيانات.',
        ),
        iconKey: 'confidentiality',
      },
    ],
    whyTitle: ls('Por qué elegirnos', 'Why choose us', 'لماذا تختارنا'),
    whyPoints: [
      ls(
        'Despacho especializado en Derecho de Extranjería, Inmigración y Nacionalidad',
        'Firm specialized in Immigration, Residency and Nationality law',
        'مكتب متخصص في قانون الهجرة والجنسية',
      ),
      ls(
        'Atención personalizada, en español e inglés',
        'Personalized attention, in Spanish and English',
        'خدمة شخصية، باللغتين الإسبانية والإنجليزية',
      ),
      ls(
        'Experiencia en casos complejos: recursos, expedientes archivados, situaciones familiares atípicas',
        'Experience with complex cases: appeals, archived files, atypical family situations',
        'خبرة في القضايا المعقدة: الطعون، الملفات المحفوظة، الحالات العائلية غير المعتادة',
      ),
      ls(
        'Trato directo con la abogada responsable en cada fase del proceso',
        'Direct access to the lawyer responsible for your case at every stage',
        'تعامل مباشر مع المحامية المسؤولة في كل مرحلة من الإجراء',
      ),
    ],
    cta: {
      _type: 'ctaBlock',
      title: ls(
        '¿Tienes un caso de extranjería y necesitas una valoración profesional?',
        'Have an immigration case and need a professional assessment?',
        'هل لديك حالة هجرة وتحتاج إلى تقييم مهني؟',
      ),
      button: ls(
        'Escríbenos por WhatsApp',
        'Message us on WhatsApp',
        'راسلنا عبر واتساب',
      ),
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
