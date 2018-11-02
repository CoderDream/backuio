# SQL Server 2008 R2 SSIS 教程#


## 任务 1：创建新的 Integration Services 项目 ##


在 Integration Services 中创建包的第一步就是创建一个 Integration Services 项目。此项目包含在数据转换解决方案中使用的数据源、数据源视图和包等对象的模板。

将 在本 Integration Services 教程中创建的包用于解释受区域设置影响的数据的值。如果您的计算机未配置为使用区域选项“英语(美国)”，则需要在包中设置其他属性。第 2 课到第 5 课中使用的包是从第 1课中创建的包复制而来的，因此不需要更新复制的包中受区域设置影响的属性。

创建新的 Integration Services 项目
1.   在“开始”菜单上，依次指向“所有程序”和 Microsoft SQLServer，再单击 SQL Server、Business Intelligence Development Studio。

2.   在“文件”菜单中，指向“新建”，再单击“项目”，以创建一个新的 Integration Services 项目。

3.   在“新建项目”对话框的“模板”窗格中，选择“IntegrationServices 项目”。

4.   在“名称”框中，将默认名称更改为 SSISTutorial。或者，清除“创建解决方案的目录”复选框。

5.   接受默认位置，或单击“浏览”，以浏览并找到要使用的文件夹。

6.   在“项目位置”对话框中，单击文件夹，再单击“打开”。

7.   单击“确定”。（默认情况下，将创建一个名为 Package.dtsx 的空包，并将该包添加到项目中。）

8.   在解决方案资源管理器工具栏中，右键单击 Package.dtsx，再单击“重命名”，将默认包重命名为 Lesson 1.dtsx。

9.   当系统提示重命名包对象时，单击“是”。

设置受区域设置影响的属性
1.   在“视图”菜单上，单击“属性窗口”。

2.   在“属性”窗口中，将LocaleID 属性设置为“英语(美国)“。

## 任务 2：添加并配置平面文件连接管理器 ##


在本任务中，将在刚创建 的包中添加一个平面文件连接管理器。通过平面文件连接管理器，包可从平面文件中提取数据。使用平面文件连接管理器，可以指定包从平面文件中提取数据时要应用的文件的名称与位置、区域设置与代码页以及文件格式，其中包括列分隔符。另外，还可以为各个列手动指定数据类型；也可以使用“提供列类型建议”对话框，自动将提取出来的数据列映射到 Integration Services 数据类型。

必须为要使用的每种文件格式创建一个新的平面文件连接管理器。因为本教程从多个数据格式完全相同的平面文件提取数据，所以只需为您的包添加和配置一个平面文件连接管理器。

在本教程中，将在平面文件连接管理器中配置以下属性：

·        Column names 因为平面文件没有列名，因此平面文件连接管理器将创建默认的列名。这些默认名称不能用于标识每个列代表的内容。若要使这些默认名称更有用，需要将默认名称改为要加载平面文件数据的事实数据表匹配的名称。

·        Data mappings 为平面文件连接管理器指定的数据类型映射，将由所有引用该连接管理器的平面文件数据源组件使用。可以使用平面文件连接管理器，或者使用“提供列类型建议”对话框来手动映射数据类型。在本教程中，将查看“提供列类型建议”对话框中建议的映射，然后在“平面文件连接管理器编辑器”对话框中手动设置必要的映射。

平面文件连接管理器提供了有关数据文件的区域设置信息。如果未将您的计算机配置为使用区域设置选项“英语(美国)”，则必须在“平面文件连接管理器编辑器”对话框中设置其他属性。

添加一个平面文件连接管理器
1.   右键单击“连接管理器”区域中的任意位置，再单击“新建平面文件连接”。

2.   在“平面文件连接管理器编辑器”对话框的“连接管理器名称”字段中，键入 Sample FlatFile Source Data。

3.   单击“浏览”。

4.   在“打开”对 话框中，找到示例数据文件夹，再打开SampleCurrencyData.txt 文件。默认情况下，教程示例数据安装在 c:\Program Files\MicrosoftSQL Server\100\Samples\Integration Services\Tutorial\Creating a Simple ETLPackage\Sample Data 文件夹中。

设置受区域设置影响的属性
1.   在“平面文件连接管理器编辑器”对话框中，单击“常规”。

2.   将“区域设置”设置为“英语(美国)”，并将“代码页”设置为 1252。

重命名平面文件连接管理器中的列
1.   在“平面文件连接管理器编辑器”对话框中，单击“高级”。

2.   在“属性”窗格中，进行如下更改：

o       将 Column 0 名称属性改为 AverageRate。

o       将 Column 1 名称属性改为 CurrencyID。

o       将 Column 2 名称属性改为 CurrencyDate。

o       将 Column 3 名称属性改为 EndOfDayRate。

注意

默认情况下，所有四个列最初都设置为字符串数据类型 [DT_STR]，其 OutputColumnWidth 为 50。

重新映射列数据类型
1.   在“平面文件连接管理器编辑器”对话框中，单击“建议类型”。

Integration Services 将根据前 100 行数据自动建议最合适的数据类型。您还可以将这些建议选项改为增加或减少取样数据，以便指定整数数据或布尔数据的默认数据类型，或添加作为填充量添加到字符串列中的空格。

现在，请不要对“提供列类型建议”对话框中的选项进行任何更改，单击“确定”可使 Integration Services 提供列数据类型的建议。这样，您将转到“平面文件连接管理器编辑器”对话框的“高级”窗格，在此可以查看 Integration Services 建议使用的列数据类型。（如果单击“取消”，则不对列元数据提供任何建议，并使用默认字符串 (DT_STR) 数据类型。）

在本教程中，Integration Services 为 SampleCurrencyData.txt 文件中的数据建议了下表第二列中显示的数据类型。但是，目标中的列要求的数据类型（将在以后的步骤中定义）显示在下表的最后一列。

平面文件列

建议的类型

目标列

目标类型

AverageRate

Float [DT_R4]

FactCurrencyRate.AverageRate

Float

CurrencyID

String [DT_STR]

DimCurrency.CurrencyAlternateKey

nchar(3)

CurrencyDate

Date [DT_DATE]

DimTime.FullDateAlternateKey

datetime

EndOfDayRate

Float [DT_R4]

FactCurrencyRate.EndOfDayRate

Float

为 CurrencyID 和 CurrencyDate 列建议的数据类型与目标表中的字段的数据类型不兼容。由于 DimCurrency.CurrencyAlternateKey 的数据类型为 nchar (3)，CurrencyID 必须从字符串类型 [DT_STR] 改为字符串类型 [DT_WSTR]。另外，字段 DimTime.FullDateAlternateKey 被定义为 DataTime 数据类型，因此 CurrencyDate 需要从日期类型 [DT_Date] 改为数据库时间戳类型 [DT_DBTIMESTAMP]。

2.   在“属性”窗格中，将列CurrencyID 的数据类型从字符串类型 [DT_STR] 改为 Unicode 字符串类型 [DT_WSTR]。

3.   在“属性”窗格中，将列CurrencyDate 的数据类型从日期类型 [DT_DATE] 改为数据库时间戳类型 [DT_DBTIMESTAMP]。

4.   单击“确定”。

任务 3：添加并配置 OLE DB 连接管理器
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

添加了用于连接到数据源 的平面文件连接管理器以后，下一个任务是添加用于连接到目标的 OLE DB 连接管理器。通过 OLE DB 连接管理器，包可以在任何 OLE DB 兼容的数据源中提取数据或加载数据。使用 OLE DB 连接管理器，可以为连接指定服务器、身份验证方法和默认数据库。

在本课中，将创建使用 Windows 身份验证的 OLE DB 连接管理器，以连接到AdventureWorksDB 的本地实例。本教程以后要创建的其他组件（如查找转换和 OLE DB 目标）也将引用此处创建的 OLE DB 连接管理器。

添加和配置 OLE DB 连接管理器
1.   右键单击连接管理器区域中的任意位置，再单击“新建 OLE DB 连接”。

2.   在“配置 OLE DB 连接管理器”对话框中，单击“新建”。

3.   在“服务器名称”中，输入 localhost。

将 localhost 指定为服务器名称时，连接管理器将连接到本地计算机上的 SQL Server 的默认实例。若要使用 SQL Server 的远程实例，请将 localhost 替换为要连接到的服务器的名称。

4.   在“登录到服务器”组中，确认选择了“使用 Windows 身份验证”。

5.   在“连接到数据库”组的“选择或输入数据库名称”框中，键入或选择 AdventureWorksDW。

6.   单击“测试连接”，验证指定的连接设置是否有效。

7.   单击“确定”。

8.   单击“确定”。

9.   在“配置 OLE DB 连接管理器”对话框的“数据连接”窗格中，确认选择了localhost.AdventureWorksDW。

10.单击“确定”。

任务 4：将数据流任务添加到包
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

为源数据和目标数据创建了连接管理器后，下一个任务是在包中添加一个数据流任务。数据流任务将封装在源和目标之间移动数据的数据流引擎，并提供在移动数据时转换、清除和修改数据的功能。大部分的数据提取、转换和加载 (ETL) 进程均在数据流任务中完成。

注意

SQL ServerIntegration Services 将数据流从控制流中分隔开来。将数据流从控制流进行分隔是 Integration Services 与 MicrosoftSQL Server 2000 Data Transformation Services 的重要区别之一。

添加一个数据流任务
1.   单击“控制流”选项卡。

2.   在“工具箱”中，展开“控制流项”，并将一个数据流任务拖到“控制流”选项卡的设计图面上。

3.   在“控制流”设计图面中，右键单击新添加的数据流任务，再单击“重命名”，将名称更改为Extract Sample Currency Data。

好的做法是为添加到设计图面的所有组件提供唯一的名称。考虑到易用性和可维护性，名称应说明每个组件执行的功能。按照这些命名指南，Integration Services 包可以进行自我说明。另一个说明包的方法是使用批注。有关批注的详细信息，请参阅在包中使用批注。

4.   右键单击“数据流”任务，再单击“属性”，然后在“属性”窗口，确保已将LocaleID 属性设置为“英语(美国)”。

任务 5：添加并配置平面文件源
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

在此任务中，将向包中添 加一个平面文件源并对其进行配置。平面文件源是一个数据流组件，它使用平面文件连接管理器定义的元数据来指定转换过程要从此平面文件中提取的数据的格式和结构。可以通过使用平面文件连接管理器提供的文件格式定义将平面文件源配置为从单个平面文件提取数据。

对于本教程，您将把平面文件源配置为使用以前创建的 Sample Flat FileSource Data 连接管理器。

添加平面文件源组件
1.   打开“数据流”设计器，方法是双击 ExtractSample Currency Data 数据流任务或单击“数据流”选项卡。

2.   在“工具箱”中，展开“数据流源”，然后将“平面文件源”拖动到“数据流”选项卡的设计图面上。

3.   在“数据流”设计图面上，右键单击新添加的“平面文件源”，单击“重命名”，然后将该名称改为 ExtractSample Currency Data。

4.   双击此平面文件源，打开“平面文件源编辑器”对话框。

5.   在“平面文件连接管理器”框中，键入或选择 SampleFlat File Source Data。

6.   单击“列”并验证列名是否正确。

7.   单击“确定”。

8.   右键单击平面文件源并单击“属性”。

9.   在“属性”窗口中，验证是否已将LocaleID 属性设置为“英语(美国)”。

任务 6：添加并配置查找转换
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

配置了用于从源文件提取数据的平面文件源后，下一个任务是定义获取 CurrencyKey 和TimeKey 的值所需的查找转换。查找转换通过将指定输入列中的数据联接到引用数据集中的列来执行查找。引用数据集可以是现有的表或视图，也可以是新表或 SQL 语句的结果。在本教程中，查找转换使用 OLE DB 连接管理器连接到包含引用数据集的源数据的数据库。

注意

还可以配置查找转换，以连接到包含引用数据集的缓存。有关详细信息，请参阅查找转换。

对于本教程，您将向包中添加以下两个查找转换组件并对其进行配置：

·        一个转换是根据平面文件中匹配的 CurrencyID 列值对 DimCurrency 维度表的CurrencyKey 列中的值执行查找。

·        一个转换是根据平面文件中匹配的 CurrencyDate 列值对 DimTime 维度表的 TimeKey 列中的值执行查找。

无论在哪种情况下，查找转换都将使用前面创建的 OLE DB 连接管理器。

添加并配置 Lookup Currency Key 转换
1.   在“工具箱”中，展开“数据流转换”，然后将“查找”拖动到“数据流”选项卡的设计图面上。将“查找”直接放置在 Extract SampleCurrency Data 源的下面。

2.   单击 ExtractSample Currency Data 平面文件源，并将绿色箭头拖动到新添加的“查找”转换中，以连接这两个组件。

3.   在“数据流”设计图面上，单击“查找”转换中的“查找”，然后将该名称更改为 LookupCurrency Key。

4.   双击 LookupCurrencyKey 转换。

5.   在“常规”页上，进行以下选择：

1.   选择“完全缓存”。

2.   在“连接类型”区域，选择“OLE DB 连接管理器”。

6.   在“连接”页上，进行以下选择：

1.   在“OLE DB 连接管理器”对话框中，确保显示 localhost.AdventureWorksDW。

2.   选择“使用 SQL 查询的结果”，然后键入或复制以下 SQL 语句：

3.                 select * from (select * from [dbo].[DimCurrency]) as refTable
4.                 where [refTable].[CurrencyAlternateKey] = 'ARS'
5.                 OR
6.                 [refTable].[CurrencyAlternateKey] = 'AUD'
7.                 OR
8.                 [refTable].[CurrencyAlternateKey] = 'BRL'
9.                 OR
10.             [refTable].[CurrencyAlternateKey] = 'CAD'
11.             OR
12.             [refTable].[CurrencyAlternateKey] = 'CNY'
13.             OR
14.             [refTable].[CurrencyAlternateKey] = 'DEM'
15.             OR
16.             [refTable].[CurrencyAlternateKey] = 'EUR'
17.             OR
18.             [refTable].[CurrencyAlternateKey] = 'FRF'
19.             OR
20.             [refTable].[CurrencyAlternateKey] = 'GBP'
21.             OR
22.             [refTable].[CurrencyAlternateKey] = 'JPY'
23.             OR
24.             [refTable].[CurrencyAlternateKey] = 'MXN'
25.             OR
26.             [refTable].[CurrencyAlternateKey] = 'SAR'
27.             OR
28.             [refTable].[CurrencyAlternateKey] = 'USD'
29.             OR
30.             [refTable].[CurrencyAlternateKey] = 'VEB'
7.   在“列”页上，进行以下选择：

1.   在“可用输入列”面板中，将 CurrencyID 拖放到“可用查找列”面板的 CurrencyAlternateKey 上。

2.   在“可用查找列”列，选中 CurrencyKey 右侧的复选框。

8.   单击“确定”返回“数据流”设计图面。

9.   右键单击 Lookup Currency Key 转换，再单击“属性”。

10.在“属性”窗口中，验证是否已将 LocaleID 属性设置为“英语(美国)”，将 DefaultCodePage 属性设置为 1252。

添加并配置 Lookup DateKey 转换
1.   在“工具箱”中，将“查找”拖动到“数据流”设计图面上。将“查找”直接放置在Lookup CurrencyKey 转换的下面。

2.   单击 LookupCurrency Key 转换，并将绿色箭头拖动到新添加的“查找”转换中，以连接这两个组件。

3.   在“选择输入输出”对话框中，单击“输出”列表框中的“查找匹配输出”，然后单击“确定”。

4.   在“数据流”设计图面上，在新添加的“查找”转换中单击“查找”，然后将名称更改为 LookupDateKey。

5.   双击 LookupDateKey 转换。

6.   在“常规”页上，选择“部分缓存”。

7.   在“连接”页上，进行以下选择：

1.   在“OLE DB 连接管理器”对话框中，确保显示 localhost.AdventureWorksDW。

2.   在“使用表或视图”框中，键入或选择 [dbo].[DimTime]。

8.   在“列”页上，进行以下选择：

1.   在“可用输入列”面板中，将 CurrencyDate 拖放到“可用查找列”面板的 FullDateAlternateKey 上。

2.   在“可用查找列”列，选中 TimeKey 右侧的复选框。

9.   在“高级”页上，查看缓存选项。

10.单击“确定”返回“数据流”设计图面。

11.双击 LookupDate Key 转换，再单击“属性”。

12.在“属性”窗口中，验证是否已将 LocaleID 属性设置为“英语(美国)”，将 DefaultCodePage 属性设置为 1252。

任务 7：添加和配置 OLE DB 目标
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

您的包现在可以从平面文 件源提取数据，并将数据转换为与目标兼容的格式。下一个任务是将已转换的数据实际加载到目标。若要加载数据，您必须将 OLE DB 目标添加到数据流。OLE DB 目标可以使用数据库表、视图或 SQL 命令将数据加载到各种 OLE DB 兼容的数据库中。

在此过程中，您将添加和配置 OLE DB 目标以使用以前创建的 OLEDB 连接管理器。

添加和配置示例 OLE DB 目标
1.   在“工具箱”中，展开“数据流目标”，并将“OLE DB 目标”拖到“数据流”选项卡的设计图面上。将 OLE DB 目标直接放置在“查找日期键”转换的下面。

2.   单击“查找日期键”转换，并将绿色箭头拖到新添加的“OLEDB 目标”上，以便将两个组件连接在一起。

3.   在“选择输入输出”对话框中，单击“输出”列表框中的“查找匹配输出”，然后单击“确定”。

4.   在“数据流”设计图面上，在新添加的“OLE DB目标”组件中单击“OLE DB 目标”，然后将名称更改为 Sample OLE DB Destination。

5.   双击 Sample OLEDB Destination。

6.   在“OLE DB 目标编辑器”对话框中，确保已在“OLE DB 连接管理器”框中选中 localhost.AdventureWorksDW。

7.   在“表或视图的名称”框中，键入或选择 [dbo].[FactCurrencyRate]。

8.   单击“映射”。

9.   验证 AverageRate、CurrencyKey、EndOfDayRate 以及 TimeKey 输入列是否已正确映射到目标列。如果映射了同名列，则说明映射正确。

10.单击“确定”。

11.右键单击 Sample OLE DB Destination 目标，再单击“属性”。

12.在“属性”窗口中，验证是否已将 LocaleID 属性设置为“英语(美国)”，将 DefaultCodePage 属性设置为 1252。

任务 8：使 Lesson 1 包更易于理解
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

因为您已完成了 Lesson 1 包的配置，所以整理包布局是很必要的。如果控制流和数据流布局中的形状大小不一，或者如果形状未对齐或未进行分组，则可能很难理解包功能。

Business Intelligence Development Studio 提供了可轻松、快速设置包布局格式的工具。格式设置功能包括使形状大小统一，对齐各个形状，并控制形状之间的水平间距和垂直间距。

另一种增进对包功能的了解的方式是添加描述包功能的批注。

在本任务中，您将使用 Business Intelligence Development Studio 中的格式设置功能改善数据流的布局并向数据流中添加批注。

设置数据流布局的格式
1.   如果尚未打开 Lesson 1 包，则请在解决方案资源管理器中双击 Lesson 1.dtsx。

2.   单击“数据流”选项卡。

3.   将游标置于 Extract Sample Currency 转换的右上方，单击并将游标拖过所有的数据流组件。

现在便已选定所有数据流组件。首先选定的形状（该形状选定的指示符为白色）将确定在设置布局格式时所使用的大小和位置。

4.   在“格式”菜单中，指向“使大小相同”，再单击“两者”。

5.   选定数据流对象后，在“格式”菜单中，指向“对齐”，再单击“左对齐”。

向数据流中添加批注
1.   右键单击数据流设计图面背景的任意位置，再单击“添加批注”。

2.   在批注框中键入或粘贴以下文本。

数据流从文件中提取数据，在DimCurrency 表的 CurrencyKey 列中以及DimTime 表的 TimeKey 列中查阅值，并且将数据写入到 FactCurrencyRate 表。

若要在批注框中使文本换行，请将光标置于要开始新行的位置，然后按Ctrl 和 Enter 键。

如果未将文本添加到批注框，则当您在批注框外部单击时，该文本便会消失。

任务 9：测试 Lesson 1 教程包
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

在本课中，已经完成了下列任务：

·        创建了一个新的 SSIS 项目。

·        配置了包连接到源数据和目标数据所需的连接管理器。

·        添加了一个数据流，该数据流从平面文件源提取数据，对数据执行必要的查找转换，并为目标配置数据。

包现在已经完成了！该对包进行测试了。

检查包布局

测试包之前，应当确保 Lesson 1 包中的控制流和数据流包含下列关系图中显示的对象。

控制流

数据流

运行 Lesson 1 教程包
1.   在“调试”菜单中，单击“启动调试”。

包将开始运行，结果有 1097 个行被成功添加到 AdventureWorksDW 中的 FactCurrencyRate 事实数据表中。

2.   当包运行完毕后，在“调试”菜单中，单击“停止调试”。

第 2 课：添加循环
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

在第 1 课（SSIS 教程）：创建项目和基本包中，创建了从单个平面文件源提取数据的包，然后使用查找转换功能对数据进行了转换，最后将数据加载到AdventureWorksDW 示例数据库的 FactCurrencyRate 事实数据表中。

但 是，提取、转换和加载 (ETL) 过程很少使用单个平面文件。典型的ETL 过程从多个平面文件源提取数据。从多个源提取数据需要采用迭代控制流。MicrosoftIntegrationServices 最可能出现的功能之一是可以方便快捷地向包中添加迭代或循环。

Integration Services 为循环遍历包提供了两种容器类型：Foreach 循环容器和 For 循环容器。Foreach 循环容器使用枚举器执行循环，而 For 循环则通常使用变量表达式。本课使用 Foreach 循环容器。

Foreach 循环容器使包能够对指定枚举器的每个成员重复执行控制流。使用 Foreach 循环容器，可以枚举：

·        ADO 记录集行和架构信息

·        文件和目录结构

·        系统、包和用户变量

·        SQL Server 管理对象 (SMO)

在本课中，您将修改在第 1 课中创建的简单 ETL 包，以便利用 Foreach 循环容器。还将设置用户定义的包变量，以便使该教程包能够迭代遍历文件夹中的所有平面文件。如果您尚未完成上一课，则也可以复制本教程中附带的已完成的 Lesson 1 包。

在本课中，将不修改数据流，而只修改控制流。

重要提示

本教程需要 AdventureWorksDW 示例数据库。有关如何安装和部署 AdventureWorksDW 的详细信息，请参阅安装 SQL Server 示例和示例数据库的注意事项。

任务 1：复制 Lesson 1 包
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

在本任务中，为在第 1 课中创建的 Lesson 1.dtsx 包创建一个副本。如果未完成第 1 课的学习，则可以向项目中添加本教程中附带的已完成的 Lesson 1 包，然后再对其进行复制。您将使用这一新副本来完成第 2 课剩余部分。

创建 Lesson 2 包
1.   如果 Business IntelligenceDevelopment Studio 尚未打开，请单击“开始”，依次指向“所有程序”和“Microsoft SQLServer”，再单击“BusinessIntelligence Development Studio”。

2.   在“文件”菜单中，依次单击“打开”、“项目/解决方案”、SSIS Tutorial 文件夹，然后再次单击“打开”，最后双击 SSIS Tutorial.sln。

3.   在解决方案资源管理器中，右键单击 Lesson 1.dtsx，再单击“复制”。

4.   在解决方案资源管理器中，右键单击“SSIS 包”，再单击“粘贴”。

默认情况下，复制的包将命名为 Lesson 2.dtsx。

5.   在解决方案资源管理器中，双击 Lesson 2.dtsx 打开此包。

6.   右键单击“控制流”设计图面背景的任意位置，再单击“属性”。

7.   在“属性”窗口中，将Name 属性更新为Lesson 2。

8.   单击 ID 属性框，然后在列表中，单击“<生成新 ID>”。

添加已完成的 Lesson 1 包
1.   依次打开 Business IntelligenceDevelopment Studio 和 SSIS Tutorial 项目。

2.   在解决方案资源管理器中，右键单击“SSIS 包”，再单击“添加现有包”。

3.   在“添加现有包的副本”对话框的“包位置”中，选择“文件系统”。

4.   单击浏览 (…) 按钮，导航到 C:\Program Files\Microsoft SQLServer\100\Samples\Integration Services\Tutorial\ Creating a Simple ETLpackage\Completed Packages，选择 Lesson1.dtsx，再单击“打开”。

5.   按先前过程中步骤 3-8 中所述，复制并粘贴 Lesson 1 包。

任务 2：添加并配置 Foreach 循环容器
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

在本任务中，您将添加循环访问平面文件的文件夹的功能，并将第 1 课中使用的同一数据流转换应用于其中的每个平面文件。实现方法是将 Foreach 循环容器添加到控制流中并进行配置。

所 添加的 Foreach 循环容器必须能够连接到该文件夹中的每个平面文件。 由于该文件夹中的所有文件都具有相同的格式，因此，Foreach 循环容器可以使用同一平面文件连接管理器来连接其中的每个文件。 该容器所使用的平面文件连接管理器与您在第 1 课中创建的平面文件连接管理器相同。

目前，第 1 课中的平面文件连接管理器只连接一个特定的平面文件。 若要循环地连接该文件夹中的每个平面文件，必须同时对 Foreach 循环容器和平面文件连接管理器进行如下配置：

·        Foreach 循环容器将该容器的枚举值映射为用户定义的包变量。 然后，该容器将使用此用户定义变量来动态修改平面文件连接管理器的 ConnectionString 属性，并循环连接该文件夹中的每个平面文件。

·        平面文件连接管理器 使用用户定义的变量填充在第 1 课中创建的连接管理器的 ConnectionString 属性，以修改该连接管理器。

本任务中的过程向您显示如何创建和修改 Foreach 循环容器以使用用户定义的包变量，以及如何将数据流任务添加到该循环中。您将了解改平面文件连接管理器，以便在下一任务中使用用户定义的变量。

在 对该包进行这些修改后，当该包运行时，Foreach 循环容器将循环访问示例数据文件夹中的文件集合。 每次找到一个与条件相匹配的文件时，Foreach 循环容器都会用文件名填充用户定义的变量，将用户定义的变量映射到Sample Currency Data 平面文件连接管理器的 ConnectionString 属性，然后对该文件运行数据流。 因此，在 Foreach 循环的每次迭代中，数据流任务都将使用一个不同的平面文件。

注意

由于 MicrosoftIntegration Services 区分控制流和数据流，因此添加到控制流的任何循环都不需要对数据流进行修改。因此，无需更改在第 1 课中创建的数据流。

添加 Foreach 循环容器
1.   在 BusinessIntelligence Development Studio 中，单击“控制流”选项卡。

2.   在“工具箱”中，展开“控制流项”，然后将“Foreach 循环容器”拖到“控制流”选项卡的设计图面上。

3.   右键单击新添加的“Foreach循环容器”，并选择“编辑”。

4.   在“Foreach 循环编辑器”对话框的“常规”页中，为“名称”输入 Foreach File inFolder。 单击“确定”。

5.   右键单击“Foreach 循环容器”，再单击“属性”，然后在“属性”窗口，确保已将LocaleID 属性设置为“英语(美国)”。

为 Foreach 循环容器配置枚举器
1.   双击文件夹中的 Foreach 文件以重新打开“Foreach 循环编辑器”。

2.   单击“集合”。

3.   在“集合”页中，选择“Foreach 文件枚举器”。

4.   在“枚举器配置”组中，单击“浏览”。

5.   在“浏览文件夹”对话框中，找到包含教程示例数据的示例数据文件夹。

默 认情况下，教程示例数据安装在以下文件夹中：C:\ProgramFiles\Microsoft SQL Server\100\Samples\Integration Services\Tutorial\Creating aSimple ETL Package\Sample Data。

6.   在“文件”框中，键入 Currency_*.txt。

将枚举器映射为用户定义的变量
1.   单击“变量映射”。

2.   在“变量映射”页的“变量”列中，单击空单元格并选择“<新建变量…>”。

3.   在“添加变量”对话框中，为“名称”键入 varFileName。

重要提示

变量名称区分大小写。

4.   单击“确定”。

5.   再次单击“确定”，退出“Foreach 循环编辑器”对话框。

将数据流任务添加到循环中
·        将 ExtractSample Currency Data 数据流任务拖动到现已重命名为 Foreach File in Folder 的 Foreach 循环容器中。

任务 3：修改平面文件连接管理器
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

在本任务中，您将修改在第 1 课中创建和配置的平面文件连接管理器。平面文件连接管理器在最初创建时配置为静态加载单个文件。若要启用平面文件连接管理器以重复加载文件，您必须修改连接管理器的 ConnectionString 属性以接受用户定义的变量User:varFileName，该变量包含要在运行时加载的文件的路径。

通过将连接管理器修改为使用用户定义的变量 User::varFileName 的值并填充连接管理器的 ConnectionString 属性，连接管理器将能够连接到不同的平面文件。在运行时，Foreach 循环容器的每次迭代都将动态更新 User::varFileName 变量。 更新变量时，还会使连接管理器连接到不同的平面文件，并使数据流任务处理其他数据集。

配置平面文件连接管理器以使用连接字符串的变量
1.   在“连接管理器”窗格中，右键单击 SampleFlat File Source Data，再选择“属性”。

2.   在“属性”窗口中，针对“表达式”，单击空单元，然后单击省略号按钮“(…)”。

3.   在“属性表达式编辑器”对话框的“属性”列中，键入或选择 ConnectionString。

4.   在“表达式”列中，单击省略号按钮“(…)”以打开“表达式生成器”对话框。

5.   在“表达式生成器”对话框中，展开“变量”节点。

6.   将变量 User::varFileName 拖到“表达式”框中。

7.   单击“确定”关闭“表达式生成器”对话框。

8.   再次单击“确定”关闭“属性表达式编辑器”对话框。

任务 4：测试 Lesson 2 教程包
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

使用现在配置的 Foreach 循环容器和平面文件连接管理器，Lesson2 包可以迭代遍历示例数据文件夹中由 14 个平面文件组成的集合。 每次找到与指定的文件名条件匹配的文件名时，Foreach 循环容器都将用该文件名填充用户定义的变量。 该变量又会更新平面文件连接管理器的 ConnectionString 属性，并与新平面文件建立连接。 然后，在连接到文件夹中的下一个文件之前，Foreach循环容器将对新平面文件中的数据运行未修改的数据流任务。

使用以下过程可以测试已添加到包中的新循环功能。

检查包布局

测试包之前，应当确保 Lesson 2 包中的控制流和数据流包含下列关系图中显示的对象。 数据流应与第 1 课中的数据流相同。

控制流

数据流

测试 Lesson 2 教程包
1.   在“调试”菜单中，单击“启动调试”。

包将运行。 可以在“输出”窗口中或单击“进度”选项卡来验证每个循环的状态。 例如，可以看到 1097 行从文件 Currency_VEB.txt 添加到目标表中。

2.   当包运行完毕后，在“调试”菜单中，单击“停止调试”。

第 3 课：添加包配置
SQL Server 2008 R2

其他版本

1（共 1）对本文的评价是有帮助 评价此主题

包配置允许您从开发环境的外部设置运行时属性和变量。配置允许您开发灵活且易于部署和分发的包。Microsoft IntegrationServices 提供以下配置类型：

·        XML 配置文件

·        环境变量

·        注册表项

·        父包变量

·        SQL Server 表

在本课中，将修改在第 2 课：添加循环中创建的简单 Integration Services 包，以便利用包配置。还可以复制本教程中附带的已完成的 Lesson 2 包。使用包配置向导，将创建一个 XML 配置，以便通过使用映射到 Directory 属性的包级别变量来更新 Foreach 循环容器的 Directory 属性。在创建配置文件之后，将从开发环境的外部修改该变量的值，并将修改后的属性指向新的示例数据文件夹。再次运行包时，配置文件将填充该变量的值，而该变量又会更新Directory  属性。结果，包将迭代遍历新数据文件夹中的文件，而不是迭代遍历在该包中硬编码的原始文件夹中的文件。

重要提示

本教程需要 AdventureWorksDW 示例数据库。有关如何安装和部署 AdventureWorksDW 的详细信息，请参阅安装 SQL Server 示例和示例数据库的注意事项。

课程任务

本课程包含以下任务：

·        任务 1：复制 Lesson 2 包

·        任务 2：启用和配置包配置

·        任务 3：修改目录属性配置值

·        任务 4：测试 Lesson 3 教程包

任务 1：复制 Lesson 2 包
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

在本任务中，为在第 2 课中创建的 Lesson 2.dtsx 包创建一个副本。如果未完成第 2 课的学习，则可以向项目中添加本教程中附带的已完成的 Lesson 2 包，然后再对其进行复制。您将使用这一新副本来完成第 3 课剩余部分。

创建 Lesson 2 包
1.   如果 Business IntelligenceDevelopment Studio 尚未打开，请单击“开始”，依次指向“所有程序”和 Microsoft SQLServer，再单击 BusinessIntelligence Development Studio。

2.   在“文件”菜单中，单击“打开”，单击“项目/解决方案”，选择 SSIS Tutorial，再单击“打开”，然后双击 SSISTutorial.sln。

3.   在解决方案资源管理器中，右键单击 Lesson 2.dtsx，再单击“复制”。

4.   在解决方案资源管理器中，右键单击“SSIS 包”，再单击“粘贴”。

默认情况下，复制的包命名为 Lesson 3.dtsx。

5.   在解决方案资源管理器中，双击 Lesson 3.dtsx 打开该包。

6.   右键单击“控制流”选项卡背景的任意位置，再单击“属性”。

7.   在“属性”窗口中，将Name 属性更新为Lesson 3。

8.   单击 ID 属性框，然后在列表中，单击“<生成新 ID>”。

添加已完成的 Lesson 2 包
1.   依次打开 Business IntelligenceDevelopment Studio 和 SSIS Tutorial 项目。

2.   在解决方案资源管理器中，右键单击“SSIS 包”，再单击“添加现有包”。

3.   在“添加现有包的副本”对话框的“包位置”中，选择“文件系统”。

4.   单击浏览 (…) 按钮，导航到 C:\Program Files\Microsoft SQLServer\100\Samples\Integration Services\ Tutorial\ Creating a Simple ETLpackage\Completed Packages，选择 Lesson2.dtsx，再单击“打开”。

5.   按先前过程中步骤 3-8 中所述，复制并粘贴 Lesson 2 包。

任务 2：启用和配置包配置
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

在本任务中，将使用包配置向导来启用包配置。您将使用该向导生成 XML 配置文件，该文件包含 Foreach 循环容器的 Directory 属性的配置设置。Directory 属性的值由新的包级别变量在运行时提供，您可以更新该变量。另外，将填充要在测试期间使用的新的示例数据文件夹。

创建映射到 Directory 属性的新的包级别变量
1.   在 SSIS 设计器中，单击“控制流”选项卡的背景。这会将要创建的变量的作用域设置为包。

2.   在 SSIS 菜单中，选择“变量”。

3.   在“变量”窗口中，单击“添加变量”图标。

4.   在“名称”框中，键入 varFolderName。

重要提示

变量名称区分大小写。

5.   验证“作用域”框是否显示了包的名称 Lesson 3。

6.   将 varFolderName 变量的“数据类型”框的值设置为“字符串”。

7.   返回到“控制流”选项卡，并双击“文件夹中的 Foreach 文件”容器。

8.   在 Foreach 循环编辑器的“集合”页中，单击“表达式”，再单击省略号按钮(…)。

9.   在“属性表达式编辑器”中，单击“属性”列表，并选择“目录”。

10.在“表达式”框中，单击省略号按钮 (…)。

11.在“表达式生成器”中，展开“变量”文件夹，并将变量 User::varFolderName 拖动到“表达式”框中。

12.单击“确定”退出表达式生成器。

13.单击“确定”退出属性表达式编辑器。

启用包配置
1.   在 SSIS 设计器中，单击“控制流”选项卡的背景。

2.   在 SSIS 菜单上，单击“包配置”。

3.   在“包配置组织程序”对话框中，选择“启用包配置”，再单击“添加”。

4.   在包配置向导的欢迎页中，单击“下一步”。

5.   在“选择配置类型”页上，验证“配置类型”是否已设置为“XML 配置文件”。

6.   在“选择配置类型”页中，单击“浏览”。

7.   默认情况下，“选择配置文件位置”对话框将打开至项目文件夹。

8.   在“选择配置文件位置”对话框的“文件名”中，键入 SSISTutorial，再单击“保存”。

9.   在“选择配置类型”页中，单击“下一步”。

10.在“选择要导出的属性”页中的“对象”窗格中，展开“变量”，展开 varFolderName，展开“属性”，再选择“值”。

11.在“选择要导出的属性”页中，单击“下一步”。

12.在“完成向导”页中，键入该配置的配置名称，如 SSIS Tutorial Directory configuration。这是显示在“包配置组织程序”对话框中的配置名称。

13.单击“完成”。

14.单击“关闭”。

15.向导将创建名为SSISTutorial.dtsConfig 的配置文件，该文件包含特定变量的 value 的配置设置，此变量用于设置枚举器的 Directory 属性。

注意

配置文件通常包含有关包属性的复杂信息，但对于本教程，唯一的信息应当是 [User::varFolderName].Properties[Value]。

创建并填充新的示例数据文件夹
1.   在 Windows 资源管理器中，在驱动器的根位置（例如，C:\）创建名为 New Sample Data 的新文件夹。

2.   打 开 c:\Program Files\MicrosoftSQL Server\100\Samples\Integration Services\Tutorial\Creating a Simple ETL Package\SampleData 文件夹，然后复制该文件夹中的任意三个示例文件。

3.   在 New SampleData 文件夹中，粘贴所复制的文件。

任务 3：修改目录属性配置值
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

在此任务中，将针对包级变量 User::varFolderName 的 Value 属性，修改存储在SSISTutorial.dtsConfig 文件中的配置设置。该变量可以更新 Foreach 循环容器的Directory 属性。修改后的值将指向前一个任务中创建的 NewSample Data 文件夹。修改了配置设置并运行包以后，该变量将使用从配置文件填充的值（而不是包中最初配置的目录值），来更新Directory 属性。

修改目录属性的配置设置
1.   在记事本或其他文本编辑器中，找到并打开在前一个任务中使用包配置向导创建的 SSISTutorial.dtsConfig 配置文件。

2.   更改 ConfiguredValue 元素的值，使其与上一个任务中创建的 NewSample Data 文件夹匹配。请不要将路径用引号括起来。如果 New Sample Data 文件夹在驱动器的根级（例如，C:\）上，则更新的 XML 应与下面的示例类似：

<?xmlversion="1.0"?><DTSConfiguration><DTSConfigurationHeading><DTSConfigurationFileInfoGeneratedBy="Domain\UserName" GeneratedFromPackageName="Lesson3" GeneratedFromPackageID="{99396D72-2F8D-4A37-8362-96346AD53334}"GeneratedDate="11/12/2005 12:46:13PM"/></DTSConfigurationHeading><ConfigurationConfiguredType="Property"Path="\Package.Variables[User::varFolderName].Properties[Value]"ValueType="String"><ConfiguredValue>C:\New SampleData</ConfiguredValue></Configuration></DTSConfiguration>

当然，标题信息（GeneratedBy、GeneratedFromPackageID 和 GeneratedDate ）将与您的文件有所不同。要注意的元素是Configuration元素。变量 User::varFolderName 的 Value 属性现在包含 C:\New Sample Data。

3.   保存更改，再关闭文本编辑器。

任务 4：测试 Lesson 3 教程包
SQL Server 2008 R2

在运行时，包将从运行时更新的变量中获取 Directory 属性的值，而不使用您在创建该包时指定的原始目录名。该变量的值由SSISTutorial.dtsConfig 文件填充。

若要验证该包在运行时是否使用新值更新了 Directory 属性，只需执行该包。由于只向新目录中复制了三个示例数据文件，因此该数据流将只运行三次，而不遍历原始文件夹中的 14 个文件。

检查包布局

测试包之前，应当确保 Lesson 3 包中的控制流和数据流包含下列关系图中显示的对象。控制流应与 Lesson 2 中的控制流相同，数据流应与 Lesson 1 和 Lesson 2 中的数据流相同。

控制流

数据流

测试 Lesson 3 教程包
1.   在“调试”菜单中，单击“启动调试”。

2.   该包运行完成后，请在“调试”菜单上单击“停止调试”。

第 4 课：添加日志记录
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

MicrosoftIntegration Services 包含日志记录功能，这些功能使您可以通过提供任务和容器事件跟踪来对包执行疑难排解和监控。日志记录功能非常灵活，可以在包级别或在包中的各个任务和容器上启用。 可以选择要记录的事件，也可以对单个包创建多个日志。

日志记录由日志提供程序提供。 每个日志提供程序可以将日志记录信息写入不同的格式和目标类型。IntegrationServices 提供了以下日志提供程序：

·        文本文件

·        SQL Server Profiler

·        Windows 事件日志

·        SQL Server

·        XML 文件

在本课中，您将为第 3 课：添加包配置中创建的包创建副本。使用这个新包，您将添加并配置日志记录，以在包执行过程中监控特定事件。 如果您尚未完成前面的任何课程，也可以复制本教程附带的已完成的 Lesson 3 包。

重要提示

本教程需要 AdventureWorksDW 示例数据库。 有关如何安装和部署 AdventureWorksDW 的详细信息，请参阅安装 SQL Server 示例和示例数据库的注意事项。

课程任务

本课程包含以下任务：

·        任务 1：复制 Lesson 3 包

·        任务 2：添加并配置日志记录

·        任务 3：测试 Lesson 4 教程包

任务 1：复制 Lesson 3 包
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

在本任务中，您将创建在第 3 课中创建的 Lesson 3.dtsx 包的副本，或者将本教程中附带的已完成的 Lesson 3 包添加到项目中，然后再对其进行复制。您将使用这一新副本来完成第 4 课剩余部分。

由于包配置信息将随包本身一同复制，因此您还必须修改包配置以还原上一课中所做的一项更改，并将 Foreach 循环重新指向原始的示例数据文件夹。

创建 Lesson 4 包
1.   如果 Business IntelligenceDevelopment Studio 尚未打开，请单击“开始”，依次指向“所有程序”和 Microsoft SQLServer，再单击 BusinessIntelligence Development Studio。

2.   在“文件”菜单中，单击“打开”，单击“项目/解决方案”，选择 SSIS Tutorial，再单击“打开”，然后双击 SSISTutorial.sln。

3.   在解决方案资源管理器中，右键单击 Lesson 3.dtsx，再单击“复制”。

4.   在解决方案资源管理器中，右键单击“SSIS 包”，再单击“粘贴”。

默认情况下，复制的包命名为 Lesson 4.dtsx。

5.   在解决方案资源管理器中，双击 Lesson 4.dtsx 打开该包。

6.   右键单击“控制流”选项卡背景的任意位置，再单击“属性”。

7.   在“属性”窗口中，将Name 属性更新为Lesson 4。

8.   单击 ID 属性框，然后在列表中，单击“<生成新 ID>”。

添加已完成的 Lesson 3 包
1.   依次打开 Business IntelligenceDevelopment Studio 和 SSIS Tutorial 项目。

2.   在解决方案资源管理器中，右键单击“SSIS 包”，再单击“添加现有包”。

3.   在“添加现有包的副本”对话框的“包位置”中，选择“文件系统”。

4.   单击浏览 (…) 按钮，导航到 C:\Program Files\Microsoft SQLServer\100\Samples\Integration Services\ Tutorial\ Creating a Simple ETLpackage\Completed Packages，选择 Lesson3.dtsx，再单击“打开”。

5.   按先前过程中步骤 3 到步骤 8 所述，复制并粘贴 Lesson 3 包。

修改包配置
1.   在 记事本或其他任何文本编辑器中，找到并打开您在上一课中使用包配置向导创建的 SSISTutorial.dtsConfig 配置文件。如果要从本课开始学习并且未创建配置文件，则可以使用位于文件夹 c:\Program Files\SQL Server\100\Samples\IntegrationServices/Tutorial/Creating a Simple ETL Package\Completed Packages 中的配置文件。

2.   将 ConfiguredValue 元素的值更改回原始的示例数据文件夹。默认情况下，示例数据安装在 c:\ProgramFiles\Microsoft SQL Server\100\Samples\Integration Services\Tutorial\Creating aSimple ETL Package\Sample Data 文件夹中。如果要从本课开始学习并且先前未修改该文件，则不需要进行任何更改。

注意

在 XML 配置文件中，无需使用引号将路径括起。

3.   保存更改，再关闭文本编辑器。

任务 2：添加并配置日志记录
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

在该任务中，将要为 Lesson 4.dtsx 包中的数据流启用日志记录。然后，将配置一个文本文件日志提供程序，以记录 PipelineExecutionPlan 和PipelineExecuteTrees 事件。该文本文件日志提供程序可以创建便于查看并可轻松传输的日志。由于便于使用，因此，这些日志文件在包的基本测试阶段非常有用。您也可以在 SSIS 设计器的“日志事件”窗口中查看日志条目。

向包中添加日志记录
1.   在 SSIS 菜单上，单击“日志记录”。

2.   在“配置 SSIS 日志”对话框的“容器”窗格中，确保选中了最前面的代表 Lesson 4 包的对象。

3.   在“提供程序和日志”选项卡的“提供程序类型”框中，选择“用于文本文件的 SSIS 日志提供程序”，然后单击“添加”。

Integration Services 将向包中添加一个默认名称为用于文本文件的 SSIS 日志提供程序的新文本文件日志提供程序。现在便可对新的日志提供程序进行配置。

4.   在“名称”列中，键入 Lesson 4 LogFile。

5.   也可以修改“说明”。

6.   在“配置”列中，单击“<新建连接>”，以指定用于写入日志信息的目标。

在“文件连接管理器编辑器”对话框中，对“使用类型”选择“创建文件”，然后单击“浏览”。默认情况下，“选择文件”对话框将打开项目文件夹，但您可以将日志信息保存到任何位置。

7.   在“选择文件”对话框的“文件名”框中，键入 TutorialLog.log，然后单击“打开”。

8.   单击“确定”关闭“文件连接管理器编辑器”对话框。

9.   在“容器”窗格中，展开包容器层次结构中的所有节点，然后清除包括 Extract Sample Currency Data 复选框在内的所有复选框。现在选中Extract Sample Currency Data 复选框以仅获取有关此节点的事件。

重要提示

如果 Extract Sample Currency Data 复选框显示为灰色而并非选中状态，则该任务将使用父容器的日志设置，无法启用任务特定的日志事件。

10.在“详细信息”选项卡的“事件”列中，选择 PipelineExecutionPlan 和 PipelineExecutionTrees 事件。

11.单击“高级”可查看日志提供程序将为每个事件写入日志的详细信息。默认情况下，将为您指定的事件自动选择所有信息类别。

12.单击“基本”隐藏信息类别。

13.在“提供程序和日志”选项卡上的“名称”列中，选择 Lesson 4 Log File。为包创建日志提供程序后，可以选择取消选择它以临时关闭日志记录，而不必删除和重新创建日志提供程序。

14.单击“确定”。

任务 3：测试 Lesson 4 教程包
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

在该任务中，将运行 Lesson 4.dtsx 包。包运行时，“日志事件”窗口将列出写入日志文件的日志条目。执行完包之后，将验证日志提供程序所生成的日志文件的内容。

检查包布局

测试包之前，应当确保 Lesson 4 包中的控制流和数据流包含下列关系图中显示的对象。控制流应与 Lesson 2 和 Lesson 3 中的控制流相同，数据流应与 Lesson 1 至 Lesson 3 中的数据流相同。

控制流

数据流

运行 Lesson 4 教程包
1.   在 SSIS 菜单中，单击“日志事件”。

2.   在“调试”菜单中，单击“启动调试”。

3.   当包运行完毕后，在“调试”菜单中，单击“停止调试”。

检查生成的日志文件
·        使用记事本或其他任何文本编辑器，打开 TutorialLog.log文件。

·        尽管为 PipelineExecutionPlan 和 PipelineExecutionTrees 事件所生成的信息的语义超出了本教程的讨论范围，但是，可以看到第一行列出了在“配置 SSIS 日志”对话框的“详细信息”选项卡中所指定的信息字段。此外，可以验证已为 Foreach 循环的每个迭代记录了所选择的两个事件：PipelineExecutionPlan和 PipelineExecutionTrees。

有关如何使用日志文件的详细信息，请参阅在包中实现日志记录。

第 5 课：添加错误流重定向
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

为了处理在转换过程中可 能发生的错误，MicrosoftIntegration Services 使您能够基于每个组件和每个列来决定如何处理无法转换的数据。可以选择忽略某些列中的失败、重定向整个失败的行或者只是使组件失败。默认情况下，Integration Services 中的所有组件被配置为在发生错误时失败。而使组件失败又会导致包失败，并使所有后续处理停止。

如 果不让失败导致包停止执行，一个好方法是通过配置使在转换中发生潜在处理错误时这些错误能够得到处理。虽然可能选择忽略失败以确保包成功运行，但通常更好 的做法是将失败的行重定向到另一个处理路径，在这里可以使数据和错误持久化、接受检查并在随后的某个时间对其进行重新处理。

在本课中，将创建在第 4 课：添加日志记录中开发的包的副本。使用这个新包时，将创建一个示例数据文件的损坏版本。损坏的文件将在运行包时强制发生处理错误。

为了处理错误数据，您将添加并配置一个平面文件目标，它会将所有无法在 Lookup Currency Key 转换中找到查找值的行写入文件。

将错误数据写入文件之前，需要包括一个使用脚本获取错误说明的脚本组件。然后，将重新配置 Lookup CurrencyKey 转换，以便将所有无法处理的数据重定向到脚本转换中。

重要提示

本教程需要 AdventureWorksDW 示例数据库。有关如何安装和部署 AdventureWorksDW 的详细信息，请参阅安装 SQL Server 示例和示例数据库的注意事项。

课程中的任务

本课程包含以下任务：

·        任务 1：复制 Lesson 4 包

·        任务 2：创建损坏的文件

·        任务 3：添加错误流重定向

·        任务 4：添加平面文件目标

·        任务 5：测试 Lesson 5 教程包

任务 1：复制 Lesson 4 包
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

在本任务中，您将为在第 4 课中创建的 Lesson 4.dtsx 包创建一个副本。或者，如果未完成第 4 课，则可以向项目添加本教程中附带的已完成的第 4 课包，然后再对其进行复制以供使用。您将使用这一新副本来完成第 5 课剩余部分。

创建第 5 课包
1.   如果 Business IntelligenceDevelopment Studio 尚未打开，请单击“开始”，依次指向“所有程序”和 Microsoft SQLServer，再单击 BusinessIntelligence Development Studio。

2.   在“文件”菜单中，单击“打开”，单击“项目/解决方案”，选择 SSIS Tutorial，再单击“打开”，然后双击 SSISTutorial.sln。

3.   在解决方案资源管理器中，右键单击 Lesson 4.dtsx，再单击“复制”。

4.   在解决方案资源管理器中，右键单击“SSIS 包”，再单击“粘贴”。

默认情况下，复制的包命名为 Lesson 5.dtsx。

5.   在解决方案资源管理器中，双击 Lesson 5.dtsx 打开该包。

6.   右键单击“控制流”选项卡背景的任意位置，再单击“属性”。

7.   在“属性”窗口中，将Name 属性更新为第 5 课。

8.   单击 ID 属性框，然后在列表中，单击“<生成新 ID>”。

添加已完成的第 4 课包
1.   依次打开 Business IntelligenceDevelopment Studio 和 SSIS Tutorial 项目。

2.   在解决方案资源管理器中，右键单击“SSIS 包”，再单击“添加现有包”。

3.   在“添加现有包的副本”对话框的“包位置”中，选择“文件系统”。

4.   单击浏览 (…) 按钮，导航到 C:\Program Files\Microsoft SQLServer\100\Samples\Integration Services\Tutorial\Creating a Simple ETLPackage\Completed Packages，选择 Lesson 4.dtsx，再单击“打开”。

5.   按先前过程中步骤 3 到步骤 8 所述，复制并粘贴第 4 课包。

任务 2：创建损坏的文件
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

为阐释如何配置和处理转换错误，必须创建示例平面文件，处理该文件时将导致组件失败。

在本任务中，将创建现有示例平面文件的一个副本。然后，用记事本打开该文件，编辑 CurrencyID 列，以确保该列在转换查找期间无法生成匹配项。处理新文件时，查找失败将导致Currency Key 查找转换失败，因此，包的剩余部分将失败。创建了损坏的示例文件后，将运行包以查看包失败的情况。

创建损坏的示例平面文件
1.   在记事本或其他文本编辑器中，打开Currency_VEB.txt 文件。

默 认情况下，Currency_VEB.txt 文件安装在以下文件夹中：c:\Program Files\Microsoft SQL Server\100\Samples\IntegrationServices\Tutorial\Creating a Simple ETL Package\Sample Data。

2.   使用文本编辑器的查找和替换功能，查找 VEB 的所有实例，并替换为 BAD。

3.   在包含其他示例数据文件的同一文件夹中，将修改后的文件另存为 Currency_BAD.txt。

重要提示

请确保将 Currency_BAD.txt 保存到 c:\Program Files\Microsoft SQL Server\100\Samples\Integration Services\Tutorial\Creating a Simple ETL Package\Sample Data 文件夹中。

4.   关闭文本编辑器。

验证是否将在运行时发生错误
1.   在“调试”菜单中，单击“启动调试”。

在数据流第三次迭代时，Lookup Currency Key 转换将尝试处理 Currency_BAD.txt 文件，并且该转换将失败。转换失败将导致整个包失败。

2.   在“调试”菜单中，单击“停止调试”。

3.   在设计图面上，单击“执行结果”选项卡。

4.   浏览日志，确认是否发生了以下未处理的错误：

[LookupCurrency Key[30]] Error: Row yielded no match during lookup.

注意

数字 30 为组件的 ID。该值在生成数据流时进行分配，可能与包中的值不同。

任务 3：添加错误流重定向
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

如上一个任务中所示，当 Lookup Currency Key 转换尝试对产生错误的已损坏示例平面文件进行处理时，该转换无法生成匹配。由于转换针对错误输出使用了默认设置，因此，任何错误都将导致该转换失败。当转换失败时，该包的其余部分也将失败。

可以使用错误输出将组件配置为将失败的行重定向到其他处理路径，而不是允许转换失败。使用单独的错误处理路径，您可以执行多项任务。例如，您可能要尝试清除该数据，然后重新处理失败的行。或者，您可能要将失败的行与其他错误信息保存在一起，以便以后进行验证和重新处理。

在本任务中，您将 Lookup Currency Key 转换配置为将所有失败的行重定向到错误输出。在数据流的错误分支中，这些行将被写入文件中。

默认情况下，Integration Services 错误输出中的另外两列（ErrorCode 和 ErrorColumn）只包含表示错误号的数值代码以及出现错误的列的 ID。这些数值的使用具有限制性，而且没有相应的错误说明。

若要更有效地使用错误输出，请在包将失败的行写入文件之前，使用脚本组件来访问 Integration ServicesAPI，然后获取错误说明。

配置错误输出
1.   在“工具箱”中，展开“数据流转换”，然后将“脚本组件”拖动到“数据流”选项卡上的设计图面。将“脚本”放置在 LookupCurrency Key 转换的右侧。

2.   在“选择脚本组件类型”对话框中，单击“转换”，再单击“确定”。

3.   单击 LookupCurrency Key 转换，并将红色箭头拖动到新添加的“脚本”转换中，以连接这两个组件。

红色箭头表示 LookupCurrency Key 转换的错误输出。通过使用红色箭头将转换连接到脚本组件，您可以将所有处理错误重定向到脚本组件，然后，该组件会处理这些错误并将它们发送到目标。

4.   在“配置错误输出”对话框的“错误”列中，选择“重定向行”，再单击“确定”。

5.   在“数据流”设计图面上，在新添加的“脚本组件”中单击“脚本组件”，再将该名称更改为 GetError Description。

6.   双击 Get ErrorDescription 转换。

7.   在“脚本转换编辑器”对话框中的“输入列”页中，选择 ErrorCode 列。

8.   在“输入和输出”页中，展开“输出 0”，单击“输出列”，再单击“添加列”。

9.   在 Name 属性中，键入 ErrorDescription 并将 DataType 属性设置为 string [DT_WSTR]。

10.在“脚本”页中，确保已将 LocaleID 属性设置为“英语(美国)”。

11.单击“编辑脚本”以打开MicrosoftVisual Studio Tools for Applications (VSTA)。在 Input0_ProcessInputRow 方法中，键入或粘贴以下代码。

[Visual Basic]

  Row.ErrorDescription = 
    Me.ComponentMetaData.GetErrorDescription(Row.ErrorCode)
[Visual C#]

Row.ErrorDescription = this.ComponentMetaData.GetErrorDescription(Row.ErrorCode);
已完成的子例程如以下代码所示。

[Visual Basic]

Public Overrides Sub Input0_ProcessInputRow(ByVal Row As Input0Buffer)
 
  Row.ErrorDescription = 
    Me.ComponentMetaData.GetErrorDescription(Row.ErrorCode)
 
End Sub
[Visual C#]

public override void Input0_ProcessInputRow(Input0Buffer Row)
    {
 
        Row.ErrorDescription = this.ComponentMetaData.GetErrorDescription(Row.ErrorCode);
 
    }
12.生成脚本以保存所做的更改，然后关闭 VSTA。

13.单击“确定”以关闭“脚本转换编辑器”对话框。

任务 4：添加平面文件目标
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

Lookup Currency Key 转换的错误输出将无法执行查找操作的所有数据行重定向到脚本转换。为了突显相关错误的信息，脚本转换将运行可获取错误说明的脚本。

在 本任务中，请将有关失败行的所有这些信息保存到分隔的文件中，以便进行后续处理。若要保存失败的行，必须为将包含错误数据和平面文件目标的文本文件添加并 配置平面文件连接管理器。通过设置平面文件目标所用的平面文件连接管理器的属性，可以指定平面文件目标如何格式化和写入文本文件。有关详细信息，请参阅平面文件连接管理器和平面文件目标。

添加并配置平面文件目标
1.   单击“数据流”选项卡。

2.   在工具箱中，展开“数据流目标”，然后将“平面文件目标”拖动到数据流设计图面上。将“平面文件目标”直接放在“获取错误说明”转换的下面。

3.   单击“获取错误说明”转换，然后将绿色箭头拖动到新的“平面文件目标”上。

4.   在“数据流”设计图面上，在新添加的“平面文件目标”转换中单击“平面文件目标”，然后将该名称更改为 FailedRows。

5.   右键单击 FailedRows 转换，再单击“编辑”，然后在平面文件目标编辑器中单击“新建”。

6.   在“平面文件格式”对话框中，确认已选中“带分隔符”，然后单击“确定”。

7.   在平面文件连接管理器编辑器的“连接管理器名称”框中，键入Error Data。

8.   在“平面文件连接管理器编辑器”对话框中，单击“浏览”，然后找到存储文件的文件夹。

9.   在“打开”对话框中，对于“文件名”键入 ErrorOutput.txt，然后单击“打开”。

10.在“平面文件连接管理器编辑器”对话框中，验证“区域设置”框是否包含“英语(美国)”，“代码页”是否包含 1252 (ANSI -Latin I)。

11.在“选项”窗格中，单击“列”。

注意，除了源数据文件中的列以外，还存在三个新列：ErrorCode、ErrorColumn 和 ErrorDescription。这三列由 Lookup Currency Key 转换的错误输出和获取错误说明转换中的脚本生成，可用于排查失败行的原因。

12.单击“确定”。

13.在平面文件目标编辑器中，清除“覆盖文件中的数据”复选框。

清除该复选框可使错误在执行多个包的过程中持续存在。

14.在平面文件目标编辑器中，单击“映射”来验证所有列是否正确。您也可以选择重命名目标中的列。

15.单击“确定”。

任务 5：测试 Lesson 5 教程包
SQL Server 2008 R2

其他版本

此主题尚未评级评价此主题

在运行时，损坏的文件 Currency_BAD.txt 将无法在Currency Key 查找转换中生成匹配。由于 Currency Key 查找的错误输出现在已配置为将失败的行重定向到新的失败的行目标，因此该组件不会失败，并且包会成功地运行。所有失败的错误行都将写入 ErrorOutput.txt。

在此任务中，您将通过运行该包对已修改的错误输出配置进行测试。包成功执行后，您将查看 ErrorOutput.txt 文件的内容。

注意

如果不需要在 ErrorOutput.txt 文件中积累错误行，则应在包的运行间隔手动删除文件内容。

检查包布局

测试包之前，应当确保第 5 课包中的控制流和数据流包含下列关系图中显示的对象。控制流应与第 2 到第 4 课中的控制流相同。

控制流

数据流

运行第 5 课教程包
1.   在“调试”菜单中，单击“启动调试”。

2.   当包运行完毕后，在“调试”菜单中，单击“停止调试”。

验证 ErrorOutput.txt 文件的内容
·        在 记事本或任何其他文本编辑器中，打开ErrorOutput.txt 文件。默认的列顺序为：AverageRate、CurrencyID、CurrencyDate、EndOfDateRate、ErrorCode、 ErrorColumn、ErrorDescription。

请注意，文件中的所有行都包含不匹配的 CurrencyID 值 BAD、ErrorCode 值-1071607778、ErrorColumn 值 0 以及 ErrorDescription 值“在查找期间行没有生成任何匹配项”。由于此错误并不是列所特有的，所以 ErrorColumn 的值设置为 0。它是已失败的查找操作。.