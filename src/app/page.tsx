import { CommonService } from "../services/common.service"

import BannerSwiper from "./components/content/swiper/BannerSwiper"

export default async function Home() {

  const [ banners ] = await Promise.all([
    CommonService.getBanners()
  ])


  return (
    <div className="wrapper">
      <div className="pt-8 pb-8">
        <BannerSwiper banners={banners.data} />
      </div>
    </div>
  )
}