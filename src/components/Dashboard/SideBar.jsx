'use client';
import axios from 'axios'; // Import axios
import { Sidebar } from 'flowbite-react';
import { BiBuoy } from 'react-icons/bi';
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineCloudUpload,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate(); // move useNavigate inside the function

  const handleLogout = async () => {
    try {
      const res = await axios.post('http://localhost:3001/user/auth/logout');
      localStorage.removeItem('user');
      navigate('/'); // use navigate here
      return true; // return true if logout is successful
    } catch (error) {
      console.log(error);
      return false; // return false if logout fails
    }
  };

  return (
    <Sidebar
      aria-label="Sidebar with content separator example"
      className="sidebar"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="http://localhost:5173/admin/dashboard"
            icon={HiChartPie}
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item
            href="http://localhost:5173/admin/dashboard/upload"
            icon={HiOutlineCloudUpload}
          >
            Upload Truf
          </Sidebar.Item>
          <Sidebar.Item
            href="http://localhost:5173/admin/dashboard/manage"
            icon={HiInbox}
          >
            Manage Turfs
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="/login" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item icon={HiTable} onClick={handleLogout}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Upgrade to Pro
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Documentation
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={BiBuoy}>
            Help
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default AdminSidebar;
