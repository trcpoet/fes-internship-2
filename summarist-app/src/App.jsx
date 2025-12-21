import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ForYou from "./pages/ForYou";
import BookDetail from "./pages/BookDetail";
import Player from "./pages/Player";
import ChoosePlan from "./pages/ChoosePlan";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/for-you" element={<ForYou />} />
      <Route path="/book/:id" element={<BookDetail />} />
      <Route path="/player/:id" element={<Player />} />
      <Route path="/choose-plan" element={<ChoosePlan />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
