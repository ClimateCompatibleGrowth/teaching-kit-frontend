# Strapi

Although the bulk part of the Strapi project documentation belongs over in the backend repository, I think some of the client side communication with Strapi fits in the documentation of this repository.

### Strapi populate

In `getStaticProps`, we need everything from the base content (Abstract, Document (...)), which can be regarded as data on depth 0. We also need some data at deeper positions however. For instance, a block needs to access its LectureCreators (depth 1, since it is a Relation), and even its child Blocks' Authors (deph 3, since it is a relation's relation). Courses even need e.g its child Lectures' child Blocks' Authors, which is on depth 3.

All of this "depth" concept is coming from Strapi, which saves operational power by preventing anything deeper than 0 to not be included in their API responses by default. To get deeper responses you have to use the [population](https://docs.strapi.io/dev-docs/api/rest/populate-select) API query parameter. You can see a lot of examples of how the `populate` query parameter can be used throughout the app; among other places in the `getStaticProps` method.
There are also TypeScript types for each of the responses of various depths in `src/types/index.ts`. These are not perfect in the sense that the code might state that something is e.g CourseThreeLevelsDeep, although it really only has a subset of all relations of depth 3 from Course. While this hasn't caused any bugs/confusion this far in development, I'm sure the TypeScript types can be improved and be made more specific.
