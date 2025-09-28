"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTranslation } from "next-i18next";

interface PaginationProps {
  metadata: {
    total: number;
  };
  options?: {
    showLimit?: boolean;
  };
  queryKeys?: {
    pageKey?: string;
    limitKey?: string;
  };
}

export default function Pagination({
  metadata,
  options,
  queryKeys,
}: PaginationProps) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const total = metadata.total;

  const pageKey = queryKeys?.pageKey || "page";
  const limitKey = queryKeys?.limitKey || "limit";

  const page = Number(searchParams.get(pageKey) || 1);
  const limit = Number(searchParams.get(limitKey) || 10);
  const totalPages = Math.ceil(total / limit);

  const setParams = (newPage: number, newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(pageKey, String(newPage));
    params.set(limitKey, String(newLimit));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col-reverse sm:flex-row-reverse items-center justify-between mt-6 gap-4">
      {options?.showLimit && (
        <select
          value={limit}
          onChange={(e) => setParams(1, Number(e.target.value))}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brown-500"
        >
          {[5, 10, 20, 50].map((val) => (
            <option key={val} value={val}>
              {val} / {t("page")}
            </option>
          ))}
        </select>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={() => setParams(page - 1, limit)}
          disabled={page <= 1}
          className="px-4 py-2 rounded-lg border bg-white shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          ◀
        </button>

        <span className="text-sm font-medium text-gray-600">
          {t("page")}{" "}
          <span className="font-semibold text-gray-900">{page}</span> {t("of")}{" "}
          {totalPages || 1}
        </span>

        <button
          onClick={() => setParams(page + 1, limit)}
          disabled={page >= totalPages}
          className="px-4 py-2 rounded-lg border bg-white shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
