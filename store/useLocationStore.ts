import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export enum Location {
  NONE = '',
  MYRTLE_BEACH = 'Myrtle Beach',
}

interface LocationState {
  location: Location
  setLocation: (location: Location) => void
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      location: Location.NONE,
      setLocation: (location: Location) => set({ location }),
    }),
    {
      name: 'location-storage',
    }
  )
)
