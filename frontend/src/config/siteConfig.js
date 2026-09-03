// Site Configuration
// UPDATE THIS FILE TO CUSTOMIZE YOUR PORTFOLIO

export const siteConfig = {
  // ===== PERSONAL INFORMATION =====
  name: "Gandreddy Lokesh",
  firstName: "Lokesh",
  location: "Hyderabad, India",
  timezone: "ist",
  tagline: "I architect intelligent systems that think, automate, and scale. This is where ideas become infrastructure.",
  
  // ===== PROFILE IMAGES =====
  profileImage: "https://customer-assets.emergentagent.com/job_daniel-autry/artifacts/vpfro1p6_WhatsApp%20Image%202026-01-13%20at%2019.29.21.jpeg",
  // Add your closing portrait image here (displayed at the end before footer)
  closingImage: "https://customer-assets.emergentagent.com/job_daniel-autry/artifacts/vpfro1p6_WhatsApp%20Image%202026-01-13%20at%2019.29.21.jpeg",
  
  // ===== CONTACT & SOCIAL LINKS =====
  email: "lokeshgandreddy81@gmail.com",
  phone: "+91 6300272531",
  linkedIn: "https://linkedin.com/in/lokeshh-hhh",
  github: "https://github.com/Lokeshgandreddy81?tab=repositories",
  portfolio: "https://lokesh-dev-81d7.vercel.app",
  blog: "https://lokeshgandreddy.hashnode.dev",
  devto: "https://dev.to/lokeshgandreddy",
  
  // ===== WORK EXPERIENCES =====
  workExperiences: [
    {
      id: "cortex",
      company: "Cortex",
      logo: "C",
      index: "01",
      category: "FEATURED PLATFORM",
      title: "Right now, I'm building Cortex — an AI-native learning platform.",
      description: "Founder & Lead Backend Engineer — architecting real-time adaptive engines, vector retrieval systems, and scalable cloud infrastructure.",
      link: "https://vidyalaya-eight.vercel.app"
    },
    {
      id: "hirecircle",
      company: "HireCircle",
      logo: "HC",
      index: "02",
      category: "AI HIRING PLATFORM",
      title: "I architected HireCircle — a mobile-first platform streamlining talent discovery and AI-assisted hiring workflows.",
      description: "Founder & Full-Stack AI Engineer — built the mobile app in React Native/Expo, real-time backend with Node.js & Express, and smart interview workflows connecting job seekers with employers.",
      tags: ["React Native", "Expo", "Node.js", "AI Interviews", "Express", "AWS"],
      link: "https://github.com/Lokeshgandreddy81/HireCircle"
    }
  ],
  
  // ===== ABOUT SECTIONS =====
  aboutSections: [
    {
      title: "I started in the engine room",
      description: "Backend systems, cloud architecture, and the gritty details of what makes systems reliable at scale. My degree in Computer Science was just the preface. The real learning began in production."
    },
    {
      title: "But my true passion isn't just building — it's architecting",
      description: "I believe the most elegant systems are invisible. They don't demand attention; they enable momentum."
    },
    {
      title: "Outside the terminal, I'm a student of systems thinking",
      description: "In code, in teams, in how ideas spread. I write to clarify my own thinking, speak to sharpen it, and listen to broaden it."
    },
    {
      title: "I speak at meetups about the craft of production-ready AI",
      description: "Because great engineering is as much about communication as it is about code. Sharing knowledge isn't just giving back — it's how we all move forward."
    }
  ],
  
  // ===== INTERESTS =====
  interests: {
    building: ["Prototypes that become products", "Tools that become standards", "Systems that scale gracefully"],
    reading: [
      "AI agent architectures, loops & graph capabilities",
      "Anthropic hackathon projects & emerging use cases",
      "System-level debugging & production-grade code"
    ],
    learning: [
      "Long-form interviews with builders",
      "Exploring & cloning open-source projects to build upon",
      "Learning from creators experimenting with AI tools"
    ]
  },
  
  // ===== FOOTER =====
  footer: {
    text: "This site, like everything I build, is crafted, not assembled. Explore the code on",
    linkText: "my GitHub.",
    copyright: `Copyright © ${new Date().getFullYear()} Gandreddy Lokesh. Built with intention, deployed with purpose.`
  }
};

export default siteConfig;
