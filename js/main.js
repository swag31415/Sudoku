function rand(n) {
  return Math.floor(Math.random() * n)
}

const nums = [1,2,3,4,5,6,7,8,9]
let solver = sudoku_solver()

function kudo(n) {
  let blank = Array.from({length: 81}, () => '.')
  for (let i = 0; i < n; i++) {
    blank[rand(blank.length)] = nums[rand(nums.length)]
  }
  blank = blank.join('')
  return solver(blank, 1)
}

const { createApp } = Vue
const app = createApp({
  data() { return {
    nums: [1,2,3,4,5,6,7,8,9],
    sol: Array.from({length: 9}, () => Array.from({length: 9}, () => 0))
  }},
  methods: {
    kobe(r, c) {
      return 3 * Math.floor((r - 1) / 3) + Math.floor((c - 1) / 3) + 1
    },
    solve() {
      let out = null
      while (!out) {
        out = kudo(5)[0]
      }
      this.sol = Array.from({length: 9}, (_,i) => out.slice(9*i, 9*(i+1)))
    }
  }
}).mount('#app')