import axios from "axios";
import Link from "next/link";
import styles from '../../styles/PageBlocks.module.css'

export type course = {
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

export default function Courses({ courses }: any) {
  return (
    <div className="container">
      <h1>Courses</h1>
      <ul className={styles.ul}>
        {courses.map((course: course) => (
          <li key={course.id} className={styles.li}>
            <Link href={`/courses/${encodeURIComponent(course.id)}`}>
              <h2>{course.attributes.Title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const res = await axios.get(`${process.env.STRAPI_API_URL}courses`);
  const courses = res.data.data;

  return {
    props: { courses },
  };
}
