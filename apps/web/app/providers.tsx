'use client';

import { Provider } from 'react-redux';
import { store } from '../features/store';
import { useEffect } from 'react';
import { getUserProfile, initialize } from '../features/authSlice';
import { Toaster } from 'sonner';

function InitAuth() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('InitAuth: token in localStorage:', !!token);

    if (token) {
      console.log('InitAuth: dispatching getUserProfile');
      store.dispatch(getUserProfile());
    } else {
      console.log('InitAuth: no token, marking as initialized');
      // If no token, mark as initialized
      store.dispatch(initialize());
    }
  }, []);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InitAuth />
      <Toaster position="top-right" />
      {children}
    </Provider>
  );
}