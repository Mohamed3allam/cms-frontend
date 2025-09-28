import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/axiosInstance";
import { Client } from "@/types/client";

export const fetchClients = createAsyncThunk(
  "hero/fetchClients",
  async ({ locale = "en" }: { locale: string }) => {
    const { data } = await api.get("/clients", {
      params: {
        "populate[0]": "logo",
        locale,
      },
    });
    const strapiImageUrl =
      process.env.NEXT_PUBLIC_MAIN_URL || "http://localhost:1337";

    const processedData = data.data.map((item: Client) => {
      if (typeof item.logo !== "string" && item.logo?.url) {
        item.logo = strapiImageUrl + item.logo.url;
      }
      return item;
    });

    return processedData;
  }
);

const clientsSlice = createSlice({
  name: "client",
  initialState: {
    clients: [] as Client[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load hero slides";
      });
  },
});

export const { setClients } = clientsSlice.actions;

export default clientsSlice.reducer;
