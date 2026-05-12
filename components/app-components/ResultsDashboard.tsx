"use client";

import { Button } from "@/components/app-components/ui/button";
import { Badge } from "@/components/app-components/ui/badge";
import { Progress } from "@/components/app-components/ui/progress";
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  GraduationCap,
  Briefcase,
  Star,
  BarChart3,
  BookOpen,
  RefreshCw,
} from "lucide-react";
import type { AssessmentData } from "./AssessmentFlow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { useEffect, useState } from "react";
import { getRecommendations } from "@/app/actions/actions";
import { addRecommendations, clearRecommendations } from "@/lib/store/slices/recommendationSlice";
import { clearAccademicRecord } from "@/lib/store/slices/academicSlice";
import { clearAssessment } from "@/lib/store/slices/assessmentSlice";
import LoadingIndicator from "../ui/loadingIndicator";

interface CareerRecommendation {
  title: string;
  matchScore: number;
  description: string;
  salaryRange: string;
  demand: "High" | "Medium" | "Growing";
  demandTrend: string;
  education: string[];
  keySkills: string[];
  category: string;
}

interface ResultsDashboardProps {
  assessmentData: AssessmentData;
  onBack: () => void;
  onRetake: () => void;
}


const demandColor = (d: string) => {
  switch (d) {
    case "High": return "bg-success/10 text-success";
    case "Growing": return "bg-accent/20 text-accent-foreground";
    default: return "bg-secondary text-secondary-foreground";
  }
};

const ResultsDashboard = ({ assessmentData, onBack, onRetake }: ResultsDashboardProps) => {
  const [recommendationsObject, setRecommendationsObject] = useState<any[]>([]);
  const [summary, setSummary] = useState<string>();

  const dispatch = useDispatch()
  const assessment = useSelector((state: RootState) => state.assessment);
  const recommendationsNew = useSelector((state: RootState) => state.recommendations);
  useEffect(() => {
    (async () => {
      const reccomendationData = await loadRecommendations(assessmentData);
      console.log({ reccomendationData })
    })();
  }, [])

  useEffect(() => {
    if (recommendationsNew.recommendations && recommendationsNew.recommendations.data ) {
      const { data: {
        insights: { summary },
        recommendations
      } } = recommendationsNew.recommendations
      if (Array.isArray(recommendations)) {
        setRecommendationsObject(recommendations);
      }
      if (summary) {
        setSummary(summary);
      }
    }

  }, [recommendationsNew])

  const loadRecommendations = async (assessmentData: AssessmentData) => {
    const recommendations = await getRecommendations({
      subject: assessmentData.subjects,
      skills: assessmentData.skills,
      interests: assessmentData.interests,
      personality: assessmentData.personalityTraits
    });
    console.log({ recommendations });
    dispatch(addRecommendations(recommendations));
    return recommendations;
  }

  const onRetakeAssessment = () => {
    dispatch(clearAccademicRecord())
    dispatch(clearAssessment())
    dispatch(clearRecommendations())
    window.location.reload();
  }

  console.log({ assessment, recommendationsNew })
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Your Career Recommendations</h1>
              <p className="text-muted-foreground">
                "Based on your academic profile, skills, interests, and personality traits.
              </p>
            </div>
            <Button variant="outline" onClick={onRetakeAssessment}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retake Assessment
            </Button>
          </div>
        </div>
         {!summary &&
         <div className="flex items-center justify-center flex-wrap gap-4">
          <LoadingIndicator message={"Generating recommendations please wait..."}/>
         </div>}
        {summary &&
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Summary</h1>
              <p className="text-muted-foreground text-sm">{summary}</p>
            </div>
          </div>}

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Subjects", value: assessment.subjects.length, icon: BookOpen },
            { label: "Skills", value: assessment.skills.length, icon: Star },
            { label: "Interests", value: assessment.interests.length, icon: Briefcase },
            { label: "Matches Found", value: recommendationsObject.length, icon: BarChart3 },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl p-4 card-shadow text-center">
              <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recommendations */}

        <div className="space-y-6">
          {recommendationsObject && recommendationsObject.map((rec, i) => (
            <div
              key={rec.career}
              className="bg-card rounded-xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold">{rec.career}</h3>
                    <Badge className={demandColor(rec.jobDemand)}>{rec.jobDemand} Demand</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">{rec.reason}</p>
                </div>
                {/* <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">Match Score</div>
                  <div className="text-3xl font-bold text-primary">{rec.matchScore}%</div>
                </div> */}
              </div>

              <Progress value={rec.matchScore} className="h-2 mb-4" />

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <DollarSign className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Salary Range</div>
                    <div className="text-muted-foreground">{rec.salaryRange}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Path way</div>
                    <div className="text-muted-foreground">{rec.pathway}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <GraduationCap className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Education Paths</div>
                    <div className="text-muted-foreground">{rec.requiredQualifications}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {rec.matchedData.map((s: any) => (
                  <Badge key={s} variant="secondary" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ResultsDashboard;
