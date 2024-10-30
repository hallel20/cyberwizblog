"use client";

import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";

const Logout = () => (
  <button onClick={() => signOut()}>
    <BiLogOut size="30" />
  </button>
);

export default Logout;
