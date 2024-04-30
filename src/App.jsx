import React from "react";
import {
  Table,
  TextInput,
  Badge,
  Select,
  Label,
  Pagination,
  Dropdown,
} from "flowbite-react";
import { NavBar } from "./component/Navbar";
import { SidebarComponent } from "./component/Sidebar";
import {
  MdGroups2,
  MdComputer,
  MdDeleteForever,
  MdAdd,
  MdOutlineRefresh,
} from "react-icons/md";
import { AiOutlineUserDelete } from "react-icons/ai";

const App = () => {
  const [users, setUsers] = React.useState([]);
  const [sortBy, setSortBy] = React.useState("_id");
  const [sortOrder, setSortOrder] = React.useState("asc");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [status, setStatus] = React.useState("Online");

  const itemsPerPage = 10;

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const fetchData = () => {
    fetch("./user.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(users);
        setUsers(data.users);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleSort = (sortByField) => {
    if (sortByField === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sortByField);
      // Set initial sort order to "desc" if sorting by "name"
      setSortOrder(sortByField === "name" ? "desc" : "asc");
    }
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedRole || user.role === selectedRole)
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortBy === "_id") {
      return sortOrder === "asc"
        ? parseInt(a._id) - parseInt(b._id)
        : parseInt(b._id) - parseInt(a._id);
    } else if (sortBy === "name") {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <main className="flex flex-col md:flex-row">
      <NavBar status={status} onStatusChange={handleStatusChange} />
      <SidebarComponent status={status} onStatusChange={handleStatusChange} />

      <section className="container mx-auto px-4 py-16">
        <div className="w-full flex flex-col gap-4 px-4">
          <h1 className="text-2xl font-bold">Manage Users</h1>
          <div>
            <TextInput
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              id="email"
              type="email"
              placeholder="Search by name or email"
              className="rounded-none w-full md:w-1/2"
            />
          </div>

          <div>
            <Label htmlFor="role">Filter by role</Label>
            <Select
              onChange={handleRoleChange}
              value={selectedRole}
              className="w-full md:w-1/2"
            >
              <option value="" defaultValue={true}>
                None
              </option>
              <option value="admin">Admin</option>
              <option value="electrical engineer">Electrical Engineer</option>
              <option value="technician">Technician</option>
              <option value="engineer">Engineer</option>
              <option value="manager">Manager</option>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="">Total Users ({sortedUsers.length})</h4>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-row">
              <span className="cursor-pointer border border-gray-300 w-fit flex flex-row px-4 py-1 items-center bg-[#4880E5] text-white">
                <MdAdd />
                Add User
              </span>
              <span
                onClick={fetchData}
                className="cursor-pointer w-fit flex px-4 py-1 items-center gap-1 text-[#4880E5]"
              >
                <MdOutlineRefresh className="" />
                Refresh
              </span>
            </div>

            <div>
              <span
                onClick={fetchData}
                className="cursor-pointer w-fit border border-[#BF5281] flex px-4 py-1 items-center gap-1 text-[#BF5281]"
              >
                <AiOutlineUserDelete />
                Remove User
              </span>
            </div>
          </div>
        </div>
        <div className="overflow-y-scroll border border-gray-300 mt-4">
          <Table className="table-auto relative">
            <Table.Head>
              <Table.HeadCell
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </Table.HeadCell>
              <Table.HeadCell className="px-4 py-2">Role</Table.HeadCell>
              <Table.HeadCell className="px-4 py-2.5">
                Last password change
              </Table.HeadCell>
              <Table.HeadCell className="px-4 py-2">Last Active</Table.HeadCell>

              <Table.HeadCell>Settings</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {currentItems.map((user) => (
                <Table.Row key={user._id}>
                  <Table.Cell className="border-t border-gray-300 px-4 py-2 flex flex-col">
                    <span className="flex">
                      <h4 className="text-[#334553] font-semibold">
                        {user.name}
                      </h4>
                      <span
                        className="ml-1 w-2 h-2 rounded-full"
                        style={{
                          backgroundColor:
                            user.activity_status === "Online"
                              ? "#10B981"
                              : user.activity_status === "Offline"
                              ? "#EF4444"
                              : "#6B7280",
                        }}
                      ></span>
                    </span>
                    <h4>{user.email}</h4>
                  </Table.Cell>
                  <Table.Cell className="border-t border-gray-300 px-4 py-2 capitalize">
                    <Badge className="w-fit bg-[#F2DCE6] text-[#CF7DA0]">
                      {user.role}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell className="border-t border-gray-300 px-4 py-2">
                    {user.last_password_change}
                  </Table.Cell>
                  <Table.Cell className="border-t border-gray-300 px-4 py-2 capitalize">
                    {user.last_active}
                  </Table.Cell>

                  <Table.Cell className="border-t border-gray-300 px-4 py-2">
                    <Dropdown
                      label=""
                      dismissOnClick={false}
                      renderTrigger={() => (
                        <span className="cursor-pointer">
                          <svg
                            className="text-gray-800 w-full justify-center items-center"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeWidth="4"
                              d="M6 12h.01m6 0h.01m5.99 0h.01"
                            />
                          </svg>
                        </span>
                      )}
                    >
                      <Dropdown.Item>
                        <span className="font-semibold flex items-center gap-2">
                          <MdGroups2 className="w-5 h-auto" />
                          Group
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <span className="font-semibold flex items-center gap-2">
                          <MdComputer className="w-5 h-auto" />
                          Roles
                        </span>
                      </Dropdown.Item>
                      <hr className="border-gray-500" />
                      <Dropdown.Item>
                        <span className="font-semibold flex items-center gap-2 text-red-600">
                          <MdDeleteForever className="w-5 h-auto " />
                          Delete
                        </span>
                      </Dropdown.Item>
                    </Dropdown>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        <Pagination
          className="flex justify-center mt-4"
          total={totalPages}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
};

export default App;
