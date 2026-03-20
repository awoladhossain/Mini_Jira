# TypeScript Configuration এবং Best Practices গাইড

## ত্বরিত সংক্ষিপ্তসার

এই ডকুমেন্টটি TypeScript প্রজেক্টে `tsconfig.json` এর প্রতিটি সেটিং এবং ইন্ডাস্ট্রি-স্ট্যান্ডার্ড কোডিং প্র্যাকটিস ব্যাখ্যা করে।

---

## 1. `tsconfig.json` কী এবং কেন প্রয়োজন?

`tsconfig.json` হল **TypeScript কম্পাইলার কনফিগারেশন ফাইল**। এটি TypeScript কে বলে দেয়:
- কোন ফাইলগুলি কম্পাইল করতে হবে
- কীভাবে কম্পাইল করতে হবে
- কোথায় আউটপুট রাখতে হবে
- কতটা কঠোর টাইপ চেকিং করতে হবে

---

## 2. `compilerOptions` - প্রধান অংশ বিস্তারিত ব্যাখ্যা

### **2.1 ফাইল লোকেশন সেটিংস**

```json
"rootDir": "./src",
"outDir": "./dist"
```

**কী করে:**
- `rootDir`: আপনার সব `.ts` ফাইল কোথায় আছে তা বলে (চালু করা হয়নি এখানে)
- `outDir`: কম্পাইল করা `.js` ফাইল কোথায় রাখতে হবে (চালু করা হয়নি এখানে)

**ইন্ডাস্ট্রি স্ট্যান্ডার্ড প্র্যাকটিস:**
```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "baseUrl": "./src",
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
  }
}
```

**কেন গুরুত্বপূর্ণ:** প্রজেক্টকে সংগঠিত রাখে এবং বিল্ড প্রসেস স্পষ্ট করে।

---

### **2.2 এনভায়রনমেন্ট সেটিংস**

#### **a) `module: "nodenext"`**

```json
"module": "nodenext"
```

**কী করে:** কম্পাইল করা কোড কোন মডিউল সিস্টেম ব্যবহার করবে তা নির্ধারণ করে।

**সম্ভাব্য মান এবং ব্যবহার:**

| মান | ব্যবহার | আউটপুট উদাহরণ |
|-----|--------|----------------|
| `commonjs` | Node.js (পুরাতন) | `const x = require('./file')` |
| `nodenext` | Node.js 16+ (আধুনিক) | `import x from './file.js'` |
| `esnext` | ব্রাউজার + আধুনিক bundlers | ES6 modules |
| `amd` | ব্রাউজার (পুরাতন) | `define(['file'], ...)` |

**ইন্ডাস্ট্রি স্ট্যান্ডার্ড:**
- আধুনিক Node.js প্রজেক্টের জন্য: `"nodenext"`
- ব্রাউজার প্রজেক্টের জন্য: `"esnext"` (bundler ব্যবহার করলে)
- রিঅ্যাক্ট প্রজেক্টে: `"esnext"`

---

#### **b) `target: "esnext"`**

```json
"target": "esnext"
```

**কী করে:** টার্গেট JavaScript সংস্করণ নির্ধারণ করে।

**সম্ভাব্য মান:**

| মান | JavaScript সংস্করণ | ব্রাউজার সাপোর্ট |
|-----|------------------|-----------------|
| `es5` | পুরাতন | IE 9+ |
| `es2015` | ES6 | আধুনিক ব্রাউজার |
| `es2020` | আরও নতুন | খুব আধুনিক |
| `esnext` | সর্বশেষ | Node.js 16+ |

**সঠিক পছন্দ:**
```json
// প্রোডাকশন ওয়েব অ্যাপের জন্য
"target": "es2020",

// Node.js সার্ভার প্রজেক্টের জন্য
"target": "esnext",

// পুরাতন ব্রাউজার সাপোর্ট করতে হলে
"target": "es2015"
```

---

#### **c) `types: []`**

```json
"types": []
```

**কী করে:** `@types/*` প্যাকেজ থেকে কোন টাইপ ডেফিনিশন লোড করতে হবে তা নির্ধারণ করে।

**খালি মানে:** কোন ডিফল্ট টাইপ লোড নেই। এটি কাস্টম টাইপ নিয়ন্ত্রণের জন্য ভালো।

**Node.js প্রজেক্টে সঠিক সেটিংস:**
```json
{
  "compilerOptions": {
    "types": ["node"],
    "lib": ["esnext"]
  }
}
// এবং টার্মিনালে: npm install -D @types/node
```

---

### **2.3 আউটপুট সেটিংস**

#### **a) `sourceMap: true`**

```json
"sourceMap": true
```

**কী করে:** `.map` ফাইল তৈরি করে যা কম্পাইল করা কোড আসল `.ts` কোডের সাথে ম্যাপ করে।

**সুবিধা:**
- ডিবাগিং সহজ হয় (ব্রাউজার ডেভেলপার টুলস)
- ব্রাউজারে আসল TypeScript দেখা যায়

**ইন্ডাস্ট্রি প্র্যাকটিস:**
```json
{
  "compilerOptions": {
    "sourceMap": true,  // ডেভেলপমেন্টে সবসময় true
    "inlineSourceMap": false,  // প্রোডাকশনে সাধারণত false
    "inlineSources": false
  }
}
```

---

#### **b) `declaration: true`**

```json
"declaration": true
```

**কী করে:** `.d.ts` টাইপ ডেফিনিশন ফাইল তৈরি করে।

**কেন গুরুত্বপূর্ণ:**
- লাইব্রেরি তৈরি করলে অপরিহার্য
- অন্যরা আপনার কোড ব্যবহার করার সময় টাইপ সাপোর্ট পায়

**উদাহরণ:**
```typescript
// src/utils.ts
export function greet(name: string): string {
  return `Hello, ${name}`;
}
```

```typescript
// dist/utils.d.ts (স্বয়ংক্রিয়ভাবে তৈরি)
export declare function greet(name: string): string;
```

---

#### **c) `declarationMap: true`**

```json
"declarationMap": true
```

**কী করে:** `.d.ts.map` ফাইল তৈরি করে (ডেক্লারেশনের জন্য সোর্স ম্যাপ)।

**কেয়ার:** লাইব্রেরি ডেভেলপমেন্টের জন্য দরকারি, সাধারণ অ্যাপের জন্য নয়।

---

### **2.4 কঠোর টাইপ চেকিং সেটিংস**

#### **a) `strict: true` (সবচেয়ে গুরুত্বপূর্ণ!)**

```json
"strict": true
```

**কী করে:** সব কঠোর টাইপ চেকিং অপশন চালু করে। এটি সমান:

```json
{
  "compilerOptions": {
    "strict": true,
    // যা আসলে নিম্নলিখিত সবকিছু চালু করে:
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
- কোড আরও সুরক্ষিত
- রক্ষণাবেক্ষণ সহজ

**ইন্ডাস্ট্রি স্ট্যান্ডার্ড:** **সবসময় `true` রাখুন!**

---

#### **b) `noUncheckedIndexedAccess: true`**

```json
"noUncheckedIndexedAccess": true
```

**কী করে:** ইনডেক্স অ্যাক্সেসের সময় অ্যারে বাউন্ডস চেক করে।

**উদাহরণ:**
```typescript
const arr = [1, 2, 3];

// এই কোড বিপদজনক:
const num = arr[5];  // undefined হতে পারে!

// কঠোর মোডে TypeScript এটি ধরে:
// Type: number | undefined
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

#### **c) `exactOptionalPropertyTypes: true`**

```json
"exactOptionalPropertyTypes": true
```

**কী করে:** অপশনাল প্রপার্টি কখনও `undefined` মূল্য নিতে পারে না।

**কার্যকরী:**
```typescript
interface User {
  name: string;
  middleName?: string;  // অপশনাল
}

const user: User = { name: "John", middleName: undefined };
// ❌ এরর: middleName কখনও undefined হতে পারে না, হয় স্ট্রিং, নতুবা উপস্থিত নেই
```

**সঠিক:**
```typescript
const user: User = { name: "John" };  // ✓ সঠিক
const user2: User = { name: "John", middleName: "Doe" };  // ✓ সঠিক
```

---

### **2.5 স্টাইল এবং রিকমেন্ডেড অপশন**

#### **a) `jsx: "react-jsx"`**

```json
"jsx": "react-jsx"
```

**কী করে:** React JSX সিন্ট্যাক্স সাপোর্ট করে।

**সম্ভাব্য মান:**

| মান | ব্যবহার |
|-----|--------|
| `"react"` | বিবর্তনীয় React (React.createElement) |
| `"react-jsx"` | আধুনিক React 17+ (সরাসরি JSX) |
| `"react-jsxdev"` | ডেভেলপমেন্ট মোড সহ |
| `"preserve"` | JSX হিসেবে রাখুন (Babel ব্যবহার করলে) |

**আধুনিক প্রজেক্টে:** `"react-jsx"` ব্যবহার করুন।

---

#### **b) `verbatimModuleSyntax: true`**

```json
"verbatimModuleSyntax": true
```

**কী করে:** অপ্রয়োজনীয় ইম্পোর্ট অটোম্যাটিক রিমুভ করতে দেয় না।

**সুবিধা:**
- মডিউল সিন্ট্যাক্স স্পষ্ট থাকে
- বান্ডলার কম্প্যাটিবিলিটি ভালো

**সঠিক প্র্যাকটিস:**
```typescript
// ✓ সঠিক - শুধু টাইপ ইম্পোর্ট করুন যখন শুধু টাইপ দরকার
import type { User } from './types';

// ✓ সঠিক - মূল্য ইম্পোর্ট করুন যখন আসল কোড দরকার
import { getUserName } from './utils';

// ❌ ভুল - টাইপ এবং মূল্য মিক্স করবেন না
import { User, getUserName } from './types';
```

---

#### **c) `isolatedModules: true`**

```json
"isolatedModules": true
```

**কী করে:** প্রতিটি ফাইল স্বাধীনভাবে কম্পাইল করা যায় এমনভাবে চেক করে।

**কেন গুরুত্বপূর্ণ:**
- Babel, esbuild, swc ইত্যাদি সঠিকভাবে কাজ করে
- মডার্ন বিল্ড সিস্টেম কম্প্যাটিবল

---

#### **d) `noUncheckedSideEffectImports: true`**

```json
"noUncheckedSideEffectImports": true
```

**কী করে:** সাইড এফেক্ট ছাড়া ইম্পোর্ট স্পষ্টভাবে চিহ্নিত করতে বাধ্য করে।

**উদাহরণ:**
```typescript
// ❌ সাইড এফেক্ট ইম্পোর্ট - স্পষ্টভাবে চিহ্নিত করুন
import './styles.css';

// ✓ সঠিক - স্পষ্টভাবে আছে
import type { User } from './types';

import { getName } from './utils';  // এটি OK - মূল্য ইম্পোর্ট
```

---

#### **e) `moduleDetection: "force"`**

```json
"moduleDetection": "force"
```

**কী করে:** প্রতিটি ফাইল একটি মডিউল হিসেবে বিবেচনা করে।

**সুবিধা:** টপ-লেভেল `await` ব্যবহার করতে পারবেন।

```typescript
// এটি কাজ করে:
const data = await fetch('/api/data');
```

---

### **2.6 অন্যান্য গুরুত্বপূর্ণ সেটিংস**

#### **a) `skipLibCheck: true`**

```json
"skipLibCheck": true
```

**কী করে:** `node_modules` এর `.d.ts` ফাইল টাইপ চেক করে না।

**সুবিধা:**
- কম্পাইল দ্রুততর হয়
- থার্ড-পার্টি লাইব্রেরির সমস্যায় বিরক্ত হতে হয় না

**ইন্ডাস্ট্রি প্র্যাকটিস:** **সবসময় `true` রাখুন।**

---

## 3. একটি সম্পূর্ণ ইন্ডাস্ট্রি-স্ট্যান্ডার্ড `tsconfig.json`

### **বিভিন্ন প্রজেক্ট টাইপের জন্য সুপারিশ:**

#### **3.1 React ওয়েব অ্যাপ্লিকেশন**

```json
{
  "compilerOptions": {
    // মডিউল এবং টার্গেট
    "module": "esnext",
    "target": "es2020",
    "lib": ["es2020", "dom", "dom.iterable"],

    // ফাইল আউট্রি সেটিংস
    "rootDir": "./src",
    "outDir": "./dist",
    "baseUrl": "./src",

    // JSX সাপোর্ট
    "jsx": "react-jsx",

    // কঠোর টাইপ চেকিং
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // মডার্ন সেটিংস
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",

    // আউটপুট
    "sourceMap": true,
    "declaration": false,
    "skipLibCheck": true,

    // অতিরিক্ত কঠোরতা
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

#### **3.2 Node.js ব্যাকএন্ড অ্যাপ্লিকেশন**

```json
{
  "compilerOptions": {
    // মডিউল এবং টার্গেট
    "module": "nodenext",
    "target": "esnext",
    "lib": ["esnext"],

    // ফাইল আউট্রি
    "rootDir": "./src",
    "outDir": "./dist",
    "baseUrl": "./src",

    // টাইপ সাপোর্ট
    "types": ["node"],
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,

    // কঠোর চেকিং
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // মডার্ন সেটিংস
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "moduleDetection": "force",

    // আউটপুট
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "skipLibCheck": true,

    // অতিরিক্ত
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

#### **3.3 TypeScript লাইব্রেরি**

```json
{
  "compilerOptions": {
    // মডিউল এবং টার্গেট
    "module": "nodenext",
    "target": "es2020",
    "lib": ["es2020"],

    // ফাইল আউট্রি
    "rootDir": "./src",
    "outDir": "./dist",
    "baseUrl": "./src",

    // কঠোর চেকিং
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // মডার্ন সেটিংস
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "moduleDetection": "force",

    // আউটপুট (লাইব্রেরির জন্য গুরুত্বপূর্ণ)
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "stripInternal": true,  // ডকুমেন্টেশন থেকে @internal মুছুন
    "skipLibCheck": true,

    // অতিরিক্ত
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

---

## 4. ইন্ডাস্ট্রি-স্ট্যান্ডার্ড TypeScript কোডিং প্র্যাকটিস

### **4.1 শক্তিশালী টাইপিং**

#### ❌ **খারাপ:**
```typescript
function getUserData(id) {  // কোন টাইপ নেই!
  return { name: "John", age: 30 };
}

const user = getUserData(1);
console.log(user.email);  // এরর সময়ে ধরা পড়ে না!
```

#### ✓ **সঠিক:**
```typescript
interface User {
  name: string;
  age: number;
}

function getUserData(id: number): User {
  return { name: "John", age: 30 };
}

const user = getUserData(1);
console.log(user.email);  // ❌ কম্পাইল টাইম এরর - ধন্যবাদ TypeScript!
```

---

### **4.2 কখনও `any` ব্যবহার করবেন না**

#### ❌ **খারাপ:**
```typescript
function processData(data: any) {
  return data.toUpperCase();  // যদি data না থাকে?
}
```

#### ✓ **সঠিক:**
```typescript
function processData(data: string) {
  return data.toUpperCase();  // নিরাপদ এবং স্পষ্ট
}

// যদি বিভিন্ন টাইপ প্রয়োজন হয়:
function processData(data: string | number) {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
  return data.toString();
}
```

---

### **4.3 Null এবং Undefined হ্যান্ডলিং**

#### ❌ **বিপদজনক:**
```typescript
interface User {
  name: string;
  email: string;
}

function getUserEmail(user: User) {
  return user.email.toLowerCase();  // null হতে পারে?
}
```

#### ✓ **সঠিক:**
```typescript
interface User {
  name: string;
  email: string;
}

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

### **4.4 Union এবং Intersection টাইপ**

#### **Union (এটি অথবা সেটি):**
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
    // ❌ এখানে ফোরগেট করলে এরর!
  }
}
```

#### **Intersection (এখানে একসাথে):**
```typescript
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

type Person = HasName & HasAge;

const person: Person = { name: "John", age: 30 };  // উভয় প্রপার্টি লাগবে
```

---

### **4.5 Generics - পুনর্ব্যবহারযোগ্য কোড**

#### ❌ **খারাপ (পুনরাবৃত্তি):**
```typescript
function wrapInArray(value: string): string[] {
  return [value];
}

function wrapInArrayNumber(value: number): number[] {
  return [value];
}

// প্রতি টাইপের জন্য নতুন ফাংশন!
```

#### ✓ **সঠিক (Generics):**
```typescript
function wrapInArray<T>(value: T): T[] {
  return [value];
}

// যেকোনো টাইপের সাথে কাজ করে:
const stringArray = wrapInArray("hello");  // string[]
const numberArray = wrapInArray(42);  // number[]
const userArray = wrapInArray({ name: "John" });  // { name: string }[]
```

---

### **4.6 Const Assertions - স্থির মান**

#### **সমস্যা:**
```typescript
const colors = ['red', 'green', 'blue'];
// colors এর টাইপ: string[]
// কিন্তু আমরা জানি এটি এই তিনটি মান ছাড়া আর কিছু হবে না
```

#### **সমাধান:**
```typescript
const colors = ['red', 'green', 'blue'] as const;
// colors এর টাইপ: readonly ['red', 'green', 'blue']
// এখন নিখুঁত!

type Color = typeof colors[number];  // 'red' | 'green' | 'blue'
```

---

### **4.7 Module Organization (ফাইল সংগঠন)**

**ইন্ডাস্ট্রি স্ট্যান্ডার্ড প্রজেক্ট কাঠামো:**

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
├── components/         # React কম্পোনেন্ট (যদি এক্সপ্লিকিট)
│   ├── Header.tsx
│   └── Footer.tsx
├── constants/          # ধ্রুবক
│   └── config.ts
└── index.ts           # মেইন এক্সপোর্ট
```

---

### **4.8 এক্সপোর্ট এবং ইম্পোর্ট সেরা প্র্যাকটিস**

#### **Named Exports (সুপারিশকৃত):**
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

#### **Default Exports (শুধু বিশেষ ক্ষেত্রে):**
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

### **4.9 কীভাবে `strict` কনফিগ ব্যবহার করবেন:**

```typescript
// ✓ স্ট্রিক্ট মোডে সবকিছু এক্সপ্লিসিট:

interface ApiResponse {
  success: boolean;
  data?: User;  // অপশনাল
  error?: string;
}

async function fetchUser(id: number): Promise<ApiResponse> {
  try {
    // ...টাইপ সাথে সবকিছু
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

## 5. গুরুত্বপূর্ণ `tsconfig.json` এর অংশ সংক্ষেপণ

### **অবশ্যই সেট করতে হবে:**

| অপশন | মান | কারণ |
|------|-----|-------|
| `strict` | `true` | সর্বোচ্চ টাইপ নিরাপত্তা |
| `noUncheckedIndexedAccess` | `true` | অ্যারে বাউন্ডস চেক |
| `exactOptionalPropertyTypes` | `true` | স্পষ্ট প্রপার্টি হ্যান্ডলিং |
| `skipLibCheck` | `true` | দ্রুত কম্পাইলেশন |
| `isolatedModules` | `true` | আধুনিক বিল্ড টুলস কম্প্যাটিবল |
| `verbatimModuleSyntax` | `true` | স্পষ্ট মডিউল সিন্ট্যাক্স |
| `moduleDetection` | `"force"` | সব ফাইল মডিউল হিসেবে |

---

### **প্রজেক্ট টাইপ অনুযায়ী:**

| সেটিংস | React ওয়েব | Node.js | লাইব্রেরি |
|--------|---------|---------|-----------|
| `module` | `esnext` | `nodenext` | `nodenext` |
| `target` | `es2020` | `esnext` | `es2020` |
| `declaration` | `false` | `true` | `true` |
| `jsx` | `react-jsx` | ❌ | ❌ |

---

## 6. দ্রুত চেকলিস্ট

নতুন TypeScript প্রজেক্ট শুরু করার সময়:

- [ ] `strict: true` সেট করুন
- [ ] `noImplicitReturns`, `noUnusedLocals`, `noUnusedParameters` সক্রিয় করুন
- [ ] `rootDir` এবং `outDir` নির্ধারণ করুন
- [ ] সঠিক `target` এবং `module` নির্বাচন করুন
- [ ] `.gitignore` তে `dist` এবং `*.map` যোগ করুন
- [ ] `skipLibCheck: true` সেট করুন
- [ ] শুধু প্রয়োজনীয় `@types/*` প্যাকেজ ইনস্টল করুন
- [ ] টাইপ-সেফ কোড লেখার অভ্যাস করুন

---

## সংক্ষিপ্ত উপসংহার

একটি ভাল TypeScript কনফিগ এবং কোডিং প্র্যাকটিস আপনাকে:

✓ **রাচালিব বাগ প্রতিরোধ করে**
✓ **কোড রক্ষণাবেক্ষণ সহজ করে**
✓ **টিম কোলাবরেশন উন্নত করে**
✓ **ডেভেলপমেন্ট গতি বাড়ায়** (কম ডিবাগিং সময়)

**সবসময় মনে রাখুন:** `strict: true` আপনার বন্ধু!

---

*最后更新: 2026年3月19日*
