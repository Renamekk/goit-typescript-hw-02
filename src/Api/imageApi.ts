import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    "Accept-Version": "v1",
    Authorization: "Client-ID PeZqVSME1a1ZOU9ymhl6wIlXNcdiUKuoETyeTT_WLiY",
  },
});


export async function fetchPicturesWithQuery<T>(
  query: string,
  page: number = 1
): Promise<T> {
  const { data } = await instance.get<T>(`/search/photos`, {
    params: {
      query: query,
      orientation: "landscape",
      page,
      per_page: 20,
    },
  });

  return data;
}