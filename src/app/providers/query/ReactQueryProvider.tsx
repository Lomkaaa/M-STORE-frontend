import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

type ReactQueryProviderProps = {
  children: ReactNode;
};

export const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
