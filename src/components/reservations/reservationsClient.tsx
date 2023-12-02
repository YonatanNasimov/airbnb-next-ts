'use client'

import axios from 'axios';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SafeReservation, SafeUser } from '@/types'

import Container from '../container';
import Heading from '../heading';
import ListingCard from '../listings/listingCard';
import toast from 'react-hot-toast';

interface ReservationsClientProps {
    reservations: SafeReservation[];
    currentUser: SafeUser | null;
}


const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter();

    useEffect(() => {
        router.refresh()
    }, [])

    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`api/reservations/${id}`)
            .then(() => {
                toast.success("Reservation cancelled");
                router.refresh()
            })
            .catch((error) => {
                toast.error("something went worng, try again");
            })
            .finally(() => {
                setDeletingId('')
            })
    }, [router])

    return (
        <Container>
            <Heading
                title='Reservation'
                subTitle="Bookings on your properties" />
            <div
                className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
            >
                {reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel guest reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default ReservationsClient;