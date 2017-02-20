import tap from 'tap';
import * as ltree from '../src/index';

function unityTest(name, original) {
  tap.test(name, (t) => {
    const escaped = ltree.escapeName(original);
    if (typeof original === 'string') {
      t.strictEquals(original, ltree.unescapeName(escaped), 'Should return the original string');
    } else {
      t.deepEqual(original, ltree.unescapeName(escaped), 'Should return the original array');
    }
    t.end();
  });
}

unityTest('Round trip a string', 'Th.is is a te_.st ()!*@&$#^&*!');
unityTest('Round trip a unicode string', 'Γαζέες καὶ μυρτιὲς δὲν θὰ βρῶ πιὰ στὸ χρυσαφὶ ξέφωτο');
unityTest('Round trip another unicode string', 'イロハニホヘト チリヌルヲ ワカヨタレソ ツネナラム');

unityTest('Round trip an array', ['Thi.s', 'is', 'a', 'te_st']);
unityTest('Round trip a unicode array', ['Γαζέες κ', 'αὶ μυρτιὲς δ', 'ὲν θὰ βρ', 'ῶ πιὰ στὸ χρυσαφὶ ξέφωτο']);
unityTest('Round trip another unicode array', ['イロハニホ', 'ヘト チリヌルヲ ワカヨ', 'タレソ ツネナラム']);
