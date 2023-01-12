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

export const formatEmail = (email) => {
  const emailReg = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.){1,2}[a-zA-Z]{2,}))$/
  );
  if (emailReg.test(email)) {
    return true;
  } else {
    return false;
  }
};

export function passwordValidations(text) {
  let validasi = {
    valid: true,
    error: [],
  };
  if (text.length < 8) {
    validasi.valid = false;
    validasi.error.push("Password minimal 8 karakter");
  }
  if (!text.match(new RegExp("[A-Z]"))) {
    validasi.valid = false;
    validasi.error.push("Password harus mengandung huruf besar");
  }
  if (!text.match(new RegExp("[a-z]"))) {
    validasi.valid = false;
    validasi.error.push("Password harus mengandung huruf kecil");
  }
  if (text.search(/[0-9]/) < 0) {
    validasi.valid = false;
    validasi.error.push("Password harus mengandung angka");
  }
  return validasi;
}

export function checkNomor(str) {
  let temp = true;
  var pattern = /^\d+\.?\d*$/;
  if (!pattern.test(str)) temp = false;
  for (const key in str) {
    if (str[key] === " ") {
      temp = false;
      break;
    }
  }

  if (str.length < 10) temp = false;
  return temp;
}
