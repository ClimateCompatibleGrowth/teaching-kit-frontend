-- CreateTable
CREATE TABLE "zenodo_entry" (
    "id" TEXT NOT NULL,
    "strapi_entry_id" TEXT NOT NULL,
    "strapi_entry_version" INTEGER NOT NULL,
    "created_on_zenodo" TIMESTAMP(3) NOT NULL,
    "published_on_zenodo" TIMESTAMP(3) NOT NULL,
    "error" TEXT NOT NULL,

    CONSTRAINT "zenodo_entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zenodo_file" (
    "id" TEXT NOT NULL,
    "successfully_uploaded" TIMESTAMP(3) NOT NULL,
    "tries" INTEGER NOT NULL,
    "zenodo_entry" TEXT NOT NULL,
    "error" TEXT NOT NULL,

    CONSTRAINT "zenodo_file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zenodo_file" ADD CONSTRAINT "zenodo_file_zenodo_entry_fkey" FOREIGN KEY ("zenodo_entry") REFERENCES "zenodo_entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
