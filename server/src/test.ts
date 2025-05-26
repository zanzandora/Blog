// import-tester.ts
const tests = [
  { name: 'commentRouter', path: './routers/comment.router' },
  { name: 'postRouter', path: './routers/post.router' },
  { name: 'userRouter', path: './routers/user.router' },
  { name: 'contactRouter', path: './routers/contact.router' },
  { name: 'webhookRouter', path: './routers/webhook.router' },
];

(async () => {
  for (const test of tests) {
    try {
      console.log(`\n🔍 Testing import: ${test.name}`);
      await import(test.path);
      console.log(`✅ ${test.name} imported successfully`);
    } catch (err) {
      console.error(`❌ ${test.name} failed to import:`);
      console.error(err);
      break;
    }
  }
})();
