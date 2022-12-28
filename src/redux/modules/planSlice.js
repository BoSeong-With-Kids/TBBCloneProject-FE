import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { instanceAxios } from "../../api/axiosAPI"

const initialState = {
  plan : {
    title: "",
    category :"",
    summary: "",
    goalPrice: 0,
    startDate: "",
    endDate: "",
    imageList: [],
    delList: [],
    content : "",
  }
}

export const __addPlan = createAsyncThunk(
  "plan/post",
  async (payload, thunkAPI) => {
    try {
      console.log(payload)
      await instanceAxios.post('project',payload)
      return thunkAPI.fulfillWithValue("")
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlan: (state, action) => {
      const value = action.payload;
      state.plan = {...state.plan, ...value}
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(__getcontents.pending, (state) => {
  //       state.isLoading = true
  //     })
  //     .addCase(__getcontents.fulfilled, (state, action) => {
  //       state.isLoading = false
  //       state.contents = action.payload
  //     })
  //     .addCase(__getcontents.rejected, (state, action) => {
  //       state.isLoading = false
  //       state.error = action.payload
  //     })
  // },
})

export const { setPlan } = planSlice.actions
export default planSlice.reducer
