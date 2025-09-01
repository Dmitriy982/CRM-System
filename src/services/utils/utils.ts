import type { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit'
import { memoize } from 'lodash'

export interface AsyncParticle<T = unknown> {
  data: T | null
  error?: ErrorData | null | string
  errorCounter: number
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

export interface ErrorData {
  message: string
  code?: number
}

export interface ServerError {
  message: string
  code?: number
  status?: number
}

export type TSliceMethod<RQ, RS> = AsyncThunk<
  RS,
  RQ,
  {
    rejectValue: ErrorData
  }
>

export const initAsyncParticle = <T extends unknown>(
  data: T | null = null
): AsyncParticle<T> => ({
  data,
  error: null,
  errorCounter: 0,
  status: 'idle',
})

export const addAsyncBuilderCases = <TState, RQ, RS>(
  builder: ActionReducerMapBuilder<TState>,
  sliceMethod: AsyncThunk<RS, RQ, { rejectValue: ErrorData }>,
  key: keyof TState
) => {
  builder.addCase(sliceMethod.pending, (state) => {
    const draft = state as Record<keyof TState, AsyncParticle>
    draft[key].status = 'pending'
  })

  builder.addCase(sliceMethod.fulfilled, (state, action) => {
    const draft = state as Record<keyof TState, AsyncParticle>
    draft[key].status = 'fulfilled'
    draft[key].error = null
    draft[key].errorCounter = 0
    draft[key].data = action.payload
  })

  builder.addCase(sliceMethod.rejected, (state, action) => {
    const draft = state as Record<keyof TState, AsyncParticle>
    draft[key].data = action.payload
    draft[key].error = action.payload
    draft[key].errorCounter = (draft[key].errorCounter || 0) + 1
    draft[key].status = 'rejected'
  })
}

export interface AsyncDataStatus {
  hasError: boolean
  isIdle: boolean
  isLoading: boolean
  isLoadingOrIdle: boolean
  isLoaded: boolean
  isLoadedOrError: boolean
}

export const getAsyncDataStatus = memoize(
  (data: AsyncParticle<unknown>): AsyncDataStatus => ({
    hasError: data?.status === 'rejected',
    isIdle: data?.status === 'idle',
    isLoading: data?.status === 'pending',
    isLoadingOrIdle: data?.status === 'pending' || data?.status === 'idle',
    isLoaded: data?.status === 'fulfilled',
    isLoadedOrError:
      data?.status === 'fulfilled' || data?.status === 'rejected',
  })
)

export const getAsyncRequestData = memoize(
  <T>(stateParam: AsyncParticle<T>) => ({
    data: stateParam?.data,
    error: stateParam?.error,
    errorCounter: stateParam?.errorCounter,
    status: getAsyncDataStatus(stateParam),
  })
)
