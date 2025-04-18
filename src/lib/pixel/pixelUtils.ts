const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID
const isBrowser = typeof window !== 'undefined'
let pixelInstance: any = null

export async function initializePixel() {
  if (!isBrowser) {
    return null
  }
  if (pixelInstance) {
    return pixelInstance
  }
  if (!PIXEL_ID) {
    return null
  }

  try {
    const ReactPixelModule = await import('react-facebook-pixel')
    const ReactPixel = ReactPixelModule.default
    const options = {
      autoConfig: true,
      debug: process.env.NODE_ENV !== 'production',
    }
    ReactPixel.init(PIXEL_ID, undefined, options)
    pixelInstance = ReactPixel
    return pixelInstance
  }
  catch (error) {
    return null
  }
}
