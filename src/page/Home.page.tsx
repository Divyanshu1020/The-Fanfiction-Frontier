import Homeleft from "@/components/home/Home.left";
import HomePosts from "@/components/home/Home.posts";
import HomeRight from "@/components/home/Home.right";

export default function Homepage() {
  return (
    <div className=" gap-4 p-1 sm:p-3 md:p-4 lg:p-5 h-full grid grid-cols-1 sm:grid-cols-[2fr_5fr] md:grid-cols-[minmax(0,_240px)_2fr_1fr]">
      <Homeleft/>
      <HomePosts/>
      <HomeRight/>
    </div>
  );
}
