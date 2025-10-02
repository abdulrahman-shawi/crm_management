// ملف: lib/prisma.ts

import { PrismaClient } from '@prisma/client';

/**
 * تهيئة وتصدير عميل Prisma Client.
 *
 * الهدف: ضمان وجود نسخة واحدة (Singleton) من Prisma Client
 * لتجنب إنشاء اتصالات متعددة بالـ DB أثناء الـ Hot Reloading في بيئة التطوير.
 */

// 1. تعريف المتغير العام (Global Variable)
// نستخدم هذا المتغير لتخزين عميل Prisma في البيئة العامة (globalThis)
// ليتم مشاركته عبر عمليات الهوت ريلود في بيئة التطوير (development).
declare global {
  // يضيف خاصية 'prisma' إلى الكائن 'globalThis'
  var prisma: PrismaClient | undefined;
}

// 2. إنشاء عميل Prisma
// إذا كان Prisma موجودًا بالفعل في البيئة العامة، نستخدمه.
// وإلا، نقوم بإنشاء مثيل جديد.
const prisma = globalThis.prisma || new PrismaClient({
  // يمكن إضافة خيارات تسجيل هنا للمساعدة في التصحيح
  // log: ['query', 'info', 'warn', 'error'],
});

// 3. تخزين عميل Prisma في البيئة العامة (في وضع التطوير فقط)
// هذا يمنع تكرار إنشاء مثيلات جديدة لـ Prisma Client مع كل تحديث.
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// 4. تصدير عميل Prisma
export default prisma;