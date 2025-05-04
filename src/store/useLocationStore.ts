import type { Location } from '@/lib/types'
import { create } from 'zustand'

import { persist } from 'zustand/middleware'

export interface LocationState {
  location: Location | null
  setLocation: (_location: LocationState['location']) => void
}

export const useLocationStore = create<LocationState>()(
  persist(
    set => ({
      location: null as LocationState['location'],
      setLocation: (location: LocationState['location']) => {
        set({ location })
      },
    }),
    {
      name: 'location-storage',
    },
  ),
)
