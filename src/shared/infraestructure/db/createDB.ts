import { getPool } from "./connectDB.ts";
import crypto from "node:crypto";
import bcrypt from "bcrypt";

const createDB = async (): Promise<void> => {
  try {
    const pool = getPool();

    const { ADMIN_PASS } = process.env;

    await pool.query("CREATE DATABASE IF NOT EXISTS escandallos;");

    await pool.query("USE escandallos;");

    console.log("Deleting tables...");

    await pool.query(`DROP TABLE IF EXISTS 
      raw_materials_technical_sheet, 
      technical_sheet, 
      category_dishes, 
      raw_materials_allergens, 
      allergens, 
      materials_suppliers, 
      raw_materials,
      raw_materials_type, 
      suppliers,
      users,
      counties;`);

    console.log("Creating tables...");

    await pool.query(` CREATE TABLE IF NOT EXISTS countries (
      countryName VARCHAR(50) NOT NULL PRIMARY KEY UNIQUE,
      countryCode VARCHAR(5) NOT NULL,
      countryPhoneCode VARCHAR(5) NOT NULL,
      createdAt DATETIME DEFAULT NOW() NOT NULL,
      modifiedAt DATETIME DEFAULT NULL 
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS users (
      userId VARCHAR(50) NOT NULL PRIMARY KEY,
      companyName VARCHAR(100) NOT NULL,
      CIF VARCHAR(15) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL,
      phone VARCHAR(15),
      address VARCHAR(250),
      city VARCHAR(100),
      country VARCHAR(50),
      FOREIGN KEY (country) REFERENCES countries (countryName)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
      province VARCHAR(100),
      postalCode VARCHAR(10),
      web VARCHAR(100),
      role ENUM('restaurant', 'supplier', 'admin') NOT NULL,
      activationCode VARCHAR(100),
      active TINYINT UNSIGNED NOT NULL DEFAULT 0,
      createdAt DATETIME DEFAULT NOW() NOT NULL,
      modifiedAt DATETIME DEFAULT NULL 
    );`);

    await pool.query(`CREATE TABLE IF NOT EXISTS suppliers (
      supplierId VARCHAR(50) NOT NULL PRIMARY KEY,
      supplierName VARCHAR(100) NOT NULL,
      CIF VARCHAR(15),
      email VARCHAR(100),
      phone VARCHAR(15),
      address VARCHAR(250),
      web VARCHAR(100),
      createdAt DATETIME DEFAULT NOW() NOT NULL,
      modifiedAt DATETIME DEFAULT NULL 
    );`);

    await pool.query(`CREATE TABLE IF NOT EXISTS raw_materials_type (
      rawMaterialTypeId VARCHAR(50) NOT NULL PRIMARY KEY,
      typeName VARCHAR(50) NOT NULL,
      createdAt DATETIME DEFAULT NOW() NOT NULL,
      modifiedAt DATETIME DEFAULT NULL
    );`);

    await pool.query(`CREATE TABLE IF NOT EXISTS raw_materials (
      materialId VARCHAR(50) NOT NULL PRIMARY KEY,
      materialName VARCHAR(100) NOT NULL,
      foodLosses DECIMAL(6,2) NOT NULL DEFAULT 0,
      department ENUM('Cocina', 'Sala') DEFAULT 'Cocina' NOT NULL,
      perishability TINYINT UNSIGNED NOT NULL DEFAULT 1,
      rawMaterialTypeId VARCHAR(50) NOT NULL,
      FOREIGN KEY (rawMaterialTypeId) REFERENCES raw_materials_type (rawMaterialTypeId)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
      lastOrderDate DATETIME DEFAULT NULL,
      createdAt DATETIME DEFAULT NOW() NOT NULL,
      modifiedAt DATETIME DEFAULT NULL 
    );`);

    await pool.query(`CREATE TABLE IF NOT EXISTS materials_suppliers (
      materialSupplierId VARCHAR(50) NOT NULL PRIMARY KEY,
      materialId VARCHAR(50) NOT NULL,
      FOREIGN KEY (materialId) REFERENCES raw_materials (materialId)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
      supplierId VARCHAR(50) NOT NULL,
      FOREIGN KEY (supplierId) REFERENCES suppliers (supplierId)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
        measure ENUM('Kg', 'g', 'l', 'cl', 'ml') NOT NULL,
        amount DECIMAL(7,2) NOT NULL,
      price DECIMAL(6,2) NOT NULL,
      countryOrigin VARCHAR(100) NOT NULL,
      description TINYTEXT DEFAULT NULL,
      createdAt DATETIME DEFAULT NOW() NOT NULL,
      modifiedAt DATETIME DEFAULT NULL 
    );`);

    await pool.query(`CREATE TABLE IF NOT EXISTS allergens (
      allergenId VARCHAR(50) NOT NULL PRIMARY KEY,
      allergenName VARCHAR(50) NOT NULL,
      createdAt DATETIME DEFAULT NOW() NOT NULL,
      modifiedAt DATETIME DEFAULT NULL
    );`);

    await pool.query(`CREATE TABLE IF NOT EXISTS raw_materials_allergens (
      rawMaterialsAllergensId VARCHAR(50) NOT NULL PRIMARY KEY,
      materialId VARCHAR(50) NOT NULL,
      FOREIGN KEY (materialId) REFERENCES raw_materials (materialId)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
      allergenId VARCHAR(50) NOT NULL,
      FOREIGN KEY (allergenId) REFERENCES allergens (allergenId)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
    );`);

    await pool.query(`CREATE TABLE IF  NOT EXISTS category_dishes (
      categoryDishId VARCHAR(50) NOT NULL PRIMARY KEY,
      categoryName VARCHAR(50) NOT NULL,
      costPerCent DECIMAL(5,2) NOT NULL,
      createdAt DATETIME DEFAULT NOW() NOT NULL,
      modifiedAt DATETIME DEFAULT NULL 
    );`);

    await pool.query(`CREATE TABLE IF NOT EXISTS technical_sheet (
      technicalSheetId VARCHAR(50) NOT NULL PRIMARY KEY,
      recipeName VARCHAR(100) NOT NULL,
      categoryDishId VARCHAR(50) NOT NULL,
      FOREIGN KEY (categoryDishId) REFERENCES category_dishes (categoryDishId)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
      section ENUM('Cocina', 'Sala') DEFAULT 'Cocina' NOT NULL,
      pax TINYINT NOT NULL,
      portionWeight SMALLINT NOT NULL,
      elaboration TEXT,
      costPerCent DECIMAL(3,2) NOT NULL,
      photoRecipe VARCHAR(100) DEFAULT NULL,
      IVA TINYINT NOT NULL,
      price DECIMAL(6,2) NOT NULL,
      priceWithTaxes DECIMAL(6,2) NOT NULL,
      rawMaterialRatio TINYINT NOT NULL,
      createdAt DATETIME DEFAULT NOW() NOT NULL,
      modifiedAt DATETIME DEFAULT NULL 
    );`);

    await pool.query(`CREATE TABLE IF NOT EXISTS raw_materials_technical_sheet (
      technicalSheetId VARCHAR(50) NOT NULL,
      FOREIGN KEY (technicalSheetId) REFERENCES technical_sheet (technicalSheetId)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
      materialId VARCHAR(50) NOT NULL,
      FOREIGN KEY (materialId) REFERENCES raw_materials (materialId)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
      amount DECIMAL(6,2) NOT NULL,
      measure ENUM('Kg', 'g', 'mg', 'l', 'cl', 'ml') NOT NULL
    );`);

    await pool.query(
      `INSERT INTO countries (countryName, countryCode, countryPhoneCode)
        VALUES ("España", "ES", "+34")`
    );

    await pool.query(
      `INSERT INTO raw_materials_type (rawMaterialTypeId, typeName)
        VALUES ('4c22955d-bf04-4fb2-a333-aa348f566684', 'Aceites'),
          ('a45c263a-1198-4377-a598-17c1e0a93f5e', 'Huevos y Lácteos'),
          ('15533fa2-5006-4d11-b10d-46001e28620a', 'Legumbres'),
          ('849b432b-b3eb-4cc6-89db-3dbc77bf1441', 'Setas'),
          ('d9324e0d-7a66-4228-8273-d72d23d8fb5c', 'Frutas y verduras'),
          ('dc473a2f-086f-4579-a373-7373c50c4e91', 'Cereales y harinas'),
          ('5f9899d3-11e7-436a-8a2c-972d47e35059', 'Pescados y mariscos'),
          ('c7105b34-8531-477a-8718-af98822731d3', 'Carnes'),
          ('0f60aea6-a49f-4660-999b-edd1228b9825', 'Embutidos'),
          ('d28b56be-03dc-4786-aa4f-d6cbbe74f8d9', 'Bebidas alcohólicas'),
          ('c48e4bec-330f-4d7c-8dd8-66f4540167d4', 'Bebidas no alcohólicas');`
    );

    await pool.query(
      `INSERT INTO category_dishes (categoryDishId, categoryName, costPerCent)
        VALUES ('b4721e36-4eab-4019-9b32-ea74053e0afc', 'Aperitivos y cócteles', '30'),
          ('13720496-7bd9-4ae3-ad51-79db9197d3d4', 'Entrantes', '35'),
          ('3b8856fa-c012-4ace-b6cc-c968747b55d3', 'Pescados', '25'),
          ('b269f295-7b09-485d-a397-be8f2b5d1f10', 'Carnes', '25'),
          ('3ae85d02-5663-4147-a9e6-b3db1f55793a', 'Postres', '35');`
    );

    await pool.query(
      `INSERT INTO allergens (allergenId, allergenName)
        VALUES ('b8fe2a67-f216-47b3-a122-950fb8410864', 'Glúten'),
          ('3c9627bb-bb9d-4b90-837f-41e68a1681ee', 'Crustáceos'),
          ('03897627-e58a-4282-b6cb-e8cf79118c95', 'Moluscos'),
          ('ec7f8c9b-ada9-40e9-8450-926fccf385eb', 'Pescado'),
          ('d11e2a9d-b5c9-43e8-815a-73493ea91846', 'Huevos'),
          ('d738417e-0940-4ab6-8a88-bebe4ac0205f', 'Altramuces'),
          ('96142736-9964-4837-99f7-ea8149d56956', 'Mostaza'),
          ('a77b73e2-7209-43db-8057-a088901a9d37', 'Cacahuetes'),
          ('a296b146-09e4-4a7c-9c7a-8c785a6b5d38', 'Frutos de cáscara'),
          ('d3605fe1-2009-4447-9332-c3a511ddcffc', 'Soja'),
          ('7b518bb5-860c-4650-bdb3-029221025b9c', 'Sésamo'),
          ('0ba121e3-dc1c-4846-9012-99ba131c7e7e', 'Apio'),
          ('1c62bc97-8dd3-4745-bf4b-78333a31d834', 'Lácteos'),
          ('7ef40d1b-84e2-4e63-83c8-38e2def662e7', 'Sulfitos'),
          ('fd42fe36-b516-4ea7-a7ab-624622f6d7c1', 'Ninguno');`
    );

    const adminId = crypto.randomUUID();
    let adminPass: string = "";

    if (ADMIN_PASS !== undefined) {
      adminPass = await bcrypt.hash(ADMIN_PASS, 10);
    }

    await pool.query(
      `INSERT INTO users (userId, email, password, role, companyName, CIF, phone, address, city, country, province, postalCode, active)
        VALUES (?, 'admin@admin.com', ? , 'admin', 'admin', 'admin', 'admin', 'admin', 'admin', 'España', 'admin', 'admin', 1)`,
      [adminId, adminPass]
    );

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void createDB();
