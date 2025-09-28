import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/axiosInstance";
import { HeroSlide } from "@/types/hero";
import { RootState } from "..";

export const fetchHeroes = createAsyncThunk(
  "hero/fetchHeroes",
  async ({ locale }: { locale: string }) => {
    const { data } = await api.get("/hero-slides", {
      params: {
        "populate[0]": "background",
        "populate[1]": "image",
        locale,
      },
    });
    console.log("hero-data", data);

    const processedData = data.data.map((item: HeroSlide) => {
      if (typeof item.image !== "string" && item.image?.url) {
        item.image = item.image.url;
      }
      if (typeof item.background !== "string" && item.background?.url) {
        item.background = item.background.url;
      }
      return item;
    });

    return processedData;
  }
);

const heroSlice = createSlice({
  name: "hero",
  initialState: {
    heroSlides: [] as HeroSlide[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setHeros: (state, action) => {
      state.heroSlides = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.loading = false;
        state.heroSlides = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load hero slides";
      });
  },
});

export const { setHeros } = heroSlice.actions;

export default heroSlice.reducer;
