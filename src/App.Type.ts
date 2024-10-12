export interface IUser {
  instagram_username: string;
  name: string;
}
export interface IUrls {
  regular: string;
  small: string;
}
export interface IImageCard {
  id: string;
  urls: IUrls;
  alt_description: string;
  description: string;
  likes: number;
  user: IUser;
}

export interface IAllImage {
  results: IImageCard[];
  total_pages: number;
}