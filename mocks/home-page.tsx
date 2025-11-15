



// import BeakerIcon  from './assets/IconFeatureSection/Beaker.svg';
// import BriefcaseIcon  from './assets/IconFeatureSection/Briefcase.svg';
// import  CheckIcon from './assets/IconFeatureSection/Check.svg';
// import  ClipboardIcon  from './assets/IconFeatureSection/ClipboardDocumentCheck.svg';
// import  LinkIcon  from './assets/IconFeatureSection/Link.svg';
// import UsersIcon  from './assets/IconFeatureSection/Users.svg';
//Footer
interface NavigationItem {
  link: string;
  label: string;
 }
const links:NavigationItem[] = [
  { link: '#', label: 'О проекте' },
  { link: '#', label: 'Возможности' },
  { link: '#', label: 'Технологии' },
  { link: '#', label: 'Сообщество' },
];

// TechnologiesSection
export interface TechnologyCategory{
  category: string;
  items: string[];
}
const technologies: TechnologyCategory[] = [
  {
    category: 'Языки',
    items: [
      'JavaScript',
      'TypeScript',
      'Python',
      'Go',
      'Rust',
      'C',
      'C++',
      'PHP',
      'Ruby',
    ],
  },
  {
    category: 'Базы данных',
    items: [
      'PostgreSQL',
      'MySQL',
      'SQLite',
      'MongoDB',
      'Redis',
      'ClickHouse',
    ],
  },
  {
    category: 'Инструменты',
    items: ['Git', 'grep', 'curl', 'Mermaid', 'Latex'],
  },
];

// SectionContainer


// FeaturesSection

interface Feature {
  id: number;
  title: string;
  textContent: string;

}

interface FeaturesSectionProps {
  features?: Feature[];
}
const mocData: Feature[] = [
    {
      id: 1,
      title: 'Песочницы',
      textContent: 'Окружения для JS, TS, Python, SQL и др.',
    },
    {
      id: 2,
      title: 'Редактор',
      textContent: 'Легкий и быстрый, сохранение в один клик.',

    },
    {
      id: 3,
      title: 'Встраивание',
      textContent: 'HTML-виджет и React-компонент для любой документации.',
    },
    {
      id: 4,
      title: 'Проверки',
      textContent: 'Добавляйте тесты к задачам и урокам.',
    },
    {
      id: 5,
      title: 'API',
      textContent: 'Запускайте код из своих приложений.',
    },
    {
      id: 6,
      title: 'Команда',
      textContent: 'Совместная работа и общий доступ',
    },
  ];

//HeroBanner
interface HeroBannerContent {
  id: number;
  title: string;
  textContent: string;
}

interface HeroBanner {
  id: number;
  subHeader: string;
  header: string;
  subtitle: string;
  content: HeroBannerContent[];
  CTA: string;
}

interface HeroBannerProps {
  data: HeroBanner;
}
const mockData: HeroBanner = {
  id: 1,
  subHeader: 'Быстрый старт',
  header: 'Мгновенный IDE в браузере',
  subtitle:
    'Пишите и запускайте код без установки конфигурации. Делитесь сниппетами, подключайте песочницы и встраваивайте в документацию.',
  content: [
    {
      id: 1,
      title: 'Запуск за секунды',
      textContent: 'Откройте и пишите - все готово',
    },
    {
      id: 2,
      title: 'Виджеты',
      textContent: 'Встраивайте интерактивные примеры',
    },
    {
      id: 3,
      title: 'Шаринг',
      textContent: 'Делитесь ссылкой или встраивайте статьи',
    },
  ],
  CTA: '',
};

// Header
//CommunitySection
export type CommunityType = {
  badge: string
  title: string
  text: string
  btn: string
  link: string
}
interface CommunitySectionProps {
  communities: Array<CommunityType>;
}
const mockDataa = [
 {
   badge: '+1k каждый месяц',
   btn: 'Перейти в канал',
   link: 'https://t.me/HexletCareerBot',
   text: 'Обсуждение вакансий и резюме',
   title: 'Тг Карьера',
 },
 {
   badge: 'Активные обсуждения',
   btn: 'Присоединиться',
   link: 'https://t.me/hexletcommunity',
   text: 'Вопросы по коду и обмен опытом',
   title: 'Тг Сообщество',
 },
 {
   badge: 'Закрытый клуб',
   btn: 'Узнать подробнее',
   link: 'https://t.me/HexletClubBot',
   text: 'Нетворкинг и коллаборации',
   title: 'Клуб Хекслета',
 },
];