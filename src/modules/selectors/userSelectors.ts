import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../modules/store/store';
import { getAsyncRequestData } from '../../core/utils';

export const selectUserStore = (state: RootState) => state.userReducer;

export const selectUser = createSelector(selectUserStore, (state) => getAsyncRequestData(state.user));
export const selectRegister = createSelector(selectUserStore, (state) => getAsyncRequestData(state.register));
export const selectLogin = createSelector(selectUserStore, (state) => getAsyncRequestData(state.login));
export const selectCheckAuth = createSelector(selectUserStore, (state) => getAsyncRequestData(state.checkAuth));
export const selectLogout = createSelector(selectUserStore, (state) => getAsyncRequestData(state.logout));

