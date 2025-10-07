import React from 'react'
import Cards from './Cards'
import Landinglearning from '../Landinglearning'
import AatCommunity from '../LanguageLearning/AatCommunity'
import PopularPost from './PopularPost'

const Popular = () => {
  return (
    <>
<Cards />

      <div
        style={{ backgroundColor: "#f3f2f7" }}
        className="relative flex  overflow-y-auto w-full h-[calc(90vh)] bg-cover bg-center"
      >
        <main className={`relative z-20 flex flex-col gap-4  xl:flex-row text-black w-full`}>
          <div className={`flex-1 py-6 rounded-lg shadow-sm`}>
            <PopularPost />
          </div>
          <aside className="block max-w-6xl xl:w-[350px]  mx-2 mt-6">
            <div className="bg-white p-3 rounded-lg shadow-md">
              <AatCommunity />
            </div>
          </aside>
        </main>
      </div>
    </>
  )
}

export default Popular
