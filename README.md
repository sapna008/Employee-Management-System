# Employee Management System

## Live Demo
[Click here to view the live demo](https://employeemanagementsystemmm.netlify.app/)

## Overview
The **Employee Management System** is a web application built using React that allows an employer to manage employees by adding them to the system, assigning tasks, and viewing their details. Employees can log in only if they have been added by an employer. The app uses Firebase Realtime Database for storing data and Cloudinary for image uploads.

## Features
- **Employer Login**: Log in using any email and name to access employer functionalities.
- **Add Employee**: Employers can add employees to the system.
- **Assign Tasks**: Employers can assign tasks to employees.
- **View Employees**: Employers can view the list of employees.
- **Employee Login**: Employees can log in only if they have been added by an employer.
- **Image Upload**: Cloudinary is used for uploading employee profile images.

## Tech Stack
- **Frontend**: React.js
- **Database**: Firebase Realtime Database
- **Image Storage**: Cloudinary

## Installation & Setup
To run this project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/employee-management-system.git
   cd employee-management-system
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Firebase**:
   - Create a Firebase project and enable Realtime Database.
   - Get your Firebase config and update it in your project.
4. **Configure Cloudinary**:
   - Create a Cloudinary account.
   - Get your API credentials and update them in the project.
5. **Run the Project**:
   ```bash
   npm start
   ```

## Usage
1. **Log in as an Employer** using any email and name.
2. **Add Employees** through the employer dashboard.
3. **Log in as an Employee** using the credentials created by the employer.
4. **View and manage tasks** assigned to employees.


