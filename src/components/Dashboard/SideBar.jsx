// "use client";
// import axios from "axios";
// import { Sidebar } from "flowbite-react";
// import { BiBuoy } from "react-icons/bi";
// import {
//   HiArrowSmRight,
//   HiChartPie,
//   HiInbox,
//   HiOutlineCloudUpload,
//   HiShoppingBag,
//   HiTable,
//   HiUser,
//   HiViewBoards,
// } from "react-icons/hi";
// import { useNavigate } from "react-router-dom";

// const AdminSidebar = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post("http://localhost:3001/user/auth/logout");
//       localStorage.removeItem("user");
//       navigate("/");
//       return true;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   };

//   const handleNavigateToUpload = () => {
//     navigate("/admin/dashboard/upload");
//   };

//   return (
//     <div className="h-screen bg-gray-800 text-white">
//       <Sidebar aria-label="Admin Sidebar" className="h-full">
//         <Sidebar.Items>
//           <Sidebar.ItemGroup>
//             <Sidebar.Item
//               onClick={handleNavigateToUpload}
//               icon={HiChartPie}
//               className="hover:bg-gray-700 hover:text-white transition-colors duration-200 cursor-pointer"
//             >
//               Dashboard
//             </Sidebar.Item>
//             <Sidebar.Item
//               href="http://localhost:5173/admin/dashboard/upload"
//               icon={HiOutlineCloudUpload}
//               className="hover:bg-gray-700 hover:text-white transition-colors duration-200"
//             >
//               Upload Turf
//             </Sidebar.Item>
//             <Sidebar.Item
//               href="http://localhost:5173/admin/dashboard/manage"
//               icon={HiInbox}
//               className="hover:bg-gray-700 hover:text-white transition-colors duration-200"
//             >
//               Manage Turfs
//             </Sidebar.Item>
//             <Sidebar.Item
//               href="#"
//               icon={HiUser}
//               className="hover:bg-gray-700 hover:text-white transition-colors duration-200"
//             >
//               Users
//             </Sidebar.Item>
//             <Sidebar.Item
//               icon={HiTable}
//               onClick={handleLogout}
//               className="hover:bg-gray-700 hover:text-white transition-colors duration-200"
//             >
//               Sign Out
//             </Sidebar.Item>
//           </Sidebar.ItemGroup>
//         </Sidebar.Items>
//       </Sidebar>
//     </div>
//   );
// };

// export default AdminSidebar;


// AdminSidebar.jsx
"use client";
import axios from "axios";
import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineCloudUpload,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/user/auth/logout");
      localStorage.removeItem("user");
      navigate("/");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleNavigateToUpload = () => {
    navigate("/admin/dashboard/upload");
  };

  return (
    <Sidebar aria-label="Admin Sidebar">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            onClick={handleNavigateToUpload}
            icon={HiChartPie}
            className="hover:bg-gray-700 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item
            href="http://localhost:5173/admin/dashboard/upload"
            icon={HiOutlineCloudUpload}
            className="hover:bg-gray-700 hover:text-white transition-colors duration-200"
          >
            Upload Turf
          </Sidebar.Item>
          <Sidebar.Item
            href="http://localhost:5173/admin/dashboard/manage"
            icon={HiInbox}
            className="hover:bg-gray-700 hover:text-white transition-colors duration-200"
          >
            Manage Turfs
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiUser}
            className="hover:bg-gray-700 hover:text-white transition-colors duration-200"
          >
            Users
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiTable}
            onClick={handleLogout}
            className="hover:bg-gray-700 hover:text-white transition-colors duration-200"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default AdminSidebar;
