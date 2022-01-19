export function formatQuestion(pertanyaan) {
  const regex = new RegExp("{{root_media}}", "g");
  const regex2 = new RegExp("&quotes;", "g");
  let formated = pertanyaan.replace(
    regex,
    "http://app.gobimbelonline.net:8080/fileupload/banksoal"
  );
  let newPeretanyaan = formated.replace(regex2, '"');
  return newPeretanyaan;
}
