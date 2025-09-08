import { createContext } from "react";
let blogs=[
    {
        id:1,
        title:"First Blog",
        body:"data about first blog "
    },
        {
        id:2,
        title:"Second Blog",
        body:"data about second blog "
    },
    {
        id:3,
        title:"Third Blog",
        body:"data about third blog "
    }
]

export const   BlogsContext=createContext(blogs);
