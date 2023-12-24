export async function getTemplate(path) {
  return fetch(path)
    .then((response) => response.text())
    .then((data) => {
      const template = data;
      //   template.innerHTML = data;
      return template;
    });
}
