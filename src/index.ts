import connectDB from './db';
import importData from './seeder';
import runQueries from './queries';

async function main() {
  try {
    await connectDB();
    await importData();
    await runQueries();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
