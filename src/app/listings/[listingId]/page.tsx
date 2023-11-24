import React from 'react'
import getListingById from "@/actions/getListingById"
import ClientOnly from '@/components/clientOnly';
import EmptyState from '@/components/emptyState';
import getCurrentUser from '@/actions/getCurrentUser';
import getReservations from '@/actions/getReservations';
import ListingClient from '@/components/listings/listingClient';

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    return (
        <div>
            <ClientOnly>
                <ListingClient
                    listing={listing}
                    currentUser={currentUser}
                    reservation={reservations}
                />
            </ClientOnly>
        </div>
    )
}

export default ListingPage
