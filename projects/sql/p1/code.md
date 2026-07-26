# Data Flow

### Load Data

``` sql
DROP TABLE IF EXISTS bronze.cust_info;

CREATE TABLE bronze.cust_info(
    cst_id VARCHAR(20),
    cst_key VARCHAR(20),
    cst_firstname VARCHAR(20),
    cst_lastname VARCHAR(20),
    cst_marital_status VARCHAR(5),
    cst_gndr VARCHAR(5),
    cst_create_date VARCHAR(15)
);

SELECT '=================== LOADING DATA INTO cust_info';

TRUNCATE TABLE bronze.cust_info;

LOAD DATA LOCAL INFILE 'C:/Users/TUF/OneDrive/Documents/Code/MY SQL/MySQL-DataWarehouse/data/crm/cust_info.csv'
INTO TABLE bronze.cust_info
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(@cst_id, @cst_key, @cst_firstname, @cst_lastname, @cst_marital_status, @cst_gndr, @cst_create_date)
SET
cst_id = NULLIF(@cst_id, ''),
cst_key = NULLIF(@cst_key, ''),
cst_firstname = NULLIF(@cst_firstname, ''),
cst_lastname = NULLIF(@cst_lastname, ''),
cst_marital_status = NULLIF(@cst_marital_status, ''),
cst_gndr = NULLIF(@cst_gndr, ''),
cst_create_date = NULLIF(@cst_create_date, '');

```


### Clean Data

``` sql
SELECT '=========================== CREATEING cust_info';
DROP TABLE IF EXISTS silver.cust_info;

CREATE TABLE silver.cust_info(
    cst_id VARCHAR(20),
    cst_key VARCHAR(20),
    cst_firstname VARCHAR(20),
    cst_lastname VARCHAR(20),
    cst_marital_status VARCHAR(10),
    cst_gndr VARCHAR(10),
    cst_create_date VARCHAR(15)
);

SELECT '=================== LOADING DATA INTO cust_info';
TRUNCATE TABLE silver.cust_info;

INSERT INTO silver.cust_info(
cst_id,
cst_key,
cst_firstname,
cst_lastname,
cst_marital_status,
cst_gndr, 
cst_create_date
)
SELECT 
cst_id,
cst_key,
TRIM(cst_firstname) AS cst_firstname,
TRIM(cst_lastname) AS cst_lastname,
CASE
    WHEN UPPER(TRIM(cst_marital_status)) = 'M' THEN 'Married'
    WHEN UPPER(TRIM(cst_marital_status)) = 'S' THEN 'Single'
    ELSE 'N/A'
END AS cst_marital_status,
CASE
    WHEN UPPER(TRIM(cst_gndr)) = 'F' THEN 'Female'
    WHEN UPPER(TRIM(cst_gndr)) = 'M' THEN 'Male'
    ELSE 'N/A'
END AS cst_gndr,
cst_create_date
FROM (
    SELECT *,
    CASE
    WHEN cst_id >1 THEN 1
    ELSE 0
    END AS flag_one,
    ROW_NUMBER() OVER(PARTITION BY cst_id ) AS flag_two
    FROM bronze.cust_info
)AS A
WHERE flag_one = 1 AND flag_two = 1;

SET @time2 = CURRENT_TIME();
SELECT DATE_FORMAT(TIMEDIFF(@time2, @time1),'%s') AS 'TABLE LOADING TIME';
```
