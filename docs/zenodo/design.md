# Zenodo API design

## Creation of a deposit

In Strapi, we have a webhook which listens to Publish events. It is called "Zenodo deposit" and can be viewed under Settings > Global Settings > Webhooks. It is triggered when any entry is published, and sends its payload to the endpoint URL specified in its settings. The endpoint is an API running in this app (the Next.js app); the zenodo-endpoint (`/src/pages/api/zenodo.ts`). The URL also contains a secret, which prevents some other actor to call our zenodo endpoint.

The first thing the Zenodo API does is to check that the secret is correct (matched against the secret stated in our environment variables). It then performs some validations on the request; it checks that the event was in fact "Publish", and that the body includes the published entry's model (course/lecture/block), and its `vuid` and `version`.

Then it performs a check against the database if the unique entry (key: vuid + version) already exists on Zenodo (if it has got the field `created_on_zenodo` and `zenodo_doi` we know for a fact that it has already been published). In case it does, we abort. In case the row either doesn't exist at all, or if it doesn't have values for the aforementioned values (which will happen if something has gone wrong during it's previous job), we continue.

If we continue, we upsert a row in the database, indicating that the job for the entry has started. After this, the job differs depending on the entry model. The continuing flow of each model is specified below.

### Creation of a Lecture Block

The block is fetched from Strapi by its `id` (which is unique between locales of the same entry. The only constant for the entry is its `vuid`). It's Zenodo metadata is generated from this response, and the deposit is then created on Zenodo with that metadata.

If the deposit creation is successful, we update the entry's row in our database, with information about when the deposit was created etc. We also save a reserved DOI which the deposit will get once it's published.

After this, we transform the Lecture Block's document (markdown content). We need to download static instances of each image in the document, put them in the Zenodo deposit, and update its reference in the document to the local, static version. This is required since it is insecure to reference our S3 image-URL:s because they might be incidentally changed by a Strapi editor (by changing name of the image or similar).

When the transformation is completed, the transformed document is uploaded as markdown to the deposit. If that is successful, all its images are uploaded to the deposit as well. If that also succeeds, the job is completed and the webhook gets a 200 response.

### Creation of a Lecture

First, we want to validate that the lecture is OK to upload. At the time of writing this (2023-03-27), it is required that the lecture has at least one child block which is already published on Zenodo.

To check this, the lecture is fetched from Strapi by its `id` (which is unique between locales of the same entry. The only constant for the entry is its `vuid`). We extract its child blocks, and query all of their corresponding database rows, to check if they have been published to Zenodo. In case we find more than one row that has a `zenodo_doi` value, we approve the validation and carry on. Else we throw a NoOperationError.

Similarly to the Lecture Block, the lecture's metadata is then generated from it's Strapi response. One main difference in the metadata is its relation to its child blocks. The lecture doesn't contain any document or images of its own, instead it refers to its child blocks. So from the validation earlier, we extract the DOI:s of each of the published child blocks, and create metadata references for these.

If the deposit creation is successful, we update the entry's row in our database, with information about when the deposit was created etc. We also save a reserved DOI which the deposit will get once it's published.

### Creation of a Course

//TODO - TBD

## Retrieval of a deposit

//TODO - TBD

## Manual troubleshooting

Keep in mind that if something goes wrong with the automated upload, we will not be notified about it automatically (as of 2023-03-27 at least). We return different response codes from the API, but the webhook doesn't about what it gets in response, it is only conserned about sending the request. So in case we notice that some Zenodo deposit has not been created properly, we will need to do some manual troubleshooting, which is explained in this section.

### Common errors

1. The Strapi entry doesn't fulfill Zenodo's requirements. For instance, Zenodo requires an upload to have at least one creator, so in case someone has forgotten to add an Author/LectureCreator/CourseCreator to the Strapi entry, the Zenodo creation will fail. The reason will show in the log of this API (the Next.js locally, and Vercel in production).
2. The entry has already been uploaded to Zenodo with that combination of vuid + version. In case it has, it won't work to unpublish + publish the entry to get a new upload, instead you have to create a new version in Strapi and publish the new version.

### How to do it

As explained above, the API logs a few key events along the way of uploading. When starting to troubleshoot, you can start to check Vercel's logs (https://vercel.com/climate-compatible-growth/teaching-kit-frontend/logs) which shows the logs for the past hour. In case the issue occured before that, you can view the saved logs on Axiom, accessible from Vercel's Settings > Log Drains. The logs should clearly indicate each important step of the process, and contain some identifier of the Strapi/Zenodo instance.

In case you don't know for sure when the issue occured, you can try to manually call the endpoint again. Either you unpublish+publish the entry on Strapi, which will trigger the webhook again, or you can call the endpoint directly through e.g `curl` or Postman. See more about how to call the endpoint directly under "Calling the endpoint manually", later in this document.

After you've been able to reproduce the issue, you will see in the logs what has went wrong. Likely you will see a few info logged, followed by a thrown error with some additional information about what's gone wrong. Some common errors are mentioned above in the "Common errors" section.

You can also look in the database to see how long the entry has come in the process. In case it doesn't even have a row in the database, the logs should reveal that something has been invalidated early in the endpoint's service. If it has got a row, but doesn't have a `zenodo_doi` for instance, it means that something has gone wrong after having created the deposit.

#### Calling the endpoint manually

The request that the webhook makes is explained in this section, which is useful when you want to call the endpoint from e.g Postman. The endpoint looks like this: `{{nextjs_domain}}/api/zenodo?secret={{zenodo_endpoint_secret}}`, where `nextjs_domain` is the URL of the Next project (localhost:3000 locally, and the curriculum website in production), and `secret` is the query parameter secret in the URL under Settings > Global Settings > Webhooks > Zenodo Deposit (expected value can be found in this Next.js-project's environment variable; `ZENODO_PUBLISH_SECRET`).
The request should contain a JSON body in the following format:

```
{
    "model": <"block" or "lecture" or "course">,
    "entry": {
        "vuid": <vuid>,
        "id": <id>,
        "versionNumber": <version>
    }
}
```

Where:

- `vuid` can be found as "uuid" in the side panel of the Strapi entry (only visible if the entry has a saved version)
- `id` can be found in the URL when browsing the entry in the Strapi panel (e.g "(...)admin/content-manager/collectionType/api::block.block/<id>")
- `version` can be found in the Version side panel of the Strapi entry
