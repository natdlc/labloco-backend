Welcome! This is the backend for Zuitt's E-commerce capstone. Listed below are all the features built (and in progress).

MINIMUM

- (complete) User registration
- (complete) User authentication
- (complete) Create Product (Admin only)
- (complete) Retrieve all active products
- (complete) Retrieve single product
- (complete) Update Product information (Admin only)
- (complete) Archive Product (Admin only)
- (complete) Non-admin User checkout (Create Order)

STRETCH

- (complete) Set user as admin (Admin only)
- (complete) Retrieve authenticated user’s orders
- (complete) Retrieve all orders (Admin only)

EXTRAS

Cart

- (complete) Add to cart active product only (auth)
- (complete) Remove product from cart (auth)
- (complete) Clear cart (auth)
- (complete) Admin can't add to cart

Users

- (complete) Schema update: registeredOn, firstName, lastName, address, mobileNum
- (complete) No duplicate users (via email)
- (complete) Retrieve authenticated user profile (authed)
- (complete) Retrieve authenticated user's specific oder
- (complete) Change password (user only)
- (complete) Retrieve all users (admin only)

Newsletter

- (complete) Subscribe to newsletter
- (complete) No duplicate emails
- (complete) Retrieve newsletter emails (admin only)
- (complete) Unsubscribe from newsletter

Products

- (complete) Schema update: stocks, categories, options
- (complete) No duplicate product (via name)
- (complete) Retrieve all products (admin only)
- (complete) Retrieve single product (active only)
- (complete) Retrieve any single product (admin only)
- (complete) Create image for product (admin only)
- (complete) Retrieve image for product
- (complete) Delete image for product (admin only)
- (complete) Add custom order option with value (admin only)
- (complete) Can't add duplicate option value in same option label (admin only)
- (complete) Delete custom order option (admin only)
- (complete) Can't delete non-existent order value in order label (admin only)
- (complete) Add categories to product (admin only)
- (complete) Add only active categories to product (admin only)
- (complete) Remove from category (admin only)

Category

- (complete) Add a category (admin only)
- (complete) Add hot/featured products section (admin only)
- (complete) retrieve all active categories (all users)
- (complete) Retrieve all categories (admin only)
- (complete) Retrieve active products in specific category
- (complete) Retrieve all products in specific category (admin only)
- (complete) Edit category name (admin only)
- (complete) Can't edit category if name exists (admin only)
- (complete) Archive a category (admin only)
- (complete) Unarchive a category (admin only)
- (complete) Remove a category (admin only)
- (complete) Add product to category (admin only)
- (complete) Can't delete category linked to products (admin only)

Courier

- (complete) Create courier (admin only)
- (complete) Retrieve couriers (admin only)
- (complete) Deactivate courier (admin only)

Orders

- (complete) Schema update: comments(optional), courier, status
- (complete) Can only order active products
- (complete) Orders catch cart products
- (complete) User's cart clears when order is processed
- (complete) Discounts apply to orders (users only)
- (complete) Calculate percentage-based discounts
- (complete) Calculate fixed-amount-based discounts
- (complete) Attach courier to order
- (complete) Update status

Discounts

- (complete) Create discounts (admin only)
- (complete) Retrieve discounts (admin only)
- (complete) Set discount to inactive (admin only)
