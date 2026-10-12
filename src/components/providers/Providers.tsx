"use client";

import { appStore, createStore, PreloadedState } from "@/src/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

export default function Providers({
  children,
  preloadState,
}: {
  children: ReactNode;
  preloadState: PreloadedState;
}) {
  const [store] = useState<appStore>(() => createStore(preloadState));

  const [myClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={myClient}>
        {children}
        <Toaster richColors position="top-right" />
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      </QueryClientProvider>
    </Provider>
  );
}