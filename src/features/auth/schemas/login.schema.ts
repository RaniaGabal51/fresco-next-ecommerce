import z from "zod";

export const loginSchema = z
  .object({
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
  
  })
 

export  type loginValues = z.infer<typeof loginSchema>