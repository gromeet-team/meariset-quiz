import type { Metadata } from 'next';
import ResultPageClient from '@/components/Result/ResultPageClient';
import { getResultTypeById } from '@/data/results';

type ResultSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function getTypeId(searchParams: Awaited<ResultSearchParams>) {
  const type = searchParams.type;
  return typeof type === 'string' ? type : null;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: ResultSearchParams;
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const result = getResultTypeById(getTypeId(resolvedSearchParams));
  const title = `${result.name} | 메아리셋 결과`;
  const description = `${result.subtype} · ${result.headline}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [`/api/og?type=${result.id}`],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/api/og?type=${result.id}`],
    },
  };
}

export default async function ResultPage({
  searchParams,
}: {
  searchParams: ResultSearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const result = getResultTypeById(getTypeId(resolvedSearchParams));

  return <ResultPageClient result={result} />;
}
