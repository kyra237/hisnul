"use client";

import { useAudioPlayer, QARI_LIST, QariKey } from "@/store/audio-player";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlayIcon,
  PauseIcon,
  NextIcon,
  PreviousIcon,
  Cancel01Icon,
  VolumeHighIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AudioPlayerBar() {
  const {
    queue,
    currentIndex,
    isPlaying,
    isLoading,
    qari,
    setQari,
    togglePlay,
    next,
    prev,
    stop,
  } = useAudioPlayer();

  if (queue.length === 0) return null;

  const current = queue[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < queue.length - 1;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 shadow-lg">
      <div className="mx-auto max-w-3xl px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Track info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {current.suratNamaLatin}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Ayat {current.nomorAyat} · {current.teksArab.slice(0, 30)}…
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={prev}
              disabled={!hasPrev}
              className="h-8 w-8"
            >
              <HugeiconsIcon icon={PreviousIcon} size={16} />
            </Button>

            <Button
              size="icon"
              onClick={togglePlay}
              disabled={isLoading}
              className="h-9 w-9 rounded-full"
            >
              {isLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <HugeiconsIcon
                  icon={isPlaying ? PauseIcon : PlayIcon}
                  size={18}
                />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={next}
              disabled={!hasNext}
              className="h-8 w-8"
            >
              <HugeiconsIcon icon={NextIcon} size={16} />
            </Button>
          </div>

          {/* Qari selector */}
          <Select value={qari} onValueChange={(v) => setQari(v as QariKey)}>
            <SelectTrigger className="h-8 w-35 text-xs">
              <HugeiconsIcon
                icon={VolumeHighIcon}
                size={13}
                className="mr-1 shrink-0"
              />
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {(Object.keys(QARI_LIST) as QariKey[]).map((key) => (
                <SelectItem key={key} value={key} className="text-xs">
                  {QARI_LIST[key]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Progress label */}
          <span className="text-xs text-muted-foreground tabular-nums hidden sm:inline">
            {currentIndex + 1}/{queue.length}
          </span>

          {/* Stop */}
          <Button
            variant="ghost"
            size="icon"
            onClick={stop}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={15} />
          </Button>
        </div>
      </div>
    </div>
  );
}
