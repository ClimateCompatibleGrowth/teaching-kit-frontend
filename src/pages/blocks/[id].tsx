import axios from "axios";
import LearningMaterial from "../../components/LearningMaterial";
import LearningMaterialEnding from "../../components/LearningMaterialEnding";
import { Block as BlockType} from "../../types";

 type props = { block: BlockType };

export default function Block({ block }: props) {
  return (
    <div className="container">
      <LearningMaterial
        Title={block.attributes.Title}
        Abstract={block.attributes.Abstract}
        LearningOutcomes={block.attributes.LearningOutcomes}
      />
      <LearningMaterialEnding
        References={block.attributes.References}
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

  const res = await axios.get(`${process.env.STRAPI_API_URL}/blocks`);
  const blocks = res.data.data;

  const paths = blocks.map((block: BlockType) => ({
    params: { id: block.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(ctx: any) {
  const res = await axios.get(
    `${process.env.STRAPI_API_URL}/blocks/${ctx.params.id}?populate=*`
  );
  const block = res.data.data;

  return {
    props: { block },
  };
}
