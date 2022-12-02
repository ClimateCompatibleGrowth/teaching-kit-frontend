import axios from "axios";
import Blocks from "../../components/Blocks";

export default function Lecture({ lecture }: any) {
  console.log("lecture: ", lecture);
  
  return (
    <div className="container">
      <h1>{lecture.attributes.Title}</h1>
      {lecture.attributes.blocks && <Blocks blocks={lecture.attributes.blocks.data} /> }
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

  const res = await axios.get(`${process.env.STRAPI_API_URL}lectures`);
  const lectures = res.data.data;

  const paths = lectures.map((lecture: any) => ({
    params: { id: lecture.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(ctx: any) {
  const res = await axios.get(
    `${process.env.STRAPI_API_URL}lectures/${ctx.params.id}?populate=*`
  );
  console.log("res: ", res);
  const lecture = res.data.data;
  

  return {
    props: { lecture },
  };
}
