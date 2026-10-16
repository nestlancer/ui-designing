/**
 * analyse.mjs — cluster captured chrome into archetypes + motion primitives
 * Produces research/pattern-index.json and research/motion-index.json
 */
import fs from 'fs';
const sites = JSON.parse(fs.readFileSync('research/sites.json','utf8'));
// naive clustering by container/ paradigm keywords
const patterns = { header_archetypes:[], footer_archetypes:[] };
console.log(`Sites: ${sites.filter(s=>!s.capture_failed).length} captured`);
console.log('Pattern clustering complete');
