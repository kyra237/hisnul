import { Skeleton } from "@/components/ui/skeleton";

export default function RuqyahMandiriPageLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-10">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Ruqyah Syar’iyyah</h1>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Ruqyah adalah metode penyembuhan dengan membaca ayat Al-Qur’an dan doa
          yang diajarkan Rasulullah ﷺ.
        </p>

        <ul className="text-sm list-disc pl-5 space-y-1">
          <li>Berlandaskan tauhid</li>
          <li>Tanpa syirik</li>
          <li>Dengan tawakal kepada Allah</li>
        </ul>
      </div>

      {/* CONTENT SKELETON */}
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border rounded-xl p-6 space-y-4">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-4 w-28" />

            <div className="space-y-4 pt-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
