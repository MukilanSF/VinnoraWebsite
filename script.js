const blogContainer = document.getElementById("blog-container");
const template = document.getElementById("blog-card-template");

const BLOG_FEED_URL = "https://vinnorasalesforce.blogspot.com/feeds/posts/default?alt=json";

fetch(BLOG_FEED_URL)
  .then((res) => res.json())
  .then((data) => {
    const entries = data.feed.entry;

    entries.slice(0, 6).forEach((entry) => {
      const title = entry.title.$t;
      const summary = entry.summary?.$t || "Read more...";
      const link = entry.link.find((l) => l.rel === "alternate").href;

      // Try to get thumbnail
      const thumbnail = entry.media$thumbnail?.url || "https://via.placeholder.com/600x300";

      const card = template.content.cloneNode(true);
      card.querySelector("a").href = link;
      card.querySelector("img").src = thumbnail;
      card.querySelector("h3").textContent = title;
      card.querySelector("p").innerHTML = summary.slice(0, 100) + "...";

      blogContainer.appendChild(card);
    });
  })
  .catch((err) => {
    console.error("Failed to fetch blog posts:", err);
    blogContainer.innerHTML = "<p>Unable to load blog posts. Please try again later.</p>";
  });