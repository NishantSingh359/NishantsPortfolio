# 🏗️ Food Delivery Data Warehouse

A **Food Delivery Data Warehouse** implementing the **Medallion Architecture (Raw → Silver → Gold)** with **class‑based pipelines**, **config‑driven processing**, **logging**, and **batch automation**.


## 🧠 Architecture Overview

### 🔹 Raw Layer
- Stores **as‑received source data**
- No transformations
- Acts as **system of record**

### 🔸 Silver Layer
- Data **cleaning**
- Standardization (data types, formats)
- Deduplication & validation
- **Class‑based pipelines with inheritance**

### 🟡 Gold Layer
- Business‑ready **fact & dimension tables**
- Star schema modeling
- Optimized for **analytics & BI**


## 📌 Dataset

- [🔗 CRM Dataset ](https://www.kaggle.com/datasets/nishantsinghpro/restaurant-crm-raw-dataset) <br>
- [🔗 ERP Dataset](https://www.kaggle.com/datasets/nishantsinghpro/restaurant-erp-raw-dataset) 