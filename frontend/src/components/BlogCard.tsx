import { Link } from "react-router-dom"

interface BlogCardProps {
    autherName : string,
    title: string,
    content: string,
    publishedDate: string,
    id: number
}

export const BlogCard = ({
    id,
    autherName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}> 
     <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md curser-pointer">
        <div className="flex">
            
               <Avatar name={autherName}/> 
            
           
           <div className="font-normal pl-2 text-sm flex justify-center flex-col">{autherName}</div>
           <div className="flex justify-center pl-2 flex-col flex justify-center flex-col">
                <Circle/>
           </div>
           <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
               {publishedDate}
            </div>
        </div>
        <div className="text-xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100) + "..."}
        </div>
        <div className=" text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(content.length/100)} minute(s)`}
        </div>
    </div>
    </Link>
}

 export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}


export function Avatar({name, size="small"}: {name: string, size?: "small" | "big"}) { 
    return <div className={`relative inline-flex items-center justify-center ${size === "small"? "w-6 h-6": "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`${size === "small" ? "text-xs" : "text-md"} text-gray-600 dark:text-gray-300`}>{name[0]}</span>
    </div>
    
}