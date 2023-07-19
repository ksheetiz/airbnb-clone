"use client";

import { SafeReservations, SafeUser } from "../types";

import { Heading } from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface ReservationsClientProps {
  reservations: SafeReservations[];
  currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation Cancelled !");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Something Went Wrong !");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on you properties !" />
      <div className="mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionLabel="Cancel Guest Reservation"
            actiondId={reservation.id}
            disabled={deletingId === reservation.id} 
            currentUser={currentUser}
            onAction={onCancel}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
