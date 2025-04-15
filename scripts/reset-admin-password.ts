import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

async function resetAdminPassword() {
  const prisma = new PrismaClient();
  
  try {
    // Generate a new password hash
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log(`Generated hash for '${password}': ${hashedPassword}`);
    
    // Update the admin user's password
    const updatedUser = await prisma.user.update({
      where: {
        email: 'admin@ansa-fs.com'
      },
      data: {
        password: hashedPassword
      }
    });
    
    console.log('Admin password updated successfully!');
    console.log('User details:', updatedUser);
    
  } catch (error) {
    console.error('Error updating admin password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdminPassword();