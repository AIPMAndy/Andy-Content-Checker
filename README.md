# Content Compliance Checker

[中文](#中文说明) | [English](#english)

---

## 中文说明

### 📋 简介

Content Compliance Checker 是一个专业的内容合规审核工具，帮助创作者检查内容是否符合中国主流社交媒体平台的合规要求。

支持平台：
- 🔴 **小红书** (Xiaohongshu/RED)
- 📱 **抖音** (Douyin/TikTok China)
- 💬 **微信公众号** (WeChat Official Account)

### ✨ 核心特性

- **多维度检查**：政治敏感、色情低俗、暴力血腥、违法犯罪、虚假信息、侵权内容
- **平台特殊规则**：针对不同平台的特殊合规要求（引流、营销、互动等）
- **智能风险评级**：高危 / 高风险 / 中风险 / 低风险 / 安全
- **精准定位**：标出问题内容的具体位置和上下文
- **实用修改建议**：提供具体可行的改写方案
- **混合检测模式**：关键词匹配 + LLM 语义理解，减少误判

### 🚀 快速开始

#### 前置要求

- Node.js 14+
- Claude Code 或其他支持自定义 Skill 的 AI 工具

#### 安装

**作为 Claude Code Skill 使用：**

```bash
# 1. 克隆仓库
git clone https://github.com/AIPMAndy/Andy-Content-Checker.git

# 2. 复制到 Claude skills 目录
cp -r Andy-Content-Checker ~/.claude/skills/content-compliance

# 3. 赋予执行权限
chmod +x ~/.claude/skills/content-compliance/skill.js
```

**作为独立工具使用：**

```bash
# 1. 克隆仓库
git clone https://github.com/AIPMAndy/Andy-Content-Checker.git
cd Andy-Content-Checker

# 2. 直接运行
node skill.js xiaohongshu "你的内容"
```

### 📖 使用方式

#### 在 Claude Code 中使用

```bash
# 检查小红书内容
/content-compliance xiaohongshu "这款面膜是我用过最好的！效果绝了！想要的加我微信：xxx"

# 检查抖音视频文案
/content-compliance douyin "震惊！这个赚钱方法99%的人都不知道！"

# 检查公众号文章（从文件读取）
/content-compliance wechat article.txt

# 检查所有平台通用规则
/content-compliance all "你的内容"
```

#### 独立命令行使用

```bash
# 基础用法
node skill.js <平台> <内容或文件路径>

# 示例
node skill.js xiaohongshu "内容文本"
node skill.js douyin content.txt
node skill.js all "检查所有平台规则"
```

### 📊 输出示例

```markdown
# 内容合规检查报告

## 📊 总体评估
- **合规等级**: 高风险
- **合规分数**: 30/100
- **建议操作**: 强烈建议修改

## 🚨 风险点列表

### 1. 站外引流 - 高风险
- **位置**: 末尾
- **问题内容**: "加我微信：xxx"
- **违规原因**: 小红书禁止留任何站外联系方式
- **修改建议**: 删除联系方式，改为"欢迎评论区交流"
- **影响平台**: 小红书 ✓

### 2. 绝对化用词 - 低风险
- **位置**: 开头
- **问题内容**: "最好的"
- **违规原因**: 使用绝对化排名用词
- **修改建议**: 改为"非常好用的"、"我很喜欢的"
- **影响平台**: 小红书 ✓

## 💡 优化后版本
这款面膜是我用过非常好用的！效果真的很棒！欢迎评论区一起交流护肤心得~
```

### 🔍 检查维度

#### 通用规则（所有平台）

| 类别 | 严重程度 | 示例 |
|------|---------|------|
| 政治敏感 | 🔴 高危 | 分裂国家、攻击政策 |
| 色情低俗 | 🔴 高危 | 性暗示、裸露内容 |
| 暴力血腥 | 🟠 高风险 | 暴力画面、自残内容 |
| 违法犯罪 | 🔴 高危 | 赌博、毒品、诈骗 |
| 虚假信息 | 🟠 高风险 | 谣言、假新闻 |
| 侵犯权益 | 🟡 中风险 | 侵权、泄露隐私 |

#### 小红书特殊规则

- 🟠 **站外引流**：禁止留微信、淘宝等联系方式
- 🟡 **过度营销**：硬广、虚假种草
- 🟠 **医美虚假宣传**：夸大效果、隐瞒风险
- 🟢 **绝对化用词**："最好"、"第一"等
- 🟡 **虚假体验**：未实际使用却写测评

#### 抖音特殊规则

- 🟠 **站外导流**：引导到其他平台
- 🟡 **诱导互动**：强制关注、点赞、分享
- 🟡 **虚假摆拍**：冒充真实事件
- 🔴 **未成年人不当内容**：展示不良行为
- 🟢 **过度滤镜**：美妆类过度美颜

#### 微信公众号特殊规则

- 🟠 **诱导分享**：强制分享朋友圈
- 🟡 **诱导关注**：关注后才能获取内容
- 🟡 **标题党**：标题与内容严重不符
- 🟡 **违规H5营销**：诱导类游戏
- 🟡 **过度商业推广**：频繁硬广
- 🟠 **侵权内容**：洗稿、抄袭

### 🏗️ 项目结构

```
Andy-Content-Checker/
├── skill.js                    # 核心逻辑：关键词匹配和初步检查
├── skill.prompt                # LLM 提示词：深度语义分析
├── skill.md                    # 技能文档和使用说明
├── compliance-rules.json       # 规则库：15KB+ 详细规则
├── README.md                   # 项目文档
├── LICENSE                     # MIT 许可证
└── package.json                # 项目配置
```

### 🔧 工作原理

1. **关键词匹配**：`skill.js` 对内容进行快速关键词扫描
2. **上下文提取**：提取每个匹配关键词的前后文
3. **LLM 深度分析**：基于 `skill.prompt` 进行语义理解，避免误判
4. **风险评估**：综合评估风险等级和合规分数
5. **生成报告**：输出详细的检查报告和修改建议

### 🎯 适用场景

- ✅ 内容发布前的合规自查
- ✅ 创作团队的内容审核流程
- ✅ MCN 机构的批量内容检查
- ✅ 个人创作者的风险规避
- ✅ 营销文案的合规优化

### ⚠️ 免责声明

1. 本工具基于规则库进行检查，可能存在误判或漏判
2. 最终是否合规以平台实际审核为准
3. 建议在发布前进行人工复核
4. 规则库会定期更新，保持与平台政策同步
5. 仅供内容创作参考，不构成法律建议

### 🤝 贡献

欢迎提交 Issue 和 Pull Request！

**贡献方式：**
- 🐛 报告 Bug 或误判案例
- 💡 提出新功能建议
- 📝 完善规则库（新增关键词、模式）
- 🌍 添加更多平台支持
- 📚 改进文档

### 📄 许可证

[MIT License](LICENSE)

### 👨‍💻 作者

**Andy** - AI 产品经理 & 开源贡献者

- GitHub: [@AIPMAndy](https://github.com/AIPMAndy)
- Email: mike66888@2925.com

### 🙏 致谢

- 规则库基于各平台官方社区规范和运营规则
- 参考了实际违规处罚案例
- 感谢所有贡献者和用户的反馈

---

## English

### 📋 Introduction

Content Compliance Checker is a professional content moderation tool that helps creators verify whether their content complies with the guidelines of mainstream Chinese social media platforms.

Supported Platforms:
- 🔴 **Xiaohongshu (RED/Little Red Book)**
- 📱 **Douyin (TikTok China)**
- 💬 **WeChat Official Account**

### ✨ Key Features

- **Multi-dimensional Checks**: Political sensitivity, pornography, violence, illegal activities, misinformation, infringement
- **Platform-Specific Rules**: Tailored compliance requirements for different platforms
- **Smart Risk Rating**: Critical / High / Medium / Low / Safe
- **Precise Localization**: Pinpoint problematic content with context
- **Actionable Suggestions**: Provide specific rewriting recommendations
- **Hybrid Detection**: Keyword matching + LLM semantic understanding to reduce false positives

### 🚀 Quick Start

#### Prerequisites

- Node.js 14+
- Claude Code or other AI tools supporting custom Skills

#### Installation

**As Claude Code Skill:**

```bash
# 1. Clone the repository
git clone https://github.com/AIPMAndy/Andy-Content-Checker.git

# 2. Copy to Claude skills directory
cp -r Andy-Content-Checker ~/.claude/skills/content-compliance

# 3. Grant execution permission
chmod +x ~/.claude/skills/content-compliance/skill.js
```

**As Standalone Tool:**

```bash
# 1. Clone the repository
git clone https://github.com/AIPMAndy/Andy-Content-Checker.git
cd Andy-Content-Checker

# 2. Run directly
node skill.js xiaohongshu "your content"
```

### 📖 Usage

#### In Claude Code

```bash
# Check Xiaohongshu content
/content-compliance xiaohongshu "This face mask is the best I've ever used!"

# Check Douyin video script
/content-compliance douyin "Shocking! 99% of people don't know this trick!"

# Check WeChat article (from file)
/content-compliance wechat article.txt

# Check all platform rules
/content-compliance all "your content"
```

#### Standalone CLI

```bash
# Basic usage
node skill.js <platform> <content or file path>

# Examples
node skill.js xiaohongshu "content text"
node skill.js douyin content.txt
node skill.js all "check all platform rules"
```

### 🏗️ Project Structure

```
Andy-Content-Checker/
├── skill.js                    # Core logic: keyword matching
├── skill.prompt                # LLM prompt: semantic analysis
├── skill.md                    # Documentation
├── compliance-rules.json       # Rule database: 15KB+ detailed rules
├── README.md                   # Project documentation
├── LICENSE                     # MIT License
└── package.json                # Project config
```

### ⚠️ Disclaimer

1. This tool is based on rule matching and may have false positives/negatives
2. Final compliance is subject to platform's actual review
3. Manual review is recommended before publishing
4. The rule database is periodically updated
5. For reference only, not legal advice

### 🤝 Contributing

Contributions are welcome! Feel free to submit Issues and Pull Requests.

**How to contribute:**
- 🐛 Report bugs or false positive cases
- 💡 Suggest new features
- 📝 Improve rule database (add keywords, patterns)
- 🌍 Add support for more platforms
- 📚 Improve documentation

### 📄 License

[MIT License](LICENSE)

### 👨‍💻 Author

**Andy** - AI Product Manager & Open Source Contributor

- GitHub: [@AIPMAndy](https://github.com/AIPMAndy)
- Email: mike66888@2925.com

---

**Star ⭐ this repo if you find it helpful!**
