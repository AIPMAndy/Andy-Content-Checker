#!/usr/bin/env node

/**
 * Content Compliance Checker Skill
 * 检查内容是否符合国内主流平台合规要求
 */

const fs = require('fs');
const path = require('path');

// 加载合规规则库
const RULES_PATH = path.join(__dirname, 'compliance-rules.json');
const rules = JSON.parse(fs.readFileSync(RULES_PATH, 'utf-8'));

/**
 * 解析平台参数
 */
function parsePlatform(platform) {
  if (!platform || platform === 'all') return 'all';

  const platformMap = {
    'xiaohongshu': 'xiaohongshu',
    'xhs': 'xiaohongshu',
    '小红书': 'xiaohongshu',
    'douyin': 'douyin',
    'dy': 'douyin',
    '抖音': 'douyin',
    'wechat': 'wechat',
    'wx': 'wechat',
    '公众号': 'wechat',
  };

  return platformMap[platform.toLowerCase()] || 'all';
}

/**
 * 读取内容（支持文件路径或直接文本）
 */
function readContent(input) {
  // 尝试作为文件路径读取
  if (fs.existsSync(input)) {
    return fs.readFileSync(input, 'utf-8');
  }
  // 否则作为文本内容
  return input;
}

/**
 * 检查关键词匹配
 */
function checkKeywords(content, keywords) {
  const matches = [];
  const lowerContent = content.toLowerCase();

  for (const keyword of keywords) {
    const lowerKeyword = keyword.toLowerCase();
    let index = lowerContent.indexOf(lowerKeyword);

    while (index !== -1) {
      // 获取上下文
      const start = Math.max(0, index - 20);
      const end = Math.min(content.length, index + keyword.length + 20);
      const context = content.substring(start, end);

      matches.push({
        keyword,
        index,
        context: context.replace(keyword, `**${keyword}**`),
        originalText: content.substring(index, index + keyword.length)
      });

      index = lowerContent.indexOf(lowerKeyword, index + 1);
    }
  }

  return matches;
}

/**
 * 检查模式匹配（基于LLM语义理解）
 */
function checkPatterns(content, patterns) {
  // 这里返回需要LLM进一步分析的模式
  return patterns;
}

/**
 * 执行合规检查
 */
function performCheck(content, platform) {
  const violations = [];
  let lowestSeverity = 'safe';

  // 通用规则检查
  const generalRules = rules.platforms.general;
  for (const category of generalRules.categories) {
    const keywordMatches = checkKeywords(content, category.keywords);

    if (keywordMatches.length > 0) {
      violations.push({
        platform: '通用',
        category: category.name,
        categoryId: category.id,
        severity: category.severity,
        matches: keywordMatches,
        patterns: category.patterns,
        examples: category.examples
      });

      // 更新最低安全等级
      if (severityLevel(category.severity) < severityLevel(lowestSeverity)) {
        lowestSeverity = category.severity;
      }
    }
  }

  // 平台特殊规则检查
  if (platform !== 'all' && rules.platforms[platform]) {
    const platformRules = rules.platforms[platform];
    for (const category of platformRules.categories) {
      const keywordMatches = checkKeywords(content, category.keywords);

      if (keywordMatches.length > 0) {
        violations.push({
          platform: platformRules.name,
          category: category.name,
          categoryId: category.id,
          severity: category.severity,
          matches: keywordMatches,
          patterns: category.patterns,
          examples: category.examples
        });

        if (severityLevel(category.severity) < severityLevel(lowestSeverity)) {
          lowestSeverity = category.severity;
        }
      }
    }
  } else if (platform === 'all') {
    // 检查所有平台特殊规则
    for (const [platformKey, platformRules] of Object.entries(rules.platforms)) {
      if (platformKey === 'general') continue;

      for (const category of platformRules.categories) {
        const keywordMatches = checkKeywords(content, category.keywords);

        if (keywordMatches.length > 0) {
          violations.push({
            platform: platformRules.name,
            category: category.name,
            categoryId: category.id,
            severity: category.severity,
            matches: keywordMatches,
            patterns: category.patterns,
            examples: category.examples
          });

          if (severityLevel(category.severity) < severityLevel(lowestSeverity)) {
            lowestSeverity = category.severity;
          }
        }
      }
    }
  }

  return {
    violations,
    severity: lowestSeverity,
    needsLLMAnalysis: violations.length > 0 // 如果有关键词匹配，需要LLM进行深度分析
  };
}

/**
 * 严重程度排序
 */
function severityLevel(severity) {
  const levels = { critical: 0, high: 1, medium: 2, low: 3, safe: 4 };
  return levels[severity] || 4;
}

/**
 * 获取风险等级信息
 */
function getRiskLevel(severity) {
  return rules.riskLevels[severity] || rules.riskLevels.safe;
}

/**
 * 生成检查结果摘要（供LLM使用）
 */
function generateSummary(content, platform, checkResult) {
  const riskLevel = getRiskLevel(checkResult.severity);

  return {
    content,
    platform,
    checkResult: {
      severity: checkResult.severity,
      riskLevel: riskLevel,
      violations: checkResult.violations.map(v => ({
        platform: v.platform,
        category: v.category,
        categoryId: v.categoryId,
        severity: v.severity,
        matchCount: v.matches.length,
        matches: v.matches.map(m => ({
          keyword: m.keyword,
          context: m.context
        })),
        patterns: v.patterns,
        examples: v.examples
      }))
    },
    needsLLMAnalysis: checkResult.needsLLMAnalysis
  };
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('用法: /content-compliance [平台] [内容或文件路径]');
    console.log('平台: xiaohongshu/xhs/小红书 | douyin/dy/抖音 | wechat/wx/公众号 | all');
    process.exit(1);
  }

  let platform = 'all';
  let contentInput = args.join(' ');

  // 检查第一个参数是否是平台名
  const possiblePlatform = args[0].toLowerCase();
  const platformKeys = ['xiaohongshu', 'xhs', '小红书', 'douyin', 'dy', '抖音', 'wechat', 'wx', '公众号', 'all'];

  if (platformKeys.includes(possiblePlatform)) {
    platform = parsePlatform(possiblePlatform);
    contentInput = args.slice(1).join(' ');
  }

  if (!contentInput) {
    console.error('错误: 请提供待检查的内容');
    process.exit(1);
  }

  const content = readContent(contentInput);
  const checkResult = performCheck(content, platform);
  const summary = generateSummary(content, platform, checkResult);

  // 输出JSON格式给LLM处理
  console.log(JSON.stringify(summary, null, 2));
}

// 如果是直接运行（不是被require）
if (require.main === module) {
  main();
}

module.exports = { performCheck, generateSummary, parsePlatform, readContent };
