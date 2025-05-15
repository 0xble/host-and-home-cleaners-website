const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const isBrowser = typeof window !== 'undefined'
let pixelInstance: any = null

export async function initializePixel() {
  if (!isBrowser) {
    return null
  }
  const ReactPixelModule = await import('react-facebook-pixel')
  const ReactPixel = ReactPixelModule.default
  if (pixelInstance != null) {
    return pixelInstance as typeof ReactPixel
  }
  if (PIXEL_ID == null) {
    return null
  }

  try {
    const options = {
      autoConfig: true,
      debug: process.env.VERCEL_ENV !== 'production',
    }
    ReactPixel.init(PIXEL_ID, undefined, options)
    pixelInstance = ReactPixel
    return pixelInstance as typeof ReactPixel
  }
  catch (error) {
    return null
  }
}
