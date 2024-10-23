import bcrypt from 'bcryptjs';
import prisma from '@/app/api/prismaInit';

export const userService = {
  authorize,
};

async function authorize(username: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email: username }, 
  });

  if (!user) {
    return null; 
  }
 
  const isPasswordValid = bcrypt.compare(await bcrypt.hash(password, 10), user.password ?? '');

  if (!isPasswordValid) {
    return null; 
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
