<!-- You can generate a JWT in terminal, and copy it in .env  -->
openssl rand -base64 32

<!-- Run seeds to DB-->
npx ts-node src/scripts/seedDatabase.ts

<!-- Run locales JSON aplphabetical sorting-->
npx ts-node src/scripts/sortLocaleJsonKeys.ts

<!-- Run mongo DB -->
mongod#   n o d e - k o n f i g u r a t o r - 2 0 2 4  
 