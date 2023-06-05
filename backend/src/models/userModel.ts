import mongoose, { InferSchemaType, model, Schema, Types } from "mongoose";
// unique: true,//don't use unique//no custom error//creates extra index//check in controller
//note, type inference will add union string | undefined if no default or require property on a field

export interface IUser {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  profileUrl: string; //image url on cloud nary
  roles: string[]; //with array, you can do user.roles.push('')
  newEmail: string;
  isVerified: boolean;
  verifyEmailToken: string | null;
  resetPasswordToken: string | null;
  resetPasswordTokenExpiresAt: number | null;
}

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    phoneNumber: { type: String },
    profileUrl: { type: String },
    roles: { type: [String], default: ["admin"] }, //arr of strings
    newEmail: { type: String },
    isVerified: { type: Boolean, default: false },
    verifyEmailToken: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordTokenExpiresAt: { type: Number },
  },
  { timestamps: true }
);

//type User = InferSchemaType<typeof userSchema>;
export default model<IUser>("User", userSchema);

//mongoose returned object has methods like save or remove//you can add more
//here we add match password, this refers to the doc/object returned
//compare password
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };
// //// will encrypt password every time its saved//called before change
// userSchema.pre("save", async function (next) {
//   if (!this.isModified) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });
// const user = await User.findOne({ email });
//  if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       token: generateToken(user._id),
//     });

//     //in update and register, pass raw password and it will be hashed before save
//   const user = await User.findById(req.user._id);
//   if (user) {
//     user.name = req.body.name || user.name;
//     if (req.body.password) {
//       user.password = req.body.password;    }
//     const updatedUser = await user.save();
//   }
