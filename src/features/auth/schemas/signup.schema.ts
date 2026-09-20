import z from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(1, { error: "name is required" }),
    email: z
      .string()
      .min(1, { error: "email is required" })
      .email({ error: "email is invalid. please try another one" })
      ,
    password: z
      .string()
      .min(1, { error: "password is required" })
      .regex(/[A-Z]/, {
        error: "password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        error: "password must contain at least one lowecase letter",
      })
      .regex(/[0-9]/, { error: "password must contain at least one number" })
      .regex(/[@#$%^&*!_]/, {
        error:
          "password must contain at least one of the following special character @,#,$,%,^,&,*,!,_",
      }),
    rePassword: z.string().min(1, { error: "confirm password is required" }),
    phone: z
      .string()
      .min(1, { error: "phone is required" })
      .regex(/^01[0125][0-9]{8}$/, {
        error: "we only accept egypytian phone numbers",
      }),
  })
  .refine((data) => data.password === data.rePassword, {
    error: "password and conform password should be the same",
    path: ["rePassword"], 
  });

export  type signupValues = z.infer<typeof signupSchema>