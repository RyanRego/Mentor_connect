
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Group } from "@mantine/core";

import {
  IconBellRinging,
  IconLogout,
  IconDashboard,
  IconVideo,
  IconUserEdit,
  IconLogin,
  IconCirclesRelation,
  IconX,
  IconUser
} from "@tabler/icons-react";

import classes from "./NavbarSimple.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function Sidebar({ toggle }) {
  const [active, setActive] = useState("Billing");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const getRole = localStorage.getItem("role");
  console.log(getRole);

  const onClickHandler = (label, event) => {
    event.preventDefault();
    setActive(label);
    if (!user?.currentUser) {
      navigate("/login");
    }
    navigate(label);
  };

  return (
    <nav
      className={`w-[320px] md:w-[261px] flex flex-col py-4 h-[100vh] text-gray-700 border-r border-gray-300`}
    >
      <div className={classes.navbarMain}>
        <Group
          className={`${classes.header} md:justify-center`}
          justify="space-between"
        >
          {/* <MantineLogo size={28} /> */}
          <div className="px-1 text-blue-600 flex items-center ">
            <IconCirclesRelation className="md:ml-2 ml-4 mr-2" size={36} />
            <h1 className="font-bold text-xl hidden md:block brand-name">
              Mentor-Connect
            </h1>
          </div>
          <div
            role="button"
            onClick={toggle}
            className="md:hidden cursor-pointer text-md font-bold"
          >
            <IconX className="mx-4" size={36} />
          </div>
        </Group>
        {getRole && getRole === 'mentee' ? (
          <Link
          className={`${classes.link}`}
          data-active={"Notification" === active || undefined}
          onClick={(event) => onClickHandler("/Notification", event)}
        >
          <IconBellRinging className="mx-4" />

          <div className="text-base font-semibold">Notifications</div>
        </Link>
        ) : (
          <Link
          className={`${classes.link}`}
          data-active={"Notification" === active || undefined}
          onClick={(event) => onClickHandler("/MentorFeedback", event)}
        >
          <IconBellRinging className="mx-4" />

          <div className="text-base font-semibold">Feedback</div>
        </Link>
        )}
        {getRole && getRole === "mentor" ? (
          <Link
            className={`${classes.link}`}
            data-active={"mentor" === active || undefined}
            onClick={(event) => {
              onClickHandler("/dashboard", event);
            }}
          >
            <IconDashboard className="mx-4" />
            <div className="text-base font-semibold">Mentor Dashboard</div>
          </Link>
        ) : (
          <Link
            className={`${classes.link}`}
            data-active={"mentor" === active || undefined}
            onClick={(event) => {
              onClickHandler("/", event);
            }}
          >
            <IconUserEdit className="mx-4" />
            <div className="text-base font-semibold">Find a mentor</div>
          </Link>
        )}
        <Link
          className={`${classes.link}`}
          data-active={"join" === active || undefined}
          onClick={(event) => {
            onClickHandler("/applications", event);
          }}
        >
          <IconVideo className="mx-4" />
          <div className="text-base font-semibold">Join a meet</div>
        </Link>
        <Link
          className={`${classes.link}`}
          data-active={"edit" === active || undefined}
          onClick={(event) => {
            onClickHandler("/edit", event);
          }}
        >
          <IconUserEdit className="mx-4" />
          <div className="text-base font-semibold">Edit Profile</div>
        </Link>
        {getRole && getRole === "mentee" && (
          <Link
            className={classes.link}
            data-active={"edit" === active || undefined}
            onClick={(event) => {
              onClickHandler("/recommended", event);
            }}
          >
            <IconUser className="mx-4" />
            <div className="text-base font-semibold">Recommended</div>
          </Link>
        )}
        {!user?.currentUser && (
          <Link
            className={`${classes.link}`}
            data-active={"edit" === active || undefined}
            onClick={(event) => {
              onClickHandler("/signup", event);
            }}
          >
            <IconLogin className="mx-4" />
            <div className="text-base font-semibold ">Sign Up</div>
          </Link>
        )}
      </div>

      <div className={classes.footer}>
        <Link
          className={`${classes.link}`}
          onClick={(event) => {
            event.preventDefault();
            navigate(
              `/${getRole}/${user?.currentUser.email}` || "/login"
            );
          }}
        >
          <img
            src="https://avatars.githubusercontent.com/u/81866624?v=4"
            alt="profile"
            className="w-8 h-8 ml-4 mr-2 rounded-full"
          />
          <span className="text-base font-semibold">Profile</span>
        </Link>

        <a
          href="#"
          className={`${classes.link}`}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className="mx-4" />
          {user?.currentUser === null ? (
            <span
              onClick={(event) => {
                event.preventDefault();
                navigate("/login");
              }}
              className="text-base font-semibold"
            >
              Login
            </span>
          ) : (
            <span className="text-base font-semibold">Logout</span>
          )}
        </a>
      </div>
    </nav>
  );
}