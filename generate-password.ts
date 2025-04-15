import * as bcrypt from 'bcryptjs';

async function generateHash(): Promise<void> {
  const password: string = 'admin123';
  
  // Generate a salt
  const salt: string = await bcrypt.genSalt(10);
  
  // Hash the password with the salt
  const hash: string = await bcrypt.hash(password, salt);
  
  console.log('Password:', password);
  console.log('Generated hash:', hash);
  
  // Verify the hash works
  const isMatch: boolean = await bcrypt.compare(password, hash);
  console.log('Verification test:', isMatch);
  
  // SQL command to insert the user
  console.log('\nSQL command to insert admin user:');
  console.log(`
INSERT INTO "User" (
  "id", 
  "name", 
  "email", 
  "password", 
  "role", 
  "createdAt", 
  "updatedAt"
) 
VALUES (
  'admin_' || gen_random_uuid(), 
  'Admin User', 
  'admin@ansa-fs.com', 
  '${hash}', 
  'ADMIN', 
  CURRENT_TIMESTAMP, 
  CURRENT_TIMESTAMP
);
  `);
}

generateHash();