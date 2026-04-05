'use client'
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

const LifeAtOmb = () => {

    const lifeAtOmbData = [
        {
            imgUrl: "/life-omb/life-omb-1.png",
        },
        {
            imgUrl: "/life-omb/life-omb-2.png",
        },
        {
            imgUrl: "/life-omb/life-omb-3.png",
        },
        {
            imgUrl: "/life-omb/life-omb-4.png",
        },
        {
            imgUrl: "/life-omb/life-omb-5.png",
        },
        {
            imgUrl: "/life-omb/life-omb-6.png",
        },
    ]

  return (
    <section className="sm:py-35 py-10 relative isolate overflow-hidden">
        <div className="container">
            <div className="flex flex-col gap-5 mx-auto text-center mb-11">
                <h2 className="sm:text-2xl text-xl font-medium leading-none">
                Life at Online Marketing Bakery
                </h2>
                <p className="sm:text-body text-sm">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatemaccusantium doloremque.
                </p>
            </div>
            <div>
            <Swiper
            slidesPerView={1}
            spaceBetween={16}
            modules={[Navigation, Autoplay]}
            className="overflow-visible!"
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 14,
              },
              1536: {
                slidesPerView: 4.5,
                spaceBetween: 16,
              },
            }}
          >
            {lifeAtOmbData.map((item: { imgUrl: string }, index: number) => (
              <SwiperSlide key={index + 1} className="overflow-visible!">
                    <Image
                      src={item.imgUrl}
                      alt={item.imgUrl}
                      width={316}
                      height={414}
                    />
              </SwiperSlide>
            ))}
          </Swiper>
            </div>
        </div>
    </section>
  )
}

export default LifeAtOmb