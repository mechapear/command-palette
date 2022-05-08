import { Combobox, Transition } from '@headlessui/react'
import React, { useState } from 'react'
import CommandPaletteInput from '@/components/CommandPaletteInput'
import CommandPaletteOptions, { CommandPaletteOptionItem } from '@/components/CommandPaletteOptions'

export type CommandPaletteProps = {
  // ? is an optional property
  /**
   * it is called whenever the command is selected
   */
  onSelectCommand?: (option: CommandPaletteOptionItem) => void
  optionList: CommandPaletteOptionItem[]
}

const CommandPalette = ({ onSelectCommand, optionList }: CommandPaletteProps) => {
  const [query, setQuery] = useState('')
  const [selectedOption, setSelectedOption] = useState(optionList[0])

  // using query state to filter option list by the title
  const filteredOptionList = query
    ? optionList.filter((optionItem) =>
        optionItem.title.toLowerCase().includes(query.toLowerCase())
      )
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
        // navigate user to selected option page
        // happen when user clicks on one of the element or press enter
        value={selectedOption}
        onChange={(optionItem) => {
          setSelectedOption(optionItem)
          setQuery('')
          // onSelectCommand() is an optional event handler prop or optional callbacks (ไม่มีอันนี้ code หน้านี้ก็ทำงานได้ปกติ)
          // callback function จะทำงานเมื่อมี event เกิดขึ้น กรณีนี้จะทำงานเมื่อ user เลือก option
          // ?.() is an optional function call
          // to prevent error from calling undefined value
          onSelectCommand?.(optionItem)
          console.log('navigate user to selected option page')
        }}
        // trying to use className attribute on the element that does not exist in the dom
        // then using as="div" to fix it
        as="div"
        className="relative mx-auto max-w-xl divide-y divide-stone-100 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
      >
        <CommandPaletteInput onChange={setQuery} />
        <CommandPaletteOptions optionList={filteredOptionList} />
      </Combobox>
    </Transition.Child>
  )
}

export default CommandPalette
