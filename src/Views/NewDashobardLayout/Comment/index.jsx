import React from 'react'
import AatCommunity from '../LanguageLearning/AatCommunity'
import CommentPost from './CommentPost'

const Comments = () => {
    return (
        <div
        style={{ backgroundColor: "#f3f2f7" }}
        className="relative flex flex-1 overflow-y-auto w-full h-[calc(90vh)] bg-cover bg-center"
        >
        <main className={`relative z-20 flex flex-col md:flex-row text-black w-full`}>
          <div className={`flex-1 py-6 rounded-lg shadow-sm`}>
            <CommentPost   />
          </div>
          <aside className="block max-w-6xl md:w-[350px] shrink-0 mx-5 mt-6">
            <div className="bg-white p-3 rounded-lg shadow-md">
              <AatCommunity />
            </div>
          </aside>
        </main>
      </div>
    )
}

export default Comments
