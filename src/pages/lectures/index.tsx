import axios from 'axios'
import Link from 'next/link'
import { Data, Lecture } from '../../types'
import styles from '../../styles/LearningMaterial.module.css'

type props = { lectures: Data<Lecture>[] }

export default function Lectures({ lectures }: props) {
  return (
    <div className="container">
      <h1>Lectures</h1>
      <ul className={styles.ul}>
        {lectures.map((lecture) => (
          <li key={lecture.id} className={styles.li}>
            <Link href={`/lectures/${encodeURIComponent(lecture.id)}`}>
              <h2>{lecture.attributes.Title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  const res = await axios.get(`${process.env.STRAPI_API_URL}/lectures`)
  const lectures = res.data.data

  return {
    props: { lectures },
  }
}
