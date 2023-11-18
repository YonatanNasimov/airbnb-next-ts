'use client'

import { SafeListing, SafeUser } from '@/types';
import { Reservation } from '@prisma/client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { categories } from '../navbar/categories';
import ListingHead from './listingHead';
import ListingInfo from './listingInfo';
import Container from '../container';
import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import { eachDayOfInterval, differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import toast from 'react-hot-toast';
import { list } from 'postcss';
import ListingReservation from './listingReservation';
import { Range } from 'react-date-range';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    reservation?: Reservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser,
    reservation = []
}) => {

    const loginModal = useLoginModal()
    const router = useRouter()

    const disabledDates = useMemo(() => {
        //Checking which dates are already in use
        let dates: Date[] = [];

        reservation.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })

            dates = [...dates, ...range];
        })

        return dates;
    }, [reservation])

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const OnCreateReservation = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    totalPrice,
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate,
                    listingId: listing?.id,
                }),
            });

            if (response.ok) {
                toast.success('Listing reserved!');
                setDateRange(initialDateRange);
                router.refresh();
            }
        }
        catch (error) {
            toast.error('Something went wrong, Try again');
        }
        finally {
            setIsLoading(false);
        }
    }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {

            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price])

    const category = useMemo(() => {
        return categories.find((item) =>
            item.label == listing.category
        )
    }, [])

    return (
        <Container>
            <div className='max-w-screen-lg mx-auto'>
                <div className='flex flex-col gap-6'>
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser} />
                    <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                        <div
                            className='
                            order-first
                            mb-10
                            md:order-last
                            md:col-span-3'>
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={OnCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates} />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient
