function rand(n) {
  return Math.floor(Math.random() * n)
}

async function sleep(t) {
  if (t > 1) return await new Promise(ret => setTimeout(ret, t))
  else return true
}

const SOL_LEN = 81
const SEED_SIZE = 5
let solver = sudoku_solver()

const { createApp } = Vue
const app = createApp({
  data() { return {
    sol: Array.from({length: SOL_LEN}, (_,i) => ({val: 'SUDOKU'[i%6], is_prob: true})),
    delay: 1000,
  }},
  methods: {
    get_pair() {
      let prob = null
      let sol = null
      while (!sol) {
        prob = Array.from({length: SOL_LEN}, () => '.')
        for (let i = 0; i < SEED_SIZE; i++) {
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
        let [prob, sol] = this.get_pair()
        this.sol = this.sol.map((k, i) => prob[i] == '.' ? {val: '', is_prob: false} : {val: prob[i], is_prob: true})
        await sleep(this.delay * 0.2)
        for (let i = 0; i < SOL_LEN; i++) {
          if (!this.sol[i].is_prob) {
            this.sol[i].val = sol[i]
            await sleep(this.delay * 0.4 * (1 / (SOL_LEN - SEED_SIZE)))
          }
        }
        await sleep(this.delay * 0.4)
      }
    },
    stop() {
      this.looping = false
    }
  }
}).mount('#app')

console.log(document.querySelector('#app'))