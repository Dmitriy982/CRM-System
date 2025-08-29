import type { ActionReducerMapBuilder, AsyncThunk, Draft } from '@reduxjs/toolkit';
import { memoize } from 'lodash';

export interface IAsyncParticle<T = unknown> {
  data: T | null;
  error?: IErrorData | null | string;
  errorCounter: number;
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

export interface IErrorData {
  message: string;
  code?: number;
}

export interface IServerError {
  message: string;
  code?: number;
  status?: number;
}

export type TSliceMethod<RQ, RS> = AsyncThunk<
  RS,
  RQ,
  {
    rejectValue: IErrorData;
  }
>;

export const initAsyncParticle = <T extends unknown>(data: T | null = null): IAsyncParticle<T> => ({
  data,
  error: null,
  errorCounter: 0,
  status: 'idle'
});

export const addAsyncBuilderCases = <TState, RQ, RS>(
  builder: ActionReducerMapBuilder<TState>,
  sliceMethod: AsyncThunk<RS, RQ, { rejectValue: IErrorData }>,
  key: keyof TState
) => {
  builder.addCase(sliceMethod.pending, (state) => {
    const draft = state as Record<keyof TState, IAsyncParticle>;
    draft[key].status = 'pending';
  });
  
  builder.addCase(sliceMethod.fulfilled, (state, action) => {
    const draft = state as Record<keyof TState, IAsyncParticle>;
    draft[key].status = 'fulfilled';
    draft[key].error = null;
    draft[key].errorCounter = 0;
    draft[key].data = action.payload;
  });
  
  builder.addCase(sliceMethod.rejected, (state, action) => {
    const draft = state as Record<keyof TState, IAsyncParticle>;
    draft[key].data = action.payload;
    draft[key].error = action.payload;
    draft[key].errorCounter = (draft[key].errorCounter || 0) + 1;
    draft[key].status = 'rejected';
  });
};

export interface IAsyncDataStatus {
  hasError: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isLoadingOrIdle: boolean;
  isLoaded: boolean;
  isLoadedOrError: boolean;
}

export const getAsyncDataStatus = memoize((data: IAsyncParticle<unknown>): IAsyncDataStatus => ({
  hasError: data?.status === 'rejected',
  isIdle: data?.status === 'idle',
  isLoading: data?.status === 'pending',
  isLoadingOrIdle: data?.status === 'pending' || data?.status === 'idle',
  isLoaded: data?.status === 'fulfilled',
  isLoadedOrError: data?.status === 'fulfilled' || data?.status === 'rejected'
}));

export const getAsyncRequestData = memoize(
  <T>(stateParam: IAsyncParticle<T>) => ({
    data: stateParam?.data,
    error: stateParam?.error,
    errorCounter: stateParam?.errorCounter,
    status: getAsyncDataStatus(stateParam)
  })
);