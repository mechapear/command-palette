import { Combobox } from '@headlessui/react'
import React from 'react'

export type CommandPaletteOptionItem = {
  id: number
  title: string
  meta?: string
}

export type CommandPaletteOptionsProps = {
  optionList: CommandPaletteOptionItem[]
}

export default function CommandPaletteOptions({ optionList }: CommandPaletteOptionsProps) {
  // there are some space with the padding of the Combobox.Options showing all the time even if user does not type any letter
  // remove the space by wrapping the Combobox.Options into a conditional check
  // ถ้าไม่ให้ render ให้ return null
  if (optionList.length <= 0) return null

  return (
    <Combobox.Options static className="max-h-96 overflow-y-auto py-4 text-sm">
      {/*show only options that matches input */}
      {/*mapping filter option list to narrow down the data*/}
      {optionList.map((optionItem) => (
        // Combobox.Options has no style by default
        // style the active Combobox.Option
        // active option is the one that currently focused vai the mouse or keyboard
        <Combobox.Option key={optionItem.id} value={optionItem}>
          {({ active }) => (
            <div className={`px-4 py-2 ${active ? 'bg-rose-500' : 'bg-white'}`}>
              <span className={`font-medium ${active ? 'text-white' : 'text-stone-900'}`}>
                {optionItem.title}
              </span>
              {optionItem.meta && (
                <span className={active ? 'text-rose-200' : 'text-stone-400'}>
                  , {optionItem.meta}
                </span>
              )}
            </div>
          )}
        </Combobox.Option>
      ))}
    </Combobox.Options>
  )
}
