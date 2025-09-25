import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const weatherThunk = createAsyncThunk(
  "weatherApi/feachWeather",
  async (city) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=04374ea58cb016636e95a96fe2fa5fb7&units=metric`
    );

    // handle success
    const responseTemp = Math.round(response.data.main.temp);
    const responseDescription = response.data.weather[0].description;
    const responseMinTemp = Math.round(response.data.main.temp_min);
    const responseMaxTemp = Math.round(response.data.main.temp_max);
    const responseIcon = response.data.weather[0].icon;

    return {
      temp:responseTemp,
      description:responseDescription,
      minTemp:responseMinTemp,
      maxTemp:responseMaxTemp,
      icon:responseIcon,
    };
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    result: "empty",
   weather: { temp: null, description: "", minTemp: null, maxTemp: null, icon: "" },
    isLoading: false,
    city:"palestine"
  },
  reducers: {
    handleResult: (state) => {
      state.result = "changed";
    },
    changeCity:(state,action)=>{
        state.city=action.payload.city;

    }
  },
  //handle the thunk function respone
   extraReducers(builder){
    builder.addCase(weatherThunk.pending,(state,action)=>{
        state.isLoading=true;
    }).addCase(weatherThunk.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.weather=action.payload;
    }).addCase(weatherThunk.rejected,(state,action)=>{
        state.isLoading=false;
    })
}
});

export default weatherSlice.reducer;
export const { handleResult,changeCity } = weatherSlice.actions;
