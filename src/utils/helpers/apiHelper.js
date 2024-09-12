export function getIdFromUrl(url = "") {
  const { path } = new URL(url);
  const id = path.lastIndexOf("/") + 1;
  if (id === 0) {
    return "";
  }
  return pathname.substring(id);
}

export function validatePlantData(data) {
  let errors = {};
  if (!data.name || typeof data.name !== "string") {
    errors.name = "Plant has to have a name.";
  }
  if (!data.description || typeof data.description !== "string") {
    errors.description = "Plant has to have a valid description.";
  }
  if (!Number.isInteger(data.quantity)) {
    errors.quantity =
      "Plants has to have a quantity of atleast 0 as an Integer.";
  }
  console.log(errors);
  const hasErrors = Object.keys(errors).length > 0;
  return [errors, hasErrors];
}
