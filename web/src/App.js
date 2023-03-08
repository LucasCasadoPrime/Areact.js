import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './templates/Signin/Signin';
import SignUp from './templates/Signup/Signup';
import Workflowscreen from './templates/Workflowscreen/Workflowscreen';
import Workflowdetails from './templates/Workflowdetails/Workflowdetails';
import HomeScreen from './templates/Homescreen/Homescreen';
import Addarea from "./templates/Addarea/Addarea";
import Editworkflow from "./templates/Editworkflow/Editworkflow";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/workflows" element={<Workflowscreen />} />
        <Route path="/workflow/:id" element={<Workflowdetails />} />
        <Route path="/addWorkflow" element={<Addarea />} />
        <Route path="/editWorkflow/:id" element={<Editworkflow />} />
        <Route path="*">
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
