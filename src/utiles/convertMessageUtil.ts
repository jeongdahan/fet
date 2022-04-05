const convertMessage = (html: string) => {
  const el = document.createElement("DIV");

  el.innerHTML = html;
  return el.textContent || el.innerText || "";
};

export { convertMessage };
