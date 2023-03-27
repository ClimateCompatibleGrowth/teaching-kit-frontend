# Setup

As stated in `/docs/zenodo/design.md`, the Zenodo workflow includes writing and reading to a postgres database, to keep track of the uploading process of each entity. To test this locally, you have to setup your own postgres instance locally.

## Database setup

Create a new database in your psql client. You can use the `zenodo-datadump.sql` in the same directory as this markdown file. It includes some example data, but these can be removed. You create the database from the dump by running `psql zenodo < dumpfile`.
After this, the only thing that should be needed is to run `npx prisma generate`, and start running the Zenodo flow. When you've performed some action that should write to the database (for instance published a (valid) block), there should be a new row in the database, representing that entry's status.
