export const stripHtmlTags = (text: string) => {
  return text.replace(/<[^>]*>?/gm, "");
};
