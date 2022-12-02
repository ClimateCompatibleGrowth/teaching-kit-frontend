import axios from "axios";
import { Lecture as LectureType } from "../../types";
import Blocks from "../../components/Blocks";
import LearningMaterial from "../../components/LearningMaterial";
import LearningMaterialEnding from "../../components/LearningMaterialEnding";

type props = { lecture: LectureType };
export default function Lecture({ lecture }: props) {

  return (
    <div className="container">
      <LearningMaterial
        Title={lecture.attributes.Title}
        Abstract={lecture.attributes.Abstract}
        LearningOutcomes={lecture.attributes.LearningOutcomes}
      />
      <h2>Lecture content</h2>
      {lecture.attributes.Blocks && (
        <Blocks blocks={lecture.attributes.Blocks.data} />
      )}
      <LearningMaterialEnding
        Acknowledgment={lecture.attributes.Acknowledgement}
        CiteAs={lecture.attributes.CiteAs}
      />
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

  const res = await axios.get(`${process.env.STRAPI_API_URL}/lectures`);
  const lectures = res.data.data;

  const paths = lectures.map((lecture: LectureType) => ({
    params: { id: lecture.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(ctx: any) {
  const res = await axios.get(
    `${process.env.STRAPI_API_URL}/lectures/${ctx.params.id}?populate=*`
  );
  const lecture = res.data.data;

  return {
    props: { lecture },
  };
}
