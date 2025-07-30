/**
 * 通用打印模板类
 * 基于图片中的新材料样品确认单格式
 */
class PrintTemplate {
    constructor(containerId = 'print-container') {
        this.containerId = containerId;
        this.data = {};
        this.init();
    }

    /**
     * 初始化模板
     */
    init() {
        this.injectStyles();
        this.createTemplate();
        this.bindEvents();
    }

    /**
     * 注入样式
     */
    injectStyles() {
        const styles = `
            <style id="print-template-styles">
                @page {
                    margin: 20mm;
                    size: A4;
                }
                
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print-template, .print-template * {
                        visibility: visible;
                    }
                    .print-template {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    .no-print {
                        display: none !important;
                    }
                }
                
                .print-template {
                    font-family: "SimSun", "宋体", serif;
                    font-size: 12px;
                    line-height: 1.2;
                    margin: 0;
                    padding: 20px;
                    background: white;
                    width: 100%;
                    max-width: 210mm;
                    margin: 0 auto;
                }
                
                .print-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                    border-bottom: 1px solid #000;
                    padding-bottom: 5px;
                }
                
                .print-logo {
                    display: flex;
                    align-items: center;
                    font-weight: bold;
                }
                
                .print-logo-circle {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background-color: #000;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 10px;
                    font-size: 10px;
                }
                
                .print-company-name {
                    font-size: 14px;
                }
                
                .print-document-info {
                    text-align: right;
                    font-size: 10px;
                }
                
                .print-title {
                    text-align: center;
                    font-size: 18px;
                    font-weight: bold;
                    margin: 20px 0;
                }
                
                .print-form-table {
                    width: 100%;
                    border-collapse: collapse;
                    border: 2px solid #000;
                    margin-bottom: 20px;
                }
                
                .print-form-table td, .print-form-table th {
                    border: 1px solid #000;
                    padding: 4px 6px;
                    vertical-align: top;
                    font-size: 11px;
                }
                
                .print-form-table .label {
                    background-color: #f5f5f5;
                    font-weight: bold;
                    text-align: center;
                    width: 80px;
                    white-space: nowrap;
                }
                
                .print-input-field {
                    border-bottom: 1px solid #000;
                    min-height: 20px;
                    display: inline-block;
                    min-width: 100px;
                    padding: 2px 4px;
                }
                
                .print-checkbox-group {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    flex-wrap: wrap;
                }
                
                .print-checkbox-item {
                    display: flex;
                    align-items: center;
                    gap: 3px;
                }
                
                .print-checkbox {
                    width: 12px;
                    height: 12px;
                    border: 1px solid #000;
                    display: inline-block;
                    position: relative;
                }
                
                .print-checkbox.checked::after {
                    content: "✓";
                    font-size: 10px;
                    line-height: 10px;
                    position: absolute;
                    top: 0;
                    left: 1px;
                }
                
                .print-red-stamp {
                    color: #ff0000;
                    font-weight: bold;
                    transform: rotate(-15deg);
                    position: absolute;
                    right: 50px;
                    top: 200px;
                    font-size: 24px;
                    border: 2px solid #ff0000;
                    padding: 10px;
                    border-radius: 50%;
                }
                
                .print-button {
                    background-color: #007bff;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    cursor: pointer;
                    margin-bottom: 20px;
                    border-radius: 4px;
                }
                
                .print-button:hover {
                    background-color: #0056b3;
                }
            </style>
        `;
        
        // 移除已存在的样式
        const existingStyles = document.getElementById('print-template-styles');
        if (existingStyles) {
            existingStyles.remove();
        }
        
        // 注入新样式
        document.head.insertAdjacentHTML('beforeend', styles);
    }

    /**
     * 创建模板HTML
     */
    createTemplate() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Container with id "${this.containerId}" not found`);
            return;
        }

        const templateHTML = `
            <div class="print-template">
                <!-- 打印按钮 -->
                <button class="print-button no-print" onclick="printTemplate()">打印文档</button>
                
                <!-- 头部信息 -->
                <div class="print-header">
                    <div class="print-logo">
                        <div class="print-logo-circle" data-field="logoText">CoJo</div>
                        <div class="print-company-name" data-field="companyName">可靠新材料技术股份有限公司</div>
                    </div>
                    <div class="print-document-info" data-field="documentNumber">
                        表单编号：YJ-QP-QM-002-02/A04
                    </div>
                </div>
                
                <!-- 标题 -->
                <div class="print-title" data-field="title">新材料样品确认单</div>
                
                <!-- 文件编号信息 -->
                <div style="text-align: right; margin-bottom: 20px; font-size: 11px;" data-field="fileNumber">
                    文件编号：KJ-WHQ-001B-E-25062001
                </div>
                
                <!-- 主表格 -->
                <table class="print-form-table">
                    <tr>
                        <td class="label">样品名称：</td>
                        <td class="wide-cell">
                            <span class="print-input-field" data-field="sampleName">白色导线</span>
                        </td>
                        <td class="label">牌号：</td>
                        <td>
                            <span class="print-input-field" data-field="brandNumber">7010600000412</span>
                        </td>
                        <td class="label">送样数量：</td>
                        <td>
                            <span class="print-input-field" data-field="quantity">3</span>
                        </td>
                        <td class="label">送样时间：</td>
                        <td>
                            <span class="print-input-field" data-field="submitTime">2025.6.25</span>
                        </td>
                        <td class="label">送样次数：</td>
                        <td>
                            <span class="print-input-field" data-field="submitCount">1</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">储存期限：</td>
                        <td>
                            <span class="print-input-field" data-field="storageTime">6个月</span>
                        </td>
                        <td class="label">色差标准（如有）：</td>
                        <td colspan="6">
                            <span class="print-input-field" style="width: 400px;" data-field="colorStandard"></span>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">包装方式：</td>
                        <td>
                            <span class="print-input-field" data-field="packageMethod">普通透明密封袋+标签包装</span>
                        </td>
                        <td class="label">储存方法：</td>
                        <td colspan="6">
                            <span class="print-input-field" style="width: 400px;" data-field="storageMethod">阴凉干燥处储存</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">送样原因：</td>
                        <td colspan="4">
                            <span class="print-input-field" style="width: 300px;" data-field="submitReason">日常送检样</span>
                        </td>
                        <td class="label">样品来源：</td>
                        <td colspan="3">
                            <div class="print-checkbox-group">
                                <div class="print-checkbox-item">
                                    <div class="print-checkbox" data-checkbox="newSupplier"></div>
                                    <span>新供应商</span>
                                </div>
                                <div class="print-checkbox-item">
                                    <div class="print-checkbox" data-checkbox="existing"></div>
                                    <span>现有</span>
                                </div>
                                <div class="print-checkbox-item">
                                    <div class="print-checkbox" data-checkbox="materialChange"></div>
                                    <span>原料变更</span>
                                </div>
                                <div class="print-checkbox-item">
                                    <div class="print-checkbox" data-checkbox="quantity"></div>
                                    <span>数量</span>
                                </div>
                                <div class="print-checkbox-item">
                                    <div class="print-checkbox" data-checkbox="scoring"></div>
                                    <span>计分计算</span>
                                </div>
                                <div class="print-checkbox-item">
                                    <div class="print-checkbox" data-checkbox="other"></div>
                                    <span>其他</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">样代表该材料：</td>
                        <td>
                            <div class="print-checkbox-group">
                                <div class="print-checkbox-item">
                                    <div class="print-checkbox" data-checkbox="replaceMaterial"></div>
                                    <span>替代性原材料</span>
                                </div>
                                <div class="print-checkbox-item">
                                    <div class="print-checkbox" data-checkbox="sameMaterial"></div>
                                    <span>与材料间同样使用</span>
                                </div>
                                <div class="print-checkbox-item">
                                    <div class="print-checkbox" data-checkbox="otherMaterial"></div>
                                    <span>其他</span>
                                </div>
                            </div>
                        </td>
                        <td class="label">联系人：</td>
                        <td colspan="6">
                            <span class="print-input-field" style="width: 300px;" data-field="contactAddress">深圳州华区域城镇科技一面陆一小区K栋2楼</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">供应商信息</td>
                        <td colspan="4">
                            <div>联系人：<span class="print-input-field" data-field="supplierContact">张明明</span></div>
                            <div style="margin-top: 5px;">与技术联络号：<span class="print-input-field" data-field="techContact"></span></div>
                        </td>
                        <td class="label">电话：</td>
                        <td>
                            <span class="print-input-field" data-field="phone">13316568509</span>
                        </td>
                        <td colspan="2"></td>
                    </tr>
                    <tr>
                        <td colspan="9" style="padding: 0;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="border: none; width: 50%; padding: 10px; vertical-align: top;">
                                        <div style="font-weight: bold; margin-bottom: 10px;">检测1（研发）：</div>
                                        <div data-field="test1Content">
                                            1. 确认检测：新供应商营检测渠（检化条例1500235）<br>
                                            2. 测试工人工序特号，测试卡片RQK-VYM5018<br>
                                            特号相接、导报、个人O95mm，走点、城区接间<br>
                                            3. 承认纸规，照明行品线测汀，详见出特<br>
                                            4. 外观确认、日检号和外观<br>
                                            5. 组装确认：尺寸舍各要求、详见测作有表现<br>
                                            6. 测试先报技、应用什表面成<br>
                                            7. 其它要求：无
                                        </div>
                                        <br>
                                        <div>检测人/日期：<span class="print-input-field" data-field="tester1">初检验 2015.6.25</span></div>
                                        <div style="margin-top: 10px;">审批/日期：<span class="print-input-field" data-field="approver1">孟二 2015.6.25</span></div>
                                    </td>
                                    <td style="border-left: 1px solid #000; width: 50%; padding: 10px; vertical-align: top;">
                                        <div>检测负责：</div>
                                        <div class="print-checkbox-group" style="margin: 10px 0; flex-direction: column; align-items: flex-start;">
                                            <div class="print-checkbox-item">
                                                <div class="print-checkbox" data-checkbox="qualified1"></div>
                                                <span>合格，连合生产;出产采购_____台</span>
                                            </div>
                                            <div class="print-checkbox-item">
                                                <div class="print-checkbox" data-checkbox="qualified2"></div>
                                                <span>合格，直接采购</span>
                                            </div>
                                            <div class="print-checkbox-item">
                                                <div class="print-checkbox" data-checkbox="unqualified"></div>
                                                <span>不合格，处理方式待定</span>
                                            </div>
                                            <div class="print-checkbox-item">
                                                <div class="print-checkbox" data-checkbox="otherOpinion"></div>
                                                <span>其他意见</span>
                                            </div>
                                        </div>
                                        <br>
                                        <div>质代签署负责：</div>
                                        <div class="print-checkbox-group" style="margin: 10px 0; flex-direction: column; align-items: flex-start;">
                                            <div class="print-checkbox-item">
                                                <div class="print-checkbox" data-checkbox="sameVerify"></div>
                                                <span>原材料有相同验明应用</span>
                                            </div>
                                            <div class="print-checkbox-item">
                                                <div class="print-checkbox" data-checkbox="conditionalVerify"></div>
                                                <span>原材料条件验明应用</span>
                                            </div>
                                            <div class="print-checkbox-item">
                                                <div class="print-checkbox" data-checkbox="conditionalUse"></div>
                                                <span>工厂需条件标，可使用作检料运行（需在作配协协议）</span>
                                            </div>
                                        </div>
                                        <div style="margin-top: 20px;">策品工单号：<span class="print-input-field" data-field="orderNumber"></span></div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="9" style="padding: 10px;">
                            <div style="font-weight: bold; margin-bottom: 10px;">检测2（品质会生产）（关键尺寸，关键特级，详见测作有表现）：</div>
                            <div style="margin-top: 10px;">
                                检测人/日期：<span class="print-input-field" data-field="tester2">曾爽炜 2015.6.27</span>
                                <span style="margin-left: 50px;">审批/日期：<span class="print-input-field" data-field="approver2">胡汉松 2015.6.27</span></span>
                                <span style="margin-left: 50px;">跟进人：<span class="print-input-field" data-field="follower">Peter 2015.6.27</span></span>
                                <span style="margin-left: 30px;" data-field="finalDate">曾坯 2015.6.27</span>
                            </div>
                        </td>
                    </tr>
                </table>
                
                <!-- 红色印章 -->
                <div class="print-red-stamp" data-field="stamp">已经审批</div>
            </div>
        `;

        container.innerHTML = templateHTML;
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 添加全局打印函数
        window.printTemplate = () => {
            window.print();
        };

        // 复选框点击事件
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('print-checkbox')) {
                e.target.classList.toggle('checked');
            }
        });
    }

    /**
     * 设置数据
     * @param {Object} data - 要填充的数据
     */
    setData(data) {
        this.data = { ...this.data, ...data };
        this.updateTemplate();
    }

    /**
     * 更新模板内容
     */
    updateTemplate() {
        // 更新文本字段
        Object.keys(this.data).forEach(key => {
            const elements = document.querySelectorAll(`[data-field="${key}"]`);
            elements.forEach(element => {
                if (element.innerHTML !== undefined) {
                    element.innerHTML = this.data[key];
                }
            });
        });

        // 更新复选框
        Object.keys(this.data).forEach(key => {
            if (key.endsWith('Checked')) {
                const checkboxName = key.replace('Checked', '');
                const checkbox = document.querySelector(`[data-checkbox="${checkboxName}"]`);
                if (checkbox) {
                    if (this.data[key]) {
                        checkbox.classList.add('checked');
                    } else {
                        checkbox.classList.remove('checked');
                    }
                }
            }
        });
    }

    /**
     * 获取当前数据
     * @returns {Object} 当前模板数据
     */
    getData() {
        const data = { ...this.data };
        
        // 获取复选框状态
        const checkboxes = document.querySelectorAll('.print-checkbox[data-checkbox]');
        checkboxes.forEach(checkbox => {
            const name = checkbox.getAttribute('data-checkbox');
            data[name + 'Checked'] = checkbox.classList.contains('checked');
        });

        return data;
    }

    /**
     * 打印文档
     */
    print() {
        window.print();
    }

    /**
     * 重置模板
     */
    reset() {
        this.data = {};
        this.createTemplate();
    }
}

// 使用示例
/*
// 1. 创建实例
const printTemplate = new PrintTemplate('my-print-container');

// 2. 设置数据
printTemplate.setData({
    sampleName: '新样品名称',
    brandNumber: '1234567890',
    quantity: '5',
    submitTime: '2025.1.15',
    newSupplierChecked: true,
    sameMaterialChecked: true
});

// 3. 打印
printTemplate.print();
*/

// 导出类（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PrintTemplate;
}