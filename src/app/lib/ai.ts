/** @format */

import axios, { AxiosError } from "axios";

// Portfolio data type
interface PortfolioData {
  name: string;
  title: string;
  contact: {
    phone: string;
    email: string;
    location: string;
    website: string;
  };
  skills: string[];
  profiles: {
    linkedin: string;
    github: string;
    medium: string;
  };
  profile: string;
  experience: {
    role: string;
    company: string;
    duration: string;
    highlights: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
}

// Your portfolio data
const portfolioData: PortfolioData = {
  name: "MUHAMMAD UZAIR MAQSOOD",
  title: "SOFTWARE ENGINEER",
  contact: {
    phone: "+92 304 4979487",
    email: "uzairmaqsood451@gmail.com",
    location: "Lahore, Punjab 54000",
    website: "https://the-dev-uzair.vercel.app",
  },
  skills: [
    "Server-Side Rendering (SSR)",
    "Static Site Generation (SSG)",
    "Incremental Static Regeneration (ISR)",
    "Core Web Vitals",
    "SEO Optimization",
    "Agile / Scrum",
    "Git / GitHub Actions / CI/CD",
    "RESTful APIs & GraphQL",
    "TypeScript",
    "Cross-browser compatibility",
    "Mobile-first Design",
    "Component-based Architecture",
    "Modular Code",
  ],
  profiles: {
    linkedin: "www.linkedin.com/in/uzair-maqsood-se1a6050267",
    github: "github.com/OXAYR",
    medium: "https://medium.com/@uzairmaqsood451",
  },
  profile:
    "Performance-focused Software Engineer with 2+ years of experience building fast, scalable, and SEO-optimized web applications using modern JavaScript frameworks including React.js, Next.js, and Vue.js. Proven track record in leveraging SSG and ISR to enhance performance and content delivery. Passionate about user-centered design, clean code, and shipping high-impact features. Experienced in full-stack development across MERN, MEVN, and MEAN stacks with a focus on frontend excellence",
  experience: [
    {
      role: "Software Engineer",
      company: "Seven Eight Six Media Group",
      duration: "FEB 2024 - PRESENT",
      highlights: [
        "Engineered a Next.js application with Incremental Static Regeneration (ISR) for real-time content updates while maintaining performance",
        "Developed Static Site Generation (SSG) strategies for dynamic routes to improve SEO and page load speed",
        "Created auto-updating sitemap and meta logic for dynamic pages, significantly improving Google indexing",
        "Optimized Lighthouse scores through lazy loading, responsive image handling, and fine-tuned layout shifting",
        "Actively participated in code reviews, CI/CD workflows, and cross-functional Agile sprints",
      ],
    },
    {
      role: "Associate Software Engineer",
      company: "Seven Eight Six Media Group",
      duration: "JAN 2023 - JAN 2024",
      highlights: [
        "Delivered a Vue.js-based admin dashboard for a healthcare platform, aligning with UX and compliance standards with client side on React",
        "Contributed to frontend architecture of an Islamic learning platform using Vue.js and Bootstrap, achieving a 30% reduction in load time",
        "Built a React Native e-commerce mobile app, integrating Stripe for secure payment processing and multi-step cart flows",
        "Implemented modular UI components using Tailwind CSS across multiple product verticals",
      ],
    },
    {
      role: "Junior Software Engineer",
      company: "Teqniqe Tech",
      duration: "JAN 2023 - JAN 2024",
      highlights: [
        "Supported UI/UX efforts across multiple SPA projects using React, Vue, and Angular",
        "Built reusable UI components and responsive layouts using Tailwind and Bootstrap",
        "Assisted in Express.js API integration and handled user role logic via middleware",
        "Improved performance metrics through UI refactoring, image optimization, and lazy loading",
        "Participated in Agile teams, sprint grooming, and feature documentation",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelors Of Computer Science",
      institution: "Government College University Lahore (GCUL)",
      year: "2020 - 2024",
    },
  ],
};

// Function to generate AI response using Cohere API
export async function generateResponse(query: string): Promise<string> {
  try {
    const systemPrompt = `You are an AI assistant for ${
      portfolioData.name
    }'s portfolio website. 
    You have access to the following information about ${portfolioData.name}:

    Title: ${portfolioData.title}
    Contact: ${JSON.stringify(portfolioData.contact)}
    Skills: ${portfolioData.skills.join(", ")}
    Profiles: ${JSON.stringify(portfolioData.profiles)}
    Profile Summary: ${portfolioData.profile}
    Experience: ${JSON.stringify(portfolioData.experience)}
    Education: ${JSON.stringify(portfolioData.education)}

    Your role is to:
    1. Answer questions about ${
      portfolioData.name
    }'s skills, experience, projects, and education
    2. Be professional and concise
    3. Only provide information that is available in the data
    4. If asked about something not in the data, politely say you don't have that information
    5. Format your responses in a clear, readable way
    6. Highlight achievements and specific metrics when relevant
    7. Emphasize technical expertise and impact of work

    Remember: You are representing ${portfolioData.name} professionally.`;

    console.log("Making request to Cohere API...");
    const response = await axios.post(
      "https://api.cohere.ai/v1/chat",
      {
        model: "command",
        message: query,
        preamble: systemPrompt,
        temperature: 0.7,
        max_tokens: 500,
        stream: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_COHERE_API_KEY}`,
        },
      }
    );

    if (response.data.text) {
      return response.data.text;
    } else {
      console.error("Unexpected API response format:", response.data);
      return "I apologize, but I couldn't generate a response at this time.";
    }
  } catch (error) {
    console.error("Error generating AI response:", error);

    // Handle rate limit or quota exceeded
    if (
      error instanceof AxiosError &&
      (error.response?.status === 429 || error.response?.status === 403)
    ) {
      return `I apologize, but I've reached my monthly limit of free responses. Here's what you can do:

1. Visit my portfolio website at ${portfolioData.contact.website} for more information
2. Connect with me on LinkedIn: ${portfolioData.profiles.linkedin}
3. Check out my GitHub: ${portfolioData.profiles.github}
4. Read my technical articles on Medium: ${portfolioData.profiles.medium}

Feel free to reach out directly at ${portfolioData.contact.email} for any questions!`;
    }

    return "I apologize, but I'm having trouble processing your request right now. Please try again later.";
  }
}

// Function to update portfolio data
export function updatePortfolioData(newData: Partial<PortfolioData>) {
  Object.assign(portfolioData, newData);
}
