"use client";

import { appStore, createStore, PreloadedState } from "@/src/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

export default function Providers({
  children,
  preloadState,
}: {
  children: ReactNode;
  preloadState: PreloadedState;
}) {
  const myClient = new QueryClient();

  // const myStore = createStore(preloadState);

  const storeRef = useRef<null | appStore>(null);

  if (storeRef.current == null) {
    storeRef.current = createStore(preloadState);
  }

  return (
    <>
      <Provider store={storeRef.current}>
        <QueryClientProvider client={myClient}>
          {children}
          <Toaster richColors position="top-right" />
          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </QueryClientProvider>
      </Provider>
    </>
  );
}
