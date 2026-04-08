import type { Metadata } from 'next';
import ResultPageClient from '@/components/Result/ResultPageClient';
import { buildResultFromCode } from '@/data/results';

type ResultSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function getTypeId(searchParams: Awaited<ResultSearchParams>) {
  const type = searchParams.type;
  return typeof type === 'string' ? type : null;
}

function getCode(searchParams: Awaited<ResultSearchParams>) {
  const code = searchParams.code;
  return typeof code === 'string' ? code : null;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: ResultSearchParams;
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const result = buildResultFromCode(
    getCode(resolvedSearchParams),
    getTypeId(resolvedSearchParams)
  );
  const title = `${result.name} | 메아리셋 실행패턴 결과`;
  const description = `${result.verdict} · ${result.cardTip}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [`/api/og?type=${result.id}&code=${result.scoreCode}`],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/api/og?type=${result.id}&code=${result.scoreCode}`],
    },
  };
}

export default async function ResultPage({
  searchParams,
}: {
  searchParams: ResultSearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const result = buildResultFromCode(
    getCode(resolvedSearchParams),
    getTypeId(resolvedSearchParams)
  );

  return <ResultPageClient result={result} />;
}
