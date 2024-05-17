import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = {
  searchTerm: string;
  updateSearch: (searchTerm: string) => void;
};

const useCourseSearch = create<Store>()(
  persist(
    (set) => ({
      searchTerm: "",
      updateSearch: (searchTerm) => set({ searchTerm }),
    }),
    { name: "course-search", storage: createJSONStorage(() => sessionStorage) }
  )
);

export { useCourseSearch };
