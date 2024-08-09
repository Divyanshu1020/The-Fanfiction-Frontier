export default function Avatar({ authorName, size }:{authorName:string | undefined, size:number}) {
  return (
    <div className={` p-1 h-${size + 2}  cursor-pointer whitespace-nowrap hover:bg-[#3b49df1a]  rounded-full relative `}>
      {authorName ? (
        <div className={`flex items-center justify-center bg-slate-200 rounded-full h-${size} w-${size} `}>
          {authorName && authorName[0]}
        </div>
      ) : (
        <div className={` loading-text rounded-full h-${size} w-${size} `}></div>
      )}
    </div>
  );
}
