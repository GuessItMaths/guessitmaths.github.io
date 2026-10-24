/* =====================================================================
   Guess It Maths: card sets
   ---------------------------------------------------------------------
   Every topic lives in TOPICS below. Each card has:
     svg   - a drawing made in code (Polygons, Numbers, Fractions), or
     img   - a path to an image file (Graphs, Algebra, Sequences for now)
     name  - text shown when the Names / Hints / Decimals button is on
     title - what the card is called when the secret card is revealed
   To add a topic, add an entry to TOPICS and a link on index.html
   pointing to game.html?topic=yourkey
   ===================================================================== */
(function () {
  // ---------- Polygons (coordinates in grid squares, y downwards) ----------
  const reg = (n, r = 2.9) => Array.from({ length: n }, (_, i) => {
    const a = (-90 + 360 * i / n) * Math.PI / 180;
    return [3 + r * Math.cos(a), 3 + r * Math.sin(a)];
  });
  const SHAPES = [
    { name: 'Square', pts: [[0,0],[4,0],[4,4],[0,4]] },
    { name: 'Small square', pts: [[0,0],[2,0],[2,2],[0,2]] },
    { name: 'Tilted square', pts: [[0,1],[4,0],[5,4],[1,5]] },
    { name: 'Rectangle', pts: [[0,0],[5,0],[5,2],[0,2]] },
    { name: 'Parallelogram', pts: [[1,0],[5,0],[4,3],[0,3]] },
    { name: 'Rhombus', pts: [[2,0],[4,3],[2,6],[0,3]] },
    { name: 'Kite', pts: [[2,0],[4,2],[2,6],[0,2]] },
    { name: 'Arrowhead (dart)', pts: [[2,0],[4,5],[2,3],[0,5]] },
    { name: 'Trapezium', pts: [[1,0],[4,0],[6,3],[0,3]] },
    { name: 'Isosceles trapezium', pts: [[1,0],[4,0],[5,3],[0,3]] },
    { name: 'Right-angled trapezium', pts: [[0,0],[3,0],[5,3],[0,3]] },
    { name: 'Irregular quadrilateral', pts: [[0,0],[4,1],[5,5],[1,3]] },
    { name: 'Equilateral triangle', pts: [[0,4.33],[5,4.33],[2.5,0]], free: true },
    { name: 'Isosceles triangle', pts: [[2,0],[4,5],[0,5]] },
    { name: 'Right-angled isosceles triangle', pts: [[0,0],[0,4],[4,4]] },
    { name: 'Right-angled scalene triangle', pts: [[0,0],[0,3],[5,3]] },
    { name: 'Obtuse triangle', pts: [[0,3],[5,3],[6,0]] },
    { name: 'Regular pentagon', pts: reg(5), free: true },
    { name: 'Irregular pentagon', pts: [[2,0],[4,2],[4,5],[0,5],[0,2]] },
    { name: 'Regular hexagon', pts: reg(6), free: true },
    { name: 'L-shaped hexagon', pts: [[0,0],[2,0],[2,3],[5,3],[5,5],[0,5]] },
    { name: 'Irregular heptagon', pts: [[1,0],[4,0],[6,2],[5,5],[2,6],[0,4],[0,2]] },
    { name: 'Regular octagon', pts: reg(8), free: true },
    { name: 'Cross (dodecagon)', pts: [[2,0],[4,0],[4,2],[6,2],[6,4],[4,4],[4,6],[2,6],[2,4],[0,4],[0,2],[2,2]] },
  ];

  const DOTS = (() => {
    let s = '<g class="dots">';
    for (let y = 0; y <= 6; y++) for (let x = 0; x <= 6; x++) s += `<circle cx="${x}" cy="${y}" r="0.06"/>`;
    return s + '</g>';
  })();

  function shapeSVG(shape) {
    const xs = shape.pts.map(p => p[0]), ys = shape.pts.map(p => p[1]);
    const minx = Math.min(...xs), miny = Math.min(...ys);
    const w = Math.max(...xs) - minx, h = Math.max(...ys) - miny;
    // grid shapes snap to whole squares so area can be counted; regular shapes are centred
    const tx = shape.free ? (6 - w) / 2 - minx : Math.floor((6 - w) / 2) - minx;
    const ty = shape.free ? (6 - h) / 2 - miny : Math.floor((6 - h) / 2) - miny;
    const pts = shape.pts.map(([x, y]) => `${(x + tx).toFixed(3)},${(y + ty).toFixed(3)}`).join(' ');
    return `<svg viewBox="-0.6 -0.6 7.2 7.2" aria-hidden="true">${DOTS}<polygon points="${pts}"/></svg>`;
  }

  // ---------- Numbers ----------
  // Chosen so that most cards share several properties: primes, squares, cubes,
  // triangular and perfect numbers, plus negatives. Negative cubes exist but
  // negative squares don't, which makes for a good discussion.
  const NUMBERS = [-27, -12, -9, -8, -2, -1, 0, 1, 2, 3, 5, 6, 8, 9, 12, 16, 21, 24, 25, 27, 28, 36, 64, 100];

  const MINUS = '\u2212';
  const signed = n => (n < 0 ? MINUS + Math.abs(n) : String(n));
  const isPrime = n => { if (n < 2) return false; for (let k = 2; k * k <= n; k++) if (n % k === 0) return false; return true; };
  const isSquare = n => n >= 0 && Number.isInteger(Math.sqrt(n));
  const isCube = n => Math.round(Math.cbrt(n)) ** 3 === n;
  const isTriangular = n => n >= 0 && isSquare(8 * n + 1);
  function numberFacts(n) {
    if (n === 0) return 'Zero';
    const f = [];
    if (isPrime(n)) f.push('prime');
    if (isSquare(n)) f.push('square');
    if (isCube(n)) f.push('cube');
    if (isTriangular(n)) f.push('triangular');
    if (n === 6 || n === 28) f.push('perfect');
    if (!f.length) f.push(Math.abs(n) % 2 ? 'odd' : 'even');
    if (n < 0) f.unshift('negative');
    const s = f.join(', ');
    return s[0].toUpperCase() + s.slice(1);
  }
  function numberSVG(n) {
    const s = signed(n);
    return `<svg viewBox="0 0 100 100" aria-hidden="true"><text class="big" x="50" y="53" text-anchor="middle" dominant-baseline="middle" font-size="${s.length >= 3 ? 40 : 54}">${s}</text></svg>`;
  }

  // ---------- Fractions ----------
  // Each card: n/d with an optional whole part (mixed number) and an optional
  // minus sign written to the left ('left'), in the numerator ('num') or in the
  // denominator ('den'). Several cards are deliberately equal to each other.
  const FRACTIONS = [
    // proper
    { n: 1, d: 2 }, { n: 2, d: 4 }, { n: 1, d: 3 }, { n: 2, d: 3 },
    { n: 3, d: 4 }, { n: 3, d: 5 }, { n: 3, d: 8 }, { n: 5, d: 12 },
    // improper
    { n: 5, d: 4 }, { n: 7, d: 3 }, { n: 9, d: 6 },
    // mixed numbers
    { w: 1, n: 1, d: 4 }, { w: 2, n: 1, d: 3 }, { w: 1, n: 1, d: 2 }, { w: 2, n: 3, d: 5 },
    // minus sign to the left
    { n: 1, d: 2, neg: 'left' }, { n: 3, d: 4, neg: 'left' }, { w: 1, n: 1, d: 3, neg: 'left' },
    // negative numerator
    { n: 2, d: 3, neg: 'num' }, { n: 5, d: 4, neg: 'num' }, { n: 3, d: 6, neg: 'num' },
    // negative denominator
    { n: 1, d: 4, neg: 'den' }, { n: 3, d: 5, neg: 'den' }, { n: 7, d: 3, neg: 'den' },
  ];

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  // value as a simplified improper fraction [p, q] with q > 0
  function simplest(f) {
    let p = (f.w || 0) * f.d + f.n;
    if (f.neg) p = -p;
    const g = gcd(Math.abs(p), f.d);
    return [p / g, f.d / g];
  }
  function terminates(d) { while (d % 2 === 0) d /= 2; while (d % 5 === 0) d /= 5; return d === 1; }

  function fractionTitle(f) {
    const num = f.neg === 'num' ? `(${MINUS}${f.n})` : f.n;
    const den = f.neg === 'den' ? `(${MINUS}${f.d})` : f.d;
    const sign = f.neg === 'left' ? MINUS : '';
    return `${sign}${f.w ? f.w + ' ' : ''}${num}/${den}`;
  }
  function fractionFacts(f) {
    const [p, q] = simplest(f);
    const v = p / q;
    const asWritten = !f.w && (!f.neg || f.neg === 'left') && f.n === Math.abs(p) && f.d === q;
    const frac = q === 1 ? signed(p) : `${signed(p)}/${q}`;
    const dec = terminates(q) ? `= ${signed(+v.toFixed(4))}` : `≈ ${signed(+v.toFixed(3))}`;
    return asWritten ? dec : `= ${frac} ${dec}`;
  }

  function fractionSVG(f) {
    if (Array.isArray(f)) f = { n: f[0], d: f[1] };
    const numStr = (f.neg === 'num' ? MINUS : '') + f.n;
    const denStr = (f.neg === 'den' ? MINUS : '') + f.d;
    const fw = Math.max(numStr.length, denStr.length) * 15 + 8;   // width of the fraction bar
    const ww = f.w ? String(f.w).length * 19 + 4 : 0;               // width of the whole part
    const sw = f.neg === 'left' ? 14 : 0;                           // width of a leading minus
    const x0 = 50 - (sw + ww + fw) / 2;
    const cx = x0 + sw + ww + fw / 2;

    let out = '';
    if (sw) out += `<line class="vinculum" x1="${x0 + 2}" x2="${x0 + 11}" y1="40" y2="40"/>`;
    if (ww) out += `<text class="big" x="${x0 + sw + ww / 2}" y="52" text-anchor="middle" font-size="36">${f.w}</text>`;
    out += `<text class="big" x="${cx}" y="31" text-anchor="middle" font-size="27">${numStr}</text>
      <line class="vinculum" x1="${cx - fw / 2 + 3}" x2="${cx + fw / 2 - 3}" y1="39" y2="39"/>
      <text class="big" x="${cx}" y="66" text-anchor="middle" font-size="27">${denStr}</text>`;

    // number line from -3 to 3 with the card's value marked
    const [p, q] = simplest(f);
    const X = v => 50 + v * 14;
    let line = `<line class="axis" x1="6" x2="94" y1="88" y2="88"/>`;
    for (let k = -3; k <= 3; k++) {
      line += `<line class="axis" x1="${X(k)}" x2="${X(k)}" y1="${k === 0 ? 84 : 85.5}" y2="${k === 0 ? 92 : 90.5}"/>`;
      line += `<text class="nl-label" x="${X(k)}" y="101" text-anchor="middle">${signed(k)}</text>`;
    }
    line += `<circle class="nl-dot" cx="${X(p / q).toFixed(2)}" cy="88" r="3.3"/>`;

    return `<svg viewBox="0 0 100 106" aria-hidden="true">${out}${line}</svg>`;
  }

  // ---------- Topic definitions ----------
  const TOPICS = {
    polygons: {
      title: 'Polygons',
      cards: SHAPES.map(s => ({ svg: shapeSVG(s), name: s.name, title: s.name })),
      namesLabel: 'Names',
      prompts: {
        warm: [
          'Does it have more than four sides?',
          'Does it have any right angles?',
          'Does it have a pair of parallel sides?',
          'Are all of its sides the same length?',
          'Is it a quadrilateral?',
          'Is it a regular polygon?',
          'Does it have a line of symmetry?',
        ],
        stretch: [
          'Do its diagonals cross at right angles?',
          'Do its diagonals cut each other in half?',
          'Is its area more than 10 squares?',
          'Is the number of sides a prime number?',
          'Does it have a reflex angle?',
          'Do its interior angles add up to more than 540°?',
          'Does it have rotational symmetry?',
        ],
      },
      challenges: [
        'Ask a question without naming any shape.',
        'Ask a question that turns down at least four cards.',
        'Ask a question that is only about angles.',
        'Ask a question that splits the board roughly in half.',
        'Ask a question that uses the word “diagonal”.',
        'Ask a question about area or perimeter.',
      ],
    },
    numbers: {
      title: 'Numbers',
      cards: NUMBERS.map(n => ({ svg: numberSVG(n), name: numberFacts(n), title: signed(n) })),
      namesLabel: 'Hints',
      prompts: {
        warm: [
          'Is it negative?',
          'Is it an even number?',
          'Is it bigger than 20?',
          'Is it a multiple of 3?',
          'Is it a multiple of 5?',
          'Is it a square number?',
          'Is it a factor of 100?',
        ],
        stretch: [
          'Is it a prime number?',
          'Is it a cube number?',
          'Is it a triangular number?',
          'Is it more than 10 away from zero?',
          'Is its square bigger than 50?',
          'Is it a factor of 72?',
          'Do its digits add up to more than 6?',
        ],
      },
      challenges: [
        'Ask a question using the word “multiple”.',
        'Ask a question that turns down at least five cards.',
        'Ask a question about the digits, not the number.',
        'Ask a question that splits the board roughly in half.',
        'Ask a question about factors without saying “factor”.',
        'Ask a question about distance from zero.',
      ],
    },
    fractions: {
      title: 'Fractions',
      cards: FRACTIONS.map(f => ({ svg: fractionSVG(f), name: fractionFacts(f), title: fractionTitle(f) })),
      namesLabel: 'Decimals',
      prompts: {
        warm: [
          'Is it negative?',
          'Is it more than a half?',
          'Is it bigger than 1?',
          'Is it written as a mixed number?',
          'Is the denominator even?',
          'Is the numerator 1?',
          'Is it between −1 and 1?',
        ],
        stretch: [
          'Is it in its simplest form?',
          'Is it equal to another card on the board?',
          'Is it an improper fraction?',
          'Does it make a terminating decimal?',
          'Is it more than 1 away from zero?',
          'Would adding 1 make it positive?',
          'Is it between ½ and 2?',
        ],
      },
      challenges: [
        'Ask a question using the word “equivalent”.',
        'Ask a question about where it sits on the number line.',
        'Ask a question that turns down at least four cards.',
        'Ask a question without saying “negative” or “positive”.',
        'Ask a question that compares it to one third.',
        'Ask a question that splits the board roughly in half.',
      ],
    },
  };

  // ---------- Topics that still use your original image cards ----------
  // Keep the topic4, topic5 and topic6 folders until these are rebuilt as drawn cards.
  const imageCards = (folder, count) => Array.from({ length: count }, (_, i) => ({
    img: `${folder}/profile${i + 1}.jpg`, name: '', title: `Card ${i + 1}`,
  }));

  TOPICS.graphs = {
    title: 'Graphs',
    cards: imageCards('topic4', 24),
    namesLabel: null,
    prompts: {
      warm: [
        'Is it a straight line?',
        'Does it go through the origin?',
        'Does it slope upwards from left to right?',
        'Does it cross the y-axis above zero?',
        'Is it a curve?',
        'Is it horizontal or vertical?',
        'Does it cross the x-axis more than once?',
      ],
      stretch: [
        'Is the gradient greater than 1?',
        'Is it a quadratic graph?',
        'Does it have a turning point?',
        'Is it symmetrical about the y-axis?',
        'Does it have an asymptote?',
        'Is it parallel to y = 2x?',
        'Is its turning point a minimum?',
      ],
    },
    challenges: [
      'Ask a question using the word “gradient”.',
      'Ask a question about where it crosses an axis.',
      'Ask a question that turns down at least four cards.',
      'Ask a question that splits the board roughly in half.',
      'Ask a question without saying “line” or “curve”.',
    ],
  };

  TOPICS.algebra = {
    title: 'Algebraic manipulation',
    cards: imageCards('topic5', 24),
    namesLabel: null,
    prompts: {
      warm: [
        'Does it have brackets?',
        'Is it an equation rather than an expression?',
        'Does it have more than two terms?',
        'Does it use more than one letter?',
        'Is there a squared term?',
        'Are all of the numbers positive?',
        'Is there a fraction in it?',
      ],
      stretch: [
        'Can it be factorised?',
        'Would expanding it give a squared term?',
        'Is it already fully simplified?',
        'Is it a quadratic?',
        'Does it have a common factor greater than 2?',
        'Is it equivalent to another card on the board?',
        'Is it the difference of two squares?',
      ],
    },
    challenges: [
      'Ask a question using the word “term”.',
      'Ask a question using the word “factorise” or “expand”.',
      'Ask a question that turns down at least four cards.',
      'Ask a question that splits the board roughly in half.',
      'Ask a question about the numbers, not the letters.',
    ],
  };

  TOPICS.sequences = {
    title: 'Sequences',
    cards: imageCards('topic6', 24),
    namesLabel: null,
    prompts: {
      warm: [
        'Is it increasing?',
        'Is the first term even?',
        'Does it go up by the same amount each time?',
        'Is the difference bigger than 3?',
        'Are all the terms positive?',
        'Does it contain a square number?',
        'Is the first term bigger than 10?',
      ],
      stretch: [
        'Is it an arithmetic sequence?',
        'Is it a geometric sequence?',
        'Is it quadratic?',
        'Does the nth term contain n²?',
        'Will 100 appear in it?',
        'Is the common difference negative?',
        'Is the 10th term more than 50?',
      ],
    },
    challenges: [
      'Ask a question using the words “nth term”.',
      'Ask a question about the difference between terms.',
      'Ask a question that turns down at least four cards.',
      'Ask a question that splits the board roughly in half.',
      'Ask a question about a term that isn’t shown.',
    ],
  };

  window.GIM = { TOPICS, SHAPES, shapeSVG, numberSVG, fractionSVG };
})();
