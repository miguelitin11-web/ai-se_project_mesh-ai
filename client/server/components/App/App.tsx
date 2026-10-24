import "./App.css"
import KnowledgeBase from "../../pages/KnowledgeBase/KnowledgeBase";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../AppLayout/AppLayout";
import Intro from "../../pages/Intro/Intro";
import Chat from "../../pages/Chat/Chat";

function App() {
  return (
    <div className="app">
     <Routes>
     <Route path="/" element={<Intro />}></Route>
     <Route element={<AppLayout />}>
       <Route path="/knowledge" element={<KnowledgeBase />}></Route>
       <Route path="/chat" element={<Chat/>}></Route>
     </Route>
   </Routes>
    </div>
  );
}

export default App;

