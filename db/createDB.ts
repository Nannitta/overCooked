import { getPool } from './connectDB.ts';
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';

const createDB = async (): Promise<void> => {
  try {
    const pool = getPool();

    const { ADMIN_PASS } = process.env;

    await pool.query('CREATE DATABASE IF NOT EXISTS escandallos;');

    await pool.query('USE escandallos;');

    console.log('Deleting tables...');

    await pool.query(`DROP TABLE IF EXISTS 
      recipes_ingredients, 
      recipes, 
      ingredients_suppliers, 
      ingredients, 
      ingredientType, 
      users_suppliers, 
      suppliers, 
      users;`);

    console.log('Creating tables...');

    await pool.query(`CREATE TABLE IF NOT EXISTS users (
      userId VARCHAR(50) NOT NULL PRIMARY KEY,
        companyName VARCHAR(100) NOT NULL,
        CIF VARCHAR(15) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        address VARCHAR(250) NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        province VARCHAR(100) NOT NULL,
        postalCode VARCHAR(10) NOT NULL,
        web VARCHAR(100),
        role ENUM('client', 'admin') DEFAULT 'client',
        activationCode VARCHAR(100),
        active TINYINT UNSIGNED NOT NULL DEFAULT 0,
        createdAt DATETIME DEFAULT NOW() NOT NULL,
        modifiedAt DATETIME DEFAULT NULL 
      );`);
    await pool.query(`CREATE TABLE IF NOT EXISTS suppliers (
      supplierId VARCHAR(50) NOT NULL PRIMARY KEY,
        supplierName VARCHAR(100) NOT NULL,
        CIF VARCHAR(15) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        address VARCHAR(250) NOT NULL,
        web VARCHAR(100) NOT NULL,
        responsiveName VARCHAR(100) NOT NULL,
      createdAt DATETIME DEFAULT NOW() NOT NULL,
        modifiedAt DATETIME DEFAULT NULL 
      );`);
    await pool.query(`CREATE TABLE IF NOT EXISTS users_suppliers (
      userId VARCHAR(50) NOT NULL,
      FOREIGN KEY (userId) REFERENCES users (userId)
        ON UPDATE CASCADE
            ON DELETE RESTRICT,
      supplierId VARCHAR(50) NOT NULL,
        FOREIGN KEY (supplierId) REFERENCES suppliers (supplierId)
        ON UPDATE CASCADE
            ON DELETE RESTRICT,
      createdAt DATETIME DEFAULT NOW() NOT NULL,
        modifiedAt DATETIME DEFAULT NULL 
      );`);
    await pool.query(`CREATE TABLE IF NOT EXISTS ingredientType (
      ingredientTypeId VARCHAR(50) NOT NULL PRIMARY KEY,
        ingredientTypeName VARCHAR(100) NOT NULL UNIQUE,
      createdAt DATETIME DEFAULT NOW() NOT NULL,
        modifiedAt DATETIME DEFAULT NULL 
      );`);
    await pool.query(`CREATE TABLE IF NOT EXISTS ingredients (
      ingredientId VARCHAR(50) NOT NULL PRIMARY KEY,
        ingredientName VARCHAR(100) NOT NULL,
        foodLosses DECIMAL(3,2) NOT NULL,
        photoIngredient VARCHAR(100) DEFAULT NULL,
        ingredientTypeId VARCHAR(50) NOT NULL,
        FOREIGN KEY (ingredientTypeId) REFERENCES ingredientType (ingredientTypeId)
        ON UPDATE CASCADE
            ON DELETE RESTRICT,
      createdAt DATETIME DEFAULT NOW() NOT NULL,
        modifiedAt DATETIME DEFAULT NULL 
      );`);
    await pool.query(`CREATE TABLE IF NOT EXISTS ingredients_suppliers (
      ingredientId VARCHAR(50) NOT NULL,
        FOREIGN KEY (ingredientId) REFERENCES ingredients (ingredientId)
        ON UPDATE CASCADE
            ON DELETE RESTRICT,
      supplierId VARCHAR(50) NOT NULL,
        FOREIGN KEY (supplierId) REFERENCES suppliers (supplierId)
        ON UPDATE CASCADE
            ON DELETE RESTRICT,
      price DECIMAL(5,2) NOT NULL,
      weight DECIMAL(7,2) NOT NULL,
        countryOrigin VARCHAR(100) NOT NULL,
        description TINYTEXT DEFAULT NULL,
      createdAt DATETIME DEFAULT NOW() NOT NULL,
        modifiedAt DATETIME DEFAULT NULL 
      );`);
    await pool.query(`CREATE TABLE IF NOT EXISTS recipes (
      recipeId VARCHAR(50) NOT NULL PRIMARY KEY,
        recipeName VARCHAR(100) NOT NULL,
        allergic ENUM('Ninguno', 'Glúten', 'Crustáceos', 'Huevos', 'Pescado', 'Cacahuetes', 'Soja', 'Lácteos', 'Frutos con cáscara', 'Apio', 'Mostaza', 'Sésamo', 'Sulfitos', 'Altramuces', 'Moluscos') DEFAULT 'Ninguno' NOT NULL,
        type ENUM('Entrantes', 'Principal', 'Postre', 'Cóctel', 'Degustación') NOT NULL,
        margin DECIMAL(3,2) NOT NULL,
        photoRecipe VARCHAR(100) DEFAULT NULL,
      createdAt DATETIME DEFAULT NOW() NOT NULL,
        modifiedAt DATETIME DEFAULT NULL 
      );`);
    await pool.query(`CREATE TABLE IF NOT EXISTS recipes_ingredients (
      recipeId VARCHAR(50) NOT NULL,
        FOREIGN KEY (recipeId) REFERENCES recipes (recipeId)
        ON UPDATE CASCADE
            ON DELETE RESTRICT,
      ingredientId VARCHAR(50) NOT NULL,
        FOREIGN KEY (ingredientId) REFERENCES ingredients (ingredientId)
        ON UPDATE CASCADE
            ON DELETE RESTRICT,
      amount DECIMAL(6,2) NOT NULL,
        measure ENUM('Kg', 'g', 'mg', 'L', 'ml') NOT NULL,
        createdAt DATETIME DEFAULT NOW() NOT NULL,
        modifiedAt DATETIME DEFAULT NULL 
      );`);

    const adminId = crypto.randomUUID();
    let adminPass: string = '';

    if (ADMIN_PASS !== undefined) {
      adminPass = await bcrypt.hash(ADMIN_PASS, 10);
    }

    await pool.query(
      `INSERT INTO users (userId, email, password, role, companyName, CIF, phone, address, city, country, province, postalCode)
    VALUES (?, 'admin@admin.com', ? , 'admin', 'admin', 'admin', 'admin', 'admin', 'admin', 'admin', 'admin', 'admin')`,
      [adminId, adminPass]
    );

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void createDB();
