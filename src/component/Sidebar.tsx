import React from "react";
import { Sidebar, Select, Dropdown } from "flowbite-react";
import { MdAccessTimeFilled, MdDoNotDisturbOn } from "react-icons/md";

export const SidebarComponent = ({ status, onStatusChange }) => {
  const getStatusIcon = () => {
    switch (status) {
      case "Online":
        return (
          <span className="flex w-[13.33px] h-[13.33px] rounded-full bg-[#10B981]"></span>
        );
      case "Away":
        return <MdAccessTimeFilled className="text-yellow-500" />;
      case "Busy":
        return <MdDoNotDisturbOn className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <Sidebar
        className="h-screen hidden md:block md:w-[21rem] w-screen bg-[#D9DCDF]"
        aria-label="Sidebar"
      >
        <Sidebar.Logo
          className=""
          href="#"
          img="./src/assets/Momentum-Logo.png"
          imgAlt="Momentum Enerergy Logo"
        ></Sidebar.Logo>
        <Sidebar.Items className="md:flex flex-col justify-between h-[85vh]">
          <div>
            <Sidebar.ItemGroup>
              <div className="pt-2">
                <h1 className="text-sm font-semibold text-[#4D5D69] px-3 uppercase">
                  Profile
                </h1>
              </div>
              <div className="px-2">
                <span className="flex">
                  <h2 className="text-base px-3">James Yoo</h2>
                  {getStatusIcon()}
                </span>

                <h3 className="text-sm px-3">james.yoo@example.com</h3>
                <h3 className="text-sm px-3 pt-3 capitalize">engineer</h3>
              </div>
              <div className="p-2">
                <Select
                  onChange={onStatusChange}
                  value={status}
                  className="w-full"
                >
                  <option value="Online">Online</option>
                  <option value="Away">Away</option>
                  <option value="Busy">Busy</option>
                </Select>
              </div>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <div className="pt-2">
                <h1 className="text-sm font-semibold text-[#4D5D69] px-3 uppercase">
                  Dashboard
                </h1>
              </div>
              <Sidebar.Item href="#">Role Management</Sidebar.Item>
              <Sidebar.Item href="#">Groups</Sidebar.Item>
              <Sidebar.Item href="#">Access Control</Sidebar.Item>
              <Sidebar.Item href="#">Event Log</Sidebar.Item>
            </Sidebar.ItemGroup>
          </div>
          <Sidebar.ItemGroup>
            <div className="pt-2">
              <h1 className="text-sm font-semibold text-[#4D5D69] px-3 uppercase">
                Setting
              </h1>
            </div>
            <Sidebar.Item href="#">Profile</Sidebar.Item>
            <Sidebar.Item href="#">Sign Out</Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </React.Fragment>
  );
};
