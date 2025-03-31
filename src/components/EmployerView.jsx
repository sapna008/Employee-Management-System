import React, { useState, useEffect } from 'react';
import { Users, UserPlus, UserCircle, X, LogOut } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

export function EmployerView({ user }) {
  const location = useLocation();

  let dashboardTitle = "Dashboard";
  if (location.pathname === "/dashboard/employer") {
    dashboardTitle = "Employer Dashboard";
  } else if (location.pathname === "/dashboard/employee") {
    dashboardTitle = "Employee Dashboard";
  }
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [showViewEmployees, setShowViewEmployees] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    name: '',
    department: 'Development',
    email: '',
    joinDate: new Date().toISOString().split('T')[0]
  });
  const [taskData, setTaskData] = useState({
    taskName: '',
    description: '',
    assignedTo: '',
    taskType: 'BAU',
    difficulty: 'easy',
    priority: 'medium',
    estimatedTime: '',
    reference: '',
    supportingLinks: '',
    status: 'pending'
  });

  useEffect(() => {
    fetchEmployees();
    fetchTasks();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://hackathon-bf312-default-rtdb.firebaseio.com/employees.json');
      if (response.data) {
        const employeeList = Object.entries(response.data).map(([id, data]) => ({
          id,
          ...data
        }));
        setEmployees(employeeList);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://hackathon-bf312-default-rtdb.firebaseio.com/tasks.json');
      if (response.data) {
        const taskList = Object.entries(response.data).map(([id, data]) => ({
          id,
          ...data
        }));
        setTasks(taskList);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://hackathon-bf312-default-rtdb.firebaseio.com/employees.json', employeeData);
      alert('Employee added successfully!');
      setEmployeeData({
        name: '',
        department: 'Development',
        email: '',
        joinDate: new Date().toISOString().split('T')[0]
      });
      setShowEmployeeForm(false);
      fetchEmployees();
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Failed to add employee');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://hackathon-bf312-default-rtdb.firebaseio.com/tasks.json', {
        ...taskData,
        assignedBy: user.name,
        timestamp: new Date().toISOString()
      });
      alert('Task assigned successfully!');
      setTaskData({
        taskName: '',
        description: '',
        assignedTo: '',
        taskType: 'BAU',
        difficulty: 'easy',
        priority: 'medium',
        estimatedTime: '',
        reference: '',
        supportingLinks: '',
        status: 'pending'
      });
      setShowTaskForm(false);
      fetchTasks();
    } catch (error) {
      console.error('Error assigning task:', error);
      alert('Failed to assign task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-600/10 bg-cover bg-center bg-no-repeat">
      {/* Navbar */}
      <nav className="bg-gray-500/30 shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="ml-3 text-xl font-semibold text-gray-100">{dashboardTitle}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                  alt={user.name}
                />
                <span className="ml-2 text-gray-100">{user.name}</span>
              </div>
              <a
                href="/"
                className="flex items-center px-4 py-2 bg-transparent hover:bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2 text-white/90 hover:text-gray-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-gradient-to-br from-gray-600/20 via-gray-900/20 to-gray-800/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          {/* Main Content */}
          <div className="space-y-8 pt-20">
            {/* Header Section */}
            <div className="bg-gray-600/20 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-xl">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Welcome, {user.name}
              </h1>
              <p className="mt-2 text-gray-400">Manage your team and track performance</p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Team Management Card */}
              <div
                onClick={() => setShowEmployeeForm(true)}
                className="group hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="h-full bg-gray-600/20 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 shadow-lg hover:shadow-blue-500/10">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                      <UserPlus className="w-6 h-6" />
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-white">Add Employee</h3>
                  </div>
                  <p className="text-gray-400">Add new team members to your organization</p>
                </div>
              </div>

              {/* Task Management Card */}
              <div
                onClick={() => setShowTaskForm(true)}
                className="group hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="h-full bg-gray-600/20 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 hover:border-green-500/50 shadow-lg hover:shadow-green-500/10">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-xl bg-green-500/10 text-green-400">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-white">Assign Task</h3>
                  </div>
                  <p className="text-gray-400">Assign and manage team tasks</p>
                </div>
              </div>

              {/* View Employees Card */}
              <div
                onClick={() => setShowViewEmployees(true)}
                className="group hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="h-full bg-gray-600/20 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 hover:border-indigo-500/50 shadow-lg hover:shadow-indigo-500/10">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                      <UserCircle className="w-6 h-6" />
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-white">View Employees</h3>
                  </div>
                  <p className="text-gray-400">View and manage team members by department</p>
                </div>
              </div>
            </div>

            {/* Employee Form Modal */}
            {showEmployeeForm && (
              <div className="fixed inset-0 z-50 overflow-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-gray-600/20 backdrop-blur-md rounded-2xl w-full max-w-2xl border border-gray-700/50 shadow-2xl">
                  <div className="flex justify-between items-center p-6 border-b border-gray-700/50">
                    <h2 className="text-2xl font-semibold text-white">Add New Employee</h2>
                    <button
                      onClick={() => setShowEmployeeForm(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="p-6">
                    <form onSubmit={handleEmployeeSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Employee Name
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                            value={employeeData.name}
                            onChange={(e) => setEmployeeData({ ...employeeData, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Department
                          </label>
                          <select
                            required
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                            value={employeeData.department}
                            onChange={(e) => setEmployeeData({ ...employeeData, department: e.target.value })}
                          >
                            <option value="Development">Development</option>
                            <option value="Design">Design</option>
                            <option value="Marketing">Marketing</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                            value={employeeData.email}
                            onChange={(e) => setEmployeeData({ ...employeeData, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Join Date
                          </label>
                          <input
                            type="date"
                            required
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                            value={employeeData.joinDate}
                            onChange={(e) => setEmployeeData({ ...employeeData, joinDate: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => setShowEmployeeForm(false)}
                          className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                        >
                          Add Employee
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* View Employees Modal */}
            {showViewEmployees && (
              <div className="fixed inset-0 z-50 overflow-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-gray-600/20 backdrop-blur-md rounded-2xl w-full max-w-4xl border border-gray-700/50 shadow-2xl">
                  <div className="flex justify-between items-center p-6 border-b border-gray-700/50">
                    <h2 className="text-2xl font-semibold text-white">Employees by Department</h2>
                    <button
                      onClick={() => setShowViewEmployees(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="p-6 max-h-[70vh] overflow-y-auto">
                    {['Development', 'Design', 'Marketing'].map((department) => (
                      <div key={department} className="mb-8">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                          <span className="w-3 h-3 rounded-full bg-indigo-500 mr-3"></span>
                          {department}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {employees
                            .filter((emp) => emp.department === department)
                            .map((employee) => (
                              <div
                                key={employee.id}
                                className="bg-gray-700/20 backdrop-blur-sm rounded-xl p-4 border border-gray-600/50"
                              >
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                      employee.name
                                    )}&background=random`}
                                    alt={employee.name}
                                    className="w-12 h-12 rounded-full"
                                  />
                                  <div>
                                    <h4 className="text-white font-medium">{employee.name}</h4>
                                    <p className="text-gray-400 text-sm">{employee.email}</p>
                                    <p className="text-gray-400 text-sm">
                                      Joined: {new Date(employee.joinDate).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Task Form Modal */}
            {showTaskForm && (
              <div className="fixed inset-0 z-50 overflow-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-gray-600/20 backdrop-blur-md rounded-2xl w-full max-w-3xl border border-gray-700/50 shadow-2xl">
                  {/* Modal Header */}
                  <div className="flex justify-between items-center p-6 border-b border-gray-700/50">
                    <h2 className="text-2xl font-semibold text-white">Assign New Task</h2>
                    <button
                      onClick={() => setShowTaskForm(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Scrollable Form Container */}
                  <div className="max-h-[60vh] overflow-y-auto">
                    <div className="p-6">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Form fields */}
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Task Name
                            </label>
                            <input
                              type="text"
                              required
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400"
                              value={taskData.taskName}
                              onChange={(e) => setTaskData({ ...taskData, taskName: e.target.value })}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Assign To
                            </label>
                            <select
                              required
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                              value={taskData.assignedTo}
                              onChange={(e) => setTaskData({ ...taskData, assignedTo: e.target.value })}
                            >
                              <option value="">Select Employee</option>
                              {employees.map((employee) => (
                                <option key={employee.id} value={employee.name}>
                                  {employee.name} - {employee.department}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Task Type
                            </label>
                            <select
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                              value={taskData.taskType}
                              onChange={(e) => setTaskData({ ...taskData, taskType: e.target.value })}
                            >
                              <option value="BAU">BAU (Business As Usual)</option>
                              <option value="Ad Hoc">Ad Hoc</option>
                              <option value="Project-Based">Project-Based</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Priority Level
                            </label>
                            <select
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                              value={taskData.priority}
                              onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
                            >
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                              <option value="urgent">Urgent</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Difficulty Level
                            </label>
                            <select
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                              value={taskData.difficulty}
                              onChange={(e) => setTaskData({ ...taskData, difficulty: e.target.value })}
                            >
                              <option value="easy">Easy</option>
                              <option value="medium">Medium</option>
                              <option value="hard">Hard</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Estimated Time (hours)
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.5"
                              required
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                              value={taskData.estimatedTime}
                              onChange={(e) => setTaskData({ ...taskData, estimatedTime: e.target.value })}
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Reference (Manager/Colleague)
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400"
                              value={user.name}
                              onChange={(e) => setTaskData({ ...taskData, reference: e.target.value })}
                              placeholder="Name of manager or colleague who requested this task"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Task Description
                            </label>
                            <textarea
                              required
                              rows={4}
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400"
                              value={taskData.description}
                              onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Supporting Links/Documents
                            </label>
                            <textarea
                              rows={3}
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400"
                              value={taskData.supportingLinks}
                              onChange={(e) => setTaskData({ ...taskData, supportingLinks: e.target.value })}
                              placeholder="Add relevant links to documents, emails, or resources (one per line)"
                            />
                          </div>
                        </div>

                        {/* Button Container */}
                        <div className="flex justify-end space-x-4 pt-4">
                          <button
                            type="button"
                            onClick={() => setShowTaskForm(false)}
                            className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                          >
                            Assign Task
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerView;