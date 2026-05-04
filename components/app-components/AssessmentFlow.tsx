'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/app-components/ui/input";
import { Label } from "@/components/app-components/ui/label";
import { Textarea } from "@/components/app-components/ui/textarea";
import { Badge } from "@/components/app-components/ui/badge";
import { Progress } from "@/components/app-components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle, X } from "lucide-react";
import { UploadReport } from "../career-guide/UploadReport";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import ModuleProgress from "../ui/ModuleProgress";
import { findValueByKey, normalizeObjects } from "@/lib/utils";
import { addInterests, addPersonality, addSkills, addSubjects } from "@/lib/store/slices/assessmentSlice";


export interface AssessmentData {
  subjects: any[];
  grades: string;
  skills: string[];
  interests: string[];
  personalityTraits: string[];
  additionalInfo: string;
}

interface AssessmentFlowProps {
  onComplete: (data: AssessmentData) => void;
  onBack: () => void;
}

const subjectOptions = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English", "History",
  "Geography", "Computer Science", "Economics", "Art", "Music", "Literature",
  "Business Studies", "Psychology", "Sociology", "Physical Education",
];

const skillOptions = [
  "Problem Solving", "Critical Thinking", "Communication", "Leadership",
  "Creativity", "Teamwork", "Time Management", "Technical Skills",
  "Data Analysis", "Writing", "Public Speaking", "Research",
  "Programming", "Design", "Organization", "Negotiation",
];

const interestOptions = [
  "Technology", "Healthcare", "Business", "Engineering", "Arts & Design",
  "Science & Research", "Education", "Law & Policy", "Finance",
  "Media & Communication", "Environment", "Social Work",
  "Sports & Fitness", "Agriculture", "Architecture", "Entertainment",
];

const personalityOptions = [
  "Analytical", "Creative", "Detail-oriented", "Big-picture thinker",
  "Introverted", "Extroverted", "Collaborative", "Independent",
  "Risk-taker", "Cautious", "Empathetic", "Competitive",
  "Patient", "Energetic", "Structured", "Flexible",
];

const steps = ["Academic Profile", "Skills", "Interests", "Personality"];

const AssessmentFlow = ({ onComplete, onBack }: AssessmentFlowProps) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AssessmentData>({
    subjects: [],
    grades: "",
    skills: [],
    interests: [],
    personalityTraits: [],
    additionalInfo: "",
  });

  const dispatch = useDispatch();

  const academicRecords = useSelector((state: RootState) => state.academicRecords);

  const subjectRecords = useSelector((state: RootState) => state.assessment.subjects);
  const skillRecords = useSelector((state: RootState) => state.assessment.skills);
  const personalityRecords = useSelector((state: RootState) => state.assessment.personality);
  const interestRecords = useSelector((state: RootState) => state.assessment.interests);

  useEffect(() => {
    setData({
        ...data,
        subjects: subjectRecords,
        skills: skillRecords,
        interests: interestRecords,
        personalityTraits: personalityRecords
      });

  }, [])

  useEffect(() => {
    setData({
        ...data,
        subjects: subjectRecords,
        skills: skillRecords,
        interests: interestRecords,
        personalityTraits: personalityRecords
      });

  }, [subjectRecords, skillRecords, personalityRecords, interestRecords])

  useEffect(() => {
    let dataValues = findValueByKey(academicRecords, 'modules');
    let newObjects = normalizeObjects(dataValues, { name: '', percentage: 0 });
    if (newObjects) {
      const subjects = newObjects.filter(newdata => {
        if (newdata) {
          return newdata;
        }
      });
      setData({
        ...data,
        subjects: subjects
      })
    }
  }, [academicRecords])

  useEffect(() => {
    if (data.subjects.length > 0) {
      dispatch(addSubjects(data.subjects))
    }

    if (data.skills.length > 0) {
      dispatch(addSkills(data.skills))
    }

    if (data.interests.length > 0) {
      dispatch(addInterests(data.interests))
    }

    if (data.personalityTraits.length > 0) {
      dispatch(addPersonality(data.personalityTraits))
    }
  },
    [data.subjects, data.interests, data.personalityTraits, data.skills])
  const progress = ((step + 1) / steps.length) * 100;

  const toggleItem = (field: keyof AssessmentData, item: string) => {
    const current = data[field] as string[];
    setData({
      ...data,
      [field]: current.includes(item) ? current.filter((i) => i !== item) : [...current, item],
    });
  };

  const canProceed = () => {
    switch (step) {
      case 0: return data.subjects.length > 0;
      case 1: return data.skills.length >= 3;
      case 2: return data.interests.length >= 2;
      case 3: return data.personalityTraits.length >= 3;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onComplete(data);
  };

  const renderChips = (
    options: string[],
    selected: string[],
    field: keyof AssessmentData
  ) => (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isSelected = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => toggleItem(field, opt)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${isSelected
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-secondary"
              }`}
          >
            {opt}
            {isSelected && <X className="inline ml-1 h-3 w-3" />}
          </button>
        );
      })}
    </div>
  );

  const dataValues = findValueByKey(academicRecords, 'modules');

  const newObjects = normalizeObjects(dataValues, { name: '', percentage: 0 });

  // console.log({subjectRecords, skillRecords, personalityRecords, interestRecords});
  console.log({ data });
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={step > 0 ? () => setStep(step - 1) : onBack}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Career Assessment</h2>
            <span className="text-sm text-muted-foreground">
              Step {step + 1} of {steps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />

          <div className="flex gap-2 mt-4">
            {steps.map((s, i) => (
              <Badge
                key={s}
                variant={i === step ? "default" : i < step ? "secondary" : "outline"}
                className="text-xs"
              >
                {i < step && <CheckCircle className="h-3 w-3 mr-1" />}
                {s}
              </Badge>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-card rounded-xl p-8 card-shadow animate-scale-in" key={step}>
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-1">Academic Profile</h3>
                <p className="text-muted-foreground mb-6">
                  Select your strongest subjects and describe your academic performance.
                </p>
              </div>
              {!newObjects ?
                <UploadReport />
                :
                <div>
                  <ModuleProgress
                    modules={newObjects}
                  />
                </div>
              }

            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-1">Your Skills</h3>
                <p className="text-muted-foreground mb-6">
                  Select at least 3 skills that best describe your strengths.
                </p>
              </div>
              {renderChips(skillOptions, data.skills, "skills")}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-1">Your Interests</h3>
                <p className="text-muted-foreground mb-6">
                  Choose at least 2 areas that excite you most.
                </p>
              </div>
              {renderChips(interestOptions, data.interests, "interests")}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-1">Personality Traits</h3>
                <p className="text-muted-foreground mb-6">
                  Select at least 3 traits that best describe you.
                </p>
              </div>
              {renderChips(personalityOptions, data.personalityTraits, "personalityTraits")}
              <div>
                <Label htmlFor="additional" className="text-sm font-medium mb-2 block">
                  Anything else you'd like us to know? (Optional)
                </Label>
                <Textarea
                  id="additional"
                  placeholder="e.g., I enjoy volunteering, I have work experience in retail..."
                  value={data.additionalInfo}
                  onChange={(e) => setData({ ...data, additionalInfo: e.target.value })}
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-end mt-6">
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            size="lg"
            className="px-8"
          >
            {step === steps.length - 1 ? "Get Recommendations" : "Continue"}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentFlow;
