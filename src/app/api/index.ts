import { NextResponse } from "next/server";

export async function GET() {
  const apiRoutes = {
    message: "Handcrafted Haven API",
    version: "1.0.0",
    endpoints: {
      auth: {
        login: {
          path: "/api/auth/login",
          method: "POST",
          description: "User authentication",
          authentication: "None",
          parameters: {
            body: {
              email: "string (required)",
              password: "string (required)"
            }
          }
        },
        register: {
          path: "/api/auth/register",
          method: "POST",
          description: "User registration",
          authentication: "None",
          parameters: {
            body: {
              name: "string (required)",
              email: "string (required)",
              password: "string (required)"
            }
          }
        },
        logout: {
          path: "/api/auth/logout",
          method: "POST",
          description: "User logout",
          authentication: "Required"
        },
        me: {
          path: "/api/auth/me",
          method: "GET",
          description: "Get current user",
          authentication: "Required"
        }
      },
      users: {
        profile: {
          path: "/api/users/profile",
          method: "GET",
          description: "Get user profile",
          authentication: "Required"
        },
        updateProfile: {
          path: "/api/users/profile",
          method: "PUT",
          description: "Update user profile",
          authentication: "Required",
          parameters: {
            body: {
              name: "string (optional)",
              email: "string (optional)"
            }
          }
        }
      },
      products: {
        list: {
          path: "/api/products",
          method: "GET",
          description: "Get products with filtering",
          authentication: "None",
          parameters: {
            query: {
              page: "number (optional, default: 1)",
              limit: "number (optional, default: 12, max: 50)",
              q: "string (optional, search query)",
              minPrice: "number (optional)",
              maxPrice: "number (optional)",
              tags: "string[] (optional)"
            }
          }
        },
        create: {
          path: "/api/products",
          method: "POST",
          description: "Create product (Seller only)",
          authentication: "Required (Seller role)",
          parameters: {
            body: {
              title: "string (required, min: 3)",
              description: "string (required, min: 10)",
              price: "number (required, min: 0)",
              currency: "string (optional, default: USD)",
              stock: "number (optional, default: 1)",
              tags: "string[] (optional)",
              images: "string[] (required, min: 1)",
              materials: "string[] (optional)"
            }
          }
        },
        getBySlug: {
          path: "/api/products/[slug]",
          method: "GET",
          description: "Get product by slug",
          authentication: "None"
        }
      },
      cart: {
        get: {
          path: "/api/cart",
          method: "GET",
          description: "Get user cart",
          authentication: "Required"
        },
        addItem: {
          path: "/api/cart",
          method: "POST",
          description: "Add item to cart",
          authentication: "Required",
          parameters: {
            body: {
              productId: "string (required)",
              qty: "number (optional, default: 1, min: 1)"
            }
          }
        },
        removeItem: {
          path: "/api/cart",
          method: "DELETE",
          description: "Remove item from cart",
          authentication: "Required",
          parameters: {
            body: {
              productId: "string (required)"
            }
          }
        },
        calculatePrice: {
          path: "/api/cart/price",
          method: "POST",
          description: "Calculate cart prices",
          authentication: "None",
          parameters: {
            body: {
              items: {
                type: "array",
                items: {
                  productId: "string (required)",
                  qty: "number (required, min: 1)"
                }
              }
            }
          }
        }
      },
      orders: {
        list: {
          path: "/api/orders",
          method: "GET",
          description: "Get user orders",
          authentication: "Required"
        },
        create: {
          path: "/api/orders",
          method: "POST",
          description: "Create order",
          authentication: "Required",
          parameters: {
            body: {
              items: {
                type: "array",
                items: {
                  productId: "string (required)",
                  qty: "number (required, min: 1)"
                }
              },
              shippingAddress: {
                street: "string (required)",
                city: "string (required)",
                state: "string (required)",
                zip: "string (required)",
                country: "string (required)"
              }
            }
          }
        },
        getById: {
          path: "/api/orders/[id]",
          method: "GET",
          description: "Get order by ID",
          authentication: "Required"
        }
      },
      reviews: {
        create: {
          path: "/api/reviews",
          method: "POST",
          description: "Create review (Verified buyers only)",
          authentication: "Required",
          parameters: {
            body: {
              productId: "string (required)",
              rating: "number (required, min: 1, max: 5)",
              text: "string (required, min: 10)"
            }
          }
        },
        moderate: {
          path: "/api/reviews/[id]",
          method: "PATCH",
          description: "Moderate review (Admin only)",
          authentication: "Required (Admin role)",
          parameters: {
            body: {
              moderatedStatus: "string (required, enum: approved|rejected)"
            }
          }
        },
        delete: {
          path: "/api/reviews/[id]",
          method: "DELETE",
          description: "Delete review (Admin only)",
          authentication: "Required (Admin role)"
        }
      },
      payment: {
        createIntent: {
          path: "/api/payment/intent",
          method: "POST",
          description: "Create payment intent",
          authentication: "Required",
          parameters: {
            body: {
              amount: "number (required)",
              currency: "string (optional, default: usd)"
            }
          }
        },
        webhook: {
          path: "/api/payment/webhook",
          method: "POST",
          description: "Stripe webhook handler",
          authentication: "Stripe signature"
        }
      },
      admin: {
        stats: {
          path: "/api/admin/stats",
          method: "GET",
          description: "Get admin statistics",
          authentication: "Required (Admin role)"
        },
        users: {
          path: "/api/admin/users",
          method: "GET",
          description: "Get users list (Admin only)",
          authentication: "Required (Admin role)"
        }
      },
      utility: {
        upload: {
          path: "/api/upload",
          method: "POST",
          description: "File upload",
          authentication: "Required",
          parameters: {
            body: {
              file: "File (required)"
            }
          }
        },
        health: {
          path: "/api/health",
          method: "GET",
          description: "Health check",
          authentication: "None"
        },
        docs: {
          path: "/api/docs",
          method: "GET",
          description: "API documentation",
          authentication: "None"
        },
        swagger: {
          path: "/api/swagger",
          method: "GET",
          description: "OpenAPI/Swagger documentation",
          authentication: "None"
        }
      }
    },
    authentication: {
      type: "JWT Bearer Token",
      howTo: "Include Authorization header: Bearer <token>",
      tokenAcquisition: "Login endpoint returns token in response cookie"
    },
    errorResponses: {
      "400": "Bad Request - Invalid parameters",
      "401": "Unauthorized - Authentication required",
      "403": "Forbidden - Insufficient permissions",
      "404": "Not Found - Resource not found",
      "409": "Conflict - Resource already exists",
      "422": "Unprocessable Entity - Validation error",
      "429": "Too Many Requests - Rate limit exceeded",
      "500": "Internal Server Error - Server error"
    },
    rateLimiting: {
      default: "100 requests per minute per IP",
      auth: "10 requests per minute per IP",
      strict: "5 requests per minute for sensitive operations"
    }
  };

  return NextResponse.json(apiRoutes);
}