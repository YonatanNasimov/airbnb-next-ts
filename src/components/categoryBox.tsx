'use client';

import React from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "query-string"
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType,
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {

  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      //create an object from our URL
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      //assigned the selected label as the category param in the URL
      ...currentQuery,
      category: label
    }

    // reast the category param in the URL when the selected label alresdy assigned in the URL (like a toggle for double click)
    if (params?.get('category') == label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({
      // generate thr URL string using query-string
      url: "/",
      query: updatedQuery
    }, { skipNull: true })

    router.push(url)
  }, [label, params, router])
  return (
    <div
      onClick={handleClick}
      className={`
            flex 
            flex-col 
            items-center 
            justify-center 
            gap-2
            p-3
            border-b-2
            hover:text-neutral-800
            transition
            cursor-pointer
            ${selected ? 'border-b-neutral-800' : 'border-transparent'}
            ${selected ? 'text-neutral-800' : 'text-neutral-500'}
          `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
  );
}

export default CategoryBox