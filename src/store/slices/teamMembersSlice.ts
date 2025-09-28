import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/axiosInstance";
import { TeamMember } from "@/types/teamMember";

interface MetaData {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
export const fetchTeamMembers = createAsyncThunk(
  "hero/fetchTeamMembers",
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
      "pagination[page]": page,
      "pagination[pageSize]": limit,
      "populate[0]": "avatar",
      "populate[1]": "services",
      locale,
    };

    if (searchQuery && searchQuery.trim() !== "") {
      params["filters[$or][0][name][$contains]"] = searchQuery;
      params["filters[$or][1][role][$contains]"] = searchQuery;
    }

    const { data } = await api.get("/team-members", { params });

    const processedData = {
      ...data,
      data: data.data.map((item: any) => {
        if (item.avatar?.url) {
          item.avatar = item.avatar.url;
        }
        return item;
      }),
    };

    return processedData;
  }
);

const teamMemberSlice = createSlice({
  name: "teamMember",
  initialState: {
    teamMembers: [] as TeamMember[],
    metadata: {} as MetaData,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setTeamMembers: (state, action) => {
      state.teamMembers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.teamMembers = action.payload.data;
        state.metadata = action.payload.meta.pagination;
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load hero slides";
      });
  },
});

export const { setTeamMembers } = teamMemberSlice.actions;

export default teamMemberSlice.reducer;
