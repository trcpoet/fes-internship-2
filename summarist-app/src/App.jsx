// App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ForYou from "./pages/ForYou";
import BookDetail from "./pages/BookDetail";
import Player from "./pages/Player";
import ChoosePlan from "./pages/ChoosePlan";
import Settings from "./pages/Settings";
import AppLayout from "./layouts/AppLayout";
import Library from "./pages/Library";
// import Search from "./pages/Search";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Everything inside here shows Sidebar + SearchBar */}
      <Route element={<AppLayout />}>
        <Route path="/for-you" element={<ForYou />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/choose-plan" element={<ChoosePlan />} />
        <Route path="/settings" element={<Settings />} />

        {/* Add these if you plan to navigate to them */}
        <Route path="/library" element={<Library />} />
        {/* <Route path="/search" element={<Search />} /> */}
      </Route>
    </Routes>
  );
}
