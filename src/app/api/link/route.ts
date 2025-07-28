import { ok } from "assert";
import { NextRequest } from "next/server";

// 获取页面元信息api
export interface LinkMetadata {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  siteName: string;
  type?: string;
}
const demoMetadata: LinkMetadata = {
  title: "Demo Link",
  description: "This is a demo link for testing purposes.",
  imageUrl: "https://picsum.photos/200",
  url: "https://example.com/demo",
  siteName: "Demo Site",
  type: "website",
};
const mockFetchData = async (ids: string): Promise<LinkMetadata> => {
  // 模拟数据获取
  console.log("Mock fetching data for ids:", ids);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...demoMetadata,
        imageUrl: `https://picsum.photos/id/${ids}/200`,
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
  const metadata = await mockFetchData(ids);
  return Response.json(metadata);
}
