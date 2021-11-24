export function formatQuestion(pertanyaan) {
    const regex = new RegExp("{{root_media}}", "g");
    const formated = pertanyaan.replace(regex, "");
    return formated;
}
