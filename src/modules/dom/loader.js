const LOADER = document.querySelector("#loader");

const showLoader = () => {
  LOADER.style.display = "block";
};

const hideLoader = () => {
  LOADER.style.display = "none";
};

export const loadRequest = (request, ...args) => {
  showLoader();

  return request(...args).then(data => {
    hideLoader();
    return data;
  });
};
