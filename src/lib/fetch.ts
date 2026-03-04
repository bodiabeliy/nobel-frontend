import { flattenAttributes } from "@/lib/utils";

export async function fetchData(url: string, authToken?: string) {

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
      next: { revalidate: 60 },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);
    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}