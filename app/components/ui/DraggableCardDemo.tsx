import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "./draggable-card";
 
export function DraggableCardDemo() {
  const items = [
    {
      title: "SUJI RUSK",
      image:
        "https://res.cloudinary.com/ddtifclgr/image/upload/v1770813837/Suji_rusk.f592fca2c815d8295049-Photoroom_bsoe0c.png",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "MILK RUSK",
      image:
        "https://res.cloudinary.com/ddtifclgr/image/upload/v1770813840/Milk_rusk.55cd87e135e384e6656f-Photoroom_zha2la.png",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "GUD RUSK",
      image:
        "https://res.cloudinary.com/ddtifclgr/image/upload/v1770813841/gud_rusk.900f91b44fdd4e91af8f-Photoroom_kzr7u1.png",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
   
    {
      title: "ELAICHI RUSK",
      image:
        "https://res.cloudinary.com/ddtifclgr/image/upload/v1770813844/elachi.e857599bde6db2425f0d-Photoroom_h8jfn6.png",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
   
  
  ];
  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
      <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
       If it’s your first chai, you need a rusk.No first sip without a crisp rusk
      </p>
      {items.map((item) => (
        <DraggableCardBody className={item.className}>
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-10 h-80 w-80 object-contain"
          />
          <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}