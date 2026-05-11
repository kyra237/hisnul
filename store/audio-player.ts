import { create } from "zustand";

export type QariKey = "01" | "02" | "03" | "04" | "05" | "06";

export const QARI_LIST: Record<QariKey, string> = {
  "01": "Abdullah Al-Juhany",
  "02": "Abdul Muhsin Al-Qasim",
  "03": "Abdurrahman as-Sudais",
  "04": "Ibrahim Al-Dossari",
  "05": "Misyari Rasyid Al-Afasi",
  "06": "Yasser Al-Dosari",
};

export interface QueueItem {
  suratNomor: number;
  suratNamaLatin: string;
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  audio: Record<QariKey, string>;
}

interface AudioPlayerState {
  // State
  qari: QariKey;
  queue: QueueItem[];
  currentIndex: number;
  isPlaying: boolean;
  isLoading: boolean;

  // Actions
  setQari: (qari: QariKey) => void;
  playQueue: (items: QueueItem[], startIndex?: number) => void;
  playSingle: (item: QueueItem) => void;
  next: () => void;
  prev: () => void;
  togglePlay: () => void;
  stop: () => void;
}

// Audio instance lives outside React to avoid re-creation
let audio: HTMLAudioElement | null = null;

function getAudio(): HTMLAudioElement {
  if (!audio) audio = new Audio();
  return audio;
}

export const useAudioPlayer = create<AudioPlayerState>((set, get) => ({
  qari: "05",
  queue: [],
  currentIndex: 0,
  isPlaying: false,
  isLoading: false,

  setQari: (qari) => {
    const { queue, currentIndex, isPlaying } = get();
    set({ qari });
    if (queue.length > 0 && isPlaying) {
      const item = queue[currentIndex];
      const a = getAudio();
      // const wasTime = a.currentTime;
      a.src = item.audio[qari];
      a.load();
      a.currentTime = 0; // restart current ayat with new qari
      a.play().catch(() => {});
    }
  },

  playQueue: (items, startIndex = 0) => {
    const { qari } = get();
    const a = getAudio();
    set({
      queue: items,
      currentIndex: startIndex,
      isPlaying: true,
      isLoading: true,
    });

    a.src = items[startIndex].audio[qari];
    a.load();
    a.play().catch(() => {});

    a.oncanplay = () => set({ isLoading: false });

    a.onended = () => {
      const { queue, currentIndex } = get();
      const next = currentIndex + 1;
      if (next < queue.length) {
        const nextItem = queue[next];
        set({ currentIndex: next, isLoading: true });
        a.src = nextItem.audio[get().qari];
        a.load();
        a.play().catch(() => {});
      } else {
        set({ isPlaying: false, currentIndex: 0 });
      }
    };
  },

  playSingle: (item) => {
    get().playQueue([item], 0);
  },

  next: () => {
    const { queue, currentIndex, qari } = get();
    const nextIdx = currentIndex + 1;
    if (nextIdx >= queue.length) return;
    const a = getAudio();
    set({ currentIndex: nextIdx, isLoading: true });
    a.src = queue[nextIdx].audio[qari];
    a.load();
    a.play().catch(() => {});
  },

  prev: () => {
    const { queue, currentIndex, qari } = get();
    const prevIdx = currentIndex - 1;
    if (prevIdx < 0) return;
    const a = getAudio();
    set({ currentIndex: prevIdx, isLoading: true });
    a.src = queue[prevIdx].audio[qari];
    a.load();
    a.play().catch(() => {});
  },

  togglePlay: () => {
    const { isPlaying, queue, currentIndex, qari } = get();
    const a = getAudio();
    if (queue.length === 0) return;

    if (isPlaying) {
      a.pause();
      set({ isPlaying: false });
    } else {
      if (!a.src) {
        a.src = queue[currentIndex].audio[qari];
        a.load();
      }
      a.play().catch(() => {});
      set({ isPlaying: true });
    }
  },

  stop: () => {
    const a = getAudio();
    a.pause();
    a.src = "";
    set({ isPlaying: false, queue: [], currentIndex: 0 });
  },
}));
