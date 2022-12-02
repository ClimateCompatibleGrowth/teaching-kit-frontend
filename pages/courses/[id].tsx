import axios from "axios";
import { useState } from "react";
// import { Course, Lecture } from "../../src/types";
import styles from "../../styles/Course.module.css";
import styles2 from "../../styles/Blocks.module.css";

export default function Course({ course }: any) {
  const [showLectures, setShowLectures] = useState(false);
  console.log("Course: ", course);

  return (
    <div className="container">
      <div className={styles.courseOverviewContainer}>
        <h1 className={styles.h1}>{course.attributes.Title}</h1>
        <h2>Abstract</h2>
        <p>{course.attributes.abstract}</p>
        <h2>Learning Outcomes</h2>
        <p>{course.attributes.learningOutcomes}</p>
        <h2>Prerequisites</h2>
        <p>{course.attributes.prerequisites}</p>
        <h2
          className={styles2.title}
          onClick={() => setShowLectures(!showLectures)}
        >
          Course Content
        </h2>
        {showLectures && (
          <ul>
            {course?.attributes.lectures.map((lecture: any) => (
              <li key={lecture.id} className={styles2.li}>
                {lecture.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.metaDataContainer}>
      </div>
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

  const res = await axios.get(`${process.env.STRAPI_API_URL}course`);
  const courses = res.data.data;

  const paths = courses.map((course: any) => ({
    params: { id: course.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(ctx: any) {
  const res = await axios.get(
    `${process.env.STRAPI_API_URL}courses/${ctx.params.id}`
  );
  const course = res.data.data;
  course.attributes.abstract =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  course.attributes.difficulty = "Easy";
  course.attributes.duration = "6h";
  course.attributes.author = {
    name: "Olof Berg Marklund",
    affiliation: "Frank Digital",
    email: "olof.marklund@frankdigital.se",
  };
  course.attributes.prerequisites = "HTML, React";
  course.attributes.learningOutcomes =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  course.attributes.lectures = [
    {
      title: "React",
    },
    {
      title: "Lecture 2",
    },
    {
      title: "Lecture 3",
    },
  ];

  return {
    props: { course },
  };
}
