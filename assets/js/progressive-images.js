(function () {
  "use strict";

  var images = document.querySelectorAll("img[data-full-src]");

  function loadFullImage(image) {
    var fullSource = image.getAttribute("data-full-src");
    if (!fullSource || image.getAttribute("data-full-loading") === "true") return;

    image.setAttribute("data-full-loading", "true");

    var fullImage = new Image();
    fullImage.decoding = "async";
    fullImage.src = fullSource;

    var swapImage = function () {
      image.src = fullSource;
      image.removeAttribute("data-full-src");
      image.removeAttribute("data-full-loading");
    };

    if (typeof fullImage.decode === "function") {
      fullImage.decode().then(swapImage).catch(function () {
        if (fullImage.complete && fullImage.naturalWidth > 0) {
          swapImage();
        } else {
          fullImage.onload = swapImage;
        }
      });
    } else {
      fullImage.onload = swapImage;
    }
  }

  function scheduleUpgrade(image) {
    var upgrade = function () { loadFullImage(image); };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(upgrade, { timeout: 2000 });
    } else {
      window.setTimeout(upgrade, 250);
    }
  }

  Array.prototype.forEach.call(images, function (image) {
    if (image.complete && image.naturalWidth > 0) {
      scheduleUpgrade(image);
    } else {
      image.addEventListener("load", function () {
        scheduleUpgrade(image);
      }, { once: true });
    }
  });
}());
