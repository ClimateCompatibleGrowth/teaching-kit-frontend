import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'
import { getMatchingRow } from '../../repositories/zenodo-database'

type Request = NextApiRequest & {
  query: Query
}

type Query = {
  secret: string
  vuid: string
  version: string
}

export default async function getHandler(req: Request, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin:
      process.env.NEXT_PUBLIC_ENVIRONMENT === 'development'
        ? '*'
        : [`${process.env.STRAPI_API_DOMAIN}/*`],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
  if (req.query.secret !== process.env.GET_ZENODO_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  if (!req.query.vuid || !req.query.version) {
    return res
      .status(400)
      .json(
        `Expected a defined value for vuid + version in the url query. Got vuid: '${req.query.vuid}', version: '${req.query.version}'`
      )
  }

  const { vuid, version } = req.query

  try {
    const matchingRow = await getMatchingRow({
      id: vuid,
      version: parseInt(version),
    })
    return res.status(200).json(matchingRow)
  } catch (error) {
    console.info(
      `Unexpected error handling entry with strapi entry id '${vuid}' and strapi entry version '${version}'\n`,
      error
    )
    res.status(500).json({
      message: 'Something went wrong...',
    })
  }
}
