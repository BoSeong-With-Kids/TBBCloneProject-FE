import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { all } from "axios"
import { async } from "q"
import { instanceAxios } from "../../api/axiosAPI"

const initialState = {
  contents: [],
  isLoading: false,
  error: null,
  cate : "all",
  filt : "latest"
}

export const __getcontents = createAsyncThunk(
  "contents/get",
  async (payload, thunkAPI) => {
    try {
      const {cate, filt } = payload
      const data = await instanceAxios.get(`/project/list?filter=${filt}&category=${cate}`)
      console.log(data.data.data)
      return thunkAPI.fulfillWithValue(data.data.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const __setHeart = createAsyncThunk(
  "contents/heart",
  async(payload, thunkAPI) =>{
    try{
      const data = await instanceAxios.post(`/project/like/${payload}`)
      console.log(data)
      return thunkAPI.fulfillWithValue("success")
    }catch (error){
      return thunkAPI.rejectWithValue(error)
    }
  }
)


export const contentsSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {
    // addContent: (state, action) => {
    //   axios.post(`${DB}/contents`, action.payload)
    // },
    setCategory:(state,action) =>{
      state.cate = action.payload
    },
    setFilter:(state,action) =>{
      state.filt = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getcontents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(__getcontents.fulfilled, (state, action) => {
        state.isLoading = false
        state.contents = action.payload
      })
      .addCase(__getcontents.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { setCategory, setFilter } = contentsSlice.actions
export default contentsSlice.reducer
