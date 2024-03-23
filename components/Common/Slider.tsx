import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Image from 'next/image'
export function CarouselSlider(urls) {


    return <Carousel
        additionalTransfrom={0} draggable keyBoardControl
        autoPlay
        autoPlaySpeed={3000}
        shouldResetAutoplay={true}
        swipeable minimumTouchDrag={80} pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
            res1: { breakpoint: { max: 550, min: 0 }, items: 1, partialVisibilityGutter: 0 },
            res2: { breakpoint: { max: 3000, min: 550 }, items: 2, partialVisibilityGutter: 0 },
        }}
        containerClass="h-full w-full rounded-2xl"
        rewind={true}
        rewindWithAnimation={true}
        arrows={false}
        transitionDuration={1000}
    >
        {urls.map((url, index) => (
            <div key={index} className='rounded-t-xl px-2'>
                <Image
                    src={url}
                    alt={`Order Image ${index}`}
                    width={100}
                    height={100}
                    className='h-full w-full rounded-md object-contain'
                />
            </div>
        ))}
    </Carousel>
}