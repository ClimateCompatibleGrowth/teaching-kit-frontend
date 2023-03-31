# NextJS

This documentation will not go through NextJS and what it is. In case you want to learn about that, you should head to [their website](https://nextjs.org/). However, there are some points which might be worth to mention briefly. These are covered below.

### The build step

Our pages are built on the server. `getStaticPath` on all pages define the routes (url) to all pages we know that we want to generate on the server. For lectures for instance, this means that we want to fetch all available lectures from Strapi, in all possible languages, combine them and create unique routes for them using an unique identifier (`locale` + `vuid`). Read more about `vuid` in the Strapi repo; `/docs/plugins/content-versioning-plugin.md`.

`getStaticProps`, on the other hand, is a function that is used to fetch data at build time for a specific page. This function is used when you want to pre-render a page with data that is fetched at build time, rather than at runtime. This helps us improve the performance of the Curriculum, as the page will be pre-rendered with data, rather than waiting for the data to be fetched when the page is loaded. In this step we care for more page data than just the `locale` and `vuid` (as in `getStaticPaths`). See more about "Strapi populate", which is used a lot in this function, in `/docs/strapi-api.md`. We also fetch the copy from Strapi in this stage.
