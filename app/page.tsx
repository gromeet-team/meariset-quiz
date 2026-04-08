import HomeClient from '@/components/Home/HomeClient';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const isCompareMode = resolvedSearchParams.compare === '1';

  return <HomeClient isCompareMode={isCompareMode} />;
}
