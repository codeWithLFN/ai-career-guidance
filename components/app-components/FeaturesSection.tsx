import { BookOpen, Brain, TrendingUp, Target, GraduationCap, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Driven Analysis",
    description: "Advanced AI evaluates your academic record, skills, and personality to find your best-fit careers.",
  },
  {
    icon: Target,
    title: "Personalized Recommendations",
    description: "Get tailored suggestions for career paths, university programs, and vocational training.",
  },
  {
    icon: TrendingUp,
    title: "Job Market Insights",
    description: "Understand current demand trends, growth projections, and salary expectations for each career.",
  },
  {
    icon: GraduationCap,
    title: "Education Pathways",
    description: "Discover the qualifications and courses needed to pursue your recommended careers.",
  },
  {
    icon: BookOpen,
    title: "Skills Gap Analysis",
    description: "Identify which skills you need to develop and get actionable learning recommendations.",
  },
  {
    icon: BarChart3,
    title: "Long-Term Planning",
    description: "Plan your career trajectory with insights into future opportunities and industry evolution.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How ACGS <span className="text-primary">Works For You</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our intelligent platform bridges the gap in career counseling through automated, data-driven guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group bg-card rounded-xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="h-12 w-12 rounded-lg hero-gradient flex items-center justify-center mb-4 bg-primary">
                <feature.icon className="h-6 w-6 text-primary-foreground bg-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
