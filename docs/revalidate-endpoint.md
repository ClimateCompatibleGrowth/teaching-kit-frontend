# The Revalidate endpoint

The revalidate endpoint is used by the Strapi webhook which is triggered as soon as any entry/media is changed. The endpoint simply takes the info sent by the webhook (`vuid` and `model`), attempts to figure out its route (similar to what is done in `getStaticPaths`, see `/docs/nextjs`), and then [revalidates it](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration). This triggers the route to be rebuilt even though the server didn't restart (or rebuild the whole site), which makes our change to be reflected on the site within seconds.
Note that this does not take locales into consideration, and hence does not work with translated pages (it instead resorts to Regular Revalidation, see heading below). This is because I was not able to find a way to get this working when I looked into it in February 2023.

### Regular revalidation

Changes that do not relate to a specific page per se (for instance an image or a Level) will see its changes reflected after 60 seconds (at the time of writing - 2023-03-31). This is specified in each page's `getStaticProps` function, see the `revalidate` field in the return object. You can [read more about revalidations here](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration).
