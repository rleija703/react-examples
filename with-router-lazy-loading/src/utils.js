export const convertToSlug = text => {
  return text.toLowerCase()
    .replace(/ /g,'-')
    .replace(/[^\w-]+/g,'');
}