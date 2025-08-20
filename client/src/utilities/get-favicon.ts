// Returns the Google favicon service URL for the given domain at 128px size
const getFavicon = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export default getFavicon;
