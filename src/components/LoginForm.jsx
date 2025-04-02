import React, { useState } from 'react';
import { UserCircle, Mail, User, Building } from 'lucide-react';

export function LoginForm({ onLogin, onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'employee',
  });
  const [error, setError] = useState('');

  const validateEmployee = async (name) => {
    try {
      const response = await fetch('https://hackathon-bf312-default-rtdb.firebaseio.com/employees.json');
      const data = await response.json();
      
      const employeeExists = Object.values(data).some(
        employee => employee.name.toLowerCase() === name.toLowerCase()
      );
      
      return employeeExists;
    } catch (error) {
      console.error('Error validating employee:', error);
      return false;
    }
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    if (formData.role === 'employee') {
      const isValidEmployee = await validateEmployee(formData.name);
      
      if (!isValidEmployee) {
        setError('Employee does not exist');
        return;
      }
    }

    onLogin(formData);
    if (onNavigate) {
      onNavigate(`/dashboard/${formData.role}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-300 hover:scale-[1.01]"
                style={{
                  backgroundColor: 'rgba(57, 57, 63, 0.24)',
                  color: 'white',
                }}>
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-full">
            <UserCircle className="w-16 h-16 text-gray-500" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-gray-300 mb-8">Please enter your details</p>
        
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500 text-red-100">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="name" className="block text-sm font-medium text-gray-500 mb-1">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-100 w-5 h-5" />
              <input
                type="text"
                id="name"
                required
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-black/60"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-100 w-5 h-5" />
              <input
                type="email"
                id="email"
                required
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-black/60"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="role" className="block text-sm font-medium text-gray-500 mb-1">
              Category
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-100 w-5 h-5" />
              <select
                id="role"
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-black/60 appearance-none"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="employee" className="blue-200/60">Employee</option>
                <option value="employer">Employer</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mt-8"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;