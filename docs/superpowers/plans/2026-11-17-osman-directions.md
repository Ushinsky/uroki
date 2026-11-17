# Osman Directions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add one animated comparison of Selim I and Suleiman I's main campaign directions to history § 20.

**Architecture:** A self-contained scene script registers one canvas scene with the unchanged `stick-scene` runtime. The existing HTML lesson embeds it before the text diagram, which remains the accessible explanation.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, stick-scene canvas runtime.

**Spec:** `docs/superpowers/specs/2026-11-17-osman-directions-design.md`

## Global Constraints

- Light theme only; keep the lesson's historical claims and wording.
- `prefers-reduced-motion` shows a still frame.
- The scene must distinguish the capture of most of Hungary from the unsuccessful siege of Vienna.

## Review Focus

- Narrow screen: route names and figures remain visible.
- Reduced motion: history content remains understandable without playback.
- Animation reset: last frame returns to idle without a jump.
- Script order: runtime loads before the scene registration.
- Existing quiz and navigation still work.

### Task 1: Build and embed the scene

**Files:** Create `history/p20/scenes/ottoman-directions.js`; copy unchanged `history/p20/scenes/stick.js`; modify `history/p20/index.html`.

**Interfaces:** Register `SCENES['ottoman-directions']`; embed `<stick-scene scene="ottoman-directions" play="view">`.

- [x] Create a 6–8 second scene with two named routes and a visible stop at Vienna.
- [x] Add semantic text around the canvas and styles matching the lesson.
- [x] Render a contact sheet and inspect every beat.
- [x] Run the motion checker until it reports clean motion.
- [x] Open the lesson at desktop and phone widths; verify light surfaces, labels and existing controls.
- [x] Commit and publish the verified change.
