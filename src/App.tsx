import React from "react";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ThemeProvider } from "@mui/material";
import { CandidateReviewTool } from "./pages/CandidateReviewTool/CandidateReviewTool";
import { theme } from "./theme";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity, cacheTime: Infinity } },
  });

  const persister = createSyncStoragePersister({
    storage: window.localStorage,
  });

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <ThemeProvider theme={theme}>
        <div style={{ textAlign: "center" }}>
          <CandidateReviewTool />
        </div>
      </ThemeProvider>
    </PersistQueryClientProvider>
  );
};

export default App;
