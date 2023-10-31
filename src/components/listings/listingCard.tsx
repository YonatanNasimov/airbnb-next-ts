import React from 'react'
import { SafeUser } from '@/types'
import { Listing, Reservation } from '@prisma/client'

interface ListingCardProps {
    data: Listing;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionId,
    actionLabel,
    currentUser
}) => {
    return (
        <div>
            Test listings
        </div>
    )
}

export default ListingCard;
