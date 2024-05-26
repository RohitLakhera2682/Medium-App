import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import {withAccelerate}  from '@prisma/extension-accelerate'
import { verify} from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string;
      JWT_SECRET: string
    },
   Variables: {
    userId : string
   }
}>();

blogRouter.use("/*",async (c,next) => {
    const autheader = c.req.header("authorization")|| "";
  try{
    const user = await verify(autheader,c.env.JWT_SECRET);

    if(user) {
       c.set("userId",String(user.id));
        await next();
    } else{
        c.status(403);
        return c.json({
            msg: "you are not logged in"
        })
    }
  }
  catch(e) {
    c.status(403);
    return c.json({
        msg: "you are not logged in"
    })
  }
    
})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const userId = c.get("userId")
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
        data:{
            title: body.title,
            content: body.content,
            autherId: Number(userId)
        }
    })

    return c.json({
        id : blog.id
    })
  })
  
  blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id : blog.id
    })
  })



    //Todo: pagination
    blogRouter.get('/bulk', async(c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate())
    
          const blogs = await prisma.blog.findMany({
            select: {
              content: true,
              title: true,
              id: true,
              auther: {
                select: {
                  name: true
                }
              }
            }
          });
        return c.json({
            blogs
        })
      })


  
  blogRouter.get('/:id', async (c) => {
    const id =  c.req.param("id");
   
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findFirst({
            where:{
                id: Number(id)
            },
            select: {
              id: true,
              title: true,
              content:true,
              auther: {
                select: {
                  name: true
                }
              }
            }
            
        })
    
        return c.json({
            blog
        })
    }
    catch(e){
        c.status(411);
        return c.json({
            msg : "error while fetching blog post"
        })
    }
   
  })
  

