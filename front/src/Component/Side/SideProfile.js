import React from "react";

const SideProfile = ({ user }) => {
  return (
    <div className="side-profile-container">
      <img src={user.profile_image || "https://via.placeholder.com/50" } className="side-profile-image" alt="profile"/>
      <span className="side-profile-infomation">
        <div className="side-profile-email">{user.email || ""}</div>
        <div className="side-profile-nickname">{user.nickname || ""}</div>
      </span>
    </div>
  );
};

export default SideProfile;
