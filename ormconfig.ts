import 'dotenv/config';

export = {
   type: "mongodb",
   url: process.env.MONGO_URL,
   useNewUrlParser: true,
   synchronize: true,
   useUnifiedTopology: true,
   logging: true,
   ssl: true,
   authSource: "admin",
   entities: [
      "src/schemas/**/*.ts"
   ]
}