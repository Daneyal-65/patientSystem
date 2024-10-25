import { useDispatch, useSelector } from "react-redux";
import Profile from "../components/Profile";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "../ui";
import { useState } from "react";
import { profileData } from "../store/profile/profileReducer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Dashboard() {
  const user = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    addr1: "",
    addr2: "",
    city: "",
    _state: "",
    zipcode: "",
    error: "",
  });
  const dispatch = useDispatch();

  const handlechange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormData = (event) => {
    event.preventDefault();

    // Validate form data
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.addr1 ||
      !formData.addr2 ||
      !formData.city ||
      !formData._state
    ) {
      toast.error("All fields marked with * are required!", {
        position: "top-right",
      });
      setFormData({ ...formData, error: "Error - All fields are required" });
      return;
    }

    const profile = {
      ...formData,
      token: user.token,
      userId: user.userId,
      updated: true,
      email: user.userName.substring(1, user.userName.length) + "@gamil.com",
    };
    dispatch(profileData(profile));
    toast.success("updating user profile !", { position: "top-right" });
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      addr1: "",
      addr2: "",
      city: "",
      _state: "",
      zipcode: "",
      error: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <h1 className="text-2xl border-[1px] border-b-black font-bold shadow-md bg-white py-4 pl-4">
        Patient Dashboard
      </h1>
      {!user.updated ? (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>
              Patient Details{" "}
              <span className="text-red-700 text-xl font-bold font-serif ml-6">
                {formData.error}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="" onSubmit={handleFormData}>
              <div className="grid grid-cols-2 gap-4">
                <div className="">
                  <Label htmlFor="firstName">First Name*</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handlechange}
                  />
                </div>
                <div className="">
                  <Label htmlFor="lastName">Last Name*</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handlechange}
                  />
                </div>
              </div>
              <div className="">
                <Label htmlFor="phone">Phone*</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handlechange}
                />
              </div>
              <div className="">
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  disabled={user.userName}
                  readOnly
                  value={
                    user.userName
                      ? `${user.userName.substring(1)}@gmail.com`
                      : ""
                  }
                  placeholder="Email"
                />
              </div>
              <div className="">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input
                  id="addressLine1"
                  name="addr1"
                  placeholder="Address Line 1"
                  value={formData.addr1}
                  onChange={handlechange}
                />
              </div>
              <div className="">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  name="addr2"
                  placeholder="Address Line 2"
                  value={formData.addr2}
                  onChange={handlechange}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="">
                  <Label htmlFor="city">City*</Label>
                  <Input
                    id="city"
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handlechange}
                  />
                </div>
                <div className="">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    name="_state"
                    value={formData._state}
                    onChange={handlechange}
                  />
                </div>
                <div className="">
                  <Label htmlFor="zipcode">Zipcode</Label>
                  <Input
                    id="zipcode"
                    placeholder="Zipcode"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handlechange}
                  />
                </div>
              </div>
              <Button
                className="bg-purple-600 hover:bg-purple-700 w-20 mt-4 px-2 ml-1"
                type="submit"
              >
                ADD
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Profile />
      )}
      <ToastContainer />
    </div>
  );
}
