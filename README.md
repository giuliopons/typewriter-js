# typewriter-js

A lightweight JavaScript library to create a typewriter-style text animation with optional typo simulation and automatic looping.

## ✨ Features

- Types text **character by character** with a blinking cursor.
- Supports **random typos and corrections** using the `.fixtypo` class.
- Optionally **locks element height** before animation with the `.fixheight` class.
- Automatically **erases and retypes** the text in a loop.
- **Injects necessary CSS** automatically.

## 🚀 Usage

### 1. Include the script

```html
<script src="typewriter.js"></script>
```
### 2. Add the typewriter class

```html
<h1 class="typewriter">Hello, world!</h1>
```

### 3. Optional classes
- fixtypo — simulates random typos and corrections.
- fixheight — locks the element's height before animation starts.
