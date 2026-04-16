import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Landing from "@/pages/Landing";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(10,10,10,0.9)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#fff",
            backdropFilter: "blur(20px)",
          },
        }}
      />
    </div>
  );
}

export default App;
