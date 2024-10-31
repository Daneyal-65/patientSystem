# **Doctor Appointment Booking App**

## **Project Overview**

The **Doctor Appointment Booking App** is a full-stack application developed to simplify doctor appointment scheduling. The app allows patients to register, log in, book appointments, and view their scheduled visits. This project demonstrates the integration of front-end and back-end development in a healthcare setting, focusing on a user-friendly experience.

## **Key Objectives**

1. **Patient-Centric Design**  
   Providing a clean and intuitive interface for patients to manage appointments easily.

2. **Hands-on Development Experience**  
   Gaining practical experience by building a real-world application with essential full-stack development principles.

3. **Comprehensive Full-Stack Learning**  
   Ensuring a well-rounded understanding of both front-end and back-end technologies through the project lifecycle.

## **Project Features**

1. **Backend Server**  
   The backend is developed using **Express.js** on Node.js and is connected to a **MongoDB** database. Key API endpoints include:
   - **POST** `/api/auth/register`: Allows new users to register with contact details, name, email, and password.
   - **POST** `/api/auth/login`: Authenticates a user and grants access to the appointment booking system.
   - **GET** `/api/auth/profile`: Authenticates a user and grants access to the get user profile .
   - **POST** `/api/auth/profile`: Authenticates a user and grants access to the set or update user profile.
   - **POST** `/api/appointments/book`: Enables patients to schedule an appointment with details like date, time, doctor type, and additional comments.
   - **GET** `/api/appointments/myappointments`: Retrieves a list of booked appointments for a user.
   - **GET** `/api/auth/patient`: Retrieves a list of users detail and it will only access by admin.

2. **Frontend Interface**  
   The frontend is built with **React.js** and **Tailwind CSS** and includes the following features:
   - **Registration and Login Forms** with field validation and Google login option.
   - **Dashboard** where users can view their profile, upload a profile picture, and access their appointment history.
   - **Book Appointment Page** for selecting appointment details, uploading medical reports, and confirming bookings.
   - **My Appointments Page** displaying all upcoming and past appointments with sorting and filtering options.

3. **Database**  
   The **MongoDB** database securely stores user details, appointments, and profile information, following a structured schema for data consistency.


## **Frontend Requirements**

1. **Form Handling**  
   The app includes forms for registration, login, and appointment booking with validation for all input fields.

2. **Responsiveness**  
   Designed to be fully responsive and accessible across all devices, ensuring usability for patients of all ages.

3. **State Management**  
   Uses **Redux** and **Redux-Thunk** for managing the app's state, enabling seamless data flow and UI updates.

## **Technology Stack**

- **Frontend:** React.js, Tailwind CSS, Redux, Redux-Thunk
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **State Management:** Redux
- **Authentication:** JWT

## **Setup Instructions**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Daneyal-65/patientSystem.git
   cd patientSystem

   
2. **go to client directory**
   ```bash
   cd client
   ```
 3. **bash**
   
   ```bash
   npm i
   ```
 4. **bash**

   ```bash
   npm start
   ```
**split terminal in to tow parts then**
   
 1. **go to sever directory**
   ```bash
   cd sever
```
 2. **bash**
   ```bash
   npm i
```
 3. **bash**
   ```bash
   npm run dev
```




