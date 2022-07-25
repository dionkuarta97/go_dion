export function capitalizeFirstLetter(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}

export const singkatNama = (str, length) => {
  const lgt = length ? length : 15;
  if (str !== undefined) {
    if (str.length >= lgt) {
      return str.substr(0, lgt) + "...";
    }
  }

  return str;
};
