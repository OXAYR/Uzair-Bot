/** @format */

import { Code2, Layers, Terminal } from "lucide-react";
import React, { useState, ReactElement } from "react";
import Card from "./Card";
import Badge from "./Badge";
import CodeBlock from "./CodeBlock";

interface Skill {
  name: string;
  level: number;
  experience: string;
}

interface SkillCategory {
  title: string;
  command: string;
  icon: ReactElement;
  description: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    command: "frontend",
    icon: <Code2 size={18} />,
    description: "Building responsive and interactive user interfaces",
    skills: [
      { name: "React", level: 80, experience: "2 years" },
      { name: "Next.js", level: 83, experience: "2 years" },
      { name: "TypeScript", level: 75, experience: "1 year" },
      { name: "Vue.js", level: 90, experience: "3 years" },
      { name: "Tailwind CSS", level: 92, experience: "3 years" },
    ],
  },
  {
    title: "Mobile Development",
    command: "mobile",
    icon: <Layers size={18} />,
    description: "Cross-platform mobile applications",
    skills: [
      { name: "React Native", level: 68, experience: "1 year" },
      {
        name: "React Native Package Maintenance & Patching",
        level: 65,
        experience: "1 year",
      },
      {
        name: "Native Stripe Payment Integration",
        level: 60,
        experience: "1 year",
      },
      { name: "Redux Toolkit", level: 87, experience: "3 years" },
      { name: "React Navigation", level: 78, experience: "4 years" },
    ],
  },
  {
    title: "Backend & Database",
    command: "backend",
    icon: <Terminal size={18} />,
    description: "Server-side development and data management",
    skills: [
      { name: "Node.js", level: 90, experience: "1.5 year" },
      { name: "Express.js", level: 88, experience: "1.5 year" },
      { name: "JWT Authentication", level: 85, experience: "1 year" },
      { name: "MongoDB", level: 82, experience: "1 year" },
      { name: "Rest api", level: 85, experience: "2 years" },
    ],
  },
];

const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-gray-800/60">
            <Terminal size={16} className="text-blue-400" />
            <span className="text-sm text-gray-400 font-mono">~/skills</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Tech Arsenal</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit of technologies and frameworks I use to
            build exceptional digital experiences
          </p>
        </div>

        {/* Terminal-style Navigation */}
        <div className="mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-gray-500 text-sm font-mono">
                skills-terminal
              </div>
            </div>
            <div className="font-mono text-sm">
              <div className="text-emerald-400 mb-2">$ ls -la /skills</div>
              <div className="flex flex-wrap gap-4">
                {skillCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(index)}
                    aria-pressed={activeCategory === index}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                      activeCategory === index
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "text-gray-400 hover:text-gray-300 hover:bg-gray-800/50"
                    }`}
                  >
                    {category.icon}
                    <span className="font-mono text-sm">
                      ./{category.command}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Active Category Display */}
        <div className="mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-blue-500/20">
                {skillCategories[activeCategory].icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {skillCategories[activeCategory].title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {skillCategories[activeCategory].description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {skillCategories[activeCategory].skills.map((skill) => (
                <div key={skill.name} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <Badge variant="default">{skill.experience}</Badge>
                    </div>
                    <span className="text-sm text-gray-400 font-mono">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Terminal Output */}
        <div className="grid md:grid-cols-2 gap-6">
          <CodeBlock>
            <div className="text-emerald-400">$ whoami</div>
            <div className="text-gray-400 mt-2 leading-relaxed">
              Full-stack developer with 2+ years of experience building scalable
              applications.
              <br />
              <span className="text-blue-400">
                Passionate about clean code, user experience, and emerging
                technologies.
              </span>
            </div>
          </CodeBlock>

          <CodeBlock>
            <div className="text-emerald-400">$ cat experience.json</div>
            <div className="text-gray-400 mt-2 font-mono text-xs">
              <div className="text-cyan-400">{"{"}</div>
              <div className="ml-2">
                <span className="text-orange-400">"role"</span>:{" "}
                <span className="text-green-400">"Full-Stack Developer"</span>,
              </div>
              <div className="ml-2">
                <span className="text-orange-400">"experience"</span>:{" "}
                <span className="text-green-400">"2+ years"</span>,
              </div>
              <div className="ml-2">
                <span className="text-orange-400">"focus"</span>:{" "}
                <span className="text-green-400">["Web", "Mobile", "AI"]</span>
              </div>
              <div className="text-cyan-400">{"}"}</div>
            </div>
          </CodeBlock>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
