import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get('Langugae')?.value

  let response = new NextResponse()
  if (cookie) {
    response.headers.set('Langugae', `${cookie}`)
    console.log(response)
    return response
  } else {
    return
  }
}
