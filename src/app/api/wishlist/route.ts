// // app/api/wishlist/route.ts
// import { NextResponse } from "next/server";
// import { requireAuth } from "@/lib/auth";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";

// export async function POST(req: Request) {
//   const payload = requireAuth(req);
//   if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
//   const { productId } = await req.json();
//   await connectDB();
  
//   await User.findByIdAndUpdate(
//     payload.sub,
//     { $addToSet: { wishlist: productId } }
//   );
  
//   return NextResponse.json({ success: true });
// }

// export async function DELETE(req: Request) {
//   const payload = requireAuth(req);
//   if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
//   const { productId } = await req.json();
//   await connectDB();
  
//   await User.findByIdAndUpdate(
//     payload.sub,
//     { $pull: { wishlist: productId } }
//   );
  
//   return NextResponse.json({ success: true });
// }
// app/api/wishlist/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

type LeanUser = {
  _id: string;
  wishlist?: string[];
};

export async function POST(req: Request) {
  const { productId } = await req.json();
  await connectDB();

  const user = await User.findOne().lean<LeanUser>();
  if (!user || !user._id)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  await User.findByIdAndUpdate(
    user._id,
    { $addToSet: { wishlist: productId } }
  );

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { productId } = await req.json();
  await connectDB();

  const user = await User.findOne().lean<LeanUser>();
  if (!user || !user._id)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  await User.findByIdAndUpdate(
    user._id,
    { $pull: { wishlist: productId } }
  );

  return NextResponse.json({ success: true });
}
