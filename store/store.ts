import { createStore } from 'zustand'


type ImagesStoreState = {
    images: string[],
}

type ImagesStoreActions = {
    setImages: (nextPosition: ImagesStoreState['images']) => void;
    removeAllImages: () => void;
}

type ImagesStore = ImagesStoreState & ImagesStoreActions

const ImagesStore = createStore<ImagesStore>()((set) => ({
  images: [],
  setImages: (newImages: string[]) => set({ images: newImages }),
  removeAllImages: () => set({ images: [] }),
}))

export default ImagesStore