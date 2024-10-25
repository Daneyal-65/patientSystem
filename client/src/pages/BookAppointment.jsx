import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useDateTime from "../hooks/useDateTime";
import { useDispatch, useSelector } from "react-redux";
import { submitAppointments } from "../store/appointments/appointmentSlice";
import { departments, doctors } from "../constant/data";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookAppointment = () => {
  const user = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { date, time, getDateTime } = useDateTime();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [comments, setComments] = useState("");
  const fileInputRef = useRef(null); // Use ref for file input
  const isLoading = useSelector((state) => state.userAppointments.loading);

  // Validate file type directly when needed
  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    return file && allowedTypes.includes(file.type);
  };

  // Validation function to ensure required fields are filled
  const isValidForm = () => {
    const selectedFile = fileInputRef.current.files[0];
    if (!date || !time || !department || !comments || !selectedFile) {
      toast.error("Please fill out all required fields!", {
        position: "top-center",
      });
      return false;
    }
    if (!validateFile(selectedFile)) {
      toast.error("Invalid file type. Please upload JPEG or PNG images.", {
        position: "top-center",
      });
      return false;
    }
    if (comments.length <= 6) {
      toast.error("Comments should be at least 6 characters long", {
        position: "top-center",
      });
      return false;
    }
    return true;
  };

  useEffect(() => {
    getDateTime(selectedDate);
  }, [selectedDate, getDateTime]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!isValidForm()) return;

    const selectedFile = fileInputRef.current.files[0];

    const newAppointment = {
      token: user.token,
      date: date,
      time: time,
      department,
      doctor: doctors[department],
      comments,
      file: selectedFile,
      name: user.firstName,
    };

    dispatch(submitAppointments(newAppointment));
    toast.success("Appointment created successfully!", {
      position: "top-center",
    });

    // Reset the form after submission
    setComments("");
    setDepartment("");
    setDoctor("");
    setSelectedDate(new Date());

    // Clear the file input field using the reference
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex justify-center items-center md:items-baseline md:pt-10 min-h-screen bg-gray-100">
      <div className="bg-white px-8 py-2 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-1">
          Book an Appointment
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Date Picker */}
          <div className="mb-1">
            <label className="block text-gray-700 font-medium mb-1">
              Select Date*
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-200"
            />
          </div>

          {/* Department Dropdown */}
          <div className="mb-1">
            <label className="block text-gray-700 font-medium mb-1">
              Department*
            </label>
            <select
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            >
              <option value="">Select Department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept.value}>
                  {dept.label}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor Dropdown */}
          <div className="mb-1">
            <label className="block text-gray-700 font-medium mb-1">
              Doctor*
            </label>
            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
              disabled={true}
            >
              <option value={department && doctors[department][0]}>
                {department && doctors[department].name}
              </option>
            </select>
          </div>

          {/* File Upload */}
          <div className="mb-1">
            <label className="block text-gray-700 font-medium mb-1">
              Upload Reports*
            </label>
            <input
              ref={fileInputRef}
              accept="image/jpeg, image/png"
              required
              type="file"
              name="uploaded_file"
              className="block w-full text-sm text-gray-500 file:ml-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
          </div>

          {/* Comments Text Area */}
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-1">
              Comments*
            </label>
            <textarea
              required
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Explain about the problem"
              rows="3"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookAppointment;
