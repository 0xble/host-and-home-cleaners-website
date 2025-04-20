export class GoogleMapsLoader {
  private static instance: GoogleMapsLoader;
  private loadPromise: Promise<void> | null = null;

  private constructor() {}

  public static getInstance(): GoogleMapsLoader {
    if (!GoogleMapsLoader.instance) {
      GoogleMapsLoader.instance = new GoogleMapsLoader();
    }
    return GoogleMapsLoader.instance;
  }

  private isFullyLoaded(): boolean {
    return typeof window !== 'undefined'
      && window.google
      && window.google.maps
      && typeof window.google.maps.Map === 'function'
      && typeof window.google.maps.places?.Autocomplete === 'function';
  }

  public load(): Promise<void> {
    // If script is already loaded and initialized, resolve immediately
    if (this.isFullyLoaded()) {
      return Promise.resolve();
    }

    // If already loading, return existing promise
    if (this.loadPromise) {
      return this.loadPromise;
    }

    // Start new load
    this.loadPromise = new Promise((resolve, reject) => {
      try {
        // Define callback for Google Maps
        const callbackName = '__googleMapsApiOnLoadCallback';
        (window as any)[callbackName] = () => {
          // Wait a small tick to ensure all components are initialized
          setTimeout(() => {
            if (this.isFullyLoaded()) {
              delete (window as any)[callbackName];
              resolve();
            } else {
              delete (window as any)[callbackName];
              this.loadPromise = null;
              reject(new Error('Google Maps failed to fully initialize'));
            }
          }, 100);
        };

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async&callback=${callbackName}`;
        script.async = true;
        script.defer = true;

        script.onerror = (error) => {
          delete (window as any)[callbackName];
          this.loadPromise = null;
          reject(error);
        };

        document.head.appendChild(script);
      } catch (error) {
        this.loadPromise = null;
        reject(error);
      }
    });

    return this.loadPromise;
  }
}