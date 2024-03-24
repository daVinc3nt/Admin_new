import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Image from 'next/image'
import { TbChevronsLeft, TbChevronsRight } from "react-icons/tb";
export function CarouselSlider(ObjUrls) {
    // console.log("ObjUrls: ", ObjUrls);
    const ArrowFix = (arrowProps) => {
        const { carouselState, children, rtl, ...restArrowProps } = arrowProps;
        return <div {...restArrowProps}>{children}</div>;
    };
    return <Carousel
        customRightArrow={
            <ArrowFix className="absolute right-4 top-1/2 -translate-y-1/2 invisible lg:visible">
                <TbChevronsRight className="h-6 w-6 text-white text-center rounded-full bg-gray-800 outline outline-white" />
            </ArrowFix>
        }
        customLeftArrow={
            <ArrowFix className="absolute left-4 top-1/2 -translate-y-1/2 invisible lg:visible">
                <TbChevronsLeft className="h-6 w-6 text-white text-center rounded-full bg-gray-800 outline outline-white" />
            </ArrowFix>
        }
        additionalTransfrom={0} draggable keyBoardControl
        autoPlay
        autoPlaySpeed={3000}
        shouldResetAutoplay={true}
        swipeable minimumTouchDrag={80} pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
            res1: { breakpoint: { max: 30000, min: 0 }, items: 1, partialVisibilityGutter: 0 },
        }}
        containerClass="h-full w-full rounded-2xl"
        rewind={true}
        rewindWithAnimation={true}
        arrows={true}
        transitionDuration={1000}
    >

        {Array.isArray(ObjUrls.urls)
            ? ObjUrls.urls.map((url, index) => (
                <div key={index} className='rounded-t-xl px-2'>
                    <Image
                        src={url}
                        alt={`Order Image ${index}`}
                        width={100}
                        height={100}
                        className='h-full w-full rounded-md object-contain'
                    />
                </div>
            )) : null}
    </Carousel>
}