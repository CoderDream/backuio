


### 建表语句 ###

```sql
CREATE TABLE DimDate (
	DateKey datetime NOT NULL ,
	DateOfName nvarchar(50) NULL ,
	YearOfDate datetime NULL ,
	YearOfName nvarchar(50) NULL ,
	SemesterOfDate datetime NULL ,
	SemesterOfName nvarchar(50) NULL ,
	QuarterOfDate datetime NULL ,
	QuarterOfName nvarchar(50) NULL ,
	MonthOfDate datetime NULL ,
	MonthOfName nvarchar(50) NULL ,
	WeekOfDate datetime NULL ,
	WeekOfName nvarchar(50) NULL ,
	DayNumberOfYear int NULL ,
	DayNumberOfYearName nvarchar(50) NULL ,
	DayNumberOfSemester int NULL ,
	DayNumberOfSemesterName nvarchar(50) NULL ,
	DayNumberOfQuarter int NULL ,
	DayNumberOfQuarterName nvarchar(50) NULL ,
	DayNumberOfMonth int NULL ,
	DayNumberOfMonthName nvarchar(50) NULL ,
	DayNumberOfWeek int NULL ,
	DayNumberOfWeekName nvarchar(50) NULL ,
	WeekNumberOfYear int NULL ,
	WeekNumberOfYearName nvarchar(50) NULL ,
	MonthNumberOfYear int NULL ,
	MonthNumberOfYearName nvarchar(50) NULL ,
	MonthNumberOfSemester int NULL ,
	MonthNumberOfSemesterName nvarchar(50) NULL ,
	MonthNumberOfQuarter int NULL ,
	MonthNumberOfQuarterName nvarchar(50) NULL ,
	QuarterNumberOfYear int NULL ,
	QuarterNumberOfYearName nvarchar(50) NULL ,
	QuarterNumberOfSemester int NULL ,
	QuarterNumberOfSemesterName nvarchar(50) NULL ,
	SemesterNumberOfYear int NULL ,
	SemesterNumberOfYearName nvarchar(50) NULL ,
	IsWorkDay bit
)

ALTER TABLE DimDate ADD PRIMARY KEY (DateKey)
GO
```

- 初始化数据

```sql
INSERT INTO DimDate (DateKey) VALUES ('1970-01-01');
INSERT INTO DimDate (DateKey) VALUES ('2016-12-31');
GO
-- 
-- TRUNCATE TABLE DimDate;
```



