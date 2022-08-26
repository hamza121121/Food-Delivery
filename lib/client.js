import SanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";
export const client = SanityClient({
  projectId: "lpm1x9a5",
  dataset: "production",
  apiVersion: "2021-08-31",
  useCdn: true,
  token:
    "skkVdJqRrSnmlC4WE9jKoMpT59gflaInZ6xYqhuIjFPyPuU3WjTsNWCAVWW1XyMlopjvULXe1ffr0Dk3Kj1cMmIVD0q9XNiQYVWbGkEPJzF5ZDlbce2QfGWThW3M9NZVVlJLksLmv9jRDEX2sWstmgeufyTBW7cJQGcsjzW5jqORoj4z5x0z",
});
const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
