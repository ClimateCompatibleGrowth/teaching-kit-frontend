--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6 (Homebrew)
-- Dumped by pg_dump version 14.6 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: nextjs
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO nextjs;

--
-- Name: zenodo_entry; Type: TABLE; Schema: public; Owner: nextjs
--

CREATE TABLE public.zenodo_entry (
    id text DEFAULT public.uuid_generate_v1() NOT NULL,
    strapi_entry_id text NOT NULL,
    strapi_entry_version integer NOT NULL,
    created_on_zenodo timestamp(3) without time zone,
    zenodo_deposit_id integer,
    row_added timestamp(3) without time zone NOT NULL,
    type text NOT NULL,
    zenodo_doi character varying
);


ALTER TABLE public.zenodo_entry OWNER TO nextjs;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: nextjs
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
2bfba546-615f-49ee-a81b-f28f36b7b9c4	4cd075c1fd991f02ef199345e8c930cdc648a7a6b5878ae3ca5f35c449ea8cac	2023-02-27 15:34:16.543985+01	20230227143416_	\N	\N	2023-02-27 15:34:16.535103+01	1
\.


--
-- Data for Name: zenodo_entry; Type: TABLE DATA; Schema: public; Owner: nextjs
--

COPY public.zenodo_entry (id, strapi_entry_id, strapi_entry_version, created_on_zenodo, zenodo_deposit_id, row_added, type, zenodo_doi) FROM stdin;
874e3f66-3952-479b-812b-c632f3a41add	6597288d-1685-40a7-ab27-619ee56c25cf	11	2023-03-23 10:05:54.922	7763063	2023-03-23 10:05:54.5	BLOCK	\N
6e5d9182-5672-4418-88fa-93c6c12a1747	6597288d-1685-40a7-ab27-619ee56c25cf	12	2023-03-23 10:27:14.395	7763131	2023-03-23 10:20:47.556	BLOCK	\N
3ab54973-51e2-4566-b807-0971a8d06ea8	6597288d-1685-40a7-ab27-619ee56c25cf	13	2023-03-23 10:47:40.725	7763190	2023-03-23 10:44:45.243	BLOCK	\N
ccb64fb7-e308-4243-a7dc-afa8a03f0288	6597288d-1685-40a7-ab27-619ee56c25cf	14	2023-03-23 10:50:51.104	7763204	2023-03-23 10:50:50.845	BLOCK	\N
de3a8c6c-af64-4651-9ec4-6b902bd17ab6	6597288d-1685-40a7-ab27-619ee56c25cf	15	2023-03-23 10:52:17.031	7763218	2023-03-23 10:52:16.663	BLOCK	\N
309853af-e132-4a75-a9ce-9d4370b90b15	6597288d-1685-40a7-ab27-619ee56c25cf	16	2023-03-24 09:38:49.013	7766476	2023-03-24 09:38:48.635	BLOCK	\N
cb098aa8-ca89-405b-b571-2722d8e107fb	6597288d-1685-40a7-ab27-619ee56c25cf	17	2023-03-24 11:25:11.868	7766886	2023-03-24 11:20:22.39	BLOCK	10.5281/zenodo.7766886
e35629a7-e4ed-42a3-afab-77bd5ccddb58	c3b5d973-e77e-4f4d-b28c-780e5eb72fc3	4	2023-03-24 14:36:58.555	7767457	2023-03-24 14:16:32.1	BLOCK	10.5281/zenodo.7767457
cbdb7b7e-f259-4eb9-92f6-5b857c667bbb	f0d4a0db-d6be-4c0f-b556-f1d6ac2da1b7	2	2023-03-24 14:42:50.026	7767480	2023-03-24 14:12:22.574	LECTURE	10.5281/zenodo.7767480
b68ff790-dcff-4405-b80f-aad3947b2cb0	5f27a3a1-4ba7-4c03-9b0c-df8ba30b7acf	1	2023-03-27 08:04:37.114	7773585	2023-03-27 08:04:36.761	BLOCK	10.5281/zenodo.7773585
0b97fc0b-55e8-49b4-94c1-15bc8e3f50e3	48f72c0f-35ed-40b5-881b-4ecb3c9f6d77	1	2023-03-27 08:05:40.574	7773596	2023-03-27 08:04:24.333	LECTURE	10.5281/zenodo.7773596
c1e15439-2d6e-48b8-bb7f-45171b0fa9a4	48f72c0f-35ed-40b5-881b-4ecb3c9f6d77	2	2023-03-27 08:11:16.28	7773612	2023-03-27 08:11:15.986	LECTURE	10.5281/zenodo.7773612
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: nextjs
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: zenodo_entry zenodo_entry_pkey; Type: CONSTRAINT; Schema: public; Owner: nextjs
--

ALTER TABLE ONLY public.zenodo_entry
    ADD CONSTRAINT zenodo_entry_pkey PRIMARY KEY (id);


--
-- Name: zenodo_entry zenodo_entry_strapi_entry_id_strapi_entry_version_key; Type: CONSTRAINT; Schema: public; Owner: nextjs
--

ALTER TABLE ONLY public.zenodo_entry
    ADD CONSTRAINT zenodo_entry_strapi_entry_id_strapi_entry_version_key UNIQUE (strapi_entry_id, strapi_entry_version);


--
-- PostgreSQL database dump complete
--

