import { Combobox, Dialog } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { Product } from '@/mock-up-data'

export type CommandPaletteProps = {
  productList: Product[]
}

export default function CommandPalette({ productList }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [query, setQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(productList[0])

  return (
    // When the dialog's open isOpen is true
    // Clicking outside the Dialog or pressing the Escape key will fire the close event and close the dialog.
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      // Wanting to span dialog across the entire view point, using inset 0
      // inset-0 will set the top, right, bottom, and left property to 0
      // overflow-y-auto will make the content scroll vertically if the content is too long (higher than the viewport height)
      className="fixed inset-0 overflow-y-auto p-4 pt-[25vh]"
    >
      {/*add an overlay behind a Dialog to bring attention to the panel itself*/}
      <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
      <Combobox
        // a type of dialogue box containing a combination of controls, such as sliders, text boxes, and drop-down lists
        // when user select one of the option inside the combobox
        // navigate user to selected product page
        value={selectedProduct}
        onChange={setSelectedProduct}
        // trying to use className attribute on the element that does not exist in the dom
        // then using as="div" to fix it
        as="div"
        className="relative mx-auto max-w-xl p-2 rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 divide-y divide-gray-100"
      >
        {/*using items-center to vertical align*/}
        <div className="flex items-center space-x-2">
          <SearchIcon className="h-6 w-6 text-gray-500" />
          <Combobox.Input
            // handle search logic
            // Combobox.Input will automatically open/close the Combobox.Options when searching.
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent border-0 text-sm text-gray-800 placeholder-gray-400 h-10 focus:ring-0 focus:outline-none"
            placeholder="Search..."
          />
        </div>
        <Combobox.Options static className="max-h-96 py-4 text-sm overflow-y-auto">
          {productList.map((productItem) => (
            <Combobox.Option key={productItem.id} value={productList}>
              {({ active }) => (
                <div className={`px - 4 py-2 ${active ? 'bg-indigo-500' : 'bg-white'}`}>
                  <span className={`font - medium ${active ? 'text-white' : 'text-gray-900'}`}>
                    {productItem.title}
                  </span>
                  <span className="text-gray-400">{`, ${productItem.category}`}</span>
                </div>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </Dialog>
  )
}
