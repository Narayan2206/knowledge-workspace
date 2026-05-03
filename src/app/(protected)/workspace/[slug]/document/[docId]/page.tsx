"use client";
import { useParams } from "next/navigation";

function Document() {
  const params = useParams();
  console.log("Document PARAMS ", params);
  return (
    <>
      <p>document</p>
    </>
  );
}

export default Document;
