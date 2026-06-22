-- Migration: Add selected_size column to cart_items table
-- This enables the cart system to track different sizes of the same product as separate items

-- Step 1: Add the selected_size column with a default value
ALTER TABLE cart_items ADD COLUMN selected_size text NOT NULL DEFAULT 'M';

-- Step 2: Drop the old unique constraint (user_id, product_id)
ALTER TABLE cart_items DROP CONSTRAINT IF EXISTS cart_items_user_id_product_id_key;

-- Step 3: Create new unique constraint (user_id, product_id, selected_size)
-- This ensures each user can only have one cart item per product per size
ALTER TABLE cart_items ADD UNIQUE(user_id, product_id, selected_size);

-- Step 4: Update the index for better performance
DROP INDEX IF EXISTS idx_cart_items_user_product;
CREATE INDEX idx_cart_items_user_product_size ON cart_items(user_id, product_id, selected_size);

-- Verification: Check the updated table structure
-- SELECT * FROM cart_items LIMIT 1;
-- \d cart_items;
