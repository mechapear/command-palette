import { Combobox } from '@headlessui/react'
import React from 'react'
import { Product } from '@/mock-up-data'

export type ProductOptionsProps = {
  productList: Product[]
}

export default function ProductOptions({ productList }: ProductOptionsProps) {
  // there are some space with the padding of the Combobox.Options showing all the time even if user does not type any letter
  // remove the space by wrapping the Combobox.Options into a conditional check
  // ถ้าไม่ให้ render ให้ return null
  if (productList.length <= 0) return null

  return (
    <Combobox.Options static className="max-h-96 overflow-y-auto py-4 text-sm">
      {/*show only options that matches input */}
      {/*mapping filter product list to narrow down the data*/}
      {productList.map((productItem) => (
        // Combobox.Options has no style by default
        // style the active Combobox.Option
        // active option is the one that currently focused vai the mouse or keyboard
        <Combobox.Option key={productItem.id} value={productItem}>
          {({ active }) => (
            <div className={`px-4 py-2 ${active ? 'bg-rose-500' : 'bg-white'}`}>
              <span className={`font-medium ${active ? 'text-white' : 'text-stone-900'}`}>
                {productItem.title}
              </span>
              <span className={active ? 'text-rose-200' : 'text-stone-400'}>
                , {productItem.category}
              </span>
            </div>
          )}
        </Combobox.Option>
      ))}
    </Combobox.Options>
  )
}
