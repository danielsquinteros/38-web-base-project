import { Routes, Route } from "react-router";
import App from "../App";
import Issues from "../components/Issues";

const ConfigRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/issues" element={<Issues />} />
      </Routes>
    </>
  )
}

export default ConfigRoutes