# Hr Data Analysis

``` sql
-- --------------------------------------------------
-- Q) Hired & Terminated Employees by Year & Month
-- --------------------------------------------------

SELECT
    hire_year          AS years,
    hire_month         AS months,
    hired_employee,
    terminated_employee
FROM (
    SELECT
        YEAR(hiredate)     AS hire_year,
        MONTH(hiredate)    AS hire_month,
        COUNT(employee_id) AS hired_employee
    FROM hr_table
    GROUP BY hire_year, hire_month
) AS table1
LEFT JOIN (
    SELECT
        YEAR(termdate)     AS terminated_year,
        MONTH(termdate)    AS terminated_month,
        COUNT(employee_id) AS terminated_employee
    FROM hr_table
    GROUP BY terminated_year, terminated_month
) AS table2
    ON CONCAT(hire_year, hire_month) = CONCAT(terminated_year, terminated_month)
ORDER BY hire_year, hire_month;


-- --------------------------------------------------
-- Q) Top 10 Highest Paid Employees Performance
-- --------------------------------------------------

SELECT
    employee_id,
    CONCAT_WS(' ', first_name, last_name) AS name,
    department,
    performance_rating,
    FORMAT_NUMBER(salary)                 AS salary
FROM hr_database.hr_table
ORDER BY salary DESC
LIMIT 10;


-- --------------------------------------------------
-- Q) Education Level by Employees Performance
-- --------------------------------------------------

SELECT
    education_level,
    ROUND(100 * COUNT(CASE WHEN performance_rating = 'Excellent'         THEN 1 END) / COUNT(*), 1) AS excellent,
    ROUND(100 * COUNT(CASE WHEN performance_rating = 'Good'              THEN 1 END) / COUNT(*), 1) AS good,
    ROUND(100 * COUNT(CASE WHEN performance_rating = 'Satisfactory'      THEN 1 END) / COUNT(*), 1) AS satisfactory,
    ROUND(100 * COUNT(CASE WHEN performance_rating = 'Needs Improvement' THEN 1 END) / COUNT(*), 1) AS needs_improvement,
    COUNT(*) AS total_emp
FROM hr_database.hr_table
GROUP BY education_level
ORDER BY excellent DESC;

-- --------------------------------------------------
-- Q) Which departments have the highest attrition
-- --------------------------------------------------

WITH table1 AS(
    SELECT *
    FROM hr_database.hr_table
    WHERE termdate IS NOT NULL
)
SELECT 
    department,
    COUNT(employee_id) as employees
FROM table1
GROUP BY department
ORDER BY employees DESC;

```
