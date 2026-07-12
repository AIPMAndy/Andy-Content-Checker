# Contributing to Content Compliance Checker

Thank you for your interest in contributing! 🎉

## How to Contribute

### Reporting Issues

If you find a bug, false positive, or have a feature request:

1. Check if the issue already exists in [Issues](https://github.com/AIPMAndy/content-compliance-checker/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Sample content that triggered the issue (if applicable)

### Submitting Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**
   ```bash
   git commit -m "Add: new feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request**

### Contribution Areas

#### 🐛 Bug Fixes
- Fix false positives/negatives
- Improve keyword matching accuracy
- Fix edge cases

#### 📝 Rule Database
- Add new keywords
- Add new violation patterns
- Update platform-specific rules
- Add examples of violations

Example rule addition:
```json
{
  "id": "new-category",
  "name": "新分类",
  "severity": "medium",
  "keywords": ["关键词1", "关键词2"],
  "patterns": ["模式描述"],
  "examples": ["示例说明"]
}
```

#### 🌍 Platform Support
- Add support for new platforms (Bilibili, Weibo, etc.)
- Research platform-specific compliance rules
- Implement platform detection logic

#### 📚 Documentation
- Improve README
- Add usage examples
- Translate documentation
- Write tutorials

#### ✨ New Features
- Batch processing mode
- API server mode
- Web UI
- Custom rule configuration
- Export formats (JSON, CSV)

### Code Style

- Use 2 spaces for indentation
- Write clear comments in English
- Follow existing code structure
- Keep functions focused and small

### Testing

Before submitting:
- Test with various content samples
- Verify no false positives introduced
- Check all platforms still work
- Ensure no breaking changes

### Commit Message Guidelines

Format: `<type>: <description>`

Types:
- `Add`: New feature or rule
- `Fix`: Bug fix
- `Update`: Update existing functionality
- `Docs`: Documentation changes
- `Refactor`: Code refactoring
- `Test`: Add or update tests

Examples:
```
Add: support for Bilibili platform
Fix: false positive for "最好的朋友"
Update: Xiaohongshu rules for 2026
Docs: add usage examples
```

### Rule Update Process

When updating `compliance-rules.json`:

1. Document the reason for the change
2. Provide examples of content that should be caught
3. Verify existing rules still work
4. Update the `lastUpdated` field
5. Update `CHANGELOG.md`

### Questions?

Feel free to:
- Open a discussion in Issues
- Reach out to the maintainer: mike66888@2925.com
- Ask in your Pull Request

## Code of Conduct

- Be respectful and constructive
- Focus on the technical merit of contributions
- Help maintain a welcoming community
- Respect diverse perspectives and experiences

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for making Content Compliance Checker better! 🚀
