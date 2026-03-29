# TypeScript কনফিগারেশন এবং বেস্ট প্র্যাকটিস গাইড

## সারসংক্ষেপ

এই ডকুমেন্টটি TypeScript প্রজেক্টে `tsconfig.json` এর প্রতিটি সেটিং এবং ইন্ডাস্ট্রি-স্ট্যান্ডার্ড কোডিং প্র্যাকটিস বিস্তারিতভাবে ব্যাখ্যা করে।

---

## ১. `tsconfig.json` কী এবং কেন দরকার?

`tsconfig.json` হলো **TypeScript কম্পাইলার কনফিগারেশন ফাইল**। এটি TypeScript কম্পাইলারকে বলে দেয়:
- কোন ফাইলগুলো কম্পাইল করতে হবে
- কীভাবে কম্পাইল করতে হবে
- আউটপুট কোথায় রাখতে হবে
- টাইপ চেকিং কতটা কঠোর হবে

---

## ২. `compilerOptions` — বিস্তারিত ব্যাখ্যা

### **২.১ ফাইল লোকেশন সেটিংস**

```json
"rootDir": "./src",
"outDir": "./dist"
```

**কী করে:**
- `rootDir` — তোমার সব `.ts` ফাইল কোথায় আছে তা বলে দেয়
- `outDir` — কম্পাইল করা `.js` ফাইল কোথায় রাখতে হবে তা নির্ধারণ করে

**ইন্ডাস্ট্রি স্ট্যান্ডার্ড প্র্যাকটিস:**
```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "baseUrl": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**কেন গুরুত্বপূর্ণ:** প্রজেক্ট গোছানো থাকে এবং বিল্ড প্রক্রিয়া স্পষ্ট হয়।

---

### **২.২ এনভায়রনমেন্ট সেটিংস**

#### **ক) `module: "nodenext"`**

```json
"module": "nodenext"
```

**কী করে:** কম্পাইল করা কোড কোন মডিউল সিস্টেম ব্যবহার করবে তা ঠিক করে দেয়।

**সম্ভাব্য মান ও ব্যবহার:**

| মান | ব্যবহার | আউটপুট উদাহরণ |
|-----|---------|----------------|
| `commonjs` | পুরনো Node.js | `const x = require('./file')` |
| `nodenext` | আধুনিক Node.js 16+ | `import x from './file.js'` |
| `esnext` | ব্রাউজার ও আধুনিক বান্ডলার | ES6 modules |
| `amd` | পুরনো ব্রাউজার | `define(['file'], ...)` |

**ইন্ডাস্ট্রি স্ট্যান্ডার্ড:**
- আধুনিক Node.js প্রজেক্টের জন্য: `"nodenext"`
- ব্রাউজার প্রজেক্টের জন্য: `"esnext"`
- React প্রজেক্টে: `"esnext"`

---

#### **খ) `target: "esnext"`**

```json
"target": "esnext"
```

**কী করে:** কম্পাইল করা JavaScript কোন সংস্করণে আউটপুট হবে তা নির্ধারণ করে।

**সম্ভাব্য মান:**

| মান | JavaScript সংস্করণ | ব্রাউজার সাপোর্ট |
|-----|------------------|-----------------|
| `es5` | পুরনো | IE 9+ |
| `es2015` | ES6 | আধুনিক ব্রাউজার |
| `es2020` | তুলনামূলক নতুন | আধুনিক ব্রাউজার |
| `esnext` | সর্বশেষ | Node.js 16+ |

**সঠিক পছন্দ:**
```json
// প্রোডাকশন ওয়েব অ্যাপের জন্য
"target": "es2020",

// Node.js সার্ভার প্রজেক্টের জন্য
"target": "esnext",

// পুরনো ব্রাউজার সাপোর্ট করতে হলে
"target": "es2015"
```

---

#### **গ) `types: []`**

```json
"types": []
```

**কী করে:** `@types/*` প্যাকেজ থেকে কোন টাইপ ডেফিনিশন লোড করতে হবে তা নির্ধারণ করে।

**খালি রাখার মানে:** কোনো ডিফল্ট টাইপ লোড হবে না। কাস্টম টাইপ নিয়ন্ত্রণের জন্য এটি উপযোগী।

**Node.js প্রজেক্টে সঠিক সেটিং:**
```json
{
  "compilerOptions": {
    "types": ["node"],
    "lib": ["esnext"]
  }
}
// টার্মিনালে চালাও: npm install -D @types/node
```

---

### **২.৩ আউটপুট সেটিংস**

#### **ক) `sourceMap: true`**

```json
"sourceMap": true
```

**কী করে:** `.map` ফাইল তৈরি করে যা কম্পাইল করা কোডকে আসল `.ts` ফাইলের সাথে সংযুক্ত করে।

**সুবিধা:**
- ডিবাগিং সহজ হয়
- ব্রাউজার ডেভেলপার টুলসে আসল TypeScript কোড দেখা যায়

**ইন্ডাস্ট্রি প্র্যাকটিস:**
```json
{
  "compilerOptions": {
    "sourceMap": true,         // ডেভেলপমেন্টে সবসময় true
    "inlineSourceMap": false,  // প্রোডাকশনে সাধারণত false
    "inlineSources": false
  }
}
```

---

#### **খ) `declaration: true`**

```json
"declaration": true
```

**কী করে:** `.d.ts` টাইপ ডেফিনিশন ফাইল স্বয়ংক্রিয়ভাবে তৈরি করে।

**কেন গুরুত্বপূর্ণ:**
- লাইব্রেরি তৈরি করলে এটি অপরিহার্য
- অন্যরা তোমার কোড ব্যবহার করার সময় টাইপ সাপোর্ট পাবে

**উদাহরণ:**
```typescript
// src/utils.ts
export function greet(name: string): string {
  return `Hello, ${name}`;
}
```

```typescript
// dist/utils.d.ts (স্বয়ংক্রিয়ভাবে তৈরি হয়)
export declare function greet(name: string): string;
```

---

#### **গ) `declarationMap: true`**

```json
"declarationMap": true
```

**কী করে:** `.d.ts.map` ফাইল তৈরি করে অর্থাৎ ডিক্লারেশনের জন্য সোর্স ম্যাপ।

**মনে রাখো:** লাইব্রেরি ডেভেলপমেন্টের জন্য দরকারি, সাধারণ অ্যাপের জন্য নয়।

---

### **২.৪ কঠোর টাইপ চেকিং সেটিংস**

#### **ক) `strict: true` — সবচেয়ে গুরুত্বপূর্ণ!**

```json
"strict": true
```

**কী করে:** সব কঠোর টাইপ চেকিং অপশন একসাথে চালু করে। এটি আসলে নিচের সবগুলো অপশন একযোগে সক্রিয় করার সমান:

```json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "strictBindCallApply": true,
    "strictFunctionTypes": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true
  }
}
```

**সুবিধা:**
- বাগ আগেভাগে ধরা পড়ে
- কোড আরও নিরাপদ হয়
- রক্ষণাবেক্ষণ সহজ হয়

**ইন্ডাস্ট্রি স্ট্যান্ডার্ড:** **সবসময় `true` রাখো!**

---

#### **খ) `noUncheckedIndexedAccess: true`**

```json
"noUncheckedIndexedAccess": true
```

**কী করে:** অ্যারেতে ইনডেক্স দিয়ে অ্যাক্সেস করার সময় `undefined` হওয়ার সম্ভাবনা ধরিয়ে দেয়।

**উদাহরণ:**
```typescript
const arr = [1, 2, 3];

// এই কোড বিপজ্জনক:
const num = arr[5];  // undefined হতে পারে!
// কঠোর মোডে TypeScript এটি ধরবে:
// টাইপ: number | undefined
```

**সঠিক কোড:**
```typescript
const arr = [1, 2, 3];
const num = arr[5];

if (num !== undefined) {
  console.log(num);  // এখন নিরাপদ
}
```

---

#### **গ) `exactOptionalPropertyTypes: true`**

```json
"exactOptionalPropertyTypes": true
```

**কী করে:** অপশনাল প্রপার্টিতে `undefined` মান সরাসরি সেট করা যাবে না।

**ভুল ব্যবহার:**
```typescript
interface User {
  name: string;
  middleName?: string;  // অপশনাল
}

const user: User = { name: "John", middleName: undefined };
// ❌ এরর: middleName হয় একটি string হবে, নয়তো একদম থাকবে না
```

**সঠিক ব্যবহার:**
```typescript
const user: User = { name: "John" };                          // ✓ সঠিক
const user2: User = { name: "John", middleName: "Doe" };     // ✓ সঠিক
```

---

### **২.৫ অন্যান্য গুরুত্বপূর্ণ সেটিংস**

#### **ক) `jsx: "react-jsx"`**

```json
"jsx": "react-jsx"
```

**কী করে:** React JSX সিনট্যাক্স সাপোর্ট করে।

**সম্ভাব্য মান:**

| মান | ব্যবহার |
|-----|---------|
| `"react"` | পুরনো React (React.createElement) |
| `"react-jsx"` | আধুনিক React 17+ |
| `"react-jsxdev"` | ডেভেলপমেন্ট মোড সহ |
| `"preserve"` | Babel ব্যবহার করলে |

**আধুনিক প্রজেক্টে:** `"react-jsx"` ব্যবহার করো।

---

#### **খ) `verbatimModuleSyntax: true`**

```json
"verbatimModuleSyntax": true
```

**কী করে:** অপ্রয়োজনীয় ইম্পোর্ট স্বয়ংক্রিয়ভাবে মুছে ফেলতে দেয় না, মডিউল সিনট্যাক্স স্পষ্ট রাখে।

**সঠিক প্র্যাকটিস:**
```typescript
// ✓ শুধু টাইপ ইম্পোর্ট করতে হলে
import type { User } from './types';

// ✓ আসল কোড ইম্পোর্ট করতে হলে
import { getUserName } from './utils';

// ❌ টাইপ আর মান একসাথে মিশিয়ে ইম্পোর্ট করো না
import { User, getUserName } from './types';
```

---

#### **গ) `isolatedModules: true`**

```json
"isolatedModules": true
```

**কী করে:** প্রতিটি ফাইল আলাদাভাবে কম্পাইলযোগ্য কিনা তা যাচাই করে।

**কেন গুরুত্বপূর্ণ:** Babel, esbuild, swc-এর মতো আধুনিক বিল্ড টুলের সাথে সামঞ্জস্যপূর্ণ থাকে।

---

#### **ঘ) `noUncheckedSideEffectImports: true`**

```json
"noUncheckedSideEffectImports": true
```

**কী করে:** শুধু সাইড ইফেক্টের জন্য করা ইম্পোর্ট স্পষ্টভাবে চিহ্নিত করতে বাধ্য করে।

**উদাহরণ:**
```typescript
// ❌ এভাবে করলে সতর্কতা দেবে
import './styles.css';

// ✓ টাইপ ইম্পোর্ট — ঠিক আছে
import type { User } from './types';

// ✓ মান ইম্পোর্ট — ঠিক আছে
import { getName } from './utils';
```

---

#### **ঙ) `moduleDetection: "force"`**

```json
"moduleDetection": "force"
```

**কী করে:** প্রতিটি ফাইলকে একটি মডিউল হিসেবে বিবেচনা করে।

**সুবিধা:** টপ-লেভেলে `await` ব্যবহার করা যায়:

```typescript
// এটি কাজ করবে:
const data = await fetch('/api/data');
```

---

#### **চ) `skipLibCheck: true`**

```json
"skipLibCheck": true
```

**কী করে:** `node_modules` এর `.d.ts` ফাইল টাইপ চেক করে না।

**সুবিধা:**
- কম্পাইল দ্রুত হয়
- থার্ড-পার্টি লাইব্রেরির সমস্যায় বিরক্ত হতে হয় না

**ইন্ডাস্ট্রি প্র্যাকটিস:** **সবসময় `true` রাখো।**

---

## ৩. সম্পূর্ণ ইন্ডাস্ট্রি-স্ট্যান্ডার্ড `tsconfig.json`

### **৩.১ React ওয়েব অ্যাপ্লিকেশন**

```json
{
  "compilerOptions": {
    "module": "esnext",
    "target": "es2020",
    "lib": ["es2020", "dom", "dom.iterable"],
    "rootDir": "./src",
    "outDir": "./dist",
    "baseUrl": "./src",
    "jsx": "react-jsx",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "sourceMap": true,
    "declaration": false,
    "skipLibCheck": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "build"]
}
```

---

### **৩.২ Node.js ব্যাকএন্ড অ্যাপ্লিকেশন**

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "target": "esnext",
    "lib": ["esnext"],
    "rootDir": "./src",
    "outDir": "./dist",
    "baseUrl": "./src",
    "types": ["node"],
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "skipLibCheck": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

### **৩.৩ TypeScript লাইব্রেরি**

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "target": "es2020",
    "lib": ["es2020"],
    "rootDir": "./src",
    "outDir": "./dist",
    "baseUrl": "./src",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "stripInternal": true,
    "skipLibCheck": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

---

## ৪. ইন্ডাস্ট্রি-স্ট্যান্ডার্ড TypeScript কোডিং প্র্যাকটিস

### **৪.১ সঠিকভাবে টাইপ দেওয়া**

#### ❌ ভুল:
```typescript
function getUserData(id) {  // কোনো টাইপ নেই!
  return { name: "John", age: 30 };
}

const user = getUserData(1);
console.log(user.email);  // রানটাইমে এরর ধরা পড়বে না!
```

#### ✓ সঠিক:
```typescript
interface User {
  name: string;
  age: number;
}

function getUserData(id: number): User {
  return { name: "John", age: 30 };
}

const user = getUserData(1);
console.log(user.email);  // ❌ কম্পাইল টাইমে ধরা পড়বে — TypeScript-এর কল্যাণে!
```

---

### **৪.২ `any` কখনো ব্যবহার করো না**

#### ❌ ভুল:
```typescript
function processData(data: any) {
  return data.toUpperCase();  // data যদি string না হয়?
}
```

#### ✓ সঠিক:
```typescript
function processData(data: string) {
  return data.toUpperCase();  // নিরাপদ এবং স্পষ্ট
}

// একাধিক টাইপ লাগলে:
function processData(data: string | number) {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
  return data.toString();
}
```

---

### **৪.৩ Null ও Undefined হ্যান্ডলিং**

#### ❌ বিপজ্জনক:
```typescript
function getUserEmail(user: User) {
  return user.email.toLowerCase();  // user null হলে ক্র্যাশ করবে!
}
```

#### ✓ সঠিক:
```typescript
function getUserEmail(user: User | null): string | null {
  return user?.email?.toLowerCase() ?? null;
}

// অথবা আরও স্পষ্টভাবে:
function getUserEmail(user: User | null): string | null {
  if (!user) return null;
  return user.email.toLowerCase();
}
```

---

### **৪.৪ Union ও Intersection টাইপ**

#### **Union — এটি অথবা ওটি:**
```typescript
type Status = 'pending' | 'completed' | 'failed';

function handleStatus(status: Status) {
  switch (status) {
    case 'pending':
      return 'অপেক্ষা করছি...';
    case 'completed':
      return 'সম্পন্ন!';
    case 'failed':
      return 'ব্যর্থ!';
  }
}
```

#### **Intersection — দুটো টাইপ একসাথে:**
```typescript
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

type Person = HasName & HasAge;

const person: Person = { name: "John", age: 30 };  // দুটো প্রপার্টিই লাগবে
```

---

### **৪.৫ Generics — পুনর্ব্যবহারযোগ্য কোড**

#### ❌ ভুল (পুনরাবৃত্তি):
```typescript
function wrapInArray(value: string): string[] {
  return [value];
}

function wrapInArrayNumber(value: number): number[] {
  return [value];
}
// প্রতিটি টাইপের জন্য আলাদা ফাংশন!
```

#### ✓ সঠিক (Generics):
```typescript
function wrapInArray<T>(value: T): T[] {
  return [value];
}

// যেকোনো টাইপের সাথে কাজ করে:
const stringArray = wrapInArray("hello");       // string[]
const numberArray = wrapInArray(42);            // number[]
const userArray = wrapInArray({ name: "John" }); // { name: string }[]
```

---

### **৪.৬ Const Assertions — নির্দিষ্ট মান**

#### **সমস্যা:**
```typescript
const colors = ['red', 'green', 'blue'];
// টাইপ: string[]
// কিন্তু আমরা জানি এই তিনটি মান ছাড়া আর কিছু হবে না
```

#### **সমাধান:**
```typescript
const colors = ['red', 'green', 'blue'] as const;
// টাইপ: readonly ['red', 'green', 'blue']

type Color = typeof colors[number];  // 'red' | 'green' | 'blue'
```

---

### **৪.৭ প্রজেক্টের ফাইল কাঠামো**

**ইন্ডাস্ট্রি স্ট্যান্ডার্ড অনুযায়ী:**

```
src/
├── types/              # শুধু টাইপ ডেফিনিশন
│   ├── index.ts
│   ├── user.ts
│   └── api.ts
├── utils/              # সাধারণ হেল্পার ফাংশন
│   ├── formatters.ts
│   ├── validators.ts
│   └── helpers.ts
├── services/           # বিজনেস লজিক
│   ├── userService.ts
│   ├── apiService.ts
│   └── authService.ts
├── components/         # React কম্পোনেন্ট
│   ├── Header.tsx
│   └── Footer.tsx
├── constants/          # ধ্রুবক মান
│   └── config.ts
└── index.ts            # মূল এক্সপোর্ট
```

---

### **৪.৮ Export ও Import প্র্যাকটিস**

#### **Named Exports — সুপারিশকৃত:**
```typescript
// userService.ts
export function getUserById(id: number): Promise<User> {
  // ...
}

export function updateUser(id: number, data: Partial<User>): Promise<User> {
  // ...
}

// অন্য ফাইলে:
import { getUserById, updateUser } from './userService';
```

#### **Default Exports — বিশেষ ক্ষেত্রে:**
```typescript
// config.ts
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
};

export default config;

// অন্য ফাইলে:
import config from './config';
```

---

### **৪.৯ Strict মোডে সঠিকভাবে কোড লেখা**

```typescript
interface ApiResponse {
  success: boolean;
  data?: User;
  error?: string;
}

async function fetchUser(id: number): Promise<ApiResponse> {
  try {
    return {
      success: true,
      data: { id, name: "John" }
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// ব্যবহার:
const response = await fetchUser(1);
if (response.success && response.data) {
  console.log(response.data.name);  // নিরাপদ এবং স্পষ্ট
}
```

---

## ৫. সেটিংস সংক্ষেপ

### **অবশ্যই সেট করতে হবে:**

| অপশন | মান | কারণ |
|------|-----|-------|
| `strict` | `true` | সর্বোচ্চ টাইপ নিরাপত্তা |
| `noUncheckedIndexedAccess` | `true` | অ্যারে বাউন্ডস যাচাই |
| `exactOptionalPropertyTypes` | `true` | অপশনাল প্রপার্টি স্পষ্ট রাখে |
| `skipLibCheck` | `true` | দ্রুত কম্পাইলেশন |
| `isolatedModules` | `true` | আধুনিক বিল্ড টুলের সাথে সামঞ্জস্য |
| `verbatimModuleSyntax` | `true` | মডিউল সিনট্যাক্স স্পষ্ট রাখে |
| `moduleDetection` | `"force"` | সব ফাইল মডিউল হিসেবে গণ্য হয় |

---

### **প্রজেক্টের ধরন অনুযায়ী:**

| সেটিং | React ওয়েব | Node.js | লাইব্রেরি |
|--------|-----------|---------|-----------|
| `module` | `esnext` | `nodenext` | `nodenext` |
| `target` | `es2020` | `esnext` | `es2020` |
| `declaration` | `false` | `true` | `true` |
| `jsx` | `react-jsx` | ❌ | ❌ |

---

## ৬. নতুন প্রজেক্ট শুরুর চেকলিস্ট

- [ ] `strict: true` সেট করো
- [ ] `noImplicitReturns`, `noUnusedLocals`, `noUnusedParameters` চালু করো
- [ ] `rootDir` ও `outDir` নির্ধারণ করো
- [ ] সঠিক `target` ও `module` বেছে নাও
- [ ] `.gitignore` তে `dist` ও `*.map` যোগ করো
- [ ] `skipLibCheck: true` সেট করো
- [ ] শুধু প্রয়োজনীয় `@types/*` প্যাকেজ ইনস্টল করো
- [ ] টাইপ-নিরাপদ কোড লেখার অভ্যাস করো

---

## উপসংহার

একটি ভালো TypeScript কনফিগ ও সঠিক কোডিং প্র্যাকটিস তোমাকে যা দেবে:

✓ **রানটাইম বাগ আগেভাগে ধরা পড়বে**
✓ **কোড রক্ষণাবেক্ষণ সহজ হবে**
✓ **দলগত কাজ আরও সুশৃঙ্খল হবে**
✓ **ডেভেলপমেন্ট দ্রুততর হবে** — ডিবাগিংয়ে কম সময় যাবে

**সবসময় মনে রেখো:** `strict: true` তোমার বন্ধু!
