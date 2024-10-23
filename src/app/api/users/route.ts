import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '../prismaInit';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

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

    return new Response(JSON.stringify(user), { status: 201 }); // Return the new user as response
  } catch (error) {
    return new Response(JSON.stringify({ error: 'User creation failed', details: error }), { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch users' + error }), { status: 500 });
  }
}

// For unsupported methods, you can add a global handler for all methods
export async function PUT() {
  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
}
