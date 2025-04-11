const CACHE_NAME = "image-cache-v1";
const IMAGE_URLS = [
  "/parallax_bg/bg_0.jpg",
  "/parallax_bg/bg_1.png",
  "/parallax_bg/bg_2.png",
  "/parallax_bg/bg_3.png",
  "/tech_bg/tech_light_bg.jpg",
  "/tech_bg/tech_dark_bg.jpg",
  "/tech_bg/city_mask.svg",
  "/tech_bg/city_lines.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(IMAGE_URLS);
    })
  );
});
