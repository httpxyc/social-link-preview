import Head from "next/head";
import React from "react";

const page = async ({ params }: { params: Promise<{ ids: string }> }) => {
  const { ids } = await params;
  // 模拟获取元数据
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/link?ids=${ids}`);
  if (!response.ok) {
    return <div>Error fetching metadata</div>;
  }
  const metadata = await response.json();

  return (
    <div>
      <Head>
        {/* 基础元标签 */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/* Open Graph / Facebook 元标签 */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.imageUrl} />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:site_name" content={metadata.siteName} />
        <meta property="og:type" content={metadata.type || "website"} />

        {/* Twitter 元标签 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.imageUrl} />
      </Head>

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
