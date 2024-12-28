import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ForumPage from "./pages/ForumPage";
import DiscussionPage from "./pages/DiscussionPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<DashboardPage />} />
        <Route path="/forum/:id" element={<ForumPage />} />
        <Route path="/forum/:id/:postId" element={<DiscussionPage />} />
      </Routes>
    </Router>
  );
};

export default App;
