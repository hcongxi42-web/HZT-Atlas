using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

string outputFile = args.Length > 0 ? args[0] : "./output.docx";
using var doc = WordprocessingDocument.Create(outputFile, WordprocessingDocumentType.Document);
var mainPart = doc.AddMainDocumentPart();
mainPart.Document = new Document(new Body());
var body = mainPart.Document.Body!;

AddStyles(mainPart);
AddNumbering(mainPart);

uint prId = 1;

// ===== COVER =====
body.Append(new Paragraph(new ParagraphProperties(new SpacingBetweenLines { Before = "4000" }), new Run()));

body.Append(new Paragraph(
    new ParagraphProperties(
        new Justification { Val = JustificationValues.Center },
        new SpacingBetweenLines { After = "200" }),
    new Run(new RunProperties(
        new FontSize { Val = "72" }, new Bold(),
        new RunFonts { Ascii = "Calibri", HighAnsi = "Calibri", EastAsia = "Microsoft YaHei" },
        new Color { Val = "1e3a5f" },
        new Spacing { Val = 60 }),
        new Text("产业链图谱平台"))));

body.Append(new Paragraph(
    new ParagraphProperties(
        new Justification { Val = JustificationValues.Center },
        new SpacingBetweenLines { After = "600" }),
    new Run(new RunProperties(
        new FontSize { Val = "56" }, new Bold(),
        new RunFonts { Ascii = "Calibri", HighAnsi = "Calibri", EastAsia = "Microsoft YaHei" },
        new Color { Val = "2c5282" },
        new Spacing { Val = 40 }),
        new Text("无限细分层级设计方案"))));

body.Append(new Paragraph(
    new ParagraphProperties(
        new Justification { Val = JustificationValues.Center },
        new SpacingBetweenLines { After = "200" }),
    new Run(new RunProperties(
        new FontSize { Val = "28" },
        new RunFonts { Ascii = "Calibri", HighAnsi = "Calibri", EastAsia = "Microsoft YaHei" },
        new Color { Val = "64748b" }),
        new Text("解决产业链树状无限细分的UI架构问题"))));

body.Append(new Paragraph(
    new ParagraphProperties(
        new Justification { Val = JustificationValues.Center },
        new SpacingBetweenLines { Before = "3000" }),
    new Run(new RunProperties(
        new FontSize { Val = "22" },
        new RunFonts { Ascii = "Calibri", HighAnsi = "Calibri", EastAsia = "Microsoft YaHei" },
        new Color { Val = "94a3b8" }),
        new Text("2025年6月"))));

body.Append(new Paragraph(new ParagraphProperties(new SectionProperties(
    new TitlePage(),
    new SectionType { Val = SectionMarkValues.NextPage },
    new PageSize { Width = 11906, Height = 16838 },
    new PageMargin { Top = 0, Right = 0, Bottom = 0, Left = 0, Header = 0, Footer = 0 }))));

// ===== TOC =====
body.Append(H1("目录", "_Toc000"));

body.Append(new Paragraph(
    new ParagraphProperties(new SpacingBetweenLines { After = "200" }),
    new Run(new RunProperties(new Color { Val = "94a3b8" }, new FontSize { Val = "18" },
        new RunFonts { Ascii = "Calibri", HighAnsi = "Calibri", EastAsia = "Microsoft YaHei" }),
        new Text("右键目录，选择\"更新域\"刷新页码"))));

body.Append(new Paragraph(
    new Run(new FieldChar { FieldCharType = FieldCharValues.Begin }),
    new Run(new FieldCode(" TOC \\o \"1-3\" \\h \\z \\u ") { Space = SpaceProcessingModeValues.Preserve }),
    new Run(new FieldChar { FieldCharType = FieldCharValues.Separate })));

string[,] toc = {
    { "一、问题分析", "1" }, { "二、核心设计原则", "1" },
    { "三、数据模型重构", "1" }, { "3.1 新数据模型（树状结构）", "2" },
    { "3.2 为什么用扁平存储", "2" }, { "四、UI交互设计", "1" },
    { "4.1 面包屑导航", "2" }, { "4.2 当前层级图谱", "2" },
    { "4.3 股票侧边栏", "2" }, { "4.4 跨层级连接线", "2" },
    { "五、视图模式", "1" }, { "六、编辑功能设计", "1" },
    { "七、示例数据结构", "1" }, { "八、实施路线图", "1" },
    { "九、关键决策点", "1" },
};
for (int i = 0; i < toc.GetLength(0); i++)
    body.Append(new Paragraph(
        new ParagraphProperties(new ParagraphStyleId { Val = $"TOC{toc[i, 1]}" }),
        new Run(new Text(toc[i, 0])), new Run(new TabChar()), new Run(new Text((i + 1).ToString()))));

body.Append(new Paragraph(new Run(new FieldChar { FieldCharType = FieldCharValues.End })));

body.Append(new Paragraph(new ParagraphProperties(new SectionProperties(
    new SectionType { Val = SectionMarkValues.NextPage },
    new PageSize { Width = 11906, Height = 16838 },
    new PageMargin { Top = 1800, Right = 1440, Bottom = 1440, Left = 1440, Header = 720, Footer = 720 }))));

// ===== HEADER & FOOTER =====
var headerPart = mainPart.AddNewPart<HeaderPart>();
var headerId = mainPart.GetIdOfPart(headerPart);
headerPart.Header = new Header(new Paragraph(
    new ParagraphProperties(new Justification { Val = JustificationValues.Right }),
    new Run(new RunProperties(new FontSize { Val = "18" }, new Color { Val = "94a3b8" },
        new RunFonts { Ascii = "Calibri", HighAnsi = "Calibri", EastAsia = "Microsoft YaHei" }),
        new Text("产业链图谱平台 - 无限细分层级设计方案"))));

var footerPart = mainPart.AddNewPart<FooterPart>();
var footerId = mainPart.GetIdOfPart(footerPart);
var fp = new Paragraph(new ParagraphProperties(new Justification { Val = JustificationValues.Center }));
fp.Append(R18("第 ")); fp.Append(R18("")); fp.Append(new Run(new FieldChar { FieldCharType = FieldCharValues.Begin }));
fp.Append(new Run(new FieldCode(" PAGE ") { Space = SpaceProcessingModeValues.Preserve }));
fp.Append(new Run(new FieldChar { FieldCharType = FieldCharValues.Separate }));
fp.Append(R18("1")); fp.Append(new Run(new FieldChar { FieldCharType = FieldCharValues.End }));
fp.Append(R18(" 页 / 共 ")); fp.Append(new Run(new FieldChar { FieldCharType = FieldCharValues.Begin }));
fp.Append(new Run(new FieldCode(" NUMPAGES ") { Space = SpaceProcessingModeValues.Preserve }));
fp.Append(new Run(new FieldChar { FieldCharType = FieldCharValues.Separate }));
fp.Append(R18("1")); fp.Append(new Run(new FieldChar { FieldCharType = FieldCharValues.End }));
fp.Append(R18(" 页"));
footerPart.Footer = new Footer(fp);

// ===== CONTENT =====

// Section 1
body.Append(H1("一、问题分析", "_Toc001"));
body.Append(Para("当前系统的最大痛点在于：产业链是树状无限细分的结构，但UI只支持固定的3层。"));
body.Append(Para("真实产业链结构如下所示："));

body.Append(CodeBlock(
"半导体（根）\n" +
"  数字芯片设计（分支）\n" +
"    存储芯片（分支）\n" +
"      NOR Flash（分支）\n" +
"        SPI NOR（分支）\n" +
"          旺宏电子（叶子-股票）\n" +
"        QSPI NOR（分支）\n" +
"          华邦电子（叶子-股票）\n" +
"      NAND Flash（分支）\n" +
"        SLC NAND（分支）\n" +
"        3D NAND（分支）\n" +
"          长江存储（叶子-股票）\n" +
"    CPU（分支）\n" +
"      X86架构（分支）\n" +
"      ARM架构（分支）\n" +
"      RISC-V架构（分支）\n" +
"        芯来科技（叶子-股票）"
));

body.Append(Para("在这种树状结构中，每个节点都可能继续向下细分，无法用固定的层级数量来限定。因此，需要一种能够支持无限层级下钻的UI架构。"));

// Section 2
body.Append(H1("二、核心设计原则", "_Toc002"));
body.Append(Para("解决方案采用\"面包屑 + 当前层级图谱\"模式。"));
body.Append(Para("核心思路：不要试图一次性展示整棵树，而是只展示当前层级的节点，通过面包屑告诉用户\"我在哪\"，点击节点可以\"下钻\"查看其子节点。"));

body.Append(H3("UI示意"));
body.Append(Para("面包屑导航位于页面顶部，显示当前所处路径，如：产业链图谱 > 半导体 > 数字芯片设计 > 存储芯片 > NOR Flash。每个层级都可点击，快速跳转到对应位置。"));
body.Append(Para("中间区域只展示当前层级的直接子节点，例如当处于\"NOR Flash\"层级时，展示SPI NOR、QSPI NOR、Parallel NOR等子节点。"));

// Section 3
body.Append(H1("三、数据模型重构", "_Toc003"));

body.Append(H2("3.1 新数据模型（树状结构）"));
body.Append(Para("采用扁平数组 + parentId 的树状关系存储，每个节点可以拥有子节点（继续下钻）和股票列表（叶子数据）。"));

body.Append(CodeBlock(
"interface ChainNode {\n" +
"  id: string;                    // 唯一标识\n" +
"  name: string;                  // 节点名称\n" +
"  parentId: string | null;       // 父节点ID（null=根节点）\n" +
"  level: 'upstream' | 'midstream' | 'downstream';\n" +
"  description: string;           // 一句话描述\n" +
"  keyProducts: string[];         // 核心产品列表\n" +
"  stocks: Stock[];               // 该节点关联的股票\n" +
"  isLeaf: boolean;               // 是否是叶子节点\n" +
"}\n\n" +
"interface Stock {\n" +
"  id: string;\n" +
"  name: string;\n" +
"  code: string;\n" +
"  tag: string;\n" +
"}"
));

body.Append(H2("3.2 为什么用扁平存储"));
body.Append(Para("所有节点放在一个 nodes 数组中，通过 parentId 建立树状关系。这种方式的优势在于："));
body.Append(Bullet("更容易序列化（localStorage/JSON）"));
body.Append(Bullet("更容易查询（直接 filter(node => node.parentId === 'xxx')）"));
body.Append(Bullet("更容易编辑（移动节点只需改 parentId）"));

// Section 4
body.Append(H1("四、UI交互设计", "_Toc004"));

body.Append(H2("4.1 面包屑导航（顶部）"));
body.Append(Para("位于页面顶部，格式为：产业链图谱 > 半导体 > 数字芯片设计 > 存储芯片 > NOR Flash"));
body.Append(Bullet("每个层级都可点击下拉，快速跳转到该层级的任意兄弟节点"));
body.Append(Bullet("点击非当前层级可直接跳转"));

body.Append(H2("4.2 当前层级图谱（中间主区域）"));
body.Append(Para("只渲染当前节点的直接子节点。节点样式根据类型区分："));

// Table
var tbl = new Table(new TableProperties(
    new TableWidth { Width = "5000", Type = TableWidthUnitValues.Pct },
    new TableBorders(
        new TopBorder { Val = BorderValues.Single, Size = 12, Color = "2c5282" },
        new BottomBorder { Val = BorderValues.Single, Size = 12, Color = "2c5282" },
        new InsideHorizontalBorder { Val = BorderValues.Nil },
        new InsideVerticalBorder { Val = BorderValues.Nil })),
    new TableGrid(new GridColumn { Width = "2000" }, new GridColumn { Width = "3500" }, new GridColumn { Width = "3500" }));
tbl.Append(TblRow(true, "节点类型", "视觉表现", "交互方式"));
tbl.Append(TblRow(false, "分支节点", "卡片右下角有\"展开→\"图标", "点击进入子层级"));
tbl.Append(TblRow(false, "叶子节点", "卡片显示关联股票数量", "点击展开股票列表"));
tbl.Append(TblRow(false, "混合节点", "同时显示展开图标和股票数量", "两种交互都有"));
body.Append(tbl);
body.Append(Caption("表1：节点类型与交互方式"));

body.Append(H2("4.3 股票侧边栏（右侧）"));
body.Append(Para("当前节点的所有关联股票，按细分标签分组展示。支持按股票代码、名称搜索。"));

body.Append(H2("4.4 跨层级连接线"));
body.Append(Para("有些关系不是父子关系，而是跨分支的关联。例如EDA软件到芯片设计（工具到用户）、晶圆制造到封装测试（工序衔接）。用独立的 connections 数组描述这些关系，仅在总览视图中显示。"));

// Section 5
body.Append(H1("五、视图模式", "_Toc005"));

body.Append(H3("模式A：层级下钻（默认）"));
body.Append(Para("一层一层往下钻，适合精确研究某个细分赛道。面包屑显示完整路径，主区域展示当前层级的子节点。"));

body.Append(H3("模式B：总览图谱（宏观）"));
body.Append(Para("只展示第一层子节点（上中下游大分类），用连线表示跨节点关系。类似当前版本的总览页面。"));

body.Append(H3("模式C：树形展开（探索）"));
body.Append(Para("左侧树形导航（可折叠），右侧显示选中节点的详情。适合探索整体结构。"));

// Section 6
body.Append(H1("六、编辑功能设计", "_Toc006"));

body.Append(Para("编辑模式支持以下操作："));
body.Append(NumItem("添加节点：右键空白处，选择节点类型，输入名称和描述"));
body.Append(NumItem("移动节点：拖拽节点到另一个节点上方 = 设为目标的子节点"));
body.Append(NumItem("提升/降级：右键节点，选择\"设为子节点\"或\"提升一级\""));
body.Append(NumItem("添加股票：在股票侧边栏点击\"添加股票\"，输入代码、名称、标签"));
body.Append(NumItem("跨节点连线：右键节点A，选择\"连接到...\"，点击节点B"));
body.Append(NumItem("删除节点/线：右键删除，关联数据一并清理"));

// Section 7
body.Append(H1("七、示例数据结构", "_Toc007"));
body.Append(Para("以存储芯片分支为例，展示完整的数据结构："));

body.Append(CodeBlock(
"{\n" +
"  \"nodes\": [\n" +
"    { \"id\": \"semi\", \"name\": \"半导体\", \"parentId\": null, ... },\n" +
"    { \"id\": \"semi-digital\", \"name\": \"数字芯片设计\", \"parentId\": \"semi\", ... },\n" +
"    { \"id\": \"semi-memory\", \"name\": \"存储芯片\", \"parentId\": \"semi-digital\",\n" +
"      \"stocks\": [{\"name\":\"兆易创新\",\"code\":\"603986\"}], ... },\n" +
"    { \"id\": \"semi-nor\", \"name\": \"NOR Flash\", \"parentId\": \"semi-memory\", ... },\n" +
"    { \"id\": \"semi-spi-nor\", \"name\": \"SPI NOR\", \"parentId\": \"semi-nor\",\n" +
"      \"stocks\": [...], \"isLeaf\": true },\n" +
"    { \"id\": \"semi-nand\", \"name\": \"NAND Flash\", \"parentId\": \"semi-memory\", ... },\n" +
"    { \"id\": \"semi-3d-nand\", \"name\": \"3D NAND\", \"parentId\": \"semi-nand\",\n" +
"      \"stocks\": [{\"name\":\"长江存储\",\"code\":\"未上市\"}], \"isLeaf\": true }\n" +
"  ],\n" +
"  \"connections\": [\n" +
"    { \"from\": \"semi-nor\", \"to\": \"semi-nand\", \"label\": \"同属存储芯片\" }\n" +
"  ]\n" +
"}"
));

// Section 8
body.Append(H1("八、实施路线图", "_Toc008"));

var tbl2 = new Table(new TableProperties(
    new TableWidth { Width = "5000", Type = TableWidthUnitValues.Pct },
    new TableBorders(
        new TopBorder { Val = BorderValues.Single, Size = 12, Color = "2c5282" },
        new BottomBorder { Val = BorderValues.Single, Size = 12, Color = "2c5282" },
        new InsideHorizontalBorder { Val = BorderValues.Nil },
        new InsideVerticalBorder { Val = BorderValues.Nil })),
    new TableGrid(new GridColumn { Width = "1200" }, new GridColumn { Width = "2000" }, new GridColumn { Width = "5800" }));
tbl2.Append(TblRow(true, "阶段", "目标", "内容"));
tbl2.Append(TblRow(false, "阶段1", "数据模型改造", "重构 industries.ts，采用新的树状结构；编写 useTree hook"));
tbl2.Append(TblRow(false, "阶段2", "UI改造", "新增面包屑组件；改造主画布为\"当前层级渲染\"模式；新增树形侧边栏"));
tbl2.Append(TblRow(false, "阶段3", "编辑功能", "节点CRUD；拖拽移动（改变 parentId）；跨节点连线"));
tbl2.Append(TblRow(false, "阶段4", "数据迁移", "将现有3层数据迁移为树状结构；补充更多细分层级"));
body.Append(tbl2);
body.Append(Caption("表2：实施路线图"));

// Section 9
body.Append(H1("九、关键决策点", "_Toc009"));

body.Append(H3("Q1：一个节点最多只能有一个父节点吗？"));
body.Append(Para("A：建议只允许一个父节点。如果一家公司横跨多个细分，在多个叶子节点分别列出（股票数据可以重复）。这样树结构保持简单清晰。"));

body.Append(H3("Q2：根节点是否显示股票？"));
body.Append(Para("A：根节点和分支节点都可以显示股票。比如\"存储芯片\"节点可以列出所有存储相关股票，\"NOR Flash\"节点只列出NOR相关股票。这样用户在不同层级都能看到相关股票。"));

body.Append(H3("Q3：连接线的意义？"));
body.Append(Para("A：只在总览视图中显示跨一级节点的连线（如EDA到芯片设计、制造到封测）。在层级下钻视图中不显示连线，因为父子关系本身就是最强的连接。"));

body.Append(H3("Q4：数据编辑如何持久化？"));
body.Append(Para("A：继续用 localStorage 存储用户的编辑。数据结构改为扁平数组后，JSON 序列化更简单。未来可扩展为后端数据库持久化。"));

// Final section
body.Append(new Paragraph(new ParagraphProperties(new SectionProperties(
    new HeaderReference { Type = HeaderFooterValues.Default, Id = headerId },
    new FooterReference { Type = HeaderFooterValues.Default, Id = footerId },
    new PageSize { Width = 11906, Height = 16838 },
    new PageMargin { Top = 1800, Right = 1440, Bottom = 1440, Left = 1440, Header = 720, Footer = 720 }))));

// Settings
var sp = mainPart.DocumentSettingsPart ?? mainPart.AddNewPart<DocumentSettingsPart>();
sp.Settings = new Settings(new UpdateFieldsOnOpen { Val = true });

doc.Save();

// ===== HELPER METHODS =====

static void AddStyles(MainDocumentPart mainPart)
{
    var sp = mainPart.AddNewPart<StyleDefinitionsPart>();
    sp.Styles = new Styles();

    sp.Styles.Append(new Style(
        new StyleName { Val = "Normal" },
        new StyleParagraphProperties(
            new SpacingBetweenLines { After = "160", Line = "360", LineRule = LineSpacingRuleValues.Auto },
            new Indentation { FirstLine = "480" }),
        new StyleRunProperties(
            new RunFonts { Ascii = "Calibri", HighAnsi = "Calibri", EastAsia = "Microsoft YaHei" },
            new FontSize { Val = "22" },
            new Color { Val = "334155" })
    ) { Type = StyleValues.Paragraph, StyleId = "Normal", Default = true });

    sp.Styles.Append(new Style(
        new StyleName { Val = "heading 1" }, new BasedOn { Val = "Normal" },
        new StyleParagraphProperties(
            new KeepNext(), new KeepLines(),
            new SpacingBetweenLines { Before = "600", After = "240" },
            new Indentation { FirstLine = "0" },
            new OutlineLevel { Val = 0 }),
        new StyleRunProperties(new Bold(), new FontSize { Val = "36" },
            new RunFonts { Ascii = "Calibri", HighAnsi = "Calibri", EastAsia = "Microsoft YaHei" },
            new Color { Val = "1e3a5f" })
    ) { Type = StyleValues.Paragraph, StyleId = "Heading1" });

    sp.Styles.Append(new Style(
        new StyleName { Val = "heading 2" }, new BasedOn { Val = "Normal" },
        new StyleParagraphProperties(
            new KeepNext(), new KeepLines(),
            new SpacingBetweenLines { Before = "400", After = "160" },
            new Indentation { FirstLine = "0" },
            new OutlineLevel { Val = 1 }),
        new StyleRunProperties(new Bold(), new FontSize { Val = "28" },
            new RunFonts { Ascii = "Calibri", HighAnsi = "Calibri", EastAsia = "Microsoft YaHei" },
            new Color { Val = "2c5282" })
    ) { Type = StyleValues.Paragraph, StyleId = "Heading2" });

    sp.Styles.Append(new Style(
        new StyleName { Val = "heading 3" }, new BasedOn { Val = "Normal" },
        new StyleParagraphProperties(
            new KeepNext(), new KeepLines(),
            new SpacingBetweenLines { Before = "280", After = "120" },
            new Indentation { FirstLine = "0" },
            new OutlineLevel { Val = 2 }),
        new StyleRunProperties(new Bold(), new FontSize { Val = "24" },
            new RunFonts { Ascii = "Calibri", HighAnsi = "Calibri", EastAsia = "Microsoft YaHei" },
            new Color { Val = "475569" })
    ) { Type = StyleValues.Paragraph, StyleId = "Heading3" });

    sp.Styles.Append(new Style(
        new StyleName { Val = "Caption" }, new BasedOn { Val = "Normal" },
        new StyleParagraphProperties(
            new Justification { Val = JustificationValues.Center },
            new Indentation { FirstLine = "0" },
            new SpacingBetweenLines { Before = "60", After = "320" }),
        new StyleRunProperties(new Color { Val = "94a3b8" }, new FontSize { Val = "20" },
            new RunFonts { Ascii = "Calibri", HighAnsi = "Calibri", EastAsia = "Microsoft YaHei" })
    ) { Type = StyleValues.Paragraph, StyleId = "Caption" });

    sp.Styles.Append(new Style(
        new StyleName { Val = "toc 1" }, new BasedOn { Val = "Normal" },
        new StyleParagraphProperties(
            new Tabs(new TabStop { Val = TabStopValues.Right, Leader = TabStopLeaderCharValues.Dot, Position = 9350 }),
            new SpacingBetweenLines { Before = "200", After = "60" },
            new Indentation { FirstLine = "0" }),
        new StyleRunProperties(new Bold(), new Color { Val = "334155" },
            new RunFonts { Ascii = "Calibri", HighAnsi = "Calibri", EastAsia = "Microsoft YaHei" })
    ) { Type = StyleValues.Paragraph, StyleId = "TOC1" });

    sp.Styles.Append(new Style(
        new StyleName { Val = "toc 2" }, new BasedOn { Val = "Normal" },
        new StyleParagraphProperties(
            new Tabs(new TabStop { Val = TabStopValues.Right, Leader = TabStopLeaderCharValues.Dot, Position = 9350 }),
            new SpacingBetweenLines { Before = "60", After = "60" },
            new Indentation { Left = "360", FirstLine = "0" }),
        new StyleRunProperties(new Color { Val = "64748b" },
            new RunFonts { Ascii = "Calibri", HighAnsi = "Calibri", EastAsia = "Microsoft YaHei" })
    ) { Type = StyleValues.Paragraph, StyleId = "TOC2" });
}

static void AddNumbering(MainDocumentPart mp)
{
    var np = mp.AddNewPart<NumberingDefinitionsPart>();
    np.Numbering = new Numbering(
        new AbstractNum(new Level(
            new NumberingFormat { Val = NumberFormatValues.Decimal },
            new LevelText { Val = "%1." },
            new LevelJustification { Val = LevelJustificationValues.Left },
            new ParagraphProperties(new Indentation { Left = "720", Hanging = "360" })
        ) { LevelIndex = 0 }) { AbstractNumberId = 1 },
        new NumberingInstance(new AbstractNumId { Val = 1 }) { NumberID = 1 });
}

static Paragraph H1(string text, string bm)
{
    int id = text.GetHashCode() & 0x7FFFFFFF;
    return new Paragraph(
        new ParagraphProperties(new ParagraphStyleId { Val = "Heading1" }),
        new BookmarkStart { Id = id.ToString(), Name = bm },
        new Run(new Text(text)),
        new BookmarkEnd { Id = id.ToString() });
}

static Paragraph H2(string text) => new Paragraph(
    new ParagraphProperties(new ParagraphStyleId { Val = "Heading2" }),
    new Run(new Text(text)));

static Paragraph H3(string text) => new Paragraph(
    new ParagraphProperties(new ParagraphStyleId { Val = "Heading3" }),
    new Run(new Text(text)));

static Paragraph Para(string text) => new Paragraph(new Run(new Text(text)));

static Paragraph Caption(string text) => new Paragraph(
    new ParagraphProperties(new ParagraphStyleId { Val = "Caption" }),
    new Run(new Text(text)));

static Paragraph Bullet(string text) => new Paragraph(
    new ParagraphProperties(new Indentation { Left = "720", Hanging = "360" }, new SpacingBetweenLines { After = "80" }),
    new Run(new RunProperties(new Color { Val = "334155" }, new FontSize { Val = "22" },
        new RunFonts { Ascii = "Calibri", HighAnsi = "Calibri", EastAsia = "Microsoft YaHei" }),
        new Text("\u2022  " + text)));

static Paragraph NumItem(string text) => new Paragraph(
    new ParagraphProperties(
        new NumberingProperties(new NumberingLevelReference { Val = 0 }, new NumberingId { Val = 1 }),
        new Indentation { FirstLine = "0" }),
    new Run(new Text(text)));

static Paragraph CodeBlock(string code) => new Paragraph(
    new ParagraphProperties(
        new Shading { Val = ShadingPatternValues.Clear, Fill = "f1f5f9" },
        new SpacingBetweenLines { Before = "120", After = "120", Line = "300", LineRule = LineSpacingRuleValues.Auto },
        new Indentation { Left = "200", Right = "200", FirstLine = "0" }),
    new Run(new RunProperties(
        new RunFonts { Ascii = "Consolas", HighAnsi = "Consolas", EastAsia = "Microsoft YaHei" },
        new FontSize { Val = "18" }, new Color { Val = "475569" }),
        new Text(code) { Space = SpaceProcessingModeValues.Preserve }));

static TableRow TblRow(bool hdr, params string[] cells)
{
    var row = new TableRow();
    if (hdr) row.Append(new TableRowProperties(new TableHeader()));
    foreach (var t in cells)
    {
        var tcp = new TableCellProperties(new TableCellWidth { Width = "0", Type = TableWidthUnitValues.Auto });
        if (hdr) tcp.Append(new Shading { Val = ShadingPatternValues.Clear, Fill = "f1f5f9" });
        var rpr = new RunProperties(
            new RunFonts { Ascii = "Calibri", HighAnsi = "Calibri", EastAsia = "Microsoft YaHei" },
            new FontSize { Val = "20" }, new Color { Val = hdr ? "1e3a5f" : "475569" });
        if (hdr) rpr.Append(new Bold());
        row.Append(new TableCell(tcp, new Paragraph(
            new ParagraphProperties(
                new Justification { Val = JustificationValues.Left },
                new Indentation { FirstLine = "0" },
                new SpacingBetweenLines { Before = "60", After = "60" }),
            new Run(rpr, new Text(t) { Space = SpaceProcessingModeValues.Preserve }))));
    }
    return row;
}

static Run R18(string text) => new Run(new RunProperties(new FontSize { Val = "18" }, new Color { Val = "94a3b8" },
    new RunFonts { Ascii = "Calibri", HighAnsi = "Calibri", EastAsia = "Microsoft YaHei" }),
    new Text(text) { Space = SpaceProcessingModeValues.Preserve });
