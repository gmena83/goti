# Changelog

All notable changes to the GOTI project will be documented in this file.

## [Unreleased]

## [0.2.0] - 2025-12-09

### Added
- **Enhanced File Uploads**: Support for uploading PDF, JSON, Markdown, and Text files directly to the Knowledge Base via the Chat UI.
- **Split Upload UI**: Distinct buttons for Image Upload (Vision) and Document Upload (RAG) for better usability.
- **Paste Support**: Ability to paste both images and document files directly into the chat input.
- **Audio Transcription**: Voice recording and transcription feature added to the Chat UI.

### Changed
- **PDF Processing**: Switched from `pdf-parse` to `pdf2json` to resolve build compatibility issues.
- **API Route**: Added `POST /api/documents/upload-file` to handle multipart file uploads and auto-indexing.
- **UI Feedback**: Added "Indexing document..." indicator state during file uploads.

### Fixed
- **Build Errors**: Resolved `DOMMatrix` errors during production build by replacing incompatible libraries.
- **Type Safety**: Improved TypeScript types for chat messages and file handling.
