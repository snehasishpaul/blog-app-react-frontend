import React from "react";
import { ColorRing, DNA } from "react-loader-spinner";

export const LoadingSpinnerDNA = ({ h, w }) => {
  return (
    <>
      <DNA
        visible={true}
        height={h}
        width={w}
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        color="white"
      />
    </>
  );
};

export const LoadingSpinnerColorRing = ({ h, w }) => {
  return (
    <>
      <ColorRing
        visible={true}
        height={h}
        width={w}
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </>
  );
};
