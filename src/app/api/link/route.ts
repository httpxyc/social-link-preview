import { ok } from "assert";
import { NextRequest } from "next/server";

// 获取页面元信息api
export interface LinkMetadata {
  title: string;
  description: string;
  imageUrls: string[];
  videoUrls: string[];
  url: string;
  siteName: string;
  type?: string;
}
const demoMetadata: LinkMetadata = {
  title: "Demo Link",
  description: "This is a demo link for testing purposes.",
  imageUrls: ["https://picsum.photos/300"],
  videoUrls: [""],
  url: "https://example.com/demo",
  siteName: "Demo Site",
  type: "website",
};
const mockFetchData = async (ids: string[]): Promise<LinkMetadata> => {
  // 模拟数据获取
  console.log("Mock fetching data for ids:", ids);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...demoMetadata,
        imageUrls: ids.map((id) => `https://picsum.photos/id/${id}/800/418`), // 模拟不同的图片
        videoUrls: ids.map((id) => `https://videos.pexels.com/video-files/32572444/13889293_1920_1080_24fps.mp4`), // 模拟视频链接
      });
    }, 1000); // 模拟1秒延迟
  });
};
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const ids = searchParams.get("ids");
  if (!ids) {
    return Response.json({ error: "Missing ids parameter" }, { status: 400 });
  }
  const metadata = await mockFetchData(ids.split(","));
  return Response.json(metadata);
}
