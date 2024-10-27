import { axiosWithAuth } from "../api/interceptors";
import type { IBanner } from "../types/common";

export class CommonService {
  public static async getBanners() {
    return axiosWithAuth.get<IBanner[]>('/common/banners')
  }
}