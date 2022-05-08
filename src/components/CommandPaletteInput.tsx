import { Combobox } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'

export type CommandPaletteInputProps = {
  onChange: (value: string) => void
}

const CommandPaletteInput = ({ onChange }: CommandPaletteInputProps) => {
  return (
    // using items-center to vertical align
    <div className="flex items-center space-x-2 p-2">
      <SearchIcon className="h-6 w-6 text-stone-500" />
      <Combobox.Input
        // handle search logic
        // Combobox.Input will automatically open/close the Combobox.Options when searching.
        // 1.ส่งไปให้ทั้ง event ให้ข้างนอกเลือกข้อมูลเอง เพราะเราไม่รู้ค่าที่แน่นอนว่าจะเอาไปใช้อะไรบ้าง (flexible ใช้ได้หลายที่ ในกรณีที่ถ้าแต่ละที่ต้องการข้อมูลต่างกัน)
        // ex. onChange={onChange} // ข้างนอกเป็น onChange={(event) => setQuery(event.target.value)}
        // 2.ส่งไปแต่ value
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full border-0 bg-transparent text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-0"
        placeholder="Search..."
      />
    </div>
  )
}

export default CommandPaletteInput
