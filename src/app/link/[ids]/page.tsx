// import Head from "next/head";
import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { LinkMetadata } from "@/app/api/link/route";
import { cache } from "react";

type Props = {
  params: Promise<{ ids: string }>;
  // searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// 缓存请求结果的 Map
// 使用 React cache 缓存数据获取函数
const fetchLinkMetadata = cache(async (ids: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/link?ids=${ids}`, {
    next: { revalidate: 60 }, // 可选：设置缓存时间
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch metadata: ${response.status}`);
  }

  return response.json() as Promise<LinkMetadata>;
});
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ids = (await params).ids;

  // fetch post information
  const post: LinkMetadata = await fetchLinkMetadata(ids);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: post.url,
      siteName: post.siteName || "Next.js",
      images: [
        {
          url: post.imageUrl,
          width: 200,
          height: 200,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.imageUrl],
    },
  };
}
const page = async ({ params }: { params: Promise<{ ids: string }> }) => {
  const { ids } = await params;
  // 模拟获取元数据
  const metadata = await fetchLinkMetadata(ids);

  return (
    <div>
      {/* 页面实际内容 */}
      <div className="container">
        <h1>{metadata.title}</h1>
        <p>{metadata.description}</p>
        <img src={metadata.imageUrl} alt={metadata.title} />
        {/* 其他页面内容... */}
      </div>
    </div>
  );
};

export default page;
