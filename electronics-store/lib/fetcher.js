export default async function fetcher(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to load data: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
