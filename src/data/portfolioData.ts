import { Project, ExperienceItem, EarlierExperienceItem, CreatorChannel, SimulationItem } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Shivam Singh',
  greeting: "Hello, I'm",
  firstName: 'SHIVAM',
  lastName: 'SINGH',
  role: 'AI-assisted Web Developer',
  tagline: 'Web experiences · E-commerce · Analytics',
  heroHeading: 'Ideas turned into working experiences.',
  aboutHeading: 'Curiosity drives what I build.',
  aboutBio: `I'm Shivam Singh, a Computer Science student combining AI-assisted web development, digital operations and creative storytelling. I build and refine websites, work with e-commerce and social content, and use SQL, Excel and Google Sheets to turn information into useful reports.`,
  primaryEmail: 'contactme@technoezmobile.com',
  secondaryEmail: 'workwithtechnoez@gmail.com',
  socials: {
    github: 'https://github.com/technoezmobile',
    linkedin: 'https://www.linkedin.com/in/itsxshivam/',
    instagram: 'https://www.instagram.com/technoezmobile/',
    telegram: 'https://telegram.me/tzlabss'
  },
  education: {
    degree: 'B.Tech in Computer Science Engineering (AI & ML)',
    institution: 'RGPV',
    status: 'Expected graduation 2027'
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'tzlabs',
    number: '01',
    title: 'TZLabs',
    subtitle: 'Technology & creative studio',
    category: 'Website Development',
    tag: 'Studio Platform',
    summary: 'Independent creative technology studio and digital ecosystem showcasing software engineering and creator products.',
    description: 'TZLabs represents a centralized studio hub presenting digital services, custom Android tools, and creator ecosystems. Built through iterative AI-assisted workflows with an atmospheric dark aesthetic.',
    contribution: [
      'Website architecture and frontend layout using modern web technologies',
      'Atmospheric dark-mode visual system and interactive component layout',
      'Integration of studio service offerings, ecosystem navigation, and creator hubs'
    ],
    techStack: ['React', 'CSS3', 'Vite', 'Responsive Design'],
    image: '/assets/projects/tzlabs-hero.jpg',
    liveUrl: 'https://www.tzlabs.in/',
    isLarge: true,
    hasWorkingPreview: true
  },
  {
    id: 'elementraui',
    number: '02',
    title: 'ElementraUI',
    subtitle: 'UI discovery & developer resources',
    category: 'Developer Resource',
    tag: 'Component Hub',
    summary: 'A dark-mode UI component discovery catalog and developer platform for modern web interfaces.',
    description: 'ElementraUI is a specialized repository and catalogue designed to help developers explore, inspect, and integrate modern web UI components and design systems.',
    contribution: [
      'Interface development for component browsing and catalog categorization',
      'Repository maintenance and developer workflow documentation',
      'Creation of the ElementraUI agent skill specification for automated UI discovery'
    ],
    techStack: ['React', 'Modular CSS', 'Tailwind CSS', 'GitHub', 'Vercel'],
    image: '/assets/projects/elementraui-hero.jpg',
    liveUrl: 'https://elementra-ui-website.vercel.app/',
    repoUrl: 'https://github.com/technoezmobile/ElementraUI-Website',
    skillUrl: 'https://github.com/technoezmobile/ElementraUI-Skill',
    isLarge: true,
    hasWorkingPreview: true
  },
  {
    id: 'prayanone',
    number: '03',
    title: 'PrayanOne',
    subtitle: 'Railway information platform',
    category: 'Web Application',
    tag: 'Information Portal',
    summary: 'A clean, accessible web platform designed to streamline train schedules, PNR tracking, and journey queries.',
    description: 'PrayanOne provides an intuitive interface focusing on railway travel accessibility and transit information presentation, reducing travel friction with high clarity.',
    contribution: [
      'Clean interface engineering emphasizing legibility and rapid information scanability',
      'Structured status cards and responsive layout for desktop and mobile commuters',
      'Prototyping UX flows for train lookups and journey schedules'
    ],
    techStack: ['React', 'TypeScript', 'CSS Modules', 'Vercel Deployment'],
    image: '/assets/projects/prayanone-hero.jpg',
    liveUrl: 'https://prayanone.vercel.app/',
    isLarge: true,
    hasWorkingPreview: true
  },
  {
    id: 'aman-portfolio',
    number: '04',
    title: 'Aman Singh Portfolio',
    subtitle: 'Personal portfolio experience',
    category: 'Client Portfolio',
    tag: 'Portfolio Build',
    summary: 'A bespoke personal portfolio website engineered with fluid micro-interactions, dark aesthetic, and Sterling Gate menu.',
    description: 'Executed the frontend construction and styling for Aman Singh’s professional portfolio, matching the approved visual direction and delivering refined animations.',
    contribution: [
      'Frontend implementation replicating the approved visual direction and typography',
      'Integration of liquid-glass UI buttons, custom video header, and overlay navigation',
      'Performance tuning and responsive layout across standard mobile and desktop viewports'
    ],
    techStack: ['React', 'GSAP', 'CSS Architecture', 'Vite', 'Vercel'],
    image: '/assets/projects/aman-portfolio-hero.jpg',
    liveUrl: 'https://www.itsamansingh.com/',
    isLarge: true,
    hasWorkingPreview: true
  },
  {
    id: 'tzroms',
    number: '05',
    title: 'TZ ROMs',
    subtitle: 'Android ROM discovery hub',
    category: 'Discovery Portal',
    tag: 'Android Portal',
    summary: 'A curated discovery portal providing enthusiasts with verified Android ROM updates and device builds.',
    description: 'TZ ROMs catalogs device-specific custom operating systems and community builds within the TZLabs network, emphasizing speed, categorized release notes, and direct download links.',
    contribution: [
      'Frontend catalog structure and device filtering layout',
      'Fast-loading responsive interface for mobile and desktop tech enthusiasts',
      'Integration within the broader TZLabs technology ecosystem'
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript'],
    image: '/assets/projects/tzroms-hero.jpg',
    liveUrl: 'https://tzroms.tzlabs.in/',
    isLarge: false,
    hasWorkingPreview: true
  },
  {
    id: 'duchamp',
    number: '06',
    title: 'Duchamp ROM Portal',
    subtitle: 'Device-specific ROM hub',
    category: 'Device Hub',
    tag: 'Hardware Portal',
    summary: 'Dedicated hardware-specific software hub for the "duchamp" device architecture, linked with TZ ROMs.',
    description: 'A focused companion portal under TZ ROMs catering specifically to the duchamp device community, featuring tailored recovery files, changelogs, and flashing instructions.',
    contribution: [
      'Device-tailored landing page with clear release notes hierarchy',
      'Consistent dark-mode styling aligned with the TZLabs ecosystem',
      'Direct navigation pathways connecting device users to source repositories'
    ],
    techStack: ['HTML5', 'CSS3', 'Responsive Web'],
    image: '/assets/projects/duchamp-hero.jpg',
    liveUrl: 'https://duchamp.tzroms.tzlabs.in/',
    isLarge: false,
    hasWorkingPreview: true
  },
  {
    id: 'physifer-site',
    number: '07',
    title: 'PHYSIFER 2.0',
    subtitle: 'Educational channel website',
    category: 'Educational Platform',
    tag: 'Educational Web',
    summary: 'Web platform designed to support educational physics lectures, digital study material, and student resources.',
    description: 'Created to complement the PHYSIFER YouTube education channel. While website deployment is currently undergoing update, educational lectures and videos are actively hosted on the channel.',
    contribution: [
      'Educational portal layout planning and lecture resource categorization',
      'Content management and video synchronization for academic audiences',
      'Active content distribution on the main YouTube channel'
    ],
    techStack: ['Educational Portal', 'Content Architecture', 'Video Integration'],
    channelUrl: 'https://www.youtube.com/@PHYSIFER',
    isLarge: false,
    statusNote: 'Website preview currently unavailable. Video lectures and educational content are active on YouTube.',
    hasWorkingPreview: false
  },
  {
    id: 'greenera-custom',
    number: '08',
    title: 'Greenera Organics',
    subtitle: 'Customized e-commerce website',
    category: 'E-commerce Customization',
    tag: 'Online Store',
    summary: 'Customized web storefront, product presentation, and digital operations for an organic brand.',
    description: 'Customized and modified this dedicated e-commerce web platform for Greenera Organics alongside ongoing product catalog upkeep, marketplace alignment, and social promotions.',
    contribution: [
      'Storefront layout customization and responsive navigation refinement',
      'Product catalog organization and coordination with Amazon listing channels',
      'Recurring inventory and order reporting via Excel and Google Sheets'
    ],
    techStack: ['E-commerce', 'Catalog Management', 'Analytics'],
    image: '/assets/projects/greenera-custom-hero.jpg',
    liveUrl: 'https://greeneraorganics.vercel.app/',
    isLarge: false,
    hasWorkingPreview: true
  },
  {
    id: 'apnabazaar',
    number: '09',
    title: 'ApnaBazaar',
    subtitle: 'Local marketplace website project',
    category: 'Marketplace Interface',
    tag: 'Web Prototype',
    summary: 'A community marketplace interface connecting local vendors, products, and neighborhood shoppers.',
    description: 'A responsive e-commerce web prototype designed to test hyper-local product discovery, category organization, and clean checkout workflows for local retail businesses.',
    contribution: [
      'Frontend storefront architecture and modern card-based product layouts',
      'Responsive design ensuring browsing on mobile devices',
      'Prototype interface for category exploration and cart interaction'
    ],
    techStack: ['React', 'CSS3', 'Vercel Deployment'],
    image: '/assets/projects/apnabazaar-hero.jpg',
    liveUrl: 'https://apna-bazaar-three.vercel.app/',
    isLarge: false,
    hasWorkingPreview: true
  },
  {
    id: 'technoez-mobile',
    number: '10',
    title: 'Technoez Mobile',
    subtitle: 'YouTube Channel Website',
    category: 'YouTube Channel Website',
    tag: 'Creator Hub',
    summary: 'The digital web presence for Technoez Mobile, dedicated to consumer tech reviews and smartphone guides.',
    description: 'Designed as the central hub for Technoez Mobile’s tech content, software guides, and device walkthroughs. The primary YouTube channel provides immediate video tutorials.',
    contribution: [
      'Brand identity alignment between video channel and web assets',
      'Curating tech tutorial libraries and smartphone software guides',
      'Publishing software walkthroughs and technology reviews'
    ],
    techStack: ['Digital Media', 'Creator Ecosystem', 'Tech Reviews'],
    image: '/assets/projects/technoez-mobile-concept.jpg',
    previewLabel: 'AI-generated website concept',
    channelUrl: 'https://www.youtube.com/@Technoez_Mobile',
    isLarge: false,
    statusNote: 'The project image is an AI-generated website concept. Tech reviews and tutorials are available on the YouTube channel.',
    hasWorkingPreview: false
  }
];

export const CAPABILITIES = [
  {
    icon: 'code',
    title: 'Web Development',
    description: 'Building responsive websites, web applications and digital experiences with modern tools.'
  },
  {
    icon: 'cart',
    title: 'Digital & E-commerce',
    description: 'Creating and managing e-commerce websites, product content and digital operations.'
  },
  {
    icon: 'chart',
    title: 'Analytics & Reporting',
    description: 'Working with data, creating reports and turning insights into better decisions.'
  }
];

export const TOOLKIT_ITEMS = [
  { name: 'HTML5', category: 'Web' },
  { name: 'CSS3', category: 'Web' },
  { name: 'JavaScript (Basics)', category: 'Web' },
  { name: 'WordPress', category: 'CMS' },
  { name: 'Git & GitHub', category: 'Version Control' },
  { name: 'Vercel', category: 'Deployment' },
  { name: 'SQL', category: 'Data' },
  { name: 'Python (Basics)', category: 'Programming' },
  { name: 'Excel', category: 'Analytics' },
  { name: 'Google Sheets', category: 'Analytics' },
  { name: 'Search Console', category: 'SEO' },
  { name: 'Filmora', category: 'Video Editing' },
  { name: 'Canva', category: 'Design' },
  { name: 'AI-assisted Tools', category: 'Workflow' }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'fiverr',
    company: 'Fiverr',
    role: 'Freelance Graphic Design & Video Editing',
    period: '2020 – 2024',
    type: 'Freelance',
    description: 'Delivered custom digital graphics, branding assets, YouTube thumbnails, and polished video editing for international creators and clients.',
    details: [
      'Designed YouTube thumbnails and digital branding packages',
      'Edited short and long-form video content using digital editing workflows',
      'Maintained consistent client communication and timely project delivery'
    ],
    tools: ['Photoshop', 'Filmora', 'Canva', 'Graphic Design', 'Video Editing'],
    active: false
  },
  {
    id: 'flipkart',
    company: 'Flipkart',
    role: 'Customer Service Support (Chat & Voice)',
    period: 'Earlier experience — dates not specified',
    type: 'Customer Operations',
    description: 'Handled customer order inquiries, delivery escalations, and payment inquiries with professional care.',
    details: [
      'Managed live chat and inbound voice queries resolving order and logistics issues',
      'Coordinated with supply chain operations for ticket escalations and speedy resolution'
    ],
    tools: ['Customer Support', 'CRM Tools', 'Chat & Voice Operations', 'Escalation Handling'],
    active: false
  },
  {
    id: 'meesho',
    company: 'Meesho',
    role: 'Supplier Support Representative',
    period: 'Earlier experience — dates not specified',
    type: 'Seller Support',
    description: 'Assisted marketplace suppliers and sellers with catalog listings, shipment reconciliations, and ticket resolution.',
    details: [
      'Assisted online sellers with product catalog optimization and inventory tracking',
      'Resolved shipment reconciliation issues and seller dispute inquiries'
    ],
    tools: ['Supplier Support', 'Catalog Management', 'E-commerce Operations', 'Dispute Resolution'],
    active: false
  },
  {
    id: 'greenera',
    company: 'Greenera Organics',
    role: 'Social Media & E-commerce Management',
    period: 'May – Sep 2026',
    type: 'Freelance (Concurrent with PHYSIFER)',
    description: 'Executed digital operations including storefront catalog updates, Amazon listings coordination, and recurring sales reporting.',
    details: [
      'Maintained online product listings and catalog descriptions across storefronts',
      'Prepared recurring inventory and order reports in Microsoft Excel and Google Sheets',
      'Created marketing assets and promotional social media posts with AI-assisted workflows'
    ],
    tools: ['E-commerce', 'Excel', 'Google Sheets', 'Amazon Seller Hub'],
    link: 'https://greeneraorganics.vercel.app/',
    active: false
  },
  {
    id: 'physifer',
    company: 'PHYSIFER',
    role: 'Social Media Content Manager & Video Editor',
    period: 'Jan 2026 – Present',
    type: 'Freelance · Ongoing',
    description: 'Produces and distributes educational physics and STEM content across digital channels, editing video walkthroughs using Wondershare Filmora.',
    details: [
      'Posts educational content consistently across digital video platforms',
      'Edits video lectures and explainer reels with polished timing and visual annotations',
      'Coordinates digital content assets and student learning materials'
    ],
    tools: ['Filmora', 'Social Content', 'Video Production', 'Canva'],
    link: 'https://www.youtube.com/@PHYSIFER',
    active: true
  }
];

export const EARLIER_EXPERIENCE: EarlierExperienceItem[] = [];

export const CREATOR_CHANNELS: CreatorChannel[] = [
  {
    id: 'technoez',
    name: 'Technoez Mobile',
    category: 'Technology',
    url: 'https://www.youtube.com/@Technoez_Mobile',
    tagline: 'Smartphone tutorials, Android custom ROMs, and practical technology guides.',
    handle: '@Technoez_Mobile'
  },
  {
    id: 'shade-explains',
    name: 'Shade Explains',
    category: 'Gaming Explainers',
    url: 'https://www.youtube.com/@shade_explains',
    tagline: 'Narrative breakdowns, lore explorations, and gaming analysis.',
    handle: '@shade_explains'
  },
  {
    id: 'dark-shade',
    name: 'Dark Shade Gaming',
    category: 'Gaming Videos',
    url: 'https://www.youtube.com/@Dark_Shade_Gaming',
    tagline: 'Gameplay walkthroughs, action-packed moments, and gaming highlights.',
    handle: '@Dark_Shade_Gaming'
  },
  {
    id: 'tzailabs',
    name: 'TZAILabs',
    category: 'AI Content',
    url: 'https://www.youtube.com/@TZAILABS',
    tagline: 'AI tools demonstrations, workflow automations, and modern tech experiments.',
    handle: '@TZAILABS'
  }
];

export const PERSONAL_FILM = {
  title: '2026 Starting',
  date: 'January 2026',
  caption: 'A personal film about consistency and showing up.',
  youtubeId: 'iuzusfjD0ww',
  videoUrl: 'https://www.youtube.com/watch?v=iuzusfjD0ww',
  embedUrl: 'https://www.youtube-nocookie.com/embed/iuzusfjD0ww'
};

export const FORAGE_SIMULATIONS: SimulationItem[] = [
  {
    id: 'data-analytics',
    title: 'Tata GenAI Powered Data Analytics',
    issuer: 'Tata / Forage',
    type: 'Job Simulation',
    description: 'Explored data analytics workflows, AI-assisted business queries, and data interpretation.'
  },
  {
    id: 'data-viz',
    title: 'Tata Data Visualization',
    issuer: 'Tata / Forage',
    type: 'Job Simulation',
    description: 'Modeled customer behavioral datasets and prepared executive dashboard visualizations.'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    issuer: 'Forage Virtual Simulation',
    type: 'Virtual Simulation',
    description: 'Analyzed network threat profiles, security posture assessment, and defensive protocols.'
  }
];
