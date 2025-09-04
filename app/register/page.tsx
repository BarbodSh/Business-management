import React from "react";
import Form from "next/form";
function page() {
  return (
    <div className="container min-h-screen flex justify-center items-center">
      <Form action="">
        <input name="identifier" type="text" />
        <input name="password" type="text" />
        <button type="submit"></button>
      </Form>
    </div>
  );
}

export default page;
