function rand(n) {
  return Math.floor(Math.random() * n)
}

const SOL_LEN = 81
let solver = sudoku_solver()

const { createApp } = Vue
const app = createApp({
  data() { return {
    sol: Array.from({length: SOL_LEN}, (_,i) => ({val: 'SUDOKU'[i%6], is_prob: true}))
  }},
  methods: {
    get_pair(n) {
      let prob = null
      let sol = null
      while (!sol) {
        prob = Array.from({length: SOL_LEN}, () => '.')
        for (let i = 0; i < n; i++) {
          prob[rand(prob.length)] = rand(9)+1
        }
        prob = prob.join('')
        sol = solver(prob, 1)[0]
      }
      return [prob, sol]
    },
    async loop() {
      if (this.looping) return;
      this.looping = true
      while (this.looping) {
        let [prob, sol] = this.get_pair(5)
        this.sol = this.sol.map((k, i) => prob[i] == '.' ? {val: '', is_prob: false} : {val: prob[i], is_prob: true})
        await new Promise(ret => setTimeout(ret, 200))
        for (let i = 0; i < SOL_LEN; i++) {
          if (!this.sol[i].is_prob) this.sol[i].val = sol[i]
        }
        await new Promise(ret => setTimeout(ret, 800))
      }
    },
    stop() {
      this.looping = false
    }
  }
}).mount('#app')