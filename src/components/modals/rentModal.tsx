'use client';

import useRentModal from '@/hooks/useRentModal'
import React, { useMemo, useState } from 'react'
import Modal from './modal';
import Heading from '../heading';
import { categories } from '../navbar/categories';
import CategoryInput from '../inputs/categoryInput';
import { FieldValues, useForm } from 'react-hook-form';
import CountrySelect from '../inputs/countrySelect';

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);

    const {
        register, //to get fields from the input
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    })

    const category = watch('category'); // watch on field 'category'

    const setCustomValues = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const onBack = () => {
        setStep((value) => value - 1)
    }

    const onNext = () => {
        setStep((value) => value + 1)
    }

    const actionLabel = useMemo(() => {
        if (step == STEPS.PRICE) {
            return 'Create'
        }
        return 'Next'
    }, [step])

    const seconderyActionLabel = useMemo(() => {
        if (step == STEPS.CATEGORY) {
            return undefined
        }
        return 'Back'
    }, [step])

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
                title='Which of these best describe your place?'
                subTitle='Pick a category'
                center
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
                {categories.map((item) => (
                    <div key={item.label} className='col-span-1'>
                        <CategoryInput
                            onClick={(category) => setCustomValues('category', category)}
                            icon={item.icon}
                            label={item.label}
                            selected={category == item.label} />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step == STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subTitle="Help guests find you!"
                />
                <CountrySelect
                    // value={location}
                    // onChange={(value) => setCustomValues('location', value)}
                />
            </div>
        )
    }

    return (
        <div>
            <Modal
                isOpen={rentModal.isOpen}
                onClose={rentModal.onClose}
                onSubmit={onNext}
                actionLabel={actionLabel}
                secondaryActionLabel={seconderyActionLabel}
                secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
                title='Airbnb your home!'
                body={bodyContent} />

        </div>
    )
}

export default RentModal
