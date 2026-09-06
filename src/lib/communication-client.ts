export async function communicationRequest<T>(
  url: string,
  options: RequestInit = {},
  admin = false,
): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body) headers.set("Content-Type", "application/json");
  if (admin)
    headers.set(
      "Authorization",
      `Bearer ${localStorage.getItem("adminToken") || ""}`,
    );
  const response = await fetch(url, { ...options, headers, cache: "no-store" });
  const result = await response.json();
  if (!response.ok || result.success === false)
    throw new Error(
      result.error ||
        result.message ||
        "Connection interrupted. Please try again.",
    );
  return result.data ?? result;
}
