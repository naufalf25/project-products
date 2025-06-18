import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetUserDetail } from "../states/users/action";
import { useParams } from "react-router";
import { Card } from "@mui/material";

function UserDetailPage() {
  const { id } = useParams();
  const { userDetail = {} } = useSelector((states) => states.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetUserDetail(id));
  }, [dispatch, id]);

  const {
    firstName,
    lastName,
    email,
    age,
    birthDate,
    bloodGroup,
    gender,
    image,
    phone,
    username,
  } = userDetail;
  console.log(userDetail);

  return (
    <section className="w-full p-4">
      <Card className="w-full p-4 md:px-8 lg:px-10">
        <h1 className="text-center text-lg font-bold tracking-wide md:text-xl lg:text-2xl">
          {firstName}'s Profile
        </h1>
      </Card>
      <Card className="mt-10 w-full p-4 md:p-8 lg:p-10">
        <div className="flex flex-col items-center justify-center gap-10">
          <img
            src={image}
            alt={`${firstName} profile`}
            className="w-40 rounded-full bg-white p-1"
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="font-semibold md:text-lg lg:text-xl">
              {firstName} {lastName}, {age}
            </h2>
            <p>{birthDate}</p>
            <p className="text-slate-500 italic">{email}</p>
          </div>
          <div className="flex w-full max-w-md flex-col items-center">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="flex w-full flex-col items-start justify-center gap-8">
              <div className="mt-6 flex flex-col gap-8 md:w-full md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-4">
                  <p className="text-lg font-medium text-slate-500">
                    First Name
                  </p>
                  <p className="text-lg">{firstName}</p>
                </div>
                <div className="flex flex-col items-start gap-4 md:items-end">
                  <p className="text-lg font-medium text-slate-500">
                    Last Name
                  </p>
                  <p className="text-lg">{lastName}</p>
                </div>
              </div>
              <div className="flex flex-col gap-8 md:w-full md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-4">
                  <p className="text-lg font-medium text-slate-500">Username</p>
                  <p className="text-lg">{username}</p>
                </div>
                <div className="flex flex-col items-start gap-4 md:items-end">
                  <p className="text-lg font-medium text-slate-500">
                    Phone Number
                  </p>
                  <p className="text-lg">{phone}</p>
                </div>
              </div>
              <div className="flex flex-col gap-8 md:w-full md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-4">
                  <p className="text-lg font-medium text-slate-500">Gender</p>
                  <p className="text-lg capitalize">{gender}</p>
                </div>
                <div className="flex flex-col items-start gap-4 md:items-end">
                  <p className="text-lg font-medium text-slate-500">
                    Blood Group
                  </p>
                  <p className="text-lg">{bloodGroup}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

export default UserDetailPage;
