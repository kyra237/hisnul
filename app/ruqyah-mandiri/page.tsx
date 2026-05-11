// app/(ruqyah)/page.tsx
import { ruqyahAyatRanges } from "@/constants/ruqyah";
import { quran } from "@/lib/equran";
import { AyatCard } from "./_components/ayat-card";
import { AudioPlayerBar } from "./_components/audio-player-bar";
import { PlayAllButton } from "./_components/play-all-button";
import { AyatRange } from "equran";

export default async function RuqyahMandiriPage() {
  const data = await Promise.allSettled(
    ruqyahAyatRanges.map((item) =>
      quran.getAyatRange(item.surat, item.from, item.to),
    ),
  );

  const ayats = data
    .filter((r) => r.status === "fulfilled")
    .map((r) => (r as PromiseFulfilledResult<AyatRange>).value);

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-10 pb-28 space-y-10">
        {/* Intro */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">Ruqyah Syar&apos;iyyah</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ruqyah adalah metode penyembuhan dengan membaca ayat Al-Qur&apos;an
            dan doa yang diajarkan Rasulullah ﷺ.
          </p>
          <ul className="text-sm list-disc pl-5 space-y-1">
            <li>Berlandaskan tauhid</li>
            <li>Tanpa syirik</li>
            <li>Dengan tawakal kepada Allah</li>
          </ul>

          {/* Play All */}
          <div className="pt-2">
            <PlayAllButton allAyats={ayats} />
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-6">
          {ayats.map((item) => (
            <AyatCard key={`${item.suratNomor}-${item.fromAyat}`} data={item} />
          ))}
        </div>
      </div>

      {/* Global player — muncul hanya saat ada yang diplay */}
      <AudioPlayerBar />
    </>
  );
}
