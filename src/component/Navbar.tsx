import React from "react";
import { Navbar, Select } from "flowbite-react";
import { MdAccessTimeFilled, MdDoNotDisturbOn } from "react-icons/md";

export function NavBar({ status, onStatusChange }) {
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
    <Navbar
      fluid
      rounded
      className="md:hidden fixed top-0 left-0 right-0 z-50"
      style={{ zIndex: 1000 }}
    >
      <Navbar.Brand href="https://flowbite-react.com">
        <img alt="" src="./src/assets/Momentum-Logo.png" className="h-10" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"></span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <h2 className="uppercase text-sm font-semibold px-2 py-2 bg-[#E5E8EA]">
          Profile
        </h2>
        <div className="p-2 flex flex-col gap-4">
          <span className="flex flex-row gap-2">
            <h4>James Yoo</h4>
            {getStatusIcon()}
          </span>
          <h4>james.yoo@example.com</h4>
          <h3>Engineer</h3>
          <Select onChange={onStatusChange} value={status} className="w-full">
            <option value="Online">Online</option>
            <option value="Away">Away</option>
            <option value="Busy">Busy</option>
          </Select>
        </div>

        <h2 className="uppercase text-sm font-semibold px-2 py-2 bg-[#E5E8EA]">
          Dashboard
        </h2>
        <Navbar.Link href="#">Role Management</Navbar.Link>
        <Navbar.Link href="#">Acess Control</Navbar.Link>
        <Navbar.Link href="#">Event Log</Navbar.Link>
        <h2 className="uppercase text-sm font-semibold px-2 py-2 bg-[#E5E8EA]">
          Setting
        </h2>
        <Navbar.Link href="#">Profile</Navbar.Link>
        <Navbar.Link href="#">Sign Out</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
