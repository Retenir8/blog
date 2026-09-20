// Shared as a plain server-safe string; do not export this from a client component.
export const themeScript =
  "try{document.documentElement.dataset.theme=localStorage.getItem('blog-theme')==='night'?'night':'day'}catch(e){document.documentElement.dataset.theme='day'}";
