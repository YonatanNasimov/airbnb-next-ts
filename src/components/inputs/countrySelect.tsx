'use client'

import useCountries from '@/hooks/useCountries';
import React from 'react'
import Select from 'react-select'

export type CountrySelectValue = {
    value: string;
    label: string;
    flag: string;
    latlng: [number, number];
    region: string;
}

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
    value, onChange
}) => {

    const { getAll } = useCountries();

    return (
        <div>
            <Select
                placeholder="Anywhere"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className='flex flex-row items-center gap-3'>
                        <div>
                            {option.flag}
                            <span className='text-neutral-800 ml-1'>
                                {option.region}
                            </span>
                        </div>
                    </div>
                )}
            />
        </div>
    )
}

export default CountrySelect
