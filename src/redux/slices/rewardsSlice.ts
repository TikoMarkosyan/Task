import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import apiClient from "src/api/apiClient";
import { IRewardResponse } from "src/models/response/IRewardResponse";
import { PaginationRequest } from "src/models/request/IPaginationRequest";
import { PaginatedResponse } from "src/models/response/IPaginatedResponse";
import { ToastType } from "src/utils/constants";
import { showToast } from "src/components/ui/toast";

const rewardsAdapter = createEntityAdapter<IRewardResponse>();

const initialState = rewardsAdapter.getInitialState({
  loading: false,
  hasError: false,
  collectedIds: [] as string[],
  currentPage: 1,
});

const rewardsSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    COLLECT_REWARD: (state, action: PayloadAction<string>) => {
      if (!state.collectedIds.includes(action.payload)) {
        state.collectedIds.push(action.payload);
      }
    },
    fetchStarted: state => {
      state.loading = true;
      state.hasError = false;
    },
    fetchFailed: state => {
      state.loading = false;
      state.hasError = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRewards.pending, state => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(fetchRewards.fulfilled, (state, action) => {
        state.loading = false;
        const { results, page } = action.payload;

        if (page === 1) {
          rewardsAdapter.setAll(state, results);
        } else {
          rewardsAdapter.addMany(state, results);
        }
        state.currentPage = page;
      })
      .addCase(fetchRewards.rejected, (state, action) => {
        state.loading = false;
        state.hasError = true;
        showToast({
          type: ToastType.Error,
          title: "Error",
          message: action.payload as string,
        });
      });
  },
});

export const rewardsActions = rewardsSlice.actions;

export const fetchRewards = createAsyncThunk(
  "rewards/fetch",
  async (params: PaginationRequest, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get<PaginatedResponse<IRewardResponse>>(
        "/v1/clients/5189/bounties/",
        { params },
      );
      return { ...data, page: params.page };
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch rewards";
        
      return rejectWithValue(message);
    }
  },
);

export const { COLLECT_REWARD } = rewardsSlice.actions;
export const rewardsAdapterSelectors = rewardsAdapter.getSelectors();

export default rewardsSlice.reducer;
