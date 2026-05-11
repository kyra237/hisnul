"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlayIcon,
  PauseIcon,
  VolumeHighIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { Amiri_Quran } from "next/font/google";
import { AyatRange } from "equran";
import { useAudioPlayer, QueueItem } from "@/store/audio-player";

const amiri = Amiri_Quran({ subsets: ["arabic"], weight: "400" });

function toQueueItems(data: AyatRange): QueueItem[] {
  return data.ayat.map((ayat) => ({
    suratNomor: data.suratNomor,
    suratNamaLatin: data.suratNamaLatin,
    nomorAyat: ayat.nomorAyat,
    teksArab: ayat.teksArab,
    teksLatin: ayat.teksLatin,
    audio: ayat.audio as QueueItem["audio"],
  }));
}

export function AyatCard({ data }: { data: AyatRange }) {
  const { queue, currentIndex, isPlaying, playQueue, togglePlay } =
    useAudioPlayer();

  const items = toQueueItems(data);

  // Is this surah currently playing?
  const isSurahActive =
    queue.length > 0 &&
    queue[currentIndex]?.suratNomor === data.suratNomor &&
    items.some((i) => i.nomorAyat === queue[currentIndex]?.nomorAyat);

  function handlePlaySurah() {
    if (isSurahActive) {
      togglePlay();
    } else {
      playQueue(items, 0);
    }
  }

  function handlePlayAyat(ayatIndex: number) {
    const item = items[ayatIndex];
    const isThisAyat =
      queue[currentIndex]?.nomorAyat === item.nomorAyat &&
      queue[currentIndex]?.suratNomor === item.suratNomor;

    if (isThisAyat) {
      togglePlay();
    } else {
      // Play from this ayat to end of surah
      playQueue(items, ayatIndex);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.suratNamaLatin}</CardTitle>
        <CardDescription>
          Ayat {data.fromAyat}
          {data.fromAyat !== data.toAyat && ` – ${data.toAyat}`}
        </CardDescription>
        <CardAction>
          <Button
            variant={isSurahActive && isPlaying ? "default" : "outline"}
            onClick={handlePlaySurah}
            size="sm"
          >
            <HugeiconsIcon
              icon={isSurahActive && isPlaying ? PauseIcon : PlayIcon}
              size={16}
            />
            {isSurahActive && isPlaying ? "Pause" : "Play Surah"}
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-12">
        {data.ayat.map((ayat, idx) => {
          const isActiveAyat =
            isPlaying &&
            queue[currentIndex]?.nomorAyat === ayat.nomorAyat &&
            queue[currentIndex]?.suratNomor === data.suratNomor;

          return (
            <div
              key={ayat.nomorAyat}
              className={cn(
                "space-y-6 rounded-lg p-4 -mx-4 transition-colors",
                isActiveAyat && "bg-primary/5 border border-primary/20",
              )}
            >
              {/* Ayat number + play button */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handlePlayAyat(idx)}
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors",
                    isActiveAyat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-primary hover:text-primary-foreground",
                  )}
                  title={isActiveAyat && isPlaying ? "Pause" : "Play ayat ini"}
                >
                  {isActiveAyat && isPlaying ? (
                    <HugeiconsIcon icon={VolumeHighIcon} size={14} />
                  ) : (
                    ayat.nomorAyat
                  )}
                </button>
              </div>

              <p
                className={cn(
                  "text-right text-2xl leading-loose font-semibold",
                  amiri.className,
                )}
                dir="rtl"
              >
                {ayat.teksArab}
              </p>
              <p className="text-sm italic text-muted-foreground">
                {ayat.teksLatin}
              </p>
              <p className="text-sm">{ayat.teksIndonesia}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
