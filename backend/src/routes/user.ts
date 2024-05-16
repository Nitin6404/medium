import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { signupInput, signinInput } from '@nitin6404/common-medium'

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    },
    Variables: {
      userId: string
    }
  }>();

userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if( !success ){
      c.status(411);
      return c.json({
        msg: "Inputs are not correct"
      });
    }

    try{
      const user = await prisma.user.create({
        data : {
          email: body.email,
          password: body.password
        },
      })
      const payload = {
        id: user.id
      };
      const secret = c.env.JWT_SECRET;
      const token = await sign(payload, secret);
      return c.json({
        jwt: token
      });
    }catch(e){
      c.status(403);
      return c.json({
        error: "Error while signing uppp"
      });
    }
  });
  
userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if( !success ){
      c.status(411);
      return c.json({
        msg: "Invalid SignIn Inputs"
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });
    if(!user){
      c.status(403);
      return c.json({
        error: "User not found"
      })
    }
    const token = await sign({id: user.id}, c.env.JWT_SECRET);
    return c.json({
      jwt: token
    });
  });

