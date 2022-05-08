import { Combobox, Transition } from '@headlessui/react'
import React, { useState } from 'react'
import CommandPaletteInput from '@/components/CommandPaletteInput'
import ProductOptions from '@/components/ProductOptions'
import { Product, productList } from '@/mock-up-data'

export type CommandPaletteProps = {
  // ? is an optional property
  /**
   * it is called whenever the command is selected
   */
  onSelectCommand?: (product: Product) => void
}

const CommandPalette = ({ onSelectCommand }: CommandPaletteProps) => {
  const [query, setQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(productList[0])

  // using query state to filter product list by the title
  const filteredProductList = query
    ? productList.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <Transition.Child
      enter="duration-300 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-300 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Combobox
        // a type of dialogue box containing a combination of controls, such as sliders, text boxes, and drop-down lists
        // when user select one of the option inside the combobox
        // navigate user to selected product page
        // happen when user clicks on one of the element or press enter
        value={selectedProduct}
        onChange={(productItem) => {
          setSelectedProduct(productItem)
          setQuery('')
          // onSelectCommand() is an optional event handler prop or optional callbacks (ไม่มีอันนี้ code หน้านี้ก็ทำงานได้ปกติ)
          // callback function จะทำงานเมื่อมี event เกิดขึ้น กรณีนี้จะทำงานเมื่อ user เลือก product
          // ?.() is an optional function call
          // to prevent error from calling undefined value
          onSelectCommand?.(productItem)
          console.log('navigate user to selected product page')
        }}
        // trying to use className attribute on the element that does not exist in the dom
        // then using as="div" to fix it
        as="div"
        className="relative mx-auto max-w-xl divide-y divide-stone-100 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
      >
        <CommandPaletteInput onChange={setQuery} />
        <ProductOptions productList={filteredProductList} />
      </Combobox>
    </Transition.Child>
  )
}

export default CommandPalette
