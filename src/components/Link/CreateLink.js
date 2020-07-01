import React from "react";
import useFormValidation from "../Auth/useFormValidation";
import validateCreatelink from "../Auth/validateCreateLink";

const INITIAL_STATE = {
  description: "",
  url: "",
};

function CreateLink(props) {
  useFormValidation(INITIAL_STATE, validateCreatelink);

  return (
    <form className="flex flex-column mt-3">
      <input
        name="description"
        placeholder="A descripton to your link"
        autoComplete="off"
        type="text"
      />
      <input
        name="url"
        placeholder="This the url for the link"
        autoComplete="off"
        type="text"
      />
      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default CreateLink;
