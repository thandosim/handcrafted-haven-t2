import { NextResponse } from "next/server";

export async function GET() {
  const swaggerDocument = {
    openapi: "3.0.0",
    info: {
      title: "Handcrafted Haven API",
      description: "API documentation for Handcrafted Haven - Marketplace for Artisans",
      version: "1.0.0",
      contact: {
        name: "API Support",
        email: "support@handcraftedhaven.com"
      }
    },
    servers: [
      {
        url: process.env.APP_URL || "http://localhost:3000",
        description: "Development server"
      },
      {
        url: "https://handcrafted-haven.vercel.app",
        description: "Production server"
      }
    ],
    tags: [
      { name: "Authentication", description: "User authentication endpoints" },
      { name: "Users", description: "User management endpoints" },
      { name: "Products", description: "Product management endpoints" },
      { name: "Cart", description: "Shopping cart endpoints" },
      { name: "Orders", description: "Order management endpoints" },
      { name: "Reviews", description: "Product review endpoints" },
      { name: "Payment", description: "Payment processing endpoints" },
      { name: "Admin", description: "Administrative endpoints" }
    ],
    paths: {
      "/api/auth/login": {
        post: {
          tags: ["Authentication"],
          summary: "User login",
          description: "Authenticate user and return JWT token",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: { type: "string", format: "email" },
                    password: { type: "string" }
                  },
                  required: ["email", "password"]
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Login successful",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      user: { $ref: "#/components/schemas/User" },
                      token: { type: "string" }
                    }
                  }
                }
              }
            },
            "401": { description: "Invalid credentials" },
            "422": { description: "Validation error" }
          }
        }
      },
      "/api/auth/register": {
        post: {
          tags: ["Authentication"],
          summary: "User registration",
          description: "Create a new user account",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    email: { type: "string", format: "email" },
                    password: { type: "string" }
                  },
                  required: ["name", "email", "password"]
                }
              }
            }
          },
          responses: {
            "201": {
              description: "User created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      user: { $ref: "#/components/schemas/User" }
                    }
                  }
                }
              }
            },
            "409": { description: "Email already registered" },
            "422": { description: "Validation error" }
          }
        }
      },
      "/api/auth/me": {
        get: {
          tags: ["Authentication"],
          summary: "Get current user",
          description: "Retrieve information about the currently authenticated user",
          security: [{ bearerAuth: [] }],
          responses: {
            "200": {
              description: "User information",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      user: { $ref: "#/components/schemas/User" }
                    }
                  }
                }
              }
            },
            "401": { description: "Unauthorized" }
          }
        }
      },
      "/api/products": {
        get: {
          tags: ["Products"],
          summary: "Get products list",
          description: "Retrieve paginated list of products with optional filtering",
          parameters: [
            {
              name: "page",
              in: "query",
              description: "Page number",
              schema: { type: "integer", minimum: 1, default: 1 }
            },
            {
              name: "limit",
              in: "query",
              description: "Number of items per page",
              schema: { type: "integer", minimum: 1, maximum: 50, default: 12 }
            },
            {
              name: "q",
              in: "query",
              description: "Search query",
              schema: { type: "string" }
            },
            {
              name: "minPrice",
              in: "query",
              description: "Minimum price filter",
              schema: { type: "number", minimum: 0 }
            },
            {
              name: "maxPrice",
              in: "query",
              description: "Maximum price filter",
              schema: { type: "number", minimum: 0 }
            },
            {
              name: "tags",
              in: "query",
              description: "Filter by tags",
              schema: { type: "array", items: { type: "string" } }
            }
          ],
          responses: {
            "200": {
              description: "Products retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      products: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Product" }
                      },
                      pagination: { $ref: "#/components/schemas/Pagination" }
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ["Products"],
          summary: "Create product",
          description: "Create a new product (Seller only)",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ProductCreate"
                }
              }
            }
          },
          responses: {
            "201": {
              description: "Product created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      product: { $ref: "#/components/schemas/Product" }
                    }
                  }
                }
              }
            },
            "401": { description: "Unauthorized" },
            "403": { description: "Forbidden (Not a seller)" },
            "422": { description: "Validation error" }
          }
        }
      },
      "/api/products/{slug}": {
        get: {
          tags: ["Products"],
          summary: "Get product by slug",
          description: "Retrieve a single product by its slug",
          parameters: [
            {
              name: "slug",
              in: "path",
              required: true,
              description: "Product slug",
              schema: { type: "string" }
            }
          ],
          responses: {
            "200": {
              description: "Product retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      product: { $ref: "#/components/schemas/Product" }
                    }
                  }
                }
              }
            },
            "404": { description: "Product not found" }
          }
        }
      },
      "/api/cart": {
        get: {
          tags: ["Cart"],
          summary: "Get user cart",
          description: "Retrieve the current user's shopping cart",
          security: [{ bearerAuth: [] }],
          responses: {
            "200": {
              description: "Cart retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      cart: {
                        type: "array",
                        items: { $ref: "#/components/schemas/CartItem" }
                      }
                    }
                  }
                }
              }
            },
            "401": { description: "Unauthorized" }
          }
        },
        post: {
          tags: ["Cart"],
          summary: "Add item to cart",
          description: "Add a product to the user's shopping cart",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    productId: { type: "string" },
                    qty: { type: "integer", minimum: 1 }
                  },
                  required: ["productId"]
                }
              }
            }
          },
          responses: {
            "200": { description: "Item added to cart successfully" },
            "401": { description: "Unauthorized" },
            "404": { description: "Product not found" },
            "422": { description: "Validation error" }
          }
        },
        delete: {
          tags: ["Cart"],
          summary: "Remove item from cart",
          description: "Remove a product from the user's shopping cart",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    productId: { type: "string" }
                  },
                  required: ["productId"]
                }
              }
            }
          },
          responses: {
            "200": { description: "Item removed from cart successfully" },
            "401": { description: "Unauthorized" }
          }
        }
      },
      "/api/orders": {
        get: {
          tags: ["Orders"],
          summary: "Get user orders",
          description: "Retrieve the current user's order history",
          security: [{ bearerAuth: [] }],
          responses: {
            "200": {
              description: "Orders retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      orders: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Order" }
                      }
                    }
                  }
                }
              }
            },
            "401": { description: "Unauthorized" }
          }
        },
        post: {
          tags: ["Orders"],
          summary: "Create order",
          description: "Create a new order from cart items",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/OrderCreate"
                }
              }
            }
          },
          responses: {
            "201": {
              description: "Order created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      order: { $ref: "#/components/schemas/Order" }
                    }
                  }
                }
              }
            },
            "401": { description: "Unauthorized" },
            "422": { description: "Validation error" }
          }
        }
      },
      "/api/payment/intent": {
        post: {
          tags: ["Payment"],
          summary: "Create payment intent",
          description: "Create a Stripe payment intent for checkout",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    amount: { type: "number", description: "Amount in dollars" },
                    currency: { type: "string", default: "usd" }
                  },
                  required: ["amount"]
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Payment intent created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      clientSecret: { type: "string" },
                      id: { type: "string" }
                    }
                  }
                }
              }
            },
            "401": { description: "Unauthorized" },
            "400": { description: "Invalid amount" }
          }
        }
      }
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            email: { type: "string", format: "email" },
            role: { type: "string", enum: ["buyer", "seller", "admin"] },
            avatar: { type: "string", nullable: true },
            createdAt: { type: "string", format: "date-time" }
          }
        },
        Product: {
          type: "object",
          properties: {
            _id: { type: "string" },
            sellerId: { type: "string" },
            title: { type: "string" },
            slug: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            currency: { type: "string" },
            images: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  url: { type: "string" },
                  alt: { type: "string", nullable: true }
                }
              }
            },
            stock: { type: "integer" },
            tags: { type: "array", items: { type: "string" } },
            materials: { type: "array", items: { type: "string" } },
            status: { type: "string", enum: ["draft", "active", "suspended"] },
            ratingAvg: { type: "number" },
            ratingCount: { type: "integer" },
            createdAt: { type: "string", format: "date-time" }
          }
        },
        ProductCreate: {
          type: "object",
          properties: {
            title: { type: "string", minLength: 3 },
            description: { type: "string", minLength: 10 },
            price: { type: "number", minimum: 0 },
            currency: { type: "string", default: "USD" },
            stock: { type: "integer", minimum: 0, default: 1 },
            tags: { type: "array", items: { type: "string" } },
            images: {
              type: "array",
              items: { type: "string" },
              minItems: 1
            },
            materials: { type: "array", items: { type: "string" } }
          },
          required: ["title", "description", "price"]
        },
        CartItem: {
          type: "object",
          properties: {
            productId: { type: "string" },
            qty: { type: "integer", minimum: 1 },
            addedAt: { type: "string", format: "date-time" }
          }
        },
        Order: {
          type: "object",
          properties: {
            _id: { type: "string" },
            buyerId: { type: "string" },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productId: { type: "string" },
                  qty: { type: "integer" },
                  price: { type: "number" },
                  title: { type: "string" }
                }
              }
            },
            total: { type: "number" },
            status: {
              type: "string",
              enum: ["pending", "processing", "shipped", "delivered", "cancelled"]
            },
            payment: {
              type: "object",
              properties: {
                provider: { type: "string" },
                intentId: { type: "string", nullable: true },
                status: {
                  type: "string",
                  enum: ["pending", "succeeded", "failed"]
                }
              }
            },
            shippingAddress: {
              type: "object",
              properties: {
                street: { type: "string" },
                city: { type: "string" },
                state: { type: "string" },
                zip: { type: "string" },
                country: { type: "string" }
              },
              nullable: true
            },
            createdAt: { type: "string", format: "date-time" }
          }
        },
        OrderCreate: {
          type: "object",
          properties: {
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productId: { type: "string" },
                  qty: { type: "integer", minimum: 1 }
                },
                required: ["productId", "qty"]
              },
              minItems: 1
            },
            shippingAddress: {
              type: "object",
              properties: {
                street: { type: "string" },
                city: { type: "string" },
                state: { type: "string" },
                zip: { type: "string" },
                country: { type: "string" }
              },
              required: ["street", "city", "state", "zip", "country"]
            }
          },
          required: ["items", "shippingAddress"]
        },
        Pagination: {
          type: "object",
          properties: {
            page: { type: "integer" },
            limit: { type: "integer" },
            total: { type: "integer" },
            totalPages: { type: "integer" }
          }
        }
      }
    }
  };

  return NextResponse.json(swaggerDocument);
}