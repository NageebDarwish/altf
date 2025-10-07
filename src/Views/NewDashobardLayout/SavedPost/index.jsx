import React from 'react'
import MyAnswer from '../MyAnswer/MyAnswer'
import AatCommunity from '../LanguageLearning/AatCommunity'
import SavedPost from './SavedPost'

const Saved = () => {
  return (
    <div
    style={{ backgroundColor: "#f3f2f7" }}
    className="relative flex flex-1 overflow-y-auto w-full h-[calc(90vh)] bg-cover bg-center"
    >
    <main className={`relative z-20 flex flex-col gap-4 xl:flex-row text-black w-full`}>
      <div className={`flex-1 py-6 rounded-lg shadow-sm`}>
        <SavedPost />
      </div>
      <aside className="block w-auto xl:w-[350px] mx-2 mt-6">
        <div className="bg-white p-3 rounded-lg shadow-md">
          <AatCommunity />
        </div>
      </aside>
    </main>
  </div>
  )
}

export default Saved
