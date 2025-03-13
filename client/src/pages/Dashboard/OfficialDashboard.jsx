import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import officialData from "./official.json";

// DepartmentOverview component with Recharts

const DepartmentOverview = ({ data }) => {
  const [chartData] = useState(
    Object.entries(data.metrics.monthlyTrends).map(([month, value]) => ({
      month,
      issues: value,
    }))
  );

  const statusData = [
    {
      name: "Pending",
      value: Object.values(data.issues).reduce(
        (acc, curr) => acc + curr.pending,
        0
      ),
    },
    {
      name: "In Progress",
      value: Object.values(data.issues).reduce(
        (acc, curr) => acc + curr.inProgress,
        0
      ),
    },
    {
      name: "Resolved",
      value: Object.values(data.issues).reduce(
        (acc, curr) => acc + curr.resolved,
        0
      ),
    },
  ];

  const COLORS = ["#FFBB28", "#FF8042", "#00C49F"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="col-span-1">
        <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Resolution Time</span>
            <span className="font-bold">
              {data.metrics.averageResolutionTime}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Satisfaction Rate</span>
            <span className="font-bold">
              {data.metrics.citizenSatisfaction}
            </span>
          </div>
        </div>
      </Card>

      <Card className="col-span-2">
        <h3 className="text-xl font-bold mb-4">Monthly Trends</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="issues"
                stroke="#4CAF50"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="col-span-3">
        <h3 className="text-xl font-bold mb-4">Issue Status Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="col-span-3">
        <h3 className="text-xl font-bold mb-4">Issue Status Overview</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
const DepartmentAnalytics = ({ data }) => {
  // Fix the priority data calculation
  const priorityData = Object.values(data.issues).reduce((acc, issue) => {
    issue.recentIssues.forEach((item) => {
      acc[item.priority] = (acc[item.priority] || 0) + 1;
    });
    return acc;
  }, {});

  // Convert the priority data to array format that Recharts expects
  const priorityChartData = Object.entries(priorityData).map(
    ([priority, count]) => ({
      priority,
      count,
    })
  );

  const locationData = Object.values(data.issues).reduce((acc, issue) => {
    issue.locations.forEach((location) => {
      const count = issue.recentIssues.filter((i) =>
        i.location.includes(location)
      ).length;
      acc.push({ location, count });
    });
    return acc;
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="col-span-1">
        <h3 className="text-xl font-bold mb-4">Priority Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={priorityChartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={100}
                dataKey="count"
                nameKey="priority"
              >
                {priorityChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#ff4d4d", "#ffa726", "#66bb6a"][index]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

// 3. IssuesList Component
const IssuesList = ({ issues }) => {
  const issueTypes = Object.keys(issues);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);

  const currentIssueType = issueTypes[activeTab];
  const currentIssues = issues[currentIssueType];
  const locations = currentIssues.locations || [];

  useEffect(() => {
    let filtered = currentIssues.recentIssues;
    if (selectedLocations.length > 0) {
      filtered = filtered.filter((issue) =>
        selectedLocations.some((location) => issue.location.includes(location))
      );
    }
    setFilteredIssues(filtered);
  }, [selectedLocations, currentIssueType, currentIssues]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <TabMenu
          model={issueTypes.map((type) => ({
            label: type.charAt(0).toUpperCase() + type.slice(1),
            icon: "pi pi-inbox",
          }))}
          activeIndex={activeTab}
          onTabChange={(e) => setActiveTab(e.index)}
        />

        <MultiSelect
          value={selectedLocations}
          options={locations}
          onChange={(e) => setSelectedLocations(e.value)}
          placeholder="Filter by Location"
          className="w-96"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-700">
              {filteredIssues.length}
            </h3>
            <p>Filtered Issues</p>
          </div>
        </Card>
        <Card className="bg-yellow-50">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-yellow-700">
              {filteredIssues.filter((i) => i.status === "pending").length}
            </h3>
            <p>Pending</p>
          </div>
        </Card>
        <Card className="bg-orange-50">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-orange-700">
              {filteredIssues.filter((i) => i.status === "inProgress").length}
            </h3>
            <p>In Progress</p>
          </div>
        </Card>
        <Card className="bg-green-50">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-700">
              {filteredIssues.filter((i) => i.status === "resolved").length}
            </h3>
            <p>Resolved</p>
          </div>
        </Card>
      </div>

      <DataTable
        value={filteredIssues}
        paginator
        rows={10}
        filterDisplay="menu"
        className="p-datatable-lg"
      >
        <Column field="id" header="ID" sortable />
        <Column field="title" header="Title" sortable filter />
        <Column field="location" header="Location" sortable filter />
        <Column field="priority" header="Priority" sortable filter />
        <Column field="status" header="Status" sortable filter />
        <Column field="dateReported" header="Date" sortable />
        <Column field="assignedTo" header="Assigned To" sortable filter />
        <Column
          field="expectedResolution"
          header="Expected Resolution"
          sortable
        />
        <Column
          body={(rowData) => (
            <Button
              icon="pi pi-eye"
              className="p-button-rounded p-button-text"
              onClick={() => console.log("View details:", rowData)}
            />
          )}
        />
      </DataTable>
    </div>
  );
};

// Modified Main OfficialDashboard component
const OfficialDashboard = () => {
  const navigate = useNavigate();
  const { department } = useParams();
  const [departmentData, setDepartmentData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Overview", icon: "pi pi-home" },
    { label: "Analytics", icon: "pi pi-chart-bar" },
    { label: "Issues", icon: "pi pi-list" },
  ];

  useEffect(() => {
    const data = officialData[department];
    if (data) {
      setDepartmentData(data);
    } else {
      navigate("/404");
    }
  }, [department, navigate]);

  if (!departmentData) {
    return <div>Loading...</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <DepartmentOverview data={departmentData} />;
      case 1:
        return <DepartmentAnalytics data={departmentData} />;
      case 2:
        return <IssuesList issues={departmentData.issues} />;
      default:
        return <DepartmentOverview data={departmentData} />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {departmentData.name}
          </h1>
          <p className="text-gray-600">Dashboard Overview</p>
        </div>
        <div className="space-x-2">
          <Button
            label="Generate Report"
            icon="pi pi-file-pdf"
            className="p-button-outlined"
          />
          <Button
            label="Settings"
            icon="pi pi-cog"
            className="p-button-outlined"
          />
        </div>
      </div>

      <TabMenu
        model={tabs}
        activeIndex={activeTab}
        onTabChange={(e) => setActiveTab(e.index)}
        className="mb-6"
      />

      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};

export default OfficialDashboard;
