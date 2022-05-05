import { Combobox, Dialog, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/outline'
import React, { Fragment, useEffect, useState } from 'react'
import { Product } from '@/mock-up-data'

export type CommandPaletteProps = {
  productList: Product[]
}

export default function CommandPalette({ productList }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(productList[0])
  // want to run the custom function when user press command+k or crt+k
  // press command+k or crt+k to open or close the command palette
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        setIsOpen(!isOpen)
      } else if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  // using query state to filter product list by the title
  const filteredProductList = query
    ? productList.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      {/*// When the dialog's open isOpen is true // Clicking outside the Dialog or pressing the Escape*/}
      {/*key will fire the close event and close the dialog.*/}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        // Wanting to span dialog across the entire view point, using inset 0
        // inset-0 will set the top, right, bottom, and left property to 0
        // overflow-y-auto will make the content scroll vertically if the content is too long (higher than the viewport height)
        className="fixed inset-0 overflow-y-auto p-4 pt-[25vh]"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-300 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/*add an overlay behind a Dialog to bring attention to the panel itself*/}
          <Dialog.Overlay className="fixed inset-0 bg-stone-800/30" />
        </Transition.Child>

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
              setIsOpen(false)
              setSelectedProduct(productItem)
              setQuery('')
              console.log('navigate user to selected product page')
            }}
            // trying to use className attribute on the element that does not exist in the dom
            // then using as="div" to fix it
            as="div"
            className="relative mx-auto max-w-xl divide-y divide-stone-100 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
          >
            {/*using items-center to vertical align*/}
            <div className="flex items-center space-x-2 p-2">
              <SearchIcon className="h-6 w-6 text-stone-500" />
              <Combobox.Input
                // handle search logic
                // Combobox.Input will automatically open/close the Combobox.Options when searching.
                onChange={(event) => setQuery(event.target.value)}
                className="h-10 w-full border-0 bg-transparent text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-0"
                placeholder="Search..."
              />
            </div>
            {/*there are some space with the padding of the Combobox.Options  showing all the time even if user does not type any letter*/}
            {/*remove the space by wrapping the Combobox.Options into a conditional check*/}
            {filteredProductList.length > 0 && (
              <Combobox.Options static className="max-h-96 overflow-y-auto py-4 text-sm">
                {/*show only options that matches input */}
                {/*mapping filter product list to narrow down the data*/}
                {filteredProductList.map((productItem) => (
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
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}
