(() => {
  const page = document.body.dataset.page;
  document.querySelectorAll("[data-page-link]").forEach((link) => {
    if (link.dataset.pageLink === page) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {
        // The guides still work online if service-worker registration is unavailable.
      });
    });
  }
})();
