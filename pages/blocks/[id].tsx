import axios from "axios";
import { block } from ".";
import ReactMarkdown from "react-markdown";

export default function Block({ block }: any) {
  return (
    <div className="container">
      <h1>{block.attributes.Title}</h1>
      <ReactMarkdown>{block.attributes.Slides}</ReactMarkdown>
    </div>
  );
}

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const res = await axios.get(`${process.env.STRAPI_API_URL}blocks`);
  const blocks = res.data.data;

  const paths = blocks.map((block: block) => ({
    params: { id: block.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(ctx: any) {
  const res = await axios.get(
    `${process.env.STRAPI_API_URL}blocks/${ctx.params.id}`
  );
  const block = res.data.data;

  return {
    props: { block },
  };
}
