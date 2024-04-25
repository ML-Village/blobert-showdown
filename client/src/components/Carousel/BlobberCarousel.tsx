import { Carousel } from "flowbite-react";
import { BlobberCard } from "./BlobberCard";
import { useEffect, useState } from "react";
import { useDojo } from "../../dojo/useDojo";

export default function BlobberCarousel() {
  const { account } = useDojo();

  return (
    <div
      className="h-[350px] flex flex-col border border-gray-400 rounded-xl overflow-hidden"
      style={{
        backgroundImage: `url(/library.png)`,
        backgroundSize: "100%",
        backgroundBlendMode: "normal",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-white text-center my-2 h-5">
        <span>
          {account && account.list().length > 0
            ? `Your Current Selected Blobber Address is: ${account.account.address}`
            : ""}
        </span>
      </div>

      {account.list().length > 0 ? (
        <Carousel className="px-16" slide={false}>
          {account.list()
            .reverse()
            .map((acc, index) => {
              const reversedIndex = account.list().length - 1 - index;
              return (
                <div
                  className="flex justify-center items-center"
                  key={`blobbercard-${index}`}
                >
                  <BlobberCard
                    accountTarget={acc}
                    blobbersIndex={reversedIndex}
                    burnerAddress={acc ? acc.address : ""}
                    selected={account.account.address === acc.address}
                  />
                </div>
              );
            })}
        </Carousel>
      ) : (
        <div className="flex justify-center items-center text-white font-semibold h-full">
          ~ Summon A Blobber to Train your Bloberts ~
        </div>
      )}
    </div>
  );
}
