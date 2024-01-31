const z = require("zod");

const isValidMongoDBId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

const orderSchema = z.object({
  orderItems: z
    .array(
      z.object({
        product: z.string().nonempty(),
        quantity: z.number().positive().int(),
        price: z.number().positive(),
      })
    )
    .nonempty(),
  payment: z.object({
    amount: z.number().positive(),
    method: z.enum(["Cash", "Card", "Online"]),
    status: z.enum(["Pending", "Completed", "Failed"]),
  }),

  // userId can take from the logged in payload also
  users: z
    .array(
      z
        .string()
        .refine((id) => isValidMongoDBId(id), {
          message: "Invalid User _id format",
        })
    )
    .nonempty(),
});

const updateOrderSchema = z.object({
  orderItems: z
    .array(
      z.object({
        quantity: z.number().positive().int(),
        _id: z.string(),
      })
    )
    .nonempty()
    .optional(),
  user: z.string().refine((id) => isValidMongoDBId(id), {
    message: "Invalid User _id format",
  }),
  phone: z.string().optional(),
  shippingAddress: z.string().optional(),
});

module.exports = { orderSchema, updateOrderSchema };
