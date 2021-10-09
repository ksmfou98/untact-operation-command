import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import recoilInitializer from "atoms/recoilInitializer";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

// initializeState : 초기 상태 설정
ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot initializeState={recoilInitializer}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,

  document.getElementById("root")
);
