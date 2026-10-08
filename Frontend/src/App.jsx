import {BrowserRouter, Routes,Route} from "react-router-dom";
import Login from "./Pages/Login";
import Chat from "./Pages/Chat";
import Register from "./Pages/Register";
import ProtectedRoute from "./component/ProtectedRoutes";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/chat" element={
        <ProtectedRoute>
          <Chat/>
        </ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
