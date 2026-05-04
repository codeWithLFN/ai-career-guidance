import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RecommendationState {
    recommendations: any;
}

const initialState: RecommendationState = {
    recommendations: {},
};

const recommendationSlice = createSlice({
    name: "assessment",
    initialState,
    reducers: {
        addRecommendations: (state, action: PayloadAction<any[]>) => {
            state.recommendations = action.payload
        },
        clearRecommendations: (state) => {
            state.recommendations = []
        },
    },
});

export const { addRecommendations, clearRecommendations } = recommendationSlice.actions;
export default recommendationSlice.reducer;
