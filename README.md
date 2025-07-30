# 前端打印模板

基于新材料样品确认单格式的通用前端打印模板，严格按照图片中的表格样式实现。

## 文件说明

- `print-template.html` - 独立的完整打印模板页面
- `PrintTemplate.js` - 可重用的JavaScript打印模板类
- `example.html` - 使用示例演示页面
- `README.md` - 使用说明文档

## 功能特性

✅ **严格按照图片格式**：完全还原图片中的表格布局和样式  
✅ **响应式设计**：适配不同屏幕尺寸，优化打印效果  
✅ **数据绑定**：支持动态数据填充和更新  
✅ **交互式复选框**：可点击的复选框控件  
✅ **打印优化**：专门的打印样式，隐藏不必要元素  
✅ **模块化设计**：可轻松集成到现有项目中  
✅ **数据导出**：支持导出表单数据为JSON格式  

## 快速开始

### 方法一：使用独立页面

直接打开 `print-template.html` 文件，这是一个完整的独立页面，包含所有功能。

### 方法二：使用JavaScript类

1. 在HTML页面中引入 `PrintTemplate.js`：

```html
<script src="PrintTemplate.js"></script>
```

2. 创建容器元素：

```html
<div id="print-container"></div>
```

3. 初始化模板：

```javascript
const printTemplate = new PrintTemplate('print-container');
```

4. 设置数据：

```javascript
printTemplate.setData({
    sampleName: '新样品名称',
    brandNumber: '1234567890',
    quantity: '5',
    submitTime: '2025.1.15',
    newSupplierChecked: true,
    sameMaterialChecked: true
});
```

5. 打印文档：

```javascript
printTemplate.print();
```

## API 文档

### PrintTemplate 类

#### 构造函数

```javascript
new PrintTemplate(containerId)
```

- `containerId` (string): 容器元素的ID，默认为 'print-container'

#### 方法

##### setData(data)

设置模板数据

```javascript
printTemplate.setData({
    sampleName: '样品名称',
    brandNumber: '牌号',
    quantity: '数量',
    submitTime: '时间',
    // ... 更多字段
});
```

##### getData()

获取当前模板数据（包括复选框状态）

```javascript
const data = printTemplate.getData();
console.log(data);
```

##### print()

打印文档

```javascript
printTemplate.print();
```

##### reset()

重置模板到初始状态

```javascript
printTemplate.reset();
```

### 数据字段说明

#### 文本字段

| 字段名 | 说明 | 示例值 |
|--------|------|--------|
| `sampleName` | 样品名称 | "白色导线" |
| `brandNumber` | 牌号 | "7010600000412" |
| `quantity` | 送样数量 | "3" |
| `submitTime` | 送样时间 | "2025.6.25" |
| `submitCount` | 送样次数 | "1" |
| `storageTime` | 储存期限 | "6个月" |
| `colorStandard` | 色差标准 | "" |
| `packageMethod` | 包装方式 | "普通透明密封袋+标签包装" |
| `storageMethod` | 储存方法 | "阴凉干燥处储存" |
| `submitReason` | 送样原因 | "日常送检样" |
| `contactAddress` | 联系地址 | "深圳州华区域城镇科技一面陆一小区K栋2楼" |
| `supplierContact` | 供应商联系人 | "张明明" |
| `techContact` | 技术联络号 | "" |
| `phone` | 电话 | "13316568509" |
| `tester1` | 检测人1 | "初检验 2015.6.25" |
| `approver1` | 审批人1 | "孟二 2015.6.25" |
| `tester2` | 检测人2 | "曾爽炜 2015.6.27" |
| `approver2` | 审批人2 | "胡汉松 2015.6.27" |
| `follower` | 跟进人 | "Peter 2015.6.27" |

#### 复选框字段

| 字段名 | 说明 |
|--------|------|
| `newSupplierChecked` | 新供应商 |
| `existingChecked` | 现有 |
| `materialChangeChecked` | 原料变更 |
| `quantityChecked` | 数量 |
| `scoringChecked` | 计分计算 |
| `otherChecked` | 其他 |
| `replaceMaterialChecked` | 替代性原材料 |
| `sameMaterialChecked` | 与材料间同样使用 |
| `otherMaterialChecked` | 其他材料 |
| `qualified1Checked` | 合格，连合生产 |
| `qualified2Checked` | 合格，直接采购 |
| `unqualifiedChecked` | 不合格，处理方式待定 |
| `otherOpinionChecked` | 其他意见 |

## 样式定制

### 修改公司信息

在模板中找到以下部分并修改：

```html
<div class="print-logo-circle">CoJo</div>
<div class="print-company-name">可靠新材料技术股份有限公司</div>
```

### 修改表单编号

```html
<div class="print-document-info">表单编号：YJ-QP-QM-002-02/A04</div>
```

### 修改文件编号

```html
<div>文件编号：KJ-WHQ-001B-E-25062001</div>
```

### 自定义样式

可以通过修改CSS来自定义外观：

```css
/* 修改字体大小 */
.print-template {
    font-size: 14px;
}

/* 修改表格边框 */
.print-form-table {
    border: 3px solid #000;
}

/* 修改标签背景色 */
.print-form-table .label {
    background-color: #e9ecef;
}
```

## 打印优化

### 打印设置建议

1. **纸张大小**：A4
2. **方向**：纵向
3. **边距**：20mm（已在CSS中设置）
4. **缩放**：100%

### 浏览器兼容性

- Chrome（推荐）：完美支持
- Firefox：良好支持
- Safari：良好支持
- Edge：良好支持

### 打印样式特性

- 自动隐藏打印按钮和控制面板
- 优化的页面布局
- 确保内容在一页内显示
- 保持表格结构完整

## 集成示例

### React 集成

```jsx
import React, { useEffect, useRef } from 'react';
import PrintTemplate from './PrintTemplate';

function PrintComponent({ data }) {
    const containerRef = useRef(null);
    const templateRef = useRef(null);

    useEffect(() => {
        if (containerRef.current && !templateRef.current) {
            templateRef.current = new PrintTemplate(containerRef.current.id);
        }
    }, []);

    useEffect(() => {
        if (templateRef.current && data) {
            templateRef.current.setData(data);
        }
    }, [data]);

    const handlePrint = () => {
        if (templateRef.current) {
            templateRef.current.print();
        }
    };

    return (
        <div>
            <button onClick={handlePrint}>打印</button>
            <div id="print-container" ref={containerRef}></div>
        </div>
    );
}
```

### Vue 集成

```vue
<template>
    <div>
        <button @click="handlePrint">打印</button>
        <div id="print-container" ref="container"></div>
    </div>
</template>

<script>
import PrintTemplate from './PrintTemplate';

export default {
    props: ['data'],
    data() {
        return {
            printTemplate: null
        };
    },
    mounted() {
        this.printTemplate = new PrintTemplate('print-container');
        if (this.data) {
            this.printTemplate.setData(this.data);
        }
    },
    watch: {
        data: {
            handler(newData) {
                if (this.printTemplate && newData) {
                    this.printTemplate.setData(newData);
                }
            },
            deep: true
        }
    },
    methods: {
        handlePrint() {
            if (this.printTemplate) {
                this.printTemplate.print();
            }
        }
    }
};
</script>
```

## 常见问题

### Q: 打印时页面布局变形？

A: 确保使用Chrome浏览器，并检查打印设置中的缩放比例是否为100%。

### Q: 如何隐藏某些字段？

A: 可以通过CSS设置对应元素的 `display: none`：

```css
[data-field="colorStandard"] {
    display: none;
}
```

### Q: 如何添加新的字段？

A: 在HTML模板中添加新的 `data-field` 元素，然后通过 `setData()` 方法设置数据。

### Q: 复选框状态不保存？

A: 确保使用正确的字段名格式，复选框字段名应以 `Checked` 结尾。

## 版本历史

- **v1.0.0** - 初始版本，实现基本打印功能
- 严格按照图片格式实现
- 支持数据绑定和打印优化
- 提供完整的API和示例

## 许可证

MIT License

## 支持

如有问题或建议，请查看示例文件或联系开发团队。