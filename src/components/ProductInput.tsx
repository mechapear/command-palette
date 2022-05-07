import { Combobox } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/outline'
import React, { ChangeEvent } from 'react'

export type ProductInputProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const ProductInput = ({ onChange }: ProductInputProps) => {
  return (
    // using items-center to vertical align
    <div className="flex items-center space-x-2 p-2">
      <SearchIcon className="h-6 w-6 text-stone-500" />
      <Combobox.Input
        // handle search logic
        // Combobox.Input will automatically open/close the Combobox.Options when searching.
        // 1.ส่งไปให้ทั้ง event ให้ข้างนอกเลือกข้อมูลเอง
        // 2.ส่งไปแต่ value ex. onChange={(event) => onChange(event.target.value)} // ข้างนอกเป็น onChange={setQuery}
        onChange={onChange}
        className="h-10 w-full border-0 bg-transparent text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-0"
        placeholder="Search..."
      />
    </div>
  )
}

export default ProductInput
