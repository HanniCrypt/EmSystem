import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./layout/AdminLayout";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import EmployeeLayout from "./layout/EmployeeLayout";
import EmployeeHome from "./pages/EmployeeHome";
import EmployeeProfile from "./pages/EmployeeProfile";
import AdminProfile from "./pages/AdminProfile";
import AdminNewUser from "./pages/AdminNewUser";
import HRLayout from "./layout/HRLayout";
import NotFound from "./pages/NotFound";
import AdminLogs from "./pages/AdminLogs";
import AdminEmployeeList from "./pages/AdminEmployeeList";
import HREmployeesList from "./pages/HREmployeesList";
import HRProfile from "./pages/HRProfile";
import HRAddEmployee from "./pages/HRAddEmloyee";
import AdminAllUsersList from "./pages/AdminAllUsers";

function App() {
  return (
    <Router>
      <Routes>

        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/employees" element={<AdminEmployeeList />} />
            <Route path="/admin/users" element={<AdminAllUsersList />} />
            {/* <Route path="/admin/departments" element={<Department />} /> */}
            <Route path="/admin/add-employee" element={<AddEmployee />} />
            <Route path="/admin/add-user" element={<AdminNewUser />} />
            <Route path="/admin/edit-employee/:id" element={<EditEmployee />} />
            <Route path="/admin/logs" element={<AdminLogs />} />
          </Route>
   
          <Route element={<EmployeeLayout />}>
            <Route path="/employee/home" element={<EmployeeHome />} />  
            <Route path="/employee/profile" element={<EmployeeProfile />} />
          </Route>

          <Route element={<HRLayout />}>
            <Route path="/hr/employees" element={<HREmployeesList />} />
            <Route path="/hr/profile" element={<HRProfile />} />
            <Route path="/hr/add-employee" element={<HRAddEmployee />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />}/>
      </Routes>
    </Router>
  );
}

export default App;
