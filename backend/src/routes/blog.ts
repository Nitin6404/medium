import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@nitin6404/common-medium'

export const blogRoutes = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    },
    Variables: {
      userId: string,
      title: string,
      description: string
    }
  }>();

blogRoutes.use(async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
  c.set("userId", payload.id);
  await next();
});

blogRoutes.post('/:postId/like', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  const postId = c.req.param("postId");
  const userId = c.get("userId");
  const { success } = updateBlogInput.safeParse({ id: postId });
  if( !success ){
    c.status(411);
    return c.json({
      msg: "Update blog inputs are not correct"
    });
  }

  await prisma.post.update({
    where: {
      id: body.id,
    }, data: {
      likes: {
        increment: 1
      }
    }
  })
  console.log("Blog liked");
  return c.text("LIKED BLOG");
}
);

blogRoutes.post("/create", async  (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if( !success ){
    c.status(411);
    return c.json({
      msg: "Invalid blog input"
    })
  }

	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id
	});
});
  
blogRoutes.put("/update", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  const userId = c.get("userId");
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if( !success ){
    c.status(411);
    return c.json({
      msg: "Update blog inputs are not correct"
    });
  }

  await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId
    }, data: {
      title: body.title,
      content: body.content
    }
  })
  console.log("Blog updated");
  return c.text("UPDATED BLOG");
});
  
blogRoutes.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  const posts = await prisma.post.findMany({})


  return c.json(posts);
});
  
blogRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  const post = await prisma.post.findUnique({
    where: {
      id
    }
  })
  if(!post){
    c.status(403);
    return c.json({
      error: "Invalid post ID"
    });
  }
  return c.json(post);
});