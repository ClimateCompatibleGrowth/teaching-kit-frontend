import axios from "axios";
import Link from "next/link";
import { Course } from "../../types";
import styles from '../../styles/LearningMaterial.module.css'


type props = { courses: Course[] };

export default function Courses({ courses }: props ) {
  return (
    <div className="container">
      <h1>Courses</h1>
      <ul className={styles.ul}>
        {courses.map((course: Course) => (
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
  const res = await axios.get(`${process.env.STRAPI_API_URL}/courses`);
  const courses = res.data.data;

  return {
    props: { courses },
  };
}
