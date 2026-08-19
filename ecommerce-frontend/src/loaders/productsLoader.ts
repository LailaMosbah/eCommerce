import type { LoaderFunction } from "react-router-dom";

export const productsLoader: LoaderFunction = (params) => {
  const { prefix } = params.params;
  console.log(params);
  console.log(prefix);
  if (
    typeof prefix !== "string" ||
    prefix.trim() === "" ||
    !/^[a-zA-Z]+$/.test(prefix)
  ) {
    // || !["all", "new", "featured"].includes(prefix)
    throw new Response("Bad Request", {
      status: 400,
      statusText: "Invalid Product Prefix",
    });
  }

  return true;
  //return prefix
};
