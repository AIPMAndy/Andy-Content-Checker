# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-12

### Added
- Initial release of Content Compliance Checker
- Support for Xiaohongshu (Little Red Book) platform rules
- Support for Douyin (TikTok China) platform rules
- Support for WeChat Official Account platform rules
- Comprehensive rule database (15KB+) covering:
  - Political sensitivity
  - Pornography and vulgarity
  - Violence and gore
  - Illegal activities
  - Misinformation
  - Infringement
- Platform-specific rule checking
- Hybrid detection mode: keyword matching + LLM semantic analysis
- Risk rating system: Critical / High / Medium / Low / Safe
- Detailed compliance reports with specific suggestions
- Support for both text input and file input
- Claude Code Skill integration
- Standalone CLI tool support

### Documentation
- Comprehensive README in Chinese and English
- Usage examples and demos
- Project structure documentation
- Contributing guidelines
- MIT License

### Features
- Multi-dimensional content checking
- Context-aware analysis to reduce false positives
- Precise violation localization
- Actionable rewriting suggestions
- Platform adaptation recommendations
- Optimized version generation for high-risk content

---

## Future Roadmap

### Planned for v1.1.0
- [ ] Add support for Bilibili platform
- [ ] Add support for Weibo platform
- [ ] Enhanced pattern recognition for disguised violations
- [ ] Batch processing mode for multiple files
- [ ] JSON/CSV output format support
- [ ] API server mode

### Planned for v1.2.0
- [ ] Web UI dashboard
- [ ] Real-time monitoring integration
- [ ] Historical compliance tracking
- [ ] Custom rule configuration
- [ ] Multi-language support (beyond Chinese/English)

### Community Suggestions
- Your ideas here! Please submit issues or PRs

---

[1.0.0]: https://github.com/AIPMAndy/content-compliance-checker/releases/tag/v1.0.0
