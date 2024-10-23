import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '../prismaInit';

export async function POST(req: NextRequest) { 
  const { name, email, password } = await req.json();  

  console.log(name, email, password);
  
  try {
    if (!email || !password || !name) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // store the hashed password
      },
    });

    return new Response(JSON.stringify(user), { status: 201 });  // Return the new user as response
  } catch (error) {
    return new Response(JSON.stringify({ error: 'User creation failed', details: error }), { status: 500 });
  }
}

// GET method handler
export async function GET() {
    console.log("this is get req");
    
  try {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), { status: 500 });
  }
}

export async function handleMethodNotAllowed(req: NextRequest) {
  return new Response(JSON.stringify({ error: req + ' Method not allowed' }), { status: 405 }); 
}
