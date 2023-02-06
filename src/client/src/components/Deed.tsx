import React from 'react';

const Deed = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="border-2 rounded m-3">
      <div className="p-2 font-bold justify-between border-b-2 flex">
        <h1 className="">{title}</h1>
        <div>
          <button className="border-2 p-1 rounded mr-3">Edit</button>
          <button className="border-2 p-1 rounded bg-red-500">x</button>
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default Deed;
