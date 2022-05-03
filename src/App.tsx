import React from 'react'
import CommandPalette from '@/components/CommandPalette'
import { productList } from '@/mock-up-data'

const App = (): JSX.Element => {
  return (
    <>
      <div className="min-h-screen grid place-items-center">
        <p>
          Press <kbd>command</kbd> to open the command palette
        </p>
      </div>
      <CommandPalette productList={productList} />
    </>
  )
}

export default App
