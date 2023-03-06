import corsMiddleware, { CorsOptions } from 'cors';

const options: CorsOptions = {
  origin(requestOrigin, callback) {
    callback(null, true)
  },
}

export const cors = corsMiddleware(options)
