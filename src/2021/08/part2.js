const sortLettersInString = str =>
  str
    .split('')
    .sort()
    .join('');

const getDiffArray = (base, values) =>
  values.map(signal =>
    base.split('').filter(letter => !signal.includes(letter))
  );

const digitmap = {
  abcefg: 0,
  cf: 1,
  acdeg: 2,
  acdfg: 3,
  bcdf: 4,
  abdfg: 5,
  abdefg: 6,
  acf: 7,
  abcdefg: 8,
  abcdfg: 9
};

const solution = input => {
  return input.reduce((acc, line) => {
    const [signalStr, digitsStr] = line.split(' | ');
    const signals = signalStr.split(' ');
    const digits = digitsStr.split(' ').map(sortLettersInString);

    // Bucket based on length
    const buckets = signals.reduce((acc, signal) => {
      const length = signal.length;
      if (acc[length]) {
        acc[length].push(signal);
      } else {
        acc[length] = [signal];
      }
      return acc;
    }, {});

    const segments = {
      a: null,
      b: null,
      c: null,
      d: null,
      e: null,
      f: null,
      g: null
    };

    // Find the segments that aren't lit in 0, 6 and 9
    const sixDiff = getDiffArray(buckets[7][0], buckets[6]).flat();

    // C - If part of 1's segments is in the diff, then it's 6 and thus C
    segments.c = sixDiff.find(diff => buckets[2][0].includes(diff));

    // E - If part of 4's segments isn't in the diff, then we've found 9 and thus E
    segments.e = sixDiff.find(diff => !buckets[4][0].includes(diff));

    // D - Last one is 0/D
    segments.d = sixDiff.find(
      diff => (diff !== segments.e) & (diff !== segments.c)
    );

    // A - The segment difference between 7 and 1
    segments.a = buckets[3][0]
      .split('')
      .find(letter => !buckets[2][0].includes(letter));

    // F - The other segment of '1' that we've not found yet
    segments.f = buckets[2][0].split('').find(letter => letter !== segments.c);

    // B - Find all the unlit segments of 5-segment numbers, and find the one that we've not discovered yet
    segments.b = buckets[5]
      .map(signal =>
        buckets[7][0].split('').filter(letter => !signal.includes(letter))
      )
      .flat()
      .find(letter => !Object.values(segments).includes(letter));

    // G - diff the keys and values of segments array
    segments.g = Object.keys(segments).find(
      letter => !Object.values(segments).includes(letter)
    );

    // Create a map keyed by segment letter to 'normalised' segment letter
    const segmentLookup = Object.keys(segments).reduce((acc, seg) => {
      acc[segments[seg]] = seg;
      return acc;
    }, {});

    // Calculate the value of the 4 digit display
    const number = digits
      .map(digit =>
        digit
          .split('')
          .map(d => segmentLookup[d])
          .join('')
      )
      .map(sortLettersInString)
      .map(d => digitmap[d])
      .join('');

    return acc + +number;
  }, 0);
};

const solutionViaDigits = input => {
  return input.reduce((acc, line) => {
    const [signalStr, digitsStr] = line.split(' | ');
    const signals = signalStr.split(' ');
    const digits = digitsStr.split(' ');

    let map = new Array(10);

    map[1] = signals.find(signal => signal.length === 2);
    map[4] = signals.find(signal => signal.length === 4);
    map[7] = signals.find(signal => signal.length === 3);
    map[8] = signals.find(signal => signal.length === 7);

    map[3] = signals.find(
      signal =>
        signal.length === 5 &&
        map[7].split('').every(letter => signal.includes(letter))
    );

    map[6] = signals.find(
      signal =>
        signal.length === 6 &&
        !map[7].split('').every(letter => signal.includes(letter))
    );

    map[9] = signals.find(
      signal =>
        signal.length === 6 &&
        map[3].split('').every(letter => signal.includes(letter))
    );

    map[0] = signals.find(
      signal => signal.length === 6 && signal !== map[6] && signal !== map[9]
    );

    map[5] = signals.find(
      signal =>
        signal.length === 5 &&
        signal !== map[3] &&
        signal.split('').every(letter => map[9].includes(letter))
    );

    map[2] = signals.find(signal => !map.includes(signal));

    //Sort the letters in the map
    map = map.map(sortLettersInString);

    return (
      acc +
      +digits
        .map(d => map.findIndex(el => el === sortLettersInString(d)))
        .join('')
    );
  }, 0);
};

const answer = 1007675;

export { solution, answer };
