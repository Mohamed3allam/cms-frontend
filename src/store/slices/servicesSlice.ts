import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/axiosInstance";
import { Service } from "@/types/service";

interface MetaData {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export const fetchServices = createAsyncThunk(
  "hero/fetchServices",
  async ({
    page = 1,
    limit = 10,
    searchQuery,
    locale = "en",
  }: {
    page: number;
    limit: number;
    searchQuery?: string;
    locale: string;
  }) => {
    const params: Record<string, any> = {
      locale,
      "pagination[page]": page,
      "pagination[pageSize]": limit,
      "populate[0]": "team_members",
      "populate[1]": "team_members.avatar",
    };

    if (searchQuery && searchQuery.trim() !== "") {
      params["filters[$or][0][title][$contains]"] = searchQuery;
      params["filters[$or][1][description][$contains]"] = searchQuery;
    }

    const strapiImageUrl =
      process.env.NEXT_PUBLIC_MAIN_URL || "http://localhost:1337";

    const { data } = await api.get("/services", { params });

    const processedData = {
      ...data,
      data: data.data.map((item: any) => {
        return {
          ...item,
          team_members: item.team_members.map((member: any) => {
            if (member.avatar?.url) {
              member.avatar = strapiImageUrl + member.avatar.url;
            }
            return member;
          }),
        };
      }),
    };
    return processedData;
  }
);

export const fetchSingleService = createAsyncThunk(
  "hero/fetchSingleService",
  async ({ slug, locale = "en" }: { slug: string; locale?: string }) => {
    const params = {
      locale,
      "populate[0]": "team_members",
      "populate[1]": "team_members.avatar",
    };

    const { data } = await api.get(`/services`, {
      params: {
        ...params,
        "filters[slug][$eq]": slug,
      },
    });

    const strapiImageUrl =
      process.env.NEXT_PUBLIC_MAIN_URL || "http://localhost:1337";

    const firstItem = {
      ...data.data[0],
      team_members: data.data[0].team_members.map((member: any) => {
        if (member.avatar?.url) {
          member.avatar = strapiImageUrl + member.avatar.url;
        }
        return member;
      }),
    };

    return firstItem;
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    services: [] as Service[],
    metadata: {} as MetaData,
    singleService: null as Service | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
    },
    clearSingleService: (state) => {
      state.singleService = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.data;
        state.metadata = action.payload.meta.pagination;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load services";
      })

      .addCase(fetchSingleService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleService.fulfilled, (state, action) => {
        state.loading = false;
        state.singleService = action.payload || null;
      })
      .addCase(fetchSingleService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load service";
      });
  },
});

export const { setServices, clearSingleService } = serviceSlice.actions;
export default serviceSlice.reducer;
