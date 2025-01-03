import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import Button from "../../components/Shared/Button/Button";
import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const PlantDetails = () => {
  const { id } = useParams();
  const {
    data: plant = [],
    isLoading,
    refatch,
  } = useQuery({
    queryKey: ["plant", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/plants/${id}`
      );
      return data;
    },
  });
  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  console.log(plant);

  if (isLoading) return <LoadingSpinner />;

  const { category, description, image, price, name, seller, quantity } =
    plant || {};

  return (
    <Container>
      <Helmet>
        <title>Money Plant</title>
      </Helmet>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">
        {/* Header */}
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <div className="w-full overflow-hidden rounded-xl">
              <img
                className="object-cover w-full"
                src={image}
                alt="header image"
              />
            </div>
          </div>
        </div>
        <div className="md:gap-10 flex-1">
          {/* Plant Info */}
          <Heading title={"Money Plant"} subtitle={`Category: ${category}`} />
          <hr className="my-6" />
          <div
            className="
          text-lg font-light text-neutral-500"
          >
            {description}
          </div>
          <hr className="my-6" />

          <div
            className="
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              "
          >
            <div>Seller: {seller.name}</div>

            <img
              className="rounded-full"
              height="30"
              width="30"
              alt="Avatar"
              referrerPolicy="no-referrer"
              src={seller.image}
            />
          </div>
          <hr className="my-6" />
          <div>
            <p
              className="
                gap-4 
                font-light
                text-neutral-500
              "
            >
              Quantity: {quantity} Units Left Only!
            </p>
          </div>
          <hr className="my-6" />
          <div className="flex justify-between">
            <p className="font-bold text-3xl text-gray-500">Price: {price}$</p>
            <div>
              <Button
                onClick={() => setIsOpen(true)}
                label={quantity > 0 ? "Purchase" : "Out of Stock"}
              />
            </div>
          </div>
          <hr className="my-6" />

          <PurchaseModal closeModal={closeModal} isOpen={isOpen} />

          <div className="md:col-span-3 order-first md:order-last mb-10">
            {/* RoomReservation */}
            {/* <RoomReservation room={room} /> */}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PlantDetails;
