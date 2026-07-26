# 🏗️ Data Warehouse (MySQL)

This project implements a **layered Data Warehouse architecture** using **MySQL**.  
It follows industry-standard **Bronze → Silver → Gold** layers and supports **multiple execution methods** using `.bat` scripts.


## 🔹Architecture Overview

Source CSV Files <br>
↓ <br>
Bronze Layer (Raw Ingestion) <br>
↓ <br>
Silver Layer (Clean & Standardized) <br>
↓ <br>
Gold Layer (Business-Ready Tables) <br>


## 🔹Bronze Layer (Raw Data)

- Loads **CSV files directly into MySQL**
- No transformation applied
- Used for **audit and reprocessing**
- Uses `LOAD DATA INFILE`

📄 Script:
- `sql/bronze.sql`
- Executed via `scripts/run_bronze.bat`



## 🔹Silver Layer (Cleaned Data)

- Data cleansing (null handling, data types, duplicates)
- Standardized column names
- Business keys prepared

📄 Script:
- `sql/silver.sql`
- Executed via `scripts/run_silver.bat`



## 🔹Gold Layer (Business Layer)

- Aggregations
- KPIs & reporting tables
- Optimized for analytics & dashboards

📄 Script:
- `sql/gold.sql`
- Executed via `scripts/run_gold.bat`
