import React from 'react'
import getListingById from "@/actions/getListingById"
import ClientOnly from '@/components/clientOnly';
import EmptyState from '@/components/emptyState';
import getCurrentUser from '@/actions/getCurrentUser';
import ListingClient from '@/components/listings/listingClient';

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

    const listing = await getListingById(params);
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
                />
            </ClientOnly>
        </div>
    )
}

export default ListingPage
