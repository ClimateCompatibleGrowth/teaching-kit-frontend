import axios from "axios";
import Link from "next/link";
import styles from '../../styles/PageBlocks.module.css'

export type lecture = {
  id: number;
  attributes: {
    Title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    vuid: string;
    versionNumber: number;
    isVisibleInListView: boolean;
  };
};

export default function Lectures({ lectures }: any) {
  return (
    <div className="container">
      <h1>Lectures</h1>
      <ul className={styles.ul}>
        {lectures.map((lecture: lecture) => (
          <li key={lecture.id} className={styles.li}>
            <Link href={`/lectures/${encodeURIComponent(lecture.id)}`}>
              <h2>{lecture.attributes.Title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const res = await axios.get(`${process.env.STRAPI_API_URL}lectures`);
  const lectures = res.data.data;

  return {
    props: { lectures },
  };
}
