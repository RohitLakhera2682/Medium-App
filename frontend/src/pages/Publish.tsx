import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    return <div>
        <Appbar/>
            <div className="flex justify-center w-full pt-8">
            
                <div className="max-w-screen-lg w-full ">

                <input onChange={(e) => {
                    setTitle(e.target.value)
                }}   type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Title"/>
                
                <TextEditor onChange = {(e) => {
                    setDescription(e.target.value)
                }} />
                <button onClick={ async () => {
                   const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                        title,
                        content : description
                    },{
                        headers : {
                            Authorization : localStorage.getItem("token")
                        }
                    });
                    navigate(`/blog/${response.data.id}`) 
                }} type="button" className=" mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Publish Post</button>
            </div>
        </div>
    </div> 
}


function TextEditor({onChange}: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div>
            
             <textarea onChange={onChange} className=" mt-4 min-h-80 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
    </div>
    
    
}