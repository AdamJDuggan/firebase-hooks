import React, { useContext } from "react";
import useFormValidation from "../Auth/useFormValidation";
import validateCreatelink from "../Auth/validateCreateLink";
import { FirebaseContext } from "../../firebase";

const INITIAL_STATE = {
  description: "",
  url: "",
};

function CreateLink(props) {
  const { firebase, user } = useContext(FirebaseContext);
  const { handleSubmit, handleChange, values, errors } = useFormValidation(
    INITIAL_STATE,
    validateCreatelink,
    handleCreateLink
  );

  function handleCreateLink() {
    if (!user) {
      props.history.push("/login");
    } else {
      const { url, description } = values;
      const newLink = {
        url,
        description,
        postBy: { id: user.uid, name: user.displayName },
        votes: [],
        comments: [],
        created: Date.now(),
      };
      firebase.db.collection("links").add(newLink);
      props.history.push("/");
    }
  }

  return (
    <form onSubmit={handleCreateLink} className="flex flex-column mt-3">
      <input
        name="description"
        onChange={handleChange}
        values={values.description}
        placeholder="A descripton to your link"
        autoComplete="off"
        type="text"
        className={errors.description && "error-input"}
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input
        name="url"
        onChange={handleChange}
        values={values.url}
        placeholder="This the url for the link"
        autoComplete="off"
        type="url"
        className={errors.url && "error-input"}
      />
      {errors.url && <p className="error-text">{errors.url}</p>}

      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default CreateLink;
