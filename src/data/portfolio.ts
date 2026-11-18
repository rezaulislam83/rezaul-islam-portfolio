export type ProjectFilterCategory = 'all' | 'backend' | 'ai-ml' | 'linux-server';

export interface ProjectItem {
  id: string;
  title: string;
  categoryLabel: string;
  filterKey: Exclude<ProjectFilterCategory, 'all'>;
  status?: 'In Progress';
  summary: string;
  details: string[];
  technologies: string[];
  architectureLabel: string;
  artworkVariant: 'banking' | 'samba' | 'dental-ai';
  /** Populate these when public repository or live URLs are available */
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  focusNote?: string;
  iconName: 'code' | 'server' | 'database' | 'brain' | 'cloud' | 'wrench';
  items: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  duration: string;
  responsibilities: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  field: string;
  period: string;
  resultLabel: string;
  resultValue: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  type: string;
  description: string;
  status?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  context: string;
}

export interface NavSection {
  id: string;
  label: string;
}

export const PORTFOLIO_CONFIG = {
  brand: 'RI.dev',
  name: 'Rezaul Islam',
  title: 'Aspiring AI & Backend Engineer',
  location: 'Dhaka, Bangladesh',
  email: 'rezaulislamakib@gmail.com',
  phone: '+88 01968151083',
  phoneRaw: '+8801968151083',
  linkedinUrl: 'https://www.linkedin.com/in/rezaul-islam-463123288/',
  /** Add your GitHub profile URL here when ready to display the GitHub link */
  githubUrl: '' as string,
  portraitUrl: '/assets/portrait_cv.jpg',
  /**
   * CV Download Path:
   * Currently points to the newer uploaded CV in public/assets/aistudio/.
   * To replace it later, place your latest PDF at /public/resume.pdf and update this path to '/resume.pdf'.
   */
  cvDownloadPath: '/assets/aistudio/Rezaul_special-cv_b070c15d.pdf',
  cvDownloadFilename: 'Rezaul_Islam_CV.pdf',
  terminalPrompt: 'root@rezaul:~$ whoami',
  heroSupportingText:
    'Building intelligent applications, reliable backend systems, and exploring the power of cloud technologies.',
  cyclingRoles: [
    'Backend Developer',
    'AI & Machine Learning Enthusiast',
    'Python & Django Developer',
    'Cloud & Linux Enthusiast',
  ],
  heroStackTags: ['Python', 'Django', 'C++', 'Java', 'Go', 'MySQL', 'Linux', 'AWS'],
  summaryParagraphs: [
    'I am a Computer Science and Engineering student with a strong interest in AI, Backend Engineering, and Cloud Computing. I enjoy solving technical problems and building reliable software solutions. My academic foundation includes Artificial Intelligence, Machine Learning, and Natural Language Processing, while I am developing practical backend engineering skills using Python and Django. I am also interested in Linux systems, server management, and DevOps technologies.',
    'My long-term goal is to become a skilled technology professional who can build scalable backend systems and intelligent software solutions.',
  ],
  aboutHighlights: [
    'Computer Science & Engineering student at Daffodil International University with a major in Artificial Intelligence.',
    'Currently sharpening backend engineering skills with Python, Django, and Django REST Framework.',
    'Strong interest in Linux administration, server management, networking, cloud fundamentals, and scalable systems.',
    'Values structured problem-solving, continuous learning, and collaborative teamwork.',
  ],
  quickFacts: [
    { label: 'Degree', value: 'B.Sc. in CSE' },
    { label: 'University', value: 'Daffodil International University' },
    { label: 'CGPA', value: '3.63 / 4.00' },
    { label: 'Location', value: 'Dhaka, Bangladesh' },
  ],
};

export const NAV_SECTIONS: NavSection[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    iconName: 'code',
    items: ['C', 'C++', 'Java', 'Go', 'Python'],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    focusNote: 'Active Learning Focus',
    iconName: 'server',
    items: ['Python', 'Django', 'Django REST Framework', 'REST API Fundamentals'],
  },
  {
    id: 'database',
    title: 'Database',
    iconName: 'database',
    items: ['MySQL', 'Database Management'],
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    focusNote: 'Academic Major',
    iconName: 'brain',
    items: [
      'Artificial Intelligence Fundamentals',
      'Machine Learning Fundamentals',
      'Natural Language Processing (NLP)',
      'Computer Vision',
      'Deep Learning',
    ],
  },
  {
    id: 'cloud-infra',
    title: 'Cloud & Infrastructure',
    focusNote: 'Continuing Growth',
    iconName: 'cloud',
    items: [
      'AWS Fundamentals',
      'Linux',
      'Ubuntu',
      'Windows',
      'Samba File Server',
      'Networking Fundamentals',
    ],
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    iconName: 'wrench',
    items: ['Git', 'GitHub', 'VS Code', 'Cisco Packet Tracer'],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'zero-pay',
    title: 'ZERO PAY – Banking Management System',
    categoryLabel: 'Backend / Database',
    filterKey: 'backend',
    summary:
      'Developed a Java and MySQL-based banking management system with customer and transaction management.',
    details: [
      'Designed structured relational tables in MySQL to store customer profiles, account balances, and transaction records.',
      'Implemented core Java application workflows for managing customer accounts and recording financial transactions reliably.',
      'Focused on clean data integrity between application logic and database queries.',
    ],
    technologies: ['Java', 'MySQL'],
    architectureLabel: 'Java Application · MySQL Relational Schema',
    artworkVariant: 'banking',
  },
  {
    id: 'samba-server',
    title: 'Linux-Based Samba File Sharing Server',
    categoryLabel: 'Linux / System Administration',
    filterKey: 'linux-server',
    summary:
      'Configured an Ubuntu Samba Server with group-based access control and secure shared folder management.',
    details: [
      'Deployed and configured Samba services on Ubuntu Linux for cross-platform network file sharing.',
      'Implemented group-based user permissions and directory access policies to isolate shared resources securely.',
      'Managed Linux user groups, filesystem ownership, and Samba configuration rules for reliable access control.',
    ],
    technologies: ['Linux', 'Ubuntu', 'Samba', 'Server Administration'],
    architectureLabel: 'Ubuntu Host · Group ACLs · SMB Share',
    artworkVariant: 'samba',
  },
  {
    id: 'dental-xray-dl',
    title: 'Dental X-ray Based Deep Learning System',
    categoryLabel: 'AI / Deep Learning / Medical Technology',
    filterKey: 'ai-ml',
    status: 'In Progress',
    summary:
      'Developing a deep learning-based system to support tooth extraction decisions using dental X-ray images.',
    details: [
      'Exploring computer vision and deep learning approaches for analyzing dental radiograph imagery.',
      'Structuring a clinical decision-support workflow intended to assist with tooth extraction evaluation.',
      'Building directly on coursework and bootcamp training in Computer Vision and Deep Learning for Medical Data Analysis.',
    ],
    technologies: [
      'Deep Learning',
      'Computer Vision',
      'Medical Image Analysis',
      'Artificial Intelligence',
    ],
    architectureLabel: 'Radiograph Input · Vision Model · Decision Support',
    artworkVariant: 'dental-ai',
  },
];

export const PROJECT_FILTER_OPTIONS: { key: ProjectFilterCategory; label: string }[] = [
  { key: 'all', label: 'All Projects' },
  { key: 'backend', label: 'Backend' },
  { key: 'ai-ml', label: 'AI / Machine Learning' },
  { key: 'linux-server', label: 'Linux & Server' },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'udc-entrepreneur',
    role: 'Union Digital Center Entrepreneur (UDC)',
    organization: 'Mohanpur Union Parishad',
    location: 'Matlob Uttar, Chandpur',
    duration: '2020 – 2021',
    responsibilities: [
      'Processed online applications and documents while supporting citizens with digital service-related activities.',
      'Assisted citizens in navigating and completing government digital service workflows accurately.',
      'Supported people in accessing various online government e-services efficiently.',
    ],
  },
];

export const EDUCATION_HISTORY: EducationItem[] = [
  {
    id: 'bsc-cse',
    degree: 'Bachelor of Science (B.Sc.) in Computer Science & Engineering',
    institution: 'Daffodil International University (DIU), Dhaka',
    field: 'Major: Artificial Intelligence',
    period: '2023 – 2026 (Expected)',
    resultLabel: 'CGPA',
    resultValue: '3.63 / 4.00',
  },
  {
    id: 'hsc',
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Uttara High School & College, Dhaka',
    field: 'Science',
    period: '2021',
    resultLabel: 'GPA',
    resultValue: '5.00 / 5.00',
  },
  {
    id: 'ssc',
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Mathabhanga Adarsha High School, Chandpur',
    field: 'Science',
    period: '2019',
    resultLabel: 'GPA',
    resultValue: '5.00 / 5.00',
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'aws-academy',
    title: 'AWS Academy Cloud Foundations',
    issuer: 'AWS Academy',
    type: 'Cloud Credential',
    description: 'Earned course completion credential covering core AWS cloud concepts and architecture.',
  },
  {
    id: 'unlock-algorithm',
    title: 'DIU Unlock the Algorithm Programming Contest',
    issuer: 'Daffodil International University',
    type: 'Competitive Programming',
    description: 'Secured 36th position in the preliminary round.',
  },
  {
    id: 'medical-cv-bootcamp',
    title: 'Computer Vision and Deep Learning for Medical Data Analysis Bootcamp 2025',
    issuer: 'Daffodil International University',
    type: 'AI / Deep Learning',
    description: 'Completed intensive hands-on training on computer vision and deep learning for medical imaging.',
  },
  {
    id: 'osthad-django',
    title: 'Backend Engineering Course (Django & DRF)',
    issuer: 'Osthad',
    type: 'Backend Engineering',
    status: 'Currently Pursuing',
    description: 'Developing practical backend skills with Django, Django REST Framework, and API design.',
  },
  {
    id: 'bteb-360',
    title: '360-Hour Computer Basic Training',
    issuer: 'Bangladesh Technical Education Board (BTEB)',
    type: 'Certified Training',
    description: 'Completed 360-hour foundational computing certification under BTEB.',
  },
  {
    id: 'muktopaath',
    title: 'Digital Security Essentials & National Portal Management',
    issuer: 'Muktopaath (Government e-Learning Platform)',
    type: 'Government Certificates',
    description: 'Earned government-recognized certificates in Digital Security Essentials and National Portal Management.',
  },
];

export const ACTIVITIES: ActivityItem[] = [
  {
    id: 'diu-cpc',
    title: 'Executive Member of DIU Computer & Programming Club',
    context: 'Student Leadership & Tech Community',
  },
  {
    id: 'shopnodrosta',
    title: 'Executive Member of Shopnodrosta',
    context: 'Social & Community Organization',
  },
  {
    id: 'take-off',
    title: 'Participated in DIU Take-Off Programming Contest',
    context: 'Competitive Programming',
  },
  {
    id: 'unlock-algo-act',
    title: 'Participated in Unlock the Algorithm Programming Contest',
    context: 'Competitive Programming',
  },
  {
    id: 'university-events',
    title: 'Organized university events',
    context: 'Event Management, Leadership & Teamwork',
  },
  {
    id: 'volunteer-service',
    title: 'Involved in volunteer service and community activities',
    context: 'Community Engagement',
  },
];
