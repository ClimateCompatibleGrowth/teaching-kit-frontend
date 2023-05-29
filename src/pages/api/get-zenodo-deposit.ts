import { Prisma } from '@prisma/client'
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

// See documentation in /docs/zenodo/design.md
export default async function getHandler(req: Request, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin:
      process.env.NEXT_PUBLIC_ENVIRONMENT === 'development'
        ? '*'
        : `${process.env.STRAPI_API_DOMAIN}`,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
  console.log(process.env.STRAPI_API_DOMAIN)
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
      `Encountered an error handling entry with strapi entry vuid '${vuid}' and strapi entry version '${version}'\n`
    )
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          error: `Did not find any entry matching strapi entry vuid: '${vuid}', and strapi entry version '${version}'`,
        })
      }
    }
    console.info(`\n`, error)
    res.status(500).json({
      message: 'Something went wrong...',
    })
  }
}
