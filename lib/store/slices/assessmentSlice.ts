import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AssessmentState {
    subjects: any[];
    skills: any[];
    interests: any[];
    personality: any[];
}

const initialState: AssessmentState = {
    subjects: [],
    skills: [],
    interests: [],
    personality: []
};

const assessmentSlice = createSlice({
    name: "assessment",
    initialState,
    reducers: {
        addSubjects: (state, action: PayloadAction<any[]>) => {
            state.subjects = action.payload
        },
         addSkills: (state, action: PayloadAction<any[]>) => {
            state.skills = action.payload
        },
         addInterests: (state, action: PayloadAction<any[]>) => {
            state.interests = action.payload
        },
         addPersonality: (state, action: PayloadAction<any[]>) => {
            state.personality = action.payload
        },
        clearAssessment: (state) => {
            state.subjects = []
            state.skills =[]
            state.interests =[]
            state.personality=[]
        },
    },
});

export const { addInterests, addSkills, addSubjects, addPersonality, clearAssessment } = assessmentSlice.actions;
export default assessmentSlice.reducer;
