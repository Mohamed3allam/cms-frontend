import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/axiosInstance";
import { Settings } from "@/types/settings";

export const fetchSettings = createAsyncThunk(
  "hero/fetchSettings",
  async ({ locale = "en" }: { locale: string }) => {
    const { data } = await api.get("/settings", {
      params: {
        "populate[0]": "logo",
        locale,
      },
    });

    const processedData = {
      ...data.data[0],
      logo: data.data[0].logo.url,
    };

    return processedData;
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    settings: {} as Settings,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load hero slides";
      });
  },
});

export const { setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
