'use client'

import React, { useMemo, useState } from 'react'
import Modal from './modal'
import useSearchModal from "@/hooks/useSearchModal";
import { useRouter, useSearchParams } from 'next/navigation';
import { Range } from 'react-date-range';
import { CountrySelectValue } from '../inputs/countrySelect';
import dynamic from 'next/dynamic';


enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {

    const router = useRouter()
    const params = useSearchParams()
    const searchModal = useSearchModal();

    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION)
    const [guestCount, setGuestCount] = useState(1)
    const [roomCount, setRoomCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1)
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    const Map = useMemo(() => dynamic(() => import('../map'), {
        ssr: false,
    }), [location])

    return (
        <div>
            <Modal
                isOpen={searchModal.isOpen}
                onClose={searchModal.onClose}
                onSubmit={searchModal.onOpen}
                title='Filters'
                actionLabel='Search'
            />
        </div>
    )
}

export default SearchModal