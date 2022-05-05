import React from 'react'
import CommandPalette from '@/components/CommandPalette'
import { productList } from '@/mock-up-data'

const App = (): JSX.Element => {
  return (
    <>
      <div className="grid min-h-screen place-items-center">
        <p className="text-stone-900">
          Press <Kbd>⌘ + K</Kbd> or <Kbd>Ctrl + K</Kbd> to open the command palette
        </p>
      </div>
      <CommandPalette productList={productList} />
    </>
  )
}

function Kbd(props: { children: string }) {
  return (
    <kbd className="shadow-stone-800/15 rounded-lg border-0 bg-stone-200/75 py-1 px-2 text-sm font-bold text-stone-700 shadow">
      {props.children}
    </kbd>
  )
}

export default App
