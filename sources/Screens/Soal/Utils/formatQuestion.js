export function formatQuestion(pertanyaan) {
  const regex = new RegExp("{{root_media}}", "g");
  const regex2 = new RegExp("&quotes;", "g");

  let formated = pertanyaan.replace(
    regex,
    "https://app.gobimbelonline.net/fileupload/banksoal"
  );
  let newPeretanyaan = formated.replace(regex2, '"');
  return newPeretanyaan;
}
