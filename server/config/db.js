const mongoose = require('mongoose');
const connectDB = async () => {
  const db = `mongodb+srv://Blog123:rjaAXqX0QWYSmmDz@blog-collage.rarkfe4.mongodb.net/?retryWrites=true&w=majority`
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(db);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }

}

module.exports = connectDB;
