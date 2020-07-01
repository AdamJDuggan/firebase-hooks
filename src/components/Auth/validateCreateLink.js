export default function validateCreateLink(values) {
  let errors = {};

  // Description Errors
  if (!values.description) {
    errors.description = "Description required";
  } else if (values.description.length < 10) {
    errors.password = "Description must be at least 10 characters";
  }

  // Url Errors
  if (!values.url) {
    errors.url = "URL required";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = "Must be a valid URL";
  }

  return errors;
}
