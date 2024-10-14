import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="relative">
      <Image
        src="https://media.tenor.com/Y7bSnLM1Cw8AAAAj/bar-penguin.gif"
        alt="Loading..."
        width={100}
        height={100}
        unoptimized
      />
    </div>
  );
};

export default Loading;
