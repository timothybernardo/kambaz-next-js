"use client";
import * as client from "../client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const fetchProfile = () => {
    if (!currentUser) return router.push("/account/signin");
    setProfile(currentUser);
  };

  const signout = () => {
    dispatch(setCurrentUser(null));
    router.push("/account/signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    redirect("/account/signin");
  };



  return (
    <div id="wd-profile-screen" className="p-3" style={{ maxWidth: "400px" }}>
      <h1>Profile</h1>
      {profile && (
        <div>
          <FormControl id="wd-username" className="mb-2"
            placeholder="username"
            value={profile.username || ""}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
          <FormControl id="wd-password" className="mb-2"
            placeholder="password" type="password"
            value={profile.password || ""}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
          <FormControl id="wd-firstname" className="mb-2"
            placeholder="First Name"
            value={profile.firstName || ""}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
          <FormControl id="wd-lastname" className="mb-2"
            placeholder="Last Name"
            value={profile.lastName || ""}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
          <FormControl id="wd-dob" className="mb-2" type="date"
            value={profile.dob || ""}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
          <FormControl id="wd-email" className="mb-2"
            placeholder="Email" type="email"
            value={profile.email || ""}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          <select className="form-control mb-2" id="wd-role"
            value={profile.role || "USER"}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <Button onClick={signout}
            className="w-100 mb-2" variant="danger"
            id="wd-signout-btn">
            Sign out
          </Button>
          <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
        </div>
      )}
    </div>
  );
}