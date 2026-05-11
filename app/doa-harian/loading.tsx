import { Skeleton } from "@/components/ui/skeleton";

export default function DoaHarianPageLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Doa Harian</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Memuat doa &amp; dzikir bersumber dari Al-Qur&apos;an dan Hadits
          Shahih…
        </p>
      </div>

      {/* ── Skeleton Filter Area ────────────────────────────────────────── */}
      <div className="py-3 -mx-4 px-4 border-b space-y-3">
        {/* Search bar skeleton */}
        <Skeleton className="h-9 w-full rounded-md" />

        {/* Grup + Tag combobox skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-9 w-50 shrink-0 rounded-md" />
          <Skeleton className="h-9 flex-1 rounded-md" />
        </div>

        {/* Counter skeleton */}
        <Skeleton className="h-4 w-40" />
      </div>

      {/* ── Doa Card Skeletons ──────────────────────────────────────────── */}
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border rounded-xl p-6 space-y-5">
            {/* Card header: nomor + judul + grup */}
            <div className="flex items-start gap-3">
              <Skeleton className="h-8 w-8 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/5" />
                <Skeleton className="h-3 w-2/5" />
              </div>
            </div>

            {/* Tags */}
            <div className="flex gap-1.5">
              {Array.from({ length: (i % 3) + 1 }).map((_, j) => (
                <Skeleton key={j} className="h-5 w-14 rounded-full" />
              ))}
            </div>

            {/* Teks Arab — lebar bervariasi supaya natural */}
            <Skeleton
              className="h-7 ml-auto rounded"
              style={{ width: `${72 + (i % 3) * 9}%` }}
            />

            {/* Transliterasi */}
            <Skeleton className="h-4 w-5/6 rounded" />

            {/* Terjemahan — 1–2 baris bergantian */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded" />
              {i % 2 === 0 && <Skeleton className="h-4 w-4/5 rounded" />}
            </div>

            {/* Tombol lihat sumber */}
            <Skeleton className="h-6 w-28 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
