import mongoose from "mongoose";

// MongoDB connection URI
const MONGODB_URI = "mongodb+srv://tola1_db_user:D11iPvazMjM5kDiX@haven.zrptql2.mongodb.net/?retryWrites=true&w=majority";

// Flexible User schema
const userSchema = new mongoose.Schema({}, { strict: false });
const User = mongoose.model("User", userSchema);

// Avatar updates
const avatarUpdates = [
  {
    email: "collective@example.com",
    avatar: "https://cdn.pixabay.com/photo/2014/05/31/23/16/teacher-359311_1280.png"
  },
  {
    email: "claycanvas@example.com",
    avatar: "https://cdn.pixabay.com/photo/2016/12/07/21/01/cartoon-1890438_1280.jpg"
  },
  {
    email: "threadneedle@example.com",
    avatar: "https://cdn.pixabay.com/photo/2023/03/15/09/32/woman-7854120_1280.png"
  },
  {
    email: "woodworks@example.com",
    avatar: "https://cdn.pixabay.com/photo/2016/11/01/21/11/avatar-1789663_1280.png"
  },
  {
    email: "beadbloom@example.com",
    avatar: "https://cdn.pixabay.com/photo/2022/11/21/15/48/girl-7607431_640.png"
  },
  {
    email: "indigostudio@example.com",
    avatar: "https://cdn.pixabay.com/photo/2024/04/03/05/11/ai-generated-8672065_640.jpg"
  },
  {
    email: "ecocrafts@example.com",
    avatar: "https://cdn.pixabay.com/photo/2022/01/18/17/09/woman-6947638_640.jpg"
  },
  {
    email: "bohobazaar@example.com",
    avatar: "https://cdn.pixabay.com/photo/2016/12/07/21/01/cartoon-1890438_1280.jpg"
  }
];

async function updateAvatars() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    for (const { email, avatar } of avatarUpdates) {
      const result = await User.updateOne(
        { email, role: "seller" },
        { $set: { avatar } }
      );

      if (result.modifiedCount > 0) {
        console.log(`🔄 Updated avatar for ${email}`);
      } else {
        console.warn(`⚠️ No match found or already updated for ${email}`);
      }
    }

    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Error updating avatars:", err);
    process.exit(1);
  }
}

updateAvatars();
