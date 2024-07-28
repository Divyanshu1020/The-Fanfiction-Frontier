import TopPost from "../TopPost";


export default function HomeRight() {
  return (
    <aside className=" hidden md:block">
      <div className=" w-full h-full flex flex-col gap-4">
        <TopPost title="Top Post" topPostsData={[]}/>
      </div>
    </aside>
    
  )
}
