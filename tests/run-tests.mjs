/**
 * @ensinolibre/blocks — catalogue integrity tests.
 * Run: node tests/run-tests.mjs
 *
 * Verifies the block library is internally consistent: the validator,
 * renderer, analog emitter and prompt contracts all cover the same set of
 * block types, the JSON Schema enum agrees, and every active type has a
 * context specification file.
 */
import { readFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import Ajv from 'ajv/dist/2020.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const { KNOWN_TYPES, validateActivity } = await import(new URL('../src/validator.js', import.meta.url));
const { ANALOG_EMITTERS } = await import(new URL('../src/analog.js', import.meta.url));
const { ACTIVITY_TYPES, CONTRACTS } = await import(new URL('../src/prompt-builder.js', import.meta.url));

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed += 1; console.log(`  ok    ${name}`); }
  catch (e) { failed += 1; console.error(`  FAIL  ${name}\n        ${e.message}`); }
}

const schema = JSON.parse(await readFile(join(ROOT, 'schema', 'worksheet.schema.json'), 'utf8'));
const ajv = new Ajv({ allErrors: true });
const validateSchema = ajv.compile(schema);
const contextFiles = new Set((await readdir(join(ROOT, 'context'))).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')));

console.log('\n1) Registries cover the same block types');
const known = [...KNOWN_TYPES].sort();
test('analog emitter matches the validator', () => assert.deepEqual(Object.keys(ANALOG_EMITTERS).sort(), known));
test('prompt contracts match the validator', () => assert.deepEqual(Object.keys(CONTRACTS).sort(), known));
test('creator type list matches the validator', () => assert.deepEqual(ACTIVITY_TYPES.map((t) => t.id).sort(), known));
test('JSON Schema enum matches the validator', () => assert.deepEqual([...schema.$defs.activity.properties.type.enum].sort(), known));

console.log('\n2) Every active block type has a context specification');
test('a context/<type>.md exists for every renderable type', () => {
  for (const t of KNOWN_TYPES) assert.ok(contextFiles.has(t), `missing context/${t}.md`);
});

console.log('\n3) The schema compiles and validates a representative block');
test('schema accepts a valid worksheet', () => {
  const ws = { title: 't', subject: 's', audience: 'a', language: 'en-GB',
    sections: [{ title: 'x', activities: [{ type: 'mcq', question: 'q', options: ['a', 'b'], answer: 0 }] }] };
  assert.ok(validateSchema(ws), JSON.stringify(validateSchema.errors));
  assert.deepEqual(validateActivity(ws.sections[0].activities[0]), []);
});

console.log('\n4) The contracts file lists every type');
test('contracts/activity-types.ts declares each active type id', async () => {
  const ts = await readFile(join(ROOT, 'contracts', 'activity-types.ts'), 'utf8');
  // The PWA ActivityType union is a superset (it includes types not exposed
  // by the worksheet schema); every schema type must appear there.
  const missing = KNOWN_TYPES.filter((t) => !ts.includes(`'${t}'`));
  assert.deepEqual(missing, [], `types absent from contracts: ${missing.join(', ')}`);
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
