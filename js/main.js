function rand(n) {
  return Math.floor(Math.random() * n)
}

const nums = [1,2,3,4,5,6,7,8,9]
let solver = sudoku_solver()

function get_blank(n) {
  let blank = Array.from({length: 81}, () => '.')
  for (let i = 0; i < n; i++) {
    blank[rand(blank.length)] = nums[rand(nums.length)]
  }
  return blank
}

function unflatten(doku) {
  return Array.from({length: 9}, (_,i) => doku.slice(9*i, 9*(i+1)))
}

const { createApp } = Vue
const app = createApp({
  data() { return {
    nums: [1,2,3,4,5,6,7,8,9],
    sol: Array.from({length: 9}, () => Array.from({length: 9}, () => '.'))
  }},
  methods: {
    kobe(r, c) {
      return 3 * Math.floor((r - 1) / 3) + Math.floor((c - 1) / 3) + 1
    },
    async solve() {
      let out = null
      while (!out) {
        out = get_blank(5)
        this.sol = unflatten(out)
        await new Promise(ret => setTimeout(ret, 500))
        out = solver(out.join(''), 1)[0]
      }
      this.sol = unflatten(out)
    },
    async loop() {
      if (this.looping) return;
      this.looping = true
      while (this.looping) {
        await this.solve()
        await new Promise(ret => setTimeout(ret, 800))
      }
    },
    stop() {
      this.looping = false
    }
  }
}).mount('#app')