"use client";

import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlayIcon, PauseIcon } from "@hugeicons/core-free-icons";
import { useAudioPlayer, QueueItem } from "@/store/audio-player";
import { AyatRange } from "equran";

interface Props {
  allAyats: AyatRange[];
}

export function PlayAllButton({ allAyats }: Props) {
  const { isPlaying, queue, playQueue, togglePlay } = useAudioPlayer();

  // Flatten semua ayat dari semua surah
  const flatQueue: QueueItem[] = allAyats.flatMap((data) =>
    data.ayat.map((ayat) => ({
      suratNomor: data.suratNomor,
      suratNamaLatin: data.suratNamaLatin,
      nomorAyat: ayat.nomorAyat,
      teksArab: ayat.teksArab,
      teksLatin: ayat.teksLatin,
      audio: ayat.audio as QueueItem["audio"],
    })),
  );

  const isPlayingAll = isPlaying && queue.length === flatQueue.length;

  function handleClick() {
    if (isPlayingAll) {
      togglePlay();
    } else {
      playQueue(flatQueue, 0);
    }
  }

  return (
    <Button onClick={handleClick} className="gap-2">
      <HugeiconsIcon icon={isPlayingAll ? PauseIcon : PlayIcon} size={16} />
      {isPlayingAll ? "Pause Semua" : "Play Semua Ruqyah"}
    </Button>
  );
}
