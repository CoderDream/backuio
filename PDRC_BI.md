

- 运营数据库中需要处理的项目

```sql
SELECT *
FROM ISBG_Project
WHERE (OBDORPPC = 'PPC'
      AND CustomerNo LIKE '00106%'
      AND ProjectStartDateTime >= '2018-1-1')
     OR (ProjectNewNo = 'IDLE20180308127')
ORDER BY CreateDate DESC;
```

- 运行结果如下

```
TM工号	交付人员	BSM	技术平台	bwid	cwid
B-27154	B-14853	0.80	测试	0	0
B-27154	B-15985	1.68	Java	0	0
B-27154	B-16514	1.08	Java	0	0
B-27154	B-20897	1.12	Java	0	0
```


```sql
SELECT DISTINCT
       a.Staff_WorkID
FROM BJC_Finance.dbo.ISBG_HumanMap a
JOIN
BJC_Finance.dbo.ISBG_Project b
ON a.Project_ID=b.ID
   AND a.Staff_WorkID!=b.ProjectMgr_WorkID
WHERE b.OBDORPPC='PPC'
      AND b.CustomerNo LIKE '00106%'
      AND b.ProjectStartDateTime>='2018-1-1'
      OR b.ProjectNewNo='IDLE20180308127'
ORDER BY a.Staff_WorkID;

```



```sql
SELECT b.Project_ID,
       b.Staff_WorkID,
       B.InPro_Date
FROM ISBG_Project
AS a
JOIN
ISBG_HumanMap
AS b
ON a.ID=b.Project_ID
   AND b.Staff_WorkID!=a.ProjectMgr_WorkID
WHERE OBDORPPC='PPC'
      AND CustomerNo LIKE '00106%'
      AND ProjectStartDateTime>='2018-1-1'
      OR ProjectNewNo='IDLE20180308127';
```
