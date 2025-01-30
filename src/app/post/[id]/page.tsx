"use client";

import { FC } from "react";

interface Params {
  id: string;
}


const Page: FC<{ params: Params }> = ({ params: { id } }) => {

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default Page;
