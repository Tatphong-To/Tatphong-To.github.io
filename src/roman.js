// แปลงเลขเป็นเลขโรมัน เช่น 4 -> IV, 2026 -> MMXXVI
const TABLE = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
  [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

export function toRoman(n) {
  let out = ''
  for (const [value, letters] of TABLE) {
    while (n >= value) {
      out += letters
      n -= value
    }
  }
  return out
}
