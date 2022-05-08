import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import CommandPalette from '@/components/CommandPalette'

export default function CommandPaletteDialog() {
  const [isOpen, setIsOpen] = useState(false)
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

        <CommandPalette onSelectCommand={() => setIsOpen(false)} />
      </Dialog>
    </Transition.Root>
  )
}
