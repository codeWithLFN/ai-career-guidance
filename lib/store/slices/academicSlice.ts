import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AcademicRecordState {
  academicRecord: {};
}

const initialState: AcademicRecordState = { academicRecord: {} };

const accademicRecordSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addAccademicRecord: (state, action: PayloadAction<any[]>) => {
      state.academicRecord = action.payload
    },
    clearAccademicRecord: (state) => {
      state.academicRecord ={}
    },
  },
});

export const { addAccademicRecord, clearAccademicRecord } = accademicRecordSlice.actions;
export default accademicRecordSlice.reducer;
